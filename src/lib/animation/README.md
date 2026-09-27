# Animation foundation

The homepage's `HeroPortal` is the first consumer. It wraps the existing live
hero; it does not clone content, capture a texture, or change global scrolling.
Other routes retain their existing behavior.

- `gsap.js` is the single browser-only ScrollTrigger registration location.
- `useGsapScene({ scope, setup, enabled })` owns one scoped GSAP context. Pass a
  DOM ref as `scope` and a `useCallback` function as `setup`. Include changing
  scene inputs in that callback's dependencies so old effects are reverted
  before the new setup runs. There are no global selectors or kill-all calls.
- The existing `useMotionPreference` hook provides the SSR-safe quiet default.
  Reduced motion skips setup; changing the preference reverts an active scene.
  The unanimated HTML/CSS must remain complete and usable.
- Create timelines and ScrollTriggers synchronously inside `setup`. Wrap any
  later animation callbacks with `context.add`; return a cleanup function from
  `setup` for DOM listeners, observers, async cancellation, or rendering loops.
  The context restores styles, removes its triggers and pin spacers, and runs
  that cleanup on unmount, dependency change, disable, or reduced motion.
- Keep layout/pinning containers separate from animated children. Each animated
  property must have one owner: avoid targeting existing CSS/Framer transforms
  with GSAP. Future scene wrappers should preserve section IDs, semantic HTML,
  accessible links, and the current reading order.
- Measure after the scene's fonts/images are ready. Refresh affected trigger
  measurements when those assets or content dimensions change; keep readiness
  listeners and resize observers scoped to the scene and clean them up.
- Keep the fixed header, drawer, galleries, form, and CMS outside future scene
  transforms. Continue using native scrolling and the current scroll locks.

## Scene 1: HeroPortal

CSS sticky owns the stage and a local scroll runway. The aperture automatically
plays into the fullscreen hero in 1.9 seconds. The existing CSS AK engraving,
portrait, headline, name and controls are paused/reset through the Web Animations
API until that arrival, then play in their original order. Skip intro or early
scrolling completes the entrance immediately without a scroll lock. Scrolling
back to the top keeps the assembled hero rather than replaying the intro.
A server-rendered dark cover and paused hero animations prevent the AK from
flashing before hydration. No-JS and reduced-motion CSS bypass this cover.

One ScrollTrigger uses a local 0.4-second numeric scrub to drive the paused scene timeline from its hero hold to
the perspective exit, identity box and project gallery. GSAP transforms the
outer rig; an inner geometry wrapper applies uniform CSS scale3d, preserving
the cube's proportions while leaving the hero's CSS/Framer transforms alone.
Existing hero parallax starts at the end of the runway. The header,
mobile drawer, and every following section remain outside the stage.

Reduced motion and direct section URLs bypass the enhancement. Without JS the
original hero remains visible. Skip intro and keyboard focus reveal the live
hero immediately. ResizeObserver tracks its intrinsic height; image/font
readiness refreshes measurements without changing scroll behavior. Cleanup
removes local attributes, dimensions, observers, listeners, and GSAP effects.

The revised opening follows the supplied video: a small four-point aperture in
a diffuse green light field, a camera approach, then a pronounced floating-page
pullback over the existing paper tone. The opening now uses the matching SVG
throughout, with one continuous exponential zoom. This removes mid-animation
WebGL loading, shader compilation and renderer swapping. The previous
`createPortalRenderer` helper is retained for future work but is not loaded by
the homepage. No Lenis, shared scroll store, or global animation ticker is added.

## Identity box and project gallery

The live hero itself is the front identity face; it is never cross-faded into
a second portrait or rebuilt as a separate panel. Its original layout is held
at the measured viewport width and uniformly fitted into the shrinking face.
All six surfaces follow the same width, height and depth throughout formation,
so the side panels remain attached as the rectangular hero becomes a cube.
`IdentityDisplayFaces` derives one achievement panel per Experience entry. No claims or metrics are
invented. A project cover illustrates an experience when its title is named in
the outcome (or its company and CMS work match). With the current content this
is four panels. Additional experiences extend the sequence; only neighbouring
panels are painted, so reusing the four orientations never stacks visible faces.
The box has equal width, height and depth, a closed six-face shell, and square
edges. It scales uniformly on short landscape screens to clear navigation and
controls. Oversized `FULL-STACK / APPLIED AI / BUILT TO SHIP` lettering moves
and tilts behind the cube with the scroll sequence.
Rotation is continuous through the moments, without per-face easing stops.
Only individual surfaces fade. The rig, geometry wrapper and six-face shell
always retain opacity 1 and preserve-3d; fading a parent would flatten the
cube during formation and exit. Button/keyboard selection settles the local
scrub immediately, preserving predictable focus without altering native scroll.

After the box, the centered four-point shape expands into the dark spatial
gallery. `ProjectOrbit` uses every published project, in CMS order, with its
existing cover, title and case-study link. The camera travel, controls and
native scroll distance follow the count, including zero and one project.
There is no hard-coded four-project cap or new CMS schema. The earlier
`PortfolioDisplayFaces` component is retained but is not mounted.

Only the active panel/card participates in the accessibility tree; other
interactive cards are inert. Separate labelled button groups support click,
ArrowLeft/Right and Home/End. The archive and Continue to About links are
always available during these scenes. The original sections, content loading,
project archive, case studies, gallery dialogs, contact form and CMS remain
in place. Reduced motion, direct section URLs and no-JS render the original
portfolio. Cleanup also stops autoplay and completes the CSS entrance.
