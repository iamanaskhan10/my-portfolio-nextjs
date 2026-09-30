import Image from "next/image";
import BrandMark from "./BrandMark";
import styles from "./HeroPortal.module.css";

// These moments reuse profile/experience copy from the CMS. Images illustrate
// a moment only when an existing project is named in that experience.
export function buildIdentityMoments({ profile, site, experiences, projects }) {
  return [
    { id: "identity", label: profile.name, title: profile.name, eyebrow: profile.title,
      body: site.about.phrases.join(" "), image: { src: "/anas-khan-cutout.png", alt: `Portrait of ${profile.name}`, width: 1375, height: 1144 }, identity: true },
    ...experiences.map((experience) => {
      const project = projects.find((item) => experience.outcome.toLowerCase().includes(item.title.toLowerCase()))
        || projects.find((item) => item.title.toLowerCase().includes(experience.company.toLowerCase()) && /cms/i.test(experience.outcome));
      return { id: experience.id, label: `${experience.role}, ${experience.company}`,
        title: experience.outcome.match(/^\d+(?:\.\d+)?[×x]/u)?.[0] || experience.role,
        eyebrow: experience.company, body: experience.outcome, duration: experience.duration,
        image: project?.cover };
    }),
    ...(projects.length ? [{ id: "work-portal", label: site.projects.heading,
      title: site.projects.heading, eyebrow: profile.name, portal: true }] : []),
  ];
}

export default function IdentityDisplayFaces({ moments }) {
  return moments.map((moment, index) => (
    index === 0 ? null : <article key={moment.id} className={`${styles.displayFace} ${moment.portal ? styles.portalFace : ""}`} data-identity-face={index} data-face-side={index % 4} style={{ "--face-angle": `${(index % 4) * 90}deg` }} inert aria-hidden="true">
      <div className={styles.faceMeta}><BrandMark /><span>{moment.eyebrow}</span></div>
      {moment.portal ? <>
        <svg className={styles.exitStar} data-exit-star viewBox="-20 -20 40 40" aria-hidden="true"><path d="M0,-15.0888Q0,0 15.0888,0Q0,0 0,15.0888Q0,0 -15.0888,0Q0,0 0,-15.0888Z" /></svg>
        <h2 className={styles.portalTitle}>{moment.title}</h2>
      </> : <>
      <h2 className={styles.faceTitle}>{moment.title}</h2>
      <figure className={styles.faceImage}>
        {moment.image ? <Image src={moment.image.src} alt={moment.image.alt} width={moment.image.width || 1200} height={moment.image.height || 700} sizes="(max-width: 767px) 70vw, 440px" /> : <BrandMark className={styles.identityMark} />}
      </figure>
      <p className={styles.faceDescription}>{moment.body}</p>
      {moment.duration && <p className={styles.faceDuration}>{moment.duration}</p>}
      </>}
    </article>
  ));
}
