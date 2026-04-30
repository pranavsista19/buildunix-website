import * as THREE from 'three';

export const getMaterials = () => {
  return {
    facadePrimary: new THREE.MeshStandardMaterial({
      color: 0xF0EDE8,
      roughness: 0.8,
      metalness: 0.1
    }),
    facadeSecondary: new THREE.MeshStandardMaterial({
      color: 0xD9D2C9,
      roughness: 0.9,
      metalness: 0.05
    }),
    glass: new THREE.MeshStandardMaterial({
      color: 0x2A3B4C,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85
    }),
    facadeDark: new THREE.MeshStandardMaterial({
      color: 0x1A1C1E,
      roughness: 0.5,
      metalness: 0.3
    }),
    basePlate: new THREE.MeshStandardMaterial({
      color: 0xE8E5DF,
      roughness: 1.0,
      metalness: 0.0
    }),
    concrete: new THREE.MeshStandardMaterial({
      color: 0x999999,
      roughness: 0.8,
      metalness: 0.1
    }),
    water: new THREE.MeshStandardMaterial({
      color: 0x4A9ABA,
      roughness: 0.1,
      metalness: 0.4,
      transparent: true,
      opacity: 0.8
    }),
    treeCanopy: new THREE.MeshStandardMaterial({
      color: 0x4B6F44,
      roughness: 0.9,
      metalness: 0.0
    }),
    crane: new THREE.MeshStandardMaterial({
      color: 0xE8690A,
      roughness: 0.4,
      metalness: 0.6
    }),
    scaffolding: new THREE.MeshStandardMaterial({
      color: 0x71797E,
      roughness: 0.6,
      metalness: 0.5,
      wireframe: true
    })
  };
};
