---
name: Anas Khan Portfolio
description: The established visual system and its project and experience treatments.
colors:
  ink: "#11120f"
  ink-raised: "#191a16"
  paper: "#f2f0e8"
  muted: "#a9aaa1"
  line: "rgba(242, 240, 232, 0.16)"
  line-strong: "rgba(242, 240, 232, 0.32)"
  signal: "#b9f35a"
  signal-highlight: "#e4ffaf"
  signal-mid: "#9bd047"
  signal-shadow: "#526c22"
  editorial-void: "#090a08"
  signal-ink: "#182008"
  danger: "#ffaaa0"
  success: "#b9f35a"
  paper-raised: "#e2e0d8"
  paper-muted: "#53574d"
  paper-line: "#11120f26"
  paper-line-strong: "#11120f52"
  paper-success: "#355500"
  paper-danger: "#a3201c"
  work-white: "#fff"
  work-ink: "#1c1d20"
  work-line: "#d2d2d2"
  work-blue: "#455ce9"
typography:
  display:
    fontFamily: 'Anton, "Arial Narrow", sans-serif'
    fontWeight: 400
  body:
    fontFamily: 'Bahnschrift, Aptos, "Segoe UI", sans-serif'
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
    fontFamily: 'Anton, "Arial Narrow", sans-serif'
    fontSize: "clamp(3.3rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.025em"
rounded:
  case-cover: "12px"
  case-stack: "4px"
  editorial-media: "0"
  editorial-thumbnail: "3px"
  editorial-viewer: "8px"
  animation-control: "6px"
components:
  case-cover:
    rounded: "{rounded.case-cover}"
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
---

# Design System: Anas Khan Portfolio

## Overview

The existing identity combines dark olive and cream surfaces with selective lime accents. The homepage uses the locally hosted Manrope face already established in the hero; Anton remains in established case-study and other display treatments. Technical work and factual explanation lead; expressive treatments stay attached to specific surfaces. The selected-project treatment follows the user's [Dennis Snellenberg reference](https://dennissnellenberg.com/): generous ruled project rows on white and a square preview that follows the pointer, with images sliding vertically inside it as the hovered project changes. This surface introduces its own blue accent while retaining the site's typeface and factual project content. Product truth remains in `PRODUCT.md`.

## Colors

`src/styles/globals.css` owns the global palette. Ink and raised ink establish the dark olive field; paper and muted provide text hierarchy; signal marks actions, identity, and emphasis. Translucent paper rules separate content. Signal highlight, mid, shadow, and ink support the established lime treatments; danger and success indicate form feedback. The `paper-*` tokens record local light-surface overrides in `ProjectEditorialGallery.module.css` and `PostHeroEditorial.module.css`.

After the dark Selected work introduction, the project list uses the local work-white field, work-ink titles and categories, and work-line separators. Work-blue marks the circular View cue, keyboard focus, and the archive pill's hover/focus fill. These local colors belong to `ProjectWorkList.module.css` and do not redefine the global palette, contact surface, or case-study colors. The retained legacy galleries keep their paper surfaces, dark media stages, and cream viewer controls.

About, Technologies, and Experience use the dark editorial field with cream and muted text. Technology icons are monochrome at rest and show their brand color on pointer hover. Experience's former colored atmosphere is hidden. Contact returns to the paper field with ink text, dark rules, and darker success/error colors for legible feedback; its submit action retains lime.

## Typography

Use locally hosted Manrope Hero for the homepage introduction, project titles, About, Technologies, Experience, and Contact headings, with the system sans stack for body copy and controls. Homepage project titles use the token above; the visible-cover layout uses `clamp(1.7rem, 3.7vw, 2.7rem)` and 2rem below 601px. Categories remain smaller and subordinate. The heading weight is restrained, with tight tracking and clear scale differences. Case-study titles retain Anton and the case-study display token; their readable body copy is 0.97rem with 1.9 line height and a 70ch maximum. Small metadata remains subordinate.

## Layout

Use fluid widths and responsive gutters. Project detail pages use a 78rem reading width, fluid side padding, and a sticky 12rem contents column beside the story. Below 768px this becomes one column with inline contents navigation. The desktop homepage project list uses 8vw outer gutters and another 8vw inset within each ruled row. Titles sit left, categories right, with 4.1vw top and 4.8vw bottom row padding. The pointer preview is a 27.5vw square. At 1024px and below, or on devices without hover or with a coarse pointer, projects become two columns of visible square covers above their title, category, and period, using 5vw gutters. Below 601px these form a single column. The archive pill is centered beneath the collection. Contact has a full-width heading above its introduction and open form, becoming one column below 768px.

Experience retains horizontal columns and a visible next-item preview; below 900px its title sits above the track, and below 540px columns occupy 88% of the track. The footer has a compact 78rem inner row and a two-column mobile arrangement.

## Elevation & Depth

Dark tonal layers and fine rules provide depth. The fixed header uses a translucent dark surface and blur. The homepage project list is flat, with fine rules and generous white space. Its square image window floats above the rows as a pointer-following overlay without a shadow; the circular View cue sits over the image. About, Technologies, and Experience have no rendered colored atmosphere. Contact relies on type, underlines, and spacing rather than an enclosing form card.

Once the experience track scrolls, its left edge combines a fade mask and 5px backdrop blur. A 1.5rem scroll inset keeps settled titles readable. The Selected work introduction retains its scroll-linked rising images and their `0 24px 60px #0005` shadows. The project rows follow in document flow; the decorative hover preview is fixed to the viewport and does not intercept pointer events.

## Shapes

Preserve the existing mixture of open editorial sections, fine borders, rectangular actions, small technology tags, and round arrow controls. The homepage project preview and visible mobile covers are square with sharp corners; its View cue is a 5.4rem circle, and its archive action is a bordered pill. The retained spread gallery keeps its rounded viewer, Full screen pill, thumbnails, and circular previous/next controls. Contact inputs use square underline fields and the submit button has 4px corners. Case-study covers keep 12px corners. The shared `BrandMark.jsx` owns the precise angular AK geometry; reuse it for both identity and enlarged treatments.

## Components

- **Homepage hero:** the portrait, AK watermark, and oversized name form a scroll-linked depth composition as the hero leaves the viewport. The portrait lags behind the page, the watermark lags further, and the name moves slightly ahead. The headline group and name sit above the viewport edges to preserve breathing room without adding a blank runway. Travel is bounded, smaller below 768px, and removed for reduced motion.
- **Homepage order:** Selected work introduction and project gallery → About → Technologies → Work Experience → Contact. The hero, panels, star transition, and floating navigation retain their established behavior.
- **Selected projects:** the existing scroll-linked Selected work introduction leads into white Recent work rows. Each entire row is a direct case-study link with its CMS title and category. Published projects retain their order with featured projects first, and the closing archive pill retains its CMS label and shows the collection count. Hover shifts the title slightly left and category right, reducing their opacity to 0.55 and 0.65 respectively. Tab and Enter use the native links and blue focus outlines. On tablet, mobile, or coarse pointers, each link includes a visible square cover and period. The previous `ProjectIndexGallery`, `ProjectSpreadGallery`, and `SelectedProject` implementations remain available as legacy components.
- **Project hover preview:** fine mouse pointers above 1024px reveal a square window and blue View circle that follow the pointer with spring smoothing. All cover slides stay mounted in one vertical reel; selecting another row translates the reel by one window height per project index over 600ms with `cubic-bezier(0.22, 1, 0.36, 1)`, so the images slide smoothly inside the same window. The window and cue scale in and out, and hide when leaving the rows, clicking, scrolling, resizing, losing window focus, or changing page visibility. The overlay is decorative, hidden from assistive technology, and cannot intercept clicks. Reduced motion removes transitions and pointer smoothing. There is no homepage inspector, thumbnail strip, media player, or expand control; case-study pages retain their image galleries and full-screen viewers.
- **Project detail:** title, factual headline, project/year metadata, source or discussion action, captioned visual, contents navigation, technology list, problem, implementation, workflow, decisions, outcomes, and next-project link. Use lime links and focus outlines within the established dark olive/cream system.
- **Case-study gallery:** a full-width 16:9 opening image followed by two staggered detail images, with captions on a paper surface. Each image opens the native full-screen dialog with previous/next controls, arrow keys, Escape, focus return, and body scroll locking. Keep illustrations explicitly labeled; DarziXpress retains its original identity asset.
- **Experience:** “Where I've / built.” uses Manrope above open columns that retain the supplied roles, companies, dates, and outcomes. The section is a quiet dark field with the former colored lighting hidden. Preserve the 56px difference-blend cursor on fine pointers, resume action, progress line, visible current/total position, 44px arrow buttons, mouse drag, native touch scrolling, and Arrow/Home/End keyboard navigation. Position changes are announced politely. Below 900px, the heading sits above the carousel.
- **Archive:** a dark gallery with a wide opening project, two offset middle entries, and a reversed closing project. Each composition layers the existing overview and implementation images on a muted color field, with visible illustration captions. Category filters include counts. Project details, a sourced outcome or capability, the stack, and separate project and GitHub/contact actions sit beside or below the artwork. A GitHub profile link remains visible at the top. Mobile uses a single reading column.
- **Footer:** compact identity, contact/social navigation, and a round back-to-top control; no laser treatment.
- **Technology section:** retain the dark surface and open monochrome icons beside a sticky desktop introduction with a Manrope heading. Seven résumé-based groups organize Languages, Frontend, Backend, Databases, AI / ML, Cloud & DevOps, and Tools. Every unique skill appears once. Each item's short description belongs directly below its icon and label but remains visually hidden until that specific item is hovered, keyboard-focused, or tapped. Groups use fine horizontal rules and open four-column grids that become two columns on mobile; no enclosing cards, shared tooltip, or duplicated skills. Pointer hover reveals the icon's brand color, raises it by 3px, and emphasizes its label in lime.
- **About:** a full-width dark section preserves its layout and generous spacing. The cream Manrope phrases “I learn.”, “I build.”, and “I ship.” enter once from the left in a tight 70ms stagger, with the middle phrase in muted text. Supporting copy specifies full-stack products across real-time AI, computer vision, and data-intensive systems.
- **Contact:** a full-width cream section places a large Manrope heading above a prominent email link, social links, and an open form with visible labels and underline inputs. Inputs and status links have dark focus outlines; status colors remain legible on cream. The lime submit action changes to cream text on an ink background on enabled hover. Sending disables the fields and submit button and prevents duplicate submission. Errors keep the draft and offer the direct email fallback; success clears the fields. Status feedback is announced politely.
- **Section entrances:** supporting About copy, technology heading and rows, experience content, and contact content enter once after roughly 20% of each element reaches a viewport inset by 12% from the bottom. Once JavaScript is ready, unreached content stays hidden until its entrance instead of appearing before the trigger; without JavaScript, it remains visible. Routine entrances last 280ms with 10px travel; images use 12px travel and scale from 0.99 to 1. They do not depend on continued scrolling; reduced motion keeps content visible and disables spatial entrances.
- **Navigation:** links follow the section order, use a short animated hover underline, and mark the current section in lime. Native smooth anchor scrolling and small directional CTA arrow movements respect reduced motion.
- **Project imagery:** homepage work rows use existing CMS covers, contained with an 8% inset inside the square preview. A GIF cover uses the configured still poster or the first non-GIF gallery image; missing media shows the project title and a readable placeholder. The archive retains layered images and detail pages retain their dark surface, captions, illustration labels, and expandable gallery. Source links respect the existing source-availability data. Metrics describe documented capability, including 7.5× evidence capacity, three validation indicators, CMS publishing, and three user journeys; they do not imply user counts or investment performance.

## Do's and Don'ts

- Do preserve the AK geometry and the established hero, panel, star, navigation, and case-study treatments.
- Do preserve the local white/blue work section, cream contact field, and dark About/Technologies/Experience sections.
- Do keep keyboard, touch, focus, and reduced-motion access equivalent in function.
- Do identify authored system illustrations as illustrations and retain factual project copy.
- Don't turn the showcase into boxed cards, add a duplicate heading, introduce autoplay, or animate its background continuously.
- Don't invent metrics, clients, testimonials, outcomes, or product screenshots.

## Reference-led hero and floating navigation

The current hero supersedes the earlier portrait/name arrangement above. Its three connected rows read “Full-stack &”, “Applied AI”, and “Products”, using locally hosted Manrope with cream lettering. The first row incorporates a small square work preview; the middle row aligns a short introduction to the left of its headline; the last row includes the published project count and a projects link. Hero lines remain CMS-controlled. The original portrait composition is retained in `LegacyCinematicPortfolio.jsx`.

The portrait is dimmed monochrome, with no green blend applied to the image. A subtle olive spotlight belongs to the background and fades to black at the edges. Native scroll still transforms the same live hero into the cube. The tiny work reel has no arrow or play/pause overlay. Once the entrance completes, it runs one short sequence of up to five project covers, giving each frame a 680ms bounce with slight rotation before settling on the last. It pauses on hover or focus, hidden pages, outside the hero, and during the fold; reduced motion shows the first cover without animation. The visible cover remains a labeled link to its case study.

Navigation is a compact floating dock near the bottom, with Projects, About, Archive, contact, and a menu for all sections. On small screens the dock contracts and secondary destinations remain in the keyboard-accessible drawer. Scene controls sit above the dock.
The scroll scene gives the live hero a 90-degree roll and holds that angle until it fades. Its replacement identity panel and subsequent panels remain upright. Only the first identity panel reveals its text; the others are already populated, with visible gaps and naturally mirrored content on their reverse sides. A final selected-work panel emits the dark four-point star into the gallery. The original spherical glitter cloud spreads within that panel before accelerating outward into the next scene. All effects follow native scroll and retain the reduced-motion fallback.

The opening star starts small and subdued, accelerates its spin, then grows to three times its starting size while drifting toward the upper-right and fading out. Its green glow progressively blurs and dissolves without brightening. Fold geometry derives from scroll progress so reverse scrolling restores the full viewport hero without an offset. At 90 degrees the hero frame matches the upright replacement panel exactly before their crossfade. The other panels stay hidden throughout this fold and handoff, becoming visible only when horizontal panel rotation begins; this prevents their still-large project images from flashing behind the hero.

The final black star now opens directly onto the existing Selected work introduction; the orbital project gallery is retained as a legacy component but is not rendered in the homepage flow. Selected work comes before About, Technologies and Experience. Its introduction brightens word by word to white with native scroll, while up to six CMS-selected project gallery images rise in the chosen order. Site copy ? Selected work images controls the sequence; older content defaults to the first two featured covers. Reduced motion uses white text and static project imagery.

On refresh, the hero entrance overlaps the dissolving opening veil: the dim monochrome portrait gently settles into focus, the three headline rows reveal in a short cascade, and the project preview unfolds alongside them. Supporting links follow, completing the entrance in roughly 2.2 seconds. Early scroll or Skip intro settles the composition immediately, and reduced motion keeps the hero static. The opening star starts small and subdued before its accelerating growth and upper-right exit.

Selected work words begin at a pale warm gray (#d3d2c9) before turning white. Hero fold geometry is updated only when its fold progress or measured size changes, with cached transform setters and a single entrance completion. Refreshes use the smoothed playhead to avoid a forward/backward snap during scrolling.

The floating dock now exposes Projects, About, Tech stack, Experience and Archive directly, with a lime contact action and no Menu button or drawer. Its active destination uses a quiet olive fill with lime text. On narrow screens the link row scrolls horizontally, while the home mark and contact action stay visible; keyboard focus and the active destination scroll within that row. Active-section tracking follows document position.
