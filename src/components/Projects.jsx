"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import PrimaryButton from "./PrimaryButton";
import { ArrowLeft } from "lucide-react";

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

  const displayedProjects = showAll
    ? filteredProjects
    : allProjects.slice(0, 4);

  return (
    <section
      className="min-h-screen text-gray-300 py-20 px-4 sm:px-6 md:px-14 lg:px-24 relative"
      id="projects"
    >
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-[75%] top-[15%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute left-[20%] top-[75%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[450px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-[1]">
        {showAll && (
          <div className="flex items-center gap-4 mb-8">
            <PrimaryButton href="/#projects" className="px-4 py-2 text-sm">
              <ArrowLeft size={16} />
            </PrimaryButton>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              All Projects
            </h2>
          </div>
        )}
        {!showAll && (
          <h2 className="text-3xl font-bold border-b-4 border-pink-600 inline-block mb-8">
            Featured Projects
          </h2>
        )}

        {/* Category Filter - Tecaudex style */}
        {showAll && (
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-[37px] px-5 text-sm font-semibold rounded-full border transition-all duration-150 active:scale-95 ${
                  activeCategory === cat
                    ? "border-pink-500 text-white bg-pink-600/20"
                    : "border-gray-600 text-gray-300 hover:border-pink-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid - Tecaudex style */}
        {displayedProjects.length === 0 ? (
          <p className="text-center text-gray-400 mt-16">
            No projects to display in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2px]">
            {displayedProjects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group aspect-square overflow-hidden cursor-pointer bg-black"
              >
                {/* Image with darken on hover */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover brightness-100 transition-all duration-700 group-hover:brightness-[0.3]"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-700 pointer-events-none" />

                {/* Center content - appears on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <h3 className="text-lg font-semibold text-white text-center tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 text-center">
                    {project.description}
                  </p>
                  <span className="mt-2 px-3 py-1 text-xs font-medium rounded-full border border-pink-500 text-pink-400">
                    {project.category}
                  </span>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    View Project
                  </span>
                  <svg
                    className="w-4 h-4 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!showAll && (
          <div className="text-center mt-12">
            <PrimaryButton onClick={() => router.push("/projects")}>
              Explore All Projects
            </PrimaryButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
