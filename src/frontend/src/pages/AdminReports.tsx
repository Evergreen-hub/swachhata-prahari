import { ReportStatus } from "@/backend";
import AdminLayout from "@/components/AdminLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_LABELS } from "@/constants";
import { useAdmin } from "@/hooks/useAdmin";
import {
  useDeleteReport,
  useReports,
  useUpdateReportStatus,
} from "@/hooks/useReports";
import { format } from "date-fns";
import {
  CheckCircle,
  Clock,
  Download,
  Eye,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminReports() {
  const { token } = useAdmin();
  const { data: reports, isLoading } = useReports();
  const { mutateAsync: updateStatus } = useUpdateReportStatus(token);
  const { mutateAsync: deleteReport } = useDeleteReport(token);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "resolved"
  >("all");
  const [viewReport, setViewReport] = useState<(typeof filtered)[0] | null>(
    null,
  );

  const filtered = (reports ?? []).filter((r) => {
    const matchesSearch =
      !search ||
      [r.name, r.district, r.location, r.description].some((v) =>
        v.toLowerCase().includes(search.toLowerCase()),
      );
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = async (id: string, current: ReportStatus) => {
    const next =
      current === ReportStatus.pending
        ? ReportStatus.resolved
        : ReportStatus.pending;
    try {
      await updateStatus({ id, status: next });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReport(id);
      toast.success("Report deleted");
    } catch {
      toast.error("Failed to delete report");
    }
  };

  const exportCSV = () => {
    const rows = ["ID,Name,Mobile,District,Location,Category,Status,Date"];
    for (const r of filtered) {
      rows.push(
        `${r.refNumber},${r.name},${r.mobile},${r.district},"${r.location}",${r.category},${r.status},${format(Number(r.createdAt) / 1_000_000, "yyyy-MM-dd")}`,
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

  return (
    <AdminLayout>
      <div className="space-y-5" data-ocid="admin_reports.page">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Reports Management
            </h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} report(s)
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            data-ocid="admin_reports.export_button"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="pl-9"
              data-ocid="admin_reports.search_input"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}
          >
            <SelectTrigger
              className="w-36"
              data-ocid="admin_reports.status_filter_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((id) => (
              <Skeleton key={id} className="h-20" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="admin_reports.empty_state"
          >
            <p className="text-muted-foreground">No reports found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r, i) => (
              <div
                key={r.id}
                className="bg-card border border-border rounded-xl p-4 shadow-card"
                data-ocid={`admin_reports.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-foreground text-sm">
                        {r.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {r.mobile}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {r.refNumber}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      📍 {r.district} — {r.location} &nbsp;|&nbsp; 🏷️{" "}
                      {CATEGORY_LABELS[r.category].hi}
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {r.description}
                    </p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {format(
                        Number(r.createdAt) / 1_000_000,
                        "dd MMM yyyy, HH:mm",
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      variant={
                        r.status === ReportStatus.resolved
                          ? "default"
                          : "secondary"
                      }
                    >
                      {r.status === ReportStatus.resolved
                        ? "Resolved"
                        : "Pending"}
                    </Badge>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setViewReport(r)}
                      data-ocid={`admin_reports.view_button.${i + 1}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(r.id, r.status)}
                      data-ocid={`admin_reports.toggle_status_button.${i + 1}`}
                    >
                      {r.status === ReportStatus.resolved ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive/30 hover:bg-destructive/5"
                          data-ocid={`admin_reports.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent
                        data-ocid={`admin_reports.delete_dialog.${i + 1}`}
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Report?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Report by {r.name}{" "}
                            will be permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            data-ocid={`admin_reports.delete_cancel_button.${i + 1}`}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(r.id)}
                            className="bg-destructive text-destructive-foreground"
                            data-ocid={`admin_reports.delete_confirm_button.${i + 1}`}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* View Report Dialog */}
      <Dialog
        open={!!viewReport}
        onOpenChange={(open) => !open && setViewReport(null)}
      >
        <DialogContent data-ocid="admin_reports.view_dialog">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              {viewReport && `Ref: ${viewReport.refNumber}`}
            </DialogDescription>
          </DialogHeader>
          {viewReport && (
            <div className="space-y-3 text-sm">
              {viewReport.imageBlob && (
                <img
                  src={viewReport.imageBlob.getDirectURL()}
                  alt={`Cleanliness report submitted by ${viewReport.name} in ${viewReport.district}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <span className="text-muted-foreground text-xs">Name</span>
                  <p className="font-medium">{viewReport.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Mobile</span>
                  <p className="font-medium">{viewReport.mobile}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    District
                  </span>
                  <p className="font-medium">{viewReport.district}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    Category
                  </span>
                  <p className="font-medium">
                    {CATEGORY_LABELS[viewReport.category].hi}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground text-xs">
                    Location
                  </span>
                  <p className="font-medium">{viewReport.location}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground text-xs">
                    Description
                  </span>
                  <p>{viewReport.description}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Status</span>
                  <p className="font-medium capitalize">{viewReport.status}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Date</span>
                  <p className="font-medium">
                    {format(
                      Number(viewReport.createdAt) / 1_000_000,
                      "dd MMM yyyy, HH:mm",
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
