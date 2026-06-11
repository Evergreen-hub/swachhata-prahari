import { j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { m as motion } from "./proxy-BkMauGKN.js";
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
function TermsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "hero-gradient text-white py-14",
        "data-ocid": "terms.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border border-secondary/30 mb-4", children: "📋 Terms" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl leading-tight mb-3", children: "Terms & Conditions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 max-w-xl mx-auto", children: "Swachhata Prahari use karne ke niyam aur shartein." })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-14",
        "data-ocid": "terms.content_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.1 },
            className: "bg-card border border-border rounded-2xl p-8 shadow-card space-y-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-3", children: "1. Platform Ka Upyog" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Swachhata Prahari ek naagarik-sanchalit safai reporting platform hai. Is platform ka upyog kewal genuinely cleanliness issues report karne ke liye kiya jana chahiye. Galat ya jhoothe reports dena varjit hai." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-3", children: "2. Aapki Zimmedari" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Aap jo jaankari dete hain woh sach aur sahi honi chahiye. Aap ensure karein ki upload ki gayi photos aur description accurate hain. Galat information dene wale users ko platform se ban kiya ja sakta hai." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-3", children: "3. Content Policy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Koi bhi abusive, offensive, ya irrelevant content upload karna mana hai. Hum report content ko review karke inappropriate content hatane ka adhikar rakhte hain." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-3", children: "4. Sewa Ki Seema" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Swachhata Prahari ek voluntary initiative hai. Hum guarantee nahi karte ki har report par action hoga, lekin hum poori koshish karte hain ki har report sambandhit authorities tak pahunche." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-3", children: "5. Sampark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Kisi bhi vivad ya prashn ke liye: rudrapratapsingh789.063@gmail.com ya +91 9263989760." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/5 border border-secondary/20 rounded-xl p-4 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Prabhaavit Taareekh:" }),
                " ",
                "Yeh niyam ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " se praabhit hain. In niyamon ko bina poorv soochna ke badla ja sakta hai."
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  TermsPage as default
};
