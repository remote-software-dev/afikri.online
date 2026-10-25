---
title: "Using AI to Write Code Without Creating Hidden Technical Debt"
date: "24 October 2026"
author: "Abdul Fikri"
tags: ["AI", "Software Engineering", "Next.js", "Productivity", "Best Practices"]
description: "Stop blindly trusting AI code. A developer's guide to structured workflows, the SAFE verification checklist, and a rigorous 12-phase engineering lifecycle."
imgUrl: "/blogs/stop-trusting-ai-code-blindly.jpg"
excerpt: "Here is my experience developing software with the assistance of AI-generated tools."
---

# Using AI to Write Code Without Creating Hidden Technical Debt

*A practical reference: the claim, the loop, a working example, and how to scale it to real projects.*

## Why this matters

A popular claim going around says AI-generated code creates a new kind of technical debt that most teams only notice when it is too late. The core of that claim is true, and some of the packaging around it is marketing.

The problem is not that AI writes bad code. Completely wrong code fails fast: it gets caught, deleted, and replaced. The real danger is code that **looks correct but is not**. It passes a quick skim, passes the happy-path test, and fails in production on an edge case weeks later.

This post covers what is true and what is exaggerated, the small loop you can repeat to stay safe, a runnable example, and how to apply the approach to bigger and existing projects.

## What is true, and what is exaggerated

**What holds up**

- Plausible-but-wrong code is more dangerous than code that obviously fails, because failures get caught in minutes and plausible code does not.
- Some evidence supports the broader worry. GitClear's analyses of large code samples found more duplicated and quickly reverted code as AI tools spread, and Google's DORA research linked heavier AI adoption to lower delivery stability even while individual productivity felt higher. Developer surveys also repeatedly name "almost right" output as a top frustration.
- AI makes review harder in a specific way: the code is fluent and consistently formatted, so it triggers less suspicion than messy human code.

**What is overstated**

- "A new kind of technical debt" is partly branding. The mechanics are old: unreviewed code, duplicated logic, and code nobody understands. AI produces them faster and in larger volume.
- "Most teams only notice too late" is unverifiable, and "three questions in thirty seconds" is a video hook. A good checklist helps, but it does not catch most hidden debt on its own.
- The evidence is early and mixed. Teams with strong tests and review habits report real gains.

**The takeaway:** take the warning seriously, but do not treat it as a brand-new phenomenon. The answer is traditional engineering discipline, applied a bit more strictly to code you did not write yourself.

## The approach: traditional engineering, with AI as the first draft

You do need the traditional software approach. It is what makes AI usable safely, because it gives you a way to verify output you did not write.

**What stays the same**

- Requirements or a short spec before you code
- Tests that define correct behavior
- Code review and small commits
- CI, linting, and type checking
- Clear architecture and conventions
- Documentation of decisions

**What changes with AI**

- **You become the reviewer more than the writer.** Judging code quickly and accurately becomes your main skill.
- **The spec matters more.** AI fills gaps with plausible guesses, so vague intent produces vague code.
- **Tests come first, or from you.** If the AI writes both the code and the tests, they can share the same wrong assumption.
- **Smaller steps.** Ask for one function or feature at a time, not a whole module.
- **Give it context.** Point it at your existing helpers and conventions so it reuses instead of reinventing.

One calibration point: for throwaway prototypes, learning projects, and one-off scripts you can be much looser. The strict process is for code that will live in production or that others depend on.

## The loop

The **loop** is the small cycle you repeat for every piece of work. It takes minutes to hours.

1. Write down what this piece should do (spec).
2. Write the tests.
3. Let AI write the code.
4. Run the checks (tests, types, lint).
5. Review the result yourself.
6. Fix or accept, then start the next piece.

During step 5, ask three questions of every change:

1. Can I explain what this does and why, without the AI's help?
2. What breaks on the unhappy path (null input, timeouts, concurrency, partial failure, bad permissions)?
3. Does this duplicate or contradict something we already have?

Two more checks are worth making: verify that the libraries, methods, and parameters the AI used actually exist in the version you run, and check that the code fits your architecture instead of being a plausible but foreign style.

## A working example: split_bill

Here is a tiny project that shows the loop, including a failure. It has four files: a spec, an AI draft, a fixed implementation, and tests. The tools are pytest and Hypothesis, a property-based testing library.

### Step 1: The spec (SPEC.md)

You write this, because the AI does not know your business rules.

```
# split_bill(total_cents, people) -> list[int]

Split a bill between people. Amounts are integer cents (never floats).

Rules:
1. Returns exactly `people` amounts.
2. The amounts MUST add up to exactly total_cents (no cent lost or created).
3. Amounts differ by at most 1 cent (fair split).
4. Extra cents go to the first people in the list.
5. total_cents < 0 or people < 1 -> raise ValueError.
```

### Step 2: What an AI often writes first

This looks clean and correct:

```python
def split_bill(total_cents: int, people: int) -> list[int]:
    share = total_cents // people
    return [share] * people
```

It passes the happy-path case: `split_bill(100, 4)` returns `[25, 25, 25, 25]`. That is exactly why this kind of bug survives a quick review.

### Step 3: The tests

There are three kinds, and each plays a different role.

```python
import importlib, os
import pytest
from hypothesis import given, strategies as st

# IMPL=ai_draft pytest  -> test the AI draft
# pytest                -> test the real implementation
split_bill = importlib.import_module(os.environ.get("IMPL", "bill_split")).split_bill

# 1. Example test: the happy path (easy to pass, easy to be fooled)
def test_even_split():
    assert split_bill(100, 4) == [25, 25, 25, 25]

# 2. Edge cases from the spec, written by YOU
def test_extra_cents_go_to_first_people():
    assert split_bill(100, 3) == [34, 33, 33]

def test_zero_total():
    assert split_bill(0, 3) == [0, 0, 0]

def test_invalid_input():
    with pytest.raises(ValueError):
        split_bill(100, 0)
    with pytest.raises(ValueError):
        split_bill(-1, 2)

# 3. Property test: rules that must hold for ANY input
@given(st.integers(min_value=0, max_value=10**9), st.integers(min_value=1, max_value=1000))
def test_properties(total, people):
    result = split_bill(total, people)
    assert len(result) == people           # rule 1
    assert sum(result) == total            # rule 2
    assert max(result) - min(result) <= 1  # rule 3
```

### Step 4: Run the checks against the AI draft

The draft fails three tests:

- `split_bill(100, 3)` returns `[33, 33, 33]`, so a cent has vanished.
- It crashes with `ZeroDivisionError` on `people=0`, where the spec says `ValueError`.
- The property test found the smallest failing case by itself: `total=1, people=2` returns `[0, 0]`, which sums to 0 instead of 1.

### Step 5: The fixed version

```python
def split_bill(total_cents: int, people: int) -> list[int]:
    if total_cents < 0 or people < 1:
        raise ValueError("total_cents must be >= 0 and people >= 1")
    share, remainder = divmod(total_cents, people)
    return [share + (1 if i < remainder else 0) for i in range(people)]
```

All five tests pass.

### Why this works

- **The spec** captures rules only you know.
- **Example tests** check specific cases but alone would have passed the broken draft.
- **Property tests** state rules that hold for any input and let the tool generate hundreds of inputs to break them. This is the best defense against code that looks right but is not, because it finds edge cases you did not think of.

To try it yourself:

```
pip install pytest hypothesis
IMPL=ai_draft pytest    # watch the draft fail
pytest                  # fixed version passes
```

**Exercise:** give an AI only the spec (no tests, no draft) and ask for `split_bill`. Run the tests against its answer. Then change a rule, for example "extra cents go to the last people", update the tests first, and see whether the AI follows it.

## Tools and frameworks worth knowing

There is no single "AI-safe coding framework". These are the pieces people combine:

- **Spec-driven development:** GitHub Spec Kit and Amazon's Kiro formalize "write the spec first, then let AI implement".
- **Test-driven development (TDD):** write tests first. It is an old practice that AI makes more valuable.
- **Property-based testing:** Hypothesis for Python, fast-check for TypeScript.
- **CI as a gate:** GitHub Actions running tests, lint, and type checks on every pull request, so nothing merges on "it looks fine".

Learn the manual loop before adopting any tool. They all automate the same idea, and the habit matters more than the tool.

## Loop versus workflow

These two words describe different time scales.

- The **loop** is the small cycle for one piece of work: spec, test, AI code, check, review.
- The **workflow** is everything around it, from the start of a feature to running in production: write the feature spec, break it into slices, run the loop for each slice, merge through CI and review, release carefully, and clean up debt every few weeks.

| Level | Time scale | Example |
| --- | --- | --- |
| Loop | Minutes to hours | Spec, test, AI code, check, review for one function |
| Workflow | Days to weeks | One feature from idea to released |
| Project setup | Once, then maintained | AGENTS.md, CI, folder layout |

A useful analogy is building a house: laying one brick and checking it is level is the loop, and the whole plan from blueprint to inspection is the workflow.

## Scaling up to a bigger project

The core loop stays the same. For larger projects you add structure around it so it does not break down as the codebase grows.

**1. Layer your specs.** Use three levels: project (architecture, conventions, and the rules AI must follow, kept in an `AGENTS.md` or `CLAUDE.md` file at the repo root), feature (one short spec per feature covering behavior, edge cases, and what is out of scope), and task (the small chunk you hand to the AI, with a clear definition of done).

**2. Work in small vertical slices.** Cut features into slices that each work end to end, such as "create invoice record, with API and test". Keep diffs small enough to review properly, roughly under 300 lines. Large AI diffs are where rubber-stamping happens.

**3. Build a test pyramid.** Use unit and property tests for pure logic, integration tests against a real database instead of mocks (AI is good at writing mocks that pass while the real query is wrong), contract tests at API boundaries (Pydantic, Zod, or an OpenAPI schema), and a few end-to-end tests for critical user flows only.

**4. Automate the guardrails.** Anything a machine can check should not depend on human attention: strict TypeScript or a Python type checker, ESLint or Ruff, CI that blocks merging on failures, pre-commit hooks for formatting and secrets scanning, and dependency checks (AI sometimes invents packages or suggests outdated ones). Mutation testing with tools like Stryker or mutmut goes further by deliberately breaking your code to check that your tests notice.

**5. Protect your architecture boundaries.** AI drifts toward plausible but foreign structure. Keep modules with clear interfaces, let AI work inside a module, and enforce boundaries with tools like dependency-cruiser (TypeScript) or import-linter (Python), so "the UI must not import from the database layer" becomes a failing check instead of a review comment.

**6. Review by risk, not equally.** You cannot deeply review everything at volume, so match scrutiny to stakes.

| Risk | Examples | Review |
| --- | --- | --- |
| High | Auth, permissions, payments, data migrations, anything deleting data | Line by line by you, tests written by you |
| Medium | Business logic, API endpoints | Read the diff, check the three questions |
| Low | UI styling, internal scripts, docs | Skim, rely on CI |

Use a pull request template with the three questions so the habit is built in.

**7. Manage the AI's context.** Start a fresh session per task, give it only the relevant files plus the spec and `AGENTS.md`, tell it which existing code to reuse by name, and when it keeps repeating a mistake, add a rule to `AGENTS.md` once instead of correcting it every time.

**8. Assume some bugs will escape.** Add a safety net: error tracking (Sentry), structured logs, feature flags and staged rollouts for risky changes, database backups, and reversible migrations.

**9. Schedule debt cleanup.** Every couple of weeks, check for duplicated code (jscpd), dead code, unused dependencies, and files nobody understands.

A starter repository layout:

```
project/
├── AGENTS.md          # rules and conventions for the AI
├── docs/
│   ├── decisions/     # short architecture decision records
│   └── specs/         # one spec per feature
├── src/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── .github/
    ├── workflows/ci.yml
    └── pull_request_template.md
```

You do not need all of this on day one. Start with `AGENTS.md`, a spec per feature, CI with tests, types, and lint, and the pull request checklist. Add the other layers when the size or risk of the project calls for them.

## Applying this to an existing project

Yes, you can adopt this on a project that already exists, and the key is to do it gradually. Retrofitting everything at once means weeks of tests and docs with nothing shipped.

**Step 1: Add the guardrails (about an hour).** Write an `AGENTS.md` describing how to run the project, the folder structure, conventions, and which helpers to reuse (an AI can draft it from the codebase, but correct it yourself). Set up CI to run whatever tests, lint, and type checks you already have, and enable stricter type checking gradually, for example for new files only.

**Step 2: Apply the loop only to new work.** From now on, every new feature or bug fix goes through the loop. Old code stays as it is.

**Step 3: Lock down old code before changing it.** Before changing, or asking AI to change, a part that has no tests, write **characterization tests**: tests that record what the code does right now, even if it is imperfect. Make the change, and if those tests still pass, existing behavior is intact. If one fails, you decide whether the change was intended. This gives you a safety net exactly where you are working.

**Step 4: Prioritize by risk.** If you add tests beyond the code you are touching, start with auth, payments, data deletion, migrations, and anything that has broken before. Skip low-risk areas like styling.

**Step 5: Improve a little each time.** Each time you work in a file, add a test, fix a type, or note a convention in `AGENTS.md`. Coverage then grows where it matters, driven by real work.

**What to avoid on an existing project**

- Asking AI to refactor large areas without tests in place. This is where code that looks right but is not does the most damage.
- Writing tests after an AI change using the AI's own output as the expected answer, which freezes any bug in place.
- Mixing a refactor and a new feature in the same change. Keep them separate so each diff stays reviewable.

A realistic first week:

| Day | Task |
| --- | --- |
| 1 | `AGENTS.md` and CI running |
| 2 | Pick one small bug or feature and run the full loop on it |
| 3 | Add characterization tests for the area you will touch next |
| 4-5 | Continue real work with the loop, adding a rule to `AGENTS.md` whenever the AI repeats a mistake |

## Quick reference

**The loop:** spec, tests, AI writes a small piece, run checks, review yourself, repeat.

**The three review questions:**

1. Can I explain this without the AI's help?
2. What breaks on the unhappy path?
3. Does this duplicate or contradict something we already have?

**Rules of thumb:**

- Never merge code you cannot explain.
- Tests should come from you, or be approved by you, not be generated to match the AI's own code.
- Keep changes small enough to review properly.
- Let machines check what machines can check.
- Match rigor to risk: loose for prototypes, strict for production.
- Adopt gradually: guardrails first, then the loop on new work, then tests around old code as you touch it.
