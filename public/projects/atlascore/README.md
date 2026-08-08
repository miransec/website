# Project screenshots

Real AtlasCore UI captures belong here:

- `ask-ai.png` (primary / hero)
- `dashboard.png`
- `workspaces.png`
- `knowledge.png`
- `search.png`
- `security.png`

Capture from a running AtlasCore frontend (SSH tunnel to `http://localhost:3100`):

```powershell
$env:ATLASCORE_SCREENSHOT_EMAIL="..."
$env:ATLASCORE_SCREENSHOT_PASSWORD="..."
npm run screenshots:atlascore
```

Do not commit fabricated UI mockups. Do not put credentials in this file.
