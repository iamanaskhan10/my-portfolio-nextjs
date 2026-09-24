import Head from "next/head";
import PortfolioAdmin from "../../components/admin/PortfolioAdmin";

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Portfolio CMS - Anas Khan</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <PortfolioAdmin />
    </>
  );
}
