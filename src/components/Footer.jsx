"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a192f] text-gray-400 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Contact */}
        <div className="text-sm text-center md:text-left">
          <p>© {new Date().getFullYear()} Anas Khan. All rights reserved.</p>
          <p className="text-gray-500 text-xs mt-1">Contact: +92 322 7369434</p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-5 text-xl">
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:anas23khan2002@gmail.com"
            className="hover:text-white transition-colors duration-300"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
