# GOLFGATE Catalunya - Product Requirements Document

## Original Problem Statement
Build a tee time booking landing page called "GOLFGATE CATALUNYA". Standalone site using card designs, functions, and architecture inspired by golfinmallorca.com (GIM). Real Catalonia golf course data and images pulled from greenfee365 booking site.

## Core Features (Implemented)
- 20 real Catalonia golf courses from Greenfee365 with accurate data
- GIM-style flip cards with Electric Kiwi gradient
- Individual SEO-friendly course pages at `/courses/{id}`
- Custom navbar with weather badge, language selector, admin gear icon, CTA button
- Hero section with Camiral Resort background image
- Contact section with email, phone, location cards
- Footer with logo, centered contact info, social icons, legal links
- Quick View modal (compact, GIM-sized)
- Admin Panel at `/admin` with Course Cards management and Blog Posts placeholder

## Tech Stack
- Frontend: React, Tailwind CSS, Lucide icons
- Backend: FastAPI, Motor (async MongoDB)
- Data: Static `catalunya_courses.py` with MongoDB fallback/override
- No auth required for admin (standalone site)

## Architecture
```
/app/backend/
├── server.py              # Routes + API endpoints
├── data/
│   └── catalunya_courses.py   # 21 courses (20 active, 1 duplicate hidden)
└── .env

/app/frontend/src/
├── App.js                     # Routes: /, /courses/:id, /admin, /privacy, /terms
├── App.css                    # Flip card CSS, animations
├── components/
│   ├── GolfgateCatalunyaPage.jsx  # Main landing page (navbar, hero, courses, contact, footer)
│   ├── CatalunyaCourseCard.jsx    # Flip card component
│   ├── CatalunyaQuickView.jsx     # Quick view modal (max-w-md)
│   ├── CatalunyaCoursePage.jsx    # Individual SEO course page
│   ├── CatalunyaWeather.jsx       # Weather badge (temp + Barcelona)
│   └── CatalunyaAdminPanel.jsx    # Admin panel (Course Cards + Blog tabs)
```

## Key API Endpoints
- `GET /api/catalunya-courses` - Active courses (20)
- `GET /api/catalunya-courses?include_inactive=true` - All courses (21)
- `GET /api/catalunya-courses/{course_id}` - Single course
- `PATCH /api/admin/catalunya-course/{course_id}` - Update course fields

## Recently Implemented (Feb 2026)
- **Quick View Modal** - Shrunk from max-w-lg to max-w-md with smaller image (h-44)
- **Card Flip Animation** - Slowed: 0.8s transition + 1.2s hover delay (was 0.6s + 0.8s)
- **Google Maps Links** - All 20 courses updated with accurate full_address fields
- **Footer Redesign** - Logo image (inverted), centered contact info, social icons, golfgatecatalunya.es link
- **Contact Info Updated** - Email: contact@golfgatecatalunya.es, URL: golfgatecatalunya.es
- **Navbar Logo** - Reduced by ~10% (h-14 md:h-[4.5rem])
- **Weather Badge** - Shows temperature + "Barcelona" location text
- **Language Selector** - Added Swedish (SE) as 6th language
- **Admin Panel** - `/admin` route with Course Cards table (edit, toggle active/hidden) + Blog Posts placeholder
- **Backend Admin API** - PATCH endpoint for course updates, include_inactive query param

## Previously Implemented
- Scraped 20 real Catalonia courses from greenfee365
- Created backend API endpoints for courses
- Built GIM-style flip-cards with Electric Kiwi back-gradient
- Individual SEO course pages with JSON-LD schemas
- Logo transparency processing (Python PIL)
- Standalone React App (no GIM wrappers)

## Upcoming Tasks (P1)
- Blog management in admin panel (create/edit/publish posts)
- Full admin authentication

## Future/Backlog (P2)
- Full multilingual support (translate entire site content)
- Replace hero image (user to provide specific one)
- Scroll-down animation matching GIM
- SEO sitemap for Catalunya site

## CRITICAL Notes
- DO NOT mix Golfgate Catalunya with GIM - this is a standalone site at root `/`
- DO NOT wrap in GIM's CookieConsent or DataProvider
- Keep React components modular and small to avoid Babel `Maximum call stack size exceeded` errors
