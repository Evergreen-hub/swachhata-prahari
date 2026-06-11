import { r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { A as AdminLayout } from "./AdminLayout-Dfg10svQ.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BgjVVzFQ.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { B as Button } from "./button-BHNwtKCm.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-Cgmf1CRI.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { S as Skeleton } from "./skeleton-6NNGp7oG.js";
import { S as Switch } from "./switch-BVKcWf8m.js";
import { T as Textarea } from "./textarea-CWs-fPSX.js";
import { d as useBlogPosts, M as useAddBlogPost, N as useUpdateBlogPost, O as useDeleteBlogPost } from "./useReports-D6gPO8oh.js";
import { u as ue } from "./index-g2n4Sv33.js";
import { P as Plus } from "./plus-y0KWOWAS.js";
import { f as format } from "./format-BGwA-lBQ.js";
import { P as Pen } from "./pen-D7_r51-R.js";
import { T as Trash2 } from "./trash-2-BrbSqs_g.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
import "./sonner-Blru5i_d.js";
import "./useAdmin-CTb0qm1b.js";
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
  content: "",
  category: "",
  tags: "",
  featuredImageUrl: "",
  isPublished: false
};
function AdminBlog() {
  const { data: posts, isLoading } = useBlogPosts();
  const addPost = useAddBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };
  const openEdit = (post) => {
    setEditing(post);
    setForm({
      title: post.title,
      content: post.content,
      category: post.category,
      tags: post.tags.join(", "),
      featuredImageUrl: post.featuredImageUrl ?? "",
      isPublished: post.isPublished
    });
    setDialogOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
      if (editing) {
        await updatePost.mutateAsync({
          id: editing.id,
          title: form.title,
          content: form.content,
          category: form.category,
          tags,
          featuredImageUrl: form.featuredImageUrl || void 0,
          isPublished: form.isPublished
        });
        ue.success("Blog post updated");
      } else {
        await addPost.mutateAsync({
          title: form.title,
          content: form.content,
          category: form.category,
          tags,
          featuredImageUrl: form.featuredImageUrl || void 0,
          isPublished: form.isPublished
        });
        ue.success("Blog post published");
      }
      setDialogOpen(false);
      setForm(EMPTY_FORM);
      setEditing(null);
    } catch {
      ue.error(
        editing ? "Failed to update blog post" : "Failed to add blog post"
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      await deletePost.mutateAsync(id);
      ue.success("Blog post deleted");
    } catch {
      ue.error("Failed to delete blog post");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin_blog.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Blog Posts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            (posts == null ? void 0 : posts.length) ?? 0,
            " post(s)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: openAdd,
            className: "bg-primary hover:bg-primary/90",
            "data-ocid": "admin_blog.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              " Add Post"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk-1", "sk-2", "sk-3", "sk-4"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24" }, id)) }) : !posts || posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-16 bg-card border border-border rounded-xl",
          "data-ocid": "admin_blog.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No blog posts yet" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 shadow-card",
          "data-ocid": `admin_blog.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: post.title }),
                post.isPublished ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-primary text-primary-foreground", children: "Published" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Draft" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mb-1", children: [
                "🏷️ ",
                post.category,
                post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "  |  ",
                  post.tags.join(", ")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-2", children: post.content }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: format(
                Number(post.createdAt) / 1e6,
                "dd MMM yyyy"
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => openEdit(post),
                  "data-ocid": `admin_blog.edit_button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-destructive border-destructive/30 hover:bg-destructive/5",
                    "data-ocid": `admin_blog.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  AlertDialogContent,
                  {
                    "data-ocid": `admin_blog.delete_dialog.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Post?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                          'This action cannot be undone. Post "',
                          post.title,
                          '" will be permanently deleted.'
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogCancel,
                          {
                            "data-ocid": `admin_blog.delete_cancel_button.${i + 1}`,
                            children: "Cancel"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogAction,
                          {
                            onClick: () => handleDelete(post.id),
                            className: "bg-destructive text-destructive-foreground",
                            "data-ocid": `admin_blog.delete_confirm_button.${i + 1}`,
                            children: "Delete"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        },
        post.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "admin_blog.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit Blog Post" : "Add Blog Post" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bp-title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "bp-title",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "Post title",
              className: "mt-1",
              required: true,
              "data-ocid": "admin_blog.title_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bp-content", children: "Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "bp-content",
              value: form.content,
              onChange: (e) => setForm((f) => ({ ...f, content: e.target.value })),
              placeholder: "Write your post content here...",
              rows: 5,
              className: "mt-1",
              required: true,
              "data-ocid": "admin_blog.content_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bp-category", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "bp-category",
                value: form.category,
                onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
                placeholder: "e.g. News",
                className: "mt-1",
                required: true,
                "data-ocid": "admin_blog.category_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bp-tags", children: "Tags (comma-separated)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "bp-tags",
                value: form.tags,
                onChange: (e) => setForm((f) => ({ ...f, tags: e.target.value })),
                placeholder: "tag1, tag2, tag3",
                className: "mt-1",
                "data-ocid": "admin_blog.tags_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bp-image", children: "Featured Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "bp-image",
              value: form.featuredImageUrl,
              onChange: (e) => setForm((f) => ({ ...f, featuredImageUrl: e.target.value })),
              placeholder: "https://...",
              className: "mt-1",
              "data-ocid": "admin_blog.image_url_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "bp-published",
              checked: form.isPublished,
              onCheckedChange: (v) => setForm((f) => ({ ...f, isPublished: v })),
              "data-ocid": "admin_blog.published_switch"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bp-published", className: "cursor-pointer", children: "Publish immediately" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              "data-ocid": "admin_blog.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              className: "bg-primary hover:bg-primary/90",
              disabled: addPost.isPending || updatePost.isPending,
              "data-ocid": "admin_blog.submit_button",
              children: [
                (addPost.isPending || updatePost.isPending) && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                editing ? "Update" : "Add",
                " Post"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminBlog as default
};
