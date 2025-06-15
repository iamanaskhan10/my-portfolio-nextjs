"use client";
import React from "react";
import FadeInSection from "./FadeInSection";
const About = () => {
  return (
    <section className="bg-[#0a192f] text-gray-300 py-20 px-4" id="about">
      <div className="max-w-4xl mx-auto">
        <FadeInSection>
        <h2 className="text-3xl font-bold border-b-4 border-pink-600 inline-block mb-6">
          About Me
        </h2>
      <p className="text-lg leading-relaxed text-gray-400">
  I'm a software engineering undergrad with a passion for solving real-world problems through full-stack development. From building tailor service platforms and POS systems to creating Java apps and Unity-based games, I’ve delivered projects that blend logic, usability, and creativity. My technical toolkit spans the <span className="text-pink-500">MERN stack</span>, <span className="text-pink-500">C++</span>, <span className="text-pink-500">Java</span>, <span className="text-pink-500">Python</span>, and <span className="text-pink-500">C#</span> — supported by strong fundamentals in <span className="text-pink-500">DSA</span>, <span className="text-pink-500">OOP</span>, and <span className="text-pink-500">Software Design Principles</span>.
  <br /><br />
  I’ve led projects across diverse domains like game development, desktop apps, and cloud-based platforms — always prioritizing clean architecture, collaborative work, and continuous learning. Whether it’s backend APIs, frontend logic, or scalable systems, I bring a builder’s mindset and a commitment to clean code.
</p>
      </FadeInSection>

      </div>
    </section>
  );
};

export default About;
