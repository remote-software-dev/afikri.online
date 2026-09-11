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

  const sessionTitle = topicId === 'session-2' ? 'Session 2' : 'Session 1';
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
