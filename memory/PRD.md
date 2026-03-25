# GOLFGATE Catalunya - Product Requirements Document

## Original Problem Statement
Build a tee time booking landing page called "GOLFGATE CATALUNYA". Standalone site using card designs, functions, and architecture inspired by golfinmallorca.com (GIM). Real Catalonia golf course data and images pulled from greenfee365 booking site.

## Core Features (Implemented)
- 20 real Catalonia golf courses from Greenfee365
- GIM-style flip cards: image top, text below (location/name/description/holes-par/hover hint), no grey border
- Card back: Electric Kiwi gradient with booking CTA + course details link
- Individual SEO-friendly course pages at `/courses/{id}`
- Navbar: Language FIRST (glass effect), Weather 7-day forecast (glass effect), Admin gear, CTA
- Hero section with smooth scroll
- "Play Golf Wherever You Are" worldwide banner (golf bg, glass CTA, links to greenfee365)
- Cookie consent with glass effect (localStorage)
- Contact section with email/phone/location
- GIM-style 3-column footer: BLACK bg, logo in original colors, keyword-rich description, Quick Links, Services, Contact Info, Copyright®
- Admin Panel at `/admin` with login (admin/golfgate2026)
- Admin: Course Cards editing + Blog Posts CRUD

## Architecture
```
/app/backend/ -> server.py, data/catalunya_courses.py (20 courses)
/app/frontend/src/
├── App.js (Routes: /, /courses/:id, /admin, /privacy, /terms)
├── App.css (Flip card: 0.8s transition, 1.2s hover delay)
├── components/
│   ├── GolfgateCatalunyaPage.jsx (Navbar, hero, about, courses, CTA, worldwide banner, contact, footer, cookie consent)
│   ├── CatalunyaCourseCard.jsx (GIM-style flip card, no grey border)
│   ├── CatalunyaQuickView.jsx (Modal with fixed image)
│   ├── CatalunyaCoursePage.jsx (Individual SEO page)
│   ├── CatalunyaWeather.jsx (7-day forecast, glass dropdown)
│   └── CatalunyaAdminPanel.jsx (Login + Course editing + Blog CRUD)
```

## Key API Endpoints
- `GET /api/catalunya-courses` - 20 active courses
- `PATCH /api/admin/catalunya-course/{id}` - Update course
- `GET/POST/PUT/DELETE /api/admin/blog-posts` - Blog CRUD

## Implemented (Latest Session - Feb 2026)
- Weather: 7-day forecast with glass effect dropdown (open-meteo API)
- Navbar: Reordered (Language → Weather → Admin → CTA), all glass effect
- Cards: Grey border removed, clean white
- Footer: BLACK (#1a1a1a), logo in original colors, keyword-rich description, "Book Tee Times in Catalunya"
- Footer email: mailto link opens email program
- Cookie consent: Glass effect banner, localStorage persistence
- "Play Golf Wherever You Are" worldwide banner with golf bg, lime badge, glass CTA
- Admin: Login protection (admin/golfgate2026), course editing modal, blog CRUD

## Upcoming Tasks
- SEO work (tomorrow per user)
- Privacy Policy & Terms of Service content (adapt from GIM)
- Full multilingual support
- Replace hero image (user to provide)
- Scroll-down animation matching GIM

## Admin Credentials
- Username: admin | Password: golfgate2026
