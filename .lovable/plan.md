

# Peak Pickleball — Final Consolidation Pass

## Summary
Merge the best elements from both versions into a single polished site. Seven targeted changes — no structural rewrites, just visual cleanup and asset consistency.

---

## Changes

### 1. Hero — Remove Peak Image from Top-Right, Keep Title Full-Width
**File:** `src/pages/Landing.tsx` (lines 190-234)

The Peak facility image in the hero top-right looks off. Remove the `grid lg:grid-cols-2` layout and revert to a centered single-column hero. Keep the title, subtitle, and CTA buttons centered/left-aligned and full-width. The hero video below already showcases the product. The Peak facility photo belongs on the Partners page (where it already lives as the featured card).

### 2. "See It In Action" — Keep Center Video, Remove Stats Strip, Fix Side Panels
**File:** `src/pages/Landing.tsx` (lines 293-377)

- **Center panel** (Peak highlight video): Already correct — keep it
- **Left panel** (Court Display): The CDN image URL `livefeedcourt+(Medium).png` may 404 due to URL encoding. Change to a fallback: use the poster image from the display page or a relevant Courtana homepage screenshot. For now, use `https://cdn.courtana.com/assets/aianalysis2.png` as a working CDN asset, or fall back to the Peak facility image
- **Right panel**: Same issue — both side panels should show **static images**, not duplicate videos. Use distinct CDN assets or the Peak facility shot and a gamification screenshot
- **Remove the stat strip** below ("4,097 Highlights / 25 Ranked / 82+ Badges") — it's unverifiable filler

### 3. Value Prop Cards — Simplify Hover to Green BG + CTA Only
**File:** `src/pages/Landing.tsx` (lines 380-480)

The iframe embeds on hover are heavy and may fail (X-Frame-Options). Simplify:
- On hover/active: change background to `bg-primary/10`, keep the icon + title visible, swap desc text for a single CTA button
- Remove iframe/image hover content entirely — they load slowly and break the UX
- Keep the `LeaderboardMockup` for the Gamification card only (it's a local component, loads instantly)
- Each card's CTA: "View Live Display", "Browse Events", "Learn More", "View Global Leaderboard", "View Court Status", "Watch Live"

### 4. Events Page — Add Category Hero Images (from Clone)
**File:** `src/pages/Events.tsx`

Port the `categoryImages` map from the clone version using Unsplash URLs:
```
Tournament: unsplash photo-1554068865-24cecd4e34b8
Special: unsplash photo-1544991875-5dc1b05f607d
Clinic: unsplash photo-1517838277536-f5f99be501cd
Open Play: unsplash photo-1571019613454-1cb2f99b2d8b
```

Replace the gradient placeholder `div` (lines 129-141) with an `<img>` tag using these images, matching the clone's pattern (image + gradient overlay + badges positioned at bottom-left). Same treatment for the featured event hero area.

### 5. Partners Page — Remove Peak Image Hero, Use Compact Featured Card
**File:** `src/pages/Partners.tsx` (lines 85-123)

The large Peak hero image with the Noble Academy booth isn't a great shot of Peak. Replace with the clone's compact "Flagship Venue" card pattern (text-based, no image, with a Rocket icon and "Flagship Venue" badge). This is cleaner and doesn't rely on a mediocre photo. Keep the flywheel above it.

### 6. Partners Data — Fix Underground Description
**File:** `src/data/partners.ts`

Underground's description already says "Raleigh" — confirm it's correct. The `videoUrl` on Underground currently points to the same CDN video as was on Peak. This is fine for now (it shows real Courtana footage). Ensure Peak's entry has `imageUrl` but no `videoUrl` (the hero handles Peak's video).

### 7. Economics Section — Minor Copy Cleanup
**File:** `src/pages/Landing.tsx` (lines 562-620)

The post-pilot card still says "6 courts = $570/mo" which is correct math but the user flagged it earlier as needing improvement. Update the sub-text to: `"$0 during the 8-week pilot. Post-pilot: $95/court/mo for continued service. Cancel anytime."` — clearer and emphasizes the zero-risk angle.

---

## Files Changed
- `src/pages/Landing.tsx` — hero layout simplification, See It In Action asset fixes, value prop card simplification, economics copy
- `src/pages/Events.tsx` — category hero images from Unsplash
- `src/pages/Partners.tsx` — compact featured card instead of large image
- `src/data/partners.ts` — verify Underground/Peak entries

## What This Does NOT Change
- 8-week timeline, Partnership Commitments, Path Forward, Ecosystem section — all untouched
- Dashboard, Discovery, About pages — untouched this pass
- No new dependencies or routing changes

