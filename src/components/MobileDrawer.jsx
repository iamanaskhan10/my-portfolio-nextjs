// src/components/MobileDrawer.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "tween", duration: 0.3 },
  },
  exit: {
    x: "100%",
    transition: { type: "tween", duration: 0.2 },
  },
};

const MobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);
    requestAnimationFrame(() => drawerRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#11120f] text-[#f2f0e8] border-b border-[#f2f0e8]/12 px-6 py-4 flex justify-between items-center md:hidden">
        <span className="text-[#b9f35a] font-bold text-lg">Anas Khan</span>
        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="rounded-md p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9f35a]"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={drawerRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 z-[999] bg-[#11120f] shadow-lg text-[#f2f0e8] flex flex-col p-8 space-y-8 md:hidden focus:outline-none"
            initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
            animate={shouldReduceMotion ? { opacity: 1 } : "visible"}
            exit={shouldReduceMotion ? { opacity: 0 } : "exit"}
            variants={drawerVariants}
          >
            <div className="flex flex-col gap-6 mt-10">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold hover:text-[#b9f35a] transition-colors focus-visible:outline-none focus-visible:text-[#b9f35a]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-[#f2f0e8]/12 flex gap-6 justify-center text-[#f2f0e8]/60">
              <a
                href="https://github.com/iamanaskhan10"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-[#b9f35a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9f35a]"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/anas-khan-k/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#b9f35a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9f35a]"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:anas23khan2002@gmail.com"
                aria-label="Email Anas Khan"
                className="hover:text-[#b9f35a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9f35a]"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileDrawer;
