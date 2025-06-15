import Layout from "../components/Layout";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Experience/>
      <Projects />
      <Achievements/>
      <Contact />
    </Layout>
  );
}
