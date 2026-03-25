# GOLFGATE Catalunya - PRD

## Problem Statement
Standalone golf tee time booking landing page for Catalunya, inspired by golfinmallorca.com (GIM). All UI must EXACTLY match GIM designs.

## Implemented Features
- 20 real Catalonia courses with flip cards (image top, text below, green gradient back)
- Individual SEO course pages at /courses/{id}
- Navbar: Language → Weather 7-day → Admin gear → CTA
- Hero: heading, subtext, CTA, SCROLL mouse indicator
- Worldwide banner: GIM exact (480px tall, UPPERCASE golden badge, Playfair italic 500, CTA wraps 2 lines 240px max-width, warm overlay)
- Cookie consent: GIM exact (280px, 16px radius, 18px text, warm olive glass rgba(35,32,22,0.68) blur(18px), 1.5px border Accept)
- Footer: BLACK bg 3-column, logo, keyword description, Quick Links, Services, Contact
- Admin Panel /admin (admin/golfgate2026)
- Card text: strict 2-line clamp via inline WebkitLineClamp, overflow hidden, flex-shrink-0

## Architecture
- Frontend: React + Tailwind + Lucide | Backend: FastAPI + MongoDB | Weather: open-meteo.com

## Key Files
- GolfgateCatalunyaPage.jsx, CatalunyaCourseCard.jsx, CatalunyaWeather.jsx, CatalunyaAdminPanel.jsx, App.css

## Completed (25 Mar 2026)
- Round 3: Cookie 280px/18px/16px-radius, Banner 480px tall + CTA wraps, Card WebkitLineClamp fix
- Round 2: UPPERCASE badge, golden #c8a03e, card overflow-hidden
- Round 1: Card back grey removed, flip-card-back transparent

## Pending
- P1: Logo pixelation, dropdown z-index/glass polish
- P2: Multilingual, Privacy/Terms pages, Hero image replacement
