"use client";
import React from "react";
import FadeInSection from "./FadeInSection";
const experiences = [
  {
    company: "Tecaudex",
    role: "Associate Software Engineer",
    duration: "Present",
    points: [
      "Supporting the development and optimization of production applications across multiple technology stacks, focusing on performance, reliability, and maintainable code.",
      "Collaborating with senior engineers on feature development, bug fixes, and production issue resolution.",
    ],
  },
  {
    company: "Tecaudex",
    role: "Software Engineer Intern",
    duration: "Sept 2025 – Dec 2025",
    points: [
      "Built and launched the company's official website and portfolio platform from scratch, enabling client inquiries, structured content management, and SEO-friendly delivery.",
      "Resolved performance bottlenecks by splitting and optimizing API endpoints and replacing direct object storage access with a CDN-based delivery layer.",
      "Eliminated manual page creation by implementing a CMS-driven routing and metadata system, allowing scalable page generation without code changes.",
    ],
  },
  {
    company: "Freelance",
    role: "Java Developer",
    duration: "Nov 2024 – Dec 2024",
    points: [
      "Designed and implemented Java applications and simple games according to client requirements. Delivered functional, well-structured solutions within agreed timelines.",
    ],
  },
  {
    company: "Prodigy Infotech",
    role: "Web Development Intern",
    duration: "Jun 2024 – Jul 2024",
    points: [
      "Gained hands-on experience in HTML, CSS, and JavaScript through a project-based internship. Completed 5 practical tasks to strengthen frontend development skills.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="text-gray-300 py-20 px-4 sm:px-6 md:px-14 lg:px-24 relative">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-[15%] top-[25%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute left-[80%] top-[65%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[450px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-[1]">
        <FadeInSection>
        <h2 className="text-3xl font-bold border-b-4 border-pink-600 inline-block mb-12">
          Experience
        </h2>

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-[#112240] p-6 rounded-md shadow-md hover:shadow-pink-500/20 transition duration-300"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-semibold text-pink-500">{exp.role}</h3>
                <span className="text-sm text-gray-400 whitespace-nowrap ml-4">{exp.duration}</span>
              </div>
              <p className="text-md font-medium text-gray-300">{exp.company}</p>
              <ul className="mt-3 space-y-2">
                {exp.points.map((point, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-pink-500 mt-1 shrink-0">&#8226;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeInSection>

      </div>
    </section>
  );
};

export default Experience;
