"use client";

import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import useMotionPreference from "../hooks/useMotionPreference";
import BrandMark from "./portfolio/BrandMark";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./FloatingNavigation.module.css";

const navigation = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Tech stack", href: "#capabilities" },
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
  const [activeSection, setActiveSection] = useState("home");
  const navigationRef = useRef(null);

  useEffect(() => {
    const nav = navigationRef.current;
    const focused = nav?.contains(document.activeElement) ? document.activeElement.closest("a") : null;
    const current = focused || nav?.querySelector("a[aria-current]");
    if (!current || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: current.offsetLeft - (nav.clientWidth - current.offsetWidth) / 2, behavior: reduceMotion ? "auto" : "smooth" });
  }, [activeSection, router.pathname, reduceMotion]);

  useEffect(() => {
    if (router.pathname !== "/") return;
    const sections = ["home", ...navigation.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id)).filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = Math.max(100, window.innerHeight * 0.3);
      let current = sections[0]?.id;
      let closestTop = -Infinity;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= readingLine && top >= closestTop) { current = section.id; closestTop = top; }
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = sections.at(-1)?.id;
      setActiveSection(current ?? "home");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [router.pathname]);

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

  return (
    <div className={`site-shell ${styles.shell}`}>
      <a className="site-skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header ${styles.dock}`}>
        <a className="site-header__brand" href={sectionHref("#home")} aria-label="Anas Khan home" aria-current={router.pathname === "/" && activeSection === "home" ? "location" : undefined}>
          <BrandMark className="site-header__mark" />
        </a>
        <nav ref={navigationRef} className="site-header__nav" aria-label="Main navigation" onFocus={(event) => {
          const link = event.target.closest("a");
          const nav = event.currentTarget;
          if (link && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2, behavior: "instant" });
        }}>
          {navigation.filter((item) => item.href !== "#contact").map((item) => (
            <a key={item.href} href={sectionHref(item.href)} aria-current={router.pathname === "/" && activeSection === item.href.slice(1) ? "location" : undefined}>{item.label}</a>
          ))}
          <Link href="/projects" aria-current={router.pathname.startsWith("/projects") ? "page" : undefined}>Archive</Link>
        </nav>
        <a className="site-header__contact" href={sectionHref("#contact")} aria-current={router.pathname === "/" && activeSection === "contact" ? "location" : undefined}>
          <span className="site-header__contact-icon" aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
          <span className="site-header__contact-label">Let&apos;s talk</span>
        </a>
      </header>
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
