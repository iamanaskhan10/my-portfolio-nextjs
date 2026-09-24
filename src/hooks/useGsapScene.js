import { useEffect, useLayoutEffect } from "react";
import { getSceneAnimation } from "../lib/animation/gsap";
import useMotionPreference from "./useMotionPreference";

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Opt-in lifecycle for a future scene. Keep setup stable with useCallback;
 * changing it rebuilds this scene after reverting its previous context.
 * setup may return cleanup for its own listeners, observers, or render loop.
 */
export default function useGsapScene({ scope, setup, enabled = true }) {
  const reducedMotion = useMotionPreference();

  useBrowserLayoutEffect(() => {
    if (!enabled || reducedMotion || !scope.current) return;

    const { gsap, ScrollTrigger } = getSceneAnimation();
    const context = gsap.context(() => {}, scope.current);

    try {
      context.add(() => setup({ gsap, ScrollTrigger, context }));
    } catch (error) {
      context.revert();
      throw error;
    }

    // Reverts inline styles and removes only this scene's animations, pins,
    // and ScrollTriggers on unmount, rebuild, or a reduced-motion change.
    return () => context.revert();
  }, [enabled, reducedMotion, scope, setup]);
}
