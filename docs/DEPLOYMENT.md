# Deployment — muhammadmiran.com

## Production architecture (live VPS)

```text
Internet
  → provider firewall (must allow 80/443)
    → Caddy (TLS + reverse proxy on :80/:443)
      → 127.0.0.1:3000
        → Docker container `miran-portfolio` (Next.js production)
```

Notes:

- The VPS already ran **Caddy** for `muhammadmiran.com`. That edge proxy was kept
  (Nginx was installed but left disabled so it cannot bind :80/:443).
- The Next.js app binds only to `127.0.0.1:3000` (not public).
- TLS is automatic via Caddy / Let's Encrypt once ports 80 and 443 are reachable
  from the public internet.
- Contact form remains disabled until SMTP is configured
  (`NEXT_PUBLIC_CONTACT_FORM_ENABLED=false`).

## Paths

| Item | Path / name |
|---|---|
| App files | `/opt/miran-portfolio` |
| Docker image | `miran-portfolio` |
| Docker container | `miran-portfolio` (`--restart unless-stopped`) |
| Caddyfile | `/etc/caddy/Caddyfile` |
| Health | `GET /api/health` |

## Build & run on the VPS

```bash
cd /opt/miran-portfolio
docker build -t miran-portfolio .
docker rm -f miran-portfolio >/dev/null 2>&1 || true
docker run -d --name miran-portfolio --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_CONTACT_FORM_ENABLED=false \
  -e HOSTNAME=0.0.0.0 \
  -e PORT=3000 \
  miran-portfolio
```

Verify privately:

```bash
curl -fsS http://127.0.0.1:3000/api/health
```

## Caddy reverse proxy

`www.muhammadmiran.com` redirects permanently to `https://muhammadmiran.com`.

Apex site reverse-proxies to `127.0.0.1:3000` with security headers (no brittle CSP).

After Caddyfile changes:

```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

## Provider firewall (required for HTTPS)

Host UFW already allows `34269/tcp` (SSH), `80/tcp`, and `443/tcp`.

If Let's Encrypt or public HTTPS times out while local `:3000` is healthy, the
**cloud/provider security group** is almost certainly still blocking inbound
80/443. Open those ports in the provider panel, then restart Caddy:

```bash
systemctl restart caddy
```

Caddy will obtain/renew Let's Encrypt certificates automatically once challenges
can reach the server.

## Host firewall (UFW)

```bash
ufw allow 34269/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
ufw status verbose
```

Do not expose Docker port `3000` publicly.

## Environment variables

| Variable | Public? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | Yes | Enables live contact form UI when backend delivery exists |
| `SMTP_*` / `CONTACT_*` | No | Future server-side mail delivery — never expose via `NEXT_PUBLIC_` |

Professional email used by the site: `contact@muhammadmiran.com`

Do not commit `.env`, credentials, tokens, SSH passwords, or private keys.

## Update deployment

1. Sync updated project files to `/opt/miran-portfolio` (exclude `node_modules`, `.next`, `.env`).
2. `docker build -t miran-portfolio /opt/miran-portfolio`
3. Recreate the container with the same `docker run` flags above.
4. `curl -fsS http://127.0.0.1:3000/api/health`
5. Spot-check `https://muhammadmiran.com/` once public 80/443 are open.

## Local development

```bash
npm ci
npm run lint
npm test
npm run build
npm start
```
