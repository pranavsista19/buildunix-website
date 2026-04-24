import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { buildGeometry } from './building.js';
import { setupRaycaster, updateRaycaster } from './raycaster.js';
import { createLabels } from './labels.js';

export function initScene(container) {
  // Scene
  const scene = new THREE.Scene();

  // Renderer — WebGL + CSS2D overlay
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // CSS2D renderer for labels
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(container.clientWidth, container.clientHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.pointerEvents = 'none';
  container.appendChild(labelRenderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    32,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(12, 10, 12);
  camera.lookAt(0, 1, 0);

  // Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.enablePan = true;
  controls.minDistance = 10;
  controls.maxDistance = 25;
  controls.minPolarAngle = Math.PI / 6;
  controls.maxPolarAngle = Math.PI / 2.2;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.4;

  // Lighting - Enhanced for "Realistic Render Feel"
  const ambientLight = new THREE.AmbientLight(0xFFF0E0, 0.4);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xFFF4E0, 2.5);
  keyLight.position.set(-10, 20, 10);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 100;
  keyLight.shadow.camera.left = -15;
  keyLight.shadow.camera.right = 15;
  keyLight.shadow.camera.top = 15;
  keyLight.shadow.camera.bottom = -15;
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x1A3A6A, 1.2);
  fillLight.position.set(12, 8, -10);
  scene.add(fillLight);

  const accentLight = new THREE.PointLight(0xE8690A, 1.0);
  accentLight.position.set(0, 15, 5);
  scene.add(accentLight);

  const rimLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
  rimLight.position.set(10, 5, 0);
  scene.add(rimLight);

  // Build Geometry
  buildGeometry(scene);

  // Labels
  createLabels(scene);

  // Raycaster setup
  const raycasterContext = setupRaycaster(container, camera, scene, controls);

  // Resize Handler
  const onWindowResize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    labelRenderer.setSize(w, h);

    // Mobile: hide labels, adjust camera
    if (window.innerWidth < 768) {
      camera.position.set(16, 12, 16);
      labelRenderer.domElement.style.display = 'none';
    } else {
      labelRenderer.domElement.style.display = 'block';
    }
  };
  window.addEventListener('resize', onWindowResize, { passive: true });
  onWindowResize(); // Initial check

  // Animation Loop
  let animationFrameId;
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    controls.update();
    
    updateRaycaster(raycasterContext);
    
    // Pulse the active zones emissive
    scene.traverse((object) => {
      if (object.isMesh && object.userData && object.userData.status === 'active') {
        if (object !== raycasterContext.LOCKED && object !== raycasterContext.INTERSECTED) {
          object.material.emissive.setHex(0xE8690A);
          object.material.emissiveIntensity = 0.15 + Math.sin(Date.now() * 0.002) * 0.1;
        }
      }
    });

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  };
  animate();

  // Cleanup function
  return () => {
    window.removeEventListener('resize', onWindowResize);
    raycasterContext.cleanup();
    cancelAnimationFrame(animationFrameId);
    
    // Dispose resources
    scene.traverse((object) => {
      if (object.isMesh) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });
    
    renderer.dispose();
    container.innerHTML = '';
  };
}
