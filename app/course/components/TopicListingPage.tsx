import { ArrowRight } from 'lucide-react';

interface TopicItem {
  id: string;
  title: string;
  description: string;
}

interface TopicListingPageProps {
  selectedCategory: string;
  onTopicSelect: (topicId: string) => void;
}

const getTopicsData = (category: string): TopicItem[] => {
  const topicsMap: Record<string, TopicItem[]> = {
    'ai': [
      {
        id: 'ai-introduction',
        title: 'Web Framework: Building Full Stack Applications with FastAPI and Nextjs.',
        description: 'A comprehensive guide to building modern web applicatins using FastAPI for the backend and Nextjs for the frontend',
      },
    ],
  };

  return topicsMap[category] || [];
};

export default function TopicListingPage({
  selectedCategory,
  onTopicSelect,
}: TopicListingPageProps) {
  const topics = getTopicsData(selectedCategory);

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onTopicSelect(topic.id)}
              className="group cursor-pointer bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
                <div className="ml-4 flex items-center text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-black mb-2">No articles yet</h3>
            <p className="text-gray-600">
              Articles will appear here soon.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
