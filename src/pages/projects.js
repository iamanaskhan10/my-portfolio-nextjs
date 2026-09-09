import React from "react";
import Projects from "../components/Projects";
import Layout from "../components/Layout";
import Head from "next/head";

const ProjectsPage = () => {
  return <Layout><Head><title>Project case studies · Anas Khan</title><meta name="description" content="The problems, implementation decisions, and outcomes behind Anas Khan's selected full-stack and AI projects." /></Head><Projects showAll /></Layout>;
};

export default ProjectsPage;
