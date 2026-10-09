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

## Adding Traefik later

Route the entire hostname to NGINX port 80 on a shared Docker network. There
is no need for separate asset routing. Remove the public NGINX port mapping
if Traefik becomes the only public entry point.

Before enabling Traefik TLS, configure NGINX to trust forwarded protocol and
client IP information only from the Traefik network/address. The current
configuration deliberately replaces incoming forwarded headers because it
is intended for direct public access. Set up HTTPS redirection at Traefik.
