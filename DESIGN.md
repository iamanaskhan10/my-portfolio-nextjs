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
typography:
  display:
    fontFamily: 'Anton, "Arial Narrow", sans-serif'
    fontWeight: 400
  body:
    fontFamily: 'Bahnschrift, Aptos, "Segoe UI", sans-serif'
  case-study-display:
    fontFamily: 'Anton, "Arial Narrow", sans-serif'
    fontSize: "clamp(3.3rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.025em"
rounded:
  case-cover: "12px"
  case-stack: "4px"
components:
  case-cover:
    rounded: "{rounded.case-cover}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "1.75rem max(1.15rem, 6vw)"
---

# Design System: Anas Khan Portfolio

## Overview

The existing identity combines dark olive surfaces, cream text, lime accents, and condensed Anton display type. Technical work and factual explanation lead; expressive treatments stay attached to specific surfaces. This document records the shipped system, not a replacement identity. Product truth remains in `PRODUCT.md`.

## Colors

`src/styles/globals.css` owns the global tokens above. Ink and raised ink establish the dark olive field; paper and muted provide text hierarchy; signal marks actions, identity, and emphasis. Translucent paper rules separate content. Signal highlight, mid, shadow, and ink support the established lime treatments; danger and success indicate form feedback.

The homepage project showcase is a user-pinned local exception: black `#070707`, warm white `#f7f5f0`, and static layered red and amber shading. Its initial red/amber palette is `#ff3409` / `#a77924` / `#681801`. Selection switches to violet/blue, amber, or teal/olive palettes defined in `ProjectShowcase.module.css`. These colors do not replace global tokens or the case-study palette.

The experience carousel retains the former homepage project carousel's black field, warm white text, and selection-linked red/amber, violet/blue, and amber lighting. Selected projects follow on the editorial dark surface, with large existing project illustrations, cream Anton headings, lime actions, and subdued oversized project numbers.

## Typography

Use the locally hosted Anton face for established display and identity treatments, with the system sans stack for body copy and controls. Case-study titles use the display token above; their readable body copy is 0.97rem with 1.9 line height and a 70ch maximum. Small metadata remains subordinate. The showcase deliberately uses the system sans stack, including its single white “Projects” title and project titles.

## Layout

Use fluid widths and responsive gutters. Project detail pages use a 78rem reading width, fluid side padding, and a sticky 12rem contents column beside the story. Below 768px this becomes one column with inline contents navigation. The showcase keeps horizontal project columns and a visible next-item preview; below 900px the title sits above the track, and below 540px columns occupy 88% of the track. The footer has a compact 78rem inner row and a two-column mobile arrangement.

## Elevation & Depth

Dark tonal layers, fine rules, and selective lighting provide depth. The fixed header uses a translucent dark surface and blur. Showcase shading uses blurred directional gradients behind content, with palette crossfades only when the selected project changes; they have no continuous background animation.

Once the showcase scrolls, its left edge combines a fade mask and 5px backdrop blur. A 1.5rem scroll inset keeps settled titles readable. Experience pages use `0 22px 48px #0005` shadows and a shared grid position: later pages arrive from below with rotation and perspective, while older pages scale back and recede to leave visible rims. This prominent parallax is linked to scrolling and remains still at rest.

## Shapes

Preserve the existing mixture of open editorial sections, fine borders, rectangular actions, small technology tags, and round arrow controls. Case-study covers have 12px corners. The shared `BrandMark.jsx` owns the precise angular AK geometry; reuse it for both identity and enlarged treatments.

## Components

- **Homepage hero:** the portrait, AK watermark, and oversized name form a scroll-linked depth composition as the hero leaves the viewport. The portrait lags behind the page, the watermark lags further, and the name moves slightly ahead. The headline group and name sit above the viewport edges to preserve breathing room without adding a blank runway. Travel is bounded, smaller below 768px, and removed for reduced motion.
- **Homepage order:** About → Technologies → Work Experience → Selected Projects → Contact. The hero composition, fonts, palette, and section spacing remain established visual anchors.
- **Selected projects:** two large, alternating editorial compositions for VoiceForge AI and TradeM8, with imagery taking approximately 60% of each desktop row. Use the existing project illustrations with accurate captions until genuine screenshots are supplied. Oversized 01/02 numbers are decorative and partially clipped. Images move at most 18px and scale from 0.98 to 1; text reveals subtly. All content is visible without animation. Mobile uses image, copy, stack, then project action. An archive link preserves access to all projects.
- **Project detail:** title, factual headline, project/year metadata, source or discussion action, captioned visual, contents navigation, technology list, problem, implementation, workflow, decisions, outcomes, and next-project link. Use lime links and focus outlines within the established dark olive/cream system.
- **Case-study gallery:** a full-width 16:9 opening image followed by two staggered detail images, with captions on a paper surface. Each image opens the native full-screen dialog with previous/next controls, arrow keys, Escape, focus return, and body scroll locking. Keep illustrations explicitly labeled; DarziXpress retains its original identity asset.
- **Experience:** “Where I've / built.” heads the former project carousel. Open columns retain the supplied roles, companies, dates, and outcomes. Preserve selection-linked lighting, the 84px difference-blend cursor on fine pointers, resume action, progress line, 44px arrow buttons, mouse drag, native touch scrolling, and Arrow/Home/End keyboard navigation. Below 900px, the heading sits above the carousel.
- **Archive:** a dark gallery with a wide opening project, two offset middle entries, and a reversed closing project. Each composition layers the existing overview and implementation images on a muted color field, with visible illustration captions. Category filters include counts. Project details, a sourced outcome or capability, the stack, and separate project and GitHub/contact actions sit beside or below the artwork. A GitHub profile link remains visible at the top. Mobile uses a single reading column.
- **Footer:** compact identity, contact/social navigation, and a round back-to-top control; no laser treatment.
- **Technology section:** retain the dark surface and open icons beside a sticky desktop introduction. Seven résumé-based groups organize Languages, Frontend, Backend, Databases, AI / ML, Cloud & DevOps, and Tools. Every unique skill appears once. Each item's short description belongs directly below its icon and label but remains visually hidden until that specific item is hovered, keyboard-focused, or tapped. Groups use fine horizontal rules and open four-column grids that become two columns on mobile; no enclosing cards, shared tooltip, or duplicated skills. Hover raises an icon by 3px and emphasizes its label in lime.
- **About:** a full-width paper section preserves its layout and generous spacing. “I learn.”, “I build.”, and “I ship.” enter once from the left in a tight 70ms stagger, with the middle phrase in dark olive. Supporting copy specifies full-stack products across real-time AI, computer vision, and data-intensive systems.
- **Section entrances:** supporting About copy, technology heading and rows, experience content, selected project heading/images/copy, and contact content enter once after roughly 20% of each element reaches a viewport inset by 12% from the bottom. Once JavaScript is ready, unreached content stays hidden until its entrance instead of appearing before the trigger; without JavaScript, it remains visible. Routine entrances last 280ms with 10px travel; images use 12px travel and scale from 0.99 to 1. They do not depend on continued scrolling; reduced motion keeps content visible and disables spatial entrances.
- **Navigation:** links follow the section order, use a short animated hover underline, and mark the current section in lime. Native smooth anchor scrolling and small directional CTA arrow movements respect reduced motion.
- **Project imagery:** the homepage uses large captioned project illustrations; the archive retains layered images and detail pages retain their dark surface and expandable gallery. Source links respect the existing source-availability data. Metrics describe documented capability, including 7.5× evidence capacity, three validation indicators, CMS publishing, and three user journeys; they do not imply user counts or investment performance.

## Do's and Don'ts

- Do preserve the AK geometry, established palette and type outside the scoped project and experience treatments.
- Do keep keyboard, touch, focus, and reduced-motion access equivalent in function.
- Do identify authored system illustrations as illustrations and retain factual project copy.
- Don't turn the showcase into boxed cards, add a duplicate heading, introduce autoplay, or animate its background continuously.
- Don't invent metrics, clients, testimonials, outcomes, or product screenshots.
