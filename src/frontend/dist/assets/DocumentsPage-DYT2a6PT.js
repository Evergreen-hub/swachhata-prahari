import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { D as DocumentCategory } from "./button-BHNwtKCm.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { C as Card, a as CardContent } from "./card-CXSpZv-4.js";
import { I as Input } from "./input-D3UPljkv.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { f as useDocuments } from "./useReports-D6gPO8oh.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { S as Search, D as Download } from "./search-Cx6_rrI-.js";
import { F as FileText } from "./file-text-CdLsy3OQ.js";
import { f as format } from "./format-BGwA-lBQ.js";
import "./Header-Co72W0gS.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./index-g2n4Sv33.js";
import "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
const CATEGORY_LABELS = {
  [DocumentCategory.annualReport]: "Annual Report",
  [DocumentCategory.auditReport]: "Audit Report",
  [DocumentCategory.policy]: "Policy",
  [DocumentCategory.legal]: "Legal",
  [DocumentCategory.certificate]: "Certificate",
  [DocumentCategory.other]: "Other"
};
const CATEGORY_COLORS = {
  [DocumentCategory.annualReport]: "bg-primary/10 text-primary",
  [DocumentCategory.auditReport]: "bg-secondary/10 text-secondary-foreground",
  [DocumentCategory.policy]: "bg-blue-100 text-blue-700",
  [DocumentCategory.legal]: "bg-amber-100 text-amber-700",
  [DocumentCategory.certificate]: "bg-emerald-100 text-emerald-700",
  [DocumentCategory.other]: "bg-muted text-muted-foreground"
};
const FILTER_OPTIONS = [
  { label: "All", value: "All" },
  { label: "Annual Report", value: DocumentCategory.annualReport },
  { label: "Audit Report", value: DocumentCategory.auditReport },
  { label: "Policy", value: DocumentCategory.policy },
  { label: "Legal", value: DocumentCategory.legal },
  { label: "Certificate", value: DocumentCategory.certificate },
  { label: "Other", value: DocumentCategory.other }
];
function DocumentRow({
  doc,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.3, delay: index * 0.05 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-hover border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-base truncate", children: doc.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5 line-clamp-2", children: doc.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: `${CATEGORY_COLORS[doc.category]} border-0 text-xs`,
                  children: CATEGORY_LABELS[doc.category]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(Number(doc.createdAt) / 1e6, "dd MMM yyyy") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: doc.fileUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0",
            "data-ocid": `documents.download_button.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "Download"
            ]
          }
        )
      ] }) })
    }
  );
}
function DocumentsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border-border bg-card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 md:p-5 flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
        ] })
      ] })
    },
    `doc-skeleton-${i}-loading`
  )) });
}
function DocumentsPage() {
  const { data: documents, isLoading } = useDocuments();
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const filtered = reactExports.useMemo(() => {
    let list = documents ?? [];
    if (activeCategory !== "All") {
      list = list.filter((d) => d.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [documents, activeCategory, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: "text-3xl md:text-4xl font-bold text-white mb-3",
          children: "Documents & Reports"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "text-white/80 text-base md:text-lg max-w-2xl mx-auto",
          children: "Swachhata Prahari ke saare dastavej, report aur policies"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 md:py-14 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Documents search karein...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-10 bg-card border-border",
            "data-ocid": "documents.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-8 justify-center", children: FILTER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveCategory(opt.value),
          "data-ocid": `documents.filter.${opt.value}`,
          className: `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeCategory === opt.value ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
          children: opt.label
        },
        opt.value
      )) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentsSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16",
          "data-ocid": "documents.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "📂" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "Koi document nahi mila" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Is filter ya search ke anusar koi document uplabdh nahi hai." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filtered.map((doc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentRow, { doc, index: idx }, doc.id)) })
    ] }) })
  ] });
}
export {
  DocumentsPage as default
};
