import { useState } from 'react';
import { Menu, X, Search, Book, FileText, ChevronRight, ChevronDown, ArrowLeft, Info } from 'lucide-react';

interface NavItem {
  id: string;
  title: string;
  children?: NavItem[];
}

interface DocumentationPageProps {
  title: string;
  onBackToTopics: () => void;
}

const navigationData: NavItem[] = [
  {
    id: 'session-1',
    title: 'Session 1 — Introduction & Environment Setup',
    children: [
      { id: 'learning-outcomes', title: 'Learning Outcomes' },
      { id: 'course-overview', title: 'Course Overview' },
      { id: 'web-framework-architecture', title: 'Web Framework Architecture' },
      { id: 'development-environment', title: 'Development Environment' },
      { id: 'vs-code-extensions', title: 'Recommended VS Code Extensions' },
      { id: 'verify-installation', title: 'Verify Your Installation' },
      { id: 'first-fastapi-app', title: 'Run Your First FastAPI Application' },
      { id: 'first-nextjs-app', title: 'Run Your First Next.js Application' },
      { id: 'session-checklist', title: 'Session Checklist' },
      { id: 'homework', title: 'Homework' },
    ]
  },
];

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

export default function DocumentationPage({ title, onBackToTopics }: DocumentationPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['session-1']));
  const [activeSection, setActiveSection] = useState('learning-outcomes');
  const [searchQuery, setSearchQuery] = useState('');

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
    const contentMap: Record<string, React.ReactNode> = {
      'learning-outcomes': (
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

      'course-overview': (
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
            Throughout the semester, students will build an <strong>Event Registration System</strong> by combining these technologies.
          </InfoBox>
        </div>
      ),

      'web-framework-architecture': (
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

      'development-environment': (
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

      'vs-code-extensions': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Recommended VS Code Extensions</h2>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li className="flex items-center gap-2"><span className="text-blue-600">•</span> Python</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">•</span> Pylance</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">•</span> ESLint</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">•</span> Prettier</li>
            <li className="flex items-center gap-2"><span className="text-blue-600">•</span> Tailwind CSS IntelliSense</li>
          </ul>
        </div>
      ),

      'verify-installation': (
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

      'first-fastapi-app': (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-black">Run Your First FastAPI Application</h2>
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

      'first-nextjs-app': (
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

      'session-checklist': (
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

      'homework': (
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
    };

    return contentMap[sectionId] || (
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
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Book className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-black">{title}</span>
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
