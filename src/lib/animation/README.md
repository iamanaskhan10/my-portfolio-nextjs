# Animation foundation (Phase 0)

No current page mounts this foundation. It changes no existing appearance,
animation, native scroll behavior, or content. GSAP and ScrollTrigger are loaded
only when a future component imports the scene hook.

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

Scene 1 will decide its own pin duration and element structure. Phase 0 does
not add a wrapper, shared scroll store, ticker, Lenis, canvas, portal, or a scene.
