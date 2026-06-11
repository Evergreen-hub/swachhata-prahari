import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { B as Button, M as MediaType, E as ExternalBlob } from "./button-BHNwtKCm.js";
import { A as AdminLayout, I as Image } from "./AdminLayout-Dfg10svQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cgmf1CRI.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { u as useAdmin } from "./useAdmin-CTb0qm1b.js";
import { q as useImpactReports, C as useAddImpactReport, D as useUpdateImpactReport, E as useDeleteImpactReport } from "./useReports-D6gPO8oh.js";
import { X, u as ue } from "./index-g2n4Sv33.js";
import { P as Plus } from "./plus-y0KWOWAS.js";
import { T as TrendingUp } from "./trending-up-Dx0h5VPt.js";
import { C as CircleCheck } from "./circle-check-C4VGwf54.js";
import { U as Users } from "./users-C3LAM8TT.js";
import { C as CalendarDays } from "./calendar-days-DbIFCQSr.js";
import { F as Film } from "./film-BJQcFqN9.js";
import { P as Pencil } from "./pencil-BKkYiM31.js";
import { T as Trash2 } from "./trash-2-BrbSqs_g.js";
import { U as Upload } from "./upload-B2qkYApJ.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
import "./leaf-B3Dxd-td.js";
import "./file-text-CdLsy3OQ.js";
import "./star-hL6fgra2.js";
import "./message-square-roJAfg9F.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
const EMPTY_FORM = {
  title: "",
  description: "",
  resolvedCases: "0",
  volunteerCount: "0",
  areasCoovered: "0",
  reportDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
};
function AdminImpact() {
  const { token } = useAdmin();
  const { data: reports = [], isLoading } = useImpactReports();
  const addReport = useAddImpactReport(token);
  const updateReport = useUpdateImpactReport(token);
  const deleteReport = useDeleteImpactReport(token);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [mediaPreviews, setMediaPreviews] = reactExports.useState([]);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const fileInputRef = reactExports.useRef(null);
  const sorted = [...reports].sort(
    (a, b) => Number(b.reportDate) - Number(a.reportDate)
  );
  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setMediaPreviews([]);
    setDialogOpen(true);
  };
  const openEdit = (r) => {
    setEditing(r);
    const d = new Date(Number(r.reportDate) / 1e6);
    setForm({
      title: r.title,
      description: r.description,
      resolvedCases: r.resolvedCases.toString(),
      volunteerCount: r.volunteerCount.toString(),
      areasCoovered: r.areasCoovered.toString(),
      reportDate: d.toISOString().split("T")[0]
    });
    setMediaPreviews([]);
    setDialogOpen(true);
  };
  const handleMediaFiles = (e) => {
    const files = Array.from(e.target.files ?? []);
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      mediaType: file.type.startsWith("video/") ? "video" : "image"
    }));
    setMediaPreviews((prev) => [...prev, ...newPreviews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const removeMedia = (idx) => {
    setMediaPreviews((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateMs = BigInt(new Date(form.reportDate).getTime()) * 1000000n;
    try {
      const uploadedMedia = await Promise.all(
        mediaPreviews.map(async (mp) => {
          const bytes = await new Promise(
            (res, rej) => {
              const reader = new FileReader();
              reader.onload = (ev) => {
                var _a;
                return res(new Uint8Array((_a = ev.target) == null ? void 0 : _a.result));
              };
              reader.onerror = rej;
              reader.readAsArrayBuffer(mp.file);
            }
          );
          const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
            (p) => setUploadProgress(p)
          );
          return {
            url: blob.getDirectURL(),
            blob,
            mediaType: mp.mediaType === "video" ? MediaType.video : MediaType.image
          };
        })
      );
      if (editing) {
        await updateReport.mutateAsync({
          id: editing.id,
          title: form.title || void 0,
          description: form.description || void 0,
          resolvedCases: BigInt(form.resolvedCases),
          volunteerCount: BigInt(form.volunteerCount),
          areasCoovered: BigInt(form.areasCoovered),
          reportDate: dateMs,
          media: uploadedMedia.length > 0 ? uploadedMedia : void 0
        });
        ue.success("Impact report updated");
      } else {
        const req = {
          title: form.title,
          description: form.description,
          resolvedCases: BigInt(form.resolvedCases),
          volunteerCount: BigInt(form.volunteerCount),
          areasCoovered: BigInt(form.areasCoovered),
          reportDate: dateMs,
          media: uploadedMedia
        };
        await addReport.mutateAsync(req);
        ue.success("Impact report added");
      }
      setDialogOpen(false);
      setMediaPreviews([]);
      setUploadProgress(0);
    } catch {
      ue.error("Failed to save impact report");
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this impact report?")) return;
    try {
      await deleteReport.mutateAsync(id);
      ue.success("Impact report deleted");
    } catch {
      ue.error("Failed to delete impact report");
    }
  };
  const isPending = addReport.isPending || updateReport.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin_impact.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Impact Reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            reports.length,
            " report(s) — Swachhata Prahari campaigns"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: openAdd,
            className: "bg-primary hover:bg-primary/90",
            "data-ocid": "admin_impact.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              " Add Report"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 bg-card border border-border rounded-xl",
          "data-ocid": "admin_impact.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-10 h-10 text-muted-foreground/40 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No impact reports yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Document your campaigns and achievements" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sorted.map((r, i) => {
        const date = new Date(
          Number(r.reportDate) / 1e6
        ).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        });
        const imageCount = r.media.filter(
          (m) => m.mediaType === MediaType.image
        ).length;
        const videoCount = r.media.filter(
          (m) => m.mediaType === MediaType.video
        ).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-card",
            "data-ocid": `admin_impact.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: r.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1 line-clamp-2", children: r.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-primary" }),
                    r.resolvedCases.toString(),
                    " resolved"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-secondary" }),
                    r.volunteerCount.toString(),
                    " volunteers"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5" }),
                    date
                  ] }),
                  r.media.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5" }),
                    imageCount,
                    " img",
                    videoCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      ", ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3.5 h-3.5 ml-1" }),
                      videoCount,
                      " vid"
                    ] })
                  ] })
                ] }),
                r.media.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3 overflow-x-auto", children: [
                  r.media.slice(0, 4).map(
                    (m, mi) => m.mediaType === MediaType.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: m.blob ? m.blob.getDirectURL() : m.url,
                        alt: `Media ${mi + 1}`,
                        className: "w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0"
                      },
                      `${r.id}-m-${mi}`
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-12 h-12 rounded-lg bg-muted flex items-center justify-center border border-border flex-shrink-0",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5 text-muted-foreground" })
                      },
                      `${r.id}-m-${mi}`
                    )
                  ),
                  r.media.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-muted/80 flex items-center justify-center border border-border flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium", children: [
                    "+",
                    r.media.length - 4
                  ] }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => openEdit(r),
                    className: "p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                    "aria-label": "Edit report",
                    "data-ocid": `admin_impact.edit_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleDelete(r.id),
                    className: "p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive",
                    "aria-label": "Delete report",
                    "data-ocid": `admin_impact.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ]
          },
          r.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-xl max-h-[90vh] overflow-y-auto",
        "data-ocid": "admin_impact.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit Impact Report" : "Add Impact Report" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ir-title", children: [
                "Title ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "ir-title",
                  value: form.title,
                  onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                  placeholder: "e.g. Sitamarhi Safai Abhiyan — June 2026",
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin_impact.title_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "ir-desc", children: [
                "Description ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "ir-desc",
                  value: form.description,
                  onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                  placeholder: "Describe the campaign and achievements...",
                  rows: 3,
                  required: true,
                  className: "mt-1",
                  "data-ocid": "admin_impact.description_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ir-resolved", children: "Resolved Cases" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ir-resolved",
                    type: "number",
                    min: 0,
                    value: form.resolvedCases,
                    onChange: (e) => setForm((f) => ({ ...f, resolvedCases: e.target.value })),
                    className: "mt-1",
                    "data-ocid": "admin_impact.resolved_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ir-volunteers", children: "Volunteers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ir-volunteers",
                    type: "number",
                    min: 0,
                    value: form.volunteerCount,
                    onChange: (e) => setForm((f) => ({ ...f, volunteerCount: e.target.value })),
                    className: "mt-1",
                    "data-ocid": "admin_impact.volunteers_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ir-areas", children: "Areas Covered" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "ir-areas",
                    type: "number",
                    min: 0,
                    value: form.areasCoovered,
                    onChange: (e) => setForm((f) => ({ ...f, areasCoovered: e.target.value })),
                    className: "mt-1",
                    "data-ocid": "admin_impact.areas_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ir-date", children: "Report Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "ir-date",
                  type: "date",
                  value: form.reportDate,
                  onChange: (e) => setForm((f) => ({ ...f, reportDate: e.target.value })),
                  className: "mt-1",
                  "data-ocid": "admin_impact.date_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Media — Images & Videos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/*,video/*",
                  multiple: true,
                  className: "hidden",
                  onChange: handleMediaFiles,
                  "data-ocid": "admin_impact.media_upload"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2", children: [
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
                      "Add Images / Videos"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Select multiple files — JPG, PNG, WEBP, MP4 — max 10MB each" }),
                mediaPreviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: mediaPreviews.map((mp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative group w-16 h-16 rounded-lg border border-border overflow-hidden bg-muted",
                    children: [
                      mp.mediaType === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: mp.preview,
                          alt: `Preview ${idx + 1}`,
                          className: "w-full h-full object-cover"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-6 h-6 text-muted-foreground" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => removeMedia(idx),
                          className: "absolute top-0.5 right-0.5 bg-destructive/80 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                          "aria-label": "Remove media",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `absolute bottom-0 left-0 right-0 text-center py-0 text-xs rounded-none rounded-b-lg border-0 ${mp.mediaType === "video" ? "bg-secondary/80 text-white" : "bg-primary/80 text-white"}`,
                          children: mp.mediaType === "video" ? "Vid" : "Img"
                        }
                      )
                    ]
                  },
                  `${mp.file.name}-${idx}`
                )) }),
                isPending && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-primary rounded-full transition-all",
                      style: { width: `${uploadProgress}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 text-right", children: [
                    uploadProgress,
                    "%"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setDialogOpen(false),
                  "data-ocid": "admin_impact.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  className: "bg-primary hover:bg-primary/90",
                  disabled: isPending,
                  "data-ocid": "admin_impact.submit_button",
                  children: [
                    isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                    editing ? "Save Changes" : "Add Report"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  AdminImpact as default
};
