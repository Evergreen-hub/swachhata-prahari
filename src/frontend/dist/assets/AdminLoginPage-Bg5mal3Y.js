import { a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { B as Badge } from "./badge-DUJI7GfG.js";
import { c as createLucideIcon, B as Button } from "./button-BHNwtKCm.js";
import { I as Input } from "./input-D3UPljkv.js";
import { L as Label } from "./label-uWu5LuAW.js";
import { u as useAdmin } from "./useAdmin-CTb0qm1b.js";
import { m as motion } from "./proxy-BkMauGKN.js";
import { L as Leaf } from "./leaf-B3Dxd-td.js";
import { E as Eye } from "./eye-CfdYtRmf.js";
import { L as LoaderCircle } from "./loader-circle-CSGiWZFc.js";
import "./index-DdfDEI4I.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function AdminLoginPage() {
  const { login, loading, error, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPass, setShowPass] = reactExports.useState(false);
  if (isAuthenticated) {
    navigate({ to: "/admin/dashboard" });
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) navigate({ to: "/admin/dashboard" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center px-4",
      "data-ocid": "admin_login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "w-full max-w-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-8 h-8 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Admin Login" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Swachhata Prahari Admin Panel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 mt-2 text-xs", children: "Restricted Access" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "bg-card border border-border rounded-2xl p-6 shadow-card space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", children: "Username" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "username",
                        value: username,
                        onChange: (e) => setUsername(e.target.value),
                        placeholder: "Swachhata Prahari",
                        required: true,
                        className: "mt-1",
                        "data-ocid": "admin_login.username_input",
                        autoComplete: "username"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "password",
                          type: showPass ? "text" : "password",
                          value: password,
                          onChange: (e) => setPassword(e.target.value),
                          placeholder: "password",
                          required: true,
                          className: "pr-10",
                          "data-ocid": "admin_login.password_input",
                          autoComplete: "current-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                          onClick: () => setShowPass((v) => !v),
                          "aria-label": showPass ? "Hide password" : "Show password",
                          children: showPass ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ] }),
                  error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-destructive text-sm",
                      "data-ocid": "admin_login.error_state",
                      children: error
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full bg-primary hover:bg-primary/90 font-semibold",
                      disabled: loading,
                      "data-ocid": "admin_login.submit_button",
                      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                        "Logging in..."
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 mr-2" }),
                        "Login"
                      ] })
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
export {
  AdminLoginPage as default
};
