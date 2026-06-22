# AirX Solution Website

Premium business website for AirX Solution digital agency.

## Quick Start

**Double-click `start.bat`** or run manually:

```bash
# Terminal 1 — Frontend
cd frontend
npm run dev
# → http://localhost:3000

# Terminal 2 — Backend
cd backend
node src/server.js
# → http://localhost:5000
```

## Admin Panel

URL: http://localhost:3000/admin

| Credential | Value |
|-----------|-------|
| Email | admin@airxsolution.com |
| Password | admin123 |

## Pages

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| About | http://localhost:3000/about |
| Services | http://localhost:3000/services |
| Portfolio | http://localhost:3000/portfolio |
| Testimonials | http://localhost:3000/testimonials |
| Blog | http://localhost:3000/blog |
| Contact | http://localhost:3000/contact |
| FAQ | http://localhost:3000/faq |
| Privacy Policy | http://localhost:3000/privacy-policy |
| Terms & Conditions | http://localhost:3000/terms |
| **Admin Panel** | http://localhost:3000/admin |

## Admin Sections

- **Dashboard** — Stats, quick actions, recent messages
- **Pages** — Edit text content for each page
- **Services** — Manage service cards
- **Portfolio** — Add/edit/delete projects
- **Testimonials** — Manage client reviews
- **Blog** — Create and manage blog posts
- **Messages** — View and reply to contact inquiries
- **Admin Users** — Manage admin accounts
- **Settings** — SEO, contact info, social media

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js (MongoDB optional)
- **Theme**: Dark/Light mode toggle
- **Features**: WhatsApp button, Cookie consent, Newsletter CTA

## MongoDB (Optional)

The backend runs in demo mode without MongoDB. To enable persistence:
1. Install [MongoDB Community](https://www.mongodb.com/try/download/community)
2. The backend auto-connects to `mongodb://localhost:27017/airx-solution`
