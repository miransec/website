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

## Placeholders (do not invent)

- `public/resume.pdf` (+ set `resume.available` in site config)
- `public/profile.jpg`
- VaaniDesk public demo URL
- Real AtlasCore screenshots under `public/projects/atlascore`

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for Ubuntu VPS + Nginx + Let's Encrypt.

## License

MIT
