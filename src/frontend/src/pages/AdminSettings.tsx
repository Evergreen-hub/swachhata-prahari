import { ExternalBlob } from "@/backend";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin } from "@/hooks/useAdmin";
import { useSaveSettings, useSettings } from "@/hooks/useReports";
import type { Settings, SocialLinks } from "@/types";
import { Loader2, Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TABS = [
  { id: "general", label: "General" },
  { id: "donation", label: "Donation Details" },
  { id: "founder", label: "Founder Info" },
];

export default function AdminSettings() {
  const { token } = useAdmin();
  const { data: settings, isLoading } = useSettings();
  const { mutateAsync: saveSettings, isPending } = useSaveSettings(token);
  const [form, setForm] = useState<Settings | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [upiQrFile, setUpiQrFile] = useState<File | null>(null);
  const [founderPhotoFile, setFounderPhotoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (settings && !form) setForm(settings);
  }, [settings, form]);

  const update = (field: keyof Settings, value: string) =>
    setForm((f) => (f ? { ...f, [field]: value } : f));

  const updateSocial = (field: keyof SocialLinks, value: string) =>
    setForm((f) =>
      f
        ? {
            ...f,
            socialLinks: { ...f.socialLinks, [field]: value || undefined },
          }
        : f,
    );

  const readFileAsBytes = (file: File): Promise<Uint8Array<ArrayBuffer>> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) =>
        resolve(new Uint8Array(e.target?.result as ArrayBuffer));
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setUploading(true);
    try {
      let updatedForm = { ...form };
      if (upiQrFile) {
        const bytes = await readFileAsBytes(upiQrFile);
        const blob = ExternalBlob.fromBytes(bytes);
        updatedForm.upiQrImageUrl = blob.getDirectURL();
      }
      if (founderPhotoFile) {
        const bytes = await readFileAsBytes(founderPhotoFile);
        const blob = ExternalBlob.fromBytes(bytes);
        updatedForm.founderPhoto = blob.getDirectURL();
      }
      await saveSettings(updatedForm);
      toast.success("Settings saved successfully!");
      setUpiQrFile(null);
      setFounderPhotoFile(null);
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading || !form) {
    return (
      <AdminLayout>
        <div className="space-y-4">
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
        data-ocid="admin_settings.page"
      >
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Website configuration — Swachhata Prahari
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === t.id
                  ? "bg-card border border-border border-b-card -mb-px text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`admin_settings.tab_${t.id}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === "general" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-4">
              <h2 className="font-semibold text-foreground border-b border-border pb-2">
                Website Information
              </h2>
              <div>
                <Label htmlFor="siteName">Website Name</Label>
                <Input
                  id="siteName"
                  value={form.websiteName}
                  onChange={(e) => update("websiteName", e.target.value)}
                  className="mt-1"
                  data-ocid="admin_settings.website_name_input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input
                    id="phone"
                    value={form.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    className="mt-1"
                    data-ocid="admin_settings.contact_phone_input"
                  />
                </div>
                <div>
                  <Label htmlFor="waNum">WhatsApp Number</Label>
                  <Input
                    id="waNum"
                    value={form.whatsappNumber}
                    onChange={(e) => update("whatsappNumber", e.target.value)}
                    className="mt-1"
                    data-ocid="admin_settings.whatsapp_number_input"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => update("contactEmail", e.target.value)}
                  className="mt-1"
                  data-ocid="admin_settings.contact_email_input"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="mt-1"
                  data-ocid="admin_settings.location_input"
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-4">
              <h2 className="font-semibold text-foreground border-b border-border pb-2">
                Social Links
              </h2>
              {(["facebook", "instagram", "youtube", "twitter"] as const).map(
                (platform) => (
                  <div key={platform}>
                    <Label htmlFor={platform} className="capitalize">
                      {platform}
                    </Label>
                    <Input
                      id={platform}
                      value={form.socialLinks[platform] ?? ""}
                      onChange={(e) => updateSocial(platform, e.target.value)}
                      placeholder={`https://${platform}.com/...`}
                      className="mt-1"
                      data-ocid={`admin_settings.${platform}_input`}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* Donation Details Tab */}
        {activeTab === "donation" && (
          <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
            <h2 className="font-semibold text-foreground border-b border-border pb-2">
              Donation Details
            </h2>

            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                value={form.upiId ?? ""}
                onChange={(e) => update("upiId", e.target.value)}
                placeholder="e.g. swachtaprahari@upi"
                className="mt-1"
                data-ocid="admin_settings.upi_id_input"
              />
            </div>

            <div>
              <Label>UPI QR Code Image</Label>
              <div className="mt-2 flex items-start gap-4">
                {(upiQrFile
                  ? URL.createObjectURL(upiQrFile)
                  : form.upiQrImageUrl) && (
                  <img
                    src={
                      upiQrFile
                        ? URL.createObjectURL(upiQrFile)
                        : form.upiQrImageUrl
                    }
                    alt="UPI QR"
                    className="w-24 h-24 object-contain border border-border rounded-lg bg-white"
                  />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    id="upiQrUpload"
                    className="hidden"
                    onChange={(e) => setUpiQrFile(e.target.files?.[0] ?? null)}
                    data-ocid="admin_settings.upi_qr_upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("upiQrUpload")?.click()
                    }
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {upiQrFile ? "Change QR Image" : "Upload QR Image"}
                  </Button>
                  {upiQrFile && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {upiQrFile.name}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WEBP — max 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="bankAccount">Bank Account Number</Label>
                <Input
                  id="bankAccount"
                  value={form.bankAccountNumber ?? ""}
                  onChange={(e) => update("bankAccountNumber", e.target.value)}
                  placeholder="Account number"
                  className="mt-1"
                  data-ocid="admin_settings.bank_account_input"
                />
              </div>
              <div>
                <Label htmlFor="bankIfsc">IFSC Code</Label>
                <Input
                  id="bankIfsc"
                  value={form.bankIfsc ?? ""}
                  onChange={(e) => update("bankIfsc", e.target.value)}
                  placeholder="SBIN0001234"
                  className="mt-1"
                  data-ocid="admin_settings.bank_ifsc_input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bankHolder">Account Holder Name</Label>
              <Input
                id="bankHolder"
                value={form.bankAccountHolder ?? ""}
                onChange={(e) => update("bankAccountHolder", e.target.value)}
                placeholder="Name as in bank records"
                className="mt-1"
                data-ocid="admin_settings.bank_holder_input"
              />
            </div>
          </div>
        )}

        {/* Founder Info Tab */}
        {activeTab === "founder" && (
          <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
            <h2 className="font-semibold text-foreground border-b border-border pb-2">
              Founder Information
            </h2>

            <div>
              <Label htmlFor="founderName">Founder Name</Label>
              <Input
                id="founderName"
                value={form.founderName ?? ""}
                onChange={(e) => update("founderName", e.target.value)}
                placeholder="e.g. Rudra Pratap Singh"
                className="mt-1"
                data-ocid="admin_settings.founder_name_input"
              />
            </div>

            <div>
              <Label htmlFor="founderBio">Founder Bio</Label>
              <Textarea
                id="founderBio"
                value={form.founderBio ?? ""}
                onChange={(e) => update("founderBio", e.target.value)}
                placeholder="Short biography of the founder..."
                rows={4}
                className="mt-1"
                data-ocid="admin_settings.founder_bio_textarea"
              />
            </div>

            <div>
              <Label>Founder Photo</Label>
              <div className="mt-2 flex items-start gap-4">
                {(founderPhotoFile
                  ? URL.createObjectURL(founderPhotoFile)
                  : form.founderPhoto) && (
                  <img
                    src={
                      founderPhotoFile
                        ? URL.createObjectURL(founderPhotoFile)
                        : form.founderPhoto
                    }
                    alt="Founder"
                    className="w-20 h-20 object-cover rounded-full border border-border"
                  />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    id="founderPhotoUpload"
                    className="hidden"
                    onChange={(e) =>
                      setFounderPhotoFile(e.target.files?.[0] ?? null)
                    }
                    data-ocid="admin_settings.founder_photo_upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("founderPhotoUpload")?.click()
                    }
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {founderPhotoFile ? "Change Photo" : "Upload Photo"}
                  </Button>
                  {founderPhotoFile && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {founderPhotoFile.name}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WEBP — max 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={isPending || uploading}
          className="bg-primary hover:bg-primary/90 font-semibold"
          data-ocid="admin_settings.save_button"
        >
          {isPending || uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </form>
    </AdminLayout>
  );
}
