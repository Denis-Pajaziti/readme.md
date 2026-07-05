/* global gsap, ScrollTrigger */
import { createHeroScene } from './scene.js';
import { startTypewriter } from './typewriter.js';
import { initCursor, initMagnetic } from './cursor.js';
import { buildMarquee, buildSkillIcons, runTerminal } from './content.js';
import {
  initConsoleGreeting,
  initKonami,
  initAwayTitle,
  initEmailCopy,
  initLogoRoll,
} from './easteregg.js';
import {
  initSmoothScroll,
  runPreloader,
  splitChars,
  playHeroIntro,
  initSplitTitles,
  initReveals,
  initCounters,
  initHorizontalScroll,
  initProgressBar,
  initTilt,
} from './animations.js';

const ROLES = [
  'Cloud & AI Solutions Engineer',
  'Full-Stack Developer',
  'Azure Certified AI Engineer',
  'Kubernetes Whisperer',
  'Automation Addict',
];

gsap.registerPlugin(ScrollTrigger);

// Static content first so layout is stable before ScrollTrigger measures.
buildMarquee(document.querySelector('.marquee-track'));
buildSkillIcons(document.getElementById('skills-icons'));
splitChars(document.getElementById('hero-name'));

// Visual layers.
createHeroScene(document.getElementById('webgl'));
initCursor();
initMagnetic();

// Motion.
initSmoothScroll();
initSplitTitles();
initReveals();
initCounters();
initHorizontalScroll();
initProgressBar();
initTilt();
runTerminal(document.getElementById('terminal-body'));

document.getElementById('year').textContent = new Date().getFullYear();

// Fun layer.
initConsoleGreeting();
initKonami();
initAwayTitle();
initEmailCopy();
initLogoRoll();

runPreloader(() => {
  playHeroIntro();
  startTypewriter(document.getElementById('typewriter'), ROLES);
  ScrollTrigger.refresh();
});
