interface BlogCardProps {
  imageUrl: string;
  tags: string[];
  title: string;
  author: string;
  date: string;
  content: string;
  readMoreLink: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const BlogCard: React.FC<BlogCardProps> = ({
  imageUrl,
  tags,
  title,
  author,
  date,
  content,
  readMoreLink,
}) => (
  <article className="rounded-lg border border-gray-200 bg-white">
    <div className="aspect-video w-full bg-gray-100">
      <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
    </div>
    <div className="space-y-4 p-6">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600">
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <div className="text-sm text-gray-600">
        {author} · {formatDate(date)}
      </div>
      <p className="text-gray-600">{content}</p>
      <a href={readMoreLink} className="font-medium text-blue-600 hover:underline">
        Read more →
      </a>
    </div>
  </article>
);

export default BlogCard;
