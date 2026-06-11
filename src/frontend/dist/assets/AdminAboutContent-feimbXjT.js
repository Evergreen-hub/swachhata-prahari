import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { c as createLucideIcon, B as Button } from "./button-BHNwtKCm.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { n as useAboutContent, V as useUpdateAboutContent } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { P as Plus } from "./plus-y0KWOWAS.js";
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
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function AdminAboutContent() {
  const { data: content, isLoading } = useAboutContent();
  const { mutateAsync: save, isPending } = useUpdateAboutContent();
  const [story, setStory] = reactExports.useState("");
  const [values, setValues] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (content) {
      setStory(content.organizationStory);
      setValues(content.coreValues.map((v) => ({ ...v })));
    }
  }, [content]);
  const addValue = () => {
    if (values.length >= 4) {
      ue.error("Maximum 4 core values allowed");
      return;
    }
    setValues((v) => [...v, { title: "", description: "" }]);
  };
  const removeValue = (index) => {
    setValues((v) => v.filter((_, i) => i !== index));
  };
  const updateValue = (index, field, value) => {
    setValues(
      (v) => v.map((item, i) => i === index ? { ...item, [field]: value } : item)
    );
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await save({
        organizationStory: story,
        coreValues: values.filter((v) => v.title.trim())
      });
      ue.success("About content saved successfully!");
    } catch {
      ue.error("Failed to save about content");
    }
  };
  if (isLoading || !content) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 max-w-3xl", children: ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14" }, id)) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSave,
      className: "space-y-6 max-w-3xl",
      "data-ocid": "admin_about_content.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "About Page Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage the organization story and core values." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground border-b border-border pb-2", children: "Organization Story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "orgStory", children: "Story" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "orgStory",
                value: story,
                onChange: (e) => setStory(e.target.value),
                rows: 6,
                placeholder: "Write the organization's story...",
                className: "mt-1",
                "data-ocid": "admin_about_content.story_textarea"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Core Values" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: addValue,
                disabled: values.length >= 4,
                "data-ocid": "admin_about_content.add_value_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                  "Add Value"
                ]
              }
            )
          ] }),
          values.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'No core values added yet. Click "Add Value" to create one.' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "border border-border rounded-lg p-4 space-y-3",
              "data-ocid": `admin_about_content.value_item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: [
                    "Value ",
                    i + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 w-7 p-0 text-destructive",
                      onClick: () => removeValue(i),
                      "data-ocid": `admin_about_content.remove_value_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `valTitle-${i}`, children: "Title" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: `valTitle-${i}`,
                      value: v.title,
                      onChange: (e) => updateValue(i, "title", e.target.value),
                      placeholder: "e.g. Integrity",
                      className: "mt-1",
                      "data-ocid": `admin_about_content.value_title_input.${i + 1}`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `valDesc-${i}`, children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: `valDesc-${i}`,
                      value: v.description,
                      onChange: (e) => updateValue(i, "description", e.target.value),
                      placeholder: "Describe this core value...",
                      rows: 2,
                      className: "mt-1",
                      "data-ocid": `admin_about_content.value_desc_textarea.${i + 1}`
                    }
                  )
                ] })
              ]
            },
            v.title || i
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending,
            className: "bg-primary hover:bg-primary/90 font-semibold",
            "data-ocid": "admin_about_content.save_button",
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
  AdminAboutContent as default
};
