import type { BlogPost } from "@/backend";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPost } from "@/hooks/useReports";
import { Link, useParams } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";

function BlogDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-10 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-28" />
      </div>
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  const { id } = useParams({ from: "/blog/$id" });
  const { data: post, isLoading } = useBlogPost(id);

  if (isLoading) {
    return (
      <Layout>
        <BlogDetailSkeleton />
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Post nahi mili
          </h1>
          <p className="text-muted-foreground mb-6">
            Ye blog post uplabdh nahi hai ya hata di gayi hai.
          </p>
          <Link to="/blog">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5"
              data-ocid="blog_detail.back_button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Blog par wapas jayein
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="bg-background">
        {/* Header */}
        <section className="bg-primary py-10 md:py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center text-white/80 hover:text-white text-sm mb-4 transition-colors"
                data-ocid="blog_detail.back_link"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Blog par wapas jayein
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-0"
                >
                  {post.category}
                </Badge>
                <span className="flex items-center gap-1 text-white/70 text-sm">
                  <Calendar className="w-4 h-4" />
                  {format(Number(post.createdAt) / 1_000_000, "dd MMMM yyyy")}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="container mx-auto px-4 max-w-3xl -mt-6"
          >
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border border-border">
              <img
                src={post.featuredImageUrl}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="container mx-auto px-4 max-w-3xl py-10"
        >
          <div className="prose prose-sm md:prose-base max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="mt-10">
            <Link to="/blog">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                data-ocid="blog_detail.bottom_back_button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Sabhi posts dekhein
              </Button>
            </Link>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
}
