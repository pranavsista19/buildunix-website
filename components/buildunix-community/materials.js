import * as THREE from 'three';

export const getMaterials = () => {
  return {
    facadePrimary: new THREE.MeshStandardMaterial({
      color: 0xE8E0D0, roughness: 0.4, metalness: 0.1
    }),
    facadeDark: new THREE.MeshStandardMaterial({
      color: 0x5C4033, roughness: 0.6, metalness: 0.1 // Warm wood/brown
    }),
    facadeSecondary: new THREE.MeshStandardMaterial({
      color: 0xD4C5B3, roughness: 0.5, metalness: 0.1
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xc9e4f5,
      roughness: 0.01,
      metalness: 0.9,
      transmission: 0.3,
      thickness: 1.0,
      opacity: 0.6,
      transparent: true,
      envMapIntensity: 4.0,
      side: THREE.DoubleSide,
      depthWrite: false
    }),
    water: new THREE.MeshPhysicalMaterial({
      color: 0x3a8fb7,
      roughness: 0.1,
      metalness: 0.2,
      opacity: 0.85,
      transparent: true,
      envMapIntensity: 4.0
    }),
    basePlate: new THREE.MeshStandardMaterial({
      color: 0x4B6F44, roughness: 0.9, metalness: 0.0 // Forest green
    }),
    concrete: new THREE.MeshStandardMaterial({
      color: 0xA9A9A9, roughness: 0.8, metalness: 0.1
    }),
    grass: new THREE.MeshStandardMaterial({
      color: 0x7CFC00, roughness: 1.0, metalness: 0.0 // Lawn green
    }),
    treeCanopy: new THREE.MeshStandardMaterial({
      color: 0x228B22, roughness: 0.8, metalness: 0.0 // Forest green
    }),
    crane: new THREE.MeshStandardMaterial({
      color: 0xFFD700, roughness: 0.2, metalness: 0.8 // Golden yellow
    }),
    scaffolding: new THREE.MeshStandardMaterial({
      color: 0xC0C0C0, roughness: 0.1, metalness: 0.9 // Silver
    })
  };
};
