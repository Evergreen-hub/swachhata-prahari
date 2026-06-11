import { u as useParams, j as jsxRuntimeExports, L as Link } from "./index-6efX3_t7.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { B as Button } from "./button-BHNwtKCm.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { e as useBlogPost } from "./useReports-D6gPO8oh.js";
import { A as ArrowLeft } from "./arrow-left-By2CF1kn.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { C as Calendar } from "./calendar-DGyWnoLu.js";
import { f as format } from "./format-BGwA-lBQ.js";
import { T as Tag } from "./tag-E2awDOy2.js";
import "./Header-Co72W0gS.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./index-g2n4Sv33.js";
import "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
function BlogDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-3xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
    ] })
  ] });
}
function BlogDetailPage() {
  const { id } = useParams({ from: "/blog/$id" });
  const { data: post, isLoading } = useBlogPost(id);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogDetailSkeleton, {}) });
  }
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "📰" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-2", children: "Post nahi mili" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Ye blog post uplabdh nahi hai ya hata di gayi hai." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "border-primary text-primary hover:bg-primary/5",
          "data-ocid": "blog_detail.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
            "Blog par wapas jayein"
          ]
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-10 md:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/blog",
              className: "inline-flex items-center text-white/80 hover:text-white text-sm mb-4 transition-colors",
              "data-ocid": "blog_detail.back_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }),
                "Blog par wapas jayein"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white leading-tight mb-4", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "bg-white/20 text-white border-0",
                children: post.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-white/70 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
              format(Number(post.createdAt) / 1e6, "dd MMMM yyyy")
            ] })
          ] })
        ]
      }
    ) }) }),
    post.featuredImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.2 },
        className: "container mx-auto px-4 max-w-3xl -mt-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full rounded-lg overflow-hidden shadow-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.featuredImageUrl,
            alt: post.title,
            className: "h-full w-full object-cover"
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
        className: "container mx-auto px-4 max-w-3xl py-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm md:prose-base max-w-none text-foreground leading-relaxed whitespace-pre-wrap", children: post.content }),
          post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pt-6 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4 text-muted-foreground" }),
            post.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full",
                children: tag
              },
              tag
            ))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "border-primary text-primary hover:bg-primary/5",
              "data-ocid": "blog_detail.bottom_back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                "Sabhi posts dekhein"
              ]
            }
          ) }) })
        ]
      }
    )
  ] }) });
}
export {
  BlogDetailPage as default
};
