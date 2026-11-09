
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import pool, { initializeDatabase } from "./config/db.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "https://ai-powerd-virtual-try-on-three.vercel.app",
    "http://localhost:5173"
  ].filter(Boolean)
}));

app.use(express.json());

// Initialize database before handling requests
let databaseReady;

app.use(async (req, res, next) => {
  try {
    databaseReady ??= initializeDatabase();
    await databaseReady;
    next();
  } catch (error) {
    databaseReady = null;
    console.error("Database connection error:", error.message);

    res.status(503).json({
      message: "Database is currently unavailable."
    });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "TryFirst Backend API is running!"
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Protected profile route
app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, created_at
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    res.json({
      user: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not fetch user profile."
    });
  }
});

// Export Express app for Vercel
export default app;

// Run normal server during local development
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TryFirst server running on port ${PORT}`);
  });
}
