"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import styles from "./ScrollReveal.module.css";

// Content stays readable before hydration and without JavaScript. Each element
// gets one short entrance when it reaches the viewport, independent of scroll speed.
export default function ScrollReveal({ as: Element = "div", className = "", variant = "text", children, ...props }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const entered = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -12% 0px" });

  useEffect(() => setReady(true), []);

  return (
    <Element ref={ref} className={`${styles.reveal} ${className}`} data-reveal={variant} data-ready={ready} data-entered={entered} {...props}>
      {children}
    </Element>
  );
}
