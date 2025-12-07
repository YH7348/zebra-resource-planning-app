# Zebra Resource Planner

A modern, full-featured resource planning and management platform built with React, TypeScript, and Tailwind CSS.

## Overview

Zebra Resource Planner is a comprehensive solution for managing teams, projects, schedules, and resources. It provides powerful insights and tools to help organizations optimize workforce allocation and project management.

## Features

- **Dashboard** - Real-time overview of team activities, notifications, and quick statistics
- **People Management** - Manage team members and their profiles
- **Project Management** - Plan and track projects effectively
- **Schedule Management** - Organize and view team schedules
- **Time Off Management** - Track and manage employee time off requests
- **Timesheets** - Record and monitor time entries
- **Reports** - Generate insights and analytics
- **Settings** - Customizable application preferences
- **Dark/Light Mode** - Theme support with Next Themes

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (Radix UI based)
- **Forms**: React Hook Form 7.61.1 + Zod validation
- **Data Visualization**: Recharts 2.15.4
- **State Management**: TanStack React Query 5.83.0
- **Routing**: React Router DOM 6.30.1
- **Icons**: Lucide React 0.462.0
- **Notifications**: Sonner 1.7.4

## Prerequisites

- **Node.js** 16.0 or higher
- **npm** 7.0 or higher (or equivalent package manager like yarn/bun)

## Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd zebra-resource-planner
npm install
```

### 2. Development Server

Start the development server with hot module reloading:

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:8080/
- **Network**: http://192.168.x.x:8080/ (see terminal output for your IP)

### 3. Build for Production

Create an optimized production build:

```bash
npm run build
```

Build artifacts will be in the `dist/` directory.

### 4. Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run lint` | Run ESLint code quality checks |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── dashboard/       # Dashboard widgets
│   ├── layout/          # Layout components
│   └── NavLink.tsx      # Navigation link component
├── pages/               # Page components
│   ├── Dashboard.tsx
│   ├── People.tsx
│   ├── Projects.tsx
│   ├── Reports.tsx
│   ├── Schedule.tsx
│   ├── Settings.tsx
│   ├── Timesheets.tsx
│   └── NotFound.tsx
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.tsx              # Root component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Configuration Files

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint rules
- `components.json` - shadcn/ui configuration

## Styling

The project uses Tailwind CSS for styling with the following features:
- Custom utility classes
- Animation support via `tailwindcss-animate`
- Typography plugin integration
- Dark mode support via Next Themes

## Form Validation

Forms are built with:
- **React Hook Form** - Flexible form handling
- **Zod** - TypeScript-first schema validation

## Code Quality

The project includes:
- **ESLint** - Code linting and quality checks
- **TypeScript** - Type safety
- **Tailwind CSS** - CSS class consistency

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual port.

### Missing Dependencies

If you encounter missing module errors:

```bash
npm install
```

### Build Issues

Clear the cache and rebuild:

```bash
rm -rf dist
npm run build
```

## Security

To address vulnerabilities found during installation:

```bash
npm audit fix
```

For detailed information about vulnerabilities:

```bash
npm audit
```

## Performance

- Vite provides lightning-fast development builds
- React with SWC compiler for faster transformations
- Code splitting and lazy loading optimizations
- Tailwind CSS purging unused styles

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES2020+ support.

## License

© 2024 Zebra Technologies. All rights reserved.

## Support

For issues, questions, or contributions, please contact the development team.

---

**Last Updated**: December 2024
