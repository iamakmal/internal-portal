# Internal Portal

A modern internal communication portal built with Next.js, TypeScript, Prisma, and NextAuth. It allows team members to sign in, view announcements, and manage team directory access depending on their role.

## Deployment

This project is deployed on Vercel at [https://internal-portal-flame-beta.vercel.app](https://internal-portal-flame-beta.vercel.app) using [Aiven](https://aiven.io) for managed MySQL hosting.

## Features

- Secure authentication with NextAuth credentials
- Role-based access for admins and employees
- Announcements feed for internal updates
- Team directory view for administrators
- Responsive UI built with Tailwind CSS

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- NextAuth
- Tailwind CSS
- Lucide React
- Tanstack Query

## Project Structure

- app/ - App routes and pages
- components/ - Reusable UI components
- lib/ - Auth, Prisma, and shared utilities
- prisma/ - Prisma schema and migrations
- public/ - Static assets

## Prerequisites

- Node.js 20+
- npm or pnpm
- A local MySQL or compatible database

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables in a `.env` file:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret"
DATABASE_USER="user"
DATABASE_PASSWORD="password"
DATABASE_NAME="DB Name"
DATABASE_HOST="DB Host"
DATABASE_PORT="DB Port"
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Notes

- Project structure and code quality: the project is organized around the App Router in app/, with route-specific pages such as dashboard and auth flows, reusable UI in components/, and shared logic in lib/ for auth, Prisma access, and helper functions.
- Auth implementation: login and signup are implemented with NextAuth credentials in the auth flow, with protected dashboard pages redirected to the login screen when no valid session exists.
- Backend/API integration: the application uses Prisma as the persistence layer for users and announcements, while API routes under app/api/ are used for signup and other server-side interactions.
- Component and state management choices: the UI is built from reusable components like the sidebar, announcement form, announcement list, and team member cards, while client-side state is handled through React state for forms and NextAuth session state for user access.
- Data fetching and caching: TanStack Query is used to load announcements and refresh team directory data so the UI stays responsive and consistent when fetching member information.
- Role-based control: access to the team directory and announcement creation is restricted by role, so only admins can view the team portal and add announcements, while regular employees have limited access.

## Screenshots
<img width="1893" height="853" alt="Screenshot (1001)" src="https://github.com/user-attachments/assets/17ae261c-e8ca-4922-88da-08267be04603" />
<img width="1887" height="851" alt="Screenshot (1002)" src="https://github.com/user-attachments/assets/b7a9d77e-943c-43a1-93d3-2f13cba4e9e1" />
<img width="1893" height="853" alt="Screenshot (1003)" src="https://github.com/user-attachments/assets/57516d65-72e3-42d5-83c7-686659b23067" />
<img width="1899" height="871" alt="Screenshot (1004)" src="https://github.com/user-attachments/assets/19b30180-2294-47e1-89f7-6add8b507d5d" />
<img width="1879" height="873" alt="Screenshot (1005)" src="https://github.com/user-attachments/assets/078fd91e-3f18-4280-ae97-8fcfd0f93df0" />





