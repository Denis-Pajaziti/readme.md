/** Custom cursor: instant dot + eased trailing ring, grows on hoverables. */
export function initCursor() {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const pos = { x: -100, y: -100 };
  const ringPos = { x: -100, y: -100 };

  window.addEventListener('pointermove', (event) => {
    pos.x = event.clientX;
    pos.y = event.clientY;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  });

  const loop = () => {
    ringPos.x += (pos.x - ringPos.x) * 0.16;
    ringPos.y += (pos.y - ringPos.y) * 0.16;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
    requestAnimationFrame(loop);
  };
  loop();

  document.querySelectorAll('[data-hover]').forEach((el) => {
    el.addEventListener('pointerenter', () => ring.classList.add('is-hover'));
    el.addEventListener('pointerleave', () => ring.classList.remove('is-hover'));
  });
}

/** Buttons that gently pull toward the pointer. */
export function initMagnetic() {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      setTimeout(() => (el.style.transition = ''), 400);
    });
  });
}
