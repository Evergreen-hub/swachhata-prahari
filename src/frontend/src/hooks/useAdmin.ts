import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useState } from "react";

const ADMIN_TOKEN_KEY = "swachhata_admin_token";

export function useAdmin() {
  const { actor, isFetching } = useActor(createActor);
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem(ADMIN_TOKEN_KEY),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!token;

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      if (!actor) return false;
      setLoading(true);
      setError(null);
      try {
        const result = await actor.adminLogin(username, password);
        if (result !== null && result !== undefined) {
          sessionStorage.setItem(ADMIN_TOKEN_KEY, result);
          setToken(result);
          return true;
        }
        setError("Invalid username or password");
        return false;
      } catch {
        setError("Login failed. Please try again.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [actor],
  );

  const logout = useCallback(async () => {
    if (actor && token) {
      await actor.adminLogout(token).catch(() => {});
    }
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
  }, [actor, token]);

  return { isAuthenticated, token, login, logout, loading, error, isFetching };
}
