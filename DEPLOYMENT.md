Deployment notes — Vercel frontend + Render backend
===============================================

This project supports separate frontend (Vercel) and backend (Render) deployments. Use the steps below to ensure SPA routes and WebSocket connections work correctly.

1) Frontend (Vercel)
- Build: `npm run build` → `dist`
- Add environment variables in Vercel Project Settings:
  - `VITE_API_URL` = `https://tabletime-h51q.onrender.com/api`
  - `VITE_WS_URL` = `https://tabletime-h51q.onrender.com`
- Ensure `frontend/vercel.json` is present (we added a rewrite to `/index.html` to prevent 404 on direct navigation for SPA routes). You can keep `/api` rewrite if you prefer proxying to your backend; otherwise use environment variables.
- Re-deploy the frontend after setting the environment variables.

2) Backend (Render)
- Set environment variables in Render:
  - `FRONTEND_URL` = `https://tabletime-msc.vercel.app` (or a comma-separated list if you have multiple frontend domains, e.g., `https://staging.example.com,https://prod.example.com,http://localhost:5173`)
  - Other variables such as `MONGODB_URI`, `JWT_SECRET`, etc.
- Restart the backend service after setting variables.

3) Socket.io and CORS
- Backend `socket.io` now allows a comma-separated list of origins from `FRONTEND_URL`. Be sure to include your Vercel domain(s) and any dev domains.
- Backend HTTP CORS is also configured to allow the same `FRONTEND_URL` values.

4) Test steps
- Open the frontend: `https://<your-vercel-app>.vercel.app` and verify navigation works.
- Open `https://<your-vercel-app>.vercel.app/table/1` directly (or refresh while on that route). It should not 404 and should render the table page.
- Confirm API calls are going to the backend (`VITE_API_URL`) and not returning 404/500.
- Verify WebSocket connection: Open browser DevTools → Network → WS and confirm a connection to the Render backend is established. On the backend console logs you should see `New client connected` on successful connections.

5) Debugging tips
- If you see socket.io CORS errors, verify `FRONTEND_URL` includes the exact protocol and hostname (e.g., include `https://`).
- If API calls are failing with CORS or 401, verify `VITE_API_URL` and JWT token handling.
- For error `GET /table/1 404` while direct-navigating and you are using Vercel, double-check `vercel.json` or add a `_redirects` file to the `dist` output with `/* /index.html 200`.

6) Quick local simulation
- Build the frontend locally:
  ```bash
  cd frontend
  npm install
  npm run build
  npm i -g serve
  serve -s dist -l 5000
  # Now open http://localhost:5000/table/1 — it should render index.html and not 404
  ```

If you'd like, I can: A) add a small script and dev docs to automate setting these env variables for Vercel/Render; B) add optional Nginx example for reverse proxy; or C) switch to HashRouter if you prefer not to handle server rewrites.
