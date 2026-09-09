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

The experience section shares the black field and warm white text, with an oversized dark `#272727` title behind three paper cards (`#f5f4ef`, `#fff`, `#e9e8e1`). Card text uses `#171916` with subdued gray metadata. This paper treatment is scoped to experience.

## Typography

Use the locally hosted Anton face for established display and identity treatments, with the system sans stack for body copy and controls. Case-study titles use the display token above; their readable body copy is 0.97rem with 1.9 line height and a 70ch maximum. Small metadata remains subordinate. The showcase deliberately uses the system sans stack, including its single white “Projects” title and project titles.

## Layout

Use fluid widths and responsive gutters. Case studies have a 90rem maximum, `max(1.15rem, 6vw)` side padding, and a sticky 12rem contents column beside the story. Below 768px this becomes one column with inline contents navigation. The showcase keeps horizontal project columns and a visible next-item preview; below 900px the title sits above the track, and below 540px columns occupy 88% of the track. The footer has a compact 78rem inner row and a two-column mobile arrangement.

## Elevation & Depth

Dark tonal layers, fine rules, and selective lighting provide depth. The fixed header uses a translucent dark surface and blur. Showcase shading uses blurred directional gradients behind content, with palette crossfades only when the selected project changes; they have no continuous background animation.

Once the showcase scrolls, its left edge combines a fade mask and 5px backdrop blur. A 1.5rem scroll inset keeps settled titles readable. Experience pages use `0 22px 48px #0005` shadows and a shared grid position: later pages arrive from below with rotation and perspective, while older pages scale back and recede to leave visible rims. This prominent parallax is linked to scrolling and remains still at rest.

## Shapes

Preserve the existing mixture of open editorial sections, fine borders, rectangular actions, small technology tags, and round arrow controls. Case-study covers have 12px corners. The shared `BrandMark.jsx` owns the precise angular AK geometry; reuse it for both identity and enlarged treatments.

## Components

- **Showcase:** open text columns, one primary case-study action per project, technology tags, progress line, count, and 44px arrow controls. Support mouse drag, native touch swipe, horizontal scrolling, and Arrow/Home/End keys on the focused track. A 48px white difference-blend cursor appears only on fine mouse devices. Preserve visible focus and reduced-motion behavior. Detailed constraints live in `.impeccable/briefs/projects.md`.
- **Case study:** title, factual headline, project/year metadata, source or discussion action, captioned visual, contents navigation, technology list, problem, implementation, workflow, decisions, outcomes, and next-project link. Use lime links and focus outlines within the established olive/cream system.
- **Case-study gallery:** a large 16:10 preview and three labeled thumbnails cover identity/system overview, workflow, and an implementation detail. Lime outlines indicate selection. The full-screen native dialog provides previous/next buttons, wrapping arrow-key navigation, Escape, focus return, and body scroll locking. Keep captions and alternative text explicit about illustrative content; DarziXpress retains its original identity asset.
- **Experience:** an oversized dark uppercase “WORK EXPERIENCE” title sits behind three overlapping paper pages showing the original roles, companies, dates, and a page count. Sequential arrivals build the stack one page on top of another within a sticky scene; scrolling backward reverses it. A resume action and original selected outcomes follow. Reduced motion or viewports at most 650px tall restore separate, untransformed cards. See `.impeccable/briefs/experience.md`.
- **Archive:** maintain project images, category filters, and direct case-study links within the global visual system.
- **Footer:** compact identity, contact/social navigation, and a round back-to-top control; no laser treatment.
- **Technology section:** its arrival begins early and runs once per page load; retain hover tilt, delayed details, and reduced-motion support.

## Do's and Don'ts

- Do preserve the AK geometry, established palette and type outside the scoped project and experience treatments.
- Do keep keyboard, touch, focus, and reduced-motion access equivalent in function.
- Do identify authored system illustrations as illustrations and retain factual project copy.
- Don't turn the showcase into boxed cards, add a duplicate heading, introduce autoplay, or animate its background continuously.
- Don't invent metrics, clients, testimonials, outcomes, or product screenshots.
