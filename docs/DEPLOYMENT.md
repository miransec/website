# Deployment — muhammadmiran.com

Production shape:

```text
Internet
  → Nginx (TLS termination, reverse proxy)
    → Next.js application (Node, port 3000)
```

Use Let's Encrypt for HTTPS. Paid certificates are unnecessary for this setup.

## Build locally

```bash
npm ci
npm run lint
npm run build
npm start
```

The production server listens on `PORT` (default `3000`).

## Docker

```bash
docker build -t miran-portfolio .
docker run --rm -p 3000:3000 miran-portfolio
```

Health check endpoint: `GET /api/health`

## Environment variables

Copy `.env.example` to `.env` on the server only when needed.

| Variable | Public? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_FORM_ENABLED` | Yes | Enables live contact form UI when backend delivery exists |
| `SMTP_*` / `CONTACT_*` | No | Future server-side mail delivery — never expose via `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_SITE_URL` | Yes (optional) | Override public site URL if needed |

Do not commit `.env`, credentials, tokens, or secrets.

## Nginx reverse proxy (sketch)

```nginx
server {
    listen 80;
    server_name muhammadmiran.com www.muhammadmiran.com;
    return 301 https://muhammadmiran.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name muhammadmiran.com www.muhammadmiran.com;

    ssl_certificate     /etc/letsencrypt/live/muhammadmiran.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/muhammadmiran.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Obtain certificates with Certbot (example):

```bash
sudo certbot --nginx -d muhammadmiran.com -d www.muhammadmiran.com
```

## Process management

Run the Node process under systemd, PM2, or Docker restart policy. Example systemd unit outline:

```ini
[Unit]
Description=Miran portfolio
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/miran-portfolio
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

## Update deployment

1. Pull the latest release on the VPS.
2. `npm ci`
3. `npm run build`
4. Restart the process manager / container.
5. Verify `https://muhammadmiran.com/api/health` returns `{"status":"ok",...}`.
6. Spot-check home, projects, and case-study pages.

## Notes

- This documentation intentionally omits real server IPs, passwords, and private keys.
- Point DNS A/AAAA records for `muhammadmiran.com` (and optional `www`) at the VPS before issuing certificates.
