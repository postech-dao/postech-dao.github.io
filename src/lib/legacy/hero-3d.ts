import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { base } from '$app/paths';

export function initHero3D(): () => void {
  const container = document.getElementById('hero-3d-container');
  if (!container) return () => {};

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 100);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light1.position.set(1, 1, 1);
  scene.add(light1);
  const light2 = new THREE.DirectionalLight(0xc80864, 0.4);
  light2.position.set(-1, -1, -1);
  scene.add(light2);
  const pointLight = new THREE.PointLight(0xc80864, 0.5, 100);
  pointLight.position.set(0, 0, 50);
  scene.add(pointLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;

  const loader = new STLLoader();
  loader.load(
    `${base}/images/logo/favicon.stl`,
    (geometry: THREE.BufferGeometry) => {
      const material = new THREE.MeshPhongMaterial({
        color: 0xc80864,
        specular: 0x666666,
        shininess: 100,
        flatShading: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      geometry.boundingBox?.getCenter(center);
      geometry.translate(-center.x, -center.y, -center.z);
      const box = new THREE.Box3().setFromObject(mesh);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      mesh.scale.setScalar(60 / maxDim);
      scene.add(mesh);
    },
    undefined,
    (error: unknown) => console.error('Error loading STL:', error),
  );

  let frame = 0;
  const animate = () => {
    frame = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('resize', onResize);
    cancelAnimationFrame(frame);
    controls.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
