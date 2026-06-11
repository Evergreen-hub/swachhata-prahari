import { e as useActor, f as createActor } from "./button-BHNwtKCm.js";
import { r as reactExports } from "./index-6efX3_t7.js";
const ADMIN_TOKEN_KEY = "swachhata_admin_token";
function useAdmin() {
  const { actor, isFetching } = useActor(createActor);
  const [token, setToken] = reactExports.useState(
    () => sessionStorage.getItem(ADMIN_TOKEN_KEY)
  );
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const isAuthenticated = !!token;
  const login = reactExports.useCallback(
    async (username, password) => {
      if (!actor) return false;
      setLoading(true);
      setError(null);
      try {
        const result = await actor.adminLogin(username, password);
        if (result !== null && result !== void 0) {
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
    [actor]
  );
  const logout = reactExports.useCallback(async () => {
    if (actor && token) {
      await actor.adminLogout(token).catch(() => {
      });
    }
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken(null);
  }, [actor, token]);
  return { isAuthenticated, token, login, logout, loading, error, isFetching };
}
export {
  useAdmin as u
};
