import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { c as createLucideIcon, B as Button, E as ExternalBlob } from "./button-BHNwtKCm.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cgmf1CRI.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { u as useAdmin } from "./useAdmin-CTb0qm1b.js";
import { j as useTeamMembers, z as useAddTeamMember, A as useUpdateTeamMember, B as useDeleteTeamMember } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { P as Plus } from "./plus-y0KWOWAS.js";
import { P as Pencil } from "./pencil-BKkYiM31.js";
import { T as Trash2 } from "./trash-2-BrbSqs_g.js";
import { U as Upload } from "./upload-B2qkYApJ.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
import "./leaf-B3Dxd-td.js";
import "./file-text-CdLsy3OQ.js";
import "./trending-up-Dx0h5VPt.js";
import "./star-hL6fgra2.js";
import "./users-C3LAM8TT.js";
import "./message-square-roJAfg9F.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
  ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const CircleUserRound = createLucideIcon("circle-user-round", __iconNode);
const EMPTY_FORM = {
  name: "",
  role: "",
  bio: "",
  photoUrl: "",
  order: "0"
};
function AdminTeam() {
  const { token } = useAdmin();
  const { data: members = [], isLoading } = useTeamMembers();
  const addMember = useAddTeamMember(token);
  const updateMember = useUpdateTeamMember(token);
  const deleteMember = useDeleteTeamMember(token);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const [photoPreview, setPhotoPreview] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const sorted = [...members].sort((a, b) => Number(a.order) - Number(b.order));
  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
    setPhotoPreview(null);
    setDialogOpen(true);
  };
  const openEdit = (m) => {
    setEditing(m);
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio ?? "",
      photoUrl: m.photoUrl ?? "",
      order: m.order.toString()
    });
    setPhotoFile(null);
    setPhotoPreview(m.photoUrl ?? null);
    setDialogOpen(true);
  };
  const handlePhotoChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoUrl = form.photoUrl;
    if (photoFile) {
      const bytes = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          var _a;
          return res(new Uint8Array((_a = ev.target) == null ? void 0 : _a.result));
        };
        reader.onerror = rej;
        reader.readAsArrayBuffer(photoFile);
      });
      const blob = ExternalBlob.fromBytes(bytes);
      photoUrl = blob.getDirectURL();
    }
    try {
      if (editing) {
        await updateMember.mutateAsync({
          id: editing.id,
          name: form.name || void 0,
          role: form.role || void 0,
          bio: form.bio || void 0,
          photoUrl: photoUrl || void 0,
          order: form.order ? BigInt(form.order) : void 0
        });
        ue.success("Team member updated");
      } else {
        const req = {
          name: form.name,
          role: form.role,
          bio: form.bio || void 0,
          photoUrl: photoUrl || void 0,
          order: BigInt(form.order || "0")
        };
        await addMember.mutateAsync(req);
        ue.success("Team member added");
      }
      setDialogOpen(false);
    } catch {
      ue.error("Failed to save team member");
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await deleteMember.mutateAsync(id);
      ue.success("Team member deleted");
    } catch {
      ue.error("Failed to delete team member");
    }
  };
  const isPending = addMember.isPending || updateMember.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin_team.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Our Team" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            members.length,
            " member(s) — Swachhata Prahari team"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: openAdd,
            className: "bg-primary hover:bg-primary/90",
            "data-ocid": "admin_team.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              " Add Member"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" }, k)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 bg-card border border-border rounded-xl",
          "data-ocid": "admin_team.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "w-10 h-10 text-muted-foreground/40 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No team members yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Add your first team member using the button above" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: sorted.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 flex gap-4 items-start shadow-card",
          "data-ocid": `admin_team.item.${i + 1}`,
          children: [
            m.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: m.photoUrl,
                alt: m.name,
                className: "w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-primary/20"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "w-8 h-8 text-primary/50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: m.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-primary/10 text-primary border-primary/20 mt-1", children: m.role })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => openEdit(m),
                      className: "p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                      "aria-label": "Edit member",
                      "data-ocid": `admin_team.edit_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDelete(m.id),
                      className: "p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive",
                      "aria-label": "Delete member",
                      "data-ocid": `admin_team.delete_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] })
              ] }),
              m.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-2 line-clamp-2", children: m.bio }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground/60 text-xs mt-1", children: [
                "Order: ",
                m.order.toString()
              ] })
            ] })
          ]
        },
        m.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "admin_team.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit Team Member" : "Add Team Member" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Member Photo (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: handlePhotoChange,
              "data-ocid": "admin_team.photo_upload"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-4", children: [
            photoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: photoPreview,
                alt: "Preview",
                className: "w-16 h-16 rounded-full object-cover border-2 border-primary/20"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "w-8 h-8 text-muted-foreground/50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  photoFile ? "Change Photo" : "Upload Photo"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "tm-name", children: [
            "Name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "tm-name",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              placeholder: "e.g. Rudra Pratap Singh",
              required: true,
              className: "mt-1",
              "data-ocid": "admin_team.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "tm-role", children: [
            "Role / Designation ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "tm-role",
              value: form.role,
              onChange: (e) => setForm((f) => ({ ...f, role: e.target.value })),
              placeholder: "e.g. Founder, Volunteer Coordinator",
              required: true,
              className: "mt-1",
              "data-ocid": "admin_team.role_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tm-bio", children: "Bio (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "tm-bio",
              value: form.bio,
              onChange: (e) => setForm((f) => ({ ...f, bio: e.target.value })),
              placeholder: "Short description about this team member...",
              rows: 3,
              className: "mt-1",
              "data-ocid": "admin_team.bio_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tm-order", children: "Display Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "tm-order",
              type: "number",
              value: form.order,
              onChange: (e) => setForm((f) => ({ ...f, order: e.target.value })),
              min: 0,
              className: "mt-1",
              "data-ocid": "admin_team.order_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              "data-ocid": "admin_team.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "bg-primary hover:bg-primary/90",
              disabled: isPending,
              "data-ocid": "admin_team.submit_button",
              children: [
                isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                editing ? "Save Changes" : "Add Member"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminTeam as default
};
