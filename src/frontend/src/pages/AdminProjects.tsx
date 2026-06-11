import { type Project, ProjectStatus } from "@/backend";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "@/hooks/useReports";
import { format } from "date-fns";
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_LABELS: Record<string, string> = {
  [ProjectStatus.active]: "Active",
  [ProjectStatus.completed]: "Completed",
  [ProjectStatus.planning]: "Planning",
};

const STATUS_COLORS: Record<string, string> = {
  [ProjectStatus.active]: "bg-primary text-primary-foreground",
  [ProjectStatus.completed]: "bg-secondary text-secondary-foreground",
  [ProjectStatus.planning]: "bg-muted text-muted-foreground",
};

interface FormState {
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  progressPercent: number;
  featuredImageUrl: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  category: "",
  status: ProjectStatus.active,
  progressPercent: 0,
  featuredImageUrl: "",
};

export default function AdminProjects() {
  const { data: projects, isLoading } = useProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      progressPercent: Number(project.progressPercent),
      featuredImageUrl: project.featuredImageUrl ?? "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          featuredImageUrl: form.featuredImageUrl || undefined,
        });
        toast.success("Project updated");
      } else {
        await addProject.mutateAsync({
          title: form.title,
          description: form.description,
          category: form.category,
          status: form.status,
          progressPercent: BigInt(form.progressPercent),
          featuredImageUrl: form.featuredImageUrl || undefined,
        });
        toast.success("Project added");
      }
      setDialogOpen(false);
      setForm(EMPTY_FORM);
      setEditing(null);
    } catch {
      toast.error(
        editing ? "Failed to update project" : "Failed to add project",
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject.mutateAsync(id);
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-5" data-ocid="admin_projects.page">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground">
              {projects?.length ?? 0} project(s)
            </p>
          </div>
          <Button
            type="button"
            onClick={openAdd}
            className="bg-primary hover:bg-primary/90"
            data-ocid="admin_projects.add_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {["sk-1", "sk-2", "sk-3", "sk-4"].map((id) => (
              <Skeleton key={id} className="h-24" />
            ))}
          </div>
        ) : !projects || projects.length === 0 ? (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="admin_projects.empty_state"
          >
            <p className="text-muted-foreground">No projects yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
                data-ocid={`admin_projects.item.${i + 1}`}
              >
                {p.featuredImageUrl && (
                  <img
                    src={p.featuredImageUrl}
                    alt={p.title}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {p.category}
                      </p>
                    </div>
                    <Badge className={`text-xs ${STATUS_COLORS[p.status]}`}>
                      {STATUS_LABELS[p.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">
                    {p.description}
                  </p>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {Number(p.progressPercent)}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${Number(p.progressPercent)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-muted-foreground">
                      {format(Number(p.createdAt) / 1_000_000, "dd MMM yyyy")}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(p)}
                        data-ocid={`admin_projects.edit_button.${i + 1}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive border-destructive/30 hover:bg-destructive/5"
                            data-ocid={`admin_projects.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent
                          data-ocid={`admin_projects.delete_dialog.${i + 1}`}
                        >
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. Project "{p.title}"
                              will be permanently deleted.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              data-ocid={`admin_projects.delete_cancel_button.${i + 1}`}
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(p.id)}
                              className="bg-destructive text-destructive-foreground"
                              data-ocid={`admin_projects.delete_confirm_button.${i + 1}`}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_projects.dialog">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="proj-title">Title</Label>
              <Input
                id="proj-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Project title"
                className="mt-1"
                required
                data-ocid="admin_projects.title_input"
              />
            </div>
            <div>
              <Label htmlFor="proj-desc">Description</Label>
              <Textarea
                id="proj-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Project description..."
                rows={3}
                className="mt-1"
                required
                data-ocid="admin_projects.description_textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="proj-category">Category</Label>
                <Input
                  id="proj-category"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  placeholder="e.g. Sanitation"
                  className="mt-1"
                  required
                  data-ocid="admin_projects.category_input"
                />
              </div>
              <div>
                <Label htmlFor="proj-status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, status: v as ProjectStatus }))
                  }
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="admin_projects.status_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ProjectStatus.active}>Active</SelectItem>
                    <SelectItem value={ProjectStatus.planning}>
                      Planning
                    </SelectItem>
                    <SelectItem value={ProjectStatus.completed}>
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="proj-progress">
                Progress ({form.progressPercent}%)
              </Label>
              <Input
                id="proj-progress"
                type="number"
                min={0}
                max={100}
                value={form.progressPercent}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    progressPercent: Math.min(
                      100,
                      Math.max(0, Number(e.target.value)),
                    ),
                  }))
                }
                className="mt-1"
                data-ocid="admin_projects.progress_input"
              />
            </div>
            <div>
              <Label htmlFor="proj-image">Featured Image URL</Label>
              <Input
                id="proj-image"
                value={form.featuredImageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, featuredImageUrl: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="admin_projects.image_url_input"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin_projects.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={addProject.isPending || updateProject.isPending}
                data-ocid="admin_projects.submit_button"
              >
                {(addProject.isPending || updateProject.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editing ? "Update" : "Add"} Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
