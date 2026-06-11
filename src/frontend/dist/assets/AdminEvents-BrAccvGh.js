import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BgjVVzFQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { B as Button } from "./button-BHNwtKCm.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cgmf1CRI.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { S as Switch } from "./switch-BVKcWf8m.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { b as useEvents, I as useAddEvent, J as useUpdateEvent, K as useDeleteEvent, L as useEventRegistrations } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { P as Plus } from "./plus-y0KWOWAS.js";
import { f as format } from "./format-BGwA-lBQ.js";
import { U as Users } from "./users-C3LAM8TT.js";
import { P as Pen } from "./pen-D7_r51-R.js";
import { T as Trash2 } from "./trash-2-BrbSqs_g.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
import "./useAdmin-CTb0qm1b.js";
import "./leaf-B3Dxd-td.js";
import "./file-text-CdLsy3OQ.js";
import "./trending-up-Dx0h5VPt.js";
import "./star-hL6fgra2.js";
import "./message-square-roJAfg9F.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DhjXKjAX.js";
import "./index-DRgCU70w.js";
const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  location: "",
  isRegistrationOpen: true,
  featuredImageUrl: "",
  isCompleted: false
};
function toLocalDateTimeInput(ts) {
  const d = new Date(Number(ts) / 1e6);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fromLocalDateTimeInput(v) {
  return BigInt(new Date(v).getTime()) * 1000000n;
}
function AdminEvents() {
  const { data: events, isLoading } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [regDialogOpen, setRegDialogOpen] = reactExports.useState(false);
  const [selectedEventId, setSelectedEventId] = reactExports.useState(null);
  const { data: registrations, isLoading: regLoading } = useEventRegistrations(
    selectedEventId ?? ""
  );
  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };
  const openEdit = (event) => {
    setEditing(event);
    setForm({
      title: event.title,
      description: event.description,
      date: toLocalDateTimeInput(event.date),
      location: event.location,
      isRegistrationOpen: event.isRegistrationOpen,
      featuredImageUrl: event.featuredImageUrl ?? "",
      isCompleted: event.isCompleted
    });
    setDialogOpen(true);
  };
  const openRegistrations = (eventId) => {
    setSelectedEventId(eventId);
    setRegDialogOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date) {
      ue.error("Please select a date");
      return;
    }
    try {
      if (editing) {
        await updateEvent.mutateAsync({
          id: editing.id,
          title: form.title,
          description: form.description,
          date: fromLocalDateTimeInput(form.date),
          location: form.location,
          isRegistrationOpen: form.isRegistrationOpen,
          featuredImageUrl: form.featuredImageUrl || void 0,
          isCompleted: form.isCompleted
        });
        ue.success("Event updated");
      } else {
        await addEvent.mutateAsync({
          title: form.title,
          description: form.description,
          date: fromLocalDateTimeInput(form.date),
          location: form.location,
          isRegistrationOpen: form.isRegistrationOpen,
          featuredImageUrl: form.featuredImageUrl || void 0,
          isCompleted: form.isCompleted
        });
        ue.success("Event added");
      }
      setDialogOpen(false);
      setForm(EMPTY_FORM);
      setEditing(null);
    } catch {
      ue.error(editing ? "Failed to update event" : "Failed to add event");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      ue.success("Event deleted");
    } catch {
      ue.error("Failed to delete event");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin_events.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Events" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            (events == null ? void 0 : events.length) ?? 0,
            " event(s)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: openAdd,
            className: "bg-primary hover:bg-primary/90",
            "data-ocid": "admin_events.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              " Add Event"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-1", "sk-2", "sk-3", "sk-4"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24" }, id)) }) : !events || events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-16 bg-card border border-border rounded-xl",
          "data-ocid": "admin_events.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No events yet" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: events.map((ev, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 shadow-card",
          "data-ocid": `admin_events.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: ev.title }),
                ev.isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Completed" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-primary text-primary-foreground", children: "Upcoming" }),
                ev.isRegistrationOpen && !ev.isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-secondary text-secondary-foreground", children: "Registration Open" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mb-1", children: [
                "📍 ",
                ev.location,
                "  |  📅",
                " ",
                format(
                  Number(ev.date) / 1e6,
                  "dd MMM yyyy, HH:mm"
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-2", children: ev.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => openRegistrations(ev.id),
                  "data-ocid": `admin_events.view_registrations_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 mr-1" }),
                    "Registrations"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => openEdit(ev),
                  "data-ocid": `admin_events.edit_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-destructive border-destructive/30 hover:bg-destructive/5",
                    "data-ocid": `admin_events.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  AlertDialogContent,
                  {
                    "data-ocid": `admin_events.delete_dialog.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Event?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                          'This action cannot be undone. Event "',
                          ev.title,
                          '" will be permanently deleted.'
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogCancel,
                          {
                            "data-ocid": `admin_events.delete_cancel_button.${i + 1}`,
                            children: "Cancel"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogAction,
                          {
                            onClick: () => handleDelete(ev.id),
                            className: "bg-destructive text-destructive-foreground",
                            "data-ocid": `admin_events.delete_confirm_button.${i + 1}`,
                            children: "Delete"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        },
        ev.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "admin_events.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit Event" : "Add Event" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ev-title",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "Event title",
              className: "mt-1",
              required: true,
              "data-ocid": "admin_events.title_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-desc", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "ev-desc",
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              placeholder: "Event description...",
              rows: 3,
              className: "mt-1",
              required: true,
              "data-ocid": "admin_events.description_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-date", children: "Date & Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ev-date",
                type: "datetime-local",
                value: form.date,
                onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
                className: "mt-1",
                required: true,
                "data-ocid": "admin_events.date_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-location", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ev-location",
                value: form.location,
                onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })),
                placeholder: "Event location",
                className: "mt-1",
                required: true,
                "data-ocid": "admin_events.location_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-image", children: "Featured Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "ev-image",
              value: form.featuredImageUrl,
              onChange: (e) => setForm((f) => ({ ...f, featuredImageUrl: e.target.value })),
              placeholder: "https://...",
              className: "mt-1",
              "data-ocid": "admin_events.image_url_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "ev-reg-open",
                checked: form.isRegistrationOpen,
                onCheckedChange: (v) => setForm((f) => ({ ...f, isRegistrationOpen: v })),
                "data-ocid": "admin_events.registration_open_switch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-reg-open", className: "cursor-pointer", children: "Registration Open" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "ev-completed",
                checked: form.isCompleted,
                onCheckedChange: (v) => setForm((f) => ({ ...f, isCompleted: v })),
                "data-ocid": "admin_events.completed_switch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ev-completed", className: "cursor-pointer", children: "Completed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              "data-ocid": "admin_events.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "bg-primary hover:bg-primary/90",
              disabled: addEvent.isPending || updateEvent.isPending,
              "data-ocid": "admin_events.submit_button",
              children: [
                (addEvent.isPending || updateEvent.isPending) && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                editing ? "Update" : "Add",
                " Event"
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: regDialogOpen, onOpenChange: setRegDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-lg",
        "data-ocid": "admin_events.registrations_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Event Registrations" }) }),
          regLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12" })
          ] }) : !registrations || registrations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center py-8 text-muted-foreground text-sm",
              "data-ocid": "admin_events.registrations_empty_state",
              children: "No registrations yet"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-80 overflow-auto", children: registrations.map((reg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 bg-muted/40 rounded-lg",
              "data-ocid": `admin_events.registration_row.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: reg.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: reg.phone })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(Number(reg.createdAt) / 1e6, "dd MMM yyyy") })
              ]
            },
            reg.id
          )) })
        ]
      }
    ) })
  ] });
}
export {
  AdminEvents as default
};
