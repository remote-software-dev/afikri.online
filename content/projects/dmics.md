---
title: "Digital Monitoring Immunization Campaign System"
date: "2026-08-01"
author: "afikri"
tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS"]
excerpt: "A production grade public health platform modernizing a legacy CodeIgniter system to track MR and OPV vaccination campaigns for the Indonesian Ministry of Health."
role: "Full Stack Developer"
year: "2026"
link: "https://github.com/remote-software-dev/dmics"
liveLink: "https://dmics.vercel.app/"
apiDocsLink: "https://dmics.vercel.app/api/docs"
---

## Overview

DMICS (Digital Monitoring Immunization Campaign System) is a health data platform that tracks childhood vaccination campaigns across Indonesia's geographic hierarchy — from 34 provinces down to thousands of community health centers (Puskesmas).

I led the complete rewrite of this system from a legacy Laravel/PHP application to a modern stack: **Python FastAPI**, **TypeScript Next.js**, and **Neon serverless PostgreSQL**.

## The Challenge

The legacy system faced several critical issues:

- **Performance bottlenecks** — Synchronous PHP processes struggled during peak reporting hours when health workers across Indonesia submitted vaccination data simultaneously
- **Scalability limits** — Vertical scaling had reached its ceiling with growing data volume
- **Developer experience** — The aging framework made onboarding difficult and slowed feature development
- **No type safety** — Runtime errors that could have been caught at compile time
- **Limited API documentation** — Manual documentation that quickly became outdated

## Technical Decisions

### Why FastAPI?

FastAPI provided the ideal balance for this use case:

- **Async I/O** — Non-blocking database queries handle concurrent requests efficiently
- **Automatic OpenAPI documentation** — Always up-to-date API specs generated from code
- **Pydantic validation** — Type-safe request/response schemas catch errors early
- **Python ecosystem** — Access to data processing libraries for future analytics features

### Why Next.js 14?

The App Router architecture solved several frontend challenges:

- **Server-side rendering** — Dashboard loads faster with pre-rendered content
- **TypeScript** — End-to-end type safety from API to UI
- **Server components** — Reduced client-side JavaScript for better performance
- **File-based routing** — Intuitive navigation structure

### Why Neon?

Neon's serverless PostgreSQL was chosen for:

- **Auto-scaling** — Handles traffic spikes without manual intervention
- **Branching** — Create database branches for testing schema changes
- **Cost efficiency** — Pay-per-use model ideal for development and staging
- **SSL by default** — Security without configuration overhead

## Architecture

```
Browser → Next.js (SSR/CSR) → FastAPI (async) → SQLAlchemy 2.0 → Neon PostgreSQL
```

The architecture follows a clean separation of concerns:

- **Frontend** — Handles UI rendering, state management, and user interactions
- **API layer** — Business logic, validation, authentication
- **Data layer** — Async database operations with connection pooling

## Key Features Implemented

### Real-time Dashboard
- Aggregated statistics across the geographic hierarchy
- 14-day vaccination trend charts
- Province-level performance rankings
- MR and OPV coverage tracking

### Report Submission System
- Cascading geographic dropdowns (Province → District → Puskesmas → Subdistrict)
- Campaign type selection (Measles-Rubella or Oral Polio Vaccine)
- Form validation with Pydantic schemas

### Geographic Data Management
- Full CRUD operations for all geographic entities
- Search and filter capabilities
- Bulk operations support

### Data Visualization
- Interactive trend lines using Recharts
- Bar charts for province comparisons
- Coverage progress cards with visual indicators

## Challenges and Solutions

### Challenge 1: Preserving Business Logic
The original Laravel codebase had complex business rules for vaccination reporting. I had to understand and replicate:

- Report submission constraints (time-based restrictions)
- Geographic hierarchy validations
- Coverage calculation formulas

**Solution:** Created a comprehensive API documentation from the legacy code before rewriting, ensuring no business logic was lost.

### Challenge 2: Database Schema Migration
The original schema used different conventions and had legacy columns.

**Solution:** Designed a clean schema from scratch while maintaining compatibility through:
- UUID primary keys for better distributed system support
- Denormalized geographic names in report tables for query performance
- Polymorphic references in the population table

### Challenge 3: Authentication Flow
Implementing JWT-based authentication with role-based access control.

**Solution:**
- bcrypt password hashing
- JWT tokens with 24-hour expiry
- Middleware for route protection
- Dual token storage (localStorage + cookie)

## Results

### Performance Improvements
- **~3x faster API response times** in initial benchmarks
- **Non-blocking I/O** handles concurrent requests efficiently
- **Automatic API documentation** always stays in sync with code

### Developer Experience
- **Type safety** across the entire stack
- **Automatic OpenAPI specs** reduce documentation overhead
- **Modern tooling** improves development velocity
- **Clean codebase** easier to onboard new developers

### Cost Efficiency
- **Serverless deployment** on Vercel reduces infrastructure costs
- **Neon's pay-per-use** model optimizes database expenses
- **No server maintenance** — focus on feature development

## Lessons Learned

1. **Document before rewriting** — Understanding the legacy system prevents losing critical business logic
2. **Type safety pays off** — Catching errors at compile time saves significant debugging time
3. **Serverless is not always cheaper** — Evaluate traffic patterns before committing
4. **API-first design** — FastAPI's automatic docs make API-first development natural

## Future Enhancements

- Role-based access control with admin, reporter, and viewer roles
- Data upload and export functionality
- Advanced analytics and reporting
- Mobile-responsive optimizations
- Real-time notifications for report submissions

## 🛠️ Tech Stack

- **Backend API**: 🐍 Python 3.11 + FastAPI
- **Database ORM**: 🗄️ SQLAlchemy 2.0 (Async)
- **Database**: ⚡ Neon (Serverless PostgreSQL)
- **Frontend**: ▲ Next.js 14 + TypeScript
- **Styling**: 🎨 Tailwind CSS
- **Data Visualization**: 📊 Recharts
- **Authentication**: 🔐 JWT (bcrypt + python-jose)
- **Deployment**: 🚀 Vercel

---

