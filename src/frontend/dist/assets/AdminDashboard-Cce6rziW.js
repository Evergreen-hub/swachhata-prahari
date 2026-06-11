import { j as jsxRuntimeExports, L as Link } from "./index-6efX3_t7.js";
import { c as createLucideIcon, B as Button, R as ReportStatus } from "./button-BHNwtKCm.js";
import { I as Image, A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { C as CATEGORY_LABELS } from "./index-DSavPC3H.js";
import { u as useAdmin } from "./useAdmin-CTb0qm1b.js";
import { g as useStats, h as useReports, o as useVolunteerApplications, p as useGalleryItems, q as useImpactReports, j as useTeamMembers, u as useProjects, b as useEvents, d as useBlogPosts } from "./useReports-D6gPO8oh.js";
import { C as ClipboardList } from "./clipboard-list-DnZcb3WM.js";
import { C as Clock } from "./clock-Bw6ycgn8.js";
import { C as CircleCheckBig } from "./circle-check-big-B8MnNb0w.js";
import { U as Users } from "./users-C3LAM8TT.js";
import { T as TrendingUp } from "./trending-up-Dx0h5VPt.js";
import { C as CalendarDays } from "./calendar-days-DbIFCQSr.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { f as format } from "./format-BGwA-lBQ.js";
import "./sonner-Blru5i_d.js";
import "./index-g2n4Sv33.js";
import "./leaf-B3Dxd-td.js";
import "./file-text-CdLsy3OQ.js";
import "./star-hL6fgra2.js";
import "./message-square-roJAfg9F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M12 10v2", key: "hh53o1" }],
  ["path", { d: "M16 10v6", key: "1d6xys" }]
];
const FolderKanban = createLucideIcon("folder-kanban", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 18h-5", key: "95g1m2" }],
  ["path", { d: "M18 14h-8", key: "sponae" }],
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
      key: "39pd36"
    }
  ],
  ["rect", { width: "8", height: "4", x: "10", y: "6", rx: "1", key: "aywv1n" }]
];
const Newspaper = createLucideIcon("newspaper", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2", key: "1m6ac2" }]
];
const SquareUser = createLucideIcon("square-user", __iconNode);
function AdminDashboard() {
  const { token } = useAdmin();
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: reports, isLoading: reportsLoading } = useReports();
  const { data: volunteers } = useVolunteerApplications(token);
  const { data: galleryItems } = useGalleryItems(token);
  const { data: impactReports } = useImpactReports();
  const { data: teamMembers } = useTeamMembers();
  const { data: projects } = useProjects();
  const { data: events } = useEvents();
  const { data: blogPosts } = useBlogPosts();
  const recentReports = (reports == null ? void 0 : reports.slice(0, 5)) ?? [];
  const statCards = [
    {
      icon: ClipboardList,
      label: "Total Reports",
      value: stats ? String(stats.total) : "—",
      color: "text-primary"
    },
    {
      icon: Clock,
      label: "Pending",
      value: stats ? String(stats.pending) : "—",
      color: "text-amber-500"
    },
    {
      icon: CircleCheckBig,
      label: "Resolved",
      value: stats ? String(stats.resolved) : "—",
      color: "text-primary"
    },
    {
      icon: Users,
      label: "Volunteers",
      value: volunteers ? String(volunteers.length) : "—",
      color: "text-secondary"
    },
    {
      icon: Image,
      label: "Gallery Items",
      value: galleryItems ? String(galleryItems.length) : "—",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      label: "Impact Reports",
      value: impactReports ? String(impactReports.length) : "—",
      color: "text-secondary"
    },
    {
      icon: SquareUser,
      label: "Team Members",
      value: teamMembers ? String(teamMembers.length) : "—",
      color: "text-primary"
    },
    {
      icon: FolderKanban,
      label: "Total Projects",
      value: projects ? String(projects.length) : "—",
      color: "text-secondary"
    },
    {
      icon: CalendarDays,
      label: "Total Events",
      value: events ? String(events.length) : "—",
      color: "text-primary"
    },
    {
      icon: Newspaper,
      label: "Blog Posts",
      value: blogPosts ? String(blogPosts.length) : "—",
      color: "text-secondary"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Swachhata Prahari overview" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: statCards.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        className: "bg-card border border-border rounded-xl p-5 shadow-card",
        "data-ocid": `dashboard.stat_card.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: s.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `w-4 h-4 ${s.color}` })
          ] }),
          statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-3xl font-display font-bold ${s.color}`, children: s.value })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Recent Reports" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/reports", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            "data-ocid": "dashboard.view_all_reports_button",
            children: "View All"
          }
        ) })
      ] }),
      reportsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14" }, id)) }) : recentReports.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentReports.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 flex items-center gap-4",
          "data-ocid": `dashboard.report_row.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: r.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "• ",
                  r.district
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                CATEGORY_LABELS[r.category].hi,
                " •",
                " ",
                format(Number(r.createdAt) / 1e6, "dd MMM yyyy")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: r.status === ReportStatus.resolved ? "default" : "secondary",
                className: "text-xs flex-shrink-0",
                children: r.status === ReportStatus.resolved ? "Resolved" : "Pending"
              }
            )
          ]
        },
        r.id
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "p-8 text-center text-muted-foreground text-sm",
          "data-ocid": "dashboard.reports_empty_state",
          children: "No reports yet"
        }
      )
    ] })
  ] }) });
}
export {
  AdminDashboard as default
};
