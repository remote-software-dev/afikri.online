import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface TopicItem {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
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
        readTime: '8 min read',
        category: 'ai'
      },
      {
        id: 'deep-learning-basics',
        title: 'Deep Learning Fundamentals',
        description: 'Understanding neural networks, backpropagation, and deep learning architectures.',
        date: '2025-01-14',
        readTime: '12 min read',
        category: 'ai'
      },
      {
        id: 'tensorflow-guide',
        title: 'Getting Started with TensorFlow',
        description: 'A comprehensive guide to building your first machine learning models.',
        date: '2025-01-13',
        readTime: '15 min read',
        category: 'ai'
      },
      {
        id: 'computer-vision',
        title: 'Computer Vision with OpenCV',
        description: 'Image processing, object detection, and computer vision applications.',
        date: '2025-01-12',
        readTime: '10 min read',
        category: 'ai'
      },
      {
        id: 'nlp-fundamentals',
        title: 'Natural Language Processing',
        description: 'Text processing, sentiment analysis, and language models.',
        date: '2025-01-10',
        readTime: '14 min read',
        category: 'ai'
      },
      {
        id: 'reinforcement-learning',
        title: 'Reinforcement Learning Basics',
        description: 'Q-learning, policy gradients, and RL applications.',
        date: '2025-01-08',
        readTime: '16 min read',
        category: 'ai'
      }
    ],
    'big-data': [
      {
        id: 'big-data-intro',
        title: 'Introduction to Big Data',
        description: 'Understanding the 5 Vs of big data and modern data challenges.',
        date: '2025-01-15',
        readTime: '7 min read',
        category: 'big-data'
      },
      {
        id: 'hadoop-ecosystem',
        title: 'Apache Hadoop Ecosystem',
        description: 'HDFS, MapReduce, and the complete Hadoop stack.',
        date: '2025-01-13',
        readTime: '12 min read',
        category: 'big-data'
      },
      {
        id: 'spark-analytics',
        title: 'Apache Spark for Data Analytics',
        description: 'Real-time data processing and analytics with Spark.',
        date: '2025-01-11',
        readTime: '11 min read',
        category: 'big-data'
      }
    ],
    'python': [
      {
        id: 'python-basics',
        title: 'Python Programming Fundamentals',
        description: 'Variables, data types, control structures, and functions.',
        date: '2025-01-14',
        readTime: '9 min read',
        category: 'python'
      },
      {
        id: 'django-web-dev',
        title: 'Web Development with Django',
        description: 'Building scalable web applications using Django framework.',
        date: '2025-01-12',
        readTime: '18 min read',
        category: 'python'
      },
      {
        id: 'data-analysis-pandas',
        title: 'Data Analysis with Pandas',
        description: 'Data manipulation, cleaning, and analysis using Pandas.',
        date: '2025-01-09',
        readTime: '13 min read',
        category: 'python'
      }
    ]
  };

  return topicsMap[category] || [];
};

const groupTopicsByDate = (topics: TopicItem[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const thisWeek = new Date(today);
  thisWeek.setDate(thisWeek.getDate() - 7);
  
  const thisMonth = new Date(today);
  thisMonth.setMonth(thisMonth.getMonth() - 1);

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
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(topic.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{topic.readTime}</span>
                          </div>
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
