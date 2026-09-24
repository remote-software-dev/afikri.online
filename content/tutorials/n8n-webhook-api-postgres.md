---
title: "Build a Self-Hosted Webhook → API → Postgres Pipeline in n8n"
description: "A complete, reproducible n8n tutorial — including the real Docker networking, auth, and empty-dropdown errors you'll hit, and exactly how to fix them."
tags: [n8n, automation, postgres, docker, selfhosted]
slug: n8n-webhook-api-postgres-pipeline
date: 2026-09-24
---

# 📘 Tutorial: Build a Self‑Hosted Webhook → API → Database Pipeline in n8n

*A complete, reproducible walkthrough — including the real errors you'll hit and how to fix them.*

**What you'll build**

A workflow that listens for an HTTP request, fetches live data from an external API, extracts a single field, saves it permanently to a PostgreSQL database, and sends a clean response back to the caller. This is the universal skeleton behind almost every "job automation", "lead scraper", or "data sync" project — master it once and you can swap the API and the table for anything.

**Why self‑host it**

No per‑execution billing, your data never leaves your machine, and you own the whole stack. We'll run n8n + Postgres together with Docker Compose on Linux (Debian/Ubuntu), but the n8n steps are identical on any OS.

**Prerequisites**

- Docker + Docker Compose installed
- A terminal (we'll use `curl` and `psql` directly)
- ~15 minutes

---

## 0. The stack (Docker Compose)

Drop this in `docker-compose.yml`. Note the three environment variables on the `n8n` service (`DB_POSTGRESDB_*`) — they tell n8n to *store its own* data in Postgres too, which is exactly what we want for a serious setup.

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: n8n_postgres
    environment:
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: n8n_password
      POSTGRES_DB: n8n_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - n8n_network

  n8n:
    image: docker.n8n.io/n8nio/n8n
    container_name: n8n_instance
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - NODE_ENV=production
      - WEBHOOK_URL=http://localhost:5678/
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n_db
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=n8n_password
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - postgres
    networks:
      - n8n_network

volumes:
  postgres_data:
  n8n_data:

networks:
  n8n_network:
```

Start it:

```bash
docker compose up -d
```

Open `http://localhost:5678` and create your n8n owner account.

> ⚠️ **The #1 Docker trap, up front.** Inside the n8n container, the database host is the **service name** `postgres` (or the container name `n8n_postgres`) — **not** `localhost`. `localhost` from inside a container points at the container itself, not your host machine. This single fact causes most "connection refused / auth failed" confusion. We'll come back to it in Step 6.

---

## 1. The architecture

```
[ Webhook ] → [ Edit Fields ] → [ HTTP Request ] → [ Edit Fields ] → [ Postgres ] → [ Respond to Webhook ]
   trigger       greet +          fetch JSON        extract one       INSERT a        send the result
                  pass data        (GET)             field              row            back to caller
```

Six nodes. Each one does exactly one job. Keep that mental model — n8n workflows are just data flowing left‑to‑right through small, single‑purpose nodes.

---

## 2. Create the workflow + Webhook trigger

1. **⋯ → New** (or the **+** button) to start a blank workflow.
2. Click **Add first step → Webhook**.
3. Set **HTTP Method** = `POST`, **Path** = `Hello`.
4. 🔑 **Critical:** set **Respond** = `Using "Respond to Webhook" Node`.
   *(Default is `Immediately`, which fires the response before your pipeline runs — you'd return nothing. Leave this on "Respond to Webhook Node" and we'll fill the response at the very end.)*
5. Copy the **Test URL** shown (e.g. `http://localhost:5678/webhook-test/Hello`). You'll `curl` this later.

---

## 3. First Edit Fields node (optional greeting / pass‑through)

This node proves you can read the incoming payload and reshape it.

1. Click **+** after the Webhook → **Edit Fields (Set)**.
2. **Add Field** → Name `message`, Value `Hello, {{ $json.body.name }}`.

`$json.body.name` is the magic: `$json` = the incoming item, `.body` = the parsed JSON body of the POST request. This is how you read *anything* a webhook receives.

---

## 4. HTTP Request node (fetch live data)

1. **+** after Edit Fields → **HTTP Request**.
2. **Method** = `GET`
3. **URL** = `https://jsonplaceholder.typicode.com/posts/1`
   *(a free fake‑API — perfect for learning; swap it for a real jobs API later.)*
4. Click **Execute step** and look at the right‑hand **OUTPUT** table. You'll see columns `userId`, `id`, `title`, `body`. *This output is what the next node reads.*

---

## 5. Second Edit Fields node (extract one field)

Real APIs return huge blobs. You rarely want all of it — you want *one* field. This is the skill that separates toy flows from production ones.

1. **+** after HTTP Request → **Edit Fields (Set)**.
2. **Add Field** → Name `extracted_title`, Value `{{ $json.title }}`.

`$json` here refers to the *previous node's* output (the HTTP response), so `$json.title` pulls just the title string. Everything else is discarded. Clean.

---

## 6. Postgres node (persist the data)

### 6a. Create the table first

n8n can't insert into a table that doesn't exist. Make one from the terminal:

```bash
docker exec -it n8n_postgres psql -U n8n -d n8n_db -c \
"CREATE TABLE IF NOT EXISTS job_data (id SERIAL PRIMARY KEY, title TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
```

Expect `CREATE TABLE`.

### 6b. Add the node + credential

1. **+** after the second Edit Fields → search **Postgres** → **Insert rows in a table**.
2. **Credential → Create new credential** and enter:

| Field | Value | Why |
|---|---|---|
| Host | `postgres` | the **service name** on the shared Docker network (NOT `localhost`) |
| Port | `5432` | default |
| Database | `n8n_db` | from `POSTGRES_DB` |
| User | `n8n` | from `POSTGRES_USER` |
| Password | `n8n_password` | from `POSTGRES_PASSWORD` |

3. **Save.** If you see *"password authentication failed"*, your user/password/db don't match the compose file — re‑check all three (this is the second most common error after the host mistake).

### 6c. Map the columns

1. **Table** dropdown → choose `job_data`.
   > 🪤 **Empty dropdown?** The list of tables only loads *after* n8n has run the upstream nodes with this credential. Click **"Execute previous nodes"** on the left panel, *then* reopen the Table dropdown. This trips up nearly everyone on their first try.
2. **Mapping Column Mode** = `Map Each Column Manually`.
3. Fill **only** the `title` box with `{{ $json.extracted_title }}`. Leave `id` and `created_at` empty — the database fills those automatically (`SERIAL` + `DEFAULT CURRENT_TIMESTAMP`).

---

## 7. Respond to Webhook node (send the result back)

1. **+** after Postgres → **Respond to Webhook**.
2. **Respond With** = `First Incoming Item`.

Now the caller gets back exactly the row n8n just produced (including your extracted field). This is the payoff of setting the trigger's *Respond* mode back in Step 2.

---

## 8. Test it end‑to‑end

1. Click **Execute workflow** (bottom). Wait for *"Waiting for you to call the test URL…"*.
2. In a terminal:

```bash
curl -X POST "http://localhost:5678/webhook-test/Hello" \
  -H "Content-Type: application/json" \
  -d '{"name": "Fikri"}'
```

3. You should see JSON back, e.g.:

```json
{"extracted_title":"sunt aut facere repellat provident occaecati excepturi optio reprehenderit"}
```

> 🪤 **`{"code":404,"message":"The requested webhook ... is not registered"}`?** The *test* listener only accepts **one** call after you click Execute, and it expires quickly. Fix: click **Execute workflow** again, then *immediately* re‑run the curl (press ↑ in the terminal to recall it). Test webhooks are single‑use by design.

4. Confirm it really hit the database:

```bash
docker exec -it n8n_postgres psql -U n8n -d n8n_db -c "SELECT * FROM job_data;"
```

You'll see your row with `id`, `title`, and a `created_at` timestamp. 🎉

---

## 9. Go live (Production mode)

Test mode needs a manual click every time. For 24/7 operation:

1. Open the **Webhook** node → switch to the **Production URL** tab and copy it (path is `/webhook/Hello`, no `-test`).
2. Toggle the workflow **Active** (in newer n8n this is the **Publish** button, top‑right).
3. `curl` the **production** URL — no "Execute" needed, ever again.

---

## 🛠️ Troubleshooting cheat‑sheet (the exact errors, in order of how often they bite)

| Symptom | Cause | Fix |
|---|---|---|
| `404 webhook not registered` | test listener expired / already used | click **Execute workflow**, then curl immediately |
| `password authentication failed for user "..."` | user/pass/db mismatch | copy values straight from `docker-compose.yml` |
| Connection refused / can't reach DB | used `localhost` as host inside container | use the service name `postgres` (or `n8n_postgres`) |
| Table dropdown is empty | upstream nodes not executed with this cred | click **Execute previous nodes**, then reopen dropdown |
| Response is empty `{}` | trigger set to *Respond Immediately* | set Webhook **Respond** = *Using "Respond to Webhook" Node* |
| `{{ }}` shows as literal text | expression not switched to expression mode | click the **fx / ={}** toggle on the field |

---

## 🔭 What's next (turning this toy into your job automation)

You now own the hard 80%. The remaining work is just swapping parts:

- **Real data source:** replace the JSONPlaceholder URL with a jobs API or an RSS→JSON endpoint.
- **Richer schema:** add columns (`company`, `location`, `url`, `salary`) to `job_data` and map them the same way.
- **De‑duplication:** before inserting, add a **Postgres → Select rows** node (or an *IF* node) to skip titles you've already saved.
- **Schedule instead of webhook:** swap the Webhook trigger for a **Schedule Trigger** to poll new listings every hour, unattended.
- **Resilience:** open each node's **Settings → On Error** and add retry + an error‑handler workflow so one bad response doesn't kill the run.
- **Share your exact build:** in the editor, **⋯ → Download** exports the workflow as JSON — attach that to the tutorial so readers can import it in one click.

> 📎 **TODO (author):** paste your exported n8n workflow JSON here in a ```json fence so readers can import the exact build in one click. (Export via ⋯ → Download in the n8n editor.)