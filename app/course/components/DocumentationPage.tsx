import { useState } from 'react';
import { Menu, X, Search, Book, FileText, ChevronRight, ChevronDown, ArrowLeft } from 'lucide-react';

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
    id: 'course-overview',
    title: 'Course Overview',
    children: [
      { id: 'web-framework-architecture', title: 'Web Framework Architecture' },
      { id: 'development-environment', title: 'Development Environment' },
      { id: 'run-first-full-stack-app', title: 'Run Your First Full-Stack App' },
    ]
  },
];

export default function DocumentationPage({ title, onBackToTopics }: DocumentationPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['course-overview']));
  const [activeSection, setActiveSection] = useState('web-framework-architecture');
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
      'web-framework-architecture': (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-black">Web Framework Architecture</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Understand how FastAPI and Next.js work together to form a modern full-stack architecture.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">What you&apos;ll learn</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• How the backend and frontend communicate</li>
              <li>• API routes and server-side rendering</li>
              <li>• Project structure and file organization</li>
              <li>• Data flow between FastAPI and Next.js</li>
            </ul>
          </div>
        </div>
      ),
    };

    return contentMap[sectionId] || (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-black capitalize">
          {sectionId.replace(/-/g, ' ')}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          This section covers {sectionId.replace(/-/g, ' ')}. Here you&apos;ll find detailed information, examples, and best practices.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-black mb-3">Key Topics</h3>
          <p className="text-gray-600">
            This guide covers essential concepts, practical implementations, and advanced techniques.
          </p>
        </div>
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
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none`}>

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
