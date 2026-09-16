"use client";

import {
  Bot, Braces, BrainCircuit, Database, LibraryBig, MessageSquareText, Mic2,
  Network, ScanEye,
} from "lucide-react";
import { DiJava } from "react-icons/di";
import {
  SiAmazonwebservices, SiApachejmeter, SiDocker, SiExpress, SiFastapi, SiGit,
  SiGithub, SiJavascript, SiJsonwebtokens, SiMongodb, SiMysql, SiNextdotjs,
  SiNodedotjs, SiPostgresql, SiPostman, SiPython, SiReact, SiRubyonrails,
  SiSocketdotio, SiTailwindcss,
} from "react-icons/si";
import { technologyGroups } from "../../data/technologies";
import ScrollReveal from "./ScrollReveal";
import styles from "./TechnologyStack.module.css";

const icons = {
  javascript: SiJavascript, python: SiPython, java: DiJava, sql: Database,
  react: SiReact, next: SiNextdotjs, tailwind: SiTailwindcss,
  rails: SiRubyonrails, node: SiNodedotjs, express: SiExpress, fastapi: SiFastapi,
  rest: Braces, jwt: SiJsonwebtokens, socket: SiSocketdotio,
  postgres: SiPostgresql, mongo: SiMongodb, mysql: SiMysql, vector: Network,
  vision: ScanEye, nlp: MessageSquareText, rag: LibraryBig, llm: BrainCircuit,
  agent: Bot, speech: Mic2, aws: SiAmazonwebservices, docker: SiDocker, cdn: Network,
  git: SiGit, github: SiGithub, postman: SiPostman, jmeter: SiApachejmeter,
};

function TechnologyGroup({ group }) {
  const headingId = `technology-${group.name.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <ScrollReveal as="section" className={styles.group} aria-labelledby={headingId}>
      <h3 id={headingId}>{group.name}</h3>
      <ul className={styles.technologies}>
        {group.items.map((technology) => {
          const Icon = icons[technology.icon];
          const descriptionId = `${headingId}-${technology.name.replace(/\W+/g, "-").toLowerCase()}-description`;
          return (
            <li key={technology.name} className={styles.technology} style={{ "--tech-color": technology.color }} tabIndex={0} aria-describedby={descriptionId}>
              <Icon className={styles.icon} aria-hidden="true" />
              <strong>{technology.name}</strong>
              <span id={descriptionId}>{technology.detail}</span>
            </li>
          );
        })}
      </ul>
    </ScrollReveal>
  );
}

export default function TechnologyStack() {
  return (
    <section id="capabilities" className={styles.section} aria-labelledby="capabilities-heading">
      <div className={styles.inner}>
        <ScrollReveal className={styles.heading}>
          <h2 id="capabilities-heading">Technologies<br /><span>I build with.</span></h2>
          <p>From interface to infrastructure — the languages, systems and tools behind my full-stack and AI work.</p>
        </ScrollReveal>
        <div className={styles.groups}>
          {technologyGroups.map((group) => <TechnologyGroup key={group.name} group={group} />)}
        </div>
      </div>
    </section>
  );
}
