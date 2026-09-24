import { caseStudies } from "./caseStudies";
import { experiences, profile } from "./portfolio";

export const defaultSiteText = {
  seo: {
    homeTitle: "Anas Khan - Full-stack & AI Engineer",
    homeDescription: "Explore Anas Khan's full-stack and AI engineering work, technology toolkit, and product experience.",
    projectsTitle: "Projects - Anas Khan",
    projectsDescription: "Selected full-stack and AI projects by Anas Khan, including their problems, implementation, and outcomes.",
  },
  hero: {
    lines: ["Full-stack", "Engineer.", "Applied AI."],
    downloadLabel: "Download resume",
    viewLabel: "View resume",
    ctaLabel: "Let's talk",
  },
  about: {
    phrases: ["I learn.", "I build.", "I ship."],
    heading: "Building full-stack products across real-time AI, computer vision and data-intensive systems.",
    body: "I'm a software engineer focused on full-stack and applied AI products. My work spans React and Next.js interfaces, FastAPI and Node.js services, PostgreSQL data systems, and real-time AI workflows.",
    linkLabel: "Explore my toolkit",
  },
  technology: {
    heading: "Technologies",
    accent: "I build with.",
    intro: "From interface to infrastructure - the languages, systems and tools behind my full-stack and AI work.",
  },
  experience: {
    heading: "Where I've",
    accent: "built.",
    resumeLabel: "View resume",
  },
  projects: {
    heading: "Selected work",
    archiveLabel: "All projects",
    archiveHeading: "Selected",
    archiveAccent: "projects.",
    archiveIntro: "From a conversation grounded in documents to a service that connects people. A closer look at what I build, and how it works.",
    archiveExploreLabel: "Explore the work",
    closingPrompt: "Something you'd like to build?",
    closingLabel: "Let's talk",
  },
  contact: {
    heading: "Have something worth making better?",
    body: "I'm open to work where thoughtful product decisions, full-stack engineering, or applied AI can create a meaningful improvement.",
  },
};

export const defaultPortfolioContent = {
  version: 1,
  updatedAt: null,
  site: defaultSiteText,
  profile,
  experiences: experiences.map((experience, index) => ({
    id: `experience-${index + 1}`,
    ...experience,
  })),
  projects: caseStudies.map((project, index) => ({
    ...project,
    published: true,
    featured: index < 2,
  })),
};

export const cloneDefaultContent = () => JSON.parse(JSON.stringify(defaultPortfolioContent));
