import * as THREE from 'three';
import { BUILDINGS } from './community.config.js';
import { getMaterials } from './materials.js';
import { createBuildingLabel } from './labels.js';

export function buildCommunity(scene) {
  const materials = getMaterials();

  // Base Plate
  const baseGeo = new THREE.PlaneGeometry(80, 60);
  const basePlate = new THREE.Mesh(baseGeo, materials.basePlate);
  basePlate.rotation.x = -Math.PI / 2;
  basePlate.receiveShadow = true;
  scene.add(basePlate);

  // Roads/Paths
  const roadGeo = new THREE.PlaneGeometry(80, 8);
  const road = new THREE.Mesh(roadGeo, materials.concrete);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.05, 20);
  road.receiveShadow = true;
  scene.add(road);

  const road2 = new THREE.Mesh(new THREE.PlaneGeometry(8, 60), materials.concrete);
  road2.rotation.x = -Math.PI / 2;
  road2.position.set(-8, 0.05, 0);
  road2.receiveShadow = true;
  scene.add(road2);

  const bldgA = BUILDINGS.find(b => b.id === 'tower_a');
  const bldgB = BUILDINGS.find(b => b.id === 'tower_b');
  const bldgC = BUILDINGS.find(b => b.id === 'tower_c');
  const clubhouse = BUILDINGS.find(b => b.id === 'clubhouse');
  const pool = BUILDINGS.find(b => b.id === 'pool');
  const garden = BUILDINGS.find(b => b.id === 'garden');

  const addStructuralDetails = (group, bldg, floorY, w, d, fH) => {
    // Vertical mullions on glass
    const mullionGeo = new THREE.BoxGeometry(0.05, fH - 0.2, 0.1);
    for (let x = -w/2 + 2; x <= w/2 - 2; x += 2.5) {
      const mF = new THREE.Mesh(mullionGeo, materials.facadeSecondary);
      mF.position.set(x, floorY + (fH/2), d/2 + 0.05);
      mF.userData = { ...bldg };
      group.add(mF);
      
      const mB = new THREE.Mesh(mullionGeo, materials.facadeSecondary);
      mB.position.set(x, floorY + (fH/2), -d/2 - 0.05);
      mB.userData = { ...bldg };
      group.add(mB);
    }
    
    for (let z = -d/2 + 2; z <= d/2 - 2; z += 2.5) {
      const mL = new THREE.Mesh(new THREE.BoxGeometry(0.1, fH - 0.2, 0.05), materials.facadeSecondary);
      mL.position.set(-w/2 - 0.05, floorY + (fH/2), z);
      mL.userData = { ...bldg };
      group.add(mL);
      
      const mR = new THREE.Mesh(new THREE.BoxGeometry(0.1, fH - 0.2, 0.05), materials.facadeSecondary);
      mR.position.set(w/2 + 0.05, floorY + (fH/2), z);
      mR.userData = { ...bldg };
      group.add(mR);
    }
  };

  // Tower A
  if (bldgA) {
    const groupA = new THREE.Group();
    groupA.position.set(bldgA.x, bldgA.y, bldgA.z);
    scene.add(groupA);
    let currentY = 0;
    const w = 14;
    const d = 10;
    const fH = 1.2;

    // GF
    const gfGeo = new THREE.BoxGeometry(w - 1, fH * 1.5, d - 1);
    const gf = new THREE.Mesh(gfGeo, materials.facadePrimary);
    gf.position.y = (fH * 1.5) / 2;
    gf.userData = { ...bldgA };
    gf.castShadow = true;
    gf.receiveShadow = true;
    groupA.add(gf);
    currentY += fH * 1.5;

    for (let i = 0; i < 8; i++) {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.3, d + 0.2), materials.facadeSecondary);
      slab.position.y = currentY + 0.15;
      slab.userData = { ...bldgA };
      slab.castShadow = true;
      slab.receiveShadow = true;
      groupA.add(slab);

      const glass = new THREE.Mesh(new THREE.BoxGeometry(w, fH - 0.3, d), materials.glass);
      glass.position.y = currentY + 0.15 + (fH - 0.3) / 2;
      glass.userData = { ...bldgA };
      groupA.add(glass);

      addStructuralDetails(groupA, bldgA, currentY + 0.15, w, d, fH - 0.15);

      if (i % 2 === 0) {
        const balcony = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 2), materials.facadeSecondary);
        balcony.position.set(-w/2 + 3, currentY + 0.15, d/2 + 1);
        balcony.userData = { ...bldgA };
        groupA.add(balcony);
        
        const bGlass = new THREE.Mesh(new THREE.BoxGeometry(4, 0.6, 0.05), materials.glass);
        bGlass.position.set(-w/2 + 3, currentY + 0.45, d/2 + 2);
        bGlass.userData = { ...bldgA };
        groupA.add(bGlass);
      }
      currentY += fH;
    }

    const pent = new THREE.Mesh(new THREE.BoxGeometry(w - 1, 1.5, d - 1), materials.facadeSecondary);
    pent.position.y = currentY + 0.75;
    pent.userData = { ...bldgA };
    pent.castShadow = true;
    groupA.add(pent);

    bldgA.totalHeight = currentY + 1.5;
    createBuildingLabel(bldgA, groupA, bldgA.totalHeight);
  }

  // Tower B
  if (bldgB) {
    const groupB = new THREE.Group();
    groupB.position.set(bldgB.x, bldgB.y, bldgB.z);
    scene.add(groupB);
    let currentY = 0;
    const w = 12;
    const d = 10;
    const fH = 1.2;

    const gfGeo = new THREE.BoxGeometry(w - 1, fH * 1.5, d - 1);
    const gf = new THREE.Mesh(gfGeo, materials.facadePrimary);
    gf.position.y = (fH * 1.5) / 2;
    gf.userData = { ...bldgB };
    gf.castShadow = true;
    gf.receiveShadow = true;
    groupB.add(gf);
    currentY += fH * 1.5;

    for (let i = 0; i < 8; i++) {
      const isClad = i < 5;
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.3, d + 0.2), isClad ? materials.facadeSecondary : new THREE.MeshStandardMaterial({color: 0x808080}));
      slab.position.y = currentY + 0.15;
      slab.userData = { ...bldgB };
      slab.castShadow = true;
      groupB.add(slab);

      if (isClad) {
        const glass = new THREE.Mesh(new THREE.BoxGeometry(w, fH - 0.3, d), materials.glass);
        glass.position.y = currentY + 0.15 + (fH - 0.3) / 2;
        glass.userData = { ...bldgB };
        groupB.add(glass);
        addStructuralDetails(groupB, bldgB, currentY + 0.15, w, d, fH - 0.15);
      }
      currentY += fH;
    }

    const craneGroup = new THREE.Group();
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 35), materials.crane);
    mast.position.set(-w/2 - 2, 17.5, 0);
    mast.userData = { ...bldgB };
    mast.castShadow = true;
    craneGroup.add(mast);

    const jib = new THREE.Mesh(new THREE.BoxGeometry(25, 0.3, 0.3), materials.crane);
    jib.position.set(6, 34, 0);
    jib.userData = { ...bldgB };
    jib.castShadow = true;
    craneGroup.add(jib);
    groupB.add(craneGroup);

    bldgB.totalHeight = currentY;
    createBuildingLabel(bldgB, groupB, bldgB.totalHeight + 1);
  }

  // Tower C
  if (bldgC) {
    const groupC = new THREE.Group();
    groupC.position.set(bldgC.x, bldgC.y, bldgC.z);
    scene.add(groupC);
    let currentY = 0;
    const w = 14;
    const d = 8;
    const fH = 1.2;

    const gfGeo = new THREE.BoxGeometry(w - 1, fH * 1.5, d - 1);
    const gf = new THREE.Mesh(gfGeo, materials.facadePrimary);
    gf.position.y = (fH * 1.5) / 2;
    gf.userData = { ...bldgC };
    gf.castShadow = true;
    gf.receiveShadow = true;
    groupC.add(gf);
    currentY += fH * 1.5;

    for (let i = 0; i < 8; i++) {
      const isClad = i < 3;
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.3, d + 0.2), isClad ? materials.facadeSecondary : new THREE.MeshStandardMaterial({color: 0x707070}));
      slab.position.y = currentY + 0.15;
      slab.userData = { ...bldgC };
      groupC.add(slab);

      if (isClad) {
        const glass = new THREE.Mesh(new THREE.BoxGeometry(w, fH - 0.3, d), materials.glass);
        glass.position.y = currentY + 0.15 + (fH - 0.3) / 2;
        glass.userData = { ...bldgC };
        groupC.add(glass);
        addStructuralDetails(groupC, bldgC, currentY + 0.15, w, d, fH - 0.15);
      } else {
        const cols = [[-w/2+1, d/2-1], [w/2-1, d/2-1], [-w/2+1, -d/2+1], [w/2-1, -d/2+1], [0, d/2-1], [0, -d/2+1]];
        cols.forEach(([x, z]) => {
          const col = new THREE.Mesh(new THREE.BoxGeometry(0.4, fH - 0.2, 0.4), new THREE.MeshStandardMaterial({color: 0x3a3a3a}));
          col.position.set(x, currentY + 0.15 + (fH - 0.3)/2, z);
          col.userData = { ...bldgC };
          groupC.add(col);
        });
      }
      currentY += fH;
    }

    bldgC.totalHeight = currentY;
    createBuildingLabel(bldgC, groupC, bldgC.totalHeight);
  }

  // Clubhouse
  if (clubhouse) {
    const groupCH = new THREE.Group();
    groupCH.position.set(clubhouse.x, clubhouse.y, clubhouse.z);
    scene.add(groupCH);

    const body = new THREE.Mesh(new THREE.BoxGeometry(18, 4, 12), materials.facadeDark); // Now wood/brown
    body.position.y = 2;
    body.userData = { ...clubhouse };
    body.castShadow = true;
    body.receiveShadow = true;
    groupCH.add(body);

    const glassBody = new THREE.Mesh(new THREE.BoxGeometry(17.8, 3.8, 0.2), materials.glass);
    glassBody.position.set(0, 2, 6.0);
    glassBody.userData = { ...clubhouse };
    groupCH.add(glassBody);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(18.4, 0.4, 12.4), materials.facadeDark);
    roof.position.y = 4.2;
    roof.userData = { ...clubhouse };
    roof.castShadow = true;
    groupCH.add(roof);

    clubhouse.totalHeight = 4.4;
    createBuildingLabel(clubhouse, groupCH, clubhouse.totalHeight);
  }

  // Pool
  if (pool) {
    const groupPool = new THREE.Group();
    groupPool.position.set(pool.x, pool.y, pool.z);
    scene.add(groupPool);

    const deck = new THREE.Mesh(new THREE.PlaneGeometry(18, 12), new THREE.MeshStandardMaterial({color: 0xc8bdb0}));
    deck.rotation.x = -Math.PI / 2;
    deck.userData = { ...pool };
    deck.receiveShadow = true;
    groupPool.add(deck);

    const shell = new THREE.Mesh(new THREE.BoxGeometry(14, 0.8, 8), new THREE.MeshStandardMaterial({color: 0x1a2a3a}));
    shell.position.y = -0.39;
    shell.userData = { ...pool };
    groupPool.add(shell);

    const water = new THREE.Mesh(new THREE.PlaneGeometry(13.6, 7.6), materials.water);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.25;
    water.userData = { ...pool };
    groupPool.add(water);

    scene.userData.waterMesh = water;

    for(let i=0; i<6; i++) {
      const lounger = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 2.2), new THREE.MeshStandardMaterial({color: 0xe8e0d0}));
      lounger.position.set(-5 + i * 2, 0.1, -4.8);
      lounger.userData = { ...pool };
      lounger.castShadow = true;
      groupPool.add(lounger);
    }
    createBuildingLabel(pool, groupPool, 0.5);
  }

  // Garden
  if (garden) {
    const groupGarden = new THREE.Group();
    scene.add(groupGarden);

    const gardenHit = new THREE.Mesh(new THREE.PlaneGeometry(80, 60), new THREE.MeshBasicMaterial({visible: false}));
    gardenHit.rotation.x = -Math.PI / 2;
    gardenHit.position.y = 0.01;
    gardenHit.userData = { ...garden };
    groupGarden.add(gardenHit);

    const createTree = (scale) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 2), new THREE.MeshStandardMaterial({color: 0x4a3020}));
      trunk.position.y = 1;
      tree.add(trunk);

      const leafMat = materials.treeCanopy;
      for (let i = 0; i < 3; i++) {
        const leaf = new THREE.Mesh(new THREE.DodecahedronGeometry(1.5 - i * 0.3), leafMat);
        leaf.position.y = 2.5 + i * 0.8;
        leaf.rotation.y = Math.random() * Math.PI;
        tree.add(leaf);
      }
      tree.scale.set(scale, scale, scale);
      return tree;
    };

    const treeCount = window.innerWidth < 768 ? 10 : 25;
    for(let i = 0; i < treeCount; i++) {
      const x = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 50;
      
      if (Math.abs(x - (-22)) < 9 && Math.abs(z - (-8)) < 6) continue;
      if (Math.abs(x - 18) < 7 && Math.abs(z - (-10)) < 6) continue;
      if (Math.abs(x - 12) < 8 && Math.abs(z - 12) < 5) continue;
      if (Math.abs(x - (-8)) < 10 && Math.abs(z - 10) < 7) continue;
      if (Math.abs(x - 2) < 10 && Math.abs(z - (-8)) < 7) continue;

      const tree = createTree(0.6 + Math.random() * 0.4);
      tree.position.set(x, 0, z);
      groupGarden.add(tree);
    }
    createBuildingLabel(garden, groupGarden, 3);
  }
}
