---
title: "Building with Next.js App Router"
date: "2024-06-15"
author: "afikri"
tags: ["Next.js", "React", "TypeScript"]
imageUrl: "https://picsum.photos/seed/nextjs-app/800/400"
commentsCount: 27
likesCount: 189
bookmarksCount: 71
excerpt: "Next.js App Router introduces a new paradigm for building React applications with file-based routing, server components, and streaming. This guide covers layouts, data fetching, and route handlers."
---

The Next.js App Router represents a fundamental shift from the Pages Router. Routes are defined by folders inside the `app` directory, with `page.tsx` files rendering the UI. This file-system based approach makes route structure visible in your project tree at a glance.

Server Components run exclusively on the server, reducing the JavaScript sent to the client. They can directly access databases, file systems, and backend services without exposing sensitive logic. Client Components, marked with `"use client"`, handle interactivity and browser APIs. This mental model takes some adjustment but leads to faster pages by default.

Data fetching patterns have also evolved. `async` components can `await` fetch calls directly, and Next.js automatically deduplicates requests. Streaming with `loading.tsx` and `Suspense` boundaries lets you send parts of the page progressively, improving perceived performance on slow connections.
