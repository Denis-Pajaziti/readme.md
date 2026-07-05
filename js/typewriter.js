/** Cycles through phrases with a type / pause / delete rhythm. */
const TYPE_MS = 60;
const DELETE_MS = 30;
const HOLD_MS = 2100;

export function startTypewriter(element, phrases) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const phrase = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    element.textContent = phrase.slice(0, charIndex);

    let delay = deleting ? DELETE_MS : TYPE_MS;

    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      delay = HOLD_MS;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = TYPE_MS * 4;
    }

    setTimeout(tick, delay);
  };

  tick();
}
