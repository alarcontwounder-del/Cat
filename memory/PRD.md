# GOLFGATE Catalunya - PRD

## Problem Statement
Standalone golf tee time booking landing page for Catalunya, inspired by golfinmallorca.com (GIM). Uses real Catalonia course data from greenfee365.

## Implemented Features
- 20 real Catalonia courses with GIM-style flip cards (image top, text below, green gradient back)
- Individual SEO course pages at /courses/{id}
- Navbar: Language (hover, dark glass dropdown) → Weather 7-day (hover, dark glass) → Admin gear → CTA
- Hero: heading, subtext, CTA, SCROLL mouse indicator (animated)
- "Play Golf Wherever You Are" worldwide banner (serif italic heading, glass CTA)
- Cookie consent: GIM dark glass style with cookie icon, Accept, Preferences, Learn more
- GIM 3-column footer: BLACK bg, logo in original colors, keyword-rich description, Quick Links, Services, Contact Info, copyright®
- Admin Panel /admin with login (admin/golfgate2026), course editing, blog CRUD
- Contact section with centered boxes (email mailto, phone, location)

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
- App.css (flip card CSS, scroll mouse animation)

## API Endpoints
- GET /api/catalunya-courses - 20 active courses
- PATCH /api/admin/catalunya-course/{id} - Update course
- GET/POST/PUT/DELETE /api/admin/blog-posts - Blog CRUD

## Upcoming
- SEO work (user mentioned tomorrow)
- Privacy Policy + Terms content
- Full multilingual translation
- Hero image replacement
