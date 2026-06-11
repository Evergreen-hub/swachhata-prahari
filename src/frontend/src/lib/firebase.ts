import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

export { getRedirectResult };

const firebaseConfig = {
  apiKey: "AIzaSyAQ_DGJJyXM9ujg3xD_T3hsJ3LyDj0iwew",
  authDomain: "swachhata-prahari-7ca6d.firebaseapp.com",
  projectId: "swachhata-prahari-7ca6d",
  storageBucket: "swachhata-prahari-7ca6d.firebasestorage.app",
  messagingSenderId: "256601124030",
  appId: "1:256601124030:web:1deabaa9bbb6bd6a10c2ef",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<
  import("firebase/auth").User
> {
  googleProvider.setCustomParameters({ prompt: "select_account" });

  // Detect mobile / environments where popups are often blocked
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // On mobile, redirect is more reliable
    await signInWithRedirect(auth, googleProvider);
    // This line is reached only in theory; actual result comes via getRedirectResult
    throw new Error("REDIRECT_INITIATED");
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err: unknown) {
    const firebaseErr = err as { code?: string };
    // Popup was blocked or closed — fall back to redirect
    if (
      firebaseErr.code === "auth/popup-blocked" ||
      firebaseErr.code === "auth/popup-closed-by-user" ||
      firebaseErr.code === "auth/cancelled-popup-request"
    ) {
      await signInWithRedirect(auth, googleProvider);
      throw new Error("REDIRECT_INITIATED");
    }
    throw err;
  }
}

export async function logOut() {
  await signOut(auth);
}
