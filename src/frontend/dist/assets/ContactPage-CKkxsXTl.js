import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { B as Button } from "./button-BHNwtKCm.js";
import { C as Card, a as CardContent } from "./card-CXSpZv-4.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { P as Phone, d as Mail, M as MapPin, S as SiFacebook, e as SiInstagram, f as SiX, g as SiYoutube } from "./Header-Co72W0gS.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { M as MessageSquare } from "./message-square-roJAfg9F.js";
import { S as Send } from "./send-Cc5Yovt5.js";
import "./sonner-Blru5i_d.js";
import "./index-DdfDEI4I.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./loader-circle-CSGiWZFc.js";
const WHATSAPP = "919263989760";
const CONTACT_ITEMS = [
  {
    icon: MessageSquare,
    label: "WhatsApp",
    labelHi: "व्हाट्सएप",
    value: "+91 9263989760",
    href: `https://wa.me/${WHATSAPP}?text=Hello%20Swachhata%20Prahari`,
    color: "text-primary",
    bg: "bg-primary/10",
    isExternal: true
  },
  {
    icon: Phone,
    label: "Phone",
    labelHi: "फोन",
    value: "+91 9263989760",
    href: "tel:+919263989760",
    color: "text-secondary",
    bg: "bg-secondary/10",
    isExternal: false
  },
  {
    icon: Mail,
    label: "Email",
    labelHi: "ईमेल",
    value: "rudrapratapsingh789.063@gmail.com",
    href: "mailto:rudrapratapsingh789.063@gmail.com",
    color: "text-primary",
    bg: "bg-primary/10",
    isExternal: false
  },
  {
    icon: MapPin,
    label: "Location",
    labelHi: "पता",
    value: "Sitamarhi, Bihar, India",
    href: "https://maps.google.com/?q=Sitamarhi,Bihar",
    color: "text-secondary",
    bg: "bg-secondary/10",
    isExternal: true
  }
];
const SOCIAL_LINKS = [
  {
    icon: SiFacebook,
    label: "Facebook",
    href: "https://facebook.com/swachtaprahari",
    color: "text-primary"
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://instagram.com/swachtaprahari",
    color: "text-secondary"
  },
  {
    icon: SiX,
    label: "X",
    href: "https://x.com/swachtaprahari",
    color: "text-foreground"
  },
  {
    icon: SiYoutube,
    label: "YouTube",
    href: "https://youtube.com/@swachtaprahari",
    color: "text-foreground/60"
  }
];
function ContactPage() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      ue.error("Kripya saari fields bharein.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setSubmitted(true);
    ue.success(
      "Aapka message mil gaya! Hum 24 ghante mein aapse sampark karenge."
    );
  };
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "hero-gradient text-white py-16 md:py-20 relative overflow-hidden",
        "data-ocid": "contact.hero_section",
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
                    src: "/assets/logo-uploaded.png",
                    alt: "Swachhata Prahari",
                    className: "h-14 w-auto object-contain"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/20 text-secondary border border-secondary/30 mb-4", children: "📬 Sampark Karein" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl leading-tight mb-4", children: "Hamse Sampark Karein" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 max-w-xl mx-auto leading-relaxed text-lg", children: "Koi bhi sawal, sujhaav ya madad ke liye hum 24×7 uplabdh hain." })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", "data-ocid": "contact.info_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto", children: CONTACT_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        "data-ocid": `contact.info_card.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: item.href,
            target: item.isExternal ? "_blank" : void 0,
            rel: item.isExternal ? "noopener noreferrer" : void 0,
            className: "block h-full",
            "aria-label": `Contact via ${item.label}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full border-border shadow-card hover:shadow-elevated transition-shadow duration-300 card-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col items-center text-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-12 h-12 ${item.bg} rounded-full flex items-center justify-center`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: `w-6 h-6 ${item.color}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xs font-medium mb-0.5 ${item.color}`,
                    children: item.labelHi
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 break-all", children: item.value })
              ] })
            ] }) })
          }
        )
      },
      item.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section-alt py-14", "data-ocid": "contact.form_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Message Bhejein" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Send us a message — we reply within 24 hours." }),
            submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                className: "bg-primary/10 border border-primary/30 rounded-xl p-8 text-center",
                "data-ocid": "contact.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "✅" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2", children: "Shukriya!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Aapka message hamare paas pahunch gaya. Hum jald hi aapse sampark karenge." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", message: "" });
                      },
                      className: "mt-4 text-primary text-sm underline",
                      "data-ocid": "contact.send_another_button",
                      children: "Ek aur message bhejein"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                noValidate: true,
                className: "space-y-4 bg-card border border-border rounded-2xl p-6 shadow-card",
                "data-ocid": "contact.message_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "contact-name",
                        className: "text-sm font-medium",
                        children: "Aapka Naam *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-name",
                        type: "text",
                        placeholder: "Naam darj karein",
                        value: form.name,
                        onChange: handleChange("name"),
                        required: true,
                        className: "mt-1",
                        "data-ocid": "contact.name_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "contact-email",
                        className: "text-sm font-medium",
                        children: "Email *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "contact-email",
                        type: "email",
                        placeholder: "email@example.com",
                        value: form.email,
                        onChange: handleChange("email"),
                        required: true,
                        className: "mt-1",
                        "data-ocid": "contact.email_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "contact-message",
                        className: "text-sm font-medium",
                        children: "Message *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "contact-message",
                        placeholder: "Aapka sawal ya sujhav yahan likhein...",
                        value: form.message,
                        onChange: handleChange("message"),
                        rows: 5,
                        required: true,
                        className: "mt-1 resize-none",
                        "data-ocid": "contact.message_textarea"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: isSubmitting,
                      className: "w-full font-semibold",
                      "data-ocid": "contact.submit_button",
                      children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }),
                        "Bhej rahe hain..."
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                        " Message Bhejein"
                      ] })
                    }
                  )
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { delay: 0.15 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Social Media" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Humse jude rahein aur latest updates paaein." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mb-8", children: SOCIAL_LINKS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: s.href,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": `Visit our ${s.label} page`,
                "data-ocid": `contact.social_${s.label.toLowerCase()}_button`,
                className: "flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `w-5 h-5 ${s.color} flex-shrink-0` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: s.label })
                ]
              },
              s.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }),
                "Seedha WhatsApp Karein"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Kisi bhi samasya ke liye seedha WhatsApp par sampark karein — fastest response guaranteed." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://wa.me/${WHATSAPP}?text=Hello%20Swachhata%20Prahari%2C%20main%20sampark%20karna%20chahta%20hun.`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "contact.whatsapp_cta_button",
                  className: "inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-smooth text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
                    " WhatsApp Karein"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }) }) })
  ] });
}
export {
  ContactPage as default
};
