import { Calendar, ArrowRight } from 'lucide-react';

interface TopicItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
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
        title: 'Introduction to Artificial Intelligence',
        description: 'Learn the fundamentals of AI, machine learning, and neural networks.',
        date: '2025-01-15',
        category: 'ai'
      },
    ],
    
  };

  return topicsMap[category] || [];
};

const groupTopicsByDate = (topics: TopicItem[]) => {
  const today = new Date();

  const groups: Record<string, TopicItem[]> = {
    'Today': [],
    'Yesterday': [],
    'This Week': [],
    'This Month': [],
    'Older': []
  };

  topics.forEach(topic => {
    const topicDate = new Date(topic.date);
    const diffTime = today.getTime() - topicDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      groups['Today'].push(topic);
    } else if (diffDays === 1) {
      groups['Yesterday'].push(topic);
    } else if (diffDays <= 7) {
      groups['This Week'].push(topic);
    } else if (diffDays <= 30) {
      groups['This Month'].push(topic);
    } else {
      groups['Older'].push(topic);
    }
  });

  return groups;
};

export default function TopicListingPage({ 
  selectedCategory, 
  onTopicSelect, 
}: TopicListingPageProps) {
  const topics = getTopicsData(selectedCategory);
  const groupedTopics = groupTopicsByDate(topics);

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        {Object.entries(groupedTopics).map(([groupName, groupTopics]) => {
          if (groupTopics.length === 0) return null;
          
          return (
            <div key={groupName} className="mb-12">
              <div className="space-y-4">
                {groupTopics.map((topic) => (
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
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {topic.description}
                        </p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(topic.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
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
