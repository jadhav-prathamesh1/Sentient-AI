import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Calendar, Clock, User } from "lucide-react";
import { BlogPost as BlogPostType } from "@/lib/blog";
import { NewsletterSignup } from "@/components/common/newsletter-signup";

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="space-y-8">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-IN')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="my-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with AI Education Trends
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest insights, research, and tips on AI-powered education delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </article>
  );
}