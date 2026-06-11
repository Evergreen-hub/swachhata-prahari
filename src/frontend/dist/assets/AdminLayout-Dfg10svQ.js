import { a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-6efX3_t7.js";
import { c as createLucideIcon, B as Button } from "./button-BHNwtKCm.js";
import { T as Toaster } from "./sonner-Blru5i_d.js";
import { u as useAdmin } from "./useAdmin-CTb0qm1b.js";
import { b as useLocation, L as LogOut, X, M as Menu } from "./index-g2n4Sv33.js";
import { L as Leaf } from "./leaf-B3Dxd-td.js";
import { F as FileText } from "./file-text-CdLsy3OQ.js";
import { T as TrendingUp } from "./trending-up-Dx0h5VPt.js";
import { S as Star } from "./star-hL6fgra2.js";
import { U as Users } from "./users-C3LAM8TT.js";
import { M as MessageSquare } from "./message-square-roJAfg9F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
const ADMIN_NAV = [
  {
    to: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    labelHi: "डैशबोर्ड"
  },
  { to: "/admin/reports", icon: FileText, label: "Reports", labelHi: "रिपोर्ट" },
  {
    to: "/admin/projects",
    icon: TrendingUp,
    label: "Projects",
    labelHi: "परियोजनाएं"
  },
  { to: "/admin/events", icon: Star, label: "Events", labelHi: "कार्यक्रम" },
  { to: "/admin/blog", icon: FileText, label: "Blog", labelHi: "ब्लॉग" },
  { to: "/admin/gallery", icon: Image, label: "Gallery", labelHi: "गैलरी" },
  {
    to: "/admin/documents",
    icon: FileText,
    label: "Documents",
    labelHi: "दस्तावेज़"
  },
  { to: "/admin/team", icon: Users, label: "Team Members", labelHi: "टीम" },
  {
    to: "/admin/testimonials",
    icon: MessageSquare,
    label: "Testimonials",
    labelHi: "प्रशंसापत्र"
  },
  {
    to: "/admin/impact",
    icon: TrendingUp,
    label: "Impact Reports",
    labelHi: "प्रभाव रिपोर्ट"
  },
  { to: "/admin/home", icon: House, label: "Home Content", labelHi: "होम कंटेंट" },
  {
    to: "/admin/about",
    icon: Info,
    label: "About Content",
    labelHi: "अबाउट कंटेंट"
  },
  {
    to: "/admin/settings",
    icon: Settings,
    label: "Settings",
    labelHi: "सेटिंग्स"
  }
];
function AdminLayout({
  children
}) {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/admin" });
    }
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;
  const isActive = (path) => location.pathname === path;
  const handleLogout = async () => {
    await logout();
    navigate({ to: "/admin" });
  };
  const NavItems = () => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: ADMIN_NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: item.to,
      onClick: () => setSidebarOpen(false),
      "data-ocid": `admin.nav_${item.label.toLowerCase()}`,
      className: `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive(item.to) ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-60", children: item.labelHi })
        ] })
      ]
    },
    item.to
  )) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex flex-col w-64 bg-card border-r border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs", children: "SP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-sm text-foreground", children: "Swachhata Prahari" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3 h-3" }),
            " Admin Panel"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-4 space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavItems, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "w-full",
          onClick: handleLogout,
          "data-ocid": "admin.logout_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
            "Logout"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden flex items-center justify-between bg-card border-b border-border px-4 h-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs", children: "SP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm", children: "Admin Panel" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSidebarOpen((v) => !v),
            "aria-label": "Toggle sidebar",
            className: "p-2 rounded-md hover:bg-muted transition-colors",
            "data-ocid": "admin.mobile_sidebar_toggle",
            children: sidebarOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
          }
        )
      ] }),
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "lg:hidden fixed inset-0 z-40 bg-foreground/30 w-full h-full cursor-default",
            "aria-label": "Close sidebar",
            onClick: () => setSidebarOpen(false),
            onKeyDown: (e) => e.key === "Escape" && setSidebarOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border p-4 flex flex-col shadow-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-1 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavItems, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "w-full mt-4",
              onClick: handleLogout,
              "data-ocid": "admin.mobile_logout_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
                "Logout"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto p-4 md:p-6", children })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true })
  ] });
}
export {
  AdminLayout as A,
  Image as I
};
