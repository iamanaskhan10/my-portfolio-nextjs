"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown, ArrowUp, BriefcaseBusiness, ExternalLink, FileText,
  FolderKanban, Image as ImageIcon, LogOut, Plus, Save, Trash2, Upload,
} from "lucide-react";
import BrandMark from "../portfolio/BrandMark";
import styles from "./PortfolioAdmin.module.css";

const navigation = [
  { id: "site", label: "Site copy", icon: FileText },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "media", label: "Media", icon: ImageIcon },
];

const lines = (value) => (value || []).join("\n");
const parseLines = (value) => value.split("\n").map((item) => item.trim()).filter(Boolean);
const pairs = (value) => (value || []).map((item) => `${item.title} | ${item.body}`).join("\n");
const parsePairs = (value) => value.split("\n").map((item) => item.trim()).filter(Boolean).map((item) => {
  const [title, ...body] = item.split("|");
  return { title: title.trim(), body: body.join("|").trim() || "Add supporting detail." };
});

function Field({ label, hint, multiline = false, value = "", onChange, ...props }) {
  const Control = multiline ? "textarea" : "input";
  const focused = useRef(false);
  const [draft, setDraft] = useState(value);
  useEffect(() => {
    if (!focused.current) setDraft(value);
  }, [value]);
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <Control
        {...props}
        value={draft}
        onFocus={() => { focused.current = true; }}
        onBlur={() => { focused.current = false; setDraft(value); }}
        onChange={(event) => { setDraft(event.target.value); onChange(event.target.value); }}
      />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className={styles.toggle}>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span aria-hidden="true" />
      {label}
    </label>
  );
}

const blankProject = (position) => ({
  slug: `new-project-${Date.now()}`,
  number: String(position + 1).padStart(2, "0"),
  title: "Untitled project",
  group: "Full-stack",
  category: "Product platform",
  period: String(new Date().getFullYear()),
  description: "Add a concise project description.",
  headline: "Add a focused project headline.",
  stack: "JavaScript · React",
  link: "https://github.com/",
  sourceAvailable: false,
  published: false,
  featured: false,
  metric: { value: "New", label: "documented capability", detail: "Replace with a factual project detail" },
  highlights: ["Add a factual outcome or capability."],
  problem: "Describe the problem this project addresses.",
  approach: "Describe the implementation and engineering approach.",
  flow: ["Input", "Processing", "Output"],
  features: [{ title: "Core feature", body: "Describe how this feature works." }],
  decisions: [{ title: "Implementation decision", body: "Explain the reasoning behind this decision." }],
  takeaway: "Summarize what the project demonstrates.",
  gallery: [],
  cover: null,
});

const blankExperience = () => ({
  id: `experience-${Date.now()}`,
  role: "New role",
  company: "Company",
  duration: "Start - End",
  outcome: "Describe the work and its factual outcome.",
});

async function responseJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error(data.message || "The request failed.");
  return data;
}

async function imageDimensions(url) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("The image could not be read."));
    image.src = url;
  });
}

export default function PortfolioAdmin() {
  const [phase, setPhase] = useState("loading");
  const [configured, setConfigured] = useState(true);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(null);
  const [section, setSection] = useState("projects");
  const [projectIndex, setProjectIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [media, setMedia] = useState([]);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState(null);

  const loadContent = useCallback(async () => {
    const [contentData, mediaData] = await Promise.all([
      fetch("/api/admin/content", { cache: "no-store" }).then(responseJson),
      fetch("/api/admin/media", { cache: "no-store" }).then(responseJson),
    ]);
    setContent(contentData.content);
    setMedia(mediaData.media);
    setDirty(false);
    setPhase("ready");
  }, []);

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" }).then(responseJson).then((data) => {
      setConfigured(data.configured);
      if (data.authenticated) return loadContent();
      setPhase("login");
    }).catch((error) => {
      setNotice({ type: "error", text: error.message });
      setPhase("login");
    });
  }, [loadContent]);

  useEffect(() => {
    const warn = (event) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const mutate = (updater) => {
    setContent((current) => updater(structuredClone(current)));
    setDirty(true);
    setNotice(null);
  };

  const signIn = async (event) => {
    event.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }).then(responseJson);
      setPassword("");
      await loadContent();
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    setBusy(true);
    setNotice(null);
    try {
      const data = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) }).then(responseJson);
      setContent(data.content);
      setDirty(false);
      setNotice({ type: "success", text: "Portfolio changes are live." });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setContent(null);
    setPhase("login");
  };

  const updateProject = (field, value) => mutate((draft) => {
    draft.projects[projectIndex][field] = value;
    if (field === "gallery") draft.projects[projectIndex].cover = value[0] || null;
    return draft;
  });
  const updateExperience = (field, value) => mutate((draft) => { draft.experiences[experienceIndex][field] = value; return draft; });
  const updateSite = (group, field, value) => mutate((draft) => { draft.site[group][field] = value; return draft; });
  const updateProfile = (field, value) => mutate((draft) => { draft.profile[field] = value; return draft; });

  const addProject = () => {
    const nextIndex = content.projects.length;
    mutate((draft) => { draft.projects.push(blankProject(draft.projects.length)); return draft; });
    setProjectIndex(nextIndex);
    setSection("projects");
  };
  const deleteProject = () => {
    const project = content.projects[projectIndex];
    if (!window.confirm(`Delete ${project.title}? Uploaded files will remain in the media library.`)) return;
    mutate((draft) => { draft.projects.splice(projectIndex, 1); return draft; });
    setProjectIndex((index) => Math.max(0, index - 1));
  };
  const addExperience = () => {
    const nextIndex = content.experiences.length;
    mutate((draft) => { draft.experiences.push(blankExperience()); return draft; });
    setExperienceIndex(nextIndex);
    setSection("experience");
  };
  const deleteExperience = () => {
    if (content.experiences.length === 1 || !window.confirm("Delete this experience entry?")) return;
    mutate((draft) => { draft.experiences.splice(experienceIndex, 1); return draft; });
    setExperienceIndex((index) => Math.max(0, index - 1));
  };

  const addMediaToProject = async (item) => {
    try {
      const dimensions = item.width > 1 ? item : { ...item, ...await imageDimensions(item.url) };
      const title = item.name.replace(/-[a-f0-9]{8}\.[^.]+$/i, "").replace(/-/g, " ");
      updateProject("gallery", [...content.projects[projectIndex].gallery, {
        src: item.url, title, alt: `${content.projects[projectIndex].title} product screenshot`, caption: "Product interface screenshot.", kind: "screenshot", width: dimensions.width, height: dimensions.height,
      }]);
      setSection("projects");
      setNotice({ type: "success", text: "Image added to the selected project. Add its caption before saving." });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    }
  };

  const upload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true);
    setNotice(null);
    try {
      const localUrl = URL.createObjectURL(file);
      const dimensions = await imageDimensions(localUrl);
      URL.revokeObjectURL(localUrl);
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("The image could not be read."));
        reader.readAsDataURL(file);
      });
      const data = await fetch("/api/admin/media", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: file.name, type: file.type, data: String(dataUrl).split(",")[1], ...dimensions }) }).then(responseJson);
      setMedia((items) => [data.media, ...items]);
      setNotice({ type: "success", text: "Image uploaded to the media library." });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    } finally {
      setBusy(false);
    }
  };

  const deleteMedia = async (item) => {
    if (!window.confirm(`Delete ${item.name}? Existing project references will stop working.`)) return;
    try {
      await fetch(`/api/admin/media?name=${encodeURIComponent(item.name)}`, { method: "DELETE" }).then(responseJson);
      setMedia((items) => items.filter((entry) => entry.name !== item.name));
    } catch (error) {
      setNotice({ type: "error", text: error.message });
    }
  };

  const selectedProject = content?.projects[projectIndex];
  const selectedExperience = content?.experiences[experienceIndex];
  const lastSaved = useMemo(() => content?.updatedAt ? new Date(content.updatedAt).toLocaleString() : "Bundled content", [content?.updatedAt]);

  if (phase === "loading") return <main className={styles.loading}><BrandMark /><span>Opening portfolio CMS</span></main>;

  if (phase === "login") return (
    <main className={styles.loginPage}>
      <div className={styles.loginBrand}><BrandMark /><span>Anas Khan</span></div>
      <form className={styles.login} onSubmit={signIn}>
        <p>Portfolio CMS</p>
        <h1>Manage the work behind the work.</h1>
        {configured ? (
          <>
            <Field label="Admin password" type="password" autoComplete="current-password" value={password} onChange={setPassword} required />
            <button className={styles.primary} type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
          </>
        ) : (
          <div className={styles.setup} role="status">Add <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> to <code>.env.local</code>, then restart the server.</div>
        )}
        {notice && <p className={styles[notice.type]} role="alert">{notice.text}</p>}
        <Link href="/">Return to portfolio <ExternalLink size={15} /></Link>
      </form>
    </main>
  );

  return (
    <main className={styles.admin}>
      <aside className={styles.sidebar}>
        <div className={styles.identity}><BrandMark /><span>Portfolio<small>Content system</small></span></div>
        <nav aria-label="CMS sections">
          {navigation.map(({ id, label, icon: Icon }) => <button type="button" key={id} data-active={section === id} onClick={() => setSection(id)}><Icon size={18} />{label}</button>)}
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/" target="_blank">View portfolio <ExternalLink size={15} /></Link>
          <button type="button" onClick={logout}><LogOut size={16} /> Sign out</button>
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.toolbar}>
          <div><span>{dirty ? "Unsaved changes" : `Saved · ${lastSaved}`}</span>{notice && <strong className={styles[notice.type]}>{notice.text}</strong>}</div>
          <button className={styles.primary} type="button" onClick={save} disabled={busy || !dirty}><Save size={17} />{busy ? "Working..." : "Publish changes"}</button>
        </header>

        {section === "site" && <SiteEditor content={content} updateSite={updateSite} updateProfile={updateProfile} />}
        {section === "projects" && <ProjectsEditor projects={content.projects} project={selectedProject} projectIndex={projectIndex} setProjectIndex={setProjectIndex} updateProject={updateProject} addProject={addProject} deleteProject={deleteProject} />}
        {section === "experience" && <ExperienceEditor experiences={content.experiences} experience={selectedExperience} experienceIndex={experienceIndex} setExperienceIndex={setExperienceIndex} updateExperience={updateExperience} addExperience={addExperience} deleteExperience={deleteExperience} />}
        {section === "media" && <MediaEditor media={media} project={selectedProject} upload={upload} busy={busy} addToProject={addMediaToProject} deleteMedia={deleteMedia} />}
      </section>
    </main>
  );
}

function SiteEditor({ content, updateSite, updateProfile }) {
  const { site, profile } = content;
  return (
    <div className={styles.editor}>
      <header className={styles.editorHeading}><h1>Site copy</h1><p>Edit the shared identity and primary section messaging.</p></header>
      <fieldset><legend>Profile</legend><div className={styles.formGrid}>
        {["name", "title", "email", "phone", "github", "linkedin", "resume"].map((field) => <Field key={field} label={field} value={profile[field] || ""} onChange={(value) => updateProfile(field, value)} />)}
      </div></fieldset>
      <fieldset><legend>Hero</legend><div className={styles.formGrid}>
        <Field label="Headline lines" multiline value={lines(site.hero.lines)} onChange={(value) => updateSite("hero", "lines", parseLines(value))} hint="One line per row." />
        <Field label="Primary CTA" value={site.hero.ctaLabel} onChange={(value) => updateSite("hero", "ctaLabel", value)} />
        <Field label="Download label" value={site.hero.downloadLabel} onChange={(value) => updateSite("hero", "downloadLabel", value)} />
        <Field label="View label" value={site.hero.viewLabel} onChange={(value) => updateSite("hero", "viewLabel", value)} />
      </div></fieldset>
      <fieldset><legend>About</legend><div className={styles.formGrid}>
        <Field label="Phrases" multiline value={lines(site.about.phrases)} onChange={(value) => updateSite("about", "phrases", parseLines(value))} />
        <Field label="Positioning" multiline value={site.about.heading} onChange={(value) => updateSite("about", "heading", value)} />
        <Field label="About text" multiline value={site.about.body} onChange={(value) => updateSite("about", "body", value)} />
        <Field label="Toolkit link" value={site.about.linkLabel} onChange={(value) => updateSite("about", "linkLabel", value)} />
      </div></fieldset>
      <fieldset><legend>Section headings</legend><div className={styles.formGrid}>
        <Field label="Technology heading" value={site.technology.heading} onChange={(value) => updateSite("technology", "heading", value)} />
        <Field label="Technology accent" value={site.technology.accent} onChange={(value) => updateSite("technology", "accent", value)} />
        <Field label="Technology introduction" multiline value={site.technology.intro} onChange={(value) => updateSite("technology", "intro", value)} />
        <Field label="Experience heading" value={site.experience.heading} onChange={(value) => updateSite("experience", "heading", value)} />
        <Field label="Experience accent" value={site.experience.accent} onChange={(value) => updateSite("experience", "accent", value)} />
        <Field label="Experience resume label" value={site.experience.resumeLabel} onChange={(value) => updateSite("experience", "resumeLabel", value)} />
        <Field label="Projects heading" value={site.projects.heading} onChange={(value) => updateSite("projects", "heading", value)} />
      </div></fieldset>
      <fieldset><legend>Contact</legend><div className={styles.formGrid}>
        <Field label="Heading" multiline value={site.contact.heading} onChange={(value) => updateSite("contact", "heading", value)} />
        <Field label="Supporting text" multiline value={site.contact.body} onChange={(value) => updateSite("contact", "body", value)} />
      </div></fieldset>
      <fieldset><legend>Project archive</legend><div className={styles.formGrid}>
        {["archiveHeading", "archiveAccent", "archiveLabel", "archiveExploreLabel", "closingPrompt", "closingLabel"].map((field) => <Field key={field} label={field.replace(/([A-Z])/g, " $1")} value={site.projects[field]} onChange={(value) => updateSite("projects", field, value)} />)}
        <Field label="Archive introduction" multiline value={site.projects.archiveIntro} onChange={(value) => updateSite("projects", "archiveIntro", value)} />
      </div></fieldset>
      <fieldset><legend>Search metadata</legend><div className={styles.formGrid}>
        {Object.entries(site.seo).map(([field, value]) => <Field key={field} label={field.replace(/([A-Z])/g, " $1")} multiline={field.toLowerCase().includes("description")} value={value} onChange={(next) => updateSite("seo", field, next)} />)}
      </div></fieldset>
    </div>
  );
}

function ProjectsEditor({ projects, project, projectIndex, setProjectIndex, updateProject, addProject, deleteProject }) {
  const updateImage = (index, field, value) => updateProject("gallery", project.gallery.map((image, imageIndex) => imageIndex === index ? { ...image, [field]: ["width", "height"].includes(field) ? Number(value) : value } : image));
  const moveImage = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= project.gallery.length) return;
    const gallery = [...project.gallery];
    [gallery[index], gallery[target]] = [gallery[target], gallery[index]];
    updateProject("gallery", gallery);
  };
  return (
    <div className={styles.splitEditor}>
      <aside className={styles.recordList}>
        <div><h2>Projects</h2><button type="button" onClick={addProject} aria-label="Add project"><Plus size={18} /></button></div>
        {projects.map((item, index) => <button type="button" key={`${item.slug}-${index}`} data-active={index === projectIndex} onClick={() => setProjectIndex(index)}><span>{item.number}</span><strong>{item.title}</strong><small>{item.published ? "Published" : "Draft"}</small></button>)}
      </aside>
      <div className={styles.editor}>
        <header className={styles.editorHeading}><div><h1>{project.title}</h1><p>Project identity, story, outcomes, and gallery.</p></div><button className={styles.dangerButton} type="button" onClick={deleteProject} disabled={projects.length === 1}><Trash2 size={16} /> Delete</button></header>
        <div className={styles.toggles}><Toggle label="Published" checked={project.published} onChange={(value) => updateProject("published", value)} /><Toggle label="Featured on homepage" checked={project.featured} onChange={(value) => updateProject("featured", value)} /><Toggle label="Source available" checked={project.sourceAvailable !== false} onChange={(value) => updateProject("sourceAvailable", value)} /></div>
        <fieldset><legend>Identity</legend><div className={styles.formGrid}>
          <Field label="Title" value={project.title} onChange={(value) => updateProject("title", value)} />
          <Field label="Slug" value={project.slug} onChange={(value) => updateProject("slug", value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} hint="Changing this changes the project URL." />
          <Field label="Number" value={project.number} onChange={(value) => updateProject("number", value)} />
          <Field label="Group" value={project.group} onChange={(value) => updateProject("group", value)} />
          <Field label="Category" value={project.category} onChange={(value) => updateProject("category", value)} />
          <Field label="Period" value={project.period} onChange={(value) => updateProject("period", value)} />
          <Field label="Repository URL" value={project.link || ""} onChange={(value) => updateProject("link", value)} />
          <Field label="Technology stack" value={project.stack} onChange={(value) => updateProject("stack", value)} hint="Separate technologies with ·" />
        </div></fieldset>
        <fieldset><legend>Story</legend><div className={styles.formGrid}>
          <Field label="Archive description" multiline value={project.description} onChange={(value) => updateProject("description", value)} />
          <Field label="Detail-page headline" multiline value={project.headline} onChange={(value) => updateProject("headline", value)} />
          <Field label="Problem" multiline value={project.problem} onChange={(value) => updateProject("problem", value)} />
          <Field label="Implementation" multiline value={project.approach} onChange={(value) => updateProject("approach", value)} />
          <Field label="Takeaway" multiline value={project.takeaway} onChange={(value) => updateProject("takeaway", value)} />
          <Field label="Workflow" multiline value={lines(project.flow)} onChange={(value) => updateProject("flow", parseLines(value))} hint="One step per line." />
          <Field label="Highlights" multiline value={lines(project.highlights)} onChange={(value) => updateProject("highlights", parseLines(value))} hint="One factual point per line." />
          <Field label="Features" multiline value={pairs(project.features)} onChange={(value) => updateProject("features", parsePairs(value))} hint="One per line: Title | Description" />
          <Field label="Implementation decisions" multiline value={pairs(project.decisions)} onChange={(value) => updateProject("decisions", parsePairs(value))} hint="One per line: Title | Description" />
        </div></fieldset>
        <fieldset><legend>Metric</legend><div className={styles.formGrid}>
          {Object.entries(project.metric).map(([field, value]) => <Field key={field} label={field} value={value} onChange={(next) => updateProject("metric", { ...project.metric, [field]: next })} />)}
        </div></fieldset>
        <fieldset><legend>Gallery</legend><p className={styles.fieldsetIntro}>The first image becomes the project cover. Upload files from the Media section, then attach them to this project.</p>
          {project.gallery.length === 0 && <div className={styles.empty}>This draft has no images yet.</div>}
          <div className={styles.galleryEditor}>{project.gallery.map((image, index) => (
            <article key={`${image.src}-${index}`}>
              <img src={image.src} alt="" />
              <div className={styles.imageFields}>
                <Field label="Source" value={image.src} onChange={(value) => updateImage(index, "src", value)} />
                <Field label="Title" value={image.title} onChange={(value) => updateImage(index, "title", value)} />
                <Field label="Alt text" value={image.alt} onChange={(value) => updateImage(index, "alt", value)} />
                <Field label="Caption" multiline value={image.caption} onChange={(value) => updateImage(index, "caption", value)} />
                <Field label="Width" type="number" value={image.width} onChange={(value) => updateImage(index, "width", value)} />
                <Field label="Height" type="number" value={image.height} onChange={(value) => updateImage(index, "height", value)} />
              </div>
              <div className={styles.imageActions}><button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0}><ArrowUp size={16} /> Earlier</button><button type="button" onClick={() => moveImage(index, 1)} disabled={index === project.gallery.length - 1}><ArrowDown size={16} /> Later</button><button type="button" onClick={() => updateProject("gallery", project.gallery.filter((_, imageIndex) => imageIndex !== index))}><Trash2 size={16} /> Remove</button></div>
            </article>
          ))}</div>
        </fieldset>
      </div>
    </div>
  );
}

function ExperienceEditor({ experiences, experience, experienceIndex, setExperienceIndex, updateExperience, addExperience, deleteExperience }) {
  return (
    <div className={styles.splitEditor}>
      <aside className={styles.recordList}><div><h2>Experience</h2><button type="button" onClick={addExperience} aria-label="Add experience"><Plus size={18} /></button></div>{experiences.map((item, index) => <button type="button" key={item.id} data-active={index === experienceIndex} onClick={() => setExperienceIndex(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.role}</strong><small>{item.company}</small></button>)}</aside>
      <div className={styles.editor}>
        <header className={styles.editorHeading}><div><h1>{experience.role}</h1><p>Role, company, dates, and the factual result.</p></div><button className={styles.dangerButton} type="button" onClick={deleteExperience} disabled={experiences.length === 1}><Trash2 size={16} /> Delete</button></header>
        <fieldset><legend>Entry</legend><div className={styles.formGrid}>
          <Field label="Role" value={experience.role} onChange={(value) => updateExperience("role", value)} />
          <Field label="Company" value={experience.company} onChange={(value) => updateExperience("company", value)} />
          <Field label="Duration" value={experience.duration} onChange={(value) => updateExperience("duration", value)} />
          <Field label="Outcome" multiline value={experience.outcome} onChange={(value) => updateExperience("outcome", value)} />
        </div></fieldset>
      </div>
    </div>
  );
}

function MediaEditor({ media, project, upload, busy, addToProject, deleteMedia }) {
  return (
    <div className={styles.editor}>
      <header className={styles.editorHeading}><div><h1>Media library</h1><p>Upload product images and attach them to {project.title}.</p></div><label className={styles.upload}><Upload size={17} />{busy ? "Uploading..." : "Upload image"}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={upload} disabled={busy} /></label></header>
      {media.length === 0 ? <div className={styles.empty}>No uploaded media yet. Existing project assets remain available at their current paths.</div> : <div className={styles.mediaList}>{media.map((item) => <article key={item.name}><img src={item.url} alt="" /><div><strong>{item.name}</strong><span>{(item.size / 1024).toFixed(0)} KB</span></div><button type="button" onClick={() => addToProject(item)}><Plus size={16} /> Add to project</button><button type="button" aria-label={`Delete ${item.name}`} onClick={() => deleteMedia(item)}><Trash2 size={16} /></button></article>)}</div>}
    </div>
  );
}
