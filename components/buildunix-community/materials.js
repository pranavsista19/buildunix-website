import * as THREE from 'three';

export const getMaterials = () => {
  return {
    facadeDark: new THREE.MeshStandardMaterial({
      color: 0x2e2e2e, roughness: 0.8, metalness: 0.2
    }),
    facadeSecondary: new THREE.MeshStandardMaterial({
      color: 0x383838, roughness: 0.8, metalness: 0.2
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xa3b3bf,
      roughness: 0.05,
      metalness: 0.8,
      transmission: 0.1,
      thickness: 0.5,
      opacity: 0.4,
      transparent: true,
      envMapIntensity: 3.5,
      side: THREE.DoubleSide,
      depthWrite: false
    }),
    water: new THREE.MeshPhysicalMaterial({
      color: 0x4a9aba,
      roughness: 0.0,
      metalness: 0.1,
      opacity: 0.7,
      transparent: true,
      envMapIntensity: 3.0
    }),
    basePlate: new THREE.MeshStandardMaterial({
      color: 0x2a2a2a, roughness: 1.0, metalness: 0.0
    }),
    concrete: new THREE.MeshStandardMaterial({
      color: 0x8a8070, roughness: 0.95, metalness: 0.0
    }),
    grass: new THREE.MeshStandardMaterial({
      color: 0x3a6b30, roughness: 1.0, metalness: 0.0
    }),
    treeCanopy: new THREE.MeshStandardMaterial({
      color: 0x2d5a27, roughness: 0.9, metalness: 0.0
    }),
    crane: new THREE.MeshStandardMaterial({
      color: 0xC85A08, roughness: 0.3, metalness: 0.7
    }),
    scaffolding: new THREE.MeshStandardMaterial({
      color: 0x888070, roughness: 0.2, metalness: 0.9
    })
  };
};
