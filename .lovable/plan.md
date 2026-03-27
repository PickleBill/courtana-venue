

# Peak Pickleball — Next Steps: Priority Polish Pass

## Summary
Eight changes across 5 files, split into **immediate** (this pass) and **deferred** (needs your CDN URLs). Focus: bring back leaderboard, make value props interactive, fix events flow, upgrade partners data, embed live display iframe, and prep for analytics.

---

## IMMEDIATE CHANGES (This Pass)

### 1. Bring Back Leaderboard + Link to Gamification Panel
**File:** `src/pages/Landing.tsx`
- Restore the `LeaderboardMockup` component (it still exists at `src/components/mockups/LeaderboardMockup.tsx`)
- Wire it as the hover/expand state for the "Gamification That Sticks" value prop card
- Update the leaderboard link from `courtana.com` to `https://courtana.com/leaderboard/`
- Add a "View Global Leaderboard" CTA button on the mockup that links out

### 2. Make Value Prop Cards Interactive (Hover Reveal)
**File:** `src/pages/Landing.tsx`
- Add `useState` to track which card is active (hover on desktop, click on mobile)
- Each card gets a secondary visual that appears on hover/tap:

| Card | Hover Content |
|------|--------------|
| Cameras on 6 Courts | Iframe of `https://courtana.com/display/ENgYPNHxUt7H` (public, confirmed working) |
| We Run Your Events | Link flash to `/events` page with "Browse Events" CTA |
| AI Coaching | Static image — use the existing AI analysis CDN image for now in green frame |
| Gamification That Sticks | `LeaderboardMockup` component with link to `courtana.com/leaderboard/` |
| Open Play, Solved | Show the court display iframe (same display URL) — real-time court status |
| Live Broadcast | Keep current desc, link to display URL in new tab |

- Cards expand with `AnimatePresence` on hover (desktop) or tap (mobile), showing a preview panel below the description

### 3. Fix Events Page — Remove mailto, Restore Booking Flow
**File:** `src/pages/Events.tsx`
- Change `handleBook` from `mailto:` redirect to opening the booking modal (`setBookingEvent(event.id)`)
- The booking modal already exists in the file (lines 181-218) but is never triggered because `handleBook` does mailto instead
- Add a placeholder image area to each event card (gradient with category icon, already there but could use a real image if available)

### 4. Upgrade Partners Data — Add Concord Venues from Concord Fork
**File:** `src/data/partners.ts`
- Import the expanded partner list from the Concord version: add Underground Pickleball (Live), Concord Pickleball (Coming Soon), Urban Pickleball ATX (Coming Soon), Seven Oaks (Coming Soon), Capital City Pickleball, StretchLab, Bryant (Padel Bryant), Racket Science, G5quared
- Add new category types: `"Influencer" | "Health & Wellness" | "Marketing"`
- Keep Peak as first entry with its video
- Add `categories?: PartnerCategory[]` to Partner interface for multi-category partners

### 5. Clean Up Partners Page Hero
**File:** `src/pages/Partners.tsx`
- Remove the "Live Evidence Strip" video section below the flywheel
- Replace with Peak facility hero image (`https://peakpickleball.club/wp-content/uploads/2026/03/IMG_2132-scaled.jpeg`) as a featured venue card with "Featured Venue Partner" badge
- Link to `peakpickleball.club`

### 6. See It In Action — Middle Panel as Live Video
**File:** `src/pages/Landing.tsx`
- Panel 1 (Court Display): Keep static image, link to display URL
- Panel 2 (AI Analysis): Embed as iframe `https://courtana.com/display/ENgYPNHxUt7H` with "LIVE" badge — this is the public display page
- Panel 3 (Peak AI Analysis): Keep the CDN video with LIVE badge

### 7. Dashboard — Minor UX Improvements
**File:** `src/pages/Dashboard.tsx`
- Make the "Week 1 of 8" pill a clickable selector (dropdown or horizontal scroll of 1-8)
- Make event table rows clickable — link to `/events` or the specific event detail page
- Add hover states to the pilot scorecard cards

### 8. Discovery Page — Standardize Scrollbar UX
**File:** `src/pages/Discovery.tsx` + `src/components/discovery/DiscoveryInputs.tsx`
- Apply consistent `scrollbar-thin` styling to all scrollable sections
- Ensure sliders and inputs don't cause layout shift when typing

---

## DEFERRED (Needs Your Input)

- **Unique video URLs** for each "See It In Action" panel — you mentioned Peak AI Analysis is in your collections. Both `/collections/` and `/leaderboard/` are login-gated, so I can't pull them. Provide CDN `.mp4` URLs and I'll swap instantly.
- **Courtana display iframe**: The `courtana.com/display/ENgYPNHxUt7H` page is public and renders a live court view. I'll try embedding it as an iframe — if Courtana sets `X-Frame-Options: DENY`, it won't work and we'll fall back to a screenshot + link.
- **Analytics/session tracking**: Requires connecting Lovable Cloud (Supabase) to capture visitor interactions on Discovery and Dashboard. This is a separate task — I'll set it up once you confirm you want it wired.
- **Friends page**: You mentioned this is a new Courtana feature. Share the URL when ready and I can add it as a value prop or partner feature.

---

## Files Changed
- `src/pages/Landing.tsx` — interactive value props, leaderboard restore, See It In Action panels
- `src/pages/Events.tsx` — fix booking flow (modal instead of mailto)
- `src/data/partners.ts` — expanded partner list from Concord fork
- `src/pages/Partners.tsx` — hero cleanup, Peak featured card
- `src/pages/Dashboard.tsx` — week selector, clickable events
- `src/pages/Discovery.tsx` — scrollbar consistency
- `src/components/discovery/DiscoveryInputs.tsx` — scrollbar consistency

## Technical Notes
- `LeaderboardMockup` component already exists and works — just needs to be re-imported into Landing
- The display iframe URL is public (confirmed via fetch — no login redirect)
- Concord partner data is pulled directly from the Concord fork project
- No new dependencies needed
- All changes are additive — no existing animations or routing changes

