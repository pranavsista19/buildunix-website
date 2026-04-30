import * as THREE from 'three';
import { BUILDINGS } from './community.config.js';
import { getMaterials } from './materials.js';
import { createBuildingLabel } from './labels.js';

export function buildCommunity(scene) {
  const materials = getMaterials();

  // Base Plate (Green Grass)
  const baseGeo = new THREE.PlaneGeometry(120, 100);
  const basePlate = new THREE.Mesh(baseGeo, materials.basePlate);
  basePlate.rotation.x = -Math.PI / 2;
  basePlate.receiveShadow = true;
  scene.add(basePlate);

  // Helper for Roads (img2 reference: Asphalt, Yellow edges, White dash center)
  const createRoad = (width, length, x, z, rotY = 0) => {
    const roadGroup = new THREE.Group();
    roadGroup.position.set(x, 0.05, z);
    roadGroup.rotation.y = rotY;

    // Asphalt
    const roadMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, length), materials.concrete);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.receiveShadow = true;
    roadGroup.add(roadMesh);

    // Yellow lines (edges)
    const lineGeo = new THREE.PlaneGeometry(0.2, length);
    const line1 = new THREE.Mesh(lineGeo, materials.roadMarkings);
    line1.rotation.x = -Math.PI / 2;
    line1.position.set(-width/2 + 0.5, 0.01, 0);
    const line2 = new THREE.Mesh(lineGeo, materials.roadMarkings);
    line2.rotation.x = -Math.PI / 2;
    line2.position.set(width/2 - 0.5, 0.01, 0);
    roadGroup.add(line1, line2);

    // White dashed center line
    const dashCount = Math.floor(length / 3);
    const dashGeo = new THREE.PlaneGeometry(0.2, 1.5);
    for (let i = 0; i < dashCount; i++) {
      const dash = new THREE.Mesh(dashGeo, materials.roadMarkingsWhite);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.01, -length/2 + (i * 3) + 1.5);
      roadGroup.add(dash);
    }
    scene.add(roadGroup);
  };

  // Main Roads
  createRoad(8, 90, 0, 0, 0); // Vertical spine
  createRoad(8, 60, -10, 0, Math.PI / 2); // Horizontal cross
  createRoad(8, 60, 20, 0, Math.PI / 2); // Horizontal cross

  // Helper to create a clean, modern tower (img3 aesthetics)
  const createTower = (bldgObj, width, depth) => {
    const group = new THREE.Group();
    group.position.set(bldgObj.x, bldgObj.y, bldgObj.z);
    
    let currentY = 0;
    const floorHeight = 1.3;

    // Ground Floor Base
    const gfGeo = new THREE.BoxGeometry(width, floorHeight * 1.2, depth);
    const gf = new THREE.Mesh(gfGeo, materials.facadePrimary);
    gf.position.y = (floorHeight * 1.2) / 2;
    gf.castShadow = true;
    gf.receiveShadow = true;
    gf.userData = { ...bldgObj, isInteractive: true };
    group.add(gf);
    currentY += floorHeight * 1.2;

    for (let i = 0; i < bldgObj.floors; i++) {
      const isUnderConstruction = bldgObj.status === 'in_progress' && i > bldgObj.floors - 3;
      const isEarlyStage = bldgObj.status === 'early_stage' && i > bldgObj.floors - 6;

      const floorGroup = new THREE.Group();
      floorGroup.position.y = currentY;

      // Clean white slab
      const slabGeo = new THREE.BoxGeometry(width + 0.4, 0.15, depth + 0.4);
      const slab = new THREE.Mesh(slabGeo, materials.facadePrimary);
      slab.position.y = 0.075;
      slab.castShadow = true;
      slab.receiveShadow = true;
      floorGroup.add(slab);

      if (isEarlyStage) {
        const colGeo = new THREE.BoxGeometry(0.4, floorHeight, 0.4);
        const positions = [ [-width/2 + 0.5, depth/2 - 0.5], [width/2 - 0.5, depth/2 - 0.5], [-width/2 + 0.5, -depth/2 + 0.5], [width/2 - 0.5, -depth/2 + 0.5] ];
        positions.forEach(([x, z]) => {
          const col = new THREE.Mesh(colGeo, materials.scaffolding);
          col.position.set(x, floorHeight/2, z);
          floorGroup.add(col);
        });
      } else if (isUnderConstruction) {
        const wallGeo = new THREE.BoxGeometry(width - 0.2, floorHeight, depth - 0.2);
        const wall = new THREE.Mesh(wallGeo, materials.concrete);
        wall.position.y = floorHeight/2;
        floorGroup.add(wall);
      } else {
        // Modern Window block
        const glassGeo = new THREE.BoxGeometry(width - 0.1, floorHeight - 0.15, depth - 0.1);
        const glass = new THREE.Mesh(glassGeo, materials.glass);
        glass.position.y = floorHeight/2;
        floorGroup.add(glass);
        
        // Warm Wooden accents on corners
        const accentGeo = new THREE.BoxGeometry(1.5, floorHeight - 0.15, 1.5);
        const a1 = new THREE.Mesh(accentGeo, materials.facadeSecondary);
        a1.position.set(-width/2 + 0.75, floorHeight/2, depth/2 - 0.75);
        const a2 = new THREE.Mesh(accentGeo, materials.facadeSecondary);
        a2.position.set(width/2 - 0.75, floorHeight/2, depth/2 - 0.75);
        floorGroup.add(a1, a2);
      }

      group.add(floorGroup);
      currentY += floorHeight;
    }

    // Modern flat roof
    const roofGeo = new THREE.BoxGeometry(width + 0.4, 0.3, depth + 0.4);
    const roof = new THREE.Mesh(roofGeo, materials.facadeDark);
    roof.position.y = currentY + 0.15;
    roof.castShadow = true;
    group.add(roof);
    currentY += 0.3;

    if (bldgObj.status !== 'complete') {
      const craneGroup = new THREE.Group();
      craneGroup.position.set(0, currentY, 0);
      const mast = new THREE.Mesh(new THREE.BoxGeometry(0.6, 6, 0.6), materials.crane);
      mast.position.y = 3;
      mast.castShadow = true;
      const jib = new THREE.Mesh(new THREE.BoxGeometry(10, 0.6, 0.6), materials.crane);
      jib.position.set(3, 6, 0);
      jib.castShadow = true;
      craneGroup.add(mast, jib);
      craneGroup.userData.isCrane = true; 
      group.add(craneGroup);
    }

    bldgObj.totalHeight = currentY + (bldgObj.status !== 'complete' ? 6 : 0);
    scene.add(group);
    createBuildingLabel(bldgObj, group, bldgObj.totalHeight);
  };

  const bldgA = BUILDINGS.find(b => b.id === 'tower_a');
  if (bldgA) createTower(bldgA, 14, 10);

  const bldgB = BUILDINGS.find(b => b.id === 'tower_b');
  if (bldgB) createTower(bldgB, 12, 10);

  const bldgC = BUILDINGS.find(b => b.id === 'tower_c');
  if (bldgC) createTower(bldgC, 14, 8);

  const chData = BUILDINGS.find(b => b.id === 'clubhouse');
  if (chData) {
    const chGroup = new THREE.Group();
    chGroup.position.set(chData.x, chData.y, chData.z);
    
    // Modern Clubhouse with wooden facade
    const bodyGeo = new THREE.BoxGeometry(16, 4, 12);
    const body = new THREE.Mesh(bodyGeo, materials.facadeSecondary);
    body.position.y = 2;
    body.castShadow = true;
    body.receiveShadow = true;
    body.userData = { ...chData, isInteractive: true };
    chGroup.add(body);

    const roofGeo = new THREE.BoxGeometry(17, 0.6, 13);
    const roof = new THREE.Mesh(roofGeo, materials.facadeDark);
    roof.position.y = 4.3;
    roof.castShadow = true;
    chGroup.add(roof);

    scene.add(chGroup);
    createBuildingLabel(chData, chGroup, 5);
  }

  const poolData = BUILDINGS.find(b => b.id === 'pool');
  if (poolData) {
    const pGroup = new THREE.Group();
    pGroup.position.set(poolData.x, poolData.y, poolData.z);

    const deckGeo = new THREE.BoxGeometry(14, 0.2, 10);
    const deck = new THREE.Mesh(deckGeo, materials.facadePrimary);
    deck.position.y = 0.1;
    deck.receiveShadow = true;
    deck.userData = { ...poolData, isInteractive: true };
    pGroup.add(deck);

    const waterGeo = new THREE.PlaneGeometry(12, 8);
    const water = new THREE.Mesh(waterGeo, materials.water);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.21;
    water.userData = { ...poolData, isInteractive: true };
    pGroup.add(water);
    
    scene.userData.waterMesh = water;
    scene.add(pGroup);
    createBuildingLabel(poolData, pGroup, 1);
  }

  // Abundant Trees Generation with Collision Avoidance
  const gGroup = new THREE.Group();
  
  const treeGeo = new THREE.ConeGeometry(0.8, 3, 5);
  const trunkGeo = new THREE.CylinderGeometry(0.2, 0.2, 1);
  
  // Obstacles: {x, z, radius}
  const obstacles = [
    {x: -22, z: -8, r: 9}, // Tower A
    {x: 18, z: -10, r: 8}, // Tower B
    {x: 12, z: 12, r: 8}, // Tower C
    {x: -8, z: 10, r: 10}, // Clubhouse
    {x: 2, z: -8, r: 8}, // Pool
    {x: 0, z: 0, r: 5, isRoad: true, width: 10, length: 100}, // Vertical Road
    {x: -10, z: 0, r: 5, isRoad: true, width: 100, length: 10}, // Horizontal Road 1
    {x: 20, z: 0, r: 5, isRoad: true, width: 100, length: 10} // Horizontal Road 2
  ];

  const treeCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 150;
  
  let placed = 0;
  let attempts = 0;
  
  while (placed < treeCount && attempts < 1000) {
    attempts++;
    const tx = (Math.random() - 0.5) * 100;
    const tz = (Math.random() - 0.5) * 80;
    
    let hit = false;
    for (const obs of obstacles) {
      if (obs.isRoad) {
        if (Math.abs(tx - obs.x) < obs.width/2 && Math.abs(tz - obs.z) < obs.length/2) {
          hit = true; break;
        }
      } else {
        const dist = Math.sqrt(Math.pow(tx - obs.x, 2) + Math.pow(tz - obs.z, 2));
        if (dist < obs.r) {
          hit = true; break;
        }
      }
    }

    if (!hit) {
      const tree = new THREE.Group();
      tree.position.set(tx, 0, tz);
      
      const trunk = new THREE.Mesh(trunkGeo, materials.facadeDark);
      trunk.position.y = 0.5;
      trunk.castShadow = true;
      
      const canopy = new THREE.Mesh(treeGeo, materials.treeCanopy);
      canopy.position.y = 2;
      canopy.castShadow = true;
      
      // Randomize tree scale slightly for realism
      const s = 0.8 + Math.random() * 0.4;
      tree.scale.set(s, s, s);
      
      tree.add(trunk, canopy);
      gGroup.add(tree);
      placed++;
    }
  }

  scene.add(gGroup);

  // Hidden interaction plane for garden/background
  const hitGeo = new THREE.PlaneGeometry(120, 100);
  const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }));
  hitMesh.rotation.x = -Math.PI / 2;
  const gardenData = BUILDINGS.find(b => b.id === 'garden');
  if (gardenData) {
    hitMesh.userData = { ...gardenData, isInteractive: true };
    gGroup.add(hitMesh);
    // Don't add a label for the garden to reduce clutter
  }
}
