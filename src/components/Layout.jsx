"use client";

import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const chapterProgress = {
  "#home": 0,
  "#about": 0.23,
  "#projects": 0.45,
  "#experience": 0.7,
  "#contact": 0.92,
};

export default function Layout({ children }) {
  const reduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef(null);
  const mobileSidebarRef = useRef(null);
  const nameJiggle = reduceMotion
    ? { x: 0, rotate: 0 }
    : { x: [0, -0.8, 0.9, -0.45, 0], rotate: [0, -1, 1, -0.5, 0] };

  useEffect(() => {
    const handleChapterLink = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      const link = target?.closest('a[href^="#"]');
      const hash = link?.getAttribute("href");
      const progress = chapterProgress[hash];

      if (progress === undefined) return;

      const story = document.querySelector(".engineering-story");
      if (!story) {
        event.preventDefault();
        window.location.assign(`/${hash}`);
        return;
      }

      if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      const storyStart = window.scrollY + story.getBoundingClientRect().top;
      const scrollDistance = Math.max(0, story.offsetHeight - window.innerHeight);

      window.history.replaceState(null, "", hash);
      window.scrollTo({
        top: Math.round(storyStart + scrollDistance * progress),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    document.addEventListener("click", handleChapterLink);
    return () => document.removeEventListener("click", handleChapterLink);
  }, [reduceMotion]);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    requestAnimationFrame(() => mobileSidebarRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="site-shell">
      <a className="site-skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="site-header__brand" href="#home" aria-label="Anas Khan home">
          <motion.span
            className="site-header__brand-name"
            animate={nameJiggle}
            transition={{ duration: 0.42, repeat: reduceMotion ? 0 : Infinity, repeatDelay: 7.5, ease: "easeInOut" }}
            whileHover={reduceMotion ? undefined : { x: [0, -1.3, 1.3, -0.6, 0], rotate: [0, -1.5, 1.5, -0.75, 0] }}
          >
            Anas <span className="site-header__brand-surname">Khan</span>
          </motion.span>
        </a>
        <nav className="site-header__nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="site-header__contact" href="#contact">Let&apos;s talk</a>
        <button
          ref={mobileMenuButtonRef}
          className="site-header__menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-sidebar"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </header>
      <main id="main-content">{children}</main>
      <Footer />
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              className="mobile-sidebar__scrim"
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              ref={mobileSidebarRef}
              id="mobile-sidebar"
              className="mobile-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              tabIndex={-1}
              initial={reduceMotion ? { opacity: 1 } : { x: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ type: "tween", duration: reduceMotion ? 0 : 0.26, ease: "easeOut" }}
            >
              <div className="mobile-sidebar__topline">
                <span>Navigate</span>
                <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation menu">
                  <X size={19} aria-hidden="true" />
                </button>
              </div>
              <nav className="mobile-sidebar__nav" aria-label="Mobile navigation">
                <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
                {navigation.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
                ))}
              </nav>
              <a className="mobile-sidebar__email" href="#contact" onClick={() => setMobileMenuOpen(false)}>
                Let&apos;s build something useful
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
