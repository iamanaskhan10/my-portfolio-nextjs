"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion"; // ✅ motion import

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
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
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[150px] z-50 flex-col justify-between px-6 py-12 border-r border-gray-800 bg-[#0a192f]">
      {/* Top */}
      <div className="flex flex-col items-start gap-8">
        <motion.h1
          className="text-pink-600 text-lg font-bold tracking-widest"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Anas Khan
        </motion.h1>

        <nav className="flex flex-col gap-6">
          {navItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
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
            </motion.a>
          ))}
        </nav>
      </div>

      {/* Bottom Icons */}
      <motion.div
        className="flex flex-col items-start gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delayChildren: 0.8,
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {[ // Icons mapped for better animation
          {
            icon: <FaGithub size={20} />,
            href: "https://github.com/iamanaskhan10",
          },
          {
            icon: <FaLinkedin size={20} />,
            href: "https://linkedin.com/in/anas-khan-k/",
          },
          {
            icon: <FaEnvelope size={20} />,
            href: "mailto:anas23khan2002@gmail.com",
          },
        ].map((item, idx) => (
          <motion.a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-600 transition"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {item.icon}
          </motion.a>
        ))}
      </motion.div>
    </aside>
  );
};

export default Sidebar;
