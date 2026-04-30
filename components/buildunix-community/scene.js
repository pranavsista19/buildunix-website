import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function setupScene(container, renderer) {
  const scene = new THREE.Scene();

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  
  // Make scene transparent to allow CSS background to show through for light/dark mode
  scene.background = null;
  renderer.setClearColor(0x000000, 0);

  const hemiLight = new THREE.HemisphereLight(0xffefd5, 0x1a1a2e, 0.6);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
  sunLight.position.set(30, 50, 20);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 200;
  sunLight.shadow.camera.left = -50;
  sunLight.shadow.camera.right = 50;
  sunLight.shadow.camera.top = 50;
  sunLight.shadow.camera.bottom = -50;
  sunLight.shadow.bias = -0.001;
  scene.add(sunLight);

  const fillLight = new THREE.DirectionalLight(0x4a6fa5, 0.5);
  fillLight.position.set(-20, 20, -15);
  scene.add(fillLight);

  const poolLight = new THREE.PointLight(0x4a9aba, 1.5, 20);
  poolLight.position.set(2, 2, -8);
  scene.add(poolLight);

  const accentLight = new THREE.PointLight(0xE8690A, 0.8, 30);
  accentLight.position.set(-22, 8, -8);
  scene.add(accentLight);
  scene.userData.accentLight = accentLight;

  return scene;
}
