# Miran — Portfolio

Personal portfolio for **Miran** — AI engineer building secure, production-oriented AI systems (RAG, backend infrastructure, retrieval, evaluation, security).

- Site: [muhammadmiran.com](https://muhammadmiran.com)
- Email: [contact@muhammadmiran.com](mailto:contact@muhammadmiran.com)
- GitHub: [github.com/miransec](https://github.com/miransec)

Featured systems: **Averqen** (v1.0.0), **AtlasCore** (UI v2), and **VaaniDesk** (v1.0.1).

## Projects

| System | Repo | Description |
|---|---|---|
| Averqen | [github.com/miransec/averqen](https://github.com/miransec/averqen) | AI-assisted security investigation with deterministic detection, FORCE RLS, grounded AI, and policy-controlled response |
| AtlasCore | [github.com/miransec/atlascore](https://github.com/miransec/atlascore) | Secure enterprise AI infrastructure — FORCE RLS, hybrid retrieval, evidence-first Ask AI, workspace UI v2 |
| VaaniDesk | [github.com/miransec/vaanidesk](https://github.com/miransec/vaanidesk) | Multilingual AI customer support with RAG, controlled tool calling, and evaluation gates |

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Vitest + Playwright (E2E smoke)
- Docker

## Scripts

```bash
npm ci
npm run dev        # dev server at localhost:3000
npm run lint
npm test           # Vitest unit tests
npm run build
npm start          # production server at localhost:3000
npm run test:e2e   # requires build + Playwright browsers
```

## Content sources

- `src/data/site.ts` — identity, email, social links, résumé flags
- `src/data/projects.ts` — project cards, case-study facts, metrics
- `src/data/writing.ts` — engineering notes for `/writing`

## Screenshots

Averqen screenshots live in `public/projects/averqen/` (committed).

AtlasCore screenshots are captured from a running frontend:

```powershell
$env:ATLASCORE_SCREENSHOT_EMAIL="your@email"
$env:ATLASCORE_SCREENSHOT_PASSWORD="your-password"
npm run screenshots:atlascore
```

Outputs land in `public/projects/atlascore/`. Credentials are read from the environment only — never commit them.

## Placeholders

- `public/resume.pdf` (set `resume.available: true` in `src/data/site.ts` when ready)
- `public/profile.jpg`

## Deployment

Deployed on [Vercel](https://vercel.com) — import the repo, add the domain in Settings → Domains, then point your DNS records accordingly.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for Ubuntu VPS + Nginx + Let's Encrypt alternative.

## License

MIT
