'use client'

import { useState } from 'react';
import DocumentationPage from './components/DocumentationPage';
import TopicListingPage, { TopicItem } from './components/TopicListingPage';

const topics: TopicItem[] = [
  {
    id: 'session-1',
    title: 'Session 1 — Introduction & Environment Setup',
    description: 'Development environment setup. Frontend vs backend architecture overview.',
  },
  {
    id: 'session-2',
    title: 'Session 2 — FastAPI Fundamentals',
    description: 'Introduction to FastAPI, routing, path parameters, and query parameters.',
  },
  {
    id: 'session-3',
    title: 'Session 3 — API Design with FastAPI',
    description: 'Building CRUD endpoints and RESTful API design patterns.',
  },
  {
    id: 'session-4',
    title: 'Session 4 — Database Integration (PostgreSQL + SQLAlchemy)',
    description: 'Connecting FastAPI to PostgreSQL database with SQLAlchemy ORM.',
  },
  {
    id: 'session-5',
    title: 'Session 5 — Next.js Fundamentals',
    description: 'Introduction to Next.js, pages, components, and React basics.',
  },
  {
    id: 'session-6',
    title: 'Session 6 — Routing, Layout & Tailwind CSS',
    description: 'Next.js routing, layouts, and building responsive UI with Tailwind CSS.',
  },
  {
    id: 'session-7',
    title: 'Session 7 — Connecting Next.js to FastAPI',
    description: 'Fetching and displaying API data in Next.js frontend.',
  },
  {
    id: 'session-8',
    title: 'Session 8 — Forms & CRUD from Frontend',
    description: 'Creating forms and implementing CRUD operations from the frontend.',
  },
  {
    id: 'session-9',
    title: 'Session 9 — Midterm Project Workshop',
    description: 'Complete CRUD application workshop and code review.',
  },
  {
    id: 'session-10',
    title: 'Session 10 — Authentication with JWT',
    description: 'Implementing login API with JWT tokens in FastAPI.',
  },
  {
    id: 'session-11',
    title: 'Session 11 — Authentication in Next.js',
    description: 'Protected pages and user authentication in Next.js.',
  },
  {
    id: 'session-12',
    title: 'Session 12 — File Upload & Static Files',
    description: 'Handling file uploads and serving static files.',
  },
  {
    id: 'session-13',
    title: 'Session 13 — Search, Pagination & Filtering',
    description: 'Advanced features for better user experience.',
  },
  {
    id: 'session-14',
    title: 'Session 14 — Deployment (FastAPI + Next.js)',
    description: 'Deploying both backend and frontend to production.',
  },
  {
    id: 'session-15',
    title: 'Session 15 — Testing, Debugging & Git Workflow',
    description: 'Production-ready improvements and best practices.',
  },
  {
    id: 'session-16',
    title: 'Session 16 — Final Project Presentation',
    description: 'Live demo and final project assessment.',
  },
];

export default function CoursePage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const handleBackToCategory = () => {
    setSelectedTopic(null);
  };

  const selectedTopicData = topics.find(t => t.id === selectedTopic);

  if (selectedTopic && selectedTopicData) {
    return (
      <DocumentationPage
        onBackToTopics={handleBackToCategory}
      />
    );
  }

  return (
    <TopicListingPage
      topics={topics}
      onTopicSelect={handleTopicSelect}
    />
  );
}