# Plan: Restore Navigation, Remove Password Gate, Update Courts/Cameras, Add Calendar

## Answering Your Questions First

**Partner Login**: Currently it's just a styled button in the navbar that doesn't do anything. We can wire it up later to a real auth flow, or for now make it link to the Dashboard. -> I don't ever want dead links to ever come out, especially not one that is like a primary CTA. 

**Remixing**: Yes -- when you remix a project, it creates a full copy of the codebase at that point in time. Your original project stays exactly as it is. You can always go back to any previous build by checking git history or remixing before making changes.

---

## Changes

### 1. Navbar -- Restore All Pages + Remove Lock Icon

Expand nav links back to include all pages. Use a dropdown or "More" menu to keep it clean:

- **Primary links**: The Plan | Events | Dashboard | Discovery
- **"More" dropdown**: Partners (Ecosystem) | Schedule | About
- **Partner Login button**: Links to `/dashboard` for now
- Remove the Lock icon from Dashboard

### 2. Dashboard -- Remove Password Gate

Strip out the password check, `sessionStorage`, and the login card. Dashboard renders directly with all its charts and data. Keep all existing content (KPI cards, utilization chart, revenue chart, event table, pilot scorecard). -> I'm down to keep the session storage. I want to make this as real as possible. 

### 3. Update Courts/Cameras Numbers Everywhere

Change from "4 courts" to **"6 courts"** and add **"10 cameras"** across:

- Landing hero stats: "6 Smart Courts" + add "10 Cameras"
- Value props: "Cameras on 6 Courts" with updated description
- Timeline references (week 1 install, week 4 tournament, etc.)
- Economics: update $95/court × 6 = $570/mo pilot, 16-court expansion math stays.  
- Zero Risk box: "6 courts. 10 cameras."
- Dashboard header references

### 4. Landing Page Timeline -- Make Weeks Clickable

Each week card in the 8-week timeline becomes a clickable link. Clicking a week navigates to a dedicated route `/week/:num` (or scrolls to an expanded detail view). For now, implement as **expandable cards** -- clicking a week expands it to show full programming details, deliverables become clickable pills that link to relevant pages:

- Event deliverables → `/events`
- Dashboard deliverables → `/dashboard`
- Coaching deliverables → `/discovery`

### 5. Add Events Calendar Page

Create a simple calendar view on the `/schedule` page (it already exists but shows a court grid). Add a **monthly calendar** at the top using the existing shadcn Calendar component or a simple grid, with event dots on dates that have events. Clicking a date shows events for that day. Keep the court schedule grid below it.

### 6. Bottom CTA Buttons -- Simplify & Link

The bottom CTA buttons on the landing page: make "Let's Go" mailto and "Pilot Dashboard" link to `/dashboard`. Add a third: "View Calendar" → `/schedule`.

## Files Modified

- `src/components/Navbar.tsx` -- expanded nav with More dropdown, Partner Login → /dashboard
- `src/pages/Dashboard.tsx` -- remove password gate (lines 51-68), render dashboard directly
- `src/pages/Landing.tsx` -- update stats (6 courts, 10 cameras), make week cards expandable/clickable, update all court references, update CTA buttons
- `src/data/events.ts` -- update any "4 court" references
- `src/pages/Schedule.tsx` -- add monthly calendar header with event dots above the court grid

## Remix Strategy

To split features into separate remixes later:

- **Remix before each major change** to preserve the current state as a fallback
- **Venue-specific portals**: Remix this project for each new venue (Peak, next venue, etc.) and customize the content
- **Core platform vs partner sites**: Keep this as the "Peak portal" remix; create a clean "template" remix with placeholder content for new venues
- The Discovery dashboard, Partners ecosystem, and Schedule can each be extracted into standalone remixes if needed