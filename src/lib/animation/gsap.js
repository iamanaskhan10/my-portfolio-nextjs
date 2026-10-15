import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Registration is browser-only. Importing this module never starts a scene,
// changes scrolling, or configures global GSAP defaults.
let configured = false;
export function getSceneAnimation() {
  if (typeof window === "undefined") return null;

  gsap.registerPlugin(ScrollTrigger);
  if (!configured) {
    // Native touch scrolling stays native. Collapsing browser chrome is not a
    // layout change; refreshing all scenes there produces a jump on iOS.
    ScrollTrigger.config({ ignoreMobileResize: true });
    configured = true;
  }
  return { gsap, ScrollTrigger };
}
