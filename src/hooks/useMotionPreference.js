import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

// Callers with a hidden entrance can defer animation until the real browser
// preference is available; other surfaces keep the quiet server default.
export default function useMotionPreference(serverValue = true) {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverValue);
}
