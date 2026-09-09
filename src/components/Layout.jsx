"use client";

import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useMotionPreference from "../hooks/useMotionPreference";
import BrandMark from "./portfolio/BrandMark";
import { useRouter } from "next/router";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Tech stack", href: "#capabilities" },
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
  const router = useRouter();
  const sectionHref = (hash) => router.pathname === "/" ? hash : `/${hash}`;
  const reduceMotion = useMotionPreference();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mobileMenuButtonRef = useRef(null);
  const mobileSidebarRef = useRef(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleChapterLink = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      const link = target?.closest('a[href^="#"]');
      const hash = link?.getAttribute("href");
      const progress = chapterProgress[hash];

      if (progress === undefined) return;

      const story = document.querySelector('.engineering-story[data-cinematic-scroll="true"]');
      if (!story) return;

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

    const handleSidebarKeys = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = [...(mobileSidebarRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [])];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleSidebarKeys);
    requestAnimationFrame(() => mobileSidebarRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleSidebarKeys);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="site-shell">
      <a className="site-skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="site-header__brand" href={sectionHref("#home")} aria-label="Anas Khan home">
          <BrandMark className="site-header__mark" />
          <span className="site-header__brand-name">
            Anas <span className="site-header__brand-surname">Khan</span>
          </span>
        </a>
        <nav className="site-header__nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={sectionHref(item.href)} aria-current={router.pathname === "/" && activeSection === item.href.slice(1) ? "location" : undefined}>{item.label}</a>
          ))}
        </nav>
        <a className="site-header__contact" href={sectionHref("#contact")}>
          <span className="site-header__contact-icon" aria-hidden="true">
            <ArrowRight size={15} />
          </span>
          <span className="site-header__contact-label">Let&apos;s talk</span>
        </a>
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
                <a href={sectionHref("#home")} onClick={() => setMobileMenuOpen(false)}>Home</a>
                {navigation.map((item) => (
                  <a key={item.href} href={sectionHref(item.href)} aria-current={router.pathname === "/" && activeSection === item.href.slice(1) ? "location" : undefined} onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
                ))}
              </nav>
              <a className="mobile-sidebar__email" href={sectionHref("#contact")}>
                Let&apos;s build something useful
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
