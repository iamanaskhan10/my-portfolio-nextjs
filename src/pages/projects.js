import Head from "next/head";
import Layout from "../components/Layout";
import Projects from "../components/Projects";

export default function ProjectsPage({ content }) {
  return (
    <Layout>
      <Head>
        <title>{content.site.seo.projectsTitle}</title>
        <meta name="description" content={content.site.seo.projectsDescription} />
      </Head>
      <Projects showAll />
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getPortfolioContent } = await import("../lib/server/contentStore");
  return { props: { content: await getPortfolioContent({ publicOnly: true }) } };
}
