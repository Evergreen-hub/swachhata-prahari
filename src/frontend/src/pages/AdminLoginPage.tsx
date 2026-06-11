import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Leaf, Loader2, Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const { login, loading, error, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  if (isAuthenticated) {
    navigate({ to: "/admin/dashboard" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) navigate({ to: "/admin/dashboard" });
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4"
      data-ocid="admin_login.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Admin Login
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Swachhata Prahari Admin Panel
          </p>
          <Badge className="bg-primary/10 text-primary border-primary/20 mt-2 text-xs">
            Restricted Access
          </Badge>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4"
        >
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Swachhata Prahari"
              required
              className="mt-1"
              data-ocid="admin_login.username_input"
              autoComplete="username"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                className="pr-10"
                data-ocid="admin_login.password_input"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          {error && (
            <p
              className="text-destructive text-sm"
              data-ocid="admin_login.error_state"
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 font-semibold"
            disabled={loading}
            data-ocid="admin_login.submit_button"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Login
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
