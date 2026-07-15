# Let's Find — Frontend (MVP)

Frontend for **Let's Find**, a web platform that helps reunite missing persons with their families using face-matching technology. Two types of users — Finders and Seekers — upload photos, and the system suggests possible matches for moderators to review and confirm.

This repo contains the **complete frontend only**, built with React, React Router, and Tailwind CSS. It uses placeholder/dummy data throughout, since it is not yet connected to a backend.

## Tech Stack

- React
- React Router (client-side routing)
- Tailwind CSS
- Vite

## Getting Started

1. Clone the repo:
   ```
   git clone https://github.com/Wajeeha-82/lets-find-frontend.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open the local URL shown in the terminal (usually `http://localhost:5173`)

## Pages / Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Landing page | Hero section, how-it-works, CTA buttons |
| `/login` | Phone + OTP verification | Currently a mock/dummy OTP flow — no real SMS is sent |
| `/missing-report` | Missing Person Report form (Seeker flow) | FR-4, FR-5, FR-6 |
| `/found-report` | Found Person Report form (Finder flow) | FR-7, FR-8 |
| `/case-status` | Case status tracking page | Shows status badges: Open, Under Review, Matched, Closed, False Lead |
| `/moderator` | Moderator dashboard | Side-by-side match review — FR-15, FR-16. **Needs role-based auth before production** |
| `/admin` | Admin stats panel | FR-24. **Needs role-based auth before production** |

## Design System

- **Primary teal:** `#358f80`
- **Dark teal:** `#036666`
- **Page background:** `#f5f9e9`
- **Card background:** `#eaf4f4` (with `#d3e6e3` border/soft shadow for contrast)
- **Accent (buttons/highlights only):** `#E8A33D`
- **Body text:** `#2B2B2B`
- **Status colors:** Open = soft blue · Under Review = amber · Matched = distinct saturated green · Closed = gray · False Lead = muted terracotta

## Important Notes for Backend/Team Integration

- All form submissions, OTP verification, and match data are currently **dummy/placeholder** — no real backend calls are made yet.
- The **"Moderator"** and **"Admin"** links are currently always visible in the navbar for demo/testing purposes. Once auth is implemented, these should only be visible to logged-in users with the corresponding role (per SRS Section 2.2 — both are "Internal, login-protected").
- Phone number fields use a fixed `+92` (Pakistan) prefix, not a country-code dropdown.
- Photo upload fields currently accept files but do not send them anywhere — this needs to be wired to the actual upload/face-matching API.

## Status

MVP frontend complete — pending backend integration.