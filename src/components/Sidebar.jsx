"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaUser, FaBriefcase, FaCode, FaTrophy } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navItems = [
  { label: "About", href: "#about", icon: <FaUser size={15} /> },
  { label: "Experience", href: "#experience", icon: <FaBriefcase size={15} /> },
  { label: "Projects", href: "#projects", icon: <FaCode size={15} /> },
  { label: "Achievements", href: "#achievements", icon: <FaTrophy size={15} /> },
  { label: "Contact", href: "#contact", icon: <FaEnvelope size={15} /> },
];

const socialItems = [
  { icon: <FaGithub size={16} />, href: "https://github.com/iamanaskhan10", label: "GitHub" },
  { icon: <FaLinkedin size={16} />, href: "https://linkedin.com/in/anas-khan-k/", label: "LinkedIn" },
  { icon: <FaEnvelope size={16} />, href: "mailto:anas23khan2002@gmail.com", label: "Email" },
];

const COLLAPSED_W = 54;
const ICON_SIZE = 15;
const ITEM_MX = 6; // horizontal margin on each nav item
const ICON_PL = (COLLAPSED_W - ICON_SIZE) / 2 - ITEM_MX; // padding-left inside item to keep icon centered in sidebar

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <aside
      className={`hidden md:flex fixed top-0 left-0 h-screen z-50 flex-col overflow-hidden border-r border-gray-800/60 bg-[#0a192f]/95 backdrop-blur-sm ${
        isOpen ? "shadow-[4px_0_24px_rgba(0,0,0,0.3)]" : ""
      }`}
      style={{
        width: isOpen ? "220px" : `${COLLAPSED_W}px`,
        transition: "width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease",
      }}
    >
      {/* Toggle - always at top */}
      <div
        className="flex items-center shrink-0 pt-6 pb-2"
        style={{
          justifyContent: isOpen ? "space-between" : "center",
          paddingLeft: isOpen ? `${ITEM_MX + ICON_PL}px` : undefined,
          paddingRight: isOpen ? `${ITEM_MX}px` : undefined,
        }}
      >
        <h1
          className="text-pink-500 text-lg font-bold tracking-[0.2em] whitespace-nowrap uppercase overflow-hidden"
          style={{
            opacity: isOpen ? 1 : 0,
            maxWidth: isOpen ? "160px" : "0px",
            transition: isOpen
              ? "opacity 0.3s ease 0.2s, max-width 0.4s ease"
              : "opacity 0.15s ease, max-width 0.3s ease",
          }}
        >
          Anas Khan
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-500/10 transition-all duration-200 cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span
            className="transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            {isOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
          </span>
        </button>
      </div>

      {/* Nav section */}
      <div className="flex-1 flex flex-col">
        {/* Separator */}
        <div
          className="h-px bg-gray-700/50 mx-auto mb-3"
          style={{ width: isOpen ? "85%" : "24px", transition: "width 0.4s ease" }}
        />

        {/* Nav - icons never move, labels fade in/out */}
        <nav className="flex flex-col gap-1 w-full" aria-label="Main navigation">
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                title={!isOpen ? item.label : undefined}
                className={`group relative flex items-center h-10 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "text-pink-500 bg-pink-500/10"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                }`}
                style={{ marginLeft: `${ITEM_MX}px`, marginRight: `${ITEM_MX}px`, paddingLeft: `${ICON_PL}px`, paddingRight: "12px" }}
              >
                {isActive && (
                  <span className="absolute top-1/2 -translate-y-1/2 w-[3px] h-5 bg-pink-500 rounded-full" style={{ left: `-${ITEM_MX}px` }} />
                )}
                <span className={`shrink-0 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}>
                  {item.icon}
                </span>
                <span
                  className="ml-3 text-[11px] font-semibold tracking-widest uppercase whitespace-nowrap overflow-hidden"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transition: isOpen
                      ? "opacity 0.25s ease 0.2s"
                      : "opacity 0.12s ease",
                  }}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Separator */}
        <div
          className="h-px bg-gray-700/50 mx-auto mt-3"
          style={{ width: isOpen ? "85%" : "24px", transition: "width 0.4s ease" }}
        />
      </div>

      {/* Bottom: Social - smooth vertical→horizontal animation */}
      <div
        className="relative shrink-0 pb-6 mx-auto flex items-center justify-center"
        style={{
          width: `${COLLAPSED_W}px`,
          height: isOpen ? "40px" : "116px",
          transition: "height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
      >
        {socialItems.map((item, index) => {
          const offset = (index - 1) * 38;
          const x = isOpen ? offset : 0;
          const y = isOpen ? 0 : offset;
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              className="absolute flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-pink-500 hover:bg-pink-500/10"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${isOpen ? 1.05 : 0.95})`,
                transition: `transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${isOpen ? index * 60 : (2 - index) * 40}ms`,
              }}
            >
              {item.icon}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
