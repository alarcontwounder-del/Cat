# GOLFGATE Catalunya - PRD

## Problem Statement
Standalone golf tee time booking landing page for Catalunya, inspired by golfinmallorca.com (GIM). All UI must EXACTLY match GIM designs.

## GIM Matching Approach (LOCKED)
When user asks to match ANYTHING from GIM:
1. Pull exact source code from golfinmallorca.com using Playwright
2. Build standalone mockup for approval
3. Only deploy after user confirms

## Implemented Features
- 20 real Catalonia courses with flip cards (green gradient back, no grey)
- Individual SEO course pages at /courses/{id}
- Navbar: Language (GIM pill style) → Weather (GIM pill style) → Admin gear → CTA
- Logo: anti-aliased LANCZOS versions for nav (563x144) and footer (312x80)
- Hero: heading, subtext, CTA, SCROLL mouse indicator
- Cookie consent: EXACT GIM code (w-[260px] bg-black/50 backdrop-blur-md rounded-2xl border-white/15 p-5)
- Worldwide banner: EXACT GIM code (rounded-3xl, charcoal gradient overlay, font-heading, rounded-full CTA)
- Footer: BLACK bg 3-column, logo, keyword description
- Admin Panel /admin (admin/golfgate2026)
- Card text: strict WebkitLineClamp fix, overflow hidden

## Architecture
Frontend: React + Tailwind + Lucide | Backend: FastAPI + MongoDB | Weather: open-meteo.com

## Completed (25 Mar 2026)
- Logo: LANCZOS anti-aliased versions (was pixelated, zero anti-aliasing)
- Language: GIM exact structure (rounded-full border pill with EN + chevron)
- Weather: GIM exact structure (rounded-full glass pill with icon + temp + chevron)
- Cookie + Banner: EXACT GIM source code
- Card back: transparent, card text: WebkitLineClamp overflow fix

## Pending
- P2: Multilingual, Privacy/Terms pages, Hero image replacement
