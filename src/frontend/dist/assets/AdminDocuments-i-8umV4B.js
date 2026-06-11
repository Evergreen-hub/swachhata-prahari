import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { D as DocumentCategory, B as Button } from "./button-BHNwtKCm.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BgjVVzFQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-Cgmf1CRI.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BL4YShwE.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { f as useDocuments, P as useAddDocument, Q as useDeleteDocument } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { P as Plus } from "./plus-y0KWOWAS.js";
import { F as FileText } from "./file-text-CdLsy3OQ.js";
import { T as Trash2 } from "./trash-2-BrbSqs_g.js";
import "./sonner-Blru5i_d.js";
import "./useAdmin-CTb0qm1b.js";
import "./leaf-B3Dxd-td.js";
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
const CATEGORY_OPTIONS = [
  { value: DocumentCategory.annualReport, label: "Annual Report" },
  { value: DocumentCategory.auditReport, label: "Audit Report" },
  { value: DocumentCategory.policy, label: "Policy" },
  { value: DocumentCategory.legal, label: "Legal Document" },
  { value: DocumentCategory.certificate, label: "Certificate" },
  { value: DocumentCategory.other, label: "Other" }
];
const CATEGORY_LABELS = {
  [DocumentCategory.annualReport]: "Annual Report",
  [DocumentCategory.auditReport]: "Audit Report",
  [DocumentCategory.policy]: "Policy",
  [DocumentCategory.legal]: "Legal Document",
  [DocumentCategory.certificate]: "Certificate",
  [DocumentCategory.other]: "Other"
};
function AdminDocuments() {
  const { data: documents, isLoading } = useDocuments();
  const { mutateAsync: addDocument, isPending: adding } = useAddDocument();
  const { mutateAsync: deleteDocument } = useDeleteDocument();
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    fileUrl: "",
    category: DocumentCategory.other
  });
  const resetForm = () => setForm({
    title: "",
    description: "",
    fileUrl: "",
    category: DocumentCategory.other
  });
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.fileUrl.trim()) {
      ue.error("Title and File URL are required");
      return;
    }
    try {
      await addDocument(form);
      ue.success("Document added successfully");
      resetForm();
      setOpen(false);
    } catch {
      ue.error("Failed to add document");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      ue.success("Document deleted");
    } catch {
      ue.error("Failed to delete document");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin_documents.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Documents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            (documents == null ? void 0 : documents.length) ?? 0,
            " document(s)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => setOpen(true),
            "data-ocid": "admin_documents.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              "Add Document"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-1", "sk-2", "sk-3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20" }, id)) }) : !documents || documents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 bg-card border border-border rounded-xl",
          "data-ocid": "admin_documents.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No documents found" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: documents.map((doc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 shadow-card flex items-start justify-between gap-4",
          "data-ocid": `admin_documents.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: doc.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: CATEGORY_LABELS[doc.category] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: doc.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: doc.fileUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-xs text-primary hover:underline mt-1 inline-block",
                  children: "View File →"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "text-destructive border-destructive/30 hover:bg-destructive/5 flex-shrink-0",
                  "data-ocid": `admin_documents.delete_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                AlertDialogContent,
                {
                  "data-ocid": `admin_documents.delete_dialog.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Document?" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                        'This action cannot be undone. "',
                        doc.title,
                        '" will be permanently deleted.'
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AlertDialogCancel,
                        {
                          "data-ocid": `admin_documents.delete_cancel_button.${i + 1}`,
                          children: "Cancel"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AlertDialogAction,
                        {
                          onClick: () => handleDelete(doc.id),
                          className: "bg-destructive text-destructive-foreground",
                          "data-ocid": `admin_documents.delete_confirm_button.${i + 1}`,
                          children: "Delete"
                        }
                      )
                    ] })
                  ]
                }
              )
            ] })
          ]
        },
        doc.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin_documents.add_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Document" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Upload a document URL and categorize it." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAdd, className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "docTitle", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "docTitle",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "e.g. Annual Report 2024",
              className: "mt-1",
              "data-ocid": "admin_documents.title_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "docDesc", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "docDesc",
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              placeholder: "Short description...",
              rows: 3,
              className: "mt-1",
              "data-ocid": "admin_documents.description_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "docCategory", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.category,
              onValueChange: (v) => setForm((f) => ({ ...f, category: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "mt-1",
                    "data-ocid": "admin_documents.category_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "docFileUrl", children: "File URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "docFileUrl",
              value: form.fileUrl,
              onChange: (e) => setForm((f) => ({ ...f, fileUrl: e.target.value })),
              placeholder: "https://...",
              className: "mt-1",
              "data-ocid": "admin_documents.file_url_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Paste the URL of the uploaded file (PDF, DOCX, etc.)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                resetForm();
                setOpen(false);
              },
              "data-ocid": "admin_documents.add_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: adding,
              "data-ocid": "admin_documents.add_submit_button",
              children: adding ? "Adding..." : "Add Document"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminDocuments as default
};
