import Head from "next/head";
import Layout from "../../components/Layout";
import CaseStudy from "../../components/portfolio/CaseStudy";

export default function CaseStudyPage({ project, nextProject }) {
  return (
    <Layout>
      <Head>
        <title>{`${project.title} - Project - Anas Khan`}</title>
        <meta name="description" content={project.description} />
      </Head>
      <CaseStudy project={project} nextProject={nextProject} />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { getPortfolioContent } = await import("../../lib/server/contentStore");
  const content = await getPortfolioContent({ publicOnly: true });
  const index = content.projects.findIndex((project) => project.slug === params.slug);
  if (index === -1) return { notFound: true };
  return { props: { content, project: content.projects[index], nextProject: content.projects[(index + 1) % content.projects.length] } };
}
