import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { P as ProjectStatus, B as Button } from "./button-BHNwtKCm.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BgjVVzFQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cgmf1CRI.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BL4YShwE.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { u as useProjects, F as useAddProject, G as useUpdateProject, H as useDeleteProject } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { P as Plus } from "./plus-y0KWOWAS.js";
import { f as format } from "./format-BGwA-lBQ.js";
import { P as Pen } from "./pen-D7_r51-R.js";
import { T as Trash2 } from "./trash-2-BrbSqs_g.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
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
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./index-DhjXKjAX.js";
import "./check-DTkXI2gV.js";
const STATUS_LABELS = {
  [ProjectStatus.active]: "Active",
  [ProjectStatus.completed]: "Completed",
  [ProjectStatus.planning]: "Planning"
};
const STATUS_COLORS = {
  [ProjectStatus.active]: "bg-primary text-primary-foreground",
  [ProjectStatus.completed]: "bg-secondary text-secondary-foreground",
  [ProjectStatus.planning]: "bg-muted text-muted-foreground"
};
const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  status: ProjectStatus.active,
  progressPercent: 0,
  featuredImageUrl: ""
};
function AdminProjects() {
  const { data: projects, isLoading } = useProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };
  const openEdit = (project) => {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      progressPercent: Number(project.progressPercent),
      featuredImageUrl: project.featuredImageUrl ?? ""
    });
    setDialogOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateProject.mutateAsync({
          id: editing.id,
          title: form.title,
          description: form.description,
          category: form.category,
          status: form.status,
          progressPercent: BigInt(form.progressPercent),
          featuredImageUrl: form.featuredImageUrl || void 0
        });
        ue.success("Project updated");
      } else {
        await addProject.mutateAsync({
          title: form.title,
          description: form.description,
          category: form.category,
          status: form.status,
          progressPercent: BigInt(form.progressPercent),
          featuredImageUrl: form.featuredImageUrl || void 0
        });
        ue.success("Project added");
      }
      setDialogOpen(false);
      setForm(EMPTY_FORM);
      setEditing(null);
    } catch {
      ue.error(
        editing ? "Failed to update project" : "Failed to add project"
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteProject.mutateAsync(id);
      ue.success("Project deleted");
    } catch {
      ue.error("Failed to delete project");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin_projects.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Projects" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            (projects == null ? void 0 : projects.length) ?? 0,
            " project(s)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: openAdd,
            className: "bg-primary hover:bg-primary/90",
            "data-ocid": "admin_projects.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              " Add Project"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-1", "sk-2", "sk-3", "sk-4"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24" }, id)) }) : !projects || projects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-16 bg-card border border-border rounded-xl",
          "data-ocid": "admin_projects.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No projects yet" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl shadow-card overflow-hidden",
          "data-ocid": `admin_projects.item.${i + 1}`,
          children: [
            p.featuredImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: p.featuredImageUrl,
                alt: p.title,
                className: "w-full h-40 object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: p.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.category })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs ${STATUS_COLORS[p.status]}`, children: STATUS_LABELS[p.status] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-2", children: p.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Progress" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                    Number(p.progressPercent),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-primary rounded-full transition-all",
                    style: { width: `${Number(p.progressPercent)}%` }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(Number(p.createdAt) / 1e6, "dd MMM yyyy") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      onClick: () => openEdit(p),
                      "data-ocid": `admin_projects.edit_button.${i + 1}`,
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
                        "data-ocid": `admin_projects.delete_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      AlertDialogContent,
                      {
                        "data-ocid": `admin_projects.delete_dialog.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Project?" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                              'This action cannot be undone. Project "',
                              p.title,
                              '" will be permanently deleted.'
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              AlertDialogCancel,
                              {
                                "data-ocid": `admin_projects.delete_cancel_button.${i + 1}`,
                                children: "Cancel"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              AlertDialogAction,
                              {
                                onClick: () => handleDelete(p.id),
                                className: "bg-destructive text-destructive-foreground",
                                "data-ocid": `admin_projects.delete_confirm_button.${i + 1}`,
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
            ] })
          ]
        },
        p.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "admin_projects.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit Project" : "Add Project" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "proj-title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "proj-title",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "Project title",
              className: "mt-1",
              required: true,
              "data-ocid": "admin_projects.title_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "proj-desc", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "proj-desc",
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              placeholder: "Project description...",
              rows: 3,
              className: "mt-1",
              required: true,
              "data-ocid": "admin_projects.description_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "proj-category", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "proj-category",
                value: form.category,
                onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
                placeholder: "e.g. Sanitation",
                className: "mt-1",
                required: true,
                "data-ocid": "admin_projects.category_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "proj-status", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.status,
                onValueChange: (v) => setForm((f) => ({ ...f, status: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "mt-1",
                      "data-ocid": "admin_projects.status_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ProjectStatus.active, children: "Active" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ProjectStatus.planning, children: "Planning" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ProjectStatus.completed, children: "Completed" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "proj-progress", children: [
            "Progress (",
            form.progressPercent,
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "proj-progress",
              type: "number",
              min: 0,
              max: 100,
              value: form.progressPercent,
              onChange: (e) => setForm((f) => ({
                ...f,
                progressPercent: Math.min(
                  100,
                  Math.max(0, Number(e.target.value))
                )
              })),
              className: "mt-1",
              "data-ocid": "admin_projects.progress_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "proj-image", children: "Featured Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "proj-image",
              value: form.featuredImageUrl,
              onChange: (e) => setForm((f) => ({ ...f, featuredImageUrl: e.target.value })),
              placeholder: "https://...",
              className: "mt-1",
              "data-ocid": "admin_projects.image_url_input"
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
              "data-ocid": "admin_projects.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "bg-primary hover:bg-primary/90",
              disabled: addProject.isPending || updateProject.isPending,
              "data-ocid": "admin_projects.submit_button",
              children: [
                (addProject.isPending || updateProject.isPending) && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                editing ? "Update" : "Add",
                " Project"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminProjects as default
};
