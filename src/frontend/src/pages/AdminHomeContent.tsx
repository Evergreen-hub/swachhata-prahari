import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useHomeContent, useUpdateHomeContent } from "@/hooks/useReports";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminHomeContent() {
  const { data: content, isLoading } = useHomeContent();
  const { mutateAsync: save, isPending } = useUpdateHomeContent();

  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    missionText: "",
    visionText: "",
    ctaButtonText: "",
    ctaButtonLink: "",
  });

  useEffect(() => {
    if (content) {
      setForm({
        heroTitle: content.heroTitle,
        heroSubtitle: content.heroSubtitle,
        missionText: content.missionText,
        visionText: content.visionText,
        ctaButtonText: content.ctaButtonText,
        ctaButtonLink: content.ctaButtonLink,
      });
    }
  }, [content]);

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await save({
        heroTitle: form.heroTitle,
        heroSubtitle: form.heroSubtitle,
        missionText: form.missionText,
        visionText: form.visionText,
        ctaButtonText: form.ctaButtonText,
        ctaButtonLink: form.ctaButtonLink,
      });
      toast.success("Home content saved successfully!");
    } catch {
      toast.error("Failed to save home content");
    }
  };

  if (isLoading || !content) {
    return (
      <AdminLayout>
        <div className="space-y-4 max-w-3xl">
          {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((id) => (
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
        data-ocid="admin_home_content.page"
      >
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Home Page Content
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage the content displayed on the homepage.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-2">
            Hero Section
          </h2>
          <div>
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input
              id="heroTitle"
              value={form.heroTitle}
              onChange={(e) => update("heroTitle", e.target.value)}
              className="mt-1"
              data-ocid="admin_home_content.hero_title_input"
            />
          </div>
          <div>
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Textarea
              id="heroSubtitle"
              value={form.heroSubtitle}
              onChange={(e) => update("heroSubtitle", e.target.value)}
              rows={3}
              className="mt-1"
              data-ocid="admin_home_content.hero_subtitle_textarea"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-2">
            Mission & Vision
          </h2>
          <div>
            <Label htmlFor="missionText">Mission</Label>
            <Textarea
              id="missionText"
              value={form.missionText}
              onChange={(e) => update("missionText", e.target.value)}
              rows={4}
              className="mt-1"
              data-ocid="admin_home_content.mission_textarea"
            />
          </div>
          <div>
            <Label htmlFor="visionText">Vision</Label>
            <Textarea
              id="visionText"
              value={form.visionText}
              onChange={(e) => update("visionText", e.target.value)}
              rows={4}
              className="mt-1"
              data-ocid="admin_home_content.vision_textarea"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-2">
            Call to Action
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText">Button Text</Label>
              <Input
                id="ctaText"
                value={form.ctaButtonText}
                onChange={(e) => update("ctaButtonText", e.target.value)}
                className="mt-1"
                data-ocid="admin_home_content.cta_text_input"
              />
            </div>
            <div>
              <Label htmlFor="ctaLink">Button Link</Label>
              <Input
                id="ctaLink"
                value={form.ctaButtonLink}
                onChange={(e) => update("ctaButtonLink", e.target.value)}
                placeholder="/report"
                className="mt-1"
                data-ocid="admin_home_content.cta_link_input"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary/90 font-semibold"
          data-ocid="admin_home_content.save_button"
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
