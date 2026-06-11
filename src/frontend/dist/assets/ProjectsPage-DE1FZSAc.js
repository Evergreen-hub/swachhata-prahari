import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-6efX3_t7.js";
import { B as Button, P as ProjectStatus } from "./button-BHNwtKCm.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { u as useProjects } from "./useReports-D6gPO8oh.js";
import { A as ArrowLeft } from "./arrow-left-By2CF1kn.js";
import { F as FolderOpen } from "./folder-open-BIlWbt9W.js";
import { C as Clock } from "./clock-Bw6ycgn8.js";
import { C as CircleCheck } from "./circle-check-C4VGwf54.js";
import { T as TrendingUp } from "./trending-up-Dx0h5VPt.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { M as MapPin } from "./Header-Co72W0gS.js";
import { C as Calendar } from "./calendar-DGyWnoLu.js";
import "./sonner-Blru5i_d.js";
import "./index-g2n4Sv33.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./loader-circle-CSGiWZFc.js";
const STATUS_CONFIG = {
  [ProjectStatus.active]: {
    label: "Active",
    color: "bg-emerald-100 text-emerald-700",
    icon: TrendingUp
  },
  [ProjectStatus.completed]: {
    label: "Completed",
    color: "bg-primary/10 text-primary",
    icon: CircleCheck
  },
  [ProjectStatus.planning]: {
    label: "Planning",
    color: "bg-amber-100 text-amber-700",
    icon: Clock
  }
};
function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = reactExports.useState("all");
  const categories = reactExports.useMemo(() => {
    const cats = new Set((projects == null ? void 0 : projects.map((p) => p.category)) ?? []);
    return ["all", ...Array.from(cats)];
  }, [projects]);
  const filtered = reactExports.useMemo(() => {
    if (filter === "all") return projects ?? [];
    return (projects ?? []).filter((p) => p.category === filter);
  }, [projects, filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "text-white/70 hover:text-white transition-colors",
            "data-ocid": "projects.back_link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display font-bold text-white", children: "Our Projects" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 max-w-2xl", children: "Swachhata Prahari ke safai abhiyan aur projects ki jankari. Har ek project hamare swachh Bihar ke sapne ko sakar kar raha hai." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 md:py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap gap-2 mb-8",
          "data-ocid": "projects.filter_list",
          children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilter(cat),
              "data-ocid": `projects.filter_${cat}`,
              className: `px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
              children: cat === "all" ? "All Projects" : cat
            },
            cat
          ))
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Skeleton,
        {
          className: "h-80 rounded-xl"
        },
        `project-skeleton-${i}`
      )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "projects.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "No projects found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Is category mein abhi koi project nahi hai." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((project, i) => {
        const status = STATUS_CONFIG[project.status];
        const StatusIcon = status.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.08 },
            className: "bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow",
            "data-ocid": `projects.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-48 bg-muted relative overflow-hidden", children: [
                project.featuredImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: project.featuredImageUrl,
                    alt: project.title,
                    className: "w-full h-full object-cover",
                    loading: "lazy"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-12 h-12 text-primary/30" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "w-3 h-3" }),
                      status.label
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mb-2 text-xs", children: project.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-lg mb-2 line-clamp-1", children: project.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm line-clamp-2 mb-4", children: project.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: project.category })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(
                      Number(project.createdAt) / 1e6
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Progress" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                      String(project.progressPercent),
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-primary rounded-full transition-all",
                      style: {
                        width: `${Math.min(Number(project.progressPercent), 100)}%`
                      }
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/projects/$id",
                    params: { id: project.id },
                    "data-ocid": `projects.view_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", size: "sm", children: "View Details" })
                  }
                )
              ] })
            ]
          },
          project.id
        );
      }) })
    ] })
  ] });
}
export {
  ProjectsPage as default
};
