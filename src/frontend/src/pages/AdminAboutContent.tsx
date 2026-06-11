import type { CoreValue } from "@/backend";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAboutContent, useUpdateAboutContent } from "@/hooks/useReports";
import { Loader2, Minus, Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminAboutContent() {
  const { data: content, isLoading } = useAboutContent();
  const { mutateAsync: save, isPending } = useUpdateAboutContent();

  const [story, setStory] = useState("");
  const [values, setValues] = useState<CoreValue[]>([]);

  useEffect(() => {
    if (content) {
      setStory(content.organizationStory);
      setValues(content.coreValues.map((v) => ({ ...v })));
    }
  }, [content]);

  const addValue = () => {
    if (values.length >= 4) {
      toast.error("Maximum 4 core values allowed");
      return;
    }
    setValues((v) => [...v, { title: "", description: "" }]);
  };

  const removeValue = (index: number) => {
    setValues((v) => v.filter((_, i) => i !== index));
  };

  const updateValue = (
    index: number,
    field: keyof CoreValue,
    value: string,
  ) => {
    setValues((v) =>
      v.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await save({
        organizationStory: story,
        coreValues: values.filter((v) => v.title.trim()),
      });
      toast.success("About content saved successfully!");
    } catch {
      toast.error("Failed to save about content");
    }
  };

  if (isLoading || !content) {
    return (
      <AdminLayout>
        <div className="space-y-4 max-w-3xl">
          {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((id) => (
            <Skeleton key={id} className="h-14" />
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form
        onSubmit={handleSave}
        className="space-y-6 max-w-3xl"
        data-ocid="admin_about_content.page"
      >
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            About Page Content
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage the organization story and core values.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-2">
            Organization Story
          </h2>
          <div>
            <Label htmlFor="orgStory">Story</Label>
            <Textarea
              id="orgStory"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={6}
              placeholder="Write the organization's story..."
              className="mt-1"
              data-ocid="admin_about_content.story_textarea"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="font-semibold text-foreground">Core Values</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addValue}
              disabled={values.length >= 4}
              data-ocid="admin_about_content.add_value_button"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Value
            </Button>
          </div>

          {values.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No core values added yet. Click "Add Value" to create one.
            </p>
          )}

          <div className="space-y-4">
            {values.map((v, i) => (
              <div
                key={v.title || i}
                className="border border-border rounded-lg p-4 space-y-3"
                data-ocid={`admin_about_content.value_item.${i + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Value {i + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-destructive"
                    onClick={() => removeValue(i)}
                    data-ocid={`admin_about_content.remove_value_button.${i + 1}`}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <Label htmlFor={`valTitle-${i}`}>Title</Label>
                  <Input
                    id={`valTitle-${i}`}
                    value={v.title}
                    onChange={(e) => updateValue(i, "title", e.target.value)}
                    placeholder="e.g. Integrity"
                    className="mt-1"
                    data-ocid={`admin_about_content.value_title_input.${i + 1}`}
                  />
                </div>
                <div>
                  <Label htmlFor={`valDesc-${i}`}>Description</Label>
                  <Textarea
                    id={`valDesc-${i}`}
                    value={v.description}
                    onChange={(e) =>
                      updateValue(i, "description", e.target.value)
                    }
                    placeholder="Describe this core value..."
                    rows={2}
                    className="mt-1"
                    data-ocid={`admin_about_content.value_desc_textarea.${i + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary/90 font-semibold"
          data-ocid="admin_about_content.save_button"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </AdminLayout>
  );
}
