import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { c as createLucideIcon, B as Button } from "./button-BHNwtKCm.js";
import { C as Card, a as CardContent } from "./card-CXSpZv-4.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-CARkAoRo.js";
import { i as useSettings, x as useDonorGalleryItems } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { C as Check } from "./check-DTkXI2gV.js";
import "./Header-Co72W0gS.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const UPI_NAME = "Swachhata%20Prahari";
const FALLBACK_UPI = "rudrapratapsingh789.063@okicici";
const FALLBACK_QR = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi%3A%2F%2Fpay%3Fpa%3Drudrapratapsingh789.063%40okicici%26pn%3DSwachhata%2520Prahari%26cu%3DINR";
const AMOUNTS = [
  { value: 100, label: "₹100" },
  { value: 500, label: "₹500", popular: true },
  { value: 1e3, label: "₹1,000" },
  { value: 2500, label: "₹2,500" },
  { value: 5e3, label: "₹5,000" },
  { value: 0, label: "Khud Chunein", custom: true }
];
const ALLOCATION = [
  { label: "Community Awareness", pct: 40, color: "bg-secondary" },
  { label: "Field Operations", pct: 35, color: "bg-primary" },
  { label: "Technology & Tools", pct: 15, color: "bg-blue-500" },
  { label: "Administration", pct: 10, color: "bg-muted-foreground" }
];
const UPI_STEPS = [
  "Apna UPI app kholein (PhonePe, GPay, Paytm)",
  "UPI ID darj karein ya QR scan karein",
  "Amount select ya enter karein",
  "Payment confirm karein",
  "Screenshot lete rahein"
];
const BANK_STEPS = [
  "Apne bank app ya net banking mein jaein",
  "Fund Transfer / NEFT / IMPS select karein",
  "Account details enter karein",
  "Amount enter karein",
  "Transfer confirm karein"
];
function StepList({ steps }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center", children: i + 1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground pt-0.5", children: step })
  ] }, step)) });
}
function DonationPage() {
  const [copied, setCopied] = reactExports.useState(false);
  const [copiedBank, setCopiedBank] = reactExports.useState(false);
  const [linkCopied, setLinkCopied] = reactExports.useState(false);
  const { data: settings } = useSettings();
  const { data: donorItems = [], isLoading: galleryLoading } = useDonorGalleryItems();
  const activeUpiId = (settings == null ? void 0 : settings.upiId) ?? FALLBACK_UPI;
  const activeQrUrl = (settings == null ? void 0 : settings.upiQrImageUrl) ?? FALLBACK_QR;
  const activeAccountNumber = settings == null ? void 0 : settings.bankAccountNumber;
  const activeIfsc = settings == null ? void 0 : settings.bankIfsc;
  const activeAccountHolder = (settings == null ? void 0 : settings.bankAccountHolder) ?? "Swachhata Prahari";
  const handleCopyUPI = async () => {
    await navigator.clipboard.writeText(activeUpiId);
    setCopied(true);
    ue.success("UPI ID copied!");
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleCopyBank = async (value) => {
    await navigator.clipboard.writeText(value);
    setCopiedBank(true);
    ue.success("Copied!");
    setTimeout(() => setCopiedBank(false), 2e3);
  };
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    ue.success("Link copied!");
    setTimeout(() => setLinkCopied(false), 2e3);
  };
  const handleAmountClick = (amount) => {
    const upiLink = `upi://pay?pa=${activeUpiId}&pn=${UPI_NAME}&am=${amount}&cu=INR`;
    window.open(upiLink, "_blank", "noopener");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden py-16 md:py-24",
        style: {
          background: "linear-gradient(135deg, #008000 0%, #FF9933 100%)"
        },
        "data-ocid": "donation.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-10",
              style: {
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl text-center relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-white/20 text-white border-white/30 mb-4 text-sm", children: "💚 Donate Now" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl md:text-5xl text-white mb-4 leading-tight", children: [
                  "Hamara Saath Den —",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-100", children: "Safai Mission Ko Mazboot Karein" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed", children: "Aapka chota sa yogdan ek swachh Bihar ka nirmaan kar sakta hai. Aaj hi donate karein aur is mission ka hissa banein." })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-12 md:py-16",
        "data-ocid": "donation.amounts_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-2 text-center", children: "Donation Amount Chunein" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center mb-8", children: "Apni ichha anusar amount chunein aur seedha UPI se donate karein" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: AMOUNTS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.07 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `donation.amount_card.${i + 1}`,
                      onClick: () => item.custom ? ue.info(
                        `UPI ID use karein: ${activeUpiId} — apni ichha anusar koi bhi amount darj karein`,
                        { duration: 5e3 }
                      ) : handleAmountClick(item.value),
                      className: `relative w-full rounded-2xl border-2 p-5 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${item.popular ? "border-primary bg-primary text-primary-foreground shadow-md" : item.custom ? "border-secondary bg-secondary/10 text-secondary-foreground hover:bg-secondary/20" : "border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"}`,
                      children: [
                        item.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full shadow", children: "⭐ Popular" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl md:text-2xl block", children: item.label }),
                        item.custom ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs mt-1 block opacity-70", children: "UPI ID se koi bhi amount" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs mt-1 block opacity-70", children: "Tap to Pay via UPI" })
                      ]
                    }
                  )
                },
                item.label
              )) })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-12 md:py-16",
        "data-ocid": "donation.upi_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center", children: "UPI se Donate Karein" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-8 bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-white rounded-xl border-2 border-primary/20 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: activeQrUrl,
                      alt: "UPI QR Code",
                      className: "w-44 h-44 md:w-48 md:h-48",
                      "data-ocid": "donation.qr_code"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Scan with any UPI app" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2 font-medium", children: "UPI ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono text-base font-semibold text-foreground flex-1 break-all",
                        "data-ocid": "donation.upi_id",
                        children: activeUpiId
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        onClick: handleCopyUPI,
                        className: "flex-shrink-0",
                        "data-ocid": "donation.copy_upi_button",
                        children: [
                          copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1", children: copied ? "Copied!" : "Copy" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "✓" }),
                      " PhonePe, GPay, Paytm, BHIM — sabhi UPI apps supported"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "✓" }),
                      " Instant transfer, secure & safe"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "✓" }),
                      " Screenshot save karein record ke liye"
                    ] })
                  ] })
                ] })
              ] })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-12 md:py-16",
        "data-ocid": "donation.bank_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-6 text-center", children: "Bank Transfer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-2 border-primary/20 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Account Holder Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: activeAccountHolder })
                  ] }),
                  activeAccountNumber ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Account Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-foreground", children: activeAccountNumber }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleCopyBank(activeAccountNumber),
                          className: "text-primary hover:text-primary/80 transition-colors",
                          "aria-label": "Copy account number",
                          "data-ocid": "donation.copy_account_button",
                          children: copiedBank ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Account Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm italic", children: "Admin se prapt karein" })
                  ] }),
                  activeIfsc ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "IFSC Code" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-foreground", children: activeIfsc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleCopyBank(activeIfsc),
                          className: "text-primary hover:text-primary/80 transition-colors",
                          "aria-label": "Copy IFSC",
                          "data-ocid": "donation.copy_ifsc_button",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "IFSC Code" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm italic", children: "Admin se prapt karein" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Branch" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Sitamarhi, Bihar" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "💡 Bank details ya assistance ke liye WhatsApp karein:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://wa.me/919263989760",
                      className: "text-primary underline font-medium",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: "9263989760"
                    }
                  )
                ] }) })
              ] }) })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-12 md:py-16",
        "data-ocid": "donation.steps_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center", children: "Kaise Donate Karein" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "upi", className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsList,
                  {
                    className: "grid grid-cols-2 w-full mb-6",
                    "data-ocid": "donation.steps_tabs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "upi", "data-ocid": "donation.upi_tab", children: "📱 UPI se" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "bank", "data-ocid": "donation.bank_tab", children: "🏦 Bank se" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "upi", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepList, { steps: UPI_STEPS }) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bank", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepList, { steps: BANK_STEPS }) }) }) })
              ] })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-12 md:py-16",
        "data-ocid": "donation.allocation_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground mb-2 text-center", children: "Aapka Paisa Kahan Jaata Hai" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center mb-8", children: "Aapki har donation transparent tarike se use hoti hai" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: ALLOCATION.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -16 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.1 },
                  "data-ocid": `donation.allocation.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground", children: item.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm text-foreground", children: [
                        item.pct,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: `h-full rounded-full ${item.color}`,
                        initial: { width: 0 },
                        whileInView: { width: `${item.pct}%` },
                        viewport: { once: true },
                        transition: {
                          duration: 1,
                          delay: i * 0.1,
                          ease: "easeOut"
                        }
                      }
                    ) })
                  ]
                },
                item.label
              )) })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-12 md:py-16",
        "data-ocid": "donation.gallery_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 mb-3", children: "📸 Donor Gallery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-foreground", children: "Hamara Impact Gallery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Donors ke saath hamare kaam ki jhalak" })
              ]
            }
          ),
          galleryLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
              "data-ocid": "donation.gallery_loading_state",
              children: ["g1", "g2", "g3", "g4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }, k))
            }
          ) : donorItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: donorItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { delay: i * 0.07 },
              className: "relative aspect-square rounded-xl overflow-hidden border border-border shadow-card group",
              "data-ocid": `donation.gallery_item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.blob ? item.blob.getDirectURL() : item.url,
                    alt: item.title ?? item.description ?? "Gallery",
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                    loading: "lazy"
                  }
                ),
                item.title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-medium line-clamp-1", children: item.title }) })
              ]
            },
            item.id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12 bg-card border border-border rounded-xl",
              "data-ocid": "donation.gallery_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "🖼️" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Gallery jald hi aayegi. Abhi koi photos nahi hain." })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 md:py-16",
        style: {
          background: "linear-gradient(135deg, #008000 0%, #FF9933 100%)"
        },
        "data-ocid": "donation.share_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl text-white mb-3", children: "Donation Link Share Karein" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 mb-8", children: "Apne dost aur parivaar ko bhi is mission ka hissa banayein" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    asChild: true,
                    className: "bg-green-600 hover:bg-green-700 text-white border-0 gap-2 shadow-md",
                    "data-ocid": "donation.whatsapp_share_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: "https://wa.me/?text=Swachhata%20Prahari%20ke%20mission%20ko%20support%20karein%3A%20Aaj%20hi%20donate%20karein%20aur%20ek%20swachh%20Bihar%20banane%20mein%20yogdan%20den.",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
                          "WhatsApp pe Share Karein"
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: handleCopyLink,
                    className: "bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2",
                    "data-ocid": "donation.copy_link_button",
                    children: [
                      linkCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                      linkCopied ? "Link Copied!" : "Link Copy Karein"
                    ]
                  }
                )
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  DonationPage as default
};
