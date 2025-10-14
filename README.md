# TechNova Inventory - Frontend

This repository contains the frontend for an inventory application named TechNova. It's built with React + TypeScript and Vite and is ready to connect to a REST backend (configured via `VITE_API_URL` or the default URL in `src/api/axios.ts`).

---

## Overview

- Main frameworks and libraries:
  - React 18 + TypeScript
  - Vite (dev server and bundling)
  - React Router v6
  - PrimeReact (UI components)
  - Tailwind-style utility classes in components
  - Axios for API requests

- Project structure (high level):
  - `src/main.tsx` — app entry; registers global providers and the Router.
  - `src/App.tsx` — application routes and conditional layout (Navbar is rendered from here).
  - `src/context/AuthContext.tsx` — authentication, token persistence and user restoration.
  - `src/api/axios.ts` — Axios instance with an interceptor that injects Authorization header.
  - `src/components/` — reusable UI components (Navbar, Button, Badge, Card, etc.).
  - `src/pages/` — page components (Login, Dashboard, Profile, Catalog, ResumeStats/AdminSummary).
  - `src/components/products/` — product-specific components (ProductTable, ProductForm, ProductCard).

---

## Routes

- `/login` — login page (Navbar is hidden on this route).
- `/dashboard` — protected dashboard (requires auth).
- `/profile` — protected user profile page.
- `/adminsummary` — protected admin summary (admin role expected).
- `/catalog` — public product catalog.

Protected routes use `ProtectedRoute` (`src/router/Router.tsx`) which reads `user` and `loading` from `AuthContext`. While the context performs token validation, `ProtectedRoute` renders a loading message.

---

## Authentication and session persistence

- When the user logs in, a token is stored in `localStorage` under the key `token` (see `AuthContext.login`).
- On app load, `AuthContext` attempts to restore the session by reading `localStorage.token` and calling `GET /auth/me` using the token in the Authorization header.
- The Axios instance (`src/api/axios.ts`) adds the Authorization header automatically to outgoing requests by reading `localStorage.token` in a request interceptor.

If the backend rejects `/auth/me` (e.g. 401), the token is removed and the user will be redirected to `/login` by the protected route logic.

---

## Key components and implementation notes

- `src/components/Navbar.tsx`
  - Responsive Navbar with a mobile menu. Uses `useAuth()` to show links conditionally based on authentication and role.
  - Rendered once from `App.tsx` (prevent duplicates by avoiding local renders in pages).

- `src/pages/Dashboard.tsx`
  - Dashboard with a products table and a product form modal (PrimeReact `Dialog`).
  - Uses a `Toast` (PrimeReact) to show notifications; the toast `ref` is passed into `ProductTable` and `ProductForm`.

- `src/components/products/ProductTable.tsx` and `ProductForm.tsx`
  - Typed to accept `React.RefObject<Toast | null>` for notifications.
  - `ProductTable` supports edit/delete operations; `ProductForm` supports create/update.

- `src/pages/ResumeStats.tsx` (AdminSummary)
  - Redesigned to be more visual and responsive: informational cards, emojis as icons, and a `ProgressBar` showing the percentage of active products.

---

## How to run

Requirements: Node 16+.

1. Install dependencies:

```powershell
npm install
```

2. Start development server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

Notes:
- If your backend runs on a different URL, set `VITE_API_URL` before starting the app. Example in PowerShell:

```powershell
$env:VITE_API_URL = 'https://your-backend.example.com/api'; npm run dev
```

---

## Recommendations and next steps

- Implement refresh-token flow if the backend supports it to avoid forcing users to re-login when the access token expires.
- Consolidate styles using a design system or a Tailwind config for consistent spacing, colors and typography.
- Improve accessibility (aria attributes for mobile menu, focus trapping inside modals, semantic markup).
- Add unit/integration tests (Jest + React Testing Library) for critical components such as `AuthContext`, `ProtectedRoute`, and product CRUD flows.

---

## Inline documentation and comments

Files contain descriptive names and logical structure. If you want, I can add JSDoc comments to specific modules or functions (for example: `AuthContext`, `Navbar`, `ProductTable`, or `ProductForm`).

---

If you'd like me to also translate UI strings into English (labels, placeholders, headings) across the codebase, I can do that next — tell me whether you want only static pages (Login/Profile/Dashboard) or the entire app.
