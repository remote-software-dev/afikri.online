export interface TutorialNavItem {
  id: string;
  title: string;
  children?: TutorialNavItem[];
}

export interface SubSection {
  heading: string;
  body?: string;
  code?: {
    language: string;
    code: string;
  };
  textBlock?: string;
  info?: string;
  points?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  numberedSteps?: string[];
}

export interface SectionContent {
  id: string;
  title: string;
  timing?: string;
  description?: string;
  subsections?: SubSection[];
  checklist?: string[];
  infoBox?: string;
}

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  category: string;
  tags: string[];
  navigation: TutorialNavItem[];
  sections: Record<string, SectionContent>;
}

export const tutorialsData: Record<string, Tutorial> = {
  "getting-started-with-fastapi": {
    slug: "getting-started-with-fastapi",
    title: "Getting Started with FastAPI",
    description:
      "Learn the fundamentals of FastAPI, including modern Python type hints, automatic OpenAPI docs, and writing high-performance async endpoints.",
    level: "Beginner",
    readTime: "15 min read",
    category: "Backend & APIs",
    tags: ["FastAPI", "Python", "REST API"],
    navigation: [
      {
        id: "getting-started-with-fastapi",
        title: "FastAPI Quickstart",
        children: [
          { id: "learning-outcomes", title: "Learning Outcomes" },
          { id: "introduction", title: "What is FastAPI?" },
          { id: "prerequisites", title: "Prerequisites & Tools" },
          { id: "step-1-setup", title: "Step 1: Installation & Setup" },
          { id: "step-2-first-route", title: "Step 2: Create First Endpoint" },
          { id: "step-3-params", title: "Step 3: Path & Query Parameters" },
          { id: "step-4-docs", title: "Step 4: Interactive API Docs (Swagger UI)" },
          { id: "key-takeaways", title: "Key Takeaways & Checklist" },
        ],
      },
    ],
    sections: {
      "learning-outcomes": {
        id: "learning-outcomes",
        title: "Getting Started with FastAPI",
        description:
          "FastAPI is a modern, high-performance web framework for building APIs with Python 3.10+ based on standard Python type hints.",
        subsections: [
          {
            heading: "Learning Outcomes",
            body: "By the end of this tutorial, you will be able to:",
            points: [
              "Set up an isolated Python virtual environment and install FastAPI with Uvicorn.",
              "Create and run high-performance asynchronous API endpoints.",
              "Use path parameters and query parameters with automatic type validation.",
              "Leverage automatic interactive documentation via Swagger UI and ReDoc.",
              "Understand how Pydantic guarantees request and response data integrity.",
            ],
            info: "FastAPI is built on top of Starlette (for web routing and async support) and Pydantic (for data validation and schema generation).",
          },
        ],
      },
      introduction: {
        id: "introduction",
        title: "What is FastAPI?",
        timing: "~10 min",
        description:
          "FastAPI is one of the fastest Python frameworks available, rivaling Node.js and Go in speed benchmarks.",
        subsections: [
          {
            heading: "Core Advantages",
            table: {
              headers: ["Feature", "Benefit"],
              rows: [
                ["High Performance", "Built on ASGI standard using Starlette; runs asynchronously."],
                ["Fast to Code", "Increases feature delivery speed by roughly 200% to 300%."],
                ["Fewer Bugs", "Reduces about 40% of developer-induced errors via strict typing."],
                ["Automatic Docs", "Interactive Swagger UI and ReDoc generated with zero configuration."],
                ["Standards-Based", "100% compatible with OpenAPI and JSON Schema specifications."],
              ],
            },
            info: "Because FastAPI uses standard Python 3.10+ type annotations, your IDE provides full auto-completion, linting, and type checking everywhere.",
          },
        ],
      },
      prerequisites: {
        id: "prerequisites",
        title: "Prerequisites & Tools",
        description: "Before getting started, make sure your system satisfies the following requirements:",
        subsections: [
          {
            heading: "Required Environment",
            table: {
              headers: ["Software", "Minimum Version", "Purpose"],
              rows: [
                ["Python", "3.10+", "Programming runtime"],
                ["pip", "22.0+", "Python package manager"],
                ["VS Code / Cursor", "Any recent version", "Recommended code editor with Python extensions"],
                ["cURL / Browser", "Modern browser", "Testing endpoints and viewing interactive documentation"],
              ],
            },
            code: {
              language: "bash",
              code: "python3 --version\npip --version",
            },
            info: "If Python is not installed on your system, download it from python.org or install it via your system's package manager.",
          },
        ],
      },
      "step-1-setup": {
        id: "step-1-setup",
        title: "Step 1: Installation & Setup",
        timing: "~5 min",
        description: "Always isolate Python dependencies using a dedicated virtual environment.",
        subsections: [
          {
            heading: "Create & Activate Virtual Environment",
            code: {
              language: "bash",
              code: "# Create project directory\nmkdir fastapi-tutorial && cd fastapi-tutorial\n\n# Create virtual environment\npython3 -m venv venv\n\n# Activate on Linux/macOS:\nsource venv/bin/activate\n\n# Activate on Windows (cmd/PowerShell):\n# venv\\Scripts\\activate",
            },
          },
          {
            heading: "Install FastAPI and Uvicorn Server",
            code: {
              language: "bash",
              code: 'pip install fastapi "uvicorn[standard]"',
            },
            info: "Uvicorn is a lightning-fast ASGI web server implementation for Python. The `[standard]` flag installs optional high-performance C libraries like uvloop and httptools.",
          },
        ],
      },
      "step-2-first-route": {
        id: "step-2-first-route",
        title: "Step 2: Create Your First Endpoint",
        timing: "~10 min",
        description: "Let's create a minimal web application in a file named `main.py`.",
        subsections: [
          {
            heading: "Writing `main.py`",
            code: {
              language: "python",
              code: `from fastapi import FastAPI

app = FastAPI(
    title="Tutorial API",
    description="Getting Started with FastAPI",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!", "status": "active"}

@app.get("/health")
def health_check():
    return {"health": "ok", "timestamp": "2026-09-20T14:00:00Z"}`,
            },
          },
          {
            heading: "Running the Server",
            body: "Run Uvicorn from your terminal with the `--reload` flag so it auto-reloads on file changes:",
            code: {
              language: "bash",
              code: "uvicorn main:app --reload --port 8000",
            },
            info: "Open your browser at `http://127.0.0.1:8000` to see your JSON response: `{\"message\":\"Hello from FastAPI!\",\"status\":\"active\"}`.",
          },
        ],
      },
      "step-3-params": {
        id: "step-3-params",
        title: "Step 3: Path & Query Parameters",
        timing: "~15 min",
        description: "FastAPI makes reading URL parameters intuitive while enforcing strict data types.",
        subsections: [
          {
            heading: "Path Parameters with Type Casting",
            body: "Declare path parameters in URL templates using curly braces `{}` and match them as function arguments:",
            code: {
              language: "python",
              code: `@app.get("/items/{item_id}")
def get_item(item_id: int):
    # item_id is automatically converted to an int
    return {
        "item_id": item_id,
        "name": f"Item #{item_id}",
        "in_stock": True
    }`,
            },
            info: "If a user visits `/items/foo`, FastAPI immediately returns an HTTP 422 Unprocessable Entity error explaining that `item_id` must be an integer.",
          },
          {
            heading: "Query Parameters for Filtering & Pagination",
            body: "Any function argument that is not part of the path is automatically treated as a query parameter:",
            code: {
              language: "python",
              code: `@app.get("/items")
def list_items(skip: int = 0, limit: int = 10, search: str | None = None):
    return {
        "skip": skip,
        "limit": limit,
        "search": search,
        "results": []
    }`,
            },
          },
        ],
      },
      "step-4-docs": {
        id: "step-4-docs",
        title: "Step 4: Interactive API Docs (Swagger UI)",
        timing: "~5 min",
        description: "FastAPI generates live, interactive documentation directly from your code.",
        subsections: [
          {
            heading: "Accessing Interactive Documentation",
            points: [
              "Swagger UI: Open http://localhost:8000/docs in your browser.",
              "ReDoc UI: Open http://localhost:8000/redoc for clean, human-readable API specs.",
              "OpenAPI JSON: Open http://localhost:8000/openapi.json for raw schema data.",
            ],
            info: "You can click 'Try it out' in Swagger UI to execute real HTTP requests and inspect the status codes and response headers without leaving your browser!",
          },
        ],
      },
      "key-takeaways": {
        id: "key-takeaways",
        title: "Key Takeaways & Checklist",
        description: "Review what you have learned and verify your progress:",
        checklist: [
          "Python virtual environment initialized and activated.",
          "FastAPI and Uvicorn installed.",
          "Root endpoint `GET /` returning valid JSON.",
          "Dynamic path parameter with `int` type validation verified.",
          "Query parameters with optional default values tested.",
          "Swagger UI tested at `http://localhost:8000/docs`.",
        ],
        infoBox: "Congratulations! You have completed the FastAPI Quickstart tutorial. Continue to 'Building REST APIs with Python' to learn Pydantic request models, status codes, and full CRUD architecture.",
      },
    },
  },

  "building-rest-apis-python": {
    slug: "building-rest-apis-python",
    title: "Building REST APIs with Python",
    description:
      "Design clean RESTful architectures, implement CRUD operations, error handling, request validation with Pydantic, and API versioning.",
    level: "Intermediate",
    readTime: "20 min read",
    category: "Backend & APIs",
    tags: ["Python", "FastAPI", "REST", "Pydantic", "CRUD"],
    navigation: [
      {
        id: "building-rest-apis-python",
        title: "REST API Design",
        children: [
          { id: "learning-outcomes", title: "Learning Outcomes" },
          { id: "rest-principles", title: "RESTful Principles & Naming" },
          { id: "step-1-pydantic", title: "Step 1: Pydantic Data Models" },
          { id: "step-2-crud", title: "Step 2: Implementing Full CRUD" },
          { id: "step-3-errors", title: "Step 3: Error Handling & Status Codes" },
          { id: "step-4-testing", title: "Step 4: Testing Endpoints in Swagger" },
          { id: "key-takeaways", title: "Key Takeaways & Checklist" },
        ],
      },
    ],
    sections: {
      "learning-outcomes": {
        id: "learning-outcomes",
        title: "Building REST APIs with Python",
        description:
          "A practical guide to building professional RESTful web APIs using Python, FastAPI, and Pydantic schema validation.",
        subsections: [
          {
            heading: "Learning Outcomes",
            body: "In this tutorial, you will master:",
            points: [
              "Industry standard REST conventions: nouns, pluralization, and idempotent methods.",
              "Defining data schemas with Pydantic for input validation and output filtering.",
              "Building complete CRUD endpoints: Create, Read, Update, and Delete.",
              "Using appropriate HTTP status codes: 200, 201, 204, 400, 404, 422.",
              "Handling errors gracefully with HTTPException.",
            ],
          },
        ],
      },
      "rest-principles": {
        id: "rest-principles",
        title: "RESTful Principles & Resource Naming",
        timing: "~10 min",
        description: "REST (Representational State Transfer) is an architectural style based on standard HTTP semantics.",
        subsections: [
          {
            heading: "HTTP Methods & Resource Semantics",
            table: {
              headers: ["HTTP Method", "Path Example", "Purpose", "Success Code"],
              rows: [
                ["GET", "/products", "List all products or filter items", "200 OK"],
                ["POST", "/products", "Create a new product resource", "201 Created"],
                ["GET", "/products/{id}", "Retrieve single product details", "200 OK"],
                ["PUT", "/products/{id}", "Replace/update existing product", "200 OK"],
                ["DELETE", "/products/{id}", "Remove a product resource", "204 No Content"],
              ],
            },
            info: "Always use plural nouns for collections (`/products` instead of `/getProducts` or `/product`). HTTP methods specify the action, while URL paths identify the resource.",
          },
        ],
      },
      "step-1-pydantic": {
        id: "step-1-pydantic",
        title: "Step 1: Pydantic Data Models",
        timing: "~15 min",
        description: "Pydantic validates input data types, ensures constraints, and strips disallowed fields.",
        subsections: [
          {
            heading: "Defining Schemas",
            code: {
              language: "python",
              code: `from pydantic import BaseModel, Field

class ProductBase(BaseModel):
    name: str = Field(min_length=2, max_length=100, description="Product display name")
    category: str = Field(default="General")
    price: float = Field(gt=0, description="Price must be greater than zero")
    in_stock: bool = True

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: str | None = None
    price: float | None = None
    in_stock: bool | None = None

class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True`,
            },
            info: "Separating `ProductCreate` from `ProductResponse` guarantees that client requests cannot forge system-managed fields like `id` or `created_at`.",
          },
        ],
      },
      "step-2-crud": {
        id: "step-2-crud",
        title: "Step 2: Implementing Full CRUD",
        timing: "~20 min",
        description: "Let's implement the complete set of CRUD operations using an in-memory database dictionary.",
        subsections: [
          {
            heading: "Complete CRUD Implementation",
            code: {
              language: "python",
              code: `from fastapi import FastAPI, HTTPException, status
from typing import List

app = FastAPI(title="Products CRUD API")

db: dict[int, dict] = {}
counter = 1

@app.post("/products", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(payload: ProductCreate):
    global counter
    new_id = counter
    counter += 1
    item = payload.model_dump()
    item["id"] = new_id
    db[new_id] = item
    return item

@app.get("/products", response_model=List[ProductResponse])
def get_products(category: str | None = None):
    items = list(db.values())
    if category:
        return [i for i in items if i["category"].lower() == category.lower()]
    return items

@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int):
    if product_id not in db:
        raise HTTPException(status_code=404, detail="Product not found")
    return db[product_id]

@app.put("/products/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, payload: ProductUpdate):
    if product_id not in db:
        raise HTTPException(status_code=404, detail="Product not found")
    existing = db[product_id]
    updates = payload.model_dump(exclude_unset=True)
    existing.update(updates)
    return existing

@app.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int):
    if product_id not in db:
        raise HTTPException(status_code=404, detail="Product not found")
    del db[product_id]
    return None`,
            },
          },
        ],
      },
      "step-3-errors": {
        id: "step-3-errors",
        title: "Step 3: Error Handling & Status Codes",
        timing: "~10 min",
        description: "Accurate HTTP status codes allow frontend applications to respond predictably.",
        subsections: [
          {
            heading: "HTTP Status Code Rules",
            points: [
              "200 OK: Successful GET, PUT, or PATCH operations.",
              "201 Created: Successful POST creation; returns resource representation.",
              "204 No Content: Successful DELETE operation; returns no body.",
              "400 Bad Request: Business logic violation.",
              "404 Not Found: Requested resource identifier does not exist.",
              "422 Unprocessable Entity: Automatic schema validation failure generated by Pydantic.",
            ],
            info: "Always pass a descriptive message to `HTTPException(status_code=404, detail='...')` so client developers know exactly why the request failed.",
          },
        ],
      },
      "step-4-testing": {
        id: "step-4-testing",
        title: "Step 4: Testing Endpoints in Swagger",
        timing: "~10 min",
        description: "Verify the end-to-end CRUD lifecycle using Swagger UI.",
        subsections: [
          {
            heading: "Execution Checklist",
            points: [
              "POST /products: Send a JSON body with a product name and price. Expect status 201.",
              "GET /products: Ensure the created product appears in the list.",
              "GET /products/1: Inspect the single resource.",
              "DELETE /products/1: Verify status 204.",
              "GET /products/1: Verify that it now returns 404.",
            ],
          },
        ],
      },
      "key-takeaways": {
        id: "key-takeaways",
        title: "Key Takeaways & Checklist",
        description: "Review your REST API understanding:",
        checklist: [
          "Plural noun conventions applied to all endpoint URLs.",
          "Pydantic schemas used for both payload validation and response filtering.",
          "POST endpoint configured with status 201.",
          "DELETE endpoint configured with status 204.",
          "HTTPException properly configured for missing IDs (404).",
        ],
        infoBox: "Excellent work! You now understand the full cycle of building clean, robust REST APIs with Python.",
      },
    },
  },

  "nextjs-fundamentals": {
    slug: "nextjs-fundamentals",
    title: "Next.js Fundamentals",
    description:
      "Master Next.js App Router, understanding React Server Components, client interactivity, routing conventions, layouts, and server state.",
    level: "Intermediate",
    readTime: "18 min read",
    category: "Frontend & Full-Stack",
    tags: ["Next.js", "React", "TypeScript", "App Router", "SSR"],
    navigation: [
      {
        id: "nextjs-fundamentals",
        title: "Next.js App Router",
        children: [
          { id: "learning-outcomes", title: "Learning Outcomes" },
          { id: "app-router-overview", title: "App Router Architecture" },
          { id: "step-1-project-setup", title: "Step 1: Project Setup & Structure" },
          { id: "step-2-routing-layouts", title: "Step 2: Routing & Nested Layouts" },
          { id: "step-3-server-client", title: "Step 3: Server vs Client Components" },
          { id: "step-4-data-fetching", title: "Step 4: Data Fetching & Streaming" },
          { id: "key-takeaways", title: "Key Takeaways & Checklist" },
        ],
      },
    ],
    sections: {
      "learning-outcomes": {
        id: "learning-outcomes",
        title: "Next.js Fundamentals",
        description:
          "A deep dive into Next.js App Router, React Server Components, and modern full-stack web development with TypeScript.",
        subsections: [
          {
            heading: "Learning Outcomes",
            points: [
              "Understand file-system routing conventions (`page.tsx`, `layout.tsx`, `loading.tsx`).",
              "Differentiate between React Server Components (RSC) and Client Components (`'use client'`).",
              "Build shared layouts that preserve state across route changes.",
              "Fetch data directly inside async Server Components without client waterfalls.",
              "Use `<Link>` for intelligent background prefetching and instant transitions.",
            ],
          },
        ],
      },
      "app-router-overview": {
        id: "app-router-overview",
        title: "App Router Architecture",
        timing: "~10 min",
        description: "Next.js App Router is built on modern React 19 architecture featuring Server Components by default.",
        subsections: [
          {
            heading: "Special File Conventions",
            table: {
              headers: ["File", "Role"],
              rows: [
                ["page.tsx", "Unique UI for a route, making the path publicly accessible."],
                ["layout.tsx", "Shared UI across multiple routes. Preserves state and avoids re-rendering."],
                ["loading.tsx", "Instant loading UI rendered using React Suspense boundaries."],
                ["not-found.tsx", "UI displayed when `notFound()` is thrown."],
                ["error.tsx", "Error boundary UI for catching runtime rendering errors."],
              ],
            },
            info: "Every component inside the `app/` folder is a React Server Component by default, meaning zero JavaScript bundle footprint is sent to the client for purely static pages.",
          },
        ],
      },
      "step-1-project-setup": {
        id: "step-1-project-setup",
        title: "Step 1: Project Setup & Structure",
        timing: "~5 min",
        description: "Create a modern Next.js project with TypeScript and Tailwind CSS.",
        subsections: [
          {
            heading: "Creating a Next.js App",
            code: {
              language: "bash",
              code: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app\ncd my-app\nnpm run dev",
            },
          },
        ],
      },
      "step-2-routing-layouts": {
        id: "step-2-routing-layouts",
        title: "Step 2: Routing & Nested Layouts",
        timing: "~15 min",
        description: "Folders define routes, and `page.tsx` makes the route accessible.",
        subsections: [
          {
            heading: "Route Hierarchy",
            body: "Folder structure maps directly to URL paths:",
            code: {
              language: "text",
              code: `app/
├── layout.tsx         # Root layout (html, body, Navbar, Footer)
├── page.tsx           # Route: /
├── about/
│   └── page.tsx       # Route: /about
└── tutorial/
    ├── page.tsx       # Route: /tutorial
    └── [slug]/
        └── page.tsx   # Dynamic route: /tutorial/getting-started-with-fastapi`,
            },
          },
          {
            heading: "Root Layout Pattern",
            code: {
              language: "tsx",
              code: `export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white">
        <header className="border-b">/* Navigation */</header>
        <main className="flex-1">{children}</main>
        <footer className="border-t">/* Footer */</footer>
      </body>
    </html>
  );
}`,
            },
          },
        ],
      },
      "step-3-server-client": {
        id: "step-3-server-client",
        title: "Step 3: Server vs Client Components",
        timing: "~15 min",
        description: "Learn when to run code on the server and when to opt-in to client interactivity.",
        subsections: [
          {
            heading: "When to use which?",
            table: {
              headers: ["Requirement", "Server Component", "Client Component (`'use client'`)"],
              rows: [
                ["Fetch data directly from DB/API", "Yes (Preferred)", "No"],
                ["Access backend secrets/tokens", "Yes", "No"],
                ["Listen to onClick, onChange", "No", "Yes"],
                ["Use useState, useEffect, useRef", "No", "Yes"],
                ["Use browser APIs (localStorage)", "No", "Yes"],
              ],
            },
            info: "Rule of thumb: keep components as Server Components by default. Only add `'use client'` at the leaves of your component tree where user interaction is needed.",
          },
        ],
      },
      "step-4-data-fetching": {
        id: "step-4-data-fetching",
        title: "Step 4: Data Fetching & Streaming",
        timing: "~10 min",
        description: "In Next.js, Server Components can directly use `async / await` to fetch data.",
        subsections: [
          {
            heading: "Async Server Component Example",
            code: {
              language: "tsx",
              code: `// This runs entirely on the server!
export default async function ProjectsList() {
  const response = await fetch("https://api.example.com/projects", {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  const projects = await response.json();

  return (
    <div className="grid gap-4">
      {projects.map((project: { id: string; title: string }) => (
        <article key={project.id} className="p-4 border rounded">
          <h2>{project.title}</h2>
        </article>
      ))}
    </div>
  );
}`,
            },
          },
        ],
      },
      "key-takeaways": {
        id: "key-takeaways",
        title: "Key Takeaways & Checklist",
        description: "Summary of modern Next.js core concepts:",
        checklist: [
          "App Router folder-based routing structure mastered.",
          "Root and nested layouts configured without unnecessary re-renders.",
          "Clear boundary established between Server and Client Components.",
          "Async server component data fetching implemented.",
          "Client-side navigation optimized using `<Link>` component.",
        ],
        infoBox: "You have completed Next.js Fundamentals! You are ready to build production-grade web applications.",
      },
    },
  },

  "typescript-for-beginners": {
    slug: "typescript-for-beginners",
    title: "TypeScript for Beginners",
    description:
      "A practical guide to TypeScript core concepts: types, interfaces, generics, union types, and strict mode in real-world frontend and backend apps.",
    level: "Beginner",
    readTime: "12 min read",
    category: "Languages",
    tags: ["TypeScript", "JavaScript", "Typing"],
    navigation: [
      {
        id: "typescript-for-beginners",
        title: "TypeScript Guide",
        children: [
          { id: "learning-outcomes", title: "Learning Outcomes" },
          { id: "why-typescript", title: "Why TypeScript?" },
          { id: "types-vs-interfaces", title: "Types vs Interfaces" },
          { id: "generics-basics", title: "Generics Fundamentals" },
          { id: "key-takeaways", title: "Key Takeaways & Checklist" },
        ],
      },
    ],
    sections: {
      "learning-outcomes": {
        id: "learning-outcomes",
        title: "TypeScript for Beginners",
        description: "Learn how static typing prevents runtime bugs and enhances IDE developer experience.",
        subsections: [
          {
            heading: "Learning Outcomes",
            points: [
              "Understand primitive types, object types, and union types.",
              "Write clear interfaces and types for React components and API payloads.",
              "Use generics to create reusable and type-safe functions.",
              "Configure `tsconfig.json` with strict mode enabled.",
            ],
          },
        ],
      },
      "why-typescript": {
        id: "why-typescript",
        title: "Why TypeScript?",
        timing: "~10 min",
        description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
        subsections: [
          {
            heading: "Eliminating Common Bugs",
            body: "TypeScript catches typos and undefined errors before your code ever runs in production.",
            code: {
              language: "typescript",
              code: `interface User {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "member";
}

function sendWelcomeEmail(user: User): string {
  return \`Welcome \${user.name} (\${user.email})!\`;
}`,
            },
          },
        ],
      },
      "types-vs-interfaces": {
        id: "types-vs-interfaces",
        title: "Types vs Interfaces",
        timing: "~10 min",
        description: "Understanding when to use `interface` and when to use `type`.",
        subsections: [
          {
            heading: "Interface vs Type Alias",
            code: {
              language: "typescript",
              code: `// Interfaces are great for object shapes and can be extended
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Type aliases are ideal for unions, primitives, and tuples
type Status = "idle" | "loading" | "success" | "error";`,
            },
          },
        ],
      },
      "generics-basics": {
        id: "generics-basics",
        title: "Generics Fundamentals",
        timing: "~10 min",
        description: "Generics enable creating reusable components and utility functions.",
        subsections: [
          {
            heading: "Generic API Response Example",
            code: {
              language: "typescript",
              code: `interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: string;
}

interface Post {
  id: number;
  title: string;
}

const response: ApiResponse<Post[]> = {
  data: [{ id: 1, title: "Hello World" }],
  status: 200,
  timestamp: "2026-09-20T14:00:00Z"
};`,
            },
          },
        ],
      },
      "key-takeaways": {
        id: "key-takeaways",
        title: "Key Takeaways & Checklist",
        checklist: [
          "Primitive and complex types understood.",
          "Interface inheritance implemented.",
          "Union types used for state definitions.",
          "Generics applied to reusable data models.",
        ],
      },
    },
  },

  "database-design-with-postgresql": {
    slug: "database-design-with-postgresql",
    title: "Database Design with PostgreSQL",
    description:
      "Relational schema design, normalization, indexing strategies, writing performant SQL queries, and managing schema migrations.",
    level: "Intermediate",
    readTime: "22 min read",
    category: "Databases",
    tags: ["PostgreSQL", "SQL", "Database Design", "Prisma"],
    navigation: [
      {
        id: "database-design-with-postgresql",
        title: "PostgreSQL Guide",
        children: [
          { id: "learning-outcomes", title: "Learning Outcomes" },
          { id: "relational-modeling", title: "Relational Modeling & Keys" },
          { id: "normalization", title: "Database Normalization (1NF, 2NF, 3NF)" },
          { id: "indexes-performance", title: "Indexes & Query Performance" },
          { id: "key-takeaways", title: "Key Takeaways & Checklist" },
        ],
      },
    ],
    sections: {
      "learning-outcomes": {
        id: "learning-outcomes",
        title: "Database Design with PostgreSQL",
        description: "Design efficient relational database schemas built for durability and scale.",
        subsections: [
          {
            heading: "Learning Outcomes",
            points: [
              "Primary keys, foreign keys, and referential integrity.",
              "Applying 1NF, 2NF, and 3NF normalization rules.",
              "B-tree and GIN indexing strategies for query performance.",
              "Writing clean SQL DDL statements and migration scripts.",
            ],
          },
        ],
      },
      "relational-modeling": {
        id: "relational-modeling",
        title: "Relational Modeling & Keys",
        timing: "~15 min",
        description: "How tables relate to each other through primary and foreign keys.",
        subsections: [
          {
            heading: "DDL Schema Example",
            code: {
              language: "sql",
              code: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
            },
          },
        ],
      },
      normalization: {
        id: "normalization",
        title: "Database Normalization",
        timing: "~15 min",
        description: "Minimizing data redundancy and avoiding update anomalies.",
        subsections: [
          {
            heading: "Normal Forms Explained",
            points: [
              "1NF (First Normal Form): Eliminate duplicate columns and ensure atomic column values.",
              "2NF (Second Normal Form): All non-key attributes fully depend on the primary key.",
              "3NF (Third Normal Form): Eliminate transitive dependencies between non-key attributes.",
            ],
          },
        ],
      },
      "indexes-performance": {
        id: "indexes-performance",
        title: "Indexes & Query Performance",
        timing: "~10 min",
        description: "Speeding up SELECT queries with targeted indexes.",
        subsections: [
          {
            heading: "Creating Indexes",
            code: {
              language: "sql",
              code: `CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);`,
            },
            info: "Always index columns frequently used in WHERE, JOIN, and ORDER BY clauses.",
          },
        ],
      },
      "key-takeaways": {
        id: "key-takeaways",
        title: "Key Takeaways & Checklist",
        checklist: [
          "Primary and foreign key constraints established.",
          "Tables normalized up to 3NF.",
          "Foreign keys indexed for JOIN efficiency.",
          "Indexes benchmarked with EXPLAIN ANALYZE.",
        ],
      },
    },
  },

  "deployment-best-practices": {
    slug: "deployment-best-practices",
    title: "Deployment Best Practices",
    description:
      "Production deployment workflows, environment configuration, containerization with Docker, CI/CD pipelines, and cloud hosting.",
    level: "Advanced",
    readTime: "25 min read",
    category: "DevOps & Cloud",
    tags: ["DevOps", "Docker", "CI/CD", "Production"],
    navigation: [
      {
        id: "deployment-best-practices",
        title: "Deployment Guide",
        children: [
          { id: "learning-outcomes", title: "Learning Outcomes" },
          { id: "docker-containerization", title: "Docker Containerization" },
          { id: "environment-configs", title: "Environment Secrets Management" },
          { id: "cicd-pipelines", title: "CI/CD Automation" },
          { id: "key-takeaways", title: "Key Takeaways & Checklist" },
        ],
      },
    ],
    sections: {
      "learning-outcomes": {
        id: "learning-outcomes",
        title: "Deployment Best Practices",
        description: "Deploy and manage reliable, scalable production web applications.",
        subsections: [
          {
            heading: "Learning Outcomes",
            points: [
              "Containerize frontend and backend services using multi-stage Dockerfiles.",
              "Manage secrets and environment variables safely without hardcoding.",
              "Automate build and test pipelines with GitHub Actions.",
              "Implement health checks, logging, and zero-downtime deployments.",
            ],
          },
        ],
      },
      "docker-containerization": {
        id: "docker-containerization",
        title: "Docker Containerization",
        timing: "~15 min",
        description: "Packaging applications with their exact dependencies.",
        subsections: [
          {
            heading: "Multi-Stage Dockerfile Example",
            code: {
              language: "dockerfile",
              code: `FROM python:3.12-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
            },
          },
        ],
      },
      "environment-configs": {
        id: "environment-configs",
        title: "Environment Secrets Management",
        timing: "~10 min",
        description: "Follow the 12-Factor App methodology for configuration.",
        subsections: [
          {
            heading: "Best Practices",
            points: [
              "Never commit `.env` files with production credentials to Git.",
              "Use `.env.example` to document required variable keys.",
              "Inject secrets securely through CI/CD runners or cloud platform secrets managers.",
            ],
          },
        ],
      },
      "cicd-pipelines": {
        id: "cicd-pipelines",
        title: "CI/CD Automation",
        timing: "~15 min",
        description: "Automate code testing and production deployments on every push.",
        subsections: [
          {
            heading: "GitHub Actions Workflow Sample",
            code: {
              language: "yaml",
              code: `name: CI/CD Pipeline
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests
        run: |
          python -m pytest`,
            },
          },
        ],
      },
      "key-takeaways": {
        id: "key-takeaways",
        title: "Key Takeaways & Checklist",
        checklist: [
          "Multi-stage Docker builds configured.",
          "Environment secrets isolated from source control.",
          "Automated tests passing in CI before merge.",
          "Health checks configured on production endpoints.",
        ],
      },
    },
  },
};

tutorialsData["building-rest-apis-with-python"] = {
  ...tutorialsData["building-rest-apis-python"],
  slug: "building-rest-apis-with-python",
};

export function getAllTutorials(): Tutorial[] {
  // Return unique tutorials (excluding aliases)
  const uniqueSlugs = [
    "getting-started-with-fastapi",
    "building-rest-apis-python",
    "nextjs-fundamentals",
    "typescript-for-beginners",
    "database-design-with-postgresql",
    "deployment-best-practices",
  ];
  return uniqueSlugs.map((slug) => tutorialsData[slug]).filter(Boolean);
}

export function getTutorialBySlug(slug: string): Tutorial | null {
  return tutorialsData[slug] ?? null;
}

export function getAllTutorialSlugs(): string[] {
  return Object.keys(tutorialsData);
}
