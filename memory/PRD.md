# GOLFGATE Catalunya - PRD

## Problem Statement
Standalone golf tee time booking landing page for Catalunya, inspired by golfinmallorca.com (GIM). All UI must EXACTLY match GIM designs.

## GIM Matching Approach (LOCKED)
1. Pull exact source code from golfinmallorca.com using Playwright
2. Build standalone mockup for approval
3. Only deploy after user confirms

## Implemented Features
- 20 courses with flip cards, individual SEO pages at /courses/{id}
- Full multilingual: EN, ES, CA, DE, FR, SE (translations.js, localStorage persisted)
- Public blog page at /blog (GIM 2-col grid design, reads published posts from MongoDB)
- Blog admin CRUD in /admin panel
- SEO sitemap at /api/sitemap.xml (home, blog, 20 courses, privacy, terms)
- Cookie consent + Worldwide banner: EXACT GIM source code
- Navbar: sharp logo, GIM language pill, GIM weather pill
- Footer: BLACK 3-column with Blog link, translated content
- Admin Panel /admin (admin/golfgate2026)

## Architecture
Frontend: React + Tailwind + Lucide | Backend: FastAPI + MongoDB | Weather: open-meteo.com

## Completed (26 Mar 2026)
- Full multilingual support (6 languages, all sections translated)
- Public blog page /blog (GIM design, fetches from /api/blog-posts)
- SEO sitemap /api/sitemap.xml (GIM structure)
- Blog nav link added to navbar and footer

## Pending
- Hero image replacement (user to provide)
- Scroll-down animation polish
