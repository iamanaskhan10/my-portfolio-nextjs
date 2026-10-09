/** A quiet page fade keeps navigation independent of preview size and pointer motion. */
export function transitionProject(event, router, href) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const outgoing = document.querySelector('#main-content');
  if (!outgoing?.animate) return false;
  event.preventDefault();
  const root = document.documentElement;
  if (root.dataset.projectTransition) return true;
  root.dataset.projectTransition = 'leaving';
  let animation;
  let expired = false;
  const cleanup = () => {
    animation?.cancel();
    delete root.dataset.projectTransition;
  };
  const timeout = setTimeout(() => { expired = true; cleanup(); }, 3000);
  (async () => {
    try {
      animation = outgoing.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: 'ease-out', fill: 'forwards' });
      await animation.finished;
      root.dataset.projectTransition = 'entering';
      const navigated = await router.push(href);
      if (!navigated || expired) return;
      animation.cancel();
      const incoming = document.querySelector('#main-content');
      if (!incoming) return;
      animation = incoming.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, easing: 'ease-out', fill: 'forwards' });
      await animation.finished;
    } catch {
      // Failed or interrupted navigation always restores the visible page.
    } finally { clearTimeout(timeout); cleanup(); }
  })();
  return true;
}
