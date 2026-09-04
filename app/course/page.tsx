'use client'

import React, { useState } from 'react';
import DocumentationPage from './components/DocumentationPage';
import TopicListingPage from './components/TopicListingPage';

export default function CoursePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('ai');
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
      selectedCategory={selectedCategory ?? 'ai'}
      onTopicSelect={handleTopicSelect}
    />
  );
}
