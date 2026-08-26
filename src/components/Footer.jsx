"use client";

import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/portfolio";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__identity">
          <a className="site-footer__wordmark" href="#home" aria-label="Anas Khan home">
            Anas <span>Khan</span>
          </a>
          <p>Software engineer building dependable full-stack and AI products.</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <span>Explore</span>
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="site-footer__contact">
          <span>Have a project in mind?</span>
          <a href={`mailto:${profile.email}`}>
            Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="site-footer__socials">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={16} aria-hidden="true" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email Anas Khan">
            <Mail size={16} aria-hidden="true" />
          </a>
        </div>
        <a className="site-footer__phone" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
      </div>
    </footer>
  );
}
