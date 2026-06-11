import { j as jsxRuntimeExports, L as Link } from "./index-6efX3_t7.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { C as Card, a as CardContent } from "./card-CXSpZv-4.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { U as Users } from "./users-C3LAM8TT.js";
import { c as createLucideIcon } from "./button-BHNwtKCm.js";
import { S as Star } from "./star-hL6fgra2.js";
import "./Header-Co72W0gS.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./index-g2n4Sv33.js";
import "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$1);
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
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ],
  [
    "path",
    {
      d: "M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66",
      key: "4oyue0"
    }
  ],
  ["path", { d: "m18 15-2-2", key: "60u0ii" }],
  ["path", { d: "m15 18-2-2", key: "6p76be" }]
];
const HeartHandshake = createLucideIcon("heart-handshake", __iconNode);
const BENEFITS = [
  {
    icon: HeartHandshake,
    title: "Community Impact",
    titleHi: "Samudaay Mein Badlav",
    desc: "Apne shehar aur gaon mein safai ki disha mein seedha yogdan dein. Har ek volunteer ki bhoomika mahatvapurn hai.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Star,
    title: "Recognition",
    titleHi: "Samman aur Pahchaan",
    desc: "Active volunteers ko certificate aur special recognition milti hai. Apni mehnat aur seva ko samman dilwayein.",
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    icon: Globe,
    title: "Network",
    titleHi: "Vistrit Network",
    desc: "Hazaron samaan vichar wale nagrikon se milein, local leaders se judein aur ek majboot community ka hissa banein.",
    color: "text-primary",
    bg: "bg-primary/10"
  }
];
function JoinPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "hero-gradient text-white py-16 md:py-20 relative overflow-hidden",
        "data-ocid": "join.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-72 h-72 bg-secondary rounded-full blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-3xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/logo-circular.png",
                    alt: "Join Swachhata Prahari Team",
                    className: "h-24 w-24 drop-shadow-lg"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border border-secondary/30 mb-4", children: "🤝 Volunteer Programme" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl leading-tight mb-4", children: "Join Swachhata Prahari Team" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 max-w-xl mx-auto leading-relaxed text-lg", children: "Apne shehar ko saaf aur sundar banane ke mission me volunteer ke roop me judein." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-6 text-white/60 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1,200+ volunteers already joined across Bihar" })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-14",
        "data-ocid": "join.benefits_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-3", children: "Kyun Judein?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Volunteer Ke Fayde" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-md mx-auto", children: "Hamari team ka hissa banen aur apne shehar ko swachh banane mein sarthak bhumika adaa karein." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto", children: BENEFITS.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.12 },
              "data-ocid": `join.benefit_card.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full border-border shadow-card card-hover text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-14 h-14 ${b.bg} rounded-full flex items-center justify-center mx-auto mb-4`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: `w-7 h-7 ${b.color}` })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-1", children: b.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs font-medium mb-3 ${b.color}`, children: b.titleHi }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: b.desc })
              ] }) })
            },
            b.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-alt py-14", "data-ocid": "join.form_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/10 text-secondary border-secondary/20 mb-3", children: "Registration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-2", children: "Abhi Register Karein" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto", children: "Neeche form bharein aur Swachhata Prahari volunteer team ka hissa banein." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.15 },
          className: "max-w-2xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-card",
          "data-ocid": "join.iframe_container",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              src: "https://form.svhrt.com/6a1aa26c160ebc719d34a124",
              width: "100%",
              height: 600,
              scrolling: "yes",
              title: "Join Swachhata Prahari Volunteer Form",
              className: "block border-0",
              "aria-label": "Volunteer registration form",
              "data-ocid": "join.survey_embed"
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", "data-ocid": "join.cta_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Volunteer nahi banana? Seedhe report karein." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/report",
          className: "inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-smooth",
          "data-ocid": "join.report_link_button",
          children: "🚨 Report Problem"
        }
      )
    ] }) })
  ] });
}
export {
  JoinPage as default
};
