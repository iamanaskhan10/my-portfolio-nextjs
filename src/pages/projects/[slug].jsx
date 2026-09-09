import Head from "next/head";
import Layout from "../../components/Layout";
import CaseStudy from "../../components/portfolio/CaseStudy";
import { caseStudies } from "../../data/caseStudies";

export default function CaseStudyPage({ project, nextProject }) {
  return (
    <Layout>
      <Head>
        <title>{project.title} — Case study · Anas Khan</title>
        <meta name="description" content={project.description} />
      </Head>
      <CaseStudy project={project} nextProject={nextProject} />
    </Layout>
  );
}

export function getStaticPaths() {
  return { paths: caseStudies.map(({ slug }) => ({ params: { slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  const index = caseStudies.findIndex((project) => project.slug === params.slug);
  if (index === -1) return { notFound: true };
  return { props: { project: caseStudies[index], nextProject: caseStudies[(index + 1) % caseStudies.length] } };
}
