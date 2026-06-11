import type { BlogPost } from "@/backend";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/hooks/useReports";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const excerpt =
    post.content.length > 150
      ? `${post.content.slice(0, 150)}...`
      : post.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to="/blog/$id"
        params={{ id: post.id }}
        data-ocid={`blog.item.${index + 1}`}
      >
        <Card className="card-hover h-full overflow-hidden border-border bg-card">
          {post.featuredImageUrl ? (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={post.featuredImageUrl}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">📰 No Image</span>
            </div>
          )}
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-0 text-xs"
              >
                {post.category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {format(Number(post.createdAt) / 1_000_000, "dd MMM yyyy")}
              </span>
            </div>
            <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-2 leading-snug">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-3">
              {excerpt}
            </p>
            {post.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <Tag className="w-3 h-3 text-muted-foreground" />
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholder
          key={`blog-skeleton-${i}-loading`}
          className="overflow-hidden border-border bg-card"
        >
          <Skeleton className="aspect-video w-full" />
          <CardContent className="p-5 space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const { data: posts, isLoading } = useBlogPosts();
  const [activeCategory, setActiveCategory] = useState("All");

  const publishedPosts = useMemo(
    () => (posts ?? []).filter((p) => p.isPublished),
    [posts],
  );

  const categories = useMemo(() => {
    const set = new Set(publishedPosts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [publishedPosts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return publishedPosts;
    return publishedPosts.filter((p) => p.category === activeCategory);
  }, [publishedPosts, activeCategory]);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Blog & News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-base md:text-lg max-w-2xl mx-auto"
          >
            Swachhata Prahari ki taza khabrein aur safai abhiyan se judi
            jankariyan
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid={`blog.filter.${cat.toLowerCase().replace(/\s+/g, "_")}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <BlogSkeleton />
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16" data-ocid="blog.empty_state">
              <div className="text-5xl mb-4">📰</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Koi post nahi mili
              </h3>
              <p className="text-muted-foreground text-sm">
                Is category mein abhi koi blog post uplabdh nahi hai.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <BlogCard key={post.id} post={post} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
