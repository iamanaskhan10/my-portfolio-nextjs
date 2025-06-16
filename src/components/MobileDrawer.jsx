// src/components/MobileDrawer.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0a192f] text-white border-b border-gray-700 px-6 py-4 flex justify-between items-center md:hidden">
        <span className="text-pink-600 font-bold text-lg">Anas Khan</span>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={drawerRef}
            className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 z-[999] bg-[#0a192f] shadow-lg text-white flex flex-col p-8 space-y-8 md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawerVariants}
          >
            <div className="flex flex-col gap-6 mt-10">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold hover:text-pink-500 transition"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-700 flex gap-6 justify-center text-gray-400">
              <a
                href="https://github.com/iamanaskhan10"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 transition"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/anas-khan-k/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 transition"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:anas23khan2002@gmail.com"
                className="hover:text-pink-600 transition"
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
