import type { BlogPost } from "@/backend";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddBlogPost,
  useBlogPosts,
  useDeleteBlogPost,
  useUpdateBlogPost,
} from "@/hooks/useReports";
import { format } from "date-fns";
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FormState {
  title: string;
  content: string;
  category: string;
  tags: string;
  featuredImageUrl: string;
  isPublished: boolean;
}

const EMPTY_FORM: FormState = {
  title: "",
  content: "",
  category: "",
  tags: "",
  featuredImageUrl: "",
  isPublished: false,
};

export default function AdminBlog() {
  const { data: posts, isLoading } = useBlogPosts();
  const addPost = useAddBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      content: post.content,
      category: post.category,
      tags: post.tags.join(", "),
      featuredImageUrl: post.featuredImageUrl ?? "",
      isPublished: post.isPublished,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (editing) {
        await updatePost.mutateAsync({
          id: editing.id,
          title: form.title,
          content: form.content,
          category: form.category,
          tags,
          featuredImageUrl: form.featuredImageUrl || undefined,
          isPublished: form.isPublished,
        });
        toast.success("Blog post updated");
      } else {
        await addPost.mutateAsync({
          title: form.title,
          content: form.content,
          category: form.category,
          tags,
          featuredImageUrl: form.featuredImageUrl || undefined,
          isPublished: form.isPublished,
        });
        toast.success("Blog post published");
      }
      setDialogOpen(false);
      setForm(EMPTY_FORM);
      setEditing(null);
    } catch {
      toast.error(
        editing ? "Failed to update blog post" : "Failed to add blog post",
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost.mutateAsync(id);
      toast.success("Blog post deleted");
    } catch {
      toast.error("Failed to delete blog post");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-5" data-ocid="admin_blog.page">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Blog Posts
            </h1>
            <p className="text-sm text-muted-foreground">
              {posts?.length ?? 0} post(s)
            </p>
          </div>
          <Button
            type="button"
            onClick={openAdd}
            className="bg-primary hover:bg-primary/90"
            data-ocid="admin_blog.add_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Post
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {["sk-1", "sk-2", "sk-3", "sk-4"].map((id) => (
              <Skeleton key={id} className="h-24" />
            ))}
          </div>
        ) : !posts || posts.length === 0 ? (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="admin_blog.empty_state"
          >
            <p className="text-muted-foreground">No blog posts yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post, i) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-xl p-4 shadow-card"
                data-ocid={`admin_blog.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-foreground text-sm">
                        {post.title}
                      </span>
                      {post.isPublished ? (
                        <Badge className="text-xs bg-primary text-primary-foreground">
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Draft
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      🏷️ {post.category}
                      {post.tags.length > 0 && (
                        <span> &nbsp;|&nbsp; {post.tags.join(", ")}</span>
                      )}
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {post.content}
                    </p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {format(
                        Number(post.createdAt) / 1_000_000,
                        "dd MMM yyyy",
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(post)}
                      data-ocid={`admin_blog.edit_button.${i + 1}`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive/30 hover:bg-destructive/5"
                          data-ocid={`admin_blog.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent
                        data-ocid={`admin_blog.delete_dialog.${i + 1}`}
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Post "{post.title}"
                            will be permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            data-ocid={`admin_blog.delete_cancel_button.${i + 1}`}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post.id)}
                            className="bg-destructive text-destructive-foreground"
                            data-ocid={`admin_blog.delete_confirm_button.${i + 1}`}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_blog.dialog">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Blog Post" : "Add Blog Post"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="bp-title">Title</Label>
              <Input
                id="bp-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Post title"
                className="mt-1"
                required
                data-ocid="admin_blog.title_input"
              />
            </div>
            <div>
              <Label htmlFor="bp-content">Content</Label>
              <Textarea
                id="bp-content"
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="Write your post content here..."
                rows={5}
                className="mt-1"
                required
                data-ocid="admin_blog.content_textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bp-category">Category</Label>
                <Input
                  id="bp-category"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  placeholder="e.g. News"
                  className="mt-1"
                  required
                  data-ocid="admin_blog.category_input"
                />
              </div>
              <div>
                <Label htmlFor="bp-tags">Tags (comma-separated)</Label>
                <Input
                  id="bp-tags"
                  value={form.tags}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, tags: e.target.value }))
                  }
                  placeholder="tag1, tag2, tag3"
                  className="mt-1"
                  data-ocid="admin_blog.tags_input"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bp-image">Featured Image URL</Label>
              <Input
                id="bp-image"
                value={form.featuredImageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, featuredImageUrl: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="admin_blog.image_url_input"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="bp-published"
                checked={form.isPublished}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, isPublished: v }))
                }
                data-ocid="admin_blog.published_switch"
              />
              <Label htmlFor="bp-published" className="cursor-pointer">
                Publish immediately
              </Label>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin_blog.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={addPost.isPending || updatePost.isPending}
                data-ocid="admin_blog.submit_button"
              >
                {(addPost.isPending || updatePost.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editing ? "Update" : "Add"} Post
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
