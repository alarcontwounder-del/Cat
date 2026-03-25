# GOLFGATE Catalunya - PRD

## Problem Statement
Standalone golf tee time booking landing page for Catalunya, inspired by golfinmallorca.com (GIM). All UI must EXACTLY match GIM designs.

## GIM Matching Approach (LOCKED)
When user asks to match ANYTHING from GIM:
1. Pull exact source code from golfinmallorca.com using Playwright
2. Build standalone mockup at /mockup.html for approval
3. Only deploy after user confirms

## Implemented Features
- 20 real Catalonia courses with flip cards (green gradient back, no grey)
- Individual SEO course pages at /courses/{id}
- Navbar: Language → Weather 7-day → Admin gear → CTA
- Hero: heading, subtext, CTA, SCROLL mouse indicator
- Cookie consent: EXACT GIM code (w-[260px] bg-black/50 backdrop-blur-md rounded-2xl border-white/15 p-5, 13px text, rounded-lg Accept)
- Worldwide banner: EXACT GIM code (rounded-3xl, charcoal gradient overlay, font-heading text-3xl md:text-4xl, rounded-full white CTA, text-white/60 subtext)
- Footer: BLACK bg 3-column, logo, keyword description
- Admin Panel /admin (admin/golfgate2026)
- Card text: strict WebkitLineClamp fix, overflow hidden

## Architecture
Frontend: React + Tailwind + Lucide | Backend: FastAPI + MongoDB | Weather: open-meteo.com

## Key Files
- GolfgateCatalunyaPage.jsx (main page, cookie, banner, footer)
- CatalunyaCourseCard.jsx (flip card)
- CatalunyaWeather.jsx, CatalunyaAdminPanel.jsx, App.css

## Completed (25 Mar 2026)
- Cookie + Banner: deployed with EXACT GIM source code extracted via Playwright
- Card back: transparent (no grey)
- Card text: WebkitLineClamp overflow fix

## Pending
- P1: Logo pixelation, dropdown z-index/glass polish
- P2: Multilingual, Privacy/Terms pages, Hero image replacement
