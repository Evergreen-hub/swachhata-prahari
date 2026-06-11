import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-6efX3_t7.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { c as createLucideIcon, B as Button } from "./button-BHNwtKCm.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { b as useEvents, c as useRegisterForEvent } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { A as ArrowLeft } from "./arrow-left-By2CF1kn.js";
import { C as Clock } from "./clock-Bw6ycgn8.js";
import { C as CircleCheck } from "./circle-check-C4VGwf54.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { C as Calendar } from "./calendar-DGyWnoLu.js";
import { M as MapPin, A as AnimatePresence } from "./Header-Co72W0gS.js";
import "./sonner-Blru5i_d.js";
import "./index-DdfDEI4I.js";
import "./index-DSavPC3H.js";
import "./Combination-DFs1XHPO.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./loader-circle-CSGiWZFc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5.8 11.3 2 22l10.7-3.79", key: "gwxi1d" }],
  ["path", { d: "M4 3h.01", key: "1vcuye" }],
  ["path", { d: "M22 8h.01", key: "1mrtc2" }],
  ["path", { d: "M15 2h.01", key: "1cjtqr" }],
  ["path", { d: "M22 20h.01", key: "1mrys2" }],
  [
    "path",
    {
      d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
      key: "hbicv8"
    }
  ],
  [
    "path",
    { d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17", key: "1i94pl" }
  ],
  ["path", { d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7", key: "1cofks" }],
  [
    "path",
    {
      d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
      key: "4kbmks"
    }
  ]
];
const PartyPopper = createLucideIcon("party-popper", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function EventsPage() {
  const { data: events, isLoading } = useEvents();
  const registerMutation = useRegisterForEvent();
  const [registeringEventId, setRegisteringEventId] = reactExports.useState(
    null
  );
  const [regName, setRegName] = reactExports.useState("");
  const [regPhone, setRegPhone] = reactExports.useState("");
  const upcomingEvents = (events ?? []).filter((e) => !e.isCompleted);
  const completedEvents = (events ?? []).filter((e) => e.isCompleted);
  const handleRegister = async (eventId) => {
    if (!regName.trim() || !regPhone.trim()) {
      ue.error("Kripya apna naam aur phone number darj karein.");
      return;
    }
    try {
      await registerMutation.mutateAsync({
        eventId,
        name: regName,
        phone: regPhone
      });
      ue.success("Aapka registration safal raha!");
      setRegisteringEventId(null);
      setRegName("");
      setRegPhone("");
    } catch {
      ue.error(
        "Registration mein koi samasya aayi. Kripya dobara koshish karein."
      );
    }
  };
  const EventCard = ({ event, index }) => {
    const isUpcoming = !event.isCompleted;
    const eventDate = new Date(Number(event.date) / 1e6);
    const isPast = eventDate < /* @__PURE__ */ new Date();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.08 },
        className: "bg-card border border-border rounded-xl overflow-hidden shadow-card",
        "data-ocid": `events.item.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-48 bg-muted relative overflow-hidden", children: [
            event.featuredImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: event.featuredImageUrl,
                alt: event.title,
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "w-12 h-12 text-primary/30" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${isUpcoming ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`,
                children: isUpcoming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  " Upcoming"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                  " Completed"
                ] })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-lg mb-2", children: event.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm line-clamp-2 mb-4", children: event.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: eventDate.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: event.location })
              ] })
            ] }),
            isUpcoming && event.isRegistrationOpen && !isPast && (registeringEventId === event.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Name / नाम" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: regName,
                        onChange: (e) => setRegName(e.target.value),
                        placeholder: "Apna naam likhein",
                        className: "mt-1",
                        "data-ocid": `events.reg_name_input.${index + 1}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Phone / फोन" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: regPhone,
                        onChange: (e) => setRegPhone(e.target.value),
                        placeholder: "Mobile number",
                        className: "mt-1",
                        "data-ocid": `events.reg_phone_input.${index + 1}`
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        className: "flex-1 bg-primary hover:bg-primary/90",
                        onClick: () => handleRegister(event.id),
                        disabled: registerMutation.isPending,
                        "data-ocid": `events.reg_submit_button.${index + 1}`,
                        children: registerMutation.isPending ? "Submitting..." : "Register"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        onClick: () => {
                          setRegisteringEventId(null);
                          setRegName("");
                          setRegPhone("");
                        },
                        "data-ocid": `events.reg_cancel_button.${index + 1}`,
                        children: "Cancel"
                      }
                    )
                  ] })
                ]
              }
            ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "w-full",
                onClick: () => setRegisteringEventId(event.id),
                "data-ocid": `events.register_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 mr-2" }),
                  "Register Now"
                ]
              }
            )),
            isUpcoming && !event.isRegistrationOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "w-full justify-center py-1.5", children: "Registration Closed" })
          ] })
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "text-white/70 hover:text-white transition-colors",
            "data-ocid": "events.back_link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display font-bold text-white", children: "Events" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 max-w-2xl", children: "Swachhata Prahari ke events aur safai abhiyan mein hissa lein. Aaiye, mil kar apne shehar ko saaf aur sundar banayein." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 md:py-12", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "h-96 rounded-xl"
      },
      `event-skeleton-${i}`
    )) }) : (events ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "events.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "No events yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Abhi koi event schedule nahi hai. Jald hi naye events aane wale hain." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
      upcomingEvents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-foreground mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-primary" }),
          "Upcoming Events"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: upcomingEvents.map((event, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventCard, { event, index: i }, event.id)) })
      ] }),
      completedEvents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-foreground mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-muted-foreground" }),
          "Past Events"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: completedEvents.map((event, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          EventCard,
          {
            event,
            index: upcomingEvents.length + i
          },
          event.id
        )) })
      ] })
    ] }) })
  ] });
}
export {
  EventsPage as default
};
