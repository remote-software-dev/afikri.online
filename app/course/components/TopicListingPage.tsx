import { ArrowRight, Lock } from 'lucide-react';

export interface TopicItem {
  id: string;
  title: string;
  description: string;
}

interface TopicListingPageProps {
  topics: TopicItem[];
  onTopicSelect: (topicId: string) => void;
}

export default function TopicListingPage({
  topics,
  onTopicSelect,
}: TopicListingPageProps) {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-black md:text-5xl">
          Course Sessions
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => {
            const isLocked = index > 0;
            return (
              <div
                key={topic.id}
                onClick={() => !isLocked && onTopicSelect(topic.id)}
                className={`group rounded-xl p-6 shadow-sm transition-all duration-300 border ${
                  isLocked
                    ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                    : 'bg-white border-gray-200 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 cursor-pointer'
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                        isLocked
                          ? 'text-gray-500'
                          : 'text-black group-hover:text-blue-600'
                      }`}>
                        {topic.title}
                      </h3>
                      {isLocked && <Lock className="w-4 h-4 text-gray-400 shrink-0 ml-2" />}
                    </div>
                    <p className={`leading-relaxed text-sm ${
                      isLocked ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      {topic.description}
                    </p>
                  </div>
                  <div className={`mt-4 flex justify-end transition-transform ${
                    isLocked
                      ? 'text-gray-400'
                      : 'text-blue-600 group-hover:translate-x-1 duration-300'
                  }`}>
                    {isLocked
                      ? <Lock className="w-5 h-5" />
                      : <ArrowRight className="w-5 h-5" />}
                  </div>
                </div>
              </div>
            );
          })}
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
