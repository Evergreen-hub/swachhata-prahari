import { j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { M as MediaType } from "./button-BHNwtKCm.js";
import { H as Header, F as Footer, M as MapPin } from "./Header-Co72W0gS.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { C as Card, a as CardContent } from "./card-CXSpZv-4.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { q as useImpactReports } from "./useReports-D6gPO8oh.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { C as CircleCheck } from "./circle-check-C4VGwf54.js";
import { P as Play } from "./play-Df02IsNt.js";
import { U as Users } from "./users-C3LAM8TT.js";
import { C as CalendarDays } from "./calendar-days-DbIFCQSr.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./index-g2n4Sv33.js";
import "./loader-circle-CSGiWZFc.js";
function ImpactCard({
  report,
  index
}) {
  var _a;
  const date = new Date(
    Number(report.reportDate) / 1e6
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const cover = report.media[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.08 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "overflow-hidden border border-border shadow-card hover:shadow-elevated transition-shadow duration-300",
          "data-ocid": `impact.item.${index + 1}`,
          children: [
            cover && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video bg-muted", children: cover.mediaType === MediaType.video ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-12 h-12 text-primary" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: ((_a = cover.blob) == null ? void 0 : _a.getDirectURL()) ?? cover.url,
                alt: report.title,
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-2 leading-snug", children: report.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4 line-clamp-3", children: report.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 rounded-lg p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary mx-auto mb-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground text-lg", children: report.resolvedCases.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Resolved" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/10 rounded-lg p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-secondary mx-auto mb-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground text-lg", children: report.volunteerCount.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Volunteers" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 rounded-lg p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary mx-auto mb-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground text-lg", children: report.areasCoovered.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Areas" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-lg p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-muted-foreground mx-auto mb-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground text-sm", children: date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Date" })
                ] })
              ] }),
              report.media.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: report.media.slice(1, 5).map((m, i) => {
                var _a2;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted",
                    children: m.mediaType === MediaType.video ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: ((_a2 = m.blob) == null ? void 0 : _a2.getDirectURL()) ?? m.url,
                        alt: "",
                        className: "w-full h-full object-cover",
                        loading: "lazy"
                      }
                    )
                  },
                  `${report.id}-media-${i}`
                );
              }) })
            ] })
          ]
        }
      )
    }
  );
}
function ImpactPage() {
  const { data: reports = [], isLoading } = useImpactReports();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-4", children: "🏆 Hamara Prabhav" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "Impact Reports" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Swachhata Prahari team ke safai abhiyan aur volunteer efforts ka record — har maheene ke kaam ki report." })
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "space-y-3 border border-border rounded-xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-video rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
          ]
        },
        k
      )) }) : reports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 bg-card border border-border rounded-xl",
          "data-ocid": "impact.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Abhi koi impact report nahi hai" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 text-sm mt-1", children: "Jald hi hamari pehli impact report aayegi." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6", children: reports.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactCard, { report: r, index: i }, r.id)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ImpactPage as default
};
