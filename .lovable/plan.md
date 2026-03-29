

## Navbar "See More" + "Exclusive" Portal

### What we're building

Two new entry points in the VenuePreview navbar (the single-page venue site at `/`):

1. **"See More" CTA button** — slightly pronounced (outline/glow style), links to `/see-more`
   - New page that combines: Ecosystem/Partners content + a genericized version of the Plan (Landing page clone with Peak-specific quotes/names softened)

2. **"Exclusive" link** — links to `/exclusive`
   - New hub page titled "Custom Venue Dashboard" that links out to the deeper tools: Dashboard, Investor view, Player Showcase, Discovery, Events, Schedule

### Files to create

| File | Purpose |
|------|---------|
| `src/pages/SeeMore.tsx` | Ecosystem flywheel + genericized plan content (clone key sections from Landing.tsx, replace "Peak Pickleball" references with generic venue language, keep CDN assets) |
| `src/pages/Exclusive.tsx` | Card-grid hub linking to `/dashboard`, `/investor`, `/player`, `/events`, `/schedule`, `/discovery` |

### Files to modify

| File | Change |
|------|--------|
| `src/pages/VenuePreview.tsx` | Add "See More" and "Exclusive" to `navLinks` array; "See More" gets a slightly styled CTA treatment in the nav |
| `src/App.tsx` | Add routes for `/see-more` and `/exclusive` |

### Nav treatment (in VenuePreview's custom nav)

- Existing anchor links stay as-is
- Add `"See More"` as a `<Link to="/see-more">` styled as a small outlined/glow button (similar to existing CTA patterns)
- Add `"Exclusive"` as a subtle text link or small badge-style link

### SeeMore page content

- Uses `<Navbar />` (shared nav) so user can navigate back
- Section 1: Ecosystem Flywheel (reuse `<EcosystemFlywheel />` component + partner highlights)
- Section 2: "The Courtana Plan" — cloned from Landing.tsx key sections (hero stats, value props, tech cards, timeline) but with references like "Peak Pickleball" → "Your Facility", Chris Kelly quotes → generic venue operator quotes

### Exclusive page content

- Uses `<Navbar />`
- Hero: "Custom Venue Dashboard" title
- Grid of glass cards linking to each sub-page (Dashboard, Investor, Player, Events, Schedule, Discovery) with icons and one-line descriptions

### Technical details

- VenuePreview has its own inline nav (not the shared `<Navbar />`), so the CTA additions go into its `navLinks` array and render logic
- The SeeMore and Exclusive pages use the shared `<Navbar />` component, which will need "See More" and "Exclusive" added to its link arrays
- Landing.tsx is 717 lines; SeeMore will cherry-pick the best sections rather than full clone

