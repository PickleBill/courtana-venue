# Courtana Venue — Project Context

## What This Is
A Lovable-built React + Vite + Tailwind + shadcn/ui venue sales tool for Courtana Smart Courts. This app is used to pitch venue operators (first customer: Peak Pickleball, Greensboro NC) on the Courtana smart court platform. It includes:

- **Venue Preview** — single-page marketing site venues can white-label
- **Dashboard** — pilot scorecard with utilization, revenue, and event tracking
- **Discovery** — interactive sales discovery tool that scores venue fit
- **Events** — event programming tied to the pilot launch calendar
- **Partners** — ecosystem flywheel showing Courtana's partner network
- **Landing / Schedule** — additional venue-facing pages

## Stack
- React 18, Vite 5, TypeScript
- Tailwind CSS 3 with custom dark theme (see `src/index.css` for CSS variables)
- shadcn/ui components (Radix primitives)
- Framer Motion for animations
- Recharts for data visualization
- React Router DOM for routing
- TanStack React Query
- Deployed via Lovable (lovable-tagger in devDependencies)

## Design Tokens & Theme
Dark theme with green/gold accents. All colors use HSL CSS variables:

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--primary` | `145 100% 45%` | Green — CTAs, active states, glow effects |
| `--accent` | `48 100% 50%` | Gold — secondary highlights, revenue metrics |
| `--background` | `220 30% 6%` | Deep navy-black base |
| `--card` | `220 22% 10%` | Card surfaces |
| `--card-elevated` | `215 25% 13%` | Elevated card surfaces |
| `--foreground` | `214 32% 91%` | Primary text |
| `--muted-foreground` | `215 16% 62%` | Secondary text |
| `--border` | `217 19% 17%` | Borders |
| `--secondary` | `215 19% 16%` | Secondary backgrounds |
| `--destructive` | `0 84% 60%` | Error/destructive red |

### Utility Classes (defined in `src/index.css`)
- `.glass` — frosted glass card: `bg-card/80 backdrop-blur-xl border border-border`
- `.glass-nav` — nav variant: `bg-background/80 backdrop-blur-xl border-b border-border`
- `.glow-green` — green box-shadow glow
- `.glow-green-hover` — glow on hover with border highlight
- `.text-gradient-green` — green gradient text (clip)
- `.text-gradient-gold` — gold gradient text (clip)
- `.hero-title` — responsive hero heading (clamp 2.5rem–4rem, weight 800)
- `.section-title` — responsive section heading (clamp 1.8rem–2.5rem, weight 800)
- `.label-text` — uppercase tracking label (xs, uppercase, tracking-wider, bold)

### Font
Inter (loaded from Google Fonts) — weights 400, 500, 600, 700, 800.

## CDN URLs
All Courtana production assets are served from `cdn.courtana.com`:

```
# Logos
https://cdn.courtana.com/assets/logos/fulllogo-dark-transparent-grad.svg

# Video — hero / highlight reel
https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/ce00696b-9f9b-465a-971c-dbf1334e556c.mp4

# Video poster
https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/01915c59-9bb7-4683-bd53-e28bddcae12e.jpeg

# Avatar — PickleBill profile pic
https://cdn.courtana.com/files/production/u/a3c7e1d0-4b2f-4a8e-9f1c-6d5e8b3a2c1f/7d873c1f-ec81-487a-8fe7-97bdb94a6397.png

# Rank badge — Gold III
https://cdn.courtana.com/files/production/u/0573819f-7e19-4e13-8d5c-90a771136f7e/58a41527-1ba8-4805-a8ab-5431ceb7c6ac.png

# Venue images
https://peakpickleball.club/wp-content/uploads/2026/03/IMG_2132-scaled.jpeg
https://cdn.courtana.com/files/production/u/faad1826-b310-4602-89d2-cc8eea8444f6/ec96dfd7-0230-405d-82bd-178872f97277.jpeg
https://cdn.courtana.com/files/production/u/faad1826-b310-4602-89d2-cc8eea8444f6/a56fe78b-c504-4d1a-bb72-b37a9573da0c.jpeg
```

### CDN Storage Structure
Files are organized by UUID directories under `files/production/u/`:
- Highlights: `01915c59-9bb7-4683-bd53-e28bddcae12e`
- Highlight thumbnails: `faad1826-b310-4602-89d2-cc8eea8444f6`
- Avatars: `a3c7e1d0-4b2f-4a8e-9f1c-6d5e8b3a2c1f`
- Ranks: `0573819f-7e19-4e13-8d5c-90a771136f7e`
- Badges: `eefe1c2b-6708-4f79-ba0f-897f04974e94`
- Courts: `8dd94047-e4f5-41d3-b68b-135c0087b874`
- Store items: `a7c3e1f4-9b2d-4e8a-b5f6-c8d0e2f4a6b8`
- Facility scoreboards: `fef6135c-5343-4399-9c50-ab2739066852`
- Live feeds: `a9d144b6-c982-4d13-9f9c-8d8e4c9405ff`

## Courtana Production API
The production Django app at `courtana.com` exposes REST APIs. The live data layer (`src/data/courtana-live.ts`) bridges this venue app to real Courtana data.

### Public (anonymous) endpoints — no auth required:
- `GET /app/anon-highlights/` — highlights list
- `GET /app/anon-highlight-groups/` — grouped highlights by match
- `GET /app/anon-highlight-collections/` — full collections
- `GET /app/anon-matches/` — match data
- `GET /app/anon-live-feeds/` — camera feeds
- `GET /app/anon-badge-awards/` — badge awards
- `GET /app/anon-showcase/` — showcase/leaderboard
- `GET /app/anon-profiles/` — player profiles
- `GET /app/store-items/` — store catalog

### View routes (public, sharable):
- `/highlight/{random_id}/` — single highlight page
- `/highlight-group/{random_id}/` — highlight group page
- `/match-highlights/{random_id}/` — match highlights page
- `/badge/{random_id}/` — badge award page
- `/player/{random_id}/` — player profile page
- `/session-highlights/{random_id}/` — session highlights

### Authenticated endpoints (require JWT):
- `/app/courts/`, `/app/matches/`, `/app/highlights/`, etc.
- Staff variants: `/app/staff-*`, `/app/facility-staff-*`

## Data Files
- `src/data/events.ts` — pilot event programming (7 events for Peak Pickleball launch)
- `src/data/partners.ts` — ecosystem partner network
- `src/data/courtana-live.ts` — real-time bridge to Courtana production API

## Key Venue: Peak Pickleball
- Location: Greensboro, NC
- Courts: 19 total, 6 Courtana smart courts (Phase 1)
- Members: 250+
- Owner: Chris Kelly
- Pilot: April 7 – June 1, 2026
- Adjacent: 30 seconds from Sheraton hotel, visible from highway

## Animation Patterns
Standard Framer Motion pattern used across all pages:
```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
```

## Conventions
- Use shadcn/ui `Button` component with consistent styling
- Cards use `.glass` utility class
- Section headings use `.section-title` class
- Green glow effects via `.glow-green` / `.glow-green-hover`
- Gradient text via `.text-gradient-green` / `.text-gradient-gold`
- All external links use `target="_blank" rel="noopener noreferrer"`
- Mobile-first responsive design with `sm:`, `md:`, `lg:` breakpoints
