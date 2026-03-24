

# Plan: Rebrand to Courtana + Add Dashboard, Mockups, and Creative Links

## Summary
Rename all "Cortana" references to "Courtana" throughout the app, add a new `/dashboard` page with creative ROI analytics and engagement mockups, embed visual mockups of Courtana's features (leaderboards, badges, AI analysis, instant replay), and add courtana.com links in creative placements.

## Changes

### 1. Global Rebrand: Cortana → Courtana
Update every file that references "Cortana" (Navbar, Footer, Landing, Events, EventDetail, About, Schedule, index.html) to use "Courtana" spelling consistently. Change "Cortana Connect" to "Courtana Connect" in the navbar logo.

### 2. New Dashboard Page (`/dashboard`)
Add a new route and page at `/dashboard` with a creative, data-rich layout showcasing what a venue partner would see:

- **Header**: "Courtana × Peak — Pilot Dashboard" with a "Powered by courtana.com" link
- **KPI Row** (animated counters): Total Revenue ($4,280), Court Utilization (67%), Active Players (142), Events Run (12)
- **Revenue Chart**: Recharts area chart showing 8-week revenue trend with gradient fill, comparing Courtana events vs baseline
- **Court Utilization Heatmap**: Visual grid showing utilization by hour/day with color intensity (using the existing color system)
- **Event Performance Table**: List of past events with revenue, attendance rate, repeat player %, and ROI score
- **Engagement Metrics Section**: Cards showing leaderboard participation rate, badges earned, average session frequency
- **Player Growth Chart**: Line chart showing cumulative player signups over the pilot

### 3. Feature Mockup Components
Create visual mockup cards embedded on the Landing page (new section before the CTA) and the About page:

- **Leaderboard Mockup**: A card styled like the uploaded screenshot — ranked player list with XP, levels (Gold/Silver/Bronze), rank badges, and a progress bar. Use generated placeholder avatars (colored circles with initials) and fictional player names. Gold/amber accents for top ranks.
- **Badges/Achievements Mockup**: Grid of earned badge cards (e.g., "Steady Eddie", "One-Handed Backhand", "Kitchen King", "Rally Master") with shield-style icons in purple/teal color coding
- **AI Analysis Mockup**: Card showing a court diagram with shot placement dots, a stats panel (shot speed, spin rate, accuracy %), and an "AI Analyze" button styled in the brand gradient
- **Instant Replay Mockup**: Card with a simulated video thumbnail (court gradient with play button overlay), timestamp, and thumbnail strip

### 4. Creative courtana.com Links
Place courtana.com links throughout the app in engaging ways:
- **Navbar**: Small "by courtana.com" subtext under logo (links externally)
- **Footer**: "Powered by Courtana" with logo mark linking to courtana.com
- **Landing hero**: "A courtana.com experience" badge near the subtitle
- **Dashboard**: "Powered by Courtana Smart Court Technology — courtana.com" banner
- **Event detail pages**: "Smart court stats powered by courtana.com" in the booking card
- **About page**: "Learn more at courtana.com" CTA button

### 5. Add Dashboard to Navigation
Add "Dashboard" link to navbar (between Schedule and About) and footer.

### 6. Landing Page Enhancements
Add a new "See It In Action" section between the timeline and economics sections showing the feature mockups (leaderboard, badges, AI analysis, replay) in a 2x2 grid with descriptive text about how each drives engagement and revenue.

## Technical Details

**Files to create:**
- `src/pages/Dashboard.tsx` — full dashboard page with Recharts charts, KPI cards, and mockup sections
- `src/components/mockups/LeaderboardMockup.tsx` — visual leaderboard component
- `src/components/mockups/BadgesMockup.tsx` — badge grid component
- `src/components/mockups/AIAnalysisMockup.tsx` — AI analysis card
- `src/components/mockups/ReplayMockup.tsx` — instant replay card

**Files to modify:**
- `src/App.tsx` — add `/dashboard` route
- `src/components/Navbar.tsx` — rename to Courtana, add Dashboard link, add courtana.com subtext
- `src/components/Footer.tsx` — rename, add courtana.com link
- `src/pages/Landing.tsx` — rename all, add "See It In Action" section with mockups
- `src/pages/About.tsx` — rename, add courtana.com CTA, embed mockups in tech section
- `src/pages/Events.tsx` — rename references
- `src/pages/EventDetail.tsx` — rename, add courtana.com trust line
- `src/pages/Schedule.tsx` — rename references
- `src/data/events.ts` — rename references in descriptions
- `index.html` — rename meta tags

**Libraries used:** Recharts (already available via chart.tsx), framer-motion, lucide-react — no new dependencies needed.

