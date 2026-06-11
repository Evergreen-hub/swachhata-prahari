import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { B as Button, M as MediaType, E as ExternalBlob, G as GalleryCategory } from "./button-BHNwtKCm.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cgmf1CRI.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { S as Switch } from "./switch-BVKcWf8m.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { u as useAdmin } from "./useAdmin-CTb0qm1b.js";
import { p as useGalleryItems, t as useAddGalleryItem, v as useDeleteGalleryItem } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { P as Plus } from "./plus-y0KWOWAS.js";
import { I as ImageOff } from "./image-off-Cvn55418.js";
import { F as Film } from "./film-BJQcFqN9.js";
import { T as Trash2 } from "./trash-2-BrbSqs_g.js";
import { U as Upload } from "./upload-B2qkYApJ.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
import "./leaf-B3Dxd-td.js";
import "./file-text-CdLsy3OQ.js";
import "./trending-up-Dx0h5VPt.js";
import "./star-hL6fgra2.js";
import "./users-C3LAM8TT.js";
import "./message-square-roJAfg9F.js";
import "./Combination-DFs1XHPO.js";
import "./index-DdfDEI4I.js";
import "./index-DhjXKjAX.js";
import "./index-DRgCU70w.js";
const EMPTY_FORM = {
  title: "",
  description: "",
  mediaType: "image",
  isPublic: true,
  isDonorOnly: false
};
function AdminGallery() {
  const { token } = useAdmin();
  const { data: items = [], isLoading } = useGalleryItems(token);
  const addItem = useAddGalleryItem(token);
  const deleteItem = useDeleteGalleryItem(token);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [mediaFile, setMediaFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const fileInputRef = reactExports.useRef(null);
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const isVid = file.type.startsWith("video/");
    setMediaFile(file);
    setForm((f) => ({ ...f, mediaType: isVid ? "video" : "image" }));
    setPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mediaFile) {
      ue.error("Please select a media file");
      return;
    }
    try {
      const bytes = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          var _a;
          return res(new Uint8Array((_a = ev.target) == null ? void 0 : _a.result));
        };
        reader.onerror = rej;
        reader.readAsArrayBuffer(mediaFile);
      });
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (p) => setUploadProgress(p)
      );
      const mediaTypeEnum = form.mediaType === "video" ? MediaType.video : MediaType.image;
      const category = form.isDonorOnly ? GalleryCategory.donor : GalleryCategory.general;
      const req = {
        url: blob.getDirectURL(),
        blob,
        title: form.title || void 0,
        description: form.description || void 0,
        mediaType: mediaTypeEnum,
        category
      };
      await addItem.mutateAsync(req);
      ue.success("Media added to gallery");
      setDialogOpen(false);
      setForm(EMPTY_FORM);
      setMediaFile(null);
      setPreview(null);
      setUploadProgress(0);
    } catch {
      ue.error("Failed to upload media");
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this gallery item?")) return;
    await deleteItem.mutateAsync(id);
    ue.success("Gallery item deleted");
  };
  const categoryLabel = (cat) => cat === GalleryCategory.donor ? "Donor Only" : "General";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin_gallery.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Gallery Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            items.length,
            " item(s) — images and videos"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => {
              setDialogOpen(true);
              setForm(EMPTY_FORM);
              setMediaFile(null);
              setPreview(null);
            },
            className: "bg-primary hover:bg-primary/90",
            "data-ocid": "admin_gallery.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              " Add Media"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }, k)) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-20 bg-card border border-border rounded-xl",
          "data-ocid": "admin_gallery.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "w-10 h-10 text-muted-foreground/40 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No gallery items yet. Add images or videos above." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative group rounded-xl overflow-hidden border border-border shadow-card bg-card",
          "data-ocid": `admin_gallery.item.${i + 1}`,
          children: [
            item.mediaType === MediaType.video ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square bg-muted flex flex-col items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-10 h-10 text-muted-foreground/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Video" }),
              item.title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium truncate px-2 text-center", children: item.title })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.blob ? item.blob.getDirectURL() : item.url,
                alt: item.title ?? `Gallery item ${i + 1}`,
                className: "w-full aspect-square object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-primary/80 text-white border-0", children: item.mediaType === MediaType.video ? "Video" : "Image" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-secondary/80 text-white border-0", children: categoryLabel(item.category) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
                item.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-medium truncate flex-1", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleDelete(item.id),
                    className: "ml-2 p-1.5 rounded-md bg-destructive/80 hover:bg-destructive text-white flex-shrink-0",
                    "aria-label": "Delete item",
                    "data-ocid": `admin_gallery.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            ] })
          ]
        },
        item.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "admin_gallery.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Gallery Media" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Media File (Image or Video)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*,video/*",
              className: "hidden",
              onChange: handleFileChange,
              "data-ocid": "admin_gallery.file_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "mt-2 w-full border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors",
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              "aria-label": "Click to upload media file",
              "data-ocid": "admin_gallery.dropzone",
              children: preview ? form.mediaType === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-10 h-10 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: mediaFile == null ? void 0 : mediaFile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click to change" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: preview,
                    alt: "Preview",
                    className: "max-h-32 rounded-lg object-contain mx-auto"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  mediaFile == null ? void 0 : mediaFile.name,
                  " — Click to change"
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Click to upload image or video" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "JPG, PNG, WEBP, MP4 — max 10MB" })
              ] })
            }
          ),
          addItem.isPending && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary rounded-full transition-all",
                style: { width: `${uploadProgress}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 text-right", children: [
              uploadProgress,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gal-title", children: "Title (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "gal-title",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "Caption or title",
              className: "mt-1",
              "data-ocid": "admin_gallery.title_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gal-desc", children: "Description (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "gal-desc",
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              placeholder: "Brief description...",
              rows: 2,
              className: "mt-1",
              "data-ocid": "admin_gallery.description_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "isPublic",
                checked: form.isPublic,
                onCheckedChange: (v) => setForm((f) => ({ ...f, isPublic: v })),
                "data-ocid": "admin_gallery.is_public_switch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "isPublic", className: "cursor-pointer", children: "Public" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "isDonorOnly",
                checked: form.isDonorOnly,
                onCheckedChange: (v) => setForm((f) => ({ ...f, isDonorOnly: v })),
                "data-ocid": "admin_gallery.is_donor_only_switch"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "isDonorOnly", className: "cursor-pointer", children: "Donor Only" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              "data-ocid": "admin_gallery.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "bg-primary hover:bg-primary/90",
              disabled: addItem.isPending || !mediaFile,
              "data-ocid": "admin_gallery.submit_button",
              children: [
                addItem.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                "Add to Gallery"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminGallery as default
};
