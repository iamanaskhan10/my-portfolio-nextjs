"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";

const allProjects = [
  {
    title: "Chat App",
    description: "Real-time chat using Socket.IO",
    image: "/images/project1.jpg",
    link: "https://github.com/your-username/chat-app",
    category: "Web",
  },
  {
    title: "AI Image Generator",
    description: "Generate AI art using OpenAI + Cloudinary",
    image: "/images/project2.jpg",
    link: "https://github.com/your-username/ai-art",
    category: "AI",
  },
  {
    title: "Mobile Fitness Tracker",
    description: "React Native app for workouts",
    image: "/images/project3.jpg",
    link: "https://github.com/your-username/fitness-tracker",
    category: "Mobile",
  },
  {
    title: "3D Unity Game",
    description: "First-person puzzle game in Unity",
    image: "/images/project4.jpg",
    link: "https://github.com/your-username/unity-game",
    category: "Game",
  },
  {
    title: "E-commerce Platform",
    description: "Full MERN stack shop with admin dashboard",
    image: "/images/project5.jpg",
    link: "https://github.com/your-username/ecommerce",
    category: "Web",
  },
  {
    title: "Portfolio Website",
    description: "Built with Next.js and TailwindCSS",
    image: "/images/project6.jpg",
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
    <section className="bg-[#0a192f] text-gray-300 py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold border-b-4 border-pink-600 inline-block mb-8">
          {showAll ? "All Projects" : "Featured Projects"}
        </h2>

        {/* Category Filter – Only on All Projects page */}
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

        {/* Project Cards */}
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
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-60 transition duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-300 text-white z-10">
                <h3 className="text-xl font-semibold text-pink-400">{project.title}</h3>
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* View All Button – only on homepage */}
        {!showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => router.push("/projects")}
              className="rounded-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2 px-6 transition duration-300 shadow-lg hover:shadow-pink-500/50"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
