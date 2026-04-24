import * as THREE from 'three';
import { COMMUNITY_CONFIG, TOWER_ZONES } from './zones.config.js';

export const ZONES = []; // Export for labels.js

const STATUS_COLORS = {
  approved: { color: 0x241B17, emissive: 0x0DAF72 },
  in_progress: { color: 0x1C1714, emissive: 0xE8690A },
  pending: { color: 0x1C1714, emissive: 0x4A4A4A },
  active: { color: 0x2A1408, emissive: 0xE8690A },
  locked: { color: 0x111111, emissive: 0x000000 }
};

export function buildGeometry(scene) {
  ZONES.length = 0; // Clear zones
  
  // Realistic Ground Plane (Asphalt/Concrete)
  const groundGeo = new THREE.BoxGeometry(22, 0.2, 18);
  const groundMat = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a, 
    roughness: 0.8, 
    metalness: 0.1,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -0.1;
  ground.receiveShadow = true;
  ground.userData.isDecoration = true;
  scene.add(ground);

  // Grass areas for community feel
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x1e2b1a, roughness: 1.0 });
  const grass1 = new THREE.Mesh(new THREE.BoxGeometry(21.5, 0.22, 17.5), grassMat);
  grass1.position.y = -0.1;
  grass1.userData.isDecoration = true;
  scene.add(grass1);

  // Roads (cross layout)
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7 });
  const hRoad = new THREE.Mesh(new THREE.BoxGeometry(22, 0.23, 3), roadMat);
  hRoad.position.y = -0.1;
  hRoad.userData.isDecoration = true;
  scene.add(hRoad);
  
  const vRoad = new THREE.Mesh(new THREE.BoxGeometry(3, 0.23, 18), roadMat);
  vRoad.position.y = -0.1;
  vRoad.userData.isDecoration = true;
  scene.add(vRoad);

  COMMUNITY_CONFIG.forEach(bldg => {
    if (bldg.type === 'tower') {
      buildTower(scene, bldg);
    } else if (bldg.type === 'clubhouse') {
      buildClubhouse(scene, bldg);
    } else if (bldg.type === 'amenity') {
      buildAmenity(scene, bldg);
    }
  });
}

function buildTower(scene, bldg) {
  const towerGroup = new THREE.Group();
  towerGroup.position.set(bldg.x, 0, bldg.z);
  scene.add(towerGroup);

  let currentY = 0;

  TOWER_ZONES.forEach((tz, index) => {
    let status = 'locked';
    if (index === 5) {
      status = 'active'; // Command layer is always active
    } else if (index < bldg.progressIndex) {
      status = 'approved';
    } else if (index === bldg.progressIndex) {
      status = 'in_progress';
    } else {
      status = 'pending';
    }

    const colors = STATUS_COLORS[status];

    const geo = new THREE.BoxGeometry(tz.width, tz.height - 0.05, tz.depth);
    const mat = new THREE.MeshStandardMaterial({ 
      color: colors.color, 
      metalness: 0.2, 
      roughness: 0.7,
      emissive: new THREE.Color(colors.emissive),
      emissiveIntensity: 0
    });
    
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = `${bldg.id}_${tz.id}`;
    
    const zoneData = {
      ...tz,
      id: `${bldg.id}_${tz.id}`,
      title: `${bldg.name}: ${tz.title}`,
      status: status,
      emissive: colors.emissive,
      y: currentY,
      worldY: currentY + tz.height / 2,
      worldX: bldg.x,
      worldZ: bldg.z
    };
    
    mesh.userData = zoneData;
    ZONES.push(zoneData);
    
    mesh.position.y = currentY + tz.height / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    towerGroup.add(mesh);

    // Add Windows (Glass look)
    if (tz.id !== 'zone_command') {
      const winGeo = new THREE.BoxGeometry(tz.width + 0.05, tz.height * 0.4, tz.depth * 0.8);
      const winMat = new THREE.MeshStandardMaterial({ 
        color: 0x6699ff, 
        metalness: 0.9, 
        roughness: 0.1, 
        transparent: true, 
        opacity: 0.3 
      });
      const windows = new THREE.Mesh(winGeo, winMat);
      windows.position.y = currentY + tz.height / 2;
      towerGroup.add(windows);
    }

    // Pillars
    if (tz.id !== 'zone_command') {
      const pX = tz.width / 2 - 0.1;
      const pZ = tz.depth / 2 - 0.1;
      const pGeo = new THREE.CylinderGeometry(0.05, 0.05, tz.height);
      const pMat = new THREE.MeshStandardMaterial({ color: 0x3A2E28, metalness: 0.6 });
      
      const positions = [[-pX, pZ], [pX, pZ], [-pX, -pZ], [pX, -pZ]];
      positions.forEach(([px, pz]) => {
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.set(px, currentY + tz.height / 2, pz);
        pMesh.castShadow = true;
        towerGroup.add(pMesh);
      });
    }

    currentY += tz.height;
  });

  // Crane decoration for towers in progress
  if (bldg.progressIndex < 5) {
    const craneGroup = new THREE.Group();
    const craneMat = new THREE.MeshStandardMaterial({ color: 0xC85A08, metalness: 0.8 });
    const craneBase = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.0, 0.2), craneMat);
    craneBase.position.y = 1.0;
    craneBase.castShadow = true;
    
    const craneArm = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.2, 0.2), craneMat);
    craneArm.position.set(1.5, 1.9, 0);
    craneArm.castShadow = true;
    
    craneGroup.add(craneBase, craneArm);
    craneGroup.position.set(-0.5, currentY, 0);
    craneGroup.rotation.y = Math.random() * Math.PI * 2;
    
    towerGroup.add(craneGroup);
  }
}

function buildClubhouse(scene, bldg) {
  const chGroup = new THREE.Group();
  chGroup.position.set(bldg.x, 0, bldg.z);
  scene.add(chGroup);

  // Main body
  const geo = new THREE.BoxGeometry(4, 2, 4);
  const mat = new THREE.MeshStandardMaterial({ 
    color: 0x332822, 
    metalness: 0.3, 
    roughness: 0.6,
  });
  const mesh = new THREE.Mesh(geo, mat);
  
  const zoneData = {
    id: bldg.id,
    phase: 'PHASE 14',
    title: bldg.name,
    description: 'Fully finished clubhouse ready for handover.',
    status: 'approved',
    emissive: 0x0DAF72,
    worldX: bldg.x,
    worldY: 1.0,
    worldZ: bldg.z
  };
  mesh.userData = zoneData;
  ZONES.push(zoneData);
  
  mesh.position.y = 1.0;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  chGroup.add(mesh);

  // Large glass facade for clubhouse
  const glassGeo = new THREE.BoxGeometry(4.1, 1.2, 2);
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x88ccff, metalness: 1.0, roughness: 0.05, transparent: true, opacity: 0.5 });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(0, 1.0, 0);
  chGroup.add(glass);
}

function buildAmenity(scene, bldg) {
  const amGroup = new THREE.Group();
  amGroup.position.set(bldg.x, 0, bldg.z);
  scene.add(amGroup);

  // Pool
  const poolGeo = new THREE.BoxGeometry(6, 0.15, 4);
  const poolMat = new THREE.MeshStandardMaterial({ 
    color: 0x0055aa, 
    metalness: 0.9, 
    roughness: 0.1,
    emissive: 0x002244,
    emissiveIntensity: 0.5
  });
  const poolMesh = new THREE.Mesh(poolGeo, poolMat);
  
  const zoneData = {
    id: bldg.id,
    phase: 'AMENITY',
    title: bldg.name,
    description: 'Common areas completed and PMC verified.',
    status: 'approved',
    emissive: 0x0DAF72,
    worldX: bldg.x,
    worldY: 0.075,
    worldZ: bldg.z
  };
  poolMesh.userData = zoneData;
  ZONES.push(zoneData);
  
  poolMesh.position.y = 0.075;
  poolMesh.receiveShadow = true;
  amGroup.add(poolMesh);
  
  // Water surface shimmer (simple plane on top)
  const waterGeo = new THREE.PlaneGeometry(5.8, 3.8);
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x88eeff, transparent: true, opacity: 0.4, metalness: 1, roughness: 0 });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.16;
  amGroup.add(water);

  // Garden patches
  const gardenGeo = new THREE.BoxGeometry(2, 0.2, 2);
  const gardenMat = new THREE.MeshStandardMaterial({ color: 0x2a4025 });
  
  const positions = [[-4, 0.1, 3], [4, 0.1, -3], [-4, 0.1, -3], [4, 0.1, 3]];
  positions.forEach(([x, y, z]) => {
    const g = new THREE.Mesh(gardenGeo, gardenMat);
    g.position.set(x, y, z);
    amGroup.add(g);
  });
}
