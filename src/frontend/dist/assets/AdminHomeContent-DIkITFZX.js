import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { B as Button } from "./button-BHNwtKCm.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { k as useHomeContent, U as useUpdateHomeContent } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
import { S as Save } from "./save-DjFOqKrV.js";
import "./sonner-Blru5i_d.js";
import "./useAdmin-CTb0qm1b.js";
import "./leaf-B3Dxd-td.js";
import "./file-text-CdLsy3OQ.js";
import "./trending-up-Dx0h5VPt.js";
import "./star-hL6fgra2.js";
import "./users-C3LAM8TT.js";
import "./message-square-roJAfg9F.js";
import "./index-DdfDEI4I.js";
function AdminHomeContent() {
  const { data: content, isLoading } = useHomeContent();
  const { mutateAsync: save, isPending } = useUpdateHomeContent();
  const [form, setForm] = reactExports.useState({
    heroTitle: "",
    heroSubtitle: "",
    missionText: "",
    visionText: "",
    ctaButtonText: "",
    ctaButtonLink: ""
  });
  reactExports.useEffect(() => {
    if (content) {
      setForm({
        heroTitle: content.heroTitle,
        heroSubtitle: content.heroSubtitle,
        missionText: content.missionText,
        visionText: content.visionText,
        ctaButtonText: content.ctaButtonText,
        ctaButtonLink: content.ctaButtonLink
      });
    }
  }, [content]);
  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await save({
        heroTitle: form.heroTitle,
        heroSubtitle: form.heroSubtitle,
        missionText: form.missionText,
        visionText: form.visionText,
        ctaButtonText: form.ctaButtonText,
        ctaButtonLink: form.ctaButtonLink
      });
      ue.success("Home content saved successfully!");
    } catch {
      ue.error("Failed to save home content");
    }
  };
  if (isLoading || !content) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 max-w-3xl", children: ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14" }, id)) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSave,
      className: "space-y-6 max-w-3xl",
      "data-ocid": "admin_home_content.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Home Page Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage the content displayed on the homepage." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground border-b border-border pb-2", children: "Hero Section" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "heroTitle", children: "Hero Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "heroTitle",
                value: form.heroTitle,
                onChange: (e) => update("heroTitle", e.target.value),
                className: "mt-1",
                "data-ocid": "admin_home_content.hero_title_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "heroSubtitle", children: "Hero Subtitle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "heroSubtitle",
                value: form.heroSubtitle,
                onChange: (e) => update("heroSubtitle", e.target.value),
                rows: 3,
                className: "mt-1",
                "data-ocid": "admin_home_content.hero_subtitle_textarea"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground border-b border-border pb-2", children: "Mission & Vision" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "missionText", children: "Mission" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "missionText",
                value: form.missionText,
                onChange: (e) => update("missionText", e.target.value),
                rows: 4,
                className: "mt-1",
                "data-ocid": "admin_home_content.mission_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visionText", children: "Vision" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "visionText",
                value: form.visionText,
                onChange: (e) => update("visionText", e.target.value),
                rows: 4,
                className: "mt-1",
                "data-ocid": "admin_home_content.vision_textarea"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground border-b border-border pb-2", children: "Call to Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ctaText", children: "Button Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "ctaText",
                  value: form.ctaButtonText,
                  onChange: (e) => update("ctaButtonText", e.target.value),
                  className: "mt-1",
                  "data-ocid": "admin_home_content.cta_text_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ctaLink", children: "Button Link" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "ctaLink",
                  value: form.ctaButtonLink,
                  onChange: (e) => update("ctaButtonLink", e.target.value),
                  placeholder: "/report",
                  className: "mt-1",
                  "data-ocid": "admin_home_content.cta_link_input"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending,
            className: "bg-primary hover:bg-primary/90 font-semibold",
            "data-ocid": "admin_home_content.save_button",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
              "Save Changes"
            ] })
          }
        )
      ]
    }
  ) });
}
export {
  AdminHomeContent as default
};
