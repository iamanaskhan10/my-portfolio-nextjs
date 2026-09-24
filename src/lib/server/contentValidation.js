const TEXT_LIMIT = 12000;
const SHORT_LIMIT = 240;

const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);
const validMediaSource = (value) => typeof value === "string" && /^\/[a-zA-Z0-9/_().%+\-]+$/.test(value);

function requireText(value, field, limit = TEXT_LIMIT) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${field} is required.`);
  if (value.length > limit) throw new Error(`${field} is too long.`);
}

function requireStringArray(value, field, max = 40) {
  if (!Array.isArray(value) || value.length > max) throw new Error(`${field} is invalid.`);
  value.forEach((item, index) => requireText(item, `${field}[${index}]`, SHORT_LIMIT));
}

export function validatePortfolioContent(input) {
  if (!isObject(input) || !isObject(input.site) || !isObject(input.profile)) throw new Error("The content document is invalid.");
  if (!Array.isArray(input.projects) || input.projects.length < 1 || input.projects.length > 100) throw new Error("Projects are invalid.");
  if (!Array.isArray(input.experiences) || input.experiences.length < 1 || input.experiences.length > 100) throw new Error("Experience is invalid.");

  const siteFields = {
    seo: ["homeTitle", "homeDescription", "projectsTitle", "projectsDescription"],
    hero: ["downloadLabel", "viewLabel", "ctaLabel"],
    about: ["heading", "body", "linkLabel"],
    technology: ["heading", "accent", "intro"],
    experience: ["heading", "accent", "resumeLabel"],
    projects: ["heading", "archiveLabel", "archiveHeading", "archiveAccent", "archiveIntro", "archiveExploreLabel", "closingPrompt", "closingLabel"],
    contact: ["heading", "body"],
  };
  Object.entries(siteFields).forEach(([group, fields]) => {
    if (!isObject(input.site[group])) throw new Error(`Site ${group} content is invalid.`);
    fields.forEach((field) => requireText(input.site[group][field], `Site ${group} ${field}`));
  });
  requireStringArray(input.site.hero.lines, "Hero lines", 6);
  requireStringArray(input.site.about.phrases, "About phrases", 6);

  ["name", "title", "email", "github", "linkedin", "resume"].forEach((field) => requireText(input.profile[field], `Profile ${field}`, SHORT_LIMIT));

  const experienceIds = new Set();
  input.experiences.forEach((experience, index) => {
    if (!isObject(experience)) throw new Error(`Experience ${index + 1} is invalid.`);
    ["id", "role", "company", "duration", "outcome"].forEach((field) => requireText(experience[field], `Experience ${index + 1} ${field}`, field === "outcome" ? TEXT_LIMIT : SHORT_LIMIT));
    if (experienceIds.has(experience.id)) throw new Error("Experience IDs must be unique.");
    experienceIds.add(experience.id);
  });

  const slugs = new Set();
  input.projects.forEach((project, index) => {
    if (!isObject(project)) throw new Error(`Project ${index + 1} is invalid.`);
    ["slug", "number", "title", "group", "category", "period", "description", "headline", "stack", "problem", "approach", "takeaway"].forEach((field) => requireText(project[field], `Project ${index + 1} ${field}`, ["description", "problem", "approach", "takeaway"].includes(field) ? TEXT_LIMIT : SHORT_LIMIT));
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) throw new Error(`${project.title}: slug must use lowercase letters, numbers, and hyphens.`);
    if (slugs.has(project.slug)) throw new Error("Project slugs must be unique.");
    slugs.add(project.slug);
    requireStringArray(project.highlights, `${project.title} highlights`);
    requireStringArray(project.flow, `${project.title} workflow`);
    ["features", "decisions"].forEach((field) => {
      if (!Array.isArray(project[field]) || project[field].length > 30) throw new Error(`${project.title} ${field} are invalid.`);
      project[field].forEach((item, itemIndex) => {
        if (!isObject(item)) throw new Error(`${project.title} ${field}[${itemIndex}] is invalid.`);
        requireText(item.title, `${project.title} ${field} title`, SHORT_LIMIT);
        requireText(item.body, `${project.title} ${field} body`);
      });
    });
    if (!isObject(project.metric)) throw new Error(`${project.title} metric is invalid.`);
    ["value", "label", "detail"].forEach((field) => requireText(project.metric[field], `${project.title} metric ${field}`, SHORT_LIMIT));
    if (!Array.isArray(project.gallery) || project.gallery.length > 30 || (project.published !== false && project.gallery.length === 0)) throw new Error(`${project.title} needs at least one image before publishing.`);
    project.gallery.forEach((image, imageIndex) => {
      if (!isObject(image) || !validMediaSource(image.src)) throw new Error(`${project.title} image ${imageIndex + 1} has an invalid source.`);
      ["title", "alt", "caption"].forEach((field) => requireText(image[field], `${project.title} image ${field}`, field === "caption" ? TEXT_LIMIT : SHORT_LIMIT));
      if (!Number.isFinite(Number(image.width)) || !Number.isFinite(Number(image.height)) || Number(image.width) < 1 || Number(image.height) < 1) throw new Error(`${project.title} image ${imageIndex + 1} needs valid dimensions.`);
    });
  });

  const serialized = JSON.stringify(input);
  if (serialized.length > 2_000_000) throw new Error("The content document is too large.");
  return JSON.parse(serialized);
}
