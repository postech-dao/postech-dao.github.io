/**
 * Hero 3D Viewer Module
 * Loads and renders STL logo in the hero section using Three.js
 */

import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Initialize 3D viewer in hero section
 */
export function initHero3D() {
  const container = document.getElementById('hero-3d-container');

  if (!container) {
    console.log('Hero 3D container not found');
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight1.position.set(1, 1, 1);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xC80864, 0.4);
  directionalLight2.position.set(-1, -1, -1);
  scene.add(directionalLight2);

  // Add subtle point light for glow effect
  const pointLight = new THREE.PointLight(0xC80864, 0.5, 100);
  pointLight.position.set(0, 0, 50);
  scene.add(pointLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;

  // Load STL
  const loader = new STLLoader();
  loader.load(
    'images/logo/favicon.stl',
    function (geometry) {
      // Material with PDAO brand color
      const material = new THREE.MeshPhongMaterial({
        color: 0xC80864,
        specular: 0x666666,
        shininess: 100,
        flatShading: false
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Center the geometry
      geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      geometry.boundingBox.getCenter(center);
      geometry.translate(-center.x, -center.y, -center.z);

      // Scale to fit
      const box = new THREE.Box3().setFromObject(mesh);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 60 / maxDim;
      mesh.scale.setScalar(scale);

      scene.add(mesh);

      console.log('STL model loaded successfully');
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error('Error loading STL:', error);
    }
  );

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  function onWindowResize() {
    if (!container) return;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', onWindowResize);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', onWindowResize);
    controls.dispose();
    renderer.dispose();
    container.removeChild(renderer.domElement);
  };
}
