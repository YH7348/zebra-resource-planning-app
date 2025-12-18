# Zebra Resource Planner

A modern resource planning and management platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Overview

Zebra Resource Planner is a comprehensive solution for managing external consultants, project allocations, schedules, and financial reporting. It provides powerful insights to help organizations optimize workforce allocation and project management.

## Features

- **Dashboard** - Real-time overview with quick statistics on resources, projects, and allocations
- **People Management** - View and filter external consultants by vendor, status, skills
- **Project Management** - Track projects with budget allocation and resource assignments
- **Allocations** - Manage resource-to-project allocations with FTE tracking
- **Schedule Management** - Monthly view of resource allocations across projects
- **Reports** - Financial analytics, cost summaries, and utilization metrics

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14.2.x (App Router) |
| **Language** | TypeScript 5.8.3 |
| **Styling** | Tailwind CSS 3.4.17 |
| **UI Components** | shadcn/ui (Radix UI based) |
| **Data Visualization** | Recharts 2.15.4 |
| **State Management** | TanStack React Query 5.83.0 |
| **Icons** | Lucide React 0.462.0 |
| **Notifications** | Sonner 1.7.4 |

## Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/YH7348/zebra-resource-planning-app.git
cd zebra-resource-planning-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at **http://localhost:3000**

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Dashboard (/)
│   ├── globals.css         # Global styles + Zebra brand
│   ├── not-found.tsx       # 404 page
│   ├── people/page.tsx     # /people
│   ├── projects/page.tsx   # /projects
│   ├── allocations/page.tsx# /allocations
│   ├── schedule/page.tsx   # /schedule
│   └── reports/page.tsx    # /reports
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── dashboard/          # Dashboard widgets
│   ├── layout/             # AppSidebar, AppHeader, AppLayoutWrapper
│   └── providers/          # React Query, Tooltip providers
├── services/
│   └── mockData.ts         # Mock data service (667 lines)
├── hooks/                  # Custom React hooks
└── lib/
    └── utils.ts            # Utility functions (cn)
```

## Application Flow

```
Dashboard (/)
    └── Quick Stats → Active Resources, Projects, Allocations, Utilization %
    
People (/people)
    └── Resource List → Filter by Vendor, Status, Search
    
Projects (/projects)
    └── Project Cards → Budget, SOW Reference, Status Tabs
    
Allocations (/allocations)
    └── Resource Allocation Grid → FTE %, Monthly breakdown
    
Schedule (/schedule)
    └── Calendar View → Monthly resource assignments
    
Reports (/reports)
    └── Financial Reports → Cost by Project, Utilization, Trends
```

## Data Model

The app uses a mock data service (`src/services/mockData.ts`) with the following entities:

| Entity | Description |
|--------|-------------|
| **Resource** | External consultants (name, vendor, skills, status) |
| **Project** | Projects with budget and SOW reference |
| **ProjectAllocation** | Resource assignments with monthly FTE allocations |
| **Vendor** | Consulting companies (CapGemini, Infosys, etc.) |
| **FinancialData** | Monthly cost calculations |

## Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js configuration |
| `tsconfig.json` | TypeScript settings |
| `tailwind.config.ts` | Tailwind CSS + Zebra colors |
| `postcss.config.js` | PostCSS with Tailwind |
| `components.json` | shadcn/ui configuration |

## Styling

- **Zebra Brand Colors** - Custom lime, charcoal, and status colors
- **ProximaNova Font** - Custom font family
- **Dark/Light Mode** - Theme support via CSS variables
- **Animations** - Fade-in, slide-in transitions

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES2020+ support.

## License

© 2024 Zebra Technologies. All rights reserved.

---

**Last Updated**: December 2024
