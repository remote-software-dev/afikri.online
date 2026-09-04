'use client'

import { useState } from 'react';
import DocumentationPage from './components/DocumentationPage';
import TopicListingPage, { TopicItem } from './components/TopicListingPage';

const topics: TopicItem[] = [
  {
    id: 'web-framework',
    title: 'Sesi 1',
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

  const selectedTopicData = topics.find(t => t.id === selectedTopic);

  if (selectedTopic && selectedTopicData) {
    return (
      <DocumentationPage
        title={selectedTopicData.title}
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
