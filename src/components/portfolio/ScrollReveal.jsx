"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./ScrollReveal.module.css";

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Only prepare offscreen content. Visible content and restored scroll positions
// never replay; the entry threshold does not depend on the section's height.
export default function ScrollReveal({ as: Element = "div", className = "", variant = "text", children, ...props }) {
  const ref = useRef(null);

  useBrowserLayoutEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !window.IntersectionObserver || element.getBoundingClientRect().top < window.innerHeight) {
      element.dataset.state = "static";
      return;
    }

    element.dataset.state = "pending";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      element.dataset.state = "visible";
    }, { threshold: 0, rootMargin: "0px 0px -64px 0px" });
    const showImmediately = () => {
      observer.disconnect();
      element.dataset.state = "static";
    };

    observer.observe(element);
    element.addEventListener("focusin", showImmediately);
    motion.addEventListener("change", showImmediately);
    return () => {
      observer.disconnect();
      element.removeEventListener("focusin", showImmediately);
      motion.removeEventListener("change", showImmediately);
    };
  }, []);

  return (
    <Element ref={ref} className={`${styles.reveal} ${className}`} data-reveal={variant} {...props}>
      {children}
    </Element>
  );
}
