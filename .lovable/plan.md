

# Plan: Peak Pickleball Content Refinements + New Sections

## Summary
Seven targeted changes to Landing.tsx, Dashboard.tsx, and Footer.tsx. No new files, no structural/routing changes. Content updates + two new sections inserted before the CTA.

---

## Changes by File

### `src/pages/Landing.tsx`

**CHANGE 1 — No "35 courts" found anywhere.** Already says 19/16 where needed. No action.

**CHANGE 2 — Hero refinements (lines 22-27, 160-161)**
- Stats array → `[{6, "Smart Courts"}, {$0, "Upfront Cost"}, {8, "Week Pilot"}, {19, "Total Courts"}]`
- Subheadline → "Smart courts. Real data. Zero upfront cost. Your 8-week pilot starts April 7."

**CHANGE 3 — Quotes (lines 29-33, 208-209)**
- Add gamification quote as FIRST item: "The biggest problem with tech tools is they lose novelty after a month. If you can keep them coming back — badges, highlights, leaderboards — that changes everything."
- Keep existing 3 quotes after it (now 4 total)
- Grid changes from `md:grid-cols-3` to `md:grid-cols-2` to accommodate 4 quotes cleanly

**CHANGE 4 — Partnership Commitments section**
Insert new section between Economics (ends ~line 376) and CTA (starts ~line 379).
- Two-column glass cards stacking on mobile
- Left: green left border — "What Courtana Invests" with 7 list items (Handshake icon)
- Right: amber left border — "What Peak Invests" with 7 list items (Users icon)
- Centered italic text below: "This is a development partnership, not a software purchase..."
- Import `Handshake` from lucide-react

**CHANGE 5 — "What Happens Next" section**
Insert after Partnership Commitments, before CTA.
- Three-step horizontal flow (vertical on mobile) with number badges
- Step 1: "The Pilot" (8 WEEKS badge)
- Step 2: "The Decision" (WEEK 8 badge) — includes early commit incentive
- Step 3: "The Partnership" (ONGOING badge)
- Connecting arrow/line between steps via CSS borders

**CHANGE 6 — Economics updates (lines 324-374)**
- KPI card 2: sub text → "6 courts = $570/mo during pilot. 19 courts = $1,805/mo at full expansion."
- Zero Risk box: "Start with 6 courts. Zero hardware cost. No subscription during the 8-week pilot. After that, $570/month — your first AI coaching clinic makes that back in a single session."

**CHANGE 7 — CTA section (lines 386-417)**
- Headline → "Let's build something worth talking about."
- Subtitle → "The pilot starts the moment you say yes. Hardware installed in days. First event within the week."
- Primary: "Start the Conversation" → `mailto:bill@courtana.com?subject=Peak%20Pickleball%20Partnership`
- Secondary: "Explore the Ecosystem" → `/partners`
- Tertiary: "View the Dashboard" → `/dashboard`

### `src/pages/Dashboard.tsx`
No changes needed — already says "Peak Pickleball" and "6 courts" references are correct.

### `src/components/Footer.tsx`
No changes specified — leave as-is.

---

## Technical Notes
- Add `Handshake` to the lucide-react import on line 7
- Both new sections use existing `fadeInUp`, `stagger`, and `motion` patterns — no new animation logic
- Partnership Commitments uses `grid md:grid-cols-2` with glass cards
- "What Happens Next" uses `grid md:grid-cols-3` with connecting borders
- All responsive at 768px — both new sections stack to single column on mobile

