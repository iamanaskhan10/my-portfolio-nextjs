---
name: Anas Khan Portfolio
description: The established portrait and box portfolio with clear work and contact paths.
colors:
  ink: "#11120f"
  intro-ink: "#141517"
  hero-cream: "#d4cfb8"
  ink-raised: "#191a16"
  paper: "#d4cfb8"
  muted: "#c4c0aa"
  line: "rgba(212, 207, 184, 0.16)"
  line-strong: "rgba(212, 207, 184, 0.32)"
  signal: "#d4cfb8"
  signal-highlight: "#ebe7d6"
  signal-mid: "#b9b69f"
  signal-shadow: "#55564b"
  editorial-void: "#090a08"
  signal-ink: "#11120f"
  danger: "#ffaaa0"
  success: "#c5d1ad"
  paper-raised: "#e2e0d8"
  paper-muted: "#53574d"
  paper-line: "#11120f26"
  paper-line-strong: "#11120f52"
  paper-success: "#355500"
  paper-danger: "#a3201c"
typography:
  display:
    fontFamily: '"Manrope Hero", sans-serif'
    fontWeight: 400
  body:
    fontFamily: '"Manrope Hero", sans-serif'
    fontSize: "clamp(1.0625rem, 1.2vw, 1.125rem)"
  editorial-display:
    fontFamily: '"Manrope Hero", sans-serif'
    fontWeight: 500
  project-title:
    fontFamily: '"Manrope Hero", sans-serif'
    fontSize: "clamp(3rem, 5.25vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  case-study-display:
    fontFamily: '"Manrope Hero", sans-serif'
    fontSize: "clamp(3.3rem, 7.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.025em"
rounded:
  action: "999px"
  editorial-media: "0"
  editorial-thumbnail: "3px"
  editorial-viewer: "8px"
  animation-control: "6px"
components:
  action:
    backgroundColor: "{colors.hero-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "1rem 1.8rem"
  action-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.hero-cream}"
    rounded: "{rounded.action}"
  action-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.hero-cream}"
    rounded: "{rounded.action}"
    padding: "1rem 1.8rem"
  action-secondary-hover:
    backgroundColor: "{colors.hero-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
  action-inverse:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.hero-cream}"
    rounded: "{rounded.action}"
    padding: "1rem 1.8rem"
  action-inverse-hover:
    backgroundColor: "{colors.hero-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
  action-small:
    rounded: "{rounded.action}"
    padding: "0.65rem 1.1rem"
  action-large:
    rounded: "{rounded.action}"
    padding: "1.8rem 3rem"
  editorial-media:
    backgroundColor: "{colors.editorial-void}"
    textColor: "{colors.paper}"
    rounded: "{rounded.editorial-media}"
  editorial-viewer:
    backgroundColor: "{colors.editorial-void}"
    textColor: "{colors.paper}"
    rounded: "{rounded.editorial-viewer}"
  editorial-thumbnail:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.paper-muted}"
    rounded: "{rounded.editorial-thumbnail}"
    width: "72px"
    height: "48px"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "1.75rem max(1.15rem, 6vw)"
  floating-navigation:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.hero-cream}"
    rounded: "{rounded.action}"
    padding: "0.45rem 0.5rem 0.45rem 0.8rem"
  navigation-contact:
    backgroundColor: "{colors.hero-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "0 1.05rem"
  navigation-contact-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.hero-cream}"
    rounded: "{rounded.action}"
---

# Design System: Anas Khan Portfolio

## Overview

**Creative North Star: "Expressive portrait and box"**

The established portrait composition, upright panel sequence, black star, and spherical glitter remain the portfolio's expressive identity. Charcoal and warm cream connect the opening to the work list, archive, case studies, Contact, and CMS. Locally hosted Manrope carries both editorial headings and readable body copy. The refinement makes work and contact easier to reach while preserving the approved composition. Compact screens reach the upright box sooner, and the archive combines a name-led index with a substantial real-project image reel and an optional detailed gallery.

Technical work and factual explanation lead. The Dennis Snellenberg reference remains in the generous ruled project rows and square pointer-following preview with a vertical image reel; the shipped treatment uses charcoal and cream. Supplied screenshots, identity assets, and labeled system illustrations provide factual evidence. Product commitments remain in `PRODUCT.md`; publishing instructions live in `CMS.md`.

**Key Characteristics:**

- Charcoal fields, warm cream actions, fine translucent rules, and open editorial sections.
- Manrope throughout active public pages and the CMS, with restrained heading weights and large scale changes.
- The approved portrait, upright panels, black star, spherical glitter, and one-time curtain.
- Native scrolling, accessible actions, factual project imagery, and an intentional reduced-motion experience.

## Colors

`src/styles/globals.css` owns the warm neutral palette. Ink and raised ink establish the charcoal field; paper and muted provide readable text hierarchy. The source aliases paper and signal to hero cream, and signal-ink to charcoal. Signal highlight, mid, and shadow support the existing hero and panel atmosphere. Danger and success remain semantic feedback colors. The `paper-*` frontmatter values describe retained legacy gallery overrides, not active-page defaults.

### Primary

Hero cream supplies headings, primary actions, focus outlines, and the work-list View cue. Inverse charcoal actions belong on light panels. Secondary resume and demo actions have transparent backgrounds and cream outlines.

### Neutral

Ink is the main canvas, ink-raised supports media and administrative surfaces, and editorial-void deepens the Selected work introduction, About, Technologies, and media stages. Contact uses charcoal with cream text and underline fields. Fine translucent cream rules separate rows and sections. Technology icons are monochrome at rest and may reveal their existing brand colors on pointer hover. Experience's former colored atmosphere is hidden.

**The Shared Palette Rule.** Public pages and the CMS use charcoal and cream for navigation and actions; local brand imagery and semantic feedback do not redefine the global palette.

## Typography

Use locally hosted Manrope Hero for all active public and CMS headings, body copy, and controls. The type ramp is fluid rather than a fixed ratio. The uppercase hero composition remains a local treatment; section headings use restrained weights, tight tracking, and clear scale differences. The shared `SectionHeading` uses weight 500, line-height 1.08, and tracking -0.035em while its `as` prop preserves the required semantic heading level.

Homepage project titles use the token above; the no-hover cover layout uses `clamp(1.7rem, 3.7vw, 2.7rem)` and rows use 2rem below 601px. Case-study titles use the Manrope case-study display token; story prose uses 1rem, 1.85 line height, and a 70ch maximum. Shared body copy uses the fluid body token. Categories and metadata remain subordinate. Action labels use weight 500 and sentence case, at 0.9rem normally, 0.78rem small, and 1rem large.

**The One Family Rule.** Use Manrope for active public and CMS surfaces; retained legacy font declarations are not a new display-type system.

## Layout

Use fluid widths and responsive gutters. Project detail pages use a 78rem reading width, fluid side padding, and a sticky 12rem contents column beside the story. Below 768px this becomes one column with inline contents navigation. The wide homepage project list uses 8vw outer gutters and another 8vw inset within each ruled row. Titles sit left, categories right, with 4.1vw top and 4.8vw bottom row padding. The pointer preview is a square measuring `max(240px, 27.5vw)`, capped at the viewport width minus 32px. At 1024px and below, rows retain their name-led layout with 5vw outer gutters and 3vw row insets; at 600px and below, titles and categories stack. Only `any-hover: none` switches projects to two columns of visible square covers above their title, category, and period, using 5vw gutters. At 600px and below these covers form one column. Mouse users retain the ruled rows and hover preview at every viewport width. The archive pill is centered beneath the collection. Contact has a full-width heading above its introduction and open form, becoming one column below 768px.

The archive uses a 90rem maximum width with fluid side gutters. Its introduction and screenshot reel share two columns on wide screens; below 768px they stack, as does the detailed Gallery. At widths from 600px through 1000px and heights up to 600px, a compact landscape override restores a horizontal hero composition and two-column archive header with a horizontal toolbar. This override does not force the detailed Gallery into two columns below 768px. Archive Index reuses the same input-capability rules as homepage work rows, with smaller row insets and visible periods.

Experience retains horizontal columns and a visible next-item preview; below 900px its title sits above the track, and below 540px columns occupy 88% of the track. The footer has a compact 78rem inner row and a two-column mobile arrangement.

## Elevation & Depth

Dark tonal layers and fine rules provide depth. The floating dock uses an opaque charcoal surface, a 22% hero-cream border, and an intentional soft shadow (`0 8px 24px #0003`), with no backdrop blur. The homepage project list is flat, with fine rules and generous spacing. Its square image window floats above the rows as a pointer-following overlay without a shadow; the circular View cue sits over the image. About, Technologies, and Experience have no rendered colored atmosphere. Contact relies on type, underlines, and spacing rather than an enclosing form card.

Once the experience track scrolls, its left edge combines a fade mask and 5px backdrop blur. A 1.5rem scroll inset keeps settled titles readable. The Selected work introduction retains its scroll-linked rising images and their `0 24px 60px #0005` shadows. The project rows follow in document flow; the decorative hover preview is fixed to the viewport and does not intercept pointer events.

## Shapes

Preserve the existing mixture of open editorial sections, fine borders, pill actions, small technology tags, and round arrow controls. The homepage project preview and visible no-hover covers are square with sharp corners; its View cue is a 5.4rem circle. Shared actions, including the archive and contact submit, use the action radius token. The retained spread gallery keeps its rounded viewer, Full screen pill, thumbnails, and circular previous/next controls. Contact inputs use square underline fields. Case-study gallery media retains sharp corners. The shared `BrandMark.jsx` owns the precise angular AK geometry; reuse it for both identity and enlarged treatments.

## Components

- **Shared actions:** `PortfolioButton` supplies the cream primary pill with charcoal text, raising a charcoal fill with cream text on enabled hover and keyboard focus. The inverse variant starts charcoal/cream for light panels and raises cream on interaction. The secondary variant is transparent with a cream outline and text, raising cream with charcoal text; resume download and Watch demo use it. Standard actions have a 56px minimum height, small actions 44px, and large actions 6rem (96px). Focus uses a 2px cream outline with a 4px offset; disabled submission uses 0.55 opacity and a waiting cursor. Fill motion lasts 450ms with `cubic-bezier(0.22, 1, 0.36, 1)`; text and border changes last 250ms. Reduced motion removes transitions. Preserve internal Next.js links, native external and section anchors, native button/submit behavior, download, target, and rel semantics.
- **Shared headings:** `SectionHeading` applies the established display type treatment while `as` selects the required semantic element.
- **Legacy homepage hero:** the retained portrait/name arrangement lives in `LegacyCinematicPortfolio.jsx`; the current homepage uses the reference-led hero described below.
- **Homepage order:** Selected work introduction and project gallery → About → Technologies → Work Experience → Contact. The hero, panels, star transition, and floating navigation retain their established behavior.
- **Selected projects:** the existing scroll-linked Selected work introduction leads into charcoal Recent work rows. Each entire row is a direct case-study link with its CMS title and category. Published projects retain their order with featured projects first, and the closing archive pill retains its CMS label and shows the collection count. Hover shifts the title slightly left and category right, reducing their opacity to 0.55 and 0.65 respectively. Tab and Enter use the native links and cream focus outlines. Only devices matching `any-hover: none` show inline square covers and periods; viewport width alone never enables the cover grid. The previous `ProjectIndexGallery`, `ProjectSpreadGallery`, and `SelectedProject` implementations remain available as legacy components.
- **Project hover preview:** mouse pointers reveal a square window and cream View circle at every viewport width on hover-capable devices. The image follows with spring stiffness 240 and damping 28; the separate cursor uses stiffness 260, damping 32, and mass 0.8. Velocity gives the cream ball a damped stretch of at most 4.5% and its independently damped text at most 3px drift. All cover slides stay mounted in one vertical reel; selecting another row translates the reel by one window height per project index over 600ms with `cubic-bezier(0.22, 1, 0.36, 1)`. Scroll and resize schedule animation-frame hit testing at the last mouse position, so the selected image updates even with a stationary mouse, hides outside the rows, and returns when a row moves underneath again. The window and cue scale in and out, and also hide on leaving the rows, clicking, losing window focus, or changing page visibility. The overlay is decorative, hidden from assistive technology, and cannot intercept clicks. Reduced motion removes transitions and pointer smoothing, with an undeformed ball and stationary text relative to the cue. There is no homepage inspector, thumbnail strip, media player, or expand control; case-study pages retain their image galleries and full-screen viewers.
- **Project detail:** title, factual headline, project/year metadata, source or discussion action, captioned visual, contents navigation, technology list, problem, implementation, workflow, decisions, outcomes, and next-project link. Preserve Manrope and the charcoal/cream system; back, source, and discussion actions use the shared cream primary pill. GitHub appears where source availability permits; projects with sourceAvailable set to false retain a discussion action.
- **Case-study gallery:** an opening image followed by staggered detail imagery with factual captions. Each image opens the native full-screen dialog with previous/next controls, arrow keys, Escape, focus return, and body scroll locking. Keep illustrations explicitly labeled; DarziXpress retains its original identity asset.
- **Experience:** “Where I've / built.” uses Manrope above open columns that retain the supplied roles, companies, dates, and outcomes. The section is a quiet dark field with the former colored lighting hidden. Preserve the 56px difference-blend cursor on fine pointers, resume action, progress line, visible current/total position, 44px arrow buttons, mouse drag, native touch scrolling, and Arrow/Home/End keyboard navigation. Position changes are announced politely. Below 900px, the heading sits above the carousel.
- **Archive:** retain the CMS heading, accent, introduction, exploration label, closing prompt, and factual project content. Portfolio and GitHub links remain visible above an introduction paired with a substantial screenshot reel. Index is the default and reuses the approved ruled project links, square hover reel, and soft View cue; Gallery exposes descriptions, existing outcome or capability metrics, technology stacks, and project plus source/discussion actions. Category filters show counts; filter and layout buttons expose pressed state, and the result count is announced through a status region. The header reel uses actual project imagery, advances every 4.8 seconds, and provides previous, next, and pause/play controls with 44px targets. Automatic rotation stops offscreen, when the document is hidden, during pointer hover or keyboard focus, and under reduced motion. The clipped vertical slide takes 650ms with the shared ease-out curve; reduced motion removes transitions and autoplay while preserving manual navigation. Gallery imagery reveals a restrained Explore project action on hover/focus, always visible on no-hover devices. Missing media shows a factual placeholder. Keep the established opacity-only project navigation.
- **Footer:** compact identity, contact/social navigation, and a round back-to-top control; no laser treatment.
- **Technology section:** retain the dark surface and open monochrome icons beside a sticky desktop introduction with a Manrope heading. Seven résumé-based groups organize Languages, Frontend, Backend, Databases, AI / ML, Cloud & DevOps, and Tools. Every unique skill appears once. Core stack leads with Next.js, React.js, Python, FastAPI, PostgreSQL, and Docker, drawn from and removed from the existing groups to avoid duplication. Core descriptions are always visible, and no-hover devices show every description. Supporting descriptions appear below their own icon and label on hover or keyboard focus. Groups use fine horizontal rules and open three-column Core stack and four-column supporting grids that become two columns on mobile; no enclosing cards, shared tooltip, or duplicated skills. Pointer hover reveals the icon's brand color, raises it by 3px, and emphasizes its label in cream.
- **About:** a full-width dark section preserves its layout and generous spacing. The cream Manrope phrases “I learn.”, “I build.”, and “I ship.” enter once from the left in a tight 70ms stagger, with the middle phrase in muted text. Supporting copy specifies full-stack products across real-time AI, computer vision, and data-intensive systems.
- **Contact:** a full-width charcoal section places a large cream Manrope heading above the email introduction and open form. The email link comes before supporting copy; social actions remain available. Visible labels and square underline fields use cream focus outlines, readable muted placeholders, and semantic status colors. Submission uses `PortfolioButton`. Sending disables fields and submit and prevents duplicate submission. Errors keep the draft and offer direct email; success clears the fields. Status feedback is announced politely.
- **CMS:** Manrope and the same charcoal/cream palette cover the protected editor, with open fieldsets, underline inputs, a sticky sidebar and toolbar, cream active states, and denser administrative controls. Site copy, project, experience, media, publishing, and source-availability behavior remain intact.
- **Section entrances:** supporting About copy, technology heading and rows, experience content, and contact content enter once after roughly 20% of each element reaches a viewport inset by 12% from the bottom. Once JavaScript is ready, unreached content stays hidden until its entrance instead of appearing before the trigger; without JavaScript, it remains visible. Routine entrances last 280ms with 10px travel; images use 12px travel and scale from 0.99 to 1. They do not depend on continued scrolling; reduced motion keeps content visible and disables spatial entrances.
- **Navigation:** links follow the section order, use a fine cream underline for hover, focus, and the current section, and remain unboxed within the charcoal capsule. Native smooth anchor scrolling and small directional CTA arrow movements respect reduced motion.
- **Project imagery:** homepage work rows use existing CMS covers with `object-fit: cover` and zero padding, filling the square edge to edge with intentional cropping. A GIF cover uses the configured still poster or the first non-GIF gallery image; missing media shows the project title and a readable placeholder. The archive retains layered images and detail pages retain their dark surface, captions, illustration labels, and expandable gallery. Source links respect the existing source-availability data. Metrics describe documented capability, including 7.5× evidence capacity, three validation indicators, CMS publishing, and three user journeys; they do not imply user counts or investment performance.

### Approved hero, upright panels, and floating navigation

The current hero supersedes the earlier portrait/name arrangement above. Its three connected rows read “Full-stack &”, “Applied AI”, and “Products”, using locally hosted Manrope with cream lettering. The first row incorporates a small square work preview; the middle row aligns a short introduction to the left of its headline; the last row includes the published project count and a projects link. Hero lines remain CMS-controlled. The bottom actions place primary View work to `#selected-projects` beside the secondary resume download and retain the plain View resume link. The original portrait composition is retained in `LegacyCinematicPortfolio.jsx`.

The portrait is dimmed monochrome, with no green blend applied to the image. A subtle olive spotlight belongs to the background and fades to black at the edges. Native scroll still transforms the same live hero into the cube. The tiny work reel has no arrow or play/pause overlay. Once the entrance completes, it runs one short sequence of up to five project covers, giving each frame a 680ms bounce with slight rotation before settling on the last. It pauses on hover or focus, hidden pages, outside the hero, and during the fold; reduced motion shows the first cover without animation. The visible cover remains a labeled link to its case study.

Navigation is a compact floating dock near the bottom, with Projects, About, Tech stack, Experience, Archive, and contact. On narrow screens the destination row scrolls horizontally while the home mark and contact action remain visible. Scene controls sit above the dock.
The scroll scene gives the live hero a 90-degree roll and holds that angle until it fades. Its replacement identity panel and subsequent panels remain upright. Only the first identity panel reveals its text; the others are already populated, with visible gaps and naturally mirrored content on their reverse sides. A final selected-work panel emits the dark four-point star into the gallery. The original spherical glitter cloud spreads within that panel before accelerating outward into the next scene. All effects follow native scroll and retain the reduced-motion fallback.

The opening uses a Dennis-style opaque curtain in the local intro-ink color. It lifts upward over 1.6 seconds on an independent, one-time timeline; its lower edge bows downward, then flattens as it clears the top. In the normalized 1000-unit SVG canvas, the edge moves from 1002 to -4 and the curve follows 0 to 180 to 0. Fold geometry derives from scroll progress so reverse scrolling restores the full viewport hero without an offset. In scroll-timeline units, the fold, 90-degree roll, and cream backdrop transition run together from 0.74 to 1.32. At 90 degrees the hero frame matches the upright replacement panel exactly before their content crossfade from 1.34 to 1.52. Side panels have opacity 1 from setup and become visible when geometry settles at 1.32; their separation gap opens smoothly from zero to its full configured spacing between 1.32 and 1.59, with no opacity entrance. The heading and word band reveal from 1.42 to 1.72; controls reveal from 1.52 to 1.82, and horizontal rotation starts at 1.59. Folded panel display scale becomes 0.7 below a 500px viewport height and 0.78 below 700px. At heights up to 700px and widths of at least 600px, the scene controls form one horizontal row. Preserve the 90-degree hero roll, upright replacement content, final black star, and original spherical glitter transition.

The final black star now opens directly onto the existing Selected work introduction; the orbital project gallery is retained as a legacy component but is not rendered in the homepage flow. Selected work comes before About, Technologies and Experience. Its introduction brightens word by word to white with native scroll, while zero, one, or many CMS-selected uploaded or project-gallery images rise in the chosen order. Site copy → Selected work images controls the sequence; older content without the field defaults to the first two selected covers. An explicitly empty array intentionally shows no rising images. Direct uploads need not belong to a project; the CMS supports upload, select, add, reorder, and removal of every entry. Upload adds to the media library before selection assigns it. Base scroll travel is 220svh plus 45svh for every image beyond two; there is no fixed image-count cap. Reduced motion uses white text and omits rising images.

On refresh, the name appears briefly at the center of the opaque curtain and Skip intro remains available. The hero entrance resolves behind the lifting curtain, and the floating dock stays hidden until the curtain exits. Early scrolling or keyboard activation of Skip intro settles the opening immediately. Persistent intro completion hides the curtain, intro controls, and boot cover in CSS; reverse scrolling, refresh calculations, and motion-preference changes cannot replay the opening. Reduced motion and direct section hashes bypass it.

Selected work words begin at local gray (#85867d). A white clipped overlay wipes left to right across each word, advancing through the statement between scroll progress 0.08 and 0.8 and reversing when scrolling upward; this is not whole-word color interpolation. Hero fold geometry is updated only when its fold progress or measured size changes, with cached transform setters and a single entrance completion. Refreshes use the smoothed playhead, clamped to the post-intro position (0.7), to avoid a forward/backward snap during scrolling. Compact mode applies below 768px or to coarse pointers without hover. Its first fold and identity handoff consume 0.62 measured viewport heights between timeline positions 0.7 and TURN_START (1.59), replacing the previous 1.55-times-viewport rate for that interval. Later panel and star phases retain that 1.55 rate; compact scrub smoothing is 0.18 seconds. Desktop keeps its original 1.8-times-viewport rate across the duration after 0.7 and 0.65-second scrub. Native scrolling remains in control, with ScrollTrigger's ignoreMobileResize enabled and no normalized or hijacked scrolling.

In compact mode, the measured geometry height (`--portal-view-height`) remains fixed through same-width browser-toolbar resizes; width changes remeasure the scene. A separate paint height (`--portal-paint-height`) follows the current visual viewport. The sticky stage, root height, negative final overlap, curtain, exit canvas, and controls track the visible viewport without changing the scroll distance or box geometry. The particle renderer accepts a separate geometry height, preserving the original star/cloud origin, spherical shape, and timing while its canvas and final cover expand to the visible viewport. This keeps the Selected work handoff covered through browser-chrome changes.

The floating dock exposes Projects, About, Tech stack, Experience and Archive directly, with a cream-filled Let's talk pill and no Menu button or drawer. The slim capsule uses charcoal ink and hero cream with Manrope at weight 500. Destination links have no individual boxes or dividers; the active destination has cream text and a fine cream underline. The contact action uses ink text at rest and a rising ink fill with cream text on hover/focus. The contact treatment matches the shared cream/charcoal action palette. On narrow screens the link row scrolls horizontally, while the home mark and contact action stay visible; keyboard focus and the active destination scroll within that row. All navigation targets retain a 44px minimum height and cream focus outlines. Active-section tracking follows document position.


`Marquee` renders two copies of its items in a seamless 30-second linear loop. The background band runs continuously while the box scene is active, including while scrolling pauses. It pauses outside that scene phase or while the document is hidden; reduced motion removes the animation.

### Project navigation and demo video

`transitionProject` gives work-row navigation an opacity-only fade on `#main-content`: 140ms out and 280ms in. The dock stays still and the pointer preview hides. Reduced motion and modified clicks use direct native navigation; failed or interrupted transitions restore page visibility.

The optional `ProjectDemo` uses existing `project.showcase.videoSrc`, `posterSrc`, and `caption` data on actual case-study pages, above the gallery. A configured clip adds Watch demo beside the source/discussion action. It uses native controls, `playsInline`, `preload="none"`, no autoplay, and pauses offscreen or when the page is hidden. Poster is optional and falls back to the cover. Missing video data omits both the section and action; a load failure leaves screenshots available. Clips are user-provided local MP4/WebM files configured under Projects → Project demo video. The image uploader does not upload videos.

**The Scene Boundary Rule.** Keep the approved spatial effects attached to the hero and panel scene; ordinary project navigation changes only page-content opacity.

## Do's and Don'ts

### Do:

- Do preserve the AK geometry, approved portrait composition, 90-degree hero handoff, upright opaque panels, black star, spherical glitter, and one-time curtain.
- Do use charcoal, cream, and Manrope across active public pages and the CMS.
- Do keep keyboard, touch, focus, and reduced-motion access equivalent in function.
- Do preserve factual project and experience copy, source availability, native scrolling, and existing dependencies.
- Do identify system illustrations as illustrations and use actual project screenshots and user-provided demo clips.

### Don't:

- Don't introduce global lime or blue action treatments or revive legacy fonts as active-page defaults.
- Don't reset the hero roll before its fade or add an opacity entrance to the side panels.
- Don't turn the current work list into boxed cards or add autoplay to project demos.
- Don't invent metrics, clients, testimonials, outcomes, public source access, or product screenshots.
