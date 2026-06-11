import { createActor } from "@/backend";
import {
  auth,
  getRedirectResult,
  logOut,
  signInWithGoogle,
} from "@/lib/firebase";
import type { User } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function firebaseUserToUser(fbUser: FirebaseUser): User {
  return {
    id: fbUser.uid,
    name: fbUser.displayName || "User",
    email: fbUser.email || "",
    photoUrl: fbUser.photoURL || "",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  };
}

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signInError, setSignInError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  // Restore user after redirect-based sign-in
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user && actor) {
          const u = firebaseUserToUser(result.user);
          await actor.registerOrUpdateUser({
            id: u.id,
            name: u.name,
            email: u.email,
            photoUrl: u.photoUrl,
            createdAt: BigInt(u.createdAt),
          });
          queryClient.setQueryData(["authUser"], u);
        }
      })
      .catch((err: unknown) => {
        const e = err as { code?: string; message?: string };
        if (e?.code !== "auth/no-auth-event") {
          console.error("getRedirectResult error", e);
        }
      });
  }, [actor, queryClient]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthLoading(false);
      if (user) {
        const u = firebaseUserToUser(user);
        queryClient.setQueryData(["authUser"], u);
      } else {
        queryClient.setQueryData(["authUser"], null);
      }
    });
    return () => unsubscribe();
  }, [queryClient]);

  const signInMutation = useMutation({
    mutationFn: async () => {
      setSignInError(null);
      try {
        const fbUser = await signInWithGoogle();
        const user = firebaseUserToUser(fbUser);
        if (actor) {
          await actor.registerOrUpdateUser({
            id: user.id,
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            createdAt: BigInt(user.createdAt),
          });
        }
        return user;
      } catch (err: unknown) {
        const e = err as { code?: string; message?: string };
        // REDIRECT_INITIATED is not a real error — page will reload
        if (e?.message === "REDIRECT_INITIATED") return null;
        // Map Firebase error codes to friendly messages
        const errorMessages: Record<string, string> = {
          "auth/network-request-failed":
            "Network error. Please check your connection and try again.",
          "auth/too-many-requests":
            "Too many attempts. Please wait a moment and try again.",
          "auth/user-disabled": "This account has been disabled.",
          "auth/operation-not-allowed":
            "Google Sign-In is not enabled. Please contact support.",
          "auth/internal-error":
            "An internal error occurred. Please try again.",
        };
        const msg =
          (e?.code && errorMessages[e.code]) ||
          e?.message ||
          "Sign-in failed. Please try again.";
        setSignInError(msg);
        throw new Error(msg);
      }
    },
    onSuccess: (user) => {
      if (user) queryClient.setQueryData(["authUser"], user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logOut();
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
    },
  });

  const cachedUser = queryClient.getQueryData<User>(["authUser"]);
  const user = firebaseUser
    ? firebaseUserToUser(firebaseUser)
    : (cachedUser ?? null);

  return {
    user,
    isLoading: authLoading || signInMutation.isPending,
    signIn: signInMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isAuthenticated: !!user,
    signInError,
    clearSignInError: () => setSignInError(null),
  };
}
