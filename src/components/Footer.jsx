"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { profile } from "../data/portfolio";

const Footer = () => {
  return (
    <footer className="border-t border-[#f2f0e8]/12 text-[#f2f0e8]/60 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-14 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Contact */}
        <div className="text-sm text-center md:text-left">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="text-[#f2f0e8]/45 text-xs mt-1">Contact: {profile.phone}</p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-5 text-xl">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#b9f35a] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9f35a]"
          >
            <FaGithub />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#b9f35a] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9f35a]"
          >
            <FaLinkedin />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-[#b9f35a] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9f35a]"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
