import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { M as MediaType } from "./button-BHNwtKCm.js";
import { H as Header, F as Footer } from "./Header-Co72W0gS.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cgmf1CRI.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-CARkAoRo.js";
import { y as usePublicGalleryItems, x as useDonorGalleryItems } from "./useReports-D6gPO8oh.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { I as ImageOff } from "./image-off-Cvn55418.js";
import { P as Play } from "./play-Df02IsNt.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./index-g2n4Sv33.js";
import "./loader-circle-CSGiWZFc.js";
function GalleryGrid({
  items,
  isLoading
}) {
  var _a;
  const [lightbox, setLightbox] = reactExports.useState(null);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }, k)) });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-20 bg-card border border-border rounded-xl",
        "data-ocid": "gallery.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No items yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 text-sm mt-1", children: "Check back soon for photos and videos." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: items.map((item, i) => {
      var _a2;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { delay: i % 8 * 0.05 },
          className: "relative group rounded-xl overflow-hidden border border-border w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary aspect-square bg-muted",
          onClick: () => setLightbox(item),
          "aria-label": item.title ?? "Gallery item",
          "data-ocid": `gallery.item.${i + 1}`,
          children: [
            item.mediaType === MediaType.video ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-10 h-10 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sr-only", children: [
                "Video: ",
                item.title
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: ((_a2 = item.blob) == null ? void 0 : _a2.getDirectURL()) ?? item.url,
                alt: item.title ?? "Gallery photo",
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                loading: "lazy"
              }
            ),
            item.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-medium line-clamp-2", children: item.title }),
              item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mt-1 line-clamp-1", children: item.description })
            ] })
          ]
        },
        item.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!lightbox,
        onOpenChange: (open) => !open && setLightbox(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-2xl p-0 overflow-hidden",
            "data-ocid": "gallery.lightbox_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "p-4 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm font-semibold", children: (lightbox == null ? void 0 : lightbox.title) ?? "Gallery" }) }),
              lightbox && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                lightbox.mediaType === MediaType.video ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "video",
                  {
                    src: lightbox.url,
                    controls: true,
                    className: "w-full max-h-[60vh] bg-muted",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: ((_a = lightbox.blob) == null ? void 0 : _a.getDirectURL()) ?? lightbox.url,
                    alt: lightbox.title ?? "Gallery photo",
                    className: "w-full max-h-[60vh] object-contain bg-muted"
                  }
                ),
                lightbox.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: lightbox.description }) })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function GalleryPage() {
  const [tab, setTab] = reactExports.useState("public");
  const { data: publicItems = [], isLoading: loadingPublic } = usePublicGalleryItems();
  const { data: donorItems = [], isLoading: loadingDonor } = useDonorGalleryItems();
  const items = tab === "public" ? publicItems : donorItems;
  const isLoading = tab === "public" ? loadingPublic : loadingDonor;
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-4", children: "📸 Swachhata Prahari Gallery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "हमारी तस्वीरें" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Swachhata Prahari ke kaam ki jhalak — safai abhiyaan, volunteer efforts, aur donors ka yogdan." })
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tabs,
          {
            value: tab,
            onValueChange: (v) => setTab(v),
            className: "mb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "gallery.filter.tab", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "public", "data-ocid": "gallery.public_tab", children: "🌿 Public Gallery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "donor", "data-ocid": "gallery.donor_tab", children: "💛 Donor Gallery" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryGrid, { items, isLoading })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  GalleryPage as default
};
