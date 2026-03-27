

# Plan: Landing Page Polish + Asset Diversification + Badge Removal

## Summary
Four workstreams: (1) hero video upgrade, (2) remove Lovable badge, (3) diversify assets using real Courtana CDN images + Peak facility photos, (4) restructure above-the-fold content.

---

## What I Can Do Right Now (This Pass)

### 1. Hero Video — Make It Wider + Clickable
- Remove `max-h-64 object-cover` constraint so the full highlight plays uncropped
- Change `max-w-2xl` to `max-w-4xl` for wider presentation
- Wrap the video in an `<a>` tag linking to the Courtana highlight page (or a fullscreen modal) so clicking opens the full video with sound
- For now: link to `https://courtana.com` or a direct highlight URL you provide later

### 2. Remove "Edit with Lovable" Badge
- Use the `set_badge_visibility` tool to hide it globally across all published deployments
- Requires a paid plan (Pro or higher)

### 3. Diversify "See It In Action" Panel Assets
Replace the three identical videos with real Courtana CDN images matched to each value prop:

| Panel | Current | Replacement |
|-------|---------|-------------|
| Court Display | Same video | `cdn.courtana.com/assets/livefeedcourt+(Medium).png` (real court-side TV showing live feed) |
| AI Analysis | Same video | `cdn.courtana.com/assets/aianalysis2.png` (AI coaching analysis screenshot) |
| Peak AI Analysis | Same video | Keep the video here (this is the "live" panel with the LIVE badge) |

### 4. Restructure Above-the-Fold Content
Current order below hero: Stats Bar → "Already Running" (leaderboard + video) → Quotes → See It In Action → Value Props → Timeline...

**New order:**
- **Hero**: Keep as-is but with wider video (change 1)
- **Stats Bar**: Keep
- **"What We Heard"** (quotes): Move UP to right after stats — lightweight, text-only, loads fast
- **See It In Action**: Keep (now with diverse assets)
- **Value Props**: Keep
- **Timeline**: Keep
- **Remove or relocate the fake leaderboard section**: The "Already Running" section with the hardcoded leaderboard mockup gets cut. The stat strip (4,097 highlights / 25 players / 82+ badges) moves into the "See It In Action" section as a footer. The second video embed in that section is removed (it duplicates the hero).

### 5. Add Peak Facility Image to Hero Area
Add a side-by-side or stacked presentation showing Peak's actual facility alongside the Courtana highlight:
- Use `https://peakpickleball.club/wp-content/uploads/2026/03/IMG_2132-scaled.jpeg` (the wide courts shot)
- Display as a glass card with "Peak Pickleball — 19 Courts, Greensboro NC" label and link to peakpickleball.club

### 6. Add Ecosystem Section at Bottom (Like Concord)
Before the CTA, add a compact "Part of Something Bigger" section with:
- The `EcosystemFlywheel` component (compact mode)
- A few partner logos/cards
- Link to `/partners`

---

## What You'll Need to Provide for the Next Pass
- **Different video URLs** for each of the three "See It In Action" panels (Peak AI analysis, underground highlights, etc.) — I can swap them in instantly once you have CDN URLs
- **A direct link to the specific Peak highlight** on courtana.com for the clickable hero video
- **Confirmation on the live leaderboard**: If you want a real leaderboard instead of the mockup, we'd need an API endpoint or iframe from courtana.com

---

## Files Changed
- `src/pages/Landing.tsx` — hero video sizing, section reorder, asset swap, leaderboard removal, ecosystem section addition
- Badge visibility setting (platform-level, not a file change)

## Technical Notes
- All CDN image URLs are public and load without auth (confirmed by fetching courtana.com)
- Peak WordPress images are public JPEGs, no hotlink protection detected
- The `EcosystemFlywheel` component already exists and supports `compact` mode
- No new dependencies or routing changes

