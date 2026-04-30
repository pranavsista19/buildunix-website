import * as THREE from 'three';
import { BUILDINGS } from './community.config.js';
import { getMaterials } from './materials.js';
import { createBuildingLabel } from './labels.js';

export function buildCommunity(scene) {
  const materials = getMaterials();

  // Base Plate
  const baseGeo = new THREE.PlaneGeometry(100, 80);
  const basePlate = new THREE.Mesh(baseGeo, materials.basePlate);
  basePlate.rotation.x = -Math.PI / 2;
  basePlate.receiveShadow = true;
  scene.add(basePlate);

  // Helper to create a tower
  const createTower = (bldgObj, width, depth) => {
    const group = new THREE.Group();
    group.position.set(bldgObj.x, bldgObj.y, bldgObj.z);
    
    let currentY = 0;
    const floorHeight = 1.2;

    // Ground Floor
    const gfGeo = new THREE.BoxGeometry(width, floorHeight * 1.5, depth);
    const gf = new THREE.Mesh(gfGeo, materials.facadePrimary);
    gf.position.y = (floorHeight * 1.5) / 2;
    gf.castShadow = true;
    gf.receiveShadow = true;
    // Interactive target
    gf.userData = { ...bldgObj, isInteractive: true };
    group.add(gf);
    currentY += floorHeight * 1.5;

    // Standard Floors
    for (let i = 0; i < bldgObj.floors; i++) {
      const isUnderConstruction = bldgObj.status === 'in_progress' && i > bldgObj.floors - 3;
      const isEarlyStage = bldgObj.status === 'early_stage' && i > bldgObj.floors - 6;

      const floorGroup = new THREE.Group();
      floorGroup.position.y = currentY;

      // Floor slab
      const slabGeo = new THREE.BoxGeometry(width + 0.4, 0.2, depth + 0.4);
      const slab = new THREE.Mesh(slabGeo, materials.facadeSecondary);
      slab.position.y = 0.1;
      slab.castShadow = true;
      slab.receiveShadow = true;
      floorGroup.add(slab);

      if (isEarlyStage) {
        // Scaffolding / Columns only
        const colGeo = new THREE.BoxGeometry(0.4, floorHeight, 0.4);
        const positions = [
          [-width/2 + 0.5, depth/2 - 0.5],
          [width/2 - 0.5, depth/2 - 0.5],
          [-width/2 + 0.5, -depth/2 + 0.5],
          [width/2 - 0.5, -depth/2 + 0.5]
        ];
        positions.forEach(([x, z]) => {
          const col = new THREE.Mesh(colGeo, materials.scaffolding);
          col.position.set(x, floorHeight/2, z);
          floorGroup.add(col);
        });
      } else if (isUnderConstruction) {
        // Partially finished
        const wallGeo = new THREE.BoxGeometry(width - 0.2, floorHeight, depth - 0.2);
        const wall = new THREE.Mesh(wallGeo, materials.concrete);
        wall.position.y = floorHeight/2;
        floorGroup.add(wall);
      } else {
        // Finished Glass
        const glassGeo = new THREE.BoxGeometry(width, floorHeight - 0.2, depth);
        const glass = new THREE.Mesh(glassGeo, materials.glass);
        glass.position.y = floorHeight/2;
        floorGroup.add(glass);
        
        // Mullions
        const mullionGeo = new THREE.BoxGeometry(0.2, floorHeight - 0.2, 0.2);
        const m1 = new THREE.Mesh(mullionGeo, materials.facadeDark);
        m1.position.set(-width/2 + 0.1, floorHeight/2, depth/2 + 0.1);
        const m2 = new THREE.Mesh(mullionGeo, materials.facadeDark);
        m2.position.set(width/2 - 0.1, floorHeight/2, depth/2 + 0.1);
        floorGroup.add(m1, m2);
      }

      group.add(floorGroup);
      currentY += floorHeight;
    }

    // Roof
    const roofGeo = new THREE.BoxGeometry(width + 0.2, 0.5, depth + 0.2);
    const roof = new THREE.Mesh(roofGeo, materials.facadeDark);
    roof.position.y = currentY + 0.25;
    roof.castShadow = true;
    group.add(roof);
    currentY += 0.5;

    // Crane if in progress
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
      // Slowly rotate crane in animation loop
      craneGroup.userData.isCrane = true; 
      group.add(craneGroup);
    }

    bldgObj.totalHeight = currentY + (bldgObj.status !== 'complete' ? 6 : 0);
    scene.add(group);
    
    // Add CSS Label
    createBuildingLabel(bldgObj, group, bldgObj.totalHeight);
    
    return group;
  };

  // Build Towers
  const bldgA = BUILDINGS.find(b => b.id === 'tower_a');
  if (bldgA) createTower(bldgA, 14, 10);

  const bldgB = BUILDINGS.find(b => b.id === 'tower_b');
  if (bldgB) createTower(bldgB, 12, 10);

  const bldgC = BUILDINGS.find(b => b.id === 'tower_c');
  if (bldgC) createTower(bldgC, 14, 8);

  // Build Clubhouse
  const chData = BUILDINGS.find(b => b.id === 'clubhouse');
  if (chData) {
    const chGroup = new THREE.Group();
    chGroup.position.set(chData.x, chData.y, chData.z);
    
    const bodyGeo = new THREE.BoxGeometry(16, 4, 12);
    const body = new THREE.Mesh(bodyGeo, materials.facadePrimary);
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

  // Build Pool
  const poolData = BUILDINGS.find(b => b.id === 'pool');
  if (poolData) {
    const pGroup = new THREE.Group();
    pGroup.position.set(poolData.x, poolData.y, poolData.z);

    const deckGeo = new THREE.BoxGeometry(14, 0.2, 10);
    const deck = new THREE.Mesh(deckGeo, materials.facadeSecondary);
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
    
    // Save reference for animation
    scene.userData.waterMesh = water;

    scene.add(pGroup);
    createBuildingLabel(poolData, pGroup, 1);
  }

  // Build Garden / Landscaping
  const gardenData = BUILDINGS.find(b => b.id === 'garden');
  if (gardenData) {
    const gGroup = new THREE.Group();
    gGroup.position.set(gardenData.x, gardenData.y, gardenData.z);

    // Invisible interactive plane covering the area
    const hitGeo = new THREE.PlaneGeometry(30, 20);
    const hitMesh = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }));
    hitMesh.rotation.x = -Math.PI / 2;
    hitMesh.userData = { ...gardenData, isInteractive: true };
    gGroup.add(hitMesh);

    // Generate some simple trees
    const treeGeo = new THREE.ConeGeometry(0.8, 3, 5);
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.2, 1);
    
    const treeCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 25;
    
    for (let i = 0; i < treeCount; i++) {
      const x = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 15;
      // Keep away from center roads
      if (Math.abs(x) < 5 || Math.abs(z) < 4) continue;

      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      
      const trunk = new THREE.Mesh(trunkGeo, materials.facadeDark);
      trunk.position.y = 0.5;
      trunk.castShadow = true;
      
      const canopy = new THREE.Mesh(treeGeo, materials.treeCanopy);
      canopy.position.y = 2;
      canopy.castShadow = true;
      
      tree.add(trunk, canopy);
      gGroup.add(tree);
    }

    scene.add(gGroup);
    createBuildingLabel(gardenData, gGroup, 3);
  }
}
