import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function setupScene(container, renderer) {
  const scene = new THREE.Scene();

  // Robust Environment Setup
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  
  const roomEnv = new RoomEnvironment(renderer);
  const environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
  scene.environment = environment;
  
  // Dispose generator and roomEnv to save memory
  pmremGenerator.dispose();
  roomEnv.dispose();
  
  // Set a dark architectural background instead of pure transparency to avoid "nothing visible" issues
  scene.background = new THREE.Color(0x0a0a0b); 
  renderer.setClearColor(0x0a0a0b, 1);

  // 1. Hemisphere Light (Atmospheric Fill)
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2); 
  scene.add(hemiLight);

  // 2. Strong Architectural Sun (High Intensity for MeshPhysicalMaterial)
  const sunLight = new THREE.DirectionalLight(0xFFF4E0, 4.0); 
  sunLight.position.set(50, 70, 30);
  sunLight.castShadow = true;
  
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 300;
  sunLight.shadow.camera.left = -100;
  sunLight.shadow.camera.right = 100;
  sunLight.shadow.camera.top = 100;
  sunLight.shadow.camera.bottom = -100;
  sunLight.shadow.bias = -0.0001;
  scene.add(sunLight);

  // 3. Fill Lights (Shadow Softening)
  const fill1 = new THREE.DirectionalLight(0xABC4D1, 0.8);
  fill1.position.set(-50, 30, -20);
  scene.add(fill1);

  // 4. Localized Accents
  const poolLight = new THREE.PointLight(0x4a9aba, 3, 40);
  poolLight.position.set(2, 4, -8);
  scene.add(poolLight);

  const accentLight = new THREE.PointLight(0xE8690A, 1.5, 50);
  accentLight.position.set(-22, 12, -8);
  scene.add(accentLight);
  scene.userData.accentLight = accentLight;

  return scene;
}
