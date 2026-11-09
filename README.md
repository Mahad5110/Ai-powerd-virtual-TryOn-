# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

# Ai-powerd-virtual-TryOn-

## Password reset email (Brevo SMTP)

The backend sends reset links through Brevo SMTP. Copy `backend/.env.example`
to `backend/.env` for local development and fill in the required database,
JWT, SMTP login/password, and verified sender email values. Do not commit
`backend/.env`.

For Vercel, add these environment variables to the backend project:

- `DATABASE_URL` and `JWT_SECRET`
- `CLIENT_URL` and `FRONTEND_URL` set to the deployed frontend origin
- `BREVO_SMTP_HOST` (`smtp-relay.brevo.com`) and `BREVO_SMTP_PORT` (`587`)
- `BREVO_SMTP_USER` and `BREVO_SMTP_PASSWORD`
- `BREVO_SENDER_EMAIL` (a sender verified in Brevo) and optional `BREVO_SENDER_NAME`

Redeploy the backend after adding or changing environment variables. The user
reset link is single-use and expires after 30 minutes.
