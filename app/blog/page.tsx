import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogCategories } from "@/components/blog/blog-categories";
import { getBlogPosts } from "@/lib/blog";

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Education{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Insights
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore the latest trends, research, and innovations in AI-powered education 
                and learn how technology is transforming Indian classrooms.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <BlogSearch />
                <BlogCategories />
              </div>

              {/* Blog Posts */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}