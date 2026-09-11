---
title: "Stop Trusting AI Code Blindly: A Developer's Guide"
date: "7 September 2026"
author: "Abdul Fikri"
tags: ["AI", "Software Engineering", "Next.js", "Productivity", "Best Practices"]
description: "Stop blindly trusting AI code. A developer's guide to structured workflows, the SAFE verification checklist, and a rigorous 12-phase engineering lifecycle."
imgUrl: "/blogs/stop-trusting-ai-code-blindly.jpg"
excerpt: "Here is my experience developing software with the assistance of AI-generated tools."
---

## The Problem with "Vibe Coding"

The biggest mistake developers make is asking AI to build large chunks of functionality at once: *"Build the authentication system"* or *"Import this Excel file."*

When you do this, you lose control. The AI makes assumptions, ignores edge cases, and introduces technical debt. To build [production-grade software](/about) with AI, you must adopt **Engineering Discipline**.

## The Verification Workflow: The "SAFE" Checklist

To manage AI effectively, I use a verification checklist I call **SAFE**. It ensures that every piece of AI-generated code is isolated, tested, and verified before it touches your main codebase.

### 1. Structured Prompting (Context is King)
AI fails when it lacks context. Never give vague instructions. Use the **RTF Framework** (Role, Task, Format) for every prompt.

❌ **Bad Prompt:** *"Add login to my app."*

✅ **Good Prompt:** *" Role: Act as a Senior Security & Next.js Developer.
Task: Write a [NextAuth v5](https://next-auth.js.org/) credentials provider for email and password authentication.
Context:
Verify passwords using bcryptjs.
If an account is locked (isLocked: true in Prisma DB), throw a custom error message: "Account suspended. Contact support."
Do not return sensitive fields like passwordHash in the JWT session callback.
Wrap the lookup in a try/catch block and log failures to console without exposing internal DB error strings to the client.
Format: Provide the code for auth.ts and the typed session callbacks.
"*

### 2. Atomic Branching (Isolate the AI)
Never let AI write directly to your `main` branch. 
* Create a new branch for every feature (`git checkout -b feature/excel-import`).
* Commit changes incrementally. 
* Only merge into `main` after you have manually verified the branch works.

### 3. Forced Verification (Trust, but Verify)
AI naturally codes for the "happy path." You must force it to prove its code works.
* **Technical Check:** Always run `npm run build`, `npm run lint`, and `npx tsc --noEmit` after every AI task.
* **Data Check:** For database operations, open [**Prisma Studio**](https://www.prisma.io/docs/orm/tools/prisma-studio) (`npx prisma studio`) and visually inspect the rows.
* **The "Dry Run" Pattern:** Before running a script that mutates data, ask the AI to write a "Dry Run" script that `console.log`s exactly what it *would* do without actually saving to the database.

### 4. Edge Case Handling (Force the AI to Think)
After the AI finishes a feature, prompt it with "What If" scenarios:
> *"Great, login works. Now handle these edge cases: What if the account is suspended? What if the database drops mid-auth check? What if the user enters 5 wrong passwords in a row?"*

---

## The 12-Phase AI Engineering Workflow

If you want to build production apps (especially for enterprise, healthcare, or government clients), you need a stricter workflow. I put this lifecycle into practice when [migrating a national health system from CodeIgniter to FastAPI](/blogs/from-codeigniter-to-fastapi-migration). Here is the 12-phase lifecycle I recommend:

### Phase 1: Specification (PRD + SRS)
Don't code first. Write a brief Software Requirements Specification. Define the functional and non-functional requirements, then give this to the AI.

### Phase 2: Architecture, Not Code
Ask the AI to design the architecture *before* writing code. Ask for the folder structure, database schema (ERD), API endpoints, and security decisions. Review this first.

### Phase 3: Tests Before Code (TDD)
This is the most important practice. Ask the AI to write the tests *before* the implementation. Define the success cases, invalid inputs, and unauthorized scenarios.

### Phase 4: Implement One Small Task at a Time
Do not ask the AI to build the whole app. Break it down into tasks under 300 lines of code:
1. Database Schema
2. Migration
3. Repository Layer
4. Service Layer
5. API Route
6. Frontend UI

### Phase 5: Force AI to Self-Review
After the AI writes code, prompt it: *"Review the code you just generated. Act as a principal engineer. Check for SOLID principles, security risks, N+1 queries, and dead code. Return only review comments."*

### Phase 6: Automated Quality Gates
Every AI-generated change must pass automated checks. Configure your CI/CD (like GitHub Actions) to run Typecheck, Lint, Unit Tests, and Production Build. **No merge until every gate is green.**

### Phase 7: Write Integration & End-to-End (E2E) Tests
* **Integration & E2E Tests:** Use tools like Playwright or Cypress to test the application exactly like a real user.
* **Real-World Scenarios:** Ask the AI to generate tests for complete user flows, such as registering, logging in, navigating to a protected page, and logging out.
* **Failure Handling:** Ensure the AI writes tests for negative paths, such as entering invalid credentials or experiencing a network timeout.

### Phase 8: Add AI Verification Gates (CI/CD)
* **Automated Pipelines:** Set up GitHub Actions or GitLab CI to automatically run checks whenever the AI pushes code.
* **The "No Merge" Rule:** Configure the pipeline to run Typecheck, Lint, Unit Tests, and Production Build. The AI is not allowed to merge its code until every single gate is green.
* **Auto-Fix Failures:** If a gate fails, instruct the AI to explain the root cause, propose a minimal fix, and rerun only the affected tests.

### Phase 9: Professional Git & Pull Request (PR) Documentation
* **Structured PR Summaries:** Force the AI to generate a comprehensive Pull Request description before merging.
* **Required Details:** The summary must include the purpose of the change, architecture updates, database schema changes, and required migrations.
* **Rollback Strategy:** Ask the AI to explicitly state how to revert the changes if the new feature breaks in production.

### Phase 10: Test Coverage Analysis
* **Identify Blind Spots:** Ask the AI to analyze the current test coverage and report on uncovered files, branches, and risky functions.
* **Prioritize High-Risk Areas:** Instruct the AI to suggest and write missing tests for critical paths, such as expired tokens, duplicate emails, or unauthorized access attempts.
* **Quality over Quantity:** Focus on covering complex business logic rather than just achieving a high percentage number.

### Phase 11: Security Review (OWASP)
* **OWASP Top 10 Audit:** Ask the AI to act as a cybersecurity expert and review its own code for common vulnerabilities.
* **Specific Checks:** Ensure it checks for SQL injection, Cross-Site Scripting (XSS), exposed environment variables, insecure direct object references, and rate limiting.
* **Dependency Scanning:** Run automated dependency audits (e.g., `npm audit` or `pip-audit`) and have the AI patch any vulnerable packages.

### Phase 12: Performance Review
* **Database Optimization:** Ask the AI to check for N+1 queries in Prisma/ORM and suggest adding missing database indexes.
* **Frontend Efficiency:** Instruct the AI to look for unnecessary React re-renders, heavy computations in the render cycle, and missing memoization.
* **Caching & Latency:** Identify opportunities to implement caching (like Redis) and optimize API response times to stay under target thresholds (e.g., 300ms).

---

## The Golden Rule of AI Development

When working with AI, **you transition from being the "Writer" of the code to the "Editor/Manager" of the code.** 

The AI is your incredibly fast, highly knowledgeable, but occasionally careless junior developer. It will write the code in seconds, but it is your job to review the pull request, check the database, run the tests, and ensure the client's business logic is 100% correct.

Code is not accepted until tests, type checks, lint, build, and manual review all pass. That is how you build reliable software with AI.

---

