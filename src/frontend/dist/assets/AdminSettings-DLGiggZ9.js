import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { B as Button, E as ExternalBlob } from "./button-BHNwtKCm.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { u as useAdmin } from "./useAdmin-CTb0qm1b.js";
import { i as useSettings, w as useSaveSettings } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { U as Upload } from "./upload-B2qkYApJ.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
import { S as Save } from "./save-DjFOqKrV.js";
import "./sonner-Blru5i_d.js";
import "./leaf-B3Dxd-td.js";
import "./file-text-CdLsy3OQ.js";
import "./trending-up-Dx0h5VPt.js";
import "./star-hL6fgra2.js";
import "./users-C3LAM8TT.js";
import "./message-square-roJAfg9F.js";
import "./index-DdfDEI4I.js";
const TABS = [
  { id: "general", label: "General" },
  { id: "donation", label: "Donation Details" },
  { id: "founder", label: "Founder Info" }
];
function AdminSettings() {
  const { token } = useAdmin();
  const { data: settings, isLoading } = useSettings();
  const { mutateAsync: saveSettings, isPending } = useSaveSettings(token);
  const [form, setForm] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("general");
  const [upiQrFile, setUpiQrFile] = reactExports.useState(null);
  const [founderPhotoFile, setFounderPhotoFile] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (settings && !form) setForm(settings);
  }, [settings, form]);
  const update = (field, value) => setForm((f) => f ? { ...f, [field]: value } : f);
  const updateSocial = (field, value) => setForm(
    (f) => f ? {
      ...f,
      socialLinks: { ...f.socialLinks, [field]: value || void 0 }
    } : f
  );
  const readFileAsBytes = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      return resolve(new Uint8Array((_a = e.target) == null ? void 0 : _a.result));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
  const handleSave = async (e) => {
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
      ue.success("Settings saved successfully!");
      setUpiQrFile(null);
      setFounderPhotoFile(null);
    } catch {
      ue.error("Failed to save settings");
    } finally {
      setUploading(false);
    }
  };
  if (isLoading || !form) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14" }, id)) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSave,
      className: "space-y-6 max-w-3xl",
      "data-ocid": "admin_settings.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Website configuration — Swachhata Prahari" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 border-b border-border", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(t.id),
            className: `px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === t.id ? "bg-card border border-border border-b-card -mb-px text-primary" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `admin_settings.tab_${t.id}`,
            children: t.label
          },
          t.id
        )) }),
        activeTab === "general" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground border-b border-border pb-2", children: "Website Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "siteName", children: "Website Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "siteName",
                  value: form.websiteName,
                  onChange: (e) => update("websiteName", e.target.value),
                  className: "mt-1",
                  "data-ocid": "admin_settings.website_name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Contact Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "phone",
                    value: form.contactPhone,
                    onChange: (e) => update("contactPhone", e.target.value),
                    className: "mt-1",
                    "data-ocid": "admin_settings.contact_phone_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "waNum", children: "WhatsApp Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "waNum",
                    value: form.whatsappNumber,
                    onChange: (e) => update("whatsappNumber", e.target.value),
                    className: "mt-1",
                    "data-ocid": "admin_settings.whatsapp_number_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Contact Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  value: form.contactEmail,
                  onChange: (e) => update("contactEmail", e.target.value),
                  className: "mt-1",
                  "data-ocid": "admin_settings.contact_email_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "location", children: "Location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "location",
                  value: form.location,
                  onChange: (e) => update("location", e.target.value),
                  className: "mt-1",
                  "data-ocid": "admin_settings.location_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground border-b border-border pb-2", children: "Social Links" }),
            ["facebook", "instagram", "youtube", "twitter"].map(
              (platform) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: platform, className: "capitalize", children: platform }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: platform,
                    value: form.socialLinks[platform] ?? "",
                    onChange: (e) => updateSocial(platform, e.target.value),
                    placeholder: `https://${platform}.com/...`,
                    className: "mt-1",
                    "data-ocid": `admin_settings.${platform}_input`
                  }
                )
              ] }, platform)
            )
          ] })
        ] }),
        activeTab === "donation" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground border-b border-border pb-2", children: "Donation Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "upiId", children: "UPI ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "upiId",
                value: form.upiId ?? "",
                onChange: (e) => update("upiId", e.target.value),
                placeholder: "e.g. swachtaprahari@upi",
                className: "mt-1",
                "data-ocid": "admin_settings.upi_id_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "UPI QR Code Image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-start gap-4", children: [
              (upiQrFile ? URL.createObjectURL(upiQrFile) : form.upiQrImageUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: upiQrFile ? URL.createObjectURL(upiQrFile) : form.upiQrImageUrl,
                  alt: "UPI QR",
                  className: "w-24 h-24 object-contain border border-border rounded-lg bg-white"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    id: "upiQrUpload",
                    className: "hidden",
                    onChange: (e) => {
                      var _a;
                      return setUpiQrFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                    },
                    "data-ocid": "admin_settings.upi_qr_upload"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      var _a;
                      return (_a = document.getElementById("upiQrUpload")) == null ? void 0 : _a.click();
                    },
                    className: "gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                      upiQrFile ? "Change QR Image" : "Upload QR Image"
                    ]
                  }
                ),
                upiQrFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: upiQrFile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG, WEBP — max 10MB" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bankAccount", children: "Bank Account Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "bankAccount",
                  value: form.bankAccountNumber ?? "",
                  onChange: (e) => update("bankAccountNumber", e.target.value),
                  placeholder: "Account number",
                  className: "mt-1",
                  "data-ocid": "admin_settings.bank_account_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bankIfsc", children: "IFSC Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "bankIfsc",
                  value: form.bankIfsc ?? "",
                  onChange: (e) => update("bankIfsc", e.target.value),
                  placeholder: "SBIN0001234",
                  className: "mt-1",
                  "data-ocid": "admin_settings.bank_ifsc_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bankHolder", children: "Account Holder Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "bankHolder",
                value: form.bankAccountHolder ?? "",
                onChange: (e) => update("bankAccountHolder", e.target.value),
                placeholder: "Name as in bank records",
                className: "mt-1",
                "data-ocid": "admin_settings.bank_holder_input"
              }
            )
          ] })
        ] }),
        activeTab === "founder" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground border-b border-border pb-2", children: "Founder Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "founderName", children: "Founder Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "founderName",
                value: form.founderName ?? "",
                onChange: (e) => update("founderName", e.target.value),
                placeholder: "e.g. Rudra Pratap Singh",
                className: "mt-1",
                "data-ocid": "admin_settings.founder_name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "founderBio", children: "Founder Bio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "founderBio",
                value: form.founderBio ?? "",
                onChange: (e) => update("founderBio", e.target.value),
                placeholder: "Short biography of the founder...",
                rows: 4,
                className: "mt-1",
                "data-ocid": "admin_settings.founder_bio_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Founder Photo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-start gap-4", children: [
              (founderPhotoFile ? URL.createObjectURL(founderPhotoFile) : form.founderPhoto) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: founderPhotoFile ? URL.createObjectURL(founderPhotoFile) : form.founderPhoto,
                  alt: "Founder",
                  className: "w-20 h-20 object-cover rounded-full border border-border"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    id: "founderPhotoUpload",
                    className: "hidden",
                    onChange: (e) => {
                      var _a;
                      return setFounderPhotoFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
                    },
                    "data-ocid": "admin_settings.founder_photo_upload"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      var _a;
                      return (_a = document.getElementById("founderPhotoUpload")) == null ? void 0 : _a.click();
                    },
                    className: "gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                      founderPhotoFile ? "Change Photo" : "Upload Photo"
                    ]
                  }
                ),
                founderPhotoFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: founderPhotoFile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG, WEBP — max 10MB" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending || uploading,
            className: "bg-primary hover:bg-primary/90 font-semibold",
            "data-ocid": "admin_settings.save_button",
            children: isPending || uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
              "Save Settings"
            ] })
          }
        )
      ]
    }
  ) });
}
export {
  AdminSettings as default
};
