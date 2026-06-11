import {
  type AddTeamMemberRequest,
  ExternalBlob,
  type TeamMember,
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
  useAddTeamMember,
  useDeleteTeamMember,
  useTeamMembers,
  useUpdateTeamMember,
} from "@/hooks/useReports";
import {
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Upload,
  UserCircle2,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type FormState = {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  order: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  role: "",
  bio: "",
  photoUrl: "",
  order: "0",
};

export default function AdminTeam() {
  const { token } = useAdmin();
  const { data: members = [], isLoading } = useTeamMembers();
  const addMember = useAddTeamMember(token);
  const updateMember = useUpdateTeamMember(token);
  const deleteMember = useDeleteTeamMember(token);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sorted = [...members].sort((a, b) => Number(a.order) - Number(b.order));

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
    setPhotoPreview(null);
    setDialogOpen(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio ?? "",
      photoUrl: m.photoUrl ?? "",
      order: m.order.toString(),
    });
    setPhotoFile(null);
    setPhotoPreview(m.photoUrl ?? null);
    setDialogOpen(true);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let photoUrl = form.photoUrl;
    if (photoFile) {
      const bytes = await new Promise<Uint8Array<ArrayBuffer>>((res, rej) => {
        const reader = new FileReader();
        reader.onload = (ev) =>
          res(new Uint8Array(ev.target?.result as ArrayBuffer));
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
          name: form.name || undefined,
          role: form.role || undefined,
          bio: form.bio || undefined,
          photoUrl: photoUrl || undefined,
          order: form.order ? BigInt(form.order) : undefined,
        });
        toast.success("Team member updated");
      } else {
        const req: AddTeamMemberRequest = {
          name: form.name,
          role: form.role,
          bio: form.bio || undefined,
          photoUrl: photoUrl || undefined,
          order: BigInt(form.order || "0"),
        };
        await addMember.mutateAsync(req);
        toast.success("Team member added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save team member");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await deleteMember.mutateAsync(id);
      toast.success("Team member deleted");
    } catch {
      toast.error("Failed to delete team member");
    }
  };

  const isPending = addMember.isPending || updateMember.isPending;

  return (
    <AdminLayout>
      <div className="space-y-5" data-ocid="admin_team.page">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Our Team
            </h1>
            <p className="text-sm text-muted-foreground">
              {members.length} member(s) — Swachhata Prahari team
            </p>
          </div>
          <Button
            type="button"
            onClick={openAdd}
            className="bg-primary hover:bg-primary/90"
            data-ocid="admin_team.add_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Member
          </Button>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div
            className="text-center py-20 bg-card border border-border rounded-xl"
            data-ocid="admin_team.empty_state"
          >
            <UserCircle2 className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No team members yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Add your first team member using the button above
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((m, i) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-xl p-4 flex gap-4 items-start shadow-card"
                data-ocid={`admin_team.item.${i + 1}`}
              >
                {m.photoUrl ? (
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-primary/20"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UserCircle2 className="w-8 h-8 text-primary/50" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {m.name}
                      </p>
                      <Badge className="text-xs bg-primary/10 text-primary border-primary/20 mt-1">
                        {m.role}
                      </Badge>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => openEdit(m)}
                        className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Edit member"
                        data-ocid={`admin_team.edit_button.${i + 1}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                        aria-label="Delete member"
                        data-ocid={`admin_team.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {m.bio && (
                    <p className="text-muted-foreground text-xs mt-2 line-clamp-2">
                      {m.bio}
                    </p>
                  )}
                  <p className="text-muted-foreground/60 text-xs mt-1">
                    Order: {m.order.toString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_team.dialog">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Member Photo (optional)</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
                data-ocid="admin_team.photo_upload"
              />
              <div className="mt-2 flex items-center gap-4">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <UserCircle2 className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {photoFile ? "Change Photo" : "Upload Photo"}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="tm-name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="tm-name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Rudra Pratap Singh"
                required
                className="mt-1"
                data-ocid="admin_team.name_input"
              />
            </div>

            <div>
              <Label htmlFor="tm-role">
                Role / Designation <span className="text-destructive">*</span>
              </Label>
              <Input
                id="tm-role"
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value }))
                }
                placeholder="e.g. Founder, Volunteer Coordinator"
                required
                className="mt-1"
                data-ocid="admin_team.role_input"
              />
            </div>

            <div>
              <Label htmlFor="tm-bio">Bio (optional)</Label>
              <Textarea
                id="tm-bio"
                value={form.bio}
                onChange={(e) =>
                  setForm((f) => ({ ...f, bio: e.target.value }))
                }
                placeholder="Short description about this team member..."
                rows={3}
                className="mt-1"
                data-ocid="admin_team.bio_textarea"
              />
            </div>

            <div>
              <Label htmlFor="tm-order">Display Order</Label>
              <Input
                id="tm-order"
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((f) => ({ ...f, order: e.target.value }))
                }
                min={0}
                className="mt-1"
                data-ocid="admin_team.order_input"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin_team.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={isPending}
                data-ocid="admin_team.submit_button"
              >
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editing ? "Save Changes" : "Add Member"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
