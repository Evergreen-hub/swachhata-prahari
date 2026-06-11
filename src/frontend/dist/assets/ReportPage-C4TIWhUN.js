import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { B as Button, E as ExternalBlob } from "./button-BHNwtKCm.js";
import { L as Layout } from "./Layout-B7_BtJI2.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BL4YShwE.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { B as BIHAR_DISTRICTS, C as CATEGORY_LABELS, b as buildWhatsAppMessage, W as WHATSAPP_NUMBER } from "./index-DSavPC3H.js";
import { m as useSubmitReport } from "./useReports-D6gPO8oh.js";
import { X, u as ue } from "./index-g2n4Sv33.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { C as CircleCheckBig } from "./circle-check-big-B8MnNb0w.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
import { M as MapPin } from "./Header-Co72W0gS.js";
import { C as Camera } from "./camera-D7W9W558.js";
import { U as Upload } from "./upload-B2qkYApJ.js";
import "./sonner-Blru5i_d.js";
import "./index-DdfDEI4I.js";
import "./Combination-DFs1XHPO.js";
import "./index-DXnvnaFp.js";
import "./index-DRgCU70w.js";
import "./index-DhjXKjAX.js";
import "./check-DTkXI2gV.js";
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_MB = 10;
function ReportPage() {
  const { mutateAsync: submitReport, isPending } = useSubmitReport();
  const [form, setForm] = reactExports.useState({
    name: "",
    mobile: "",
    district: "",
    location: "",
    category: "",
    description: "",
    gpsLocation: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [submittedRef, setSubmittedRef] = reactExports.useState("");
  const [gpsLoading, setGpsLoading] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const validate = () => {
    const e = {};
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
  const handleImage = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      ue.error("Only JPG, PNG, WEBP allowed");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      ue.error(`Max image size is ${MAX_SIZE_MB}MB`);
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadProgress(0);
  };
  const getGPS = () => {
    if (!navigator.geolocation) {
      ue.error("Geolocation not supported");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({
          ...f,
          gpsLocation: `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`
        }));
        setGpsLoading(false);
        ue.success("GPS location captured!");
      },
      () => {
        setGpsLoading(false);
        ue.error("Location access denied");
      }
    );
  };
  const handleFieldBlur = (field) => {
    const e = validate();
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      ue.error("Please fill all required fields correctly");
      return;
    }
    setErrors({});
    try {
      let imageBlob = void 0;
      if (imageFile) {
        const bytes = new Uint8Array(await imageFile.arrayBuffer());
        imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress(
          (pct) => setUploadProgress(pct)
        );
      }
      const result = await submitReport({
        name: form.name,
        mobile: form.mobile,
        district: form.district,
        location: form.location,
        category: form.category,
        description: form.description,
        imageBlob
      });
      setSubmitted(true);
      setSubmittedRef(result.refNumber);
      const catLabel = CATEGORY_LABELS[form.category];
      const msg = buildWhatsAppMessage({
        name: form.name,
        mobile: form.mobile,
        district: form.district,
        location: form.location,
        category: `${catLabel.hi} / ${catLabel.en}`,
        description: form.description,
        imageUrl: result.imageBlob ? result.imageBlob.getDirectURL() : void 0
      });
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,
        "_blank",
        "noopener"
      );
    } catch {
      ue.error("Submission failed. Please try again.");
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
      gpsLocation: ""
    });
    setErrors({});
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "min-h-[60vh] flex items-center justify-center bg-background px-4 py-16",
        "data-ocid": "report.success_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { type: "spring", stiffness: 200, damping: 22 },
            className: "text-center max-w-md w-full",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-2", children: "Report Submit Ho Gayi! ✅" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Aapki samasya safaltapurvak darj kar li gayi hai. Hum jald se jald sambandhit adhikari ko suchit karenge." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 mb-6 text-left space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Reference Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/30 font-mono font-semibold", children: submittedRef })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                  "WhatsApp notification bheja ja raha hai"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: resetForm,
                  className: "w-full bg-primary hover:bg-primary/90 font-semibold",
                  size: "lg",
                  "data-ocid": "report.submit_another_button",
                  children: "Ek Aur Report Karein"
                }
              )
            ]
          }
        )
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 border-b border-border py-8",
        "data-ocid": "report.header_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/icon-report.png",
                  alt: "Report Cleanliness",
                  className: "h-20 w-20"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/15 text-secondary border-secondary/30 mb-3", children: "🚨 Samasya Report" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-2", children: "Report Cleanliness Issue / Samasya Report Karein" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Apni safai samasya ka vivaran darj karein — hum use sambandhit adhikari tak pahunchayenge." })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10", "data-ocid": "report.page", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.form,
      {
        onSubmit: handleSubmit,
        className: "space-y-5",
        noValidate: true,
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", children: [
                "Poora Naam ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  value: form.name,
                  onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                  onBlur: () => handleFieldBlur("name"),
                  placeholder: "Ramesh Kumar",
                  "aria-invalid": !!errors.name,
                  "data-ocid": "report.name_input",
                  className: `mt-1 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`
                }
              ),
              errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "report.name_field_error",
                  children: errors.name
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "mobile", children: [
                "Mobile Number ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "mobile",
                  type: "tel",
                  inputMode: "numeric",
                  maxLength: 10,
                  value: form.mobile,
                  onChange: (e) => setForm((f) => ({
                    ...f,
                    mobile: e.target.value.replace(/\D/g, "")
                  })),
                  onBlur: () => handleFieldBlur("mobile"),
                  placeholder: "98765XXXXX",
                  "aria-invalid": !!errors.mobile,
                  "data-ocid": "report.mobile_input",
                  className: `mt-1 ${errors.mobile ? "border-destructive focus-visible:ring-destructive" : ""}`
                }
              ),
              errors.mobile && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "report.mobile_field_error",
                  children: errors.mobile
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "District ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.district,
                  onValueChange: (v) => {
                    setForm((f) => ({ ...f, district: v }));
                    setErrors((prev) => ({ ...prev, district: void 0 }));
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: `mt-1 ${errors.district ? "border-destructive" : ""}`,
                        "data-ocid": "report.district_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "District chunein" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BIHAR_DISTRICTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
                  ]
                }
              ),
              errors.district && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "report.district_field_error",
                  children: errors.district
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "location", children: [
                "Area / Location ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "location",
                  value: form.location,
                  onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })),
                  onBlur: () => handleFieldBlur("location"),
                  placeholder: "Mohalla, Landmark",
                  "aria-invalid": !!errors.location,
                  "data-ocid": "report.location_input",
                  className: `mt-1 ${errors.location ? "border-destructive focus-visible:ring-destructive" : ""}`
                }
              ),
              errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive mt-1",
                  "data-ocid": "report.location_field_error",
                  children: errors.location
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Problem Category ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.category,
                onValueChange: (v) => {
                  setForm((f) => ({ ...f, category: v }));
                  setErrors((prev) => ({ ...prev, category: void 0 }));
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: `mt-1 ${errors.category ? "border-destructive" : ""}`,
                      "data-ocid": "report.category_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Samasya ki category chunein" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(CATEGORY_LABELS).map(([key, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: key, children: [
                    val.emoji,
                    " ",
                    val.hi,
                    " / ",
                    val.en
                  ] }, key)) })
                ]
              }
            ),
            errors.category && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive mt-1",
                "data-ocid": "report.category_field_error",
                children: errors.category
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "description", children: [
              "Samasya ka Vivaran ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "description",
                value: form.description,
                onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                onBlur: () => handleFieldBlur("description"),
                placeholder: "Samasya ka vistar se vivaran likhein — kab se hai, kitni gambhir hai, kya kya taklif ho rahi hai...",
                rows: 4,
                "aria-invalid": !!errors.description,
                "data-ocid": "report.description_textarea",
                className: `mt-1 resize-none ${errors.description ? "border-destructive focus-visible:ring-destructive" : ""}`
              }
            ),
            errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive mt-1",
                "data-ocid": "report.description_field_error",
                children: errors.description
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "gps", children: [
              "GPS Location",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(Optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "gps",
                  value: form.gpsLocation,
                  readOnly: true,
                  placeholder: "GPS coordinates",
                  className: "bg-muted/50 flex-1 min-w-0",
                  "data-ocid": "report.gps_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: getGPS,
                  disabled: gpsLoading,
                  className: "flex-shrink-0 border-primary/30 text-primary hover:bg-primary/5",
                  "data-ocid": "report.get_gps_button",
                  children: [
                    gpsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 mr-1" }),
                    "GPS"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Photo Upload",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(Optional • Max 10MB)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-full mt-1 border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                onClick: () => {
                  var _a;
                  return (_a = fileRef.current) == null ? void 0 : _a.click();
                },
                onKeyDown: (e) => {
                  var _a;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    (_a = fileRef.current) == null ? void 0 : _a.click();
                  }
                },
                onDragOver: (e) => e.preventDefault(),
                onDrop: (e) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files[0];
                  if (f) handleImage(f);
                },
                "aria-label": "Photo upload karein — click ya drag & drop",
                "data-ocid": "report.photo_dropzone",
                children: imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imagePreview,
                      alt: "Preview",
                      className: "max-h-40 rounded-lg mx-auto shadow-sm"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.stopPropagation();
                        setImageFile(null);
                        setImagePreview(null);
                        setUploadProgress(0);
                      },
                      className: "absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 shadow-sm hover:scale-110 transition-transform",
                      "aria-label": "Remove image",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  ),
                  uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 w-full bg-border rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "bg-primary h-1.5 rounded-full transition-all duration-300",
                      style: { width: `${uploadProgress}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: imageFile == null ? void 0 : imageFile.name })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-10 h-10 text-primary/50 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                    "Drag & drop ya",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "browse" }),
                    " karein"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG, WEBP • Max 10MB" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileRef,
                type: "file",
                accept: "image/jpeg,image/jpg,image/png,image/webp",
                className: "hidden",
                onChange: (e) => {
                  var _a;
                  const f = (_a = e.target.files) == null ? void 0 : _a[0];
                  if (f) handleImage(f);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full bg-primary hover:bg-primary/90 font-bold py-3 text-base shadow-md hover:shadow-lg transition-all",
                disabled: isPending,
                "data-ocid": "report.submit_button",
                size: "lg",
                children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 mr-2 animate-spin" }),
                  "Submit ho rahi hai..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 mr-2" }),
                  "Report Submit Karein"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-3", children: "Submit karne par WhatsApp notification bheja jayega 9263989760 par." })
          ] })
        ]
      }
    ) }) })
  ] });
}
export {
  ReportPage as default
};
