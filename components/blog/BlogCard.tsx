import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  imageUrl: string;
  tags: string[];
  title: string;
  author: string;
  date: string;
  content: string;
  readMoreLink: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  imageUrl,
  tags,
  title,
  author,
  date,
  content,
  readMoreLink,
}) => (
  <article className="border border-border rounded-lg overflow-hidden bg-card">
    <div className="aspect-video w-full bg-muted">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="text-sm text-muted-foreground">
        {author} · {formatDate(date)}
      </div>
      <p className="text-muted-foreground">{content}</p>
      <a href={readMoreLink} className="text-primary font-medium hover:underline">
        Read more →
      </a>
    </div>
  </article>
);

export default BlogCard;
