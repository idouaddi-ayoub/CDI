/**
 * Handshake between the preloader and the hero.
 *
 * The hero's entrance must not start behind the loading overlay, and the
 * preloader must not linger once the hero is ready to take over. Shared
 * `useState` rather than an event bus so a late-mounting component still sees
 * the current value instead of having missed the event.
 */
export function useIntroComplete() {
  return useState<boolean>("intro-complete", () => false);
}
