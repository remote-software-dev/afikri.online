---
title: "Containerizing Laravel 13 with Pure Docker (No Sail)"
date: "2026-07-30"
author: "afikri"
tags: ["Laravel", "Docker", "PostgreSQL", "DevOps"]
# imageUrl: "https://picsum.photos/seed/laravel-docker/800/400"
imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop"
commentsCount: 0
likesCount: 0
bookmarksCount: 0
excerpt: "Building a production-grade, pure Docker environment for Laravel 13 and PostgreSQL 16 without relying on Laravel Sail. Learn how to own your infrastructure from day one."
---

Laravel Sail is excellent for prototyping. You can have a full stack running in minutes with zero configuration. For a greenfield SaaS MVP, it’s the right call. But when migrating a legacy CodeIgniter 3 application with strict security and architectural requirements, Sail’s abstractions quickly become obstacles.

For the Digital Monitoring Immunization Campaign System (DMICS), I needed a containerized development environment that could double as a production deployment template. The requirements were straightforward: Laravel 13 on PHP 8.4 FPM behind Nginx, PostgreSQL 16 with custom schema initialization, Redis 7, Node for Vite, and Mailpit.


### Why Pure Docker Over Laravel Sail?

1. **Custom Service Images**: We required specific PHP extensions (`pdo_pgsql`, `pgsql`, `redis` via Pecl) and a custom `php.ini` tuned for PHP 8.4. With pure Docker, we own the entire chain starting from `FROM php:8.4-fpm-alpine`.
2. **Database Initialization Flow**: Sail’s PostgreSQL container doesn’t provide a clean hook for schema-level initialization. Our setup requires running an `init.sh` script to create a dedicated `campaign` schema and install `uuid-ossp` and `pgcrypto` extensions *before* Laravel’s migrations run.
3. **Production Parity**: Sail is optimized for local development and includes build tools in the PHP container. Pure Docker allows us to build a lean FPM image (no Composer at runtime) and a separate Node image for asset compilation, mirroring a real CI/CD pipeline.

### The Setup: Six Services, One Compose File

The architecture relies on a single `docker-compose.yml` orchestrating six services:
- **App**: PHP 8.4 FPM with Alpine base for a minimal attack surface.
- **Nginx**: Standard Alpine Nginx serving static assets and proxying to `app:9000`.
- **PostgreSQL 16**: Stock image with a custom entrypoint script for schema bootstrapping.
- **Redis 7**: Session driver, cache backend, and rate limiter storage.
- **Node**: Dedicated container for Vite asset bundling with Hot Module Replacement (HMR).
- **Mailpit**: Self-hosted SMTP catch-all for email inspection during development.

### The "Gotcha": PostgreSQL Volume Persistence

During setup, the PostgreSQL container crashed immediately with:
`ERROR: role "dmics" does not exist`

The cause was subtle but critical. PostgreSQL’s Docker entrypoint creates the `POSTGRES_USER` role and `POSTGRES_DB` database *only* when the data directory is empty. On subsequent starts, it skips initialization entirely. However, if the `.env` variables changed or the volume was reused from a different configuration, the init script would fail because it referenced a user that was never created in that specific volume state.

The fix was two-fold:
1. Convert the hardcoded `init.sql` to `init.sh`, allowing us to interpolate `"$POSTGRES_USER"` directly from the environment.
2. Run `docker compose down -v` to wipe the stale PostgreSQL data directory and force a clean initialization on the next `up`.

### Lessons Learned

- **Own your Compose file**: Writing vanilla Docker Compose took a few hours longer upfront but saved days of debugging downstream.
- **Healthchecks are not optional**: Without the `pg_isready` healthcheck on PostgreSQL and `depends_on: condition: service_healthy` on the app service, Laravel’s migration command will race against the database startup and fail sporadically.
- **Volume persistence is a feature and a trap**: Named volumes survive container teardown. When initialization logic changes, you must explicitly wipe the volume.

*Next in series: Migrating Legacy Auth from CodeIgniter 3 to Laravel 13, covering password rehashing and the `LegacyUserProvider`.*

