import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { B as Button, R as ReportStatus } from "./button-BHNwtKCm.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BgjVVzFQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-Cgmf1CRI.js";
import { I as Input } from "./input-D3UPljkv.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BL4YShwE.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { C as CATEGORY_LABELS } from "./index-DSavPC3H.js";
import { u as useAdmin } from "./useAdmin-CTb0qm1b.js";
import { h as useReports, r as useUpdateReportStatus, s as useDeleteReport } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { D as Download, S as Search } from "./search-Cx6_rrI-.js";
import { f as format } from "./format-BGwA-lBQ.js";
import { E as Eye } from "./eye-CfdYtRmf.js";
import { C as Clock } from "./clock-Bw6ycgn8.js";
import { C as CircleCheckBig } from "./circle-check-big-B8MnNb0w.js";
import { T as Trash2 } from "./trash-2-BrbSqs_g.js";
import "./sonner-Blru5i_d.js";
import "./leaf-B3Dxd-td.js";
import "./file-text-CdLsy3OQ.js";
import "./trending-up-Dx0h5VPt.js";
import "./star-hL6fgra2.js";
import "./users-C3LAM8TT.js";
import "./message-square-roJAfg9F.js";
import "./Combination-DFs1XHPO.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./index-DhjXKjAX.js";
import "./check-DTkXI2gV.js";
function AdminReports() {
  const { token } = useAdmin();
  const { data: reports, isLoading } = useReports();
  const { mutateAsync: updateStatus } = useUpdateReportStatus(token);
  const { mutateAsync: deleteReport } = useDeleteReport(token);
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [viewReport, setViewReport] = reactExports.useState(
    null
  );
  const filtered = (reports ?? []).filter((r) => {
    const matchesSearch = !search || [r.name, r.district, r.location, r.description].some(
      (v) => v.toLowerCase().includes(search.toLowerCase())
    );
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const handleToggleStatus = async (id, current) => {
    const next = current === ReportStatus.pending ? ReportStatus.resolved : ReportStatus.pending;
    try {
      await updateStatus({ id, status: next });
      ue.success("Status updated");
    } catch {
      ue.error("Failed to update status");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteReport(id);
      ue.success("Report deleted");
    } catch {
      ue.error("Failed to delete report");
    }
  };
  const exportCSV = () => {
    const rows = ["ID,Name,Mobile,District,Location,Category,Status,Date"];
    for (const r of filtered) {
      rows.push(
        `${r.refNumber},${r.name},${r.mobile},${r.district},"${r.location}",${r.category},${r.status},${format(Number(r.createdAt) / 1e6, "yyyy-MM-dd")}`
      );
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "swachta-reports.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin_reports.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Reports Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            filtered.length,
            " report(s)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: exportCSV,
            "data-ocid": "admin_reports.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
              "Export CSV"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search reports...",
              className: "pl-9",
              "data-ocid": "admin_reports.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: statusFilter,
            onValueChange: (v) => setStatusFilter(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-36",
                  "data-ocid": "admin_reports.status_filter_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "resolved", children: "Resolved" })
              ] })
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20" }, id)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-16 bg-card border border-border rounded-xl",
          "data-ocid": "admin_reports.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No reports found" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 shadow-card",
          "data-ocid": `admin_reports.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: r.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: r.mobile }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: r.refNumber })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mb-1", children: [
                "📍 ",
                r.district,
                " — ",
                r.location,
                "  |  🏷️",
                " ",
                CATEGORY_LABELS[r.category].hi
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-2", children: r.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: format(
                Number(r.createdAt) / 1e6,
                "dd MMM yyyy, HH:mm"
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: r.status === ReportStatus.resolved ? "default" : "secondary",
                  children: r.status === ReportStatus.resolved ? "Resolved" : "Pending"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => setViewReport(r),
                  "data-ocid": `admin_reports.view_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => handleToggleStatus(r.id, r.status),
                  "data-ocid": `admin_reports.toggle_status_button.${i + 1}`,
                  children: r.status === ReportStatus.resolved ? /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-destructive border-destructive/30 hover:bg-destructive/5",
                    "data-ocid": `admin_reports.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  AlertDialogContent,
                  {
                    "data-ocid": `admin_reports.delete_dialog.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Report?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                          "This action cannot be undone. Report by ",
                          r.name,
                          " ",
                          "will be permanently deleted."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogCancel,
                          {
                            "data-ocid": `admin_reports.delete_cancel_button.${i + 1}`,
                            children: "Cancel"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogAction,
                          {
                            onClick: () => handleDelete(r.id),
                            className: "bg-destructive text-destructive-foreground",
                            "data-ocid": `admin_reports.delete_confirm_button.${i + 1}`,
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
        r.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!viewReport,
        onOpenChange: (open) => !open && setViewReport(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin_reports.view_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Report Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: viewReport && `Ref: ${viewReport.refNumber}` })
          ] }),
          viewReport && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
            viewReport.imageBlob && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: viewReport.imageBlob.getDirectURL(),
                alt: `Cleanliness report submitted by ${viewReport.name} in ${viewReport.district}`,
                className: "w-full h-48 object-cover rounded-lg"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: viewReport.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Mobile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: viewReport.mobile })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "District" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: viewReport.district })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: CATEGORY_LABELS[viewReport.category].hi })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: viewReport.location })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: viewReport.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium capitalize", children: viewReport.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: format(
                  Number(viewReport.createdAt) / 1e6,
                  "dd MMM yyyy, HH:mm"
                ) })
              ] })
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminReports as default
};
