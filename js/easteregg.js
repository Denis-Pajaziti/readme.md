/**
 * The fun stuff: console greeting, Konami code warp mode,
 * away-tab title, email copy toast, and a logo barrel roll.
 */
const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function initConsoleGreeting() {
  const art = `
██████╗ ███████╗███╗   ██╗██╗███████╗
██╔══██╗██╔════╝████╗  ██║██║██╔════╝
██║  ██║█████╗  ██╔██╗ ██║██║███████╗
██║  ██║██╔══╝  ██║╚██╗██║██║╚════██║
██████╔╝███████╗██║ ╚████║██║███████║
╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═╝╚══════╝

██████╗  █████╗      ██╗ █████╗ ███████╗██╗████████╗██╗
██╔══██╗██╔══██╗     ██║██╔══██╗╚══███╔╝██║╚══██╔══╝██║
██████╔╝███████║     ██║███████║  ███╔╝ ██║   ██║   ██║
██╔═══╝ ██╔══██║██   ██║██╔══██║ ███╔╝  ██║   ██║   ██║
██║     ██║  ██║╚█████╔╝██║  ██║███████╗██║   ██║   ██║
╚═╝     ╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝   ╚═╝
`;

  /* eslint-disable no-console */
  console.log(`%c${art}`, 'color: #22d3ee; font-family: monospace;');
  console.log(
    '%cWell hello there, fellow dev tools enjoyer. 👀',
    'color: #a78bfa; font-size: 14px; font-weight: bold;',
  );
  console.log(
    '%cSince you are already here: I build cloud & AI stuff on Azure and I am open for interesting work.\n→ denis.pajaziti.bus@proton.me',
    'color: #8b98a9; font-size: 12px;',
  );
  console.log(
    '%cPsst - try the Konami code on the page: ↑ ↑ ↓ ↓ ← → ← → B A',
    'color: #f472b6; font-size: 12px; font-style: italic;',
  );
  /* eslint-enable no-console */
}

export function initKonami() {
  let progress = 0;

  window.addEventListener('keydown', (event) => {
    progress = event.key === KONAMI[progress] ? progress + 1 : 0;
    if (progress < KONAMI.length) return;

    progress = 0;
    activateWarp();
  });
}

function activateWarp() {
  document.body.classList.add('warp-mode');
  window.dispatchEvent(new CustomEvent('dp:warp'));

  const toast = document.getElementById('toast');
  toast.textContent = '🚀 warp drive engaged';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    document.body.classList.remove('warp-mode');
    window.dispatchEvent(new CustomEvent('dp:warp-end'));
  }, 6000);
}

export function initAwayTitle() {
  const original = document.title;

  document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? '⚡ still deploying over here…' : original;
  });
}

export function initEmailCopy() {
  const button = document.getElementById('email-copy');
  const toast = document.getElementById('toast');

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('denis.pajaziti.bus@proton.me');
      toast.textContent = 'copied to clipboard ✔';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    } catch {
      window.location.href = 'mailto:denis.pajaziti.bus@proton.me';
    }
  });
}

export function initLogoRoll() {
  const brand = document.querySelector('.brand');
  let clicks = 0;
  let timer = 0;

  brand.addEventListener('click', () => {
    clicks += 1;
    clearTimeout(timer);
    timer = setTimeout(() => (clicks = 0), 1200);

    if (clicks < 3) return;
    clicks = 0;
    document.body.classList.add('barrel-roll');
    setTimeout(() => document.body.classList.remove('barrel-roll'), 1300);
  });
}
