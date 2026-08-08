# Miran — Portfolio

Personal portfolio for **Miran** — AI engineer building secure, production-oriented AI systems (RAG, backend infrastructure, retrieval, evaluation, security).

- Site: [muhammadmiran.com](https://muhammadmiran.com)
- Email: [contact@muhammadmiran.com](mailto:contact@muhammadmiran.com)
- GitHub: [miransec](https://github.com/miransec)

Featured systems: **AtlasCore** (UI v2) and **VaaniDesk** (v1.0.1).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Vitest + Playwright (smoke)
- Docker

## Scripts

```bash
npm ci
npm run dev
npm run lint
npm test
npm run build
npm start
npm run test:e2e   # requires build + Playwright browsers
```

## Content sources

- `src/data/site.ts` — identity, email, social links, résumé flags
- `src/data/projects.ts` — project cards and case-study facts
- `src/data/writing.ts` — engineering notes for `/writing`

## AtlasCore screenshots

Capture real UI screenshots from a running AtlasCore frontend (usually via SSH tunnel on `http://localhost:3100`):

```powershell
$env:ATLASCORE_SCREENSHOT_EMAIL="your@email"
$env:ATLASCORE_SCREENSHOT_PASSWORD="your-password"
npm run screenshots:atlascore
```

Outputs land in `public/projects/atlascore/`. Credentials are read from the environment only — never commit them. Screenshot capture is not part of normal CI.

## Placeholders (do not invent)

- `public/resume.pdf` (+ set `resume.available` in site config)
- `public/profile.jpg`
- VaaniDesk public demo URL

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for Ubuntu VPS + Nginx + Let's Encrypt.

## License

MIT
