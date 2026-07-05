/* global gsap, ScrollTrigger, Lenis */

/**
 * GSAP + Lenis powered motion: smooth scrolling, hero intro,
 * split-text titles, scroll reveals, horizontal experience track,
 * counters, and the top progress bar.
 */
export function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.05 });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links go through Lenis for a smooth glide.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -20, duration: 1.4 });
    });
  });

  return lenis;
}

export function runPreloader(onDone) {
  const preloader = document.getElementById('preloader');
  const counter = document.getElementById('preloader-count');
  const state = { value: 0 };

  gsap.to(state, {
    value: 100,
    duration: 1.3,
    ease: 'power2.inOut',
    onUpdate: () => (counter.textContent = Math.round(state.value)),
    onComplete: () => {
      gsap.to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          preloader.remove();
          onDone();
        },
      });
    },
  });
}

export function splitChars(element) {
  const text = element.textContent;
  element.textContent = '';
  element.setAttribute('aria-label', text);

  for (const char of text) {
    if (char === ' ') {
      const space = document.createElement('span');
      space.className = 'word-space';
      element.appendChild(space);
      continue;
    }

    const span = document.createElement('span');
    span.className = 'char';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = char;
    element.appendChild(span);
  }
}

export function playHeroIntro() {
  const chars = document.querySelectorAll('#hero-name .char');

  gsap.timeline()
    .from(chars, {
      yPercent: 120,
      rotateX: -80,
      opacity: 0,
      stagger: 0.035,
      duration: 0.9,
      ease: 'back.out(1.6)',
    })
    .to('[data-hero-fade]', {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.35');
}

export function initSplitTitles() {
  document.querySelectorAll('[data-split]').forEach((el) => {
    splitChars(el);

    gsap.from(el.querySelectorAll('.char'), {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      yPercent: 110,
      opacity: 0,
      stagger: 0.03,
      duration: 0.7,
      ease: 'power3.out',
    });
  });
}

export function initReveals() {
  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  });
}

export function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const state = { value: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () =>
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => (el.textContent = Math.round(state.value)),
        }),
    });
  });
}

export function initHorizontalScroll() {
  const track = document.getElementById('h-track');
  const section = document.querySelector('.experience-section');

  const getDistance = () => track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getDistance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

export function initProgressBar() {
  gsap.to('.progress-bar', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
    },
  });

  const topbar = document.querySelector('.topbar');
  ScrollTrigger.create({
    start: 12,
    onUpdate: (self) => topbar.classList.toggle('scrolled', self.scroll() > 12),
  });
}

export function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  VanillaTilt.init(document.querySelectorAll('.tilt'), {
    max: 8,
    speed: 800,
    glare: true,
    'max-glare': 0.12,
    perspective: 900,
  });
}
