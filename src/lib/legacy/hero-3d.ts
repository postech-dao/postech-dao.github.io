import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { base } from '$app/paths';

const BRAND_COLOR = 0xc80864;

export function initHero3D(): () => void {
  const container = document.getElementById('hero-3d-container');
  if (!container) return () => {};

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    return () => {};
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);
  camera.position.set(0, 0, 100);

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
  keyLight.position.set(-3, 5, 8);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xffd7e8, 0.8);
  rimLight.position.set(5, -2, -4);
  scene.add(rimLight);

  const faceMaterial = new THREE.MeshPhysicalMaterial({
    color: BRAND_COLOR,
    metalness: 0.55,
    roughness: 0.19,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 2,
  });
  const edgeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x8c0747,
    metalness: 0.78,
    roughness: 0.17,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    envMapIntensity: 2,
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  controls.enableDamping = !reducedMotion;
  controls.dampingFactor = 0.06;

  let logo: THREE.Mesh | undefined;
  let disposed = false;
  let userInteracted = false;
  const stopIdleMotion = () => {
    userInteracted = true;
  };
  controls.addEventListener('start', stopIdleMotion);
  const render = () => renderer.render(scene, camera);

  new SVGLoader().load(
    `${base}/images/logo/hero-outline.svg`,
    ({ paths }) => {
      if (disposed) return;
      const shapes = paths.flatMap((path) => path.toShapes());
      if (!shapes.length) return;

      const geometry = new THREE.ExtrudeGeometry(shapes, {
        depth: 100,
        steps: 1,
        bevelEnabled: true,
        bevelSize: 19,
        bevelThickness: 21,
        bevelSegments: 6,
        curveSegments: 12,
      });
      // SVG coordinates grow downward. A half-turn keeps triangle winding intact.
      geometry.rotateX(Math.PI);
      geometry.center();
      geometry.computeBoundingBox();
      if (!geometry.boundingBox) {
        geometry.dispose();
        return;
      }
      const size = geometry.boundingBox.getSize(new THREE.Vector3());
      const scale = 60 / Math.max(size.x, size.y, size.z);
      geometry.scale(scale, scale, scale);
      toCreasedNormals(geometry, Math.PI / 3);

      logo = new THREE.Mesh(geometry, [faceMaterial, edgeMaterial]);
      scene.add(logo);
      container.classList.add('hero__3d--ready');
      render();
    },
    undefined,
    (error: unknown) => console.error('Error loading PDAO logo:', error),
  );

  const resize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  let visible = true;
  let frame = 0;
  const animate = (time: number) => {
    frame = 0;
    if (!visible || document.hidden) return;
    if (logo && !userInteracted) {
      logo.rotation.y = -0.13 + Math.sin(time * 0.00035) * 0.17;
      logo.rotation.x = 0.045 + Math.sin(time * 0.00022) * 0.035;
    }
    controls.update();
    render();
    frame = requestAnimationFrame(animate);
  };
  const updateAnimation = () => {
    if (!reducedMotion && visible && !document.hidden && !frame) {
      frame = requestAnimationFrame(animate);
    } else if ((!visible || document.hidden) && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateAnimation();
  });
  observer.observe(container);
  document.addEventListener('visibilitychange', updateAnimation);
  if (reducedMotion) controls.addEventListener('change', render);
  updateAnimation();

  return () => {
    disposed = true;
    resizeObserver.disconnect();
    observer.disconnect();
    document.removeEventListener('visibilitychange', updateAnimation);
    if (reducedMotion) controls.removeEventListener('change', render);
    controls.removeEventListener('start', stopIdleMotion);
    cancelAnimationFrame(frame);
    controls.dispose();
    logo?.geometry.dispose();
    faceMaterial.dispose();
    edgeMaterial.dispose();
    environment.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    container.classList.remove('hero__3d--ready');
  };
}
