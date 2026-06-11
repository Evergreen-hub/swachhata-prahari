import {
  type AddGalleryItemRequest,
  ExternalBlob,
  GalleryCategory,
  type GalleryItem,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin } from "@/hooks/useAdmin";
import {
  useAddGalleryItem,
  useDeleteGalleryItem,
  useGalleryItems,
} from "@/hooks/useReports";
import { Film, ImageOff, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type LocalMediaType = "image" | "video";

type FormState = {
  title: string;
  description: string;
  mediaType: LocalMediaType;
  isPublic: boolean;
  isDonorOnly: boolean;
};

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  mediaType: "image",
  isPublic: true,
  isDonorOnly: false,
};

export default function AdminGallery() {
  const { token } = useAdmin();
  const { data: items = [], isLoading } = useGalleryItems(token);
  const addItem = useAddGalleryItem(token);
  const deleteItem = useDeleteGalleryItem(token);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVid = file.type.startsWith("video/");
    setMediaFile(file);
    setForm((f) => ({ ...f, mediaType: isVid ? "video" : "image" }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaFile) {
      toast.error("Please select a media file");
      return;
    }
    try {
      const bytes = await new Promise<Uint8Array<ArrayBuffer>>((res, rej) => {
        const reader = new FileReader();
        reader.onload = (ev) =>
          res(new Uint8Array(ev.target?.result as ArrayBuffer));
        reader.onerror = rej;
        reader.readAsArrayBuffer(mediaFile);
      });
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
        setUploadProgress(p),
      );
      const mediaTypeEnum =
        form.mediaType === "video" ? MediaType.video : MediaType.image;
      const category = form.isDonorOnly
        ? GalleryCategory.donor
        : GalleryCategory.general;
      const req: AddGalleryItemRequest = {
        url: blob.getDirectURL(),
        blob,
        title: form.title || undefined,
        description: form.description || undefined,
        mediaType: mediaTypeEnum as unknown as GalleryItem["mediaType"],
        category,
      };
      await addItem.mutateAsync(req);
      toast.success("Media added to gallery");
      setDialogOpen(false);
      setForm(EMPTY_FORM);
      setMediaFile(null);
      setPreview(null);
      setUploadProgress(0);
    } catch {
      toast.error("Failed to upload media");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    await deleteItem.mutateAsync(id);
    toast.success("Gallery item deleted");
  };

  const categoryLabel = (cat: GalleryCategory) =>
    cat === GalleryCategory.donor ? "Donor Only" : "General";

  return (
    <AdminLayout>
      <div className="space-y-5" data-ocid="admin_gallery.page">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Gallery Management
            </h1>
            <p className="text-sm text-muted-foreground">
              {items.length} item(s) — images and videos
            </p>
          </div>
          <Button
            type="button"
            onClick={() => {
              setDialogOpen(true);
              setForm(EMPTY_FORM);
              setMediaFile(null);
              setPreview(null);
            }}
            className="bg-primary hover:bg-primary/90"
            data-ocid="admin_gallery.add_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Media
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <Skeleton key={k} className="aspect-square rounded-xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div
            className="text-center py-20 bg-card border border-border rounded-xl"
            data-ocid="admin_gallery.empty_state"
          >
            <ImageOff className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              No gallery items yet. Add images or videos above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item: GalleryItem, i: number) => (
              <div
                key={item.id}
                className="relative group rounded-xl overflow-hidden border border-border shadow-card bg-card"
                data-ocid={`admin_gallery.item.${i + 1}`}
              >
                {(item.mediaType as unknown as MediaType) ===
                MediaType.video ? (
                  <div className="aspect-square bg-muted flex flex-col items-center justify-center gap-2">
                    <Film className="w-10 h-10 text-muted-foreground/60" />
                    <span className="text-xs text-muted-foreground">Video</span>
                    {item.title && (
                      <span className="text-xs font-medium truncate px-2 text-center">
                        {item.title}
                      </span>
                    )}
                  </div>
                ) : (
                  <img
                    src={item.blob ? item.blob.getDirectURL() : item.url}
                    alt={item.title ?? `Gallery item ${i + 1}`}
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                  <div className="flex gap-1 flex-wrap">
                    <Badge className="text-xs bg-primary/80 text-white border-0">
                      {(item.mediaType as unknown as MediaType) ===
                      MediaType.video
                        ? "Video"
                        : "Image"}
                    </Badge>
                    <Badge className="text-xs bg-secondary/80 text-white border-0">
                      {categoryLabel(item.category)}
                    </Badge>
                  </div>
                  <div className="flex items-end justify-between">
                    {item.title && (
                      <p className="text-white text-xs font-medium truncate flex-1">
                        {item.title}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="ml-2 p-1.5 rounded-md bg-destructive/80 hover:bg-destructive text-white flex-shrink-0"
                      aria-label="Delete item"
                      data-ocid={`admin_gallery.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_gallery.dialog">
          <DialogHeader>
            <DialogTitle>Add Gallery Media</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Media File (Image or Video)</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="admin_gallery.file_input"
              />
              <button
                type="button"
                className="mt-2 w-full border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Click to upload media file"
                data-ocid="admin_gallery.dropzone"
              >
                {preview ? (
                  form.mediaType === "video" ? (
                    <div className="flex flex-col items-center gap-2">
                      <Film className="w-10 h-10 text-primary" />
                      <p className="text-sm font-medium">{mediaFile?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-32 rounded-lg object-contain mx-auto"
                      />
                      <p className="text-xs text-muted-foreground">
                        {mediaFile?.name} — Click to change
                      </p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="w-8 h-8" />
                    <p className="text-sm">Click to upload image or video</p>
                    <p className="text-xs">JPG, PNG, WEBP, MP4 — max 10MB</p>
                  </div>
                )}
              </button>
              {addItem.isPending && uploadProgress > 0 && (
                <div className="mt-2">
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

            <div>
              <Label htmlFor="gal-title">Title (optional)</Label>
              <Input
                id="gal-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Caption or title"
                className="mt-1"
                data-ocid="admin_gallery.title_input"
              />
            </div>

            <div>
              <Label htmlFor="gal-desc">Description (optional)</Label>
              <Textarea
                id="gal-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Brief description..."
                rows={2}
                className="mt-1"
                data-ocid="admin_gallery.description_textarea"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="isPublic"
                  checked={form.isPublic}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isPublic: v }))
                  }
                  data-ocid="admin_gallery.is_public_switch"
                />
                <Label htmlFor="isPublic" className="cursor-pointer">
                  Public
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="isDonorOnly"
                  checked={form.isDonorOnly}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isDonorOnly: v }))
                  }
                  data-ocid="admin_gallery.is_donor_only_switch"
                />
                <Label htmlFor="isDonorOnly" className="cursor-pointer">
                  Donor Only
                </Label>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin_gallery.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={addItem.isPending || !mediaFile}
                data-ocid="admin_gallery.submit_button"
              >
                {addItem.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Add to Gallery
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
