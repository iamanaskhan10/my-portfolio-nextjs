import Layout from "../components/Layout";
import CinematicPortfolio from "../components/CinematicPortfolio";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Anas Khan — Full-stack &amp; AI Engineer</title>
        <meta name="description" content="Explore Anas Khan’s full-stack and AI engineering work, interactive technology toolkit, and experience building reliable products." />
      </Head>
      <CinematicPortfolio />
    </Layout>
  );
}
