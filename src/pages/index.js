import Head from "next/head";
import Layout from "../components/Layout";
import CinematicPortfolio from "../components/CinematicPortfolio";

export default function Home({ content }) {
  return (
    <Layout>
      <Head>
        <title>{content.site.seo.homeTitle}</title>
        <meta name="description" content={content.site.seo.homeDescription} />
      </Head>
      <CinematicPortfolio />
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getPortfolioContent } = await import("../lib/server/contentStore");
  return { props: { content: await getPortfolioContent({ publicOnly: true }) } };
}
