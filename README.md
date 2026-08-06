# Internal Portal

A modern internal communication portal built with Next.js, TypeScript, Prisma, and NextAuth. It allows team members to sign in, view announcements, and manage team directory access depending on their role.

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

## Project Structure

- app/ - App routes and pages
- components/ - Reusable UI components
- lib/ - Auth, Prisma, and shared utilities
- prisma/ - Prisma schema and migrations
- public/ - Static assets

## Prerequisites

- Node.js 20+
- npm or pnpm
- A local PostgreSQL or compatible database

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

This project is designed for internal use and can be extended with additional modules such as notifications, documents, or HR workflows.
