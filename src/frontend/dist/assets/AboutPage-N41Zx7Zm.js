import { j as jsxRuntimeExports, L as Link } from "./index-6efX3_t7.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { C as Card, a as CardContent } from "./card-CXSpZv-4.js";
import { i as useSettings, j as useTeamMembers, n as useAboutContent, k as useHomeContent } from "./useReports-D6gPO8oh.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { c as createLucideIcon } from "./button-BHNwtKCm.js";
import { M as MapPin } from "./Header-Co72W0gS.js";
import { U as Users } from "./users-C3LAM8TT.js";
import { L as Leaf } from "./leaf-B3Dxd-td.js";
import "./sonner-Blru5i_d.js";
import "./index-g2n4Sv33.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./loader-circle-CSGiWZFc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$3);
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
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "7g6ntu" }],
  ["path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", key: "ijws7r" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }],
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2", key: "3gwbw2" }]
];
const Scale = createLucideIcon("scale", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const PILLARS = [
  {
    icon: Users,
    title: "Community / Samudaay",
    titleHi: "सामुदायिक भागीदारी",
    desc: "We believe change happens from the ground up. Every citizen of Sitamarhi, Muzaffarpur, and nearby Bihar regions has the power to make their neighbourhood cleaner.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Leaf,
    title: "Environment / Paryavaran",
    titleHi: "पर्यावरण सुरक्षा",
    desc: "Uncollected garbage, blocked drains and water-logging harm public health and our environment. Swachhata Prahari works to make reporting fast so authorities act faster.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Scale,
    title: "Accountability / Javabdehee",
    titleHi: "प्रशासनिक जवाबदेही",
    desc: "Every report creates a record. Citizens should be able to hold local authorities accountable for cleanliness standards — Swachhata Prahari makes that possible.",
    color: "text-secondary",
    bg: "bg-secondary/10"
  }
];
const REGIONS = [
  { name: "Sitamarhi", icon: "🏙️", desc: "Mukhyalay" },
  { name: "Muzaffarpur", icon: "🏙️", desc: "Vibhagiya Kendra" },
  { name: "Sheohar", icon: "🏘️", desc: "Nikalwartee Zila" },
  { name: "East Champaran", icon: "🏘️", desc: "Nikalwartee Zila" },
  { name: "West Champaran", icon: "🏘️", desc: "Nikalwartee Zila" },
  { name: "Darbhanga", icon: "🏘️", desc: "Nikalwartee Zila" }
];
function AboutPage() {
  const { data: settings } = useSettings();
  const { data: teamMembers = [] } = useTeamMembers();
  const { data: aboutContent } = useAboutContent();
  const { data: homeContent } = useHomeContent();
  const sortedTeam = [...teamMembers].sort(
    (a, b) => Number(a.order) - Number(b.order)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "hero-gradient text-white py-16 md:py-20 relative overflow-hidden",
        "data-ocid": "about.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-72 h-72 bg-secondary rounded-full blur-3xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-10 w-56 h-56 bg-primary rounded-full blur-3xl" })
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
                    alt: "Swachhata Prahari",
                    className: "h-24 w-24 md:h-32 md:w-32"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border border-secondary/30 mb-4", children: "🌿 Hamara Parichay" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl leading-tight mb-4", children: "Swachhata Prahari ke Baare Mein" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 max-w-2xl mx-auto leading-relaxed text-lg", children: "Ek nagarik-chaleet safai abhiyan jo Bihar ke logon ko apne shehar ko saaf aur sundar banane ke liye sashakt karta hai." })
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
        "data-ocid": "about.mission_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-3", children: "Hamara Mission" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-4", children: "Our Mission / Hamaara Lakshya" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: (aboutContent == null ? void 0 : aboutContent.organizationStory) ?? "Swachhata Prahari is a citizen-driven cleanliness initiative dedicated to helping improve sanitation and public cleanliness in Sitamarhi, Muzaffarpur and nearby regions of Bihar." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Hamara uddeshya hai ki har nagrik apni aas-paas ki gandagi, kachra, blocked naale ya safai se judi koi bhi samasya asaani se report kar sake — taaki sambandhit authorities tak turant pahunche aur samadhan ho sake." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: 0.15 },
              className: "grid grid-cols-2 gap-4",
              children: [
                { icon: Shield, label: "Citizen-Led", color: "text-primary" },
                { icon: Flame, label: "Proactive", color: "text-secondary" },
                { icon: BookOpen, label: "Transparent", color: "text-primary" },
                { icon: MapPin, label: "Local Focus", color: "text-secondary" }
              ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center gap-2 card-hover",
                  "data-ocid": `about.value_card.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-muted rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: `w-5 h-5 ${item.color}` }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: item.label })
                  ]
                },
                item.label
              ))
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "section-alt py-14",
        "data-ocid": "about.mission_vision_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-3", children: "Mission & Vision" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Hamara Lakshya aur Drishti" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: [
            {
              icon: "🎯",
              title: "Mission",
              titleHi: "हमारा मिशन",
              desc: (aboutContent == null ? void 0 : aboutContent.organizationStory) ? `${aboutContent.organizationStory.slice(0, 120)}...` : "Bharat ke logon ko ek saaf aur swasthya vatavaran mein rehne ka adhikar dilana — ek report, ek badlav.",
              color: "border-primary/40 bg-primary/5"
            },
            {
              icon: "👁️",
              title: "Vision",
              titleHi: "हमारी दृष्टि",
              desc: (homeContent == null ? void 0 : homeContent.visionText) ?? "Ek aisa Bihar jahan har nagrik apne parivesh ki zimmedari le aur safai ko apni sanskriti ka hissa mane.",
              color: "border-secondary/40 bg-secondary/5"
            },
            {
              icon: "📜",
              title: "Values",
              titleHi: "हमारे मूल्य",
              desc: "Transparency (Paardarshhita) · Community (Samudaay) · Action (Kriya) · Impact (Prabhav)",
              color: "border-primary/40 bg-primary/5"
            }
          ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.12 },
              className: `rounded-xl border-2 p-6 ${item.color}`,
              "data-ocid": `about.mvv_card.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: item.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-2", children: item.titleHi }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.desc })
              ]
            },
            item.title
          )) })
        ] })
      }
    ),
    aboutContent && aboutContent.coreValues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-14",
        "data-ocid": "about.core_values_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/10 text-secondary border-secondary/20 mb-3", children: "Core Values" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Hamare Moolya" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto", children: aboutContent.coreValues.map((cv, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: "bg-card border border-border rounded-xl p-6 shadow-card card-hover",
              "data-ocid": `about.core_value.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2", children: cv.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: cv.description })
              ]
            },
            cv.title || i
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", "data-ocid": "about.impact_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/10 text-secondary border-secondary/20 mb-3", children: "Hamara Prabhav" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Impact in Numbers" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto", children: [
        {
          value: "247+",
          label: "Reports Filed",
          labelHi: "रिपोर्ट दर्ज",
          icon: "📄"
        },
        {
          value: "189+",
          label: "Resolved",
          labelHi: "समाधान हुए",
          icon: "✅"
        },
        {
          value: "34+",
          label: "Volunteers Joined",
          labelHi: "स्वयंसेवक",
          icon: "🤝"
        },
        {
          value: "6+",
          label: "Communities Served",
          labelHi: "समुदाय",
          icon: "🏘️"
        }
      ].map((metric, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-card border border-border rounded-xl p-5 text-center shadow-card",
          "data-ocid": `about.impact_card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: metric.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-3xl text-primary mb-1", children: metric.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: metric.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: metric.labelHi })
          ]
        },
        metric.label
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-alt py-14", "data-ocid": "about.pillars_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/10 text-secondary border-secondary/20 mb-3", children: "Hamare Teeno Stambh" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Teen Mukhya Siddhant" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: PILLARS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12 },
          "data-ocid": `about.pillar_card.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full border-border shadow-card card-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-12 h-12 ${p.bg} rounded-full flex items-center justify-center mb-4`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: `w-6 h-6 ${p.color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-0.5", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs font-medium mb-3 ${p.color}`, children: p.titleHi }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: p.desc })
          ] }) })
        },
        p.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", "data-ocid": "about.story_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-4", children: "Hamari Kahaani" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-6", children: "Founding Story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4 text-base", children: "Swachhata Prahari ki shuruat ek chhoti si soch se hui — jab kuch concerned nagrikon ne dekha ki Sitamarhi aur Muzaffarpur ke mohallon mein kachra badhta ja raha hai, drains jam rahe hain, aur koi sunne wala nahi hai. Tab unhone decide kiya ki technology ka use karke ek aise platform banaenge jahan har nagrik apni problem report kar sake." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed text-base", children: [
            "Today, Swachhata Prahari is a growing movement with volunteers across Sitamarhi, Muzaffarpur, Sheohar, and surrounding districts — all united by one goal:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Awaaz Safai Ki." })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-alt py-14", "data-ocid": "about.regions_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 inline mr-1" }),
              "Coverage Area"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Hamara Kshetra" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Sitamarhi, Muzaffarpur aur irdgird ke jile" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto", children: REGIONS.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          className: "bg-card border border-border rounded-xl p-4 text-center card-hover",
          "data-ocid": `about.region_card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-2", children: r.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: r.desc })
          ]
        },
        r.name
      )) })
    ] }) }),
    (settings == null ? void 0 : settings.founderName) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-14",
        "data-ocid": "about.founder_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-3", children: "🌟 Sansthapak" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Our Founder" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.1 },
              className: "flex flex-col md:flex-row items-center gap-8 bg-card border border-border rounded-2xl p-8 shadow-card",
              "data-ocid": "about.founder_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: settings.founderPhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: settings.founderPhoto,
                    alt: settings.founderName,
                    className: "w-40 h-40 rounded-full object-cover border-4 border-primary/30 shadow-md"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 h-40 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center text-7xl", children: "👤" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/10 text-secondary border-secondary/20 mb-3", children: "Founder & Director" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-2xl text-foreground mb-3", children: settings.founderName }),
                  settings.founderBio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base", children: settings.founderBio })
                ] })
              ]
            }
          )
        ] })
      }
    ),
    sortedTeam.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-alt py-14", "data-ocid": "about.team_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/10 text-secondary border-secondary/20 mb-3", children: "🤝 Hamari Toli" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Our Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Swachhata Prahari ke dedicated team sadsya" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-5xl mx-auto", children: sortedTeam.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          className: "bg-card border border-border rounded-xl p-5 text-center shadow-card card-hover",
          "data-ocid": `about.team_member.${i + 1}`,
          children: [
            member.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: member.photoUrl,
                alt: member.name,
                className: "w-20 h-20 rounded-full object-cover border-2 border-primary/20 mx-auto mb-3"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-3xl mx-auto mb-3", children: "👤" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm mb-1 leading-snug", children: member.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-medium mb-2", children: member.role }),
            member.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: member.bio })
          ]
        },
        member.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", "data-ocid": "about.cta_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🤝" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-4", children: "Is Mission Ka Hissa Banein" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/join",
                className: "inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-secondary/90 transition-smooth",
                "data-ocid": "about.cta_join_button",
                children: "🤝 Join as Volunteer"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/report",
                className: "inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-smooth",
                "data-ocid": "about.cta_report_button",
                children: "🚨 Report Problem"
              }
            )
          ] })
        ]
      }
    ) }) })
  ] });
}
export {
  AboutPage as default
};
