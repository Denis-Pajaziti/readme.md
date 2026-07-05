import * as THREE from 'three';

/**
 * Hero WebGL scene: a slowly rotating particle galaxy with a floating
 * wireframe icosahedron and torus knot. Camera reacts to pointer and
 * scroll for a parallax feel.
 */
const GALAXY = {
  count: 9000,
  radius: 9,
  branches: 4,
  spin: 1.25,
  randomness: 0.45,
  randomnessPower: 2.8,
  insideColor: new THREE.Color('#22d3ee'),
  outsideColor: new THREE.Color('#a78bfa'),
};

export function createHeroScene(canvas) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#05070d', 0.045);

  const sizes = { width: canvas.offsetWidth, height: canvas.offsetHeight };

  const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 100);
  camera.position.set(0, 2.4, 8.5);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const galaxy = buildGalaxy();
  scene.add(galaxy);

  const icosahedron = buildWireframe(
    new THREE.IcosahedronGeometry(1.35, 1),
    '#22d3ee',
    new THREE.Vector3(3.4, 1.6, 1.5),
  );
  scene.add(icosahedron);

  const torus = buildWireframe(
    new THREE.TorusKnotGeometry(0.55, 0.16, 90, 12),
    '#a78bfa',
    new THREE.Vector3(-3.8, 0.4, 0.5),
  );
  scene.add(torus);

  const pointer = { x: 0, y: 0 };
  let scrollY = 0;
  let warp = 1;
  let warpTarget = 1;

  window.addEventListener('dp:warp', () => (warpTarget = 26));
  window.addEventListener('dp:warp-end', () => (warpTarget = 1));

  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  window.addEventListener('resize', () => {
    sizes.width = canvas.offsetWidth;
    sizes.height = canvas.offsetHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const clock = new THREE.Clock();
  let rafId = 0;

  const tick = () => {
    const elapsed = clock.getElapsedTime();

    warp += (warpTarget - warp) * 0.03;
    galaxy.rotation.y += 0.00075 * warp;
    icosahedron.rotation.x = elapsed * 0.18;
    icosahedron.rotation.y = elapsed * 0.24;
    icosahedron.position.y = 1.6 + Math.sin(elapsed * 0.7) * 0.28;
    torus.rotation.x = -elapsed * 0.22;
    torus.rotation.z = elapsed * 0.16;
    torus.position.y = 0.4 + Math.cos(elapsed * 0.55) * 0.32;

    // Pointer parallax + scroll dolly, eased for smoothness.
    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.035;
    camera.position.y += (2.4 - pointer.y * 0.7 - scrollY * 0.0016 - camera.position.y) * 0.045;
    camera.lookAt(0, 0.6, 0);

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      clock.start();
      tick();
    }
  });

  tick();
}

function buildGalaxy() {
  const positions = new Float32Array(GALAXY.count * 3);
  const colors = new Float32Array(GALAXY.count * 3);

  for (let i = 0; i < GALAXY.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * GALAXY.radius;
    const branchAngle = ((i % GALAXY.branches) / GALAXY.branches) * Math.PI * 2;
    const spinAngle = radius * GALAXY.spin;

    const randomOffset = () =>
      Math.pow(Math.random(), GALAXY.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      GALAXY.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomOffset();
    positions[i3 + 1] = randomOffset() * 0.55;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomOffset();

    const mixed = GALAXY.insideColor.clone().lerp(GALAXY.outsideColor, radius / GALAXY.radius);
    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.028,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  });

  const points = new THREE.Points(geometry, material);
  points.position.y = -1.2;
  return points;
}

function buildWireframe(geometry, color, position) {
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.35,
  });
  const mesh = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), material);
  mesh.position.copy(position);
  return mesh;
}
