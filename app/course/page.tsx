'use client'

import { useState } from 'react';
import DocumentationPage from './components/DocumentationPage';
import TopicListingPage, { TopicItem } from './components/TopicListingPage';

const topics: TopicItem[] = [
  {
    id: 'web-framework',
    title: 'Building Full Stack Applications with FastAPI and Next.js',
    description: 'A comprehensive guide to building modern web applications using FastAPI for the backend and Next.js for the frontend.',
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

  if (selectedTopic) {
    return (
      <DocumentationPage
        selectedTopic={selectedTopic}
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
