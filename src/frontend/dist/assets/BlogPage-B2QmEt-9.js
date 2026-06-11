import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-6efX3_t7.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { C as Card, a as CardContent } from "./card-CXSpZv-4.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { d as useBlogPosts } from "./useReports-D6gPO8oh.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { C as Calendar } from "./calendar-DGyWnoLu.js";
import { f as format } from "./format-BGwA-lBQ.js";
import { T as Tag } from "./tag-E2awDOy2.js";
import "./Header-Co72W0gS.js";
import "./index-DSavPC3H.js";
import "./button-BHNwtKCm.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./index-g2n4Sv33.js";
import "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
function BlogCard({ post, index }) {
  const excerpt = post.content.length > 150 ? `${post.content.slice(0, 150)}...` : post.content;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.1 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/blog/$id",
          params: { id: post.id },
          "data-ocid": `blog.item.${index + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-hover h-full overflow-hidden border-border bg-card", children: [
            post.featuredImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: post.featuredImageUrl,
                alt: post.title,
                className: "h-full w-full object-cover transition-transform duration-300 hover:scale-105",
                loading: "lazy"
              }
            ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "📰 No Image" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-primary/10 text-primary border-0 text-xs",
                    children: post.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                  format(Number(post.createdAt) / 1e6, "dd MMM yyyy")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-lg mb-2 line-clamp-2 leading-snug", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-3", children: excerpt }),
              post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 text-muted-foreground" }),
                post.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full",
                    children: tag
                  },
                  tag
                )),
                post.tags.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "+",
                  post.tags.length - 3
                ] })
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
function BlogSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "overflow-hidden border-border bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
        ] })
      ]
    },
    `blog-skeleton-${i}-loading`
  )) });
}
function BlogPage() {
  const { data: posts, isLoading } = useBlogPosts();
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const publishedPosts = reactExports.useMemo(
    () => (posts ?? []).filter((p) => p.isPublished),
    [posts]
  );
  const categories = reactExports.useMemo(() => {
    const set = new Set(publishedPosts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [publishedPosts]);
  const filteredPosts = reactExports.useMemo(() => {
    if (activeCategory === "All") return publishedPosts;
    return publishedPosts.filter((p) => p.category === activeCategory);
  }, [publishedPosts, activeCategory]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: "text-3xl md:text-4xl font-bold text-white mb-3",
          children: "Blog & News"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "text-white/80 text-base md:text-lg max-w-2xl mx-auto",
          children: "Swachhata Prahari ki taza khabrein aur safai abhiyan se judi jankariyan"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 md:py-14 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-8 justify-center", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveCategory(cat),
          "data-ocid": `blog.filter.${cat.toLowerCase().replace(/\s+/g, "_")}`,
          className: `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeCategory === cat ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
          children: cat
        },
        cat
      )) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(BlogSkeleton, {}) : filteredPosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "blog.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "📰" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "Koi post nahi mili" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Is category mein abhi koi blog post uplabdh nahi hai." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredPosts.map((post, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { post, index: idx }, post.id)) })
    ] }) })
  ] });
}
export {
  BlogPage as default
};
