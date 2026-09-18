import { useState } from 'react';
import { Menu, X, Search, FileText, ChevronRight, ChevronDown, ArrowLeft, Info } from 'lucide-react';

interface NavItem {
  id: string;
  title: string;
  children?: NavItem[];
}

interface DocumentationPageProps {
  topicId: string;
  onBackToTopics: () => void;
}

const navigationByTopic: Record<string, NavItem[]> = {
  'session-1': [
    {
      id: 'session-1',
      title: 'Session 1',
      children: [
        { id: 'learning-outcomes', title: 'Learning Outcomes' },
        { id: 'course-overview', title: 'Course Overview' },
        { id: 'web-framework-architecture', title: 'Web Framework Architecture' },
        { id: 'development-environment', title: 'Development Environment' },
        { id: 'verify-installation', title: 'Verify Your Installation' },
        { id: 'first-fastapi-app', title: 'Run Your FastAPI Application' },
        { id: 'first-nextjs-app', title: 'Run Your Next.js Application' },
        { id: 'session-checklist', title: 'Session Checklist' },
        { id: 'homework', title: 'Homework' },
      ]
    },
  ],
'session-2': [
        {
          id: 'session-2',
          title: 'Session 2',
          children: [
            { id: 'learning-outcomes', title: 'Learning Outcomes' },
            { id: 'fastapi-intro', title: 'What is FastAPI?' },
            { id: 'installation-setup', title: 'Installation & Setup' },
            { id: 'basic-routing', title: 'Basic Routing' },
            { id: 'path-parameters', title: 'Path Parameters' },
            { id: 'query-parameters', title: 'Query Parameters' },
            { id: 'api-documentation', title: 'API Documentation (Swagger UI)' },
            { id: 'hands-on-exercise', title: 'Hands-on Exercise: Book API' },
            { id: 'session-checklist', title: 'Session Checklist' },
            { id: 'homework', title: 'Homework' },
            { id: 'qa-wrapup', title: 'Q&A & Wrap-up' },
          ]
        },
      ],
      'session-3': [
        {
          id: 'session-3',
          title: 'Session 3',
          children: [
            { id: 'learning-outcomes', title: 'Learning Outcomes' },
            { id: 'restful-design', title: 'RESTful API Design Principles' },
            { id: 'request-body-validation', title: 'Request Body & Pydantic Models' },
            { id: 'status-codes', title: 'HTTP Status Codes' },
            { id: 'response-models', title: 'Response Models' },
            { id: 'crud-endpoints', title: 'Building CRUD Endpoints' },
            { id: 'crud-exercise', title: 'Hands-on Exercise: Full CRUD API' },
            { id: 'session-checklist', title: 'Session Checklist' },
            { id: 'homework', title: 'Homework' },
            { id: 'qa-wrapup', title: 'Q&A & Wrap-up' },
          ]
        },
      ],
};

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-6">
    <div className="flex items-start gap-3">
      <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
      <div className="text-blue-900 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

const CodeBlock = ({ language, code }: { language: string; code: string }) => (
  <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
    <div className="bg-gray-800 text-gray-400 text-xs px-4 py-2 font-mono">{language}</div>
    <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
      <code>{code}</code>
    </pre>
  </div>
);

const TextBlock = ({ text }: { text: string }) => (
  <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
    <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
      <code>{text}</code>
    </pre>
  </div>
);

const ChecklistItem = ({ label }: { label: string }) => (
  <label className="flex items-center gap-3 py-2 cursor-pointer group">
    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
    <span className="text-gray-700 group-hover:text-black transition-colors">{label}</span>
  </label>
);

export default function DocumentationPage({ topicId, onBackToTopics }: DocumentationPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([topicId]));
  const [activeSection, setActiveSection] = useState('learning-outcomes');
  const [searchQuery, setSearchQuery] = useState('');

  const sessionTitle =
    topicId === 'session-2' ? 'Session 2' : topicId === 'session-3' ? 'Session 3' : 'Session 1';
  const navigationData = navigationByTopic[topicId] ?? navigationByTopic['session-1'];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleNavClick = (itemId: string) => {
    setActiveSection(itemId);
    setSidebarOpen(false);
  };

  const getDocumentContent = (sectionId: string) => {
    const contentKey = `${topicId}:${sectionId}`;
    const contentMap: Record<string, React.ReactNode> = {
      'session-1:learning-outcomes': (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-black">Session 1 — Introduction &amp; Environment Setup</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Learn how modern web applications are structured and prepare a complete development environment using <strong>FastAPI</strong> for the backend and <strong>Next.js</strong> for the frontend.
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-black mt-8">Learning Outcomes</h2>
          <p className="text-gray-600 leading-relaxed">By the end of this session, students will be able to:</p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Explain the role of frontend, backend, and database in a web application.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Install the required software for the course.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Create and run a basic FastAPI project.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Create and run a basic Next.js project.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Access FastAPI interactive API documentation.</li>
          </ul>
        </div>
      ),

      'session-1:course-overview': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Course Overview</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            This course focuses on building <strong>real-world full-stack web applications</strong>.
          </p>

          <h3 className="text-xl font-semibold text-black mt-6">Technology Stack</h3>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Layer</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Technology</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm text-gray-700">Frontend</td><td className="px-4 py-3 text-sm text-gray-700">Next.js + React + TypeScript + Tailwind CSS</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-700">Backend</td><td className="px-4 py-3 text-sm text-gray-700">FastAPI + Python</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-700">Database</td><td className="px-4 py-3 text-sm text-gray-700">PostgreSQL</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-700">Version Control</td><td className="px-4 py-3 text-sm text-gray-700">Git + GitHub</td></tr>
              </tbody>
            </table>
          </div>

          <InfoBox>
            Throughout the semester, students will build an <strong>some useful Proposed Web Application System</strong> by combining these technologies.
          </InfoBox>

          <h3 className="text-xl font-semibold text-black mt-6">Grading</h3>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Component</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Weight (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm text-gray-700">Attendance &amp; Participation</td><td className="px-4 py-3 text-sm text-gray-700">10%</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-700">Weekly Assignments</td><td className="px-4 py-3 text-sm text-gray-700">20%</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-700">Midterm Project</td><td className="px-4 py-3 text-sm text-gray-700">30%</td></tr>
                <tr><td className="px-4 py-3 text-sm text-gray-700">Final Project</td><td className="px-4 py-3 text-sm text-gray-700">40%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ),

      'session-1:web-framework-architecture': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Web Framework Architecture</h2>
          <h3 className="text-xl font-semibold text-black mt-6">How Full-Stack Applications Work</h3>

          <div className="my-8 flex justify-center">
            <svg viewBox="0 0 500 320" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
              {/* Next.js box */}
              <rect x="150" y="20" width="200" height="60" rx="8" fill="#111827" />
              <text x="250" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="600" fontFamily="system-ui">Next.js (Frontend)</text>

              {/* Arrow 1 */}
              <line x1="250" y1="80" x2="250" y2="120" stroke="#3B82F6" strokeWidth="2" />
              <polygon points="250,128 244,118 256,118" fill="#3B82F6" />
              <text x="310" y="108" fill="#6B7280" fontSize="11" fontFamily="system-ui">HTTP / JSON</text>

              {/* FastAPI box */}
              <rect x="150" y="130" width="200" height="60" rx="8" fill="#2563EB" />
              <text x="250" y="165" textAnchor="middle" fill="white" fontSize="14" fontWeight="600" fontFamily="system-ui">FastAPI (Backend)</text>

              {/* Arrow 2 */}
              <line x1="250" y1="190" x2="250" y2="230" stroke="#3B82F6" strokeWidth="2" />
              <polygon points="250,238 244,228 256,228" fill="#3B82F6" />
              <text x="310" y="218" fill="#6B7280" fontSize="11" fontFamily="system-ui">SQLAlchemy</text>

              {/* PostgreSQL box */}
              <rect x="150" y="240" width="200" height="60" rx="8" fill="#1E40AF" />
              <text x="250" y="275" textAnchor="middle" fill="white" fontSize="14" fontWeight="600" fontFamily="system-ui">PostgreSQL (Database)</text>
            </svg>
          </div>

          <ol className="space-y-3 text-gray-700 ml-4 list-decimal list-inside">
            <li>Next.js renders the user interface in the browser.</li>
            <li>The frontend sends HTTP requests to FastAPI.</li>
            <li>FastAPI processes business logic and communicates with PostgreSQL.</li>
            <li>Responses are returned as JSON and displayed in the frontend.</li>
          </ol>
        </div>
      ),

      'session-1:development-environment': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Development Environment</h2>
          <h3 className="text-xl font-semibold text-black mt-6">Software Required</h3>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Software</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">Operating System</td><td className="px-4 py-3 text-sm text-gray-700">Preferably Linux (Debian or MX Linux). Windows and macOS are also supported.</td></tr>
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">Python 3.12+</td><td className="px-4 py-3 text-sm text-gray-700">Backend development with FastAPI.</td></tr>
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">Node.js LTS</td><td className="px-4 py-3 text-sm text-gray-700">Frontend development with Next.js.</td></tr>
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">Visual Studio Code</td><td className="px-4 py-3 text-sm text-gray-700">Code editor for the course.</td></tr>
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">Git</td><td className="px-4 py-3 text-sm text-gray-700">Version control.</td></tr>
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">PostgreSQL</td><td className="px-4 py-3 text-sm text-gray-700">Database server.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ),

      'session-1:verify-installation': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Verify Your Installation</h2>
          <CodeBlock language="bash" code={`python --version
node --version
npm --version
git --version`} />
          <InfoBox>
            The commands above should display version numbers without errors. If any command is not recognized, fix the installation before continuing.
          </InfoBox>
        </div>
      ),

      'session-1:first-fastapi-app': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Run FastAPI Application</h2>
          <p className="text-gray-600 leading-relaxed">Your project structure should look like this:</p>
          <TextBlock text={`backend/
├── app/
│   └── main.py
├── requirements.txt
└── venv/`} />
          <p className="text-gray-600 leading-relaxed">Start the development server:</p>
          <CodeBlock language="bash" code="uvicorn app.main:app --reload" />
          <p className="text-gray-600 leading-relaxed">Then open:</p>
          <TextBlock text="http://localhost:8000/docs" />
          <InfoBox>
            Open the URL above in your browser. FastAPI automatically generates interactive API documentation using Swagger UI.
          </InfoBox>
        </div>
      ),
      
      'session-1:first-nextjs-app': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Run Your First Next.js Application</h2>
          <p className="text-gray-600 leading-relaxed">Your project structure should look like this:</p>
          <TextBlock text={`frontend/
├── app/
├── components/
├── public/
└── package.json`} />
          <p className="text-gray-600 leading-relaxed">Install dependencies and start the server:</p>
          <CodeBlock language="bash" code={`npm install
npm run dev`} />
          <p className="text-gray-600 leading-relaxed">Then open:</p>
          <TextBlock text="http://localhost:3000" />
          <InfoBox>
            You should see the default Next.js welcome page running locally.
          </InfoBox>
        </div>
      ),

      'session-1:session-checklist': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Session Checklist</h2>
          <div className="space-y-1 divide-y divide-gray-100">
            <ChecklistItem label="Python installed." />
            <ChecklistItem label="Node.js installed." />
            <ChecklistItem label="Git installed." />
            <ChecklistItem label="PostgreSQL installed." />
            <ChecklistItem label="VS Code configured." />
            <ChecklistItem label="FastAPI server running." />
            <ChecklistItem label="Swagger UI accessible." />
            <ChecklistItem label="Next.js server running." />
          </div>
        </div>
      ),

      'session-1:homework': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Homework</h2>
          <h3 className="text-xl font-semibold text-black mt-4">Deliverables</h3>
          <p className="text-gray-600 leading-relaxed">Students must:</p>
          <ol className="space-y-3 text-gray-700 ml-4 list-decimal list-inside">
            <li>Create a GitHub repository named <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">web-framework-2026</code>.</li>
            <li>
              Create two folders:
              <ul className="ml-6 mt-1 space-y-1 list-disc list-inside text-gray-600">
                <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">backend</code></li>
                <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">frontend</code></li>
              </ul>
            </li>
            <li>Push the initial project structure.</li>
            <li>
              Submit screenshots of:
              <ul className="ml-6 mt-1 space-y-1 list-disc list-inside text-gray-600">
                <li>FastAPI Swagger UI (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">localhost:8000/docs</code>)</li>
                <li>Next.js running (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">localhost:3000</code>)</li>
                <li>Terminal showing Python, Node.js, npm, and Git versions</li>
              </ul>
            </li>
          </ol>
        </div>
      ),

      'session-2:learning-outcomes': (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-black">Session 2 — FastAPI Fundamentals</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Build a working REST API with <strong>FastAPI</strong> in 2 hours. Learn routing, path parameters, query parameters, and interactive API documentation.
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-black mt-8">Learning Outcomes</h2>
          <p className="text-gray-600 leading-relaxed">By the end of this session, students will be able to:</p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Set up a FastAPI project with virtual environment and dependencies.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Create API endpoints using GET, POST, PUT, and DELETE methods.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Use path parameters to capture dynamic values from URLs.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Use query parameters to filter, paginate, and customize responses.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Combine path and query parameters in a single endpoint.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Navigate and test APIs using Swagger UI documentation.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Build a simple Book API with multiple endpoints during the hands-on exercise.</li>
          </ul>

          <InfoBox>
            <strong>Time allocation:</strong> This session is designed for exactly 2 hours. Each section includes estimated timing to help you stay on track.
          </InfoBox>
        </div>
      ),

      'session-2:fastapi-intro': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">What is FastAPI? <span className="text-base font-normal text-gray-400">(~10 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>FastAPI</strong> is a modern, high-performance Python web framework for building APIs. It is built on <strong>Starlette</strong> (web handling) and <strong>Pydantic</strong> (data validation).
          </p>

          <h3 className="text-xl font-semibold text-black mt-6">Why FastAPI?</h3>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Feature</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">Performance</td><td className="px-4 py-3 text-sm text-gray-700">On par with Node.js and Go</td></tr>
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">Automatic docs</td><td className="px-4 py-3 text-sm text-gray-700">Interactive API docs at <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">/docs</code></td></tr>
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">Type hints</td><td className="px-4 py-3 text-sm text-gray-700">Automatic validation and serialization</td></tr>
                <tr><td className="px-4 py-3 text-sm font-medium text-gray-900">Standards-based</td><td className="px-4 py-3 text-sm text-gray-700">OpenAPI and JSON Schema compatible</td></tr>
              </tbody>
            </table>
          </div>

          <InfoBox>
            FastAPI generates API documentation automatically from your code. This means your docs are <strong>always up to date</strong> — a major productivity advantage.
          </InfoBox>
        </div>
      ),

      'session-2:installation-setup': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Installation &amp; Setup <span className="text-base font-normal text-gray-400">(~15 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">Create a virtual environment and install FastAPI with the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">uvicorn</code> development server.</p>
          <CodeBlock language="bash" code={`python -m venv venv
source venv/bin/activate
pip install fastapi "uvicorn[standard]"`} />
          <p className="text-gray-600 leading-relaxed">Your project structure:</p>
          <TextBlock text={`backend/
├── app/
│   └── main.py
├── requirements.txt
└── venv/`} />
          <p className="text-gray-600 leading-relaxed">Create <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">app/main.py</code> with a minimal endpoint:</p>
          <CodeBlock language="python" code={`from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}`} />
          <p className="text-gray-600 leading-relaxed">Start the server from the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">backend</code> folder:</p>
          <CodeBlock language="bash" code="uvicorn app.main:app --reload" />
          <InfoBox>
            The <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">--reload</code> flag restarts the server automatically on code changes. On Windows, activate the venv with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">venv\\Scripts\\activate</code>.
          </InfoBox>
        </div>
      ),

      'session-2:basic-routing': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Basic Routing <span className="text-base font-normal text-gray-400">(~15 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">Routes map HTTP methods to URL paths. Use decorators like <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">@app.get()</code> to register handlers.</p>

          <h3 className="text-xl font-semibold text-black mt-6">Common HTTP Methods</h3>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Decorator</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">@app.get()</td><td className="px-4 py-3 text-sm text-gray-700">Retrieve resources</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">@app.post()</td><td className="px-4 py-3 text-sm text-gray-700">Create new resources</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">@app.put()</td><td className="px-4 py-3 text-sm text-gray-700">Update existing resources</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">@app.delete()</td><td className="px-4 py-3 text-sm text-gray-700">Remove resources</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 leading-relaxed">Multiple routes example:</p>
          <CodeBlock language="python" code={`from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/items")
def read_items():
    return [
        {"id": 1, "name": "Laptop"},
        {"id": 2, "name": "Phone"}
    ]

@app.post("/items")
def create_item():
    return {"status": "created"}`} />
          <InfoBox>
            Each decorator registers a <strong>route handler</strong>. FastAPI automatically generates documentation for every registered route.
          </InfoBox>
        </div>
      ),

      'session-2:path-parameters': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Path Parameters <span className="text-base font-normal text-gray-400">(~20 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            Path parameters capture dynamic values <strong>from the URL</strong>. Declare them with curly braces <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{"{param}"}</code> and receive them as function arguments.
          </p>
          <CodeBlock language="python" code={`@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "name": f"Item {item_id}"}`} />
          <p className="text-gray-600 leading-relaxed">Request <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /items/42</code> returns:</p>
          <TextBlock text='{"item_id": 42, "name": "Item 42"}' />

          <h3 className="text-xl font-semibold text-black mt-6">Automatic Validation</h3>
          <p className="text-gray-600 leading-relaxed">Type hints enforce validation automatically. <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /items/abc</code> returns a <strong>422 error</strong> because <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">abc</code> is not an integer.</p>

          <h3 className="text-xl font-semibold text-black mt-6">Path Order Matters</h3>
          <p className="text-gray-600 leading-relaxed">Static routes must come <strong>before</strong> dynamic ones:</p>
          <CodeBlock language="python" code={`@app.get("/items/me")
def read_current_user():
    return {"user": "current"}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}`} />
          <InfoBox>
            If <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/items/{"{item_id}"}</code> came first, a request to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/items/me</code> would match as <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">item_id=&apos;me&apos;</code> instead of reaching the static route.
          </InfoBox>

          <h3 className="text-xl font-semibold text-black mt-6">String Path Parameters</h3>
          <CodeBlock language="python" code={`@app.get("/products/{product_name}")
def read_product(product_name: str):
    return {"product": product_name}`} />
          <p className="text-gray-600 leading-relaxed">String params create readable URLs like <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/products/laptop</code>.</p>
        </div>
      ),

      'session-2:query-parameters': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Query Parameters <span className="text-base font-normal text-gray-400">(~20 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            Query parameters are key-value pairs after <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">?</code> in the URL (e.g., <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">?skip=0&amp;limit=10</code>). Any function parameter that is <strong>not</strong> a path parameter becomes a query parameter automatically.
          </p>

          <h3 className="text-xl font-semibold text-black mt-6">Optional with Defaults</h3>
          <CodeBlock language="python" code={`@app.get("/items")
def read_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}`} />
          <p className="text-gray-600 leading-relaxed"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /items</code> returns defaults. Override with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /items?skip=5&amp;limit=3</code>.</p>
          <TextBlock text='{"skip": 0, "limit": 10}' />

          <h3 className="text-xl font-semibold text-black mt-6">Required Query Parameters</h3>
          <p className="text-gray-600 leading-relaxed">Omit the default value to make a parameter <strong>required</strong>:</p>
          <CodeBlock language="python" code={`@app.get("/search")
def search(q: str):
    return {"query": q}`} />
          <p className="text-gray-600 leading-relaxed">A request to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /search</code> without <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">?q=</code> returns a 422 error.</p>

          <h3 className="text-xl font-semibold text-black mt-6">Combining Path + Query Parameters</h3>
          <CodeBlock language="python" code={`@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "query": q}`} />
          <p className="text-gray-600 leading-relaxed"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /items/42?q=test</code> returns:</p>
          <TextBlock text='{"item_id": 42, "query": "test"}' />
          <InfoBox>
            Path parameters identify <strong>which resource</strong> to access. Query parameters control <strong>how</strong> to return it (filtering, pagination, sorting).
          </InfoBox>
        </div>
      ),

      'session-2:api-documentation': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">API Documentation (Swagger UI) <span className="text-base font-normal text-gray-400">(~10 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            FastAPI generates <strong>interactive API documentation</strong> automatically. While the server is running, open:
          </p>
          <TextBlock text="http://localhost:8000/docs" />
          <p className="text-gray-600 leading-relaxed">You will see Swagger UI with all your endpoints listed. You can:</p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Click any endpoint to expand its details.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Click <strong>&quot;Try it out&quot;</strong> to send live requests directly from the browser.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> See request/response schemas auto-generated from your type hints.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> View required vs optional parameters at a glance.</li>
          </ul>

          <h3 className="text-xl font-semibold text-black mt-6">Alternative: ReDoc</h3>
          <p className="text-gray-600 leading-relaxed">FastAPI also provides a second documentation format at:</p>
          <TextBlock text="http://localhost:8000/redoc" />

          <InfoBox>
            Use Swagger UI during development to test endpoints quickly. It eliminates the need for external tools like Postman for basic API testing.
          </InfoBox>
        </div>
      ),

      'session-2:hands-on-exercise': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Hands-on Exercise: Book API <span className="text-base font-normal text-gray-400">(~25 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            Build a <strong>Book API</strong> with 3 endpoints. This exercise combines everything learned in this session: routing, path parameters, and query parameters.
          </p>

          <h3 className="text-xl font-semibold text-black mt-6">Requirements</h3>
          <p className="text-gray-600 leading-relaxed">Create the following endpoints in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">app/main.py</code>:</p>

          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Method</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Path</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Parameters</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">GET</td><td className="px-4 py-3 text-sm font-mono text-gray-700">/books</td><td className="px-4 py-3 text-sm text-gray-700">Query: <code>author</code>, <code>genre</code></td><td className="px-4 py-3 text-sm text-gray-700">List all books with optional filtering</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">GET</td><td className="px-4 py-3 text-sm font-mono text-gray-700">/books/{"{book_id}"}</td><td className="px-4 py-3 text-sm text-gray-700">Path: <code>book_id</code></td><td className="px-4 py-3 text-sm text-gray-700">Get a specific book by ID</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">GET</td><td className="px-4 py-3 text-sm font-mono text-gray-700">/books/{"{book_id}"}/summary</td><td className="px-4 py-3 text-sm text-gray-700">Path: <code>book_id</code>, Query: <code>max_length</code></td><td className="px-4 py-3 text-sm text-gray-700">Get a truncated book summary</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-black mt-6">Starter Code</h3>
          <p className="text-gray-600 leading-relaxed">Copy this into your <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">app/main.py</code> and complete the TODOs:</p>
          <CodeBlock language="python" code={`from fastapi import FastAPI

app = FastAPI()

# Sample data
books = [
    {"id": 1, "title": "The Python Handbook", "author": "Alice", "genre": "Programming",
     "summary": "A comprehensive guide to Python programming covering basics to advanced topics."},
    {"id": 2, "title": "Clean Code", "author": "Robert", "genre": "Programming",
     "summary": "A handbook of agile software craftsmanship and writing maintainable code."},
    {"id": 3, "title": "Dune", "author": "Frank", "genre": "Sci-Fi",
     "summary": "A science fiction epic about politics, religion, and ecology on a desert planet."},
    {"id": 4, "title": "1984", "author": "George", "genre": "Fiction",
     "summary": "A dystopian novel exploring themes of totalitarianism and surveillance."},
]

@app.get("/books")
def list_books(author: str | None = None, genre: str | None = None):
    """TODO: Filter books by author and/or genre if provided.
    Return the full list if no filters are given."""
    pass  # <-- Replace with your implementation

@app.get("/books/{book_id}")
def get_book(book_id: int):
    """TODO: Find and return the book with matching id.
    Return an error if not found."""
    pass  # <-- Replace with your implementation

@app.get("/books/{book_id}/summary")
def get_book_summary(book_id: int, max_length: int = 50):
    """TODO: Return the book's summary truncated to max_length characters.
    Return an error if the book is not found."""
    pass  # <-- Replace with your implementation`} />

          <h3 className="text-xl font-semibold text-black mt-6">Expected Behavior</h3>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /books</code> returns all 4 books.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /books?genre=Programming</code> returns only programming books.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /books/1</code> returns the first book.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /books/1/summary?max_length=20</code> returns a truncated summary.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /books/99</code> returns a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">404</code> error.</li>
          </ul>

          <InfoBox>
            Test all endpoints in Swagger UI at <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/docs</code> when you are done. Check that filtering, path parameters, and truncation all work correctly.
          </InfoBox>
        </div>
      ),

      'session-2:session-checklist': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Session Checklist</h2>
          <div className="space-y-1 divide-y divide-gray-100">
            <ChecklistItem label="Virtual environment created and activated." />
            <ChecklistItem label="FastAPI and uvicorn installed." />
            <ChecklistItem label="FastAPI server running with --reload." />
            <ChecklistItem label="GET endpoint returning JSON response." />
            <ChecklistItem label="Path parameter endpoint working with int validation." />
            <ChecklistItem label="Query parameter endpoint with filtering and defaults." />
            <ChecklistItem label="Combined path + query endpoint working." />
            <ChecklistItem label="Swagger UI accessible and all endpoints testable." />
            <ChecklistItem label="Book API exercise completed with 3 working endpoints." />
          </div>
        </div>
      ),

      'session-2:homework': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Homework</h2>
          <p className="text-gray-600 leading-relaxed">Test your understanding of FastAPI fundamentals with these 5 questions:</p>
          <ol className="space-y-3 text-gray-700 ml-4 list-decimal list-inside">
            <li>What is the difference between a path parameter and a query parameter in FastAPI? Give an example of each.</li>
            <li>Which command do you use to run a FastAPI application using uvicorn, and what does the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">--reload</code> flag do?</li>
            <li>If you want to retrieve a specific user by their ID, which HTTP method decorator (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">@app.get</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">@app.post</code>, etc.) should you use, and how would you define the path?</li>
            <li>How can you access the automatic interactive API documentation (Swagger UI) for your running FastAPI application?</li>
            <li>Why is it important to declare Python type hints for your path and query parameters in FastAPI?</li>
          </ol>
        </div>
      ),

      'session-2:qa-wrapup': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Q&amp;A &amp; Wrap-up <span className="text-base font-normal text-gray-400">(~5 min)</span></h2>

          <h3 className="text-xl font-semibold text-black mt-4">What We Covered Today</h3>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> FastAPI project setup with virtual environments.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Defining routes with HTTP method decorators.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Path parameters for dynamic URL segments with type validation.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Query parameters for filtering and pagination.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Using Swagger UI to test and document APIs.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Building a Book API with 3 endpoints.</li>
          </ul>

          <h3 className="text-xl font-semibold text-black mt-6">Coming Next: Session 3</h3>
          <p className="text-gray-600 leading-relaxed">
            In the next session, we will explore <strong>API design patterns</strong>: request body validation with Pydantic models, status codes, response models, and building full CRUD endpoints.
          </p>

          <InfoBox>
            If you have questions about any concepts from today, now is the time to ask! You can also review the Swagger UI documentation for your Book API to reinforce what you learned.
          </InfoBox>
        </div>
      ),

      'session-3:learning-outcomes': (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-black">Session 3 — API Design with FastAPI</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Turn your FastAPI knowledge into professionally designed REST APIs. Learn request body validation with <strong>Pydantic</strong>, HTTP status codes, response models, and complete <strong>CRUD</strong> endpoints.
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-black mt-8">Learning Outcomes</h2>
          <p className="text-gray-600 leading-relaxed">By the end of this session, students will be able to:</p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Design RESTful APIs following standard conventions (nouns, pluralization, resource hierarchy).</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Define and validate request bodies using Pydantic models.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Return meaningful HTTP status codes for success and error cases.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Shape API responses with FastAPI response models.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Build complete CRUD endpoints (Create, Read, Update, Delete) for a resource.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Combine Pydantic models, status codes, and response models into a coherent API.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Test full CRUD flows using Swagger UI.</li>
          </ul>

          <InfoBox>
            <strong>Prerequisite:</strong> This session builds directly on Session 2. You should be comfortable with FastAPI routing, path parameters, and query parameters before starting.
          </InfoBox>
        </div>
      ),

      'session-3:restful-design': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">RESTful API Design Principles <span className="text-base font-normal text-gray-400">(~20 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>REST</strong> (Representational State Transfer) is an architectural style that treats everything as a <strong>resource</strong> addressed by a URL and manipulated with standard HTTP methods.
          </p>

          <h3 className="text-xl font-semibold text-black mt-6">Core Principles</h3>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Use <strong>nouns</strong> (not verbs) for resource URLs: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/books</code>, not <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/getBooks</code>.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Use <strong>plural</strong> resource names for collections: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/books</code>.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Use <strong>HTTP methods</strong> to express intent — GET, POST, PUT, PATCH, DELETE.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Use <strong>sub-resources</strong> for hierarchical relationships: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/books/{"{book_id}"}/reviews</code>.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Return the appropriate <strong>status code</strong> for every response.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Keep endpoints <strong>stateless</strong> — each request contains everything needed to process it.</li>
          </ul>

          <h3 className="text-xl font-semibold text-black mt-6">Mapping Methods to Actions</h3>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Method</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Path</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">GET</td><td className="px-4 py-3 text-sm font-mono text-gray-700">/books</td><td className="px-4 py-3 text-sm text-gray-700">Read — list all books</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">GET</td><td className="px-4 py-3 text-sm font-mono text-gray-700">/books/{"{id}"}</td><td className="px-4 py-3 text-sm text-gray-700">Read — get one book</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">POST</td><td className="px-4 py-3 text-sm font-mono text-gray-700">/books</td><td className="px-4 py-3 text-sm text-gray-700">Create — add a book</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">PUT</td><td className="px-4 py-3 text-sm font-mono text-gray-700">/books/{"{id}"}</td><td className="px-4 py-3 text-sm text-gray-700">Update — replace a book</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">PATCH</td><td className="px-4 py-3 text-sm font-mono text-gray-700">/books/{"{id}"}</td><td className="px-4 py-3 text-sm text-gray-700">Update — partially update a book</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">DELETE</td><td className="px-4 py-3 text-sm font-mono text-gray-700">/books/{"{id}"}</td><td className="px-4 py-3 text-sm text-gray-700">Delete — remove a book</td></tr>
              </tbody>
            </table>
          </div>

          <InfoBox>
            A resource is identified by a URL, and the HTTP method says what to do with it. The same URL <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/books/{"{id}"}</code> means &quot;read, update or delete&quot; depending on the method used.
          </InfoBox>
        </div>
      ),

      'session-3:request-body-validation': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Request Body &amp; Pydantic Models <span className="text-base font-normal text-gray-400">(~25 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            For <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">POST</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">PUT</code>, and <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">PATCH</code> endpoints, clients send data in the <strong>request body</strong>. FastAPI uses <strong>Pydantic models</strong> to declare the expected shape and validate it automatically.
          </p>

          <h3 className="text-xl font-semibold text-black mt-6">Defining a Pydantic Model</h3>
          <CodeBlock language="python" code={`from pydantic import BaseModel

class BookCreate(BaseModel):
    title: str
    author: str
    genre: str
    summary: str | None = None
    price: float = 0.0`} />

          <h3 className="text-xl font-semibold text-black mt-6">Receiving the Body</h3>
          <CodeBlock language="python" code={`@app.post("/books")
def create_book(book: BookCreate):
    return {"title": book.title, "author": book.author}`} />

          <p className="text-gray-600 leading-relaxed">FastAPI will automatically:</p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <strong>Validate</strong> the incoming JSON against the model.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Return <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">422 Unprocessable Entity</code> with details if validation fails.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Convert the JSON payload into a typed <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">BookCreate</code> instance.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Show the schema in Swagger UI for easy testing.</li>
          </ul>

          <h3 className="text-xl font-semibold text-black mt-6">Field Validation</h3>
          <CodeBlock language="python" code={`from pydantic import BaseModel, Field

class BookCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    author: str = Field(min_length=1, max_length=120)
    price: float = Field(ge=0, le=9999.99)
    summary: str | None = Field(default=None, max_length=500)`} />

          <p className="text-gray-600 leading-relaxed"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">Field()</code> adds constraints like <strong>min/max length</strong> (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">min_length</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">max_length</code>) and <strong>numeric ranges</strong> (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">ge</code> = greater/equal, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">le</code> = less/equal). A rejected body returns an automatic 422 error listing every failing field.</p>

          <InfoBox>
            Pydantic models serve as a <strong>single source of truth</strong>: the same class validates input, documents the request body in Swagger UI, and can be reused as a response model.
          </InfoBox>
        </div>
      ),

      'session-3:status-codes': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">HTTP Status Codes <span className="text-base font-normal text-gray-400">(~15 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            Status codes tell the client what happened. Return the <strong>right one</strong> — this is a core part of good API design.
          </p>

          <h3 className="text-xl font-semibold text-black mt-6">The Codes You Need</h3>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Code</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">When to use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">200</td><td className="px-4 py-3 text-sm text-gray-700">OK</td><td className="px-4 py-3 text-sm text-gray-700">Successful GET (default)</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">201</td><td className="px-4 py-3 text-sm text-gray-700">Created</td><td className="px-4 py-3 text-sm text-gray-700">Successful POST that creates a resource</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">204</td><td className="px-4 py-3 text-sm text-gray-700">No Content</td><td className="px-4 py-3 text-sm text-gray-700">Successful DELETE — nothing to return</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">400</td><td className="px-4 py-3 text-sm text-gray-700">Bad Request</td><td className="px-4 py-3 text-sm text-gray-700">Malformed or invalid request</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">404</td><td className="px-4 py-3 text-sm text-gray-700">Not Found</td><td className="px-4 py-3 text-sm text-gray-700">Resource does not exist</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">422</td><td className="px-4 py-3 text-sm text-gray-700">Unprocessable Entity</td><td className="px-4 py-3 text-sm text-gray-700">Validation failed (automatic in FastAPI)</td></tr>
                <tr><td className="px-4 py-3 text-sm font-mono text-gray-700">500</td><td className="px-4 py-3 text-sm text-gray-700">Internal Server Error</td><td className="px-4 py-3 text-sm text-gray-700">Unexpected server error (default)</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-black mt-6">Returning Custom Codes</h3>
          <p className="text-gray-600 leading-relaxed">Use the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">status_code</code> decorator argument or the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">status</code> module:</p>
          <CodeBlock language="python" code={`from fastapi import FastAPI, status, HTTPException

@app.post("/books", status_code=status.HTTP_201_CREATED)
def create_book(book: BookCreate):
    return {"id": 99, **book.model_dump()}

@app.get("/books/{book_id}")
def get_book(book_id: int):
    book = DB.get(book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book`} />

          <p className="text-gray-600 leading-relaxed"><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">HTTPException</code> stops execution and returns the given status code with a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">detail</code> message.</p>

          <InfoBox>
            Use <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">201</code> for creation instead of the default <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">200</code>. Small details like this make your API feel professional.
          </InfoBox>
        </div>
      ),

      'session-3:response-models': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Response Models <span className="text-base font-normal text-gray-400">(~15 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>Response models</strong> shape what your API returns — filtering out internal fields and guaranteeing a stable contract. Declare them with the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">response_model</code> parameter.
          </p>

          <CodeBlock language="python" code={`from pydantic import BaseModel

class Book(BaseModel):
    id: int
    title: str
    author: str
    genre: str
    summary: str | None = None

class BookOut(Book):
    price: float = 0.0

@app.get("/books", response_model=list[BookOut])
def list_books():
    # Internal objects may have more fields; they are filtered out
    return get_all_books()`} />

          <h3 className="text-xl font-semibold text-black mt-6">Why Use Response Models?</h3>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <strong>Filter sensitive fields</strong> (passwords, internal IDs) from responses.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <strong>Document</strong> the exact response schema in Swagger UI.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Convert ORM/dict data into a clean, typed structure automatically.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Enforce <strong>optionality</strong> — fields omitted from the model are dropped from the output.</li>
          </ul>

          <h3 className="text-xl font-semibold text-black mt-6">The Create vs. Output Pattern</h3>
          <CodeBlock language="python" code={`class BookCreate(BaseModel):   # input — client defines these
    title: str
    author: str
    genre: str
    summary: str | None = None

class BookOut(BaseModel):     # output — the API returns these
    id: int
    title: str
    author: str
    genre: str
    summary: str | None = None

# FastAPI fills in id, and only returns the BookOut fields
@app.post("/books", status_code=201, response_model=BookOut)
def create_book(book: BookCreate):
    book_id = db.insert(book)
    return {"id": book_id, **book.model_dump()}`} />

          <InfoBox>
            Splitting input (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">BookCreate</code>) and output (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">BookOut</code>) models is a common pattern that keeps clients from setting (or leaking) fields they shouldn&apos;t control.
          </InfoBox>
        </div>
      ),

      'session-3:crud-endpoints': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Building CRUD Endpoints <span className="text-base font-normal text-gray-400">(~30 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>CRUD</strong> stands for <strong>Create, Read, Update, Delete</strong> — the four operations nearly every application needs. Here is a complete CRUD API for books using an in-memory store.
          </p>

          <CodeBlock language="python" code={`from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field

app = FastAPI()

class BookCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    author: str = Field(min_length=1, max_length=120)
    genre: str = "General"
    summary: str | None = None

class BookOut(BookCreate):
    id: int

books: dict[int, dict] = {}
book_counter = 1`} />

          <h3 className="text-xl font-semibold text-black mt-6">Create (POST)</h3>
          <CodeBlock language="python" code={`@app.post("/books", status_code=status.HTTP_201_CREATED, response_model=BookOut)
def create_book(book: BookCreate):
    global book_counter
    new_book = {"id": book_counter, **book.model_dump()}
    books[book_counter] = new_book
    book_counter += 1
    return new_book`} />

          <h3 className="text-xl font-semibold text-black mt-6">Read (GET)</h3>
          <CodeBlock language="python" code={`@app.get("/books", response_model=list[BookOut])
def list_books():
    return list(books.values())

@app.get("/books/{book_id}", response_model=BookOut)
def get_book(book_id: int):
    if book_id not in books:
        raise HTTPException(status_code=404, detail="Book not found")
    return books[book_id]`} />

          <h3 className="text-xl font-semibold text-black mt-6">Update (PUT)</h3>
          <CodeBlock language="python" code={`@app.put("/books/{book_id}", response_model=BookOut)
def update_book(book_id: int, book: BookCreate):
    if book_id not in books:
        raise HTTPException(status_code=404, detail="Book not found")
    updated = {"id": book_id, **book.model_dump()}
    books[book_id] = updated
    return updated`} />

          <h3 className="text-xl font-semibold text-black mt-6">Delete (DELETE)</h3>
          <CodeBlock language="python" code={`@app.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(book_id: int):
    if book_id not in books:
        raise HTTPException(status_code=404, detail="Book not found")
    del books[book_id]`} />

          <InfoBox>
            Note the pattern: <strong>POST</strong> to the collection creates, <strong>GET /books</strong> lists, <strong>GET /books/{"{id}"}</strong> reads one, <strong>PUT /books/{"{id}"}</strong> replaces, and <strong>DELETE /books/{"{id}"}</strong> removes. Status codes tell the client whether the operation succeeded.
          </InfoBox>
        </div>
      ),

      'session-3:crud-exercise': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Hands-on Exercise: Full CRUD API <span className="text-base font-normal text-gray-400">(~30 min)</span></h2>
          <p className="text-gray-600 leading-relaxed">
            Build a complete <strong>CRUD API for a Product catalog</strong> that combines everything from this session. Create a new file <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">app/products.py</code> and copy the starter code below.
          </p>

          <h3 className="text-xl font-semibold text-black mt-6">Requirements</h3>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">POST /products</code> — create a product, return <strong>201</strong>.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /products</code> — list all products, with optional <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">?category=</code> filtering.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /products/{"{id}"}</code> — get one product, <strong>404</strong> if missing.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">PUT /products/{"{id}"}</code> — update a product, <strong>404</strong> if missing.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">DELETE /products/{"{id}"}</code> — delete a product, return <strong>204</strong>.</li>
          </ul>

          <h3 className="text-xl font-semibold text-black mt-6">Starter Code</h3>
          <CodeBlock language="python" code={`from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field

app = FastAPI()

class ProductCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    category: str = "General"
    price: float = Field(gt=0, le=100000)
    in_stock: bool = True

class ProductOut(ProductCreate):
    id: int

products: dict[int, dict] = {}
product_counter = 1

# TODO 1: POST /products — create a product, status_code=201, response_model=ProductOut

# TODO 2: GET /products — list all products; filter by category if the query param is provided

# TODO 3: GET /products/{product_id} — return one product or raise HTTPException(404)

# TODO 4: PUT /products/{product_id} — replace and return the product or raise HTTPException(404)

# TODO 5: DELETE /products/{product_id} — remove or raise HTTPException(404); status_code=204`} />

          <h3 className="text-xl font-semibold text-black mt-6">Expected Behavior</h3>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Creating a product returns <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">201 Created</code> with an auto-assigned <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">id</code>.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Creating a product with an invalid price (e.g. <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">-5</code>) returns <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">422</code>.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GET /products?category=Electronics</code> returns only electronics products.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Requesting, updating, or deleting a missing ID returns <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">404</code>.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Deleting a product returns <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">204 No Content</code> with an empty response body.</li>
          </ul>

          <InfoBox>
            Verify every endpoint in Swagger UI at <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/docs</code>. A full CRUD round-trip — create, list, filter, get one, update, delete — should work without errors.
          </InfoBox>
        </div>
      ),

      'session-3:session-checklist': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Session Checklist</h2>
          <div className="space-y-1 divide-y divide-gray-100">
            <ChecklistItem label="Rules of RESTful naming (nouns, plural, resource hierarchy) understood." />
            <ChecklistItem label="Pydantic model defined with Field() constraints." />
            <ChecklistItem label="Request body validated automatically (422 on bad input)." />
            <ChecklistItem label="Custom status codes returned (201, 204, 404, 422)." />
            <ChecklistItem label="Response model used to shape and filter output." />
            <ChecklistItem label="Create, Read, Update, Delete endpoints all working." />
            <ChecklistItem label="Missing resource returns 404, invalid data returns 422." />
            <ChecklistItem label="Full CRUD exercise completed and tested in Swagger UI." />
          </div>
        </div>
      ),

      'session-3:homework': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Homework</h2>
          <p className="text-gray-600 leading-relaxed">Reinforce the concepts from this session with these 5 questions:</p>
          <ol className="space-y-3 text-gray-700 ml-4 list-decimal list-inside">
            <li>Why should REST URLs use nouns and plural names instead of verbs? Give one example of a bad and a good URL.</li>
            <li>What is the difference between a Pydantic input model (e.g. <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">BookCreate</code>) and a response model (e.g. <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">BookOut</code>)? Why is this separation useful?</li>
            <li>Which HTTP status codes should a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">POST</code> create endpoint, a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">DELETE</code> endpoint, and a &quot;not found&quot; error return? Explain each choice.</li>
            <li>How does raising <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">HTTPException(status_code=404, detail=...)</code> change the behavior of an endpoint?</li>
            <li>Describe the full set of CRUD endpoints you would design for a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">/users</code> resource, including method, path, and purpose of each.</li>
          </ol>
        </div>
      ),

      'session-3:qa-wrapup': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Q&amp;A &amp; Wrap-up <span className="text-base font-normal text-gray-400">(~5 min)</span></h2>

          <h3 className="text-xl font-semibold text-black mt-4">What We Covered Today</h3>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> RESTful design conventions: nouns, pluralization, and HTTP methods.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Request bodies validated with Pydantic models and Field() constraints.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Meaningful HTTP status codes: 200, 201, 204, 404, 422.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Response models to shape and protect outgoing data.</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Complete CRUD endpoints for a resource.</li>
          </ul>
        </div>
      ),
    };

    return contentMap[contentKey] || (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-black capitalize">
          {sectionId.replace(/-/g, ' ')}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Content for this section is coming soon.
        </p>
      </div>
    );
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.has(item.id);
    const isActive = activeSection === item.id;

    return (
      <div key={item.id}>
        <button
          onClick={() => hasChildren ? toggleSection(item.id) : handleNavClick(item.id)}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
            isActive
              ? 'bg-blue-100 text-blue-700 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          } ${level > 0 ? 'ml-4' : ''}`}
        >
          <span className="flex items-center">
            {hasChildren ? (
              isExpanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            {item.title}
          </span>
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const filteredNavigation = navigationData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.children?.some(child => child.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none overflow-y-auto`}>

        {/* Desktop header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={onBackToTopics}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-bold text-black">{sessionTitle}</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-black placeholder-gray-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          {filteredNavigation.map(item => renderNavItem(item))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1">
        <main className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
              Menu
            </button>
          </div>
          <div className="prose prose-lg max-w-none">
            {getDocumentContent(activeSection)}
          </div>
        </main>
      </div>
    </div>
  );
}
