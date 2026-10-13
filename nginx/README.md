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
uses one trusted NGINX hop by default. Production Compose sets
`TRUST_PROXY_HOPS=2` for Traefik then NGINX. Direct `npm run dev` uses Express
static serving by default. The backend uses its built image; rebuild it after
source changes. Deploy the image and mounted public directory from the same
project revision.

## Production with Traefik

Use `docker-compose.prod.yml` from the repository root. Copy
`.env.example` to `.env`, then set a strong JWT secret, both MongoDB
passwords, and your base `DOMAIN`. Set `MONGO_URI` to use the same app user
and password as `MONGO_APP_USER` and `MONGO_APP_PASSWORD`. Use URL-safe
hexadecimal passwords so the MongoDB URI needs no escaping. The
`TRAEFIK_CERT_RESOLVER` value must match the resolver configured in Traefik.

Start the stack with:

```sh
docker compose -f docker-compose.prod.yml up -d --build
```

Traefik terminates TLS and routes both the base hostname and its `www`
hostname to NGINX on port 80. All three services use the Compose-managed
`app-network`, matching the layout in your reference file. Traefik must be
connected to that same Docker network to reach NGINX. NGINX, the backend, and
MongoDB do not publish host ports; MongoDB persists data in a named volume.
Make sure Traefik listens on the `websecure` entrypoint and handles
HTTP-to-HTTPS redirection.

The Compose labels use `${DOMAIN}` for the base hostname and automatically
route `www.${DOMAIN}` to the same service. `CORS_ALLOW_ORIGINS` is optional;
leave it empty when browser clients use this site's origin. Keep
`.env` on the VPS and out of source control. Deploy the image and
mounted public directory from the same project revision.

MongoDB's initialization script creates the restricted application user only
when the data volume is first initialized. If the VPS already has an existing
MongoDB volume, back it up and create/verify the MongoDB users as a migration
before deploying this authentication change; do not delete the volume.
