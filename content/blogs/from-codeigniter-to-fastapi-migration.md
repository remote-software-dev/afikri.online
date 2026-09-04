---
title: "From CodeIgniter to FastAPI: Rebuilding Indonesia's Immunization Monitoring System"
date: "2026-09-02"
author: "Abdul Fikri"
tags: ["FastAPI", "Next.js", "PostgreSQL", "System Migration", "Enterprise Architecture"]
imageUrl: "/blogs/codeigniter-to-fastapi-migration.png"
commentsCount: 0
likesCount: 0
bookmarksCount: 0
excerpt: "How I migrated a legacy national health monitoring system from CodeIgniter/MySQL to FastAPI/Next.js/PostgreSQL — without losing data, uptime, or my sanity."
---

## How it started

I've spent the last decade building backend systems for governments and NGOs — UNICEF, IOM, BNPB. The kind of software that tracks immunization coverage across provinces, or logs disaster response metrics in real time. These systems aren't glamorous. They don't go viral. But when they break, real people are affected.

Most of these systems share a common DNA: a PHP framework from 2012, a MySQL database with no migrations, and a team of three maintaining code written by thirty. This is the story of how I took one of those systems — Indonesia's immunization monitoring platform — and rebuilt it from the ground up.

## The Breaking Point

The original app was built on CodeIgniter 2 with MySQL. At the time, it was a reasonable choice. CodeIgniter was lightweight, the developers knew PHP, and the deployment target was a shared cPanel hosting account.

Fast forward eight years. The system tracked immunization data for 34 provinces, with reports rolling up to the national level. The MySQL database had grown to 14 million rows across its core tables. Quarterly reports were taking 40+ seconds to generate. The admin panel was an unmaintained jQuery spaghetti that crashed on mobile.

But here's the thing — the legacy code wasn't *bad*. It did its job. The PHP was structured, the database schema was mostly normalized, and the business logic was sound. The problem wasn't quality. The problem was that the system had outgrown its architecture.

CodeIgniter 2 doesn't have proper type hints. The entire codebase relied on string-based array access for request parameters — `$_POST['province_id']` scattered everywhere. No validation layer. No ORM. Raw SQL concatenated with user input in about 40% of the queries. It wasn't a security disaster only because the system was behind a VPN.

The monolithic structure meant every deployment was all or nothing. A small UI fix required redeploying the entire backend. There were no tests. Zero. The original developers had left years ago, and the documentation was a single README file with three bullet points.

Something had to give.

## Choosing the New Stack

I evaluated a few options. Laravel was the obvious "safe" choice — same language, similar paradigm, easy to migrate. But I'd been building with Python and Next.js for the past few years, and I knew the team I'd eventually hand this off to would benefit from a more modern, type-safe stack.

**FastAPI** for the backend. Python is ubiquitous in government and NGO data teams. FastAPI gives you automatic OpenAPI docs, Pydantic validation out of the box, and async support when you need it. The performance benchmarks put it close to Node.js for I/O-bound workloads, which is exactly what a reporting API is.

**Next.js** for the frontend. Server-side rendering for SEO on public dashboards, React components for the admin panel, and API routes to avoid CORS headaches during the transition period. I picked App Router because I wanted server components from day one.

**PostgreSQL on Neon** for the database. Postgres was a non-negotiable for me. The JSONB support alone justifies the switch — immunization data is semi-structured, with varying field requirements across vaccine types. Neon's serverless Postgres meant no DBA overhead, branching for migrations, and a free tier that's generous enough for a government project's development environment.

**SQLAlchemy 2.0** as the ORM. Mature, battle-tested, and now fully async with `asyncpg`. The new 2.0 style gives you type-safe queries with proper Python type hints. No more guessing whether `province_id` is a string or an integer in some random controller.

## The Migration Strategy

I did not rewrite the entire system in one shot. That's how projects die.

Instead, I used the **Strangler Fig pattern**. The idea is simple: you gradually replace parts of the old system while it keeps running, until eventually the old system has nothing left to do and you can turn it off.

Here's how I broke it down:

**Phase 1: Parallel read layer.** I built the FastAPI backend to read directly from the existing MySQL database. Same connection, same data, new API layer. The Next.js frontend consumed these new endpoints. The old CodeIgniter app kept handling writes. This let me validate the new stack against real production data without touching the legacy system.

**Phase 2: Migrate writes.** Once the read layer was stable, I built the write endpoints in FastAPI and pointed the admin panel at them. This was the scary part — you're now the system of record.

**Phase 3: Data migration.** I wrote scripts to move historical data from MySQL to Postgres. More on this nightmare below.

**Phase 4: Decommission.** Turn off the old CodeIgniter app. Celebrate. Cry a little.

The whole process took about four months, working part-time. I kept both systems running in parallel for two months before I had confidence to pull the plug.

## The Data Migration Headache

Nobody warns you about how painful MySQL-to-Postgres migration is until you're in it.

MySQL is... forgiving. It'll let you store `'0000-00-00 00:00:00'` as a datetime. It'll let you put a string in an integer column and silently convert it. It has no concept of `CHECK` constraints unless you're on InnoDB and actually use them (most people don't).

Postgres does not play that game.

I spent an entire week fixing data types. Here's what I ran into:

- **Dates:** MySQL had dozens of `'0000-00-00'` entries in date columns. Postgres rejects these outright. I had to write a migration script that converted them to `NULL` and backfilled reasonable defaults.

- **Booleans:** MySQL uses `TINYINT(1)` for booleans. Some columns had values like `2` or `-1`. Postgres `boolean` columns only accept `true`, `false`, or `NULL`. I had to audit every boolean column and decide what each non-standard value meant.

- **Encodings:** Some text fields had mixed encodings — UTF-8 and Latin-1 in the same column. Postgres is strict about `UTF-8`. I had to sanitize the data before import.

- **Enums:** The MySQL database had several `VARCHAR` columns that were *functionally* enums — values like `'pending'`, `'approved'`, `'rejected'` — but without actual `ENUM` constraints. I turned these into proper Postgres `ENUM` types, which required careful ordering of the migration.

- **Foreign keys:** The MySQL database had zero foreign key constraints. The schema *implied* relationships, but nothing enforced them. I spent two days auditing orphaned records before I could even define the Postgres schema properly.

The migration script ended up being 800 lines of Python with extensive logging. I ran it in a staging environment three times before I was confident enough to run it against production.

## Code Comparison

Here's what a typical endpoint looked like in the old CodeIgniter app:

```php
<?php
class Report extends CI_Controller {

    public function get_province_summary() {
        $province_id = $this->input->post('province_id');
        $start_date = $this->input->post('start_date');
        $end_date = $this->input->post('end_date');

        // No validation. No type checking. Just vibes.

        $query = "SELECT v.vaccine_name, COUNT(d.id) as total_doses,
                         SUM(CASE WHEN d.status = 'completed' THEN 1 ELSE 0 END) as completed
                  FROM vaccinations d
                  JOIN vaccines v ON d.vaccine_id = v.id
                  WHERE d.province_id = '" . $province_id . "'
                    AND d.administered_date BETWEEN '" . $start_date . "' AND '" . $end_date . "'
                  GROUP BY v.vaccine_name";

        $result = $this->db->query($query)->result_array();

        echo json_encode($result);
    }
}
```

And here's the equivalent in the new FastAPI stack:

```python
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from datetime import date
from decimal import Decimal

router = APIRouter(prefix="/api/reports", tags=["reports"])


class ProvinceSummaryRequest(BaseModel):
    province_id: int = Field(..., gt=0)
    start_date: date
    end_date: date


class VaccineSummary(BaseModel):
    vaccine_name: str
    total_doses: int
    completed: int


@router.post("/province-summary", response_model=list[VaccineSummary])
async def get_province_summary(
    payload: ProvinceSummaryRequest,
    db: AsyncSession = Depends(get_db),
):
    query = (
        select(
            Vaccine.name.label("vaccine_name"),
            func.count(Vaccination.id).label("total_doses"),
            func.sum(
                func.cast(
                    Vaccination.status == "completed", Integer
                )
            ).label("completed"),
        )
        .join(Vaccine, Vaccination.vaccine_id == Vaccine.id)
        .where(Vaccination.province_id == payload.province_id)
        .where(
            Vaccination.administered_date.between(
                payload.start_date, payload.end_date
            )
        )
        .group_by(Vaccine.name)
    )

    result = await db.execute(query)
    return [VaccineSummary(**row._mapping) for row in result.all()]
```

The difference isn't just aesthetics. The FastAPI version:

- **Validates input automatically.** Pydantic raises a `422` if `province_id` is missing or `start_date` is a string.
- **Is type-safe.** If someone changes the `Vaccination` model, the query breaks at type-check time, not in production at 2 AM.
- **Prevents SQL injection by design.** SQLAlchemy parameterizes everything. There's no string concatenation.
- **Returns documented types.** The `response_model` generates an OpenAPI schema that the frontend team can consume directly.

## The Results

Three months after fully migrating:

- **Quarterly report generation:** 40+ seconds → 3.2 seconds. Postgres's query planner is genuinely better for aggregate queries with proper indexes.
- **Type safety:** Caught 12 bugs during development that would have been runtime errors in the old system. Variables used in the wrong type, missing null checks, that sort of thing.
- **Deployment time:** 15 minutes (manual FTP upload) → 2 minutes (GitHub Actions → Vercel + Neon).
- **API documentation:** Auto-generated from code. The public health teams can now see the API schema without asking me to write docs.
- **Developer experience:** I can onboard a new developer in a day. They `git clone`, run `poetry install`, point the `DATABASE_URL` at a Neon branch, and they're up. No "set up a local MySQL instance with this specific dump file" ritual.

## Conclusion

If you're maintaining a legacy PHP system for a government or NGO, here's my advice:

**Don't rewrite from scratch.** Use the Strangler Fig pattern. Let the old system keep running while you build the new one alongside it. You'll sleep better at night.

**Respect the old code.** It's kept the lights on for years. Understand the business logic before you throw it away. I found several edge cases in the CodeIgniter app that weren't documented anywhere — they were just embedded in the PHP logic.

**Data migration is 80% of the work.** Budget your time accordingly. The schema conversion is the easy part. Cleaning up years of dirty data is where the real effort goes.

**Postgres is worth the pain.** Yes, the strictness is annoying during migration. But once you're there, you catch bugs earlier and sleep better at night.

**Pick a stack your team can maintain.** I chose FastAPI and Next.js because I knew I could find Python and React developers. If your team is all PHP, maybe Laravel is the right call. The best tech stack is the one your team will actually use.

The immunization monitoring system is running on the new stack now. It's faster, it's type-safe, and I can deploy changes without holding my breath. That's enough for me. 
🔥🔥


