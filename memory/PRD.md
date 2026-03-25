# GOLFGATE Catalunya - PRD

## Problem Statement
Standalone golf tee time booking landing page for Catalunya, inspired by golfinmallorca.com (GIM). Uses real Catalonia course data from greenfee365.

## Implemented Features
- 20 real Catalonia courses with GIM-style flip cards (image top, text below, green gradient back - NO grey)
- Individual SEO course pages at /courses/{id}
- Navbar: Language (hover, dark glass dropdown) -> Weather 7-day (hover, dark glass) -> Admin gear -> CTA
- Hero: heading, subtext, CTA, SCROLL mouse indicator (animated)
- "Play Golf Wherever You Are" worldwide banner (amber/gold accents, Playfair Display italic, warm overlay, links to greenfee365.com)
- Cookie consent: GIM dark glass style (rgba(18,18,14,0.78), blur(20px), 220px compact) with cookie icon, Accept, Preferences, Learn more
- GIM 3-column footer: BLACK bg (#1a1a1a), logo in original colors, keyword-rich description, Quick Links, Services, Contact Info, copyright
- Admin Panel /admin with login (admin/golfgate2026), course editing, blog CRUD
- Contact section with centered boxes (email mailto, phone, location)
- QuickView modal for quick course preview

## Architecture
- Frontend: React + Tailwind + Lucide icons
- Backend: FastAPI + Motor MongoDB
- Data: catalunya_courses.py (20 courses) + MongoDB override
- Weather: open-meteo.com API (free)

## Key Files
- GolfgateCatalunyaPage.jsx (main page, navbar, hero, footer, cookie consent)
- CatalunyaCourseCard.jsx (flip card)
- CatalunyaQuickView.jsx (modal)
- CatalunyaWeather.jsx (7-day forecast, hover dropdown)
- CatalunyaAdminPanel.jsx (login + course edit + blog CRUD)
- App.css (flip card CSS - transparent back, scroll mouse animation)

## API Endpoints
- GET /api/catalunya-courses - 20 active courses
- PATCH /api/admin/catalunya-course/{id} - Update course
- GET/POST/PUT/DELETE /api/admin/blog-posts - Blog CRUD

## Completed (Feb 2026)
- P0 Fix: Cookie consent exact GIM dark glass (rgba(18,18,14,0.78), 220px compact)
- P0 Fix: Card back grey removed (CSS .flip-card-back -> transparent, no padding)
- P0 Fix: Worldwide banner amber/gold (not lime), CTA -> greenfee365.com
- All 13 frontend features verified at 100% (iteration_28.json)

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
