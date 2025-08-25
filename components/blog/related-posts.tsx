import { getBlogPosts } from "@/lib/blog";
import { BlogCard } from "./blog-card";

interface RelatedPostsProps {
  currentSlug: string;
  tags: string[];
}

export async function RelatedPosts({ currentSlug, tags }: RelatedPostsProps) {
  const allPosts = await getBlogPosts();
  
  // Filter out current post and find related posts based on tags
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => post.tags.some(tag => tags.includes(tag)))
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Related Articles</h2>
          <p className="text-gray-600">
            Explore more insights on AI-powered education
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}