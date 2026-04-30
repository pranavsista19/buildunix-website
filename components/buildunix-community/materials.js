import * as THREE from 'three';

export const getMaterials = () => {
  return {
    // Premium Matte Concrete / Stone
    facadePrimary: new THREE.MeshPhysicalMaterial({
      color: 0xFAF6F1,
      roughness: 0.6,
      metalness: 0.05,
      clearcoat: 0.1,
      clearcoatRoughness: 0.3,
      sheen: 0.2,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color(0xFFFFFF)
    }),
    
    // Warm Architectural Wood / Dark Accents
    facadeDark: new THREE.MeshPhysicalMaterial({
      color: 0x2A241F,
      roughness: 0.5,
      metalness: 0.1,
      clearcoat: 0.2,
      clearcoatRoughness: 0.4
    }),
    
    // Secondary Stone / Muted Beige
    facadeSecondary: new THREE.MeshPhysicalMaterial({
      color: 0xD9D2C9,
      roughness: 0.7,
      metalness: 0.0
    }),
    
    // Polished Realistic Glass
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xABC4D1,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.9, // Use pure transmission for realism
      thickness: 1.5,
      ior: 1.5,
      envMapIntensity: 2.5,
      side: THREE.DoubleSide,
      depthWrite: false,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff)
    }),
    
    // Deep Reflective Water
    water: new THREE.MeshPhysicalMaterial({
      color: 0x1B3D52,
      roughness: 0.1,
      metalness: 0.3,
      transmission: 0.8,
      envMapIntensity: 3.0
    }),
    
    // Soft Architectural Grass (Muted Green)
    basePlate: new THREE.MeshStandardMaterial({
      color: 0x3D4A3A, // Muted, professional forest green
      roughness: 0.95,
      metalness: 0.0
    }),
    
    // Smooth Concrete / Road
    concrete: new THREE.MeshStandardMaterial({
      color: 0x4A4A4A,
      roughness: 0.7,
      metalness: 0.05
    }),
    
    // Stylized Tree Canopy
    treeCanopy: new THREE.MeshStandardMaterial({
      color: 0x2D3B2D,
      roughness: 0.9,
      metalness: 0.0
    }),
    
    // Industrial Crane Accent
    crane: new THREE.MeshStandardMaterial({
      color: 0xD4AF37, // Brighter gold/brass for professional industrial look
      roughness: 0.3,
      metalness: 0.9
    }),
    
    // Structural Metal
    scaffolding: new THREE.MeshStandardMaterial({
      color: 0x71797E,
      roughness: 0.2,
      metalness: 0.8
    }),

    // Floor-specific highlights (Interactive)
    floorHighlight: new THREE.MeshStandardMaterial({
      color: 0xE8690A,
      emissive: 0xE8690A,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.3
    })
  };
};
