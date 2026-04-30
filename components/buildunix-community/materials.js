import * as THREE from 'three';

export const getMaterials = () => {
  return {
    // Clean white plaster for main structure (img3)
    facadePrimary: new THREE.MeshStandardMaterial({
      color: 0xFAFAFA,
      roughness: 0.9,
      metalness: 0.05
    }),
    // Warm wood for accents (img3)
    facadeSecondary: new THREE.MeshStandardMaterial({
      color: 0xC58C5A,
      roughness: 0.8,
      metalness: 0.1
    }),
    // Refined glass for better reflections
    glass: new THREE.MeshStandardMaterial({
      color: 0x1A252C,
      roughness: 0.05,
      metalness: 0.9,
      transparent: true,
      opacity: 0.7
    }),
    // Dark metal/roof accents
    facadeDark: new THREE.MeshStandardMaterial({
      color: 0x2A2A2E,
      roughness: 0.6,
      metalness: 0.4
    }),
    // Lush lawn grass
    basePlate: new THREE.MeshStandardMaterial({
      color: 0x5C8041,
      roughness: 1.0,
      metalness: 0.0
    }),
    // Dark asphalt for roads (img2)
    concrete: new THREE.MeshStandardMaterial({
      color: 0x2C2E33,
      roughness: 0.8,
      metalness: 0.1
    }),
    water: new THREE.MeshStandardMaterial({
      color: 0x3CA2C8,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85
    }),
    // Deep rich tree canopy
    treeCanopy: new THREE.MeshStandardMaterial({
      color: 0x3D5B31,
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
    }),
    roadMarkings: new THREE.MeshBasicMaterial({
      color: 0xFFCA3A, // Yellow markings
      transparent: true,
      opacity: 0.8
    }),
    roadMarkingsWhite: new THREE.MeshBasicMaterial({
      color: 0xFFFFFF, // White dashes
      transparent: true,
      opacity: 0.8
    }),
    // Sports Court Materials
    courtGreen: new THREE.MeshStandardMaterial({ color: 0x4CAF50, roughness: 0.8 }),
    courtBlue: new THREE.MeshStandardMaterial({ color: 0x2196F3, roughness: 0.8 }),
    courtRed: new THREE.MeshStandardMaterial({ color: 0xF44336, roughness: 0.8 }),
    courtBorder: new THREE.MeshBasicMaterial({ color: 0xFFFFFF }),
    streetLight: new THREE.MeshStandardMaterial({ color: 0xCCCCCC, metalness: 0.8, roughness: 0.2 })
  };
};
