# GOLFGATE Catalunya - PRD

## Problem Statement
Standalone golf tee time booking landing page for Catalunya, matching GIM (golfinmallorca.com) designs.

## GIM Matching Approach (LOCKED)
1. Pull exact source code from golfinmallorca.com using Playwright
2. Build standalone mockup for approval
3. Only deploy after user confirms

## Implemented Features
- 20 courses with flip cards, individual SEO pages with Schema.org GolfCourse data
- 6 hotels with flip cards (pink back), individual hotel cards
- Full multilingual: EN, ES, CA, DE, FR, SE
- Public blog at /blog (3 posts), individual post pages
- Course comparison tool at /compare (slope, rating, difficulty, designer)
- 8 SEO landing pages (Barcelona, Costa Brava, Girona, Tarragona, Katalonien, UK, Luxury, Stay & Play)
- Cookie consent: EXACT GIM code
- Worldwide banner: EXACT GIM code
- Google OAuth admin login
- Admin panel: Content Manager (Golf Courses + Hotels tabs), Blog Posts
- Privacy Policy + Terms of Service (adapted from GIM, GDPR compliant)
- Mobile hamburger menu with full navigation
- SEO sitemap (37 URLs)
- Scroll animations, hover lift effects
- Navbar: pink (#f6416c) links, glass dropdowns, separator bar

## Architecture
Frontend: React + Tailwind + Lucide | Backend: FastAPI + MongoDB | Weather: open-meteo.com

## Color Palette
- #CCFF00 (Electric Kiwi - primary, navbar bg)
- #f6416c (Logo Pink - text, accents, hotel card backs)
- #FFFF00 (Yellow - CTA gradient)
- #DFFF00 (Light Kiwi - hover states)
- #1a1a1a (Near Black - footer, buttons)

## Completed (29 Mar 2026)
- Privacy & Terms pages (GIM text adapted for Catalunya, GDPR)
- Mobile hamburger menu with drawer navigation
- OG:image meta tags for social sharing
- Favicon from logo
- Course card "Hover for details" hidden on mobile
- Admin page title fixed
- Mockup files cleaned up
- Compact glass dropdowns (Option B) with white text

## Ready for Deploy
All pages tested, 0 console errors, all APIs healthy
