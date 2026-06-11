import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useAdmin } from "@/hooks/useAdmin";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  FileText,
  Home,
  Image,
  Info,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

const ADMIN_NAV = [
  {
    to: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    labelHi: "डैशबोर्ड",
  },
  { to: "/admin/reports", icon: FileText, label: "Reports", labelHi: "रिपोर्ट" },
  {
    to: "/admin/projects",
    icon: TrendingUp,
    label: "Projects",
    labelHi: "परियोजनाएं",
  },
  { to: "/admin/events", icon: Star, label: "Events", labelHi: "कार्यक्रम" },
  { to: "/admin/blog", icon: FileText, label: "Blog", labelHi: "ब्लॉग" },
  { to: "/admin/gallery", icon: Image, label: "Gallery", labelHi: "गैलरी" },
  {
    to: "/admin/documents",
    icon: FileText,
    label: "Documents",
    labelHi: "दस्तावेज़",
  },
  { to: "/admin/team", icon: Users, label: "Team Members", labelHi: "टीम" },
  {
    to: "/admin/testimonials",
    icon: MessageSquare,
    label: "Testimonials",
    labelHi: "प्रशंसापत्र",
  },
  {
    to: "/admin/impact",
    icon: TrendingUp,
    label: "Impact Reports",
    labelHi: "प्रभाव रिपोर्ट",
  },
  { to: "/admin/home", icon: Home, label: "Home Content", labelHi: "होम कंटेंट" },
  {
    to: "/admin/about",
    icon: Info,
    label: "About Content",
    labelHi: "अबाउट कंटेंट",
  },
  {
    to: "/admin/settings",
    icon: Settings,
    label: "Settings",
    labelHi: "सेटिंग्स",
  },
];

export default function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/admin" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/admin" });
  };

  const NavItems = () => (
    <>
      {ADMIN_NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={() => setSidebarOpen(false)}
          data-ocid={`admin.nav_${item.label.toLowerCase()}`}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isActive(item.to)
              ? "bg-primary text-primary-foreground"
              : "text-foreground/70 hover:bg-muted hover:text-foreground"
          }`}
        >
          <item.icon className="w-4 h-4 flex-shrink-0" />
          <div>
            <div>{item.label}</div>
            <div className="text-xs opacity-60">{item.labelHi}</div>
          </div>
        </Link>
      ))}
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs">
              SP
            </div>
            <div>
              <div className="font-display font-bold text-sm text-foreground">
                Swachhata Prahari
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Leaf className="w-3 h-3" /> Admin Panel
              </div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavItems />
        </nav>
        <div className="p-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
            data-ocid="admin.logout_button"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header + Drawer */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="lg:hidden flex items-center justify-between bg-card border-b border-border px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs">
              SP
            </div>
            <span className="font-display font-bold text-sm">Admin Panel</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
            className="p-2 rounded-md hover:bg-muted transition-colors"
            data-ocid="admin.mobile_sidebar_toggle"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Drawer Overlay */}
        {sidebarOpen && (
          <>
            <button
              type="button"
              className="lg:hidden fixed inset-0 z-40 bg-foreground/30 w-full h-full cursor-default"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
            />
            <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border p-4 flex flex-col shadow-xl">
              <nav className="flex-1 space-y-1 mt-4">
                <NavItems />
              </nav>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={handleLogout}
                data-ocid="admin.mobile_logout_button"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </>
        )}

        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
