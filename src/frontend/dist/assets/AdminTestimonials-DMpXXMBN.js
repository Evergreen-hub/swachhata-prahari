import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BgjVVzFQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { B as Button } from "./button-BHNwtKCm.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-Cgmf1CRI.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { S as Switch } from "./switch-BVKcWf8m.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { l as useTestimonials, R as useAddTestimonial, S as useUpdateTestimonial, T as useDeleteTestimonial } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { P as Plus } from "./plus-y0KWOWAS.js";
import { Q as Quote } from "./quote-DB3OKcWn.js";
import { P as Pencil } from "./pencil-BKkYiM31.js";
import { T as Trash2 } from "./trash-2-BrbSqs_g.js";
import "./sonner-Blru5i_d.js";
import "./useAdmin-CTb0qm1b.js";
import "./leaf-B3Dxd-td.js";
import "./file-text-CdLsy3OQ.js";
import "./trending-up-Dx0h5VPt.js";
import "./star-hL6fgra2.js";
import "./users-C3LAM8TT.js";
import "./message-square-roJAfg9F.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DhjXKjAX.js";
import "./index-DRgCU70w.js";
const emptyForm = {
  name: "",
  quote: "",
  role: "",
  photoUrl: "",
  isActive: true
};
function AdminTestimonials() {
  const { data: testimonials, isLoading } = useTestimonials();
  const { mutateAsync: addTestimonial, isPending: adding } = useAddTestimonial();
  const { mutateAsync: updateTestimonial, isPending: updating } = useUpdateTestimonial();
  const { mutateAsync: deleteTestimonial } = useDeleteTestimonial();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const form = editing ?? emptyForm;
  const isEditing = !!(editing == null ? void 0 : editing.id);
  const isPending = adding || updating;
  const reset = () => {
    setEditing(null);
    setOpen(false);
  };
  const setForm = (patch) => setEditing((prev) => ({
    ...prev ?? emptyForm,
    ...patch
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) {
      ue.error("Name and quote are required");
      return;
    }
    try {
      if (isEditing && form.id) {
        await updateTestimonial({
          id: form.id,
          name: form.name,
          quote: form.quote,
          role: form.role,
          photoUrl: form.photoUrl || void 0,
          isActive: form.isActive
        });
        ue.success("Testimonial updated");
      } else {
        await addTestimonial({
          name: form.name,
          quote: form.quote,
          role: form.role,
          photoUrl: form.photoUrl || void 0,
          isActive: form.isActive
        });
        ue.success("Testimonial added");
      }
      reset();
    } catch {
      ue.error(isEditing ? "Failed to update" : "Failed to add");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id);
      ue.success("Testimonial deleted");
    } catch {
      ue.error("Failed to delete");
    }
  };
  const startEdit = (t) => {
    setEditing({
      id: t.id,
      name: t.name,
      quote: t.quote,
      role: t.role,
      photoUrl: t.photoUrl ?? "",
      isActive: t.isActive
    });
    setOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin_testimonials.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Testimonials" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            (testimonials == null ? void 0 : testimonials.length) ?? 0,
            " testimonial(s)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => {
              setEditing(null);
              setOpen(true);
            },
            "data-ocid": "admin_testimonials.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              "Add Testimonial"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-1", "sk-2", "sk-3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24" }, id)) }) : !testimonials || testimonials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 bg-card border border-border rounded-xl",
          "data-ocid": "admin_testimonials.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No testimonials found" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 shadow-card flex items-start justify-between gap-4",
          "data-ocid": `admin_testimonials.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1 min-w-0", children: [
              t.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: t.photoUrl,
                  alt: t.name,
                  className: "w-12 h-12 rounded-full object-cover flex-shrink-0 border border-border"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm flex-shrink-0", children: t.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: t.role }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: t.isActive ? "default" : "secondary",
                      className: "text-xs",
                      children: t.isActive ? "Active" : "Inactive"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground italic line-clamp-2", children: [
                  '"',
                  t.quote,
                  '"'
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => startEdit(t),
                  "data-ocid": `admin_testimonials.edit_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "text-destructive border-destructive/30 hover:bg-destructive/5",
                    "data-ocid": `admin_testimonials.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  AlertDialogContent,
                  {
                    "data-ocid": `admin_testimonials.delete_dialog.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Testimonial?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                          "This action cannot be undone. Testimonial by ",
                          t.name,
                          " ",
                          "will be permanently deleted."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogCancel,
                          {
                            "data-ocid": `admin_testimonials.delete_cancel_button.${i + 1}`,
                            children: "Cancel"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogAction,
                          {
                            onClick: () => handleDelete(t.id),
                            className: "bg-destructive text-destructive-foreground",
                            "data-ocid": `admin_testimonials.delete_confirm_button.${i + 1}`,
                            children: "Delete"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        t.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin_testimonials.form_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: isEditing ? "Edit Testimonial" : "Add Testimonial" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: isEditing ? "Update the testimonial details." : "Add a new testimonial to the website." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tName", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "tName",
              value: form.name,
              onChange: (e) => setForm({ name: e.target.value }),
              placeholder: "e.g. Ramesh Kumar",
              className: "mt-1",
              "data-ocid": "admin_testimonials.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tRole", children: "Role / Designation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "tRole",
              value: form.role,
              onChange: (e) => setForm({ role: e.target.value }),
              placeholder: "e.g. Volunteer, Sitamarhi",
              className: "mt-1",
              "data-ocid": "admin_testimonials.role_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tQuote", children: "Quote" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "tQuote",
              value: form.quote,
              onChange: (e) => setForm({ quote: e.target.value }),
              placeholder: "Their testimonial...",
              rows: 3,
              className: "mt-1",
              "data-ocid": "admin_testimonials.quote_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tPhotoUrl", children: "Photo URL (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "tPhotoUrl",
              value: form.photoUrl,
              onChange: (e) => setForm({ photoUrl: e.target.value }),
              placeholder: "https://...",
              className: "mt-1",
              "data-ocid": "admin_testimonials.photo_url_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "tActive",
              checked: form.isActive,
              onCheckedChange: (v) => setForm({ isActive: v }),
              "data-ocid": "admin_testimonials.active_switch"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tActive", className: "cursor-pointer", children: "Active (visible on website)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: reset,
              "data-ocid": "admin_testimonials.form_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isPending,
              "data-ocid": "admin_testimonials.form_submit_button",
              children: isPending ? isEditing ? "Updating..." : "Adding..." : isEditing ? "Update" : "Add"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminTestimonials as default
};
