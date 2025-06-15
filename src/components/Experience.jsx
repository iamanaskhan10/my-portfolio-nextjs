"use client";
import React from "react";

const experiences = [
  {
    company: "FAST Literary Society",
    role: "Executive Member",
    duration: "Sept 2023 – Present",
    description: "Organizing and managing events, promoting literature, and fostering creative writing culture within the university.",
  },
  {
    company: "FAST Softec",
    role: "Officer",
    duration: "Jan 2024 – Present",
    description: "Contributing to Pakistan’s largest student-run tech event by managing logistics, outreach, and event execution.",
  },
  {
    company: "Prodigy InfoTech (Remote)",
    role: "Web Development Intern",
    duration: "July 2023 – Sept 2023",
    description: "Gained hands-on experience with HTML, CSS, and JavaScript through real-world projects and task-based learning.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="bg-[#0a192f] text-gray-300 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold border-b-4 border-pink-600 inline-block mb-12">
          Experience
        </h2>

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-[#112240] p-6 rounded-md shadow-md hover:shadow-pink-500/20 transition duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-pink-500">{exp.role}</h3>
                <span className="text-sm text-gray-400">{exp.duration}</span>
              </div>
              <p className="text-md font-medium">{exp.company}</p>
              <p className="text-sm mt-2 text-gray-400">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
