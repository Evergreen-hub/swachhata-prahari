import { j as jsxRuntimeExports } from "./index-6efX3_t7.js";
import { H as Header, F as Footer } from "./Header-Co72W0gS.js";
import { T as Toaster } from "./sonner-Blru5i_d.js";
function Layout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true })
  ] });
}
export {
  Layout as L
};
