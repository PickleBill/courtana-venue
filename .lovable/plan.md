

# Quick Polish Pass — Landing, Partners, About, Discovery

## 1. "See It In Action" — Center Panel Gets Peak Highlight Video

**File:** `src/pages/Landing.tsx` (lines 297-353)

Rearrange the 3 panels:
- **Panel 1 (left):** Keep current Court Display static image (CDN livefeedcourt)
- **Panel 2 (center):** Replace current AI Analysis static image with the **Peak AI Analysis video** extracted from `courtana.com/highlight/bcsPaTmCM2dw`:
  - Video: `https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/6bc572b0-a198-41ad-89d2-7d2b985ce410.mp4`
  - Poster: `https://cdn.courtana.com/files/production/u/faad1826-b310-4602-89d2-cc8eea8444f6/7d7e5202-8a02-4188-a7a4-c9c8ef596fb1.jpeg`
  - `autoPlay muted loop playsInline` with LIVE badge
  - Link wraps to `https://courtana.com/highlight/bcsPaTmCM2dw`
- **Panel 3 (right):** Keep the existing CDN_VIDEO (the original highlight)

## 2. Landing Hero Layout — Move Peak Image to Top-Right, Compact Title

**File:** `src/pages/Landing.tsx` (lines 188-248)

- Move the "Courtana × Peak Pickleball" title and CTA buttons to the **left** side
- Move the Peak facility image (`IMG_2132-scaled.jpeg`) to a **right column** alongside the title (use `grid lg:grid-cols-2` layout)
- Keep the hero video below as full-width, unchanged

## 3. Value Prop Cards — Green Background on Hover, Simplified

**File:** `src/pages/Landing.tsx` (lines 376-458)

- On hover/active, change card background to `bg-primary/10` (green tint) instead of just ring
- Replace the text description with the hover image/iframe content **inside the card body** (swap out the desc text)
- Show a single CTA button at the bottom: "Browse Events", "View Live", "View Global Leaderboard", etc.
- Remove the expanding `AnimatePresence` dropdown — instead, the card itself transitions its content

## 4. Partners Page — Fix Underground Description, Add Venue Images

**File:** `src/data/partners.ts`

- **Underground Pickleball:** Change location to "Raleigh, NC" (not Charlotte). Fix description to accurately describe it. Move the existing CDN video from Peak's entry to Underground's `videoUrl`.
- **Seven Oaks:** Add `imageUrl` using CDN thumbnail from Favorites collection: `https://cdn.courtana.com/files/production/u/faad1826-b310-4602-89d2-cc8eea8444f6/ec96dfd7-0230-405d-82bd-178872f97277.jpeg`
- **Urban Pickleball ATX:** Add `imageUrl` from Austin collection: `https://cdn.courtana.com/files/production/u/faad1826-b310-4602-89d2-cc8eea8444f6/a56fe78b-c504-4d1a-bb72-b37a9573da0c.jpeg`. Update description to mention 6 courts and "premier downtown Austin".
- **Peak Pickleball:** Use the Peak facility image as `imageUrl`, keep no video (hero handles that)

**File:** `src/components/partners/PartnerCard.tsx`

- If partner has `imageUrl` but no `videoUrl`, render the image as a card header (same frame as video cards, `h-40 object-cover`)

**File:** `src/pages/Partners.tsx`

- Keep the existing Peak hero card at top (already uses facility image)
- When "Venue Partners" tab is selected, show venue cards with their images

## 5. About Page — Court Display Image Instead of Duplicate Video

**File:** `src/pages/About.tsx` (lines 85-104)

- Replace the hero video (same CDN_VIDEO as landing) with the **live court display** image from the uploaded reference (image-3.png — the Underground live feed view)
- Use the CDN livefeedcourt image or the poster from the display page as a static image
- Keep the "Courtana Smart Court" label badge, change text to "Live Court Display"

## 6. Discovery Inputs — Better UX for Top Number Fields

**File:** `src/components/discovery/DiscoveryInputs.tsx` (lines 46-58)

- Replace the `<Input type="number">` fields for Courts, Members, Monthly Bookings, Monthly Events with **stepper buttons** (+ / - buttons flanking a displayed value)
- Use `flex items-center` with a minus button, the current value as centered text, and a plus button
- Steps: Courts +/- 1, Members +/- 50, Monthly Bookings +/- 100, Monthly Events +/- 1
- This eliminates the tiny embedded number input UX problem

---

## Files Changed
- `src/pages/Landing.tsx` — hero layout, See It In Action center panel, value prop card hover style
- `src/data/partners.ts` — Underground fix, venue images added
- `src/components/partners/PartnerCard.tsx` — render imageUrl as card header
- `src/pages/About.tsx` — swap hero video for court display image
- `src/components/discovery/DiscoveryInputs.tsx` — stepper inputs for top fields

## Assets Pulled from Courtana CDN (all public, no auth)
- Peak highlight video: `6bc572b0-a198-41ad-89d2-7d2b985ce410.mp4`
- Seven Oaks thumbnail: `ec96dfd7-0230-405d-82bd-178872f97277.jpeg`
- Urban ATX thumbnail: `a56fe78b-c504-4d1a-bb72-b37a9573da0c.jpeg`

