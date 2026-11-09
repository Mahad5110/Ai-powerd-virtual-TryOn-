import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import pool from "../config/db.js";

const RESET_TOKEN_LIFETIME_MINUTES = 30;

const hashToken = (token) =>
  createHash("sha256").update(token).digest("hex");

const getFrontendUrl = () => {
  const configuredUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL;

  if (!configuredUrl) {
    throw new Error("FRONTEND_URL or CLIENT_URL must be configured for password reset.");
  }

  const frontendUrl = new URL(configuredUrl);
  if (frontendUrl.protocol !== "https:" && frontendUrl.hostname !== "localhost") {
    throw new Error("The frontend URL must use HTTPS outside localhost.");
  }

  return frontendUrl;
};

const sendResetEmail = async (email, resetUrl) => {
  const {
    BREVO_SMTP_USER,
    BREVO_SMTP_PASSWORD,
    BREVO_SENDER_EMAIL,
  } = process.env;

  if (!BREVO_SMTP_USER || !BREVO_SMTP_PASSWORD || !BREVO_SENDER_EMAIL) {
    throw new Error("Brevo password-reset email settings are incomplete.");
  }

  const smtpPort = Number(process.env.BREVO_SMTP_PORT || 587);
  if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
    throw new Error("BREVO_SMTP_PORT must be a valid TCP port.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: BREVO_SMTP_USER,
      pass: BREVO_SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: {
      name: process.env.BREVO_SENDER_NAME || "TryFirst",
      address: BREVO_SENDER_EMAIL,
    },
    to: email,
    subject: "Reset your TryFirst password",
    text: `Reset your TryFirst password: ${resetUrl}\n\nThis link expires in ${RESET_TOKEN_LIFETIME_MINUTES} minutes. If you did not request this, you can ignore this email.`,
    html: `
      <p>We received a request to reset your TryFirst password.</p>
      <p><a href="${resetUrl}">Choose a new password</a></p>
      <p>This link expires in ${RESET_TOKEN_LIFETIME_MINUTES} minutes. If you did not request this, you can ignore this email.</p>
    `,
  });
};

export const requestPasswordReset = async (req, res) => {
  const email = typeof req.body?.email === "string"
    ? req.body.email.trim().toLowerCase()
    : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  let tokenHash;

  try {
    const userResult = await pool.query(
      "SELECT id, email FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(200).json({
        message: "If an account exists for that email, a password-reset link will be sent.",
      });
    }

    const user = userResult.rows[0];
    const frontendUrl = getFrontendUrl();
    const recentRequest = await pool.query(
      `SELECT 1
       FROM password_reset_tokens
       WHERE user_id = $1 AND created_at > NOW() - INTERVAL '1 minute'
       LIMIT 1`,
      [user.id]
    );

    if (recentRequest.rows.length > 0) {
      return res.status(200).json({
        message: "If an account exists for that email, a password-reset link will be sent.",
      });
    }

    const token = randomBytes(32).toString("hex");
    tokenHash = hashToken(token);

    await pool.query(
      "DELETE FROM password_reset_tokens WHERE user_id = $1 OR expires_at <= NOW()",
      [user.id]
    );
    await pool.query(
      `INSERT INTO password_reset_tokens (token_hash, user_id, expires_at)
       VALUES ($1, $2, NOW() + ($3 * INTERVAL '1 minute'))`,
      [tokenHash, user.id, RESET_TOKEN_LIFETIME_MINUTES]
    );

    frontendUrl.pathname = "/reset-password";
    frontendUrl.search = new URLSearchParams({ token }).toString();

    await sendResetEmail(user.email, frontendUrl.toString());

    return res.status(200).json({
      message: "If an account exists for that email, a password-reset link will be sent.",
    });
  } catch (error) {
    if (tokenHash) {
      await pool.query(
        "DELETE FROM password_reset_tokens WHERE token_hash = $1",
        [tokenHash]
      ).catch((cleanupError) => {
        console.error("Could not remove an unsent password-reset token:", cleanupError);
      });
    }

    console.error("Password-reset request failed:", error);
    return res.status(503).json({
      message: "Password reset is temporarily unavailable. Please try again later.",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body ?? {};

  if (
    typeof token !== "string" ||
    !/^[a-f0-9]{64}$/.test(token) ||
    typeof password !== "string" ||
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return res.status(400).json({
      message: "Use a valid reset link and a password with at least 8 characters, including uppercase and lowercase letters and a number.",
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const tokenResult = await client.query(
      `SELECT user_id
       FROM password_reset_tokens
       WHERE token_hash = $1 AND expires_at > NOW()
       FOR UPDATE`,
      [hashToken(token)]
    );

    if (tokenResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        message: "This password-reset link is invalid or has expired. Request a new one.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await client.query(
      "UPDATE users SET password_hash = $1 WHERE id = $2",
      [passwordHash, tokenResult.rows[0].user_id]
    );
    await client.query(
      "DELETE FROM password_reset_tokens WHERE user_id = $1",
      [tokenResult.rows[0].user_id]
    );

    await client.query("COMMIT");
    return res.status(200).json({
      message: "Your password has been reset. You can now log in.",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Password reset failed:", error);
    return res.status(500).json({
      message: "Could not reset your password. Please try again.",
    });
  } finally {
    client.release();
  }
};
