# TikTok Community Discord Bot & Control Panel

Panneau de gestion communautaire pour TikTok Live avec simulateur Discord intégré.

## Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + Vite
- **Backend**: Express (TypeScript, tsx dev server)
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts

## How to run

```
npm run dev
```

Runs on port **5000** (Express + Vite middleware in dev mode).

## Project structure

- `server.ts` — Express API server (webhook sender, TikTok mock state, /say command)
- `src/App.tsx` — Root React component, global state
- `src/components/` — All UI panels (Dashboard, Discord Simulator, Announcement Studio, Bot Manager, etc.)
- `src/data/mockData.ts` — Simulated TikTok/Discord data
- `src/types.ts` — TypeScript interfaces

## API endpoints

- `GET /api/tiktok/status` — TikTok live stats
- `POST /api/tiktok/toggle-live` — Toggle live state
- `POST /api/bot/say` — /say command (anonymized repost)
- `POST /api/webhook/send` — Send embed to a real Discord webhook URL

## Notes

- No AI/Gemini dependency — all bot responses are local templates
- Simulated data only; no real TikTok or Discord API connection required to run the panel

## User preferences

- No AI/Gemini features — panel is standalone without any external AI API
