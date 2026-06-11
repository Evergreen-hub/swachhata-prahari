import {
  type AddImpactReportRequest,
  ExternalBlob,
  type ImpactMedia,
  type ImpactReport,
  MediaType,
} from "@/backend";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin } from "@/hooks/useAdmin";
import {
  useAddImpactReport,
  useDeleteImpactReport,
  useImpactReports,
  useUpdateImpactReport,
} from "@/hooks/useReports";
import {
  CalendarDays,
  CheckCircle2,
  Film,
  Image as ImageIcon,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  TrendingUp,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type MediaPreview = {
  file: File;
  preview: string;
  mediaType: "image" | "video";
};

type FormState = {
  title: string;
  description: string;
  resolvedCases: string;
  volunteerCount: string;
  areasCoovered: string;
  reportDate: string;
};

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  resolvedCases: "0",
  volunteerCount: "0",
  areasCoovered: "0",
  reportDate: new Date().toISOString().split("T")[0],
};

export default function AdminImpact() {
  const { token } = useAdmin();
  const { data: reports = [], isLoading } = useImpactReports();
  const addReport = useAddImpactReport(token);
  const updateReport = useUpdateImpactReport(token);
  const deleteReport = useDeleteImpactReport(token);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ImpactReport | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [mediaPreviews, setMediaPreviews] = useState<MediaPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sorted = [...reports].sort(
    (a, b) => Number(b.reportDate) - Number(a.reportDate),
  );

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setMediaPreviews([]);
    setDialogOpen(true);
  };

  const openEdit = (r: ImpactReport) => {
    setEditing(r);
    const d = new Date(Number(r.reportDate) / 1_000_000);
    setForm({
      title: r.title,
      description: r.description,
      resolvedCases: r.resolvedCases.toString(),
      volunteerCount: r.volunteerCount.toString(),
      areasCoovered: r.areasCoovered.toString(),
      reportDate: d.toISOString().split("T")[0],
    });
    setMediaPreviews([]);
    setDialogOpen(true);
  };

  const handleMediaFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newPreviews: MediaPreview[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      mediaType: file.type.startsWith("video/") ? "video" : "image",
    }));
    setMediaPreviews((prev) => [...prev, ...newPreviews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeMedia = (idx: number) => {
    setMediaPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateMs = BigInt(new Date(form.reportDate).getTime()) * 1_000_000n;
    try {
      const uploadedMedia: ImpactMedia[] = await Promise.all(
        mediaPreviews.map(async (mp) => {
          const bytes = await new Promise<Uint8Array<ArrayBuffer>>(
            (res, rej) => {
              const reader = new FileReader();
              reader.onload = (ev) =>
                res(new Uint8Array(ev.target?.result as ArrayBuffer));
              reader.onerror = rej;
              reader.readAsArrayBuffer(mp.file);
            },
          );
          const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
            setUploadProgress(p),
          );
          return {
            url: blob.getDirectURL(),
            blob,
            mediaType: (mp.mediaType === "video"
              ? MediaType.video
              : MediaType.image) as unknown as MediaType,
          };
        }),
      );

      if (editing) {
        await updateReport.mutateAsync({
          id: editing.id,
          title: form.title || undefined,
          description: form.description || undefined,
          resolvedCases: BigInt(form.resolvedCases),
          volunteerCount: BigInt(form.volunteerCount),
          areasCoovered: BigInt(form.areasCoovered),
          reportDate: dateMs,
          media: uploadedMedia.length > 0 ? uploadedMedia : undefined,
        });
        toast.success("Impact report updated");
      } else {
        const req: AddImpactReportRequest = {
          title: form.title,
          description: form.description,
          resolvedCases: BigInt(form.resolvedCases),
          volunteerCount: BigInt(form.volunteerCount),
          areasCoovered: BigInt(form.areasCoovered),
          reportDate: dateMs,
          media: uploadedMedia,
        };
        await addReport.mutateAsync(req);
        toast.success("Impact report added");
      }
      setDialogOpen(false);
      setMediaPreviews([]);
      setUploadProgress(0);
    } catch {
      toast.error("Failed to save impact report");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this impact report?")) return;
    try {
      await deleteReport.mutateAsync(id);
      toast.success("Impact report deleted");
    } catch {
      toast.error("Failed to delete impact report");
    }
  };

  const isPending = addReport.isPending || updateReport.isPending;

  return (
    <AdminLayout>
      <div className="space-y-5" data-ocid="admin_impact.page">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Impact Reports
            </h1>
            <p className="text-sm text-muted-foreground">
              {reports.length} report(s) — Swachhata Prahari campaigns
            </p>
          </div>
          <Button
            type="button"
            onClick={openAdd}
            className="bg-primary hover:bg-primary/90"
            data-ocid="admin_impact.add_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Report
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div
            className="text-center py-20 bg-card border border-border rounded-xl"
            data-ocid="admin_impact.empty_state"
          >
            <TrendingUp className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No impact reports yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Document your campaigns and achievements
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((r, i) => {
              const date = new Date(
                Number(r.reportDate) / 1_000_000,
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              const imageCount = r.media.filter(
                (m) =>
                  (m.mediaType as unknown as MediaType) === MediaType.image,
              ).length;
              const videoCount = r.media.filter(
                (m) =>
                  (m.mediaType as unknown as MediaType) === MediaType.video,
              ).length;
              return (
                <div
                  key={r.id}
                  className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-card"
                  data-ocid={`admin_impact.item.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm">
                      {r.title}
                    </h3>
                    <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                      {r.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        {r.resolvedCases.toString()} resolved
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3.5 h-3.5 text-secondary" />
                        {r.volunteerCount.toString()} volunteers
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {date}
                      </span>
                      {r.media.length > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <ImageIcon className="w-3.5 h-3.5" />
                          {imageCount} img
                          {videoCount > 0 && (
                            <>
                              , <Film className="w-3.5 h-3.5 ml-1" />
                              {videoCount} vid
                            </>
                          )}
                        </span>
                      )}
                    </div>
                    {r.media.length > 0 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto">
                        {r.media.slice(0, 4).map((m, mi) =>
                          (m.mediaType as unknown as MediaType) ===
                          MediaType.image ? (
                            <img
                              key={`${r.id}-m-${mi}`}
                              src={m.blob ? m.blob.getDirectURL() : m.url}
                              alt={`Media ${mi + 1}`}
                              className="w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0"
                            />
                          ) : (
                            <div
                              key={`${r.id}-m-${mi}`}
                              className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center border border-border flex-shrink-0"
                            >
                              <Film className="w-5 h-5 text-muted-foreground" />
                            </div>
                          ),
                        )}
                        {r.media.length > 4 && (
                          <div className="w-12 h-12 rounded-lg bg-muted/80 flex items-center justify-center border border-border flex-shrink-0">
                            <span className="text-xs text-muted-foreground font-medium">
                              +{r.media.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(r)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      aria-label="Edit report"
                      data-ocid={`admin_impact.edit_button.${i + 1}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(r.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                      aria-label="Delete report"
                      data-ocid={`admin_impact.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin_impact.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Impact Report" : "Add Impact Report"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="ir-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ir-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. Sitamarhi Safai Abhiyan — June 2026"
                required
                className="mt-1"
                data-ocid="admin_impact.title_input"
              />
            </div>

            <div>
              <Label htmlFor="ir-desc">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="ir-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Describe the campaign and achievements..."
                rows={3}
                required
                className="mt-1"
                data-ocid="admin_impact.description_textarea"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="ir-resolved">Resolved Cases</Label>
                <Input
                  id="ir-resolved"
                  type="number"
                  min={0}
                  value={form.resolvedCases}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, resolvedCases: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_impact.resolved_input"
                />
              </div>
              <div>
                <Label htmlFor="ir-volunteers">Volunteers</Label>
                <Input
                  id="ir-volunteers"
                  type="number"
                  min={0}
                  value={form.volunteerCount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, volunteerCount: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_impact.volunteers_input"
                />
              </div>
              <div>
                <Label htmlFor="ir-areas">Areas Covered</Label>
                <Input
                  id="ir-areas"
                  type="number"
                  min={0}
                  value={form.areasCoovered}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, areasCoovered: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="admin_impact.areas_input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ir-date">Report Date</Label>
              <Input
                id="ir-date"
                type="date"
                value={form.reportDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, reportDate: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin_impact.date_input"
              />
            </div>

            <div>
              <Label>Media — Images &amp; Videos</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleMediaFiles}
                data-ocid="admin_impact.media_upload"
              />
              <div className="mt-2 space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Add Images / Videos
                </Button>
                <p className="text-xs text-muted-foreground">
                  Select multiple files — JPG, PNG, WEBP, MP4 — max 10MB each
                </p>
                {mediaPreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mediaPreviews.map((mp, idx) => (
                      <div
                        key={`${mp.file.name}-${idx}`}
                        className="relative group w-16 h-16 rounded-lg border border-border overflow-hidden bg-muted"
                      >
                        {mp.mediaType === "image" ? (
                          <img
                            src={mp.preview}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(idx)}
                          className="absolute top-0.5 right-0.5 bg-destructive/80 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove media"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                        <Badge
                          className={`absolute bottom-0 left-0 right-0 text-center py-0 text-xs rounded-none rounded-b-lg border-0 ${
                            mp.mediaType === "video"
                              ? "bg-secondary/80 text-white"
                              : "bg-primary/80 text-white"
                          }`}
                        >
                          {mp.mediaType === "video" ? "Vid" : "Img"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
                {isPending && uploadProgress > 0 && (
                  <div className="mt-1">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin_impact.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={isPending}
                data-ocid="admin_impact.submit_button"
              >
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editing ? "Save Changes" : "Add Report"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
