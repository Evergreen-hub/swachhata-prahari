import { DocumentCategory } from "@/backend";
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
  useAddDocument,
  useDeleteDocument,
  useDocuments,
} from "@/hooks/useReports";
import { FileText, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORY_OPTIONS: { value: DocumentCategory; label: string }[] = [
  { value: DocumentCategory.annualReport, label: "Annual Report" },
  { value: DocumentCategory.auditReport, label: "Audit Report" },
  { value: DocumentCategory.policy, label: "Policy" },
  { value: DocumentCategory.legal, label: "Legal Document" },
  { value: DocumentCategory.certificate, label: "Certificate" },
  { value: DocumentCategory.other, label: "Other" },
];

const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  [DocumentCategory.annualReport]: "Annual Report",
  [DocumentCategory.auditReport]: "Audit Report",
  [DocumentCategory.policy]: "Policy",
  [DocumentCategory.legal]: "Legal Document",
  [DocumentCategory.certificate]: "Certificate",
  [DocumentCategory.other]: "Other",
};

export default function AdminDocuments() {
  const { data: documents, isLoading } = useDocuments();
  const { mutateAsync: addDocument, isPending: adding } = useAddDocument();
  const { mutateAsync: deleteDocument } = useDeleteDocument();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    fileUrl: "",
    category: DocumentCategory.other,
  });

  const resetForm = () =>
    setForm({
      title: "",
      description: "",
      fileUrl: "",
      category: DocumentCategory.other,
    });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.fileUrl.trim()) {
      toast.error("Title and File URL are required");
      return;
    }
    try {
      await addDocument(form);
      toast.success("Document added successfully");
      resetForm();
      setOpen(false);
    } catch {
      toast.error("Failed to add document");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id);
      toast.success("Document deleted");
    } catch {
      toast.error("Failed to delete document");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-5" data-ocid="admin_documents.page">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Documents
            </h1>
            <p className="text-sm text-muted-foreground">
              {documents?.length ?? 0} document(s)
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setOpen(true)}
            data-ocid="admin_documents.add_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Document
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {["sk-1", "sk-2", "sk-3"].map((id) => (
              <Skeleton key={id} className="h-20" />
            ))}
          </div>
        ) : !documents || documents.length === 0 ? (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="admin_documents.empty_state"
          >
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No documents found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc, i) => (
              <div
                key={doc.id}
                className="bg-card border border-border rounded-xl p-4 shadow-card flex items-start justify-between gap-4"
                data-ocid={`admin_documents.item.${i + 1}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-foreground text-sm">
                      {doc.title}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {CATEGORY_LABELS[doc.category]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {doc.description}
                  </p>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 inline-block"
                  >
                    View File →
                  </a>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive/30 hover:bg-destructive/5 flex-shrink-0"
                      data-ocid={`admin_documents.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    data-ocid={`admin_documents.delete_dialog.${i + 1}`}
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Document?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. "{doc.title}" will be
                        permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        data-ocid={`admin_documents.delete_cancel_button.${i + 1}`}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(doc.id)}
                        className="bg-destructive text-destructive-foreground"
                        data-ocid={`admin_documents.delete_confirm_button.${i + 1}`}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Document Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="admin_documents.add_dialog">
          <DialogHeader>
            <DialogTitle>Add Document</DialogTitle>
            <DialogDescription>
              Upload a document URL and categorize it.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4 mt-2">
            <div>
              <Label htmlFor="docTitle">Title</Label>
              <Input
                id="docTitle"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="e.g. Annual Report 2024"
                className="mt-1"
                data-ocid="admin_documents.title_input"
              />
            </div>
            <div>
              <Label htmlFor="docDesc">Description</Label>
              <Textarea
                id="docDesc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Short description..."
                rows={3}
                className="mt-1"
                data-ocid="admin_documents.description_textarea"
              />
            </div>
            <div>
              <Label htmlFor="docCategory">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, category: v as DocumentCategory }))
                }
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="admin_documents.category_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="docFileUrl">File URL</Label>
              <Input
                id="docFileUrl"
                value={form.fileUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fileUrl: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="admin_documents.file_url_input"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Paste the URL of the uploaded file (PDF, DOCX, etc.)
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
                data-ocid="admin_documents.add_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={adding}
                data-ocid="admin_documents.add_submit_button"
              >
                {adding ? "Adding..." : "Add Document"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
