import React from "react";
import Projects from "../components/Projects";
import Layout from "../components/Layout";
import Head from "next/head";

const ProjectsPage = () => {
  return <Layout><Head><title>Projects · Anas Khan</title><meta name="description" content="Selected full-stack and AI projects by Anas Khan, including their problems, implementation decisions, and outcomes." /></Head><Projects showAll /></Layout>;
};

export default ProjectsPage;
