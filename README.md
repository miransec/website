# Miran — Portfolio

Personal portfolio for **Miran** — AI Engineer focused on secure, production-oriented AI systems (agentic systems, RAG, backend, security).

Site: [muhammadmiran.com](https://muhammadmiran.com)  
GitHub: [Mod-With-Miran](https://github.com/Mod-With-Miran)

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Vitest + Playwright (smoke)
- Docker (standalone output)

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

- `src/data/site.ts` — identity, social links, résumé flags
- `src/data/projects.ts` — project cards and case-study facts

## Placeholders (do not invent)

- LinkedIn URL
- Professional email
- `public/resume.pdf` (+ set `resume.available` in site config)
- `public/profile.jpg`
- Public project repository URLs / demos
- Real screenshots under `public/projects/*`

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for Ubuntu VPS + Nginx + Let's Encrypt.

## License

MIT
