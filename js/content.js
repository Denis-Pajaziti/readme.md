/** Data-driven content: tech marquee, skill icons, terminal script. */
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const TECH_STACK = [
  { name: 'Microsoft Azure', icon: `${DEVICON}/azure/azure-original.svg` },
  { name: 'Kubernetes', icon: `${DEVICON}/kubernetes/kubernetes-original.svg` },
  { name: 'Docker', icon: `${DEVICON}/docker/docker-original.svg` },
  { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg` },
  { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg` },
  { name: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: 'React', icon: `${DEVICON}/react/react-original.svg` },
  { name: 'Python', icon: `${DEVICON}/python/python-original.svg` },
  { name: 'Linux', icon: `${DEVICON}/linux/linux-original.svg` },
  { name: 'Terraform', icon: `${DEVICON}/terraform/terraform-original.svg` },
  { name: 'Azure DevOps', icon: `${DEVICON}/azuredevops/azuredevops-original.svg` },
  { name: 'Git', icon: `${DEVICON}/git/git-original.svg` },
  { name: 'MongoDB', icon: `${DEVICON}/mongodb/mongodb-original.svg` },
  { name: 'PostgreSQL', icon: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: 'Bash', icon: `${DEVICON}/bash/bash-original.svg` },
  { name: 'Nginx', icon: `${DEVICON}/nginx/nginx-original.svg` },
];

export const TERMINAL_SCRIPT = [
  { prompt: '$', cmd: ' whoami', out: 'denis - cloud & ai solutions engineer' },
  { prompt: '$', cmd: ' cat skills.yaml', out: null },
  { key: 'cloud', out: '     [azure, kubernetes, docker, terraform]' },
  { key: 'ai', out: '        [azure-openai, rag, llm-integration]' },
  { key: 'code', out: '      [typescript, node, python, react]' },
  { prompt: '$', cmd: ' az account show --query state', out: '"Certified - AI Engineer Associate" ✔' },
  { prompt: '$', cmd: ' uptime', out: '8+ years in production, zero degrees required' },
  { prompt: '$', cmd: ' ./deploy.sh --target=production', out: null },
  { ok: '✔ build · ✔ test · ✔ ship - done in 42s' },
];

export function buildMarquee(track) {
  const items = TECH_STACK.map(
    ({ name, icon }) => `
      <div class="marquee-item">
        <img src="${icon}" alt="" loading="lazy" width="34" height="34" />
        <span>${name}</span>
      </div>`,
  ).join('');

  // Duplicate once so the -50% translate loops seamlessly.
  track.innerHTML = items + items;
}

export function buildSkillIcons(grid) {
  grid.innerHTML = TECH_STACK.map(
    ({ name, icon }) => `
      <div class="skill-icon reveal" data-hover>
        <img src="${icon}" alt="${name} logo" loading="lazy" width="46" height="46" />
        <span>${name}</span>
      </div>`,
  ).join('');
}

/** Types the terminal script line by line. */
export function runTerminal(body) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let html = '';
  let lineIndex = 0;

  const renderLine = (line) => {
    if (line.ok) return `<span class="t-ok">${line.ok}</span>\n`;
    if (line.key) return `<span class="t-key">  ${line.key}:</span><span class="t-out">${line.out}</span>\n`;

    const cmd = `<span class="t-prompt">${line.prompt}</span><span class="t-cmd">${line.cmd}</span>\n`;
    return line.out ? `${cmd}<span class="t-out">${line.out}</span>\n` : cmd;
  };

  if (reduced) {
    body.innerHTML = TERMINAL_SCRIPT.map(renderLine).join('');
    return;
  }

  const typeNext = () => {
    if (lineIndex >= TERMINAL_SCRIPT.length) return;
    html += renderLine(TERMINAL_SCRIPT[lineIndex]);
    body.innerHTML = html;
    lineIndex += 1;
    setTimeout(typeNext, 420);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      typeNext();
    },
    { threshold: 0.35 },
  );

  observer.observe(body);
}
