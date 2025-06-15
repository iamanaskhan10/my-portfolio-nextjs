"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" }, // ✅ New section
  { label: "Contact", href: "#contact" },
];


const Sidebar = () => {
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
      { threshold: 0.5 } // Adjust as needed
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[150px] z-50 flex-col justify-between px-6 py-12 border-r border-gray-800 bg-[#0a192f]">
      {/* Top Section */}
      <div className="flex flex-col items-start gap-8">
        <h1 className="text-pink-600 text-lg font-bold tracking-widest">Anas Khan</h1>
        <nav className="flex flex-col gap-6">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              download={item.download || false}
              className={`group inline-block text-xs sm:text-sm tracking-widest font-semibold uppercase relative ${
                activeSection === item.href.replace("#", "")
                  ? "text-pink-600"
                  : "text-gray-300"
              }`}
            >
              {item.label}
              <span
                className={`block h-[2px] transition-all duration-300 mt-1 ${
                  activeSection === item.href.replace("#", "")
                    ? "w-full bg-pink-600"
                    : "w-0 group-hover:w-full bg-pink-600"
                }`}
              ></span>
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col items-start gap-4">
        <a
          href="https://github.com/iamanaskhan10"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-pink-600 transition"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://linkedin.com/in/anas-khan-k/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-pink-600 transition"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="mailto:anas23khan2002@gmail.com"
          className="text-gray-400 hover:text-pink-600 transition"
        >
          <FaEnvelope size={20} />
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
