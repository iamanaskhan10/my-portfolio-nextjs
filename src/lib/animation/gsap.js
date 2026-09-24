import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Registration is browser-only. Importing this module never starts a scene,
// changes scrolling, or configures global GSAP defaults.
export function getSceneAnimation() {
  if (typeof window === "undefined") return null;

  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}
