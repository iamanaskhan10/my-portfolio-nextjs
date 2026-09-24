import "@/styles/globals.css";
import { PortfolioContentProvider } from "../context/PortfolioContentContext";

export default function App({ Component, pageProps }) {
  return <PortfolioContentProvider content={pageProps.content}><Component {...pageProps} /></PortfolioContentProvider>;
}
