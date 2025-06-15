"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import PrimaryButton from "./PrimaryButton";
import {ArrowLeft } from "lucide-react";
const allProjects = [
  {
    title: "Chat App",
    description: "Real-time chat using Socket.IO",
    image: "/chat_app.png",
    link: "https://github.com/iamanaskhan10/chat-app-nodejs/blob/main/README.md",
    category: "Web",
  },
  {
    title: "Seige Of Nations - The Last Defender",
    description: "Third-person shooter game in Unity",
    image: "/SON.jpeg",
    link: "https://drive.google.com/file/d/1ERBN1-Gh9N804AIrZhk2noQl3ed3GPbz/view?usp=sharing",
    category: "Game",
  },
  {
    title: "DarziXpress",
    description: "Full MERN stack project connecting tailors and customers",
    image: "/darzi.png",
    link: "https://github.com/Wasee-Ur-Rehman/DarziXpress",
    category: "Web",
  },
  {
    title: "Portfolio Website",
    description: "Built with Next.js and TailwindCSS",
    image: "/portfolio.png",
    link: "https://github.com/your-username/portfolio",
    category: "Web",
  },
];

const categories = ["All", "Web", "AI", "Mobile", "Game"];

const Projects = ({ showAll = false }) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const displayedProjects = showAll ? filteredProjects : allProjects.slice(0, 4);

  return (
    <section
      className="min-h-screen bg-[#0a192f] text-gray-300 py-20 px-4"
      id="projects"
    >
      <div className="max-w-6xl mx-auto">
        {showAll && (
  <div className="flex items-center gap-2 mb-4">
    <PrimaryButton href="/#projects" className="px-4 py-2 text-sm">
  <ArrowLeft size={16} />
</PrimaryButton>

    <h2 className="text-2xl sm:text-3xl font-bold border-b-4 border-pink-600 inline-block">
      All Projects
    </h2>
  </div>
)}
{!showAll && (
  <h2 className="text-3xl font-bold border-b-4 border-pink-600 inline-block mb-8">
    Featured Projects
  </h2>
)}

        {/* Category Filter */}
        {showAll && (
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-full transition ${
                  activeCategory === cat
                    ? "bg-pink-600 text-white"
                    : "bg-gray-700 hover:bg-pink-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {displayedProjects.length === 0 ? (
          <p className="text-center text-gray-400 mt-16">
            No projects to display in this category.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {displayedProjects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-pink-500/30 transition duration-300 cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-300 text-white z-10">
                  <h3 className="text-xl font-semibold text-pink-400">
                    {project.title}
                  </h3>
                  <p className="text-sm mt-2">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!showAll && (
          <div className="text-center mt-10">
<PrimaryButton onClick={() => router.push("/projects")}>
  View All Projects
</PrimaryButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
