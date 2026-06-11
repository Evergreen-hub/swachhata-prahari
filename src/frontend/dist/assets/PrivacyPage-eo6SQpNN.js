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
function PrivacyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "hero-gradient text-white py-14",
        "data-ocid": "privacy.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border border-secondary/30 mb-4", children: "🔒 Privacy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl leading-tight mb-3", children: "Privacy Policy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 max-w-xl mx-auto", children: "Aapki privacy hamari zimmedari hai." })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-14",
        "data-ocid": "privacy.content_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.1 },
            className: "bg-card border border-border rounded-2xl p-8 shadow-card space-y-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-3", children: "1. Sammaan Ki Jaankari" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Swachhata Prahari aapki vyaktigat jaankari ko surekhsit rakhta hai. Hum sirf wahi data collect karte hain jo cleanliness reports ke liye zaruri hai — jaise naam, mobile number, location aur photos." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-3", children: "2. Data Ka Upyog" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Aapka data kewal sambandhit authorities tak report pahunchane ke liye use kiya jata hai. Hum aapka data kisi third party ke saath share nahi karte, siw unke jo sarakari safai karyakram mein sahyog dete hain." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-3", children: "3. Photos aur Media" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Upload ki gayi photos platform par store hoti hain aur report ke saath authorities ko bheji jati hain. Aap apni photos hatane ke liye hamse sampark kar sakte hain." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-3", children: "4. Sampark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: "Privacy se judi kisi bhi samasya ke liye hume likhein: rudrapratapsingh789.063@gmail.com ya WhatsApp karein: +91 9263989760." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Prabhaavit Taareekh:" }),
                " ",
                "Yeh policy ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " se praabhit hai. Hum samay samay par ise update kar sakte hain."
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  PrivacyPage as default
};
