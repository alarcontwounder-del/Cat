# GOLFGATE Catalunya - PRD

## Problem Statement
Standalone golf tee time booking landing page for Catalunya, inspired by golfinmallorca.com (GIM). Uses real Catalonia course data from greenfee365. All UI components must EXACTLY match GIM's designs.

## Implemented Features
- 20 real Catalonia courses with GIM-style flip cards (image top, text below, green gradient back - NO grey)
- Individual SEO course pages at /courses/{id}
- Navbar: Language (hover, dark glass dropdown) -> Weather 7-day (hover, dark glass) -> Admin gear -> CTA
- Hero: heading, subtext, CTA, SCROLL mouse indicator (animated)
- "Play Golf Wherever You Are" worldwide banner (GIM exact: golden #c8a03e accents, UPPERCASE badge, Playfair Display italic heading fontWeight 500, warm gradient overlay, CTA to greenfee365.com)
- Cookie consent: GIM exact (warm brown glass rgba(28,24,18,0.72), blur(16px), 220px, borderRadius 20px, cookie icon, Accept with 1.5px white border, Preferences)
- GIM 3-column footer: BLACK bg (#1a1a1a), logo in original colors, keyword-rich description, Quick Links, Services, Contact Info, copyright
- Admin Panel /admin with login (admin/golfgate2026), course editing, blog CRUD
- Contact section with centered boxes (email mailto, phone, location)
- QuickView modal for quick course preview
- Card text overflow fixed with overflow-hidden on text container

## Architecture
- Frontend: React + Tailwind + Lucide icons
- Backend: FastAPI + Motor MongoDB
- Data: catalunya_courses.py (20 courses) + MongoDB override
- Weather: open-meteo.com API (free)

## Key Files
- GolfgateCatalunyaPage.jsx (main page, navbar, hero, footer, cookie consent)
- CatalunyaCourseCard.jsx (flip card with overflow-hidden text fix)
- CatalunyaQuickView.jsx (modal)
- CatalunyaWeather.jsx (7-day forecast, hover dropdown)
- CatalunyaAdminPanel.jsx (login + course edit + blog CRUD)
- App.css (flip card CSS - transparent back, scroll mouse animation)

## API Endpoints
- GET /api/catalunya-courses - 20 active courses
- PATCH /api/admin/catalunya-course/{id} - Update course
- GET/POST/PUT/DELETE /api/admin/blog-posts - Blog CRUD

## Completed (25 Mar 2026)
- P0 Fix Round 2: Cookie consent GIM exact (warm brown glass, 220px, 20px radius)
- P0 Fix Round 2: Banner GIM exact (UPPERCASE badge, golden #c8a03e, Playfair italic 500, warm overlay)
- P0 Fix Round 2: Card text overflow fix (overflow-hidden, flex-shrink-0)
- P0 Fix Round 1: Card back grey removed (CSS transparent)
- All 12 frontend features verified at 100% (iteration_29.json)

## P1 Pending
- Navbar & Footer logo pixelation check + dropdown UI polish
- Language/Weather dropdown z-index overlap + close-on-hover improvements

## Upcoming (P2)
- Full multilingual support (EN, ES, CA, DE, FR, SE)
- Privacy Policy + Terms of Service pages (adapt GIM text)
- Hero image replacement (user to provide)

## Future/Backlog
- SEO enhancements
- Component refactoring (GolfgateCatalunyaPage.jsx is 420+ lines)
