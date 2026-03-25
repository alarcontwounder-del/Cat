# GOLFGATE Catalunya - Product Requirements Document

## Original Problem Statement
Build a tee time booking landing page called "GOLFGATE CATALUNYA". Standalone site using card designs, functions, and architecture inspired by golfinmallorca.com (GIM). Real Catalonia golf course data and images pulled from greenfee365 booking site.

## Core Features (Implemented)
- 20 real Catalonia golf courses from Greenfee365 with accurate data
- GIM-style flip cards: image top with eye icon + price badge, text below with location/name/description/holes-par/hover hint
- Card back: Electric Kiwi gradient with booking CTA + View Course Details link
- Individual SEO-friendly course pages at `/courses/{id}`
- Custom navbar with weather badge (3-day forecast dropdown), language selector (EN/ES/CA/DE/FR/SE), admin gear icon, CTA button
- Hero section with smooth scroll to courses
- Contact section with email, phone, location cards
- GIM-style 3-column footer (Description+Social, Quick Links, Services, Contact Info, Copyright®)
- Quick View modal with fixed image
- Admin Panel at `/admin` with login protection (admin/golfgate2026)
- Admin: Course Cards editing (name, location, price, holes, par, address, booking URL)
- Admin: Blog Posts CRUD (create, edit, delete, publish/draft)

## Tech Stack
- Frontend: React, Tailwind CSS, Lucide icons
- Backend: FastAPI, Motor (async MongoDB)
- Data: Static `catalunya_courses.py` with MongoDB fallback/override
- Weather: open-meteo.com API (free)
- Admin auth: Client-side session (sessionStorage)

## Architecture
```
/app/backend/
├── server.py
├── data/
│   └── catalunya_courses.py (20 active courses)
└── .env

/app/frontend/src/
├── App.js (Routes: /, /courses/:id, /admin, /privacy, /terms)
├── App.css (Flip card CSS: 0.8s transition, 1.2s hover delay)
├── components/
│   ├── GolfgateCatalunyaPage.jsx (Main page: navbar, hero, about, courses grid, contact, 3-col footer)
│   ├── CatalunyaCourseCard.jsx (GIM-style flip card: image top, text below)
│   ├── CatalunyaQuickView.jsx (Modal with fixed image)
│   ├── CatalunyaCoursePage.jsx (Individual SEO course page)
│   ├── CatalunyaWeather.jsx (Badge + 3-day forecast dropdown)
│   └── CatalunyaAdminPanel.jsx (Login gate + Course editing + Blog CRUD)
```

## Key API Endpoints
- `GET /api/catalunya-courses` - Active courses (20)
- `GET /api/catalunya-courses?include_inactive=true` - All courses
- `GET /api/catalunya-courses/{course_id}` - Single course
- `PATCH /api/admin/catalunya-course/{course_id}` - Update course
- `GET /api/admin/blog-posts` - List blog posts
- `POST /api/admin/blog-posts` - Create blog post
- `PUT /api/admin/blog-posts/{post_id}` - Update blog post
- `DELETE /api/admin/blog-posts/{post_id}` - Delete blog post

## Implemented History
### Session 1 (Previous)
- Scraped 20 Catalonia courses from greenfee365
- Created backend API + static data
- Built standalone React app (no GIM wrappers)
- GIM-style flip cards, individual SEO pages
- Logo transparency processing

### Session 2 (Feb 2026 - First Pass)
- QuickView modal shrunk, card flip slowed
- Google Maps links fixed with accurate addresses
- Footer with logo + contact info
- Navbar logo reduced 10%
- Weather badge with "Barcelona" text
- Swedish added to languages
- Basic admin panel created

### Session 3 (Feb 2026 - GIM Match Overhaul)
- **Cards redesigned** to match GIM exactly: image top + text below (location, name, description, holes/par, hover hint)
- **Footer rewritten** to GIM's 3-column layout (Description+Social, Quick Links, Services) + Contact Info + Copyright® 
- **Weather expanded** to show 3-day forecast dropdown (open-meteo API)
- **Admin protected** with login (admin/golfgate2026)
- **Blog CRUD** added (create, edit, delete blog posts via MongoDB)
- **Duplicate peralada-2** removed (now exactly 20 courses)
- **QuickView image** fixed (object-cover, not moving)
- **Hero button** smooth scrolls to courses
- **Course name** clickable to individual page

## Upcoming Tasks
- Full multilingual support (translate entire site content)
- Replace hero image (user to provide)
- Scroll-down animation matching GIM
- Privacy Policy / Terms of Service content (copy from GIM, adapt for Catalunya)
- SEO sitemap

## Admin Credentials
- Username: admin
- Password: golfgate2026

## CRITICAL Notes
- DO NOT mix Golfgate Catalunya with GIM - standalone site at root `/`
- Keep React components modular and small (avoid Babel stack overflow)
- Footer background: #555555 (matching GIM)
