import { u as useParams, j as jsxRuntimeExports, L as Link } from "./index-6efX3_t7.js";
import { B as Button, P as ProjectStatus } from "./button-BHNwtKCm.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { a as useProject } from "./useReports-D6gPO8oh.js";
import { F as FolderOpen } from "./folder-open-BIlWbt9W.js";
import { A as ArrowLeft } from "./arrow-left-By2CF1kn.js";
import { C as Clock } from "./clock-Bw6ycgn8.js";
import { C as CircleCheck } from "./circle-check-C4VGwf54.js";
import { T as TrendingUp } from "./trending-up-Dx0h5VPt.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { C as Calendar } from "./calendar-DGyWnoLu.js";
import { M as MapPin } from "./Header-Co72W0gS.js";
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
function ProjectDetailPage() {
  const { id } = useParams({ from: "/projects/$id" });
  const { data: project, isLoading } = useProject(id);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
    ] }) });
  }
  if (!project) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground mb-2", children: "Project Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Yeh project abhi uplabdh nahi hai." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", "data-ocid": "project_detail.back_to_projects", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        "Back to Projects"
      ] }) })
    ] }) });
  }
  const status = STATUS_CONFIG[project.status];
  const StatusIcon = status.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/projects",
          className: "inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4",
          "data-ocid": "project_detail.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Projects"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-bold text-white", children: project.title })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "container mx-auto px-4 py-8 md:py-12",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 md:h-96 bg-muted rounded-xl overflow-hidden mb-8", children: project.featuredImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: project.featuredImageUrl,
              alt: project.title,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-20 h-20 text-primary/20" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.color}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "w-4 h-4" }),
                  status.label
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: project.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
              new Date(
                Number(project.createdAt) / 1e6
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
              project.category
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-sm max-w-none mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground mb-3", children: "About This Project" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed whitespace-pre-line", children: project.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Project Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-3 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary rounded-full transition-all",
                  style: {
                    width: `${Math.min(Number(project.progressPercent), 100)}%`
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-foreground", children: [
                String(project.progressPercent),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: project.status === ProjectStatus.completed ? "Yeh project safalta poorvak poora ho chuka hai." : project.status === ProjectStatus.active ? "Yeh project abhi chal raha hai aur tezi se aage badh raha hai." : "Yeh project ki yojana banai ja rahi hai." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/report", "data-ocid": "project_detail.report_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-primary hover:bg-primary/90", children: "Report a Problem" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/join", "data-ocid": "project_detail.join_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Join as Volunteer" }) })
          ] })
        ] })
      }
    )
  ] });
}
export {
  ProjectDetailPage as default
};
