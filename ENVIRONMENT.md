Vite environment variables (frontend)

- Production env variables that must be exposed to the client must start with `VITE_`.
- This project uses **VITE_API_URL** to configure the API base URL used by the frontend.

How to use:

- Set `VITE_API_URL` in `.env.production` to your production API base URL before running `npm run build`.
- For local development, `.env` includes `VITE_API_URL=http://localhost:3000` as a fallback.

Important:

- Do not store secrets (private keys, tokens) in client-side env files — they are public and visible in the built bundle.
