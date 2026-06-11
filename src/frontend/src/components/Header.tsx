import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Loader2, LogOut, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const NAV_LINKS = [
  { to: "/", label: "Home", labelHi: "होम" },
  { to: "/report", label: "Report Problem", labelHi: "शिकायत करें" },
  { to: "/projects", label: "Projects", labelHi: "परियोजनाएं" },
  { to: "/events", label: "Events", labelHi: "कार्यक्रम" },
  { to: "/gallery", label: "Gallery", labelHi: "गैलरी" },
  { to: "/impact", label: "Impact", labelHi: "प्रभाव" },
  { to: "/blog", label: "Blog", labelHi: "ब्लॉग" },
  { to: "/documents", label: "Documents", labelHi: "दस्तावेज़" },
  { to: "/join", label: "Join Team", labelHi: "जुड़ें" },
  { to: "/about", label: "About", labelHi: "हमारे बारे में" },
  { to: "/contact", label: "Contact", labelHi: "संपर्क" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signIn, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [brandTextGreen, setBrandTextGreen] = useState(false);

  // 5-click logo secret admin access
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleLogoClick() {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      navigate({ to: "/admin" });
      return;
    }
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);
  }

  async function handleSignIn() {
    setSigningIn(true);
    try {
      await signIn();
    } catch (err: unknown) {
      const e = err as { message?: string };
      if (e?.message && e.message !== "REDIRECT_INITIATED") {
        toast.error(e.message || "Sign-in failed. Please try again.");
      }
    } finally {
      setSigningIn(false);
    }
  }

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header className="bg-[#008000] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + Brand Name */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center"
            data-ocid="header.logo_link"
            aria-label="Swachhata Prahari - Home"
          >
            <button
              type="button"
              onClick={handleLogoClick}
              className="bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
              aria-label="Logo — click 5 times quickly for admin"
              data-ocid="header.logo_secret_click"
            >
              <img
                src="/assets/logo-uploaded.png"
                alt="Swachhata Prahari"
                className="h-12 w-auto object-contain bg-transparent"
              />
            </button>
          </Link>
          <button
            type="button"
            onClick={() => setBrandTextGreen((v) => !v)}
            className="bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
            data-ocid="header.brand_name_toggle"
            aria-label="Toggle brand name color"
          >
            <span
              className="font-display font-bold text-base md:text-lg leading-tight transition-colors duration-300 whitespace-nowrap"
              style={{ color: brandTextGreen ? "#008000" : "#FF9933" }}
            >
              Swachhata Prahari
            </span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`header.nav_${link.label.toLowerCase().replace(/ /g, "_")}`}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive(link.to)
                  ? "bg-[#FF9933] text-white font-semibold"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/donate" data-ocid="header.nav_donate">
            <span className="ml-1 px-3 py-1.5 rounded-md text-sm font-semibold bg-[#FF9933] text-white hover:bg-[#FF9933]/90 transition-colors duration-200 inline-block">
              💛 Donate
            </span>
          </Link>
          <Link to="/report">
            <Button
              size="sm"
              className="ml-2 bg-white text-primary hover:bg-white/90 border-0 font-semibold"
              data-ocid="header.report_cta_button"
            >
              + रिपोर्ट करें
            </Button>
          </Link>
          {isAuthenticated && user ? (
            <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="ml-2 flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-2 py-1 hover:bg-white/20 transition-colors"
                  data-ocid="header.profile_dropdown_toggle"
                  aria-label="Open profile menu"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.photoUrl} alt={user.name} />
                    <AvatarFallback className="bg-secondary text-white text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-white hidden lg:inline max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => setProfileOpen(false)}
                >
                  <User className="w-4 h-4" /> My Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await logout();
                    setProfileOpen(false);
                  }}
                  className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive"
                  data-ocid="header.logout_button"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="ml-2 border-white/40 text-white hover:bg-white/10 font-semibold inline-flex items-center gap-1.5"
              onClick={handleSignIn}
              disabled={signingIn}
              data-ocid="header.google_signin_button"
            >
              {signingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Sign in with Google"
                  role="img"
                >
                  <title>Sign in with Google</title>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              {signingIn ? "Signing In..." : "Sign In"}
            </Button>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          data-ocid="header.mobile_menu_toggle"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/20 md:hidden"
          >
            <nav
              className="flex flex-col py-2 px-4 gap-1 bg-[#006600]"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  data-ocid={`header.mobile_nav_${link.label.toLowerCase().replace(/ /g, "_")}`}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "bg-[#FF9933] text-white font-semibold"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <span className="font-medium">{link.label}</span>
                  <span className="text-white/60 text-xs ml-2">
                    {link.labelHi}
                  </span>
                </Link>
              ))}
              <Link
                to="/donate"
                onClick={() => setMenuOpen(false)}
                data-ocid="header.mobile_nav_donate"
                className="px-3 py-2.5 rounded-md text-sm font-semibold bg-[#FF9933] text-white block"
              >
                💛 Donate / दान करें
              </Link>
              <Link
                to="/report"
                onClick={() => setMenuOpen(false)}
                className="mt-2 mb-1"
              >
                <Button
                  className="w-full bg-white text-primary hover:bg-white/90 border-0 font-semibold"
                  data-ocid="header.mobile_report_cta_button"
                >
                  + रिपोर्ट करें
                </Button>
              </Link>
              {isAuthenticated && user ? (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoUrl} alt={user.name} />
                      <AvatarFallback className="bg-secondary text-white text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-white/60 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      await logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-white/90 hover:bg-white/10 transition-colors flex items-center gap-2"
                    data-ocid="header.mobile_logout_button"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await handleSignIn();
                      setMenuOpen(false);
                    } catch {
                      // error already shown via toast
                    }
                  }}
                  disabled={signingIn}
                  className="mt-2 w-full px-3 py-2.5 rounded-md text-sm font-semibold border border-white/40 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  data-ocid="header.mobile_google_signin_button"
                >
                  {signingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-label="Sign in with Google"
                      role="img"
                    >
                      <title>Sign in with Google</title>
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  )}
                  {signingIn ? "Signing In..." : "Sign In with Google"}
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
