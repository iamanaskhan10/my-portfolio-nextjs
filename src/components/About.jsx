"use client";
import React from "react";
import FadeInSection from "./FadeInSection";
const About = () => {
  return (
    <section className="text-gray-300 pt-12 pb-20 px-4 sm:px-6 md:px-14 lg:px-24" id="about">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
        <h2 className="text-3xl font-bold border-b-4 border-pink-600 inline-block mb-6">
          About Me
        </h2>
      <p className="text-lg leading-relaxed text-gray-400">
  I'm a Software Engineering student at <span className="text-pink-500">FAST-NUCES, Lahore</span> with a passion for building production-grade applications. From CMS-driven web platforms and real-time chat apps to POS systems and Unity games, I deliver solutions that prioritize performance, reliability, and clean architecture.
  <br /><br />
  My technical toolkit spans <span className="text-pink-500">Next.js</span>, <span className="text-pink-500">React.js</span>, and <span className="text-pink-500">Tailwind CSS</span> on the frontend, with <span className="text-pink-500">Node.js</span>, <span className="text-pink-500">Express.js</span>, <span className="text-pink-500">REST APIs</span>, and <span className="text-pink-500">Socket.IO</span> powering the backend. I work with <span className="text-pink-500">MongoDB</span>, <span className="text-pink-500">PostgreSQL</span>, and <span className="text-pink-500">MySQL</span> — and have hands-on experience with <span className="text-pink-500">AI/ML fundamentals</span> and <span className="text-pink-500">prompt engineering</span>.
  <br /><br />
  Currently an Associate Software Engineer at Tecaudex, I collaborate on feature development, performance optimization, and production issue resolution across multiple technology stacks.
</p>
      </FadeInSection>

      </div>
    </section>
  );
};

export default About;
