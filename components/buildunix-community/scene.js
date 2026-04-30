import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function setupScene(container, renderer) {
  const scene = new THREE.Scene();

  // PMREM Generator for realistic reflections
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.environment = environment;
  
  // Transparent background for CSS-driven themes
  scene.background = null;
  renderer.setClearColor(0x000000, 0);

  // 1. Hemisphere Light: Sky/Ground contrast (Cool/Warm)
  const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x2A241F, 0.4); 
  scene.add(hemiLight);

  // 2. Primary Sun Light: Warm, strong, high-contrast (Reference Image 1)
  const sunLight = new THREE.DirectionalLight(0xFFF4E0, 3.5); 
  sunLight.position.set(40, 60, 25);
  sunLight.castShadow = true;
  
  // High quality shadows
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 300;
  sunLight.shadow.camera.left = -60;
  sunLight.shadow.camera.right = 60;
  sunLight.shadow.camera.top = 60;
  sunLight.shadow.camera.bottom = -60;
  sunLight.shadow.bias = -0.0005;
  sunLight.shadow.blurSamples = 8;
  scene.add(sunLight);

  // 3. Fill Light: Cool blue to bounce into shadows
  const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.6);
  fillLight.position.set(-30, 20, -20);
  scene.add(fillLight);

  // 4. Ambient Occlusion / Soft Ground Fill
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
  scene.add(ambientLight);

  // 5. Point Lights for localized glow (Pool & Accents)
  const poolLight = new THREE.PointLight(0x4a9aba, 2.5, 30);
  poolLight.position.set(2, 4, -8);
  scene.add(poolLight);

  const accentLight = new THREE.PointLight(0xE8690A, 1.2, 40);
  accentLight.position.set(-22, 10, -8);
  scene.add(accentLight);
  scene.userData.accentLight = accentLight;

  return scene;
}
