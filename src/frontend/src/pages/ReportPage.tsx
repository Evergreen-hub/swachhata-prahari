import type { ReportCategory } from "@/backend";
import { ExternalBlob } from "@/backend";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BIHAR_DISTRICTS,
  CATEGORY_LABELS,
  WHATSAPP_NUMBER,
  buildWhatsAppMessage,
} from "@/constants";
import { useSubmitReport } from "@/hooks/useReports";
import { Camera, CheckCircle, Loader2, MapPin, Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_MB = 10;

export default function ReportPage() {
  const { mutateAsync: submitReport, isPending } = useSubmitReport();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    district: "",
    location: "",
    category: "",
    description: "",
    gpsLocation: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Naam zaroori hai";
    if (!form.mobile.trim()) e.mobile = "Mobile number zaroori hai";
    else if (!/^\d{10}$/.test(form.mobile.trim()))
      e.mobile = "10-digit mobile number daalein";
    if (!form.district) e.district = "District chunein";
    if (!form.location.trim()) e.location = "Location zaroori hai";
    if (!form.category) e.category = "Category chunein";
    if (!form.description.trim()) e.description = "Vivaran zaroori hai";
    return e;
  };

  const handleImage = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP allowed");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Max image size is ${MAX_SIZE_MB}MB`);
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadProgress(0);
  };

  const getGPS = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({
          ...f,
          gpsLocation: `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
        }));
        setGpsLoading(false);
        toast.success("GPS location captured!");
      },
      () => {
        setGpsLoading(false);
        toast.error("Location access denied");
      },
    );
  };

  const handleFieldBlur = (field: keyof typeof form) => {
    const e = validate();
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Please fill all required fields correctly");
      return;
    }
    setErrors({});
    try {
      let imageBlob: ExternalBlob | undefined = undefined;
      if (imageFile) {
        const bytes = new Uint8Array(await imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
          setUploadProgress(pct),
        );
      }
      const result = await submitReport({
        name: form.name,
        mobile: form.mobile,
        district: form.district,
        location: form.location,
        category: form.category as ReportCategory,
        description: form.description,
        imageBlob,
      });
      setSubmitted(true);
      setSubmittedRef(result.refNumber);
      const catLabel = CATEGORY_LABELS[form.category as ReportCategory];
      const msg = buildWhatsAppMessage({
        name: form.name,
        mobile: form.mobile,
        district: form.district,
        location: form.location,
        category: `${catLabel.hi} / ${catLabel.en}`,
        description: form.description,
        imageUrl: result.imageBlob
          ? result.imageBlob.getDirectURL()
          : undefined,
      });
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,
        "_blank",
        "noopener",
      );
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      name: "",
      mobile: "",
      district: "",
      location: "",
      category: "",
      description: "",
      gpsLocation: "",
    });
    setErrors({});
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  if (submitted) {
    return (
      <Layout>
        <section
          className="min-h-[60vh] flex items-center justify-center bg-background px-4 py-16"
          data-ocid="report.success_state"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="text-center max-w-md w-full"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-primary/20">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Report Submit Ho Gayi! ✅
            </h2>
            <p className="text-muted-foreground mb-6">
              Aapki samasya safaltapurvak darj kar li gayi hai. Hum jald se jald
              sambandhit adhikari ko suchit karenge.
            </p>
            <div className="bg-card border border-border rounded-xl p-5 mb-6 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Reference Number
                </span>
                <Badge className="bg-primary/10 text-primary border-primary/30 font-mono font-semibold">
                  {submittedRef}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                WhatsApp notification bheja ja raha hai
              </div>
            </div>
            <Button
              type="button"
              onClick={resetForm}
              className="w-full bg-primary hover:bg-primary/90 font-semibold"
              size="lg"
              data-ocid="report.submit_another_button"
            >
              Ek Aur Report Karein
            </Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section
        className="bg-muted/30 border-b border-border py-8"
        data-ocid="report.header_section"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-4">
              <img
                src="/assets/icon-report.png"
                alt="Report Cleanliness"
                className="h-20 w-20"
              />
            </div>
            <Badge className="bg-secondary/15 text-secondary border-secondary/30 mb-3">
              🚨 Samasya Report
            </Badge>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
              Report Cleanliness Issue / Samasya Report Karein
            </h1>
            <p className="text-muted-foreground">
              Apni safai samasya ka vivaran darj karein — hum use sambandhit
              adhikari tak pahunchayenge.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-10" data-ocid="report.page">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">
                  Poora Naam <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  onBlur={() => handleFieldBlur("name")}
                  placeholder="Ramesh Kumar"
                  aria-invalid={!!errors.name}
                  data-ocid="report.name_input"
                  className={`mt-1 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.name && (
                  <p
                    className="text-xs text-destructive mt-1"
                    data-ocid="report.name_field_error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="mobile">
                  Mobile Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      mobile: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  onBlur={() => handleFieldBlur("mobile")}
                  placeholder="98765XXXXX"
                  aria-invalid={!!errors.mobile}
                  data-ocid="report.mobile_input"
                  className={`mt-1 ${errors.mobile ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.mobile && (
                  <p
                    className="text-xs text-destructive mt-1"
                    data-ocid="report.mobile_field_error"
                  >
                    {errors.mobile}
                  </p>
                )}
              </div>
            </div>

            {/* District & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>
                  District <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.district}
                  onValueChange={(v) => {
                    setForm((f) => ({ ...f, district: v }));
                    setErrors((prev) => ({ ...prev, district: undefined }));
                  }}
                >
                  <SelectTrigger
                    className={`mt-1 ${errors.district ? "border-destructive" : ""}`}
                    data-ocid="report.district_select"
                  >
                    <SelectValue placeholder="District chunein" />
                  </SelectTrigger>
                  <SelectContent>
                    {BIHAR_DISTRICTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.district && (
                  <p
                    className="text-xs text-destructive mt-1"
                    data-ocid="report.district_field_error"
                  >
                    {errors.district}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="location">
                  Area / Location <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                  onBlur={() => handleFieldBlur("location")}
                  placeholder="Mohalla, Landmark"
                  aria-invalid={!!errors.location}
                  data-ocid="report.location_input"
                  className={`mt-1 ${errors.location ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.location && (
                  <p
                    className="text-xs text-destructive mt-1"
                    data-ocid="report.location_field_error"
                  >
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <Label>
                Problem Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => {
                  setForm((f) => ({ ...f, category: v }));
                  setErrors((prev) => ({ ...prev, category: undefined }));
                }}
              >
                <SelectTrigger
                  className={`mt-1 ${errors.category ? "border-destructive" : ""}`}
                  data-ocid="report.category_select"
                >
                  <SelectValue placeholder="Samasya ki category chunein" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      {val.emoji} {val.hi} / {val.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p
                  className="text-xs text-destructive mt-1"
                  data-ocid="report.category_field_error"
                >
                  {errors.category}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">
                Samasya ka Vivaran <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                onBlur={() => handleFieldBlur("description")}
                placeholder="Samasya ka vistar se vivaran likhein — kab se hai, kitni gambhir hai, kya kya taklif ho rahi hai..."
                rows={4}
                aria-invalid={!!errors.description}
                data-ocid="report.description_textarea"
                className={`mt-1 resize-none ${errors.description ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.description && (
                <p
                  className="text-xs text-destructive mt-1"
                  data-ocid="report.description_field_error"
                >
                  {errors.description}
                </p>
              )}
            </div>

            {/* GPS */}
            <div>
              <Label htmlFor="gps">
                GPS Location{" "}
                <span className="text-muted-foreground text-xs">
                  (Optional)
                </span>
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="gps"
                  value={form.gpsLocation}
                  readOnly
                  placeholder="GPS coordinates"
                  className="bg-muted/50 flex-1 min-w-0"
                  data-ocid="report.gps_input"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={getGPS}
                  disabled={gpsLoading}
                  className="flex-shrink-0 border-primary/30 text-primary hover:bg-primary/5"
                  data-ocid="report.get_gps_button"
                >
                  {gpsLoading ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4 mr-1" />
                  )}
                  GPS
                </Button>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <Label>
                Photo Upload{" "}
                <span className="text-muted-foreground text-xs">
                  (Optional • Max 10MB)
                </span>
              </Label>
              <button
                type="button"
                className="w-full mt-1 border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => fileRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileRef.current?.click();
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files[0];
                  if (f) handleImage(f);
                }}
                aria-label="Photo upload karein — click ya drag & drop"
                data-ocid="report.photo_dropzone"
              >
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-40 rounded-lg mx-auto shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                        setUploadProgress(0);
                      }}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 shadow-sm hover:scale-110 transition-transform"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-3 w-full bg-border rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {imageFile?.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Camera className="w-10 h-10 text-primary/50 mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">
                      Drag & drop ya{" "}
                      <span className="text-primary">browse</span> karein
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG, WEBP • Max 10MB
                    </p>
                  </>
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImage(f);
                }}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 font-bold py-3 text-base shadow-md hover:shadow-lg transition-all"
                disabled={isPending}
                data-ocid="report.submit_button"
                size="lg"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submit ho rahi hai...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Report Submit Karein
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3">
                Submit karne par WhatsApp notification bheja jayega 9263989760
                par.
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}
