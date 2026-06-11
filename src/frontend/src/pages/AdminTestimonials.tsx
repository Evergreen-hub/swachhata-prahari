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
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddTestimonial,
  useDeleteTestimonial,
  useTestimonials,
  useUpdateTestimonial,
} from "@/hooks/useReports";
import { Pencil, Plus, Quote, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TestimonialForm {
  id?: string;
  name: string;
  quote: string;
  role: string;
  photoUrl: string;
  isActive: boolean;
}

const emptyForm: TestimonialForm = {
  name: "",
  quote: "",
  role: "",
  photoUrl: "",
  isActive: true,
};

export default function AdminTestimonials() {
  const { data: testimonials, isLoading } = useTestimonials();
  const { mutateAsync: addTestimonial, isPending: adding } =
    useAddTestimonial();
  const { mutateAsync: updateTestimonial, isPending: updating } =
    useUpdateTestimonial();
  const { mutateAsync: deleteTestimonial } = useDeleteTestimonial();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialForm | null>(null);

  const form = editing ?? emptyForm;
  const isEditing = !!editing?.id;
  const isPending = adding || updating;

  const reset = () => {
    setEditing(null);
    setOpen(false);
  };

  const setForm = (patch: Partial<TestimonialForm>) =>
    setEditing((prev) => ({
      ...(prev ?? emptyForm),
      ...patch,
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) {
      toast.error("Name and quote are required");
      return;
    }
    try {
      if (isEditing && form.id) {
        await updateTestimonial({
          id: form.id,
          name: form.name,
          quote: form.quote,
          role: form.role,
          photoUrl: form.photoUrl || undefined,
          isActive: form.isActive,
        });
        toast.success("Testimonial updated");
      } else {
        await addTestimonial({
          name: form.name,
          quote: form.quote,
          role: form.role,
          photoUrl: form.photoUrl || undefined,
          isActive: form.isActive,
        });
        toast.success("Testimonial added");
      }
      reset();
    } catch {
      toast.error(isEditing ? "Failed to update" : "Failed to add");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const startEdit = (t: NonNullable<typeof testimonials>[number]) => {
    setEditing({
      id: t.id,
      name: t.name,
      quote: t.quote,
      role: t.role,
      photoUrl: t.photoUrl ?? "",
      isActive: t.isActive,
    });
    setOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-5" data-ocid="admin_testimonials.page">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Testimonials
            </h1>
            <p className="text-sm text-muted-foreground">
              {testimonials?.length ?? 0} testimonial(s)
            </p>
          </div>
          <Button
            type="button"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            data-ocid="admin_testimonials.add_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {["sk-1", "sk-2", "sk-3"].map((id) => (
              <Skeleton key={id} className="h-24" />
            ))}
          </div>
        ) : !testimonials || testimonials.length === 0 ? (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="admin_testimonials.empty_state"
          >
            <Quote className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No testimonials found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="bg-card border border-border rounded-xl p-4 shadow-card flex items-start justify-between gap-4"
                data-ocid={`admin_testimonials.item.${i + 1}`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {t.photoUrl ? (
                    <img
                      src={t.photoUrl}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm flex-shrink-0">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-foreground text-sm">
                        {t.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t.role}
                      </span>
                      <Badge
                        variant={t.isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {t.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground italic line-clamp-2">
                      "{t.quote}"
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(t)}
                    data-ocid={`admin_testimonials.edit_button.${i + 1}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive/30 hover:bg-destructive/5"
                        data-ocid={`admin_testimonials.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent
                      data-ocid={`admin_testimonials.delete_dialog.${i + 1}`}
                    >
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Testimonial?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. Testimonial by {t.name}{" "}
                          will be permanently deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          data-ocid={`admin_testimonials.delete_cancel_button.${i + 1}`}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(t.id)}
                          className="bg-destructive text-destructive-foreground"
                          data-ocid={`admin_testimonials.delete_confirm_button.${i + 1}`}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="admin_testimonials.form_dialog">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the testimonial details."
                : "Add a new testimonial to the website."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <Label htmlFor="tName">Name</Label>
              <Input
                id="tName"
                value={form.name}
                onChange={(e) => setForm({ name: e.target.value })}
                placeholder="e.g. Ramesh Kumar"
                className="mt-1"
                data-ocid="admin_testimonials.name_input"
              />
            </div>
            <div>
              <Label htmlFor="tRole">Role / Designation</Label>
              <Input
                id="tRole"
                value={form.role}
                onChange={(e) => setForm({ role: e.target.value })}
                placeholder="e.g. Volunteer, Sitamarhi"
                className="mt-1"
                data-ocid="admin_testimonials.role_input"
              />
            </div>
            <div>
              <Label htmlFor="tQuote">Quote</Label>
              <Textarea
                id="tQuote"
                value={form.quote}
                onChange={(e) => setForm({ quote: e.target.value })}
                placeholder="Their testimonial..."
                rows={3}
                className="mt-1"
                data-ocid="admin_testimonials.quote_textarea"
              />
            </div>
            <div>
              <Label htmlFor="tPhotoUrl">Photo URL (optional)</Label>
              <Input
                id="tPhotoUrl"
                value={form.photoUrl}
                onChange={(e) => setForm({ photoUrl: e.target.value })}
                placeholder="https://..."
                className="mt-1"
                data-ocid="admin_testimonials.photo_url_input"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="tActive"
                checked={form.isActive}
                onCheckedChange={(v) => setForm({ isActive: v })}
                data-ocid="admin_testimonials.active_switch"
              />
              <Label htmlFor="tActive" className="cursor-pointer">
                Active (visible on website)
              </Label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={reset}
                data-ocid="admin_testimonials.form_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                data-ocid="admin_testimonials.form_submit_button"
              >
                {isPending
                  ? isEditing
                    ? "Updating..."
                    : "Adding..."
                  : isEditing
                    ? "Update"
                    : "Add"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
