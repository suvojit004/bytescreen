# NGINX entry point

Start the site from the repository root:

```sh
docker compose up -d --build
```

Open `http://localhost:8080` (or `http://YOUR_VPS_IP:8080`). Set `HTTP_PORT`
in `.env` to change the published port. This entry point uses HTTP until TLS
is configured.

NGINX serves `/css/`, `/js/`, `/images/`, `/videos/`, and PDF downloads under
`/resources/` directly from the read-only `src/public` mount. Missing assets
return 404. All other requests, including resource index pages and form/API
requests, are proxied to `backend:3000`. The backend port is not published.

Compose enables `BEHIND_NGINX=true`, which disables Express static serving and
trusts the one NGINX proxy hop. Direct `npm run dev` uses Express static serving
by default. The backend uses its built image; rebuild it after source changes.
Deploy the image and mounted public directory from the same project revision.

## Production with Traefik

Use `docker-compose.prod.yml` from the repository root. Copy
`.env.production.example` to `.env.production`, set a strong `JWT_SECRET` and
your base `DOMAIN`. The `TRAEFIK_CERT_RESOLVER` value must match the
certificate resolver configured in Traefik.

Start the stack with:

```sh
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

Traefik terminates TLS and routes both the base hostname and its `www`
hostname to NGINX on port 80. All three services use the Compose-managed
`app-network`, matching the layout in your reference file. Traefik must be
connected to that same Docker network to reach NGINX. NGINX, the backend, and
MongoDB do not publish host ports; MongoDB persists data in a named volume.
Make sure Traefik listens on the `websecure` entrypoint and handles
HTTP-to-HTTPS redirection.

The Compose labels use `${DOMAIN}` for the base hostname and automatically
route `www.${DOMAIN}` to the same service. Keep `.env.production` on the VPS
and out of source control. Deploy the image and mounted public directory from
the same project revision.
