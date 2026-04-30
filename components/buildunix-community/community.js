import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
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

  // Main Roads - Extended to plot ends (120x100)
  createRoad(8, 100, 0, 0, 0); // Vertical spine (covers full z=-50 to 50)
  createRoad(8, 120, 0, 0, Math.PI / 2); // Horizontal cross (covers full x=-60 to 60)

  // Helper for Streetlights
  const createStreetlight = (x, z, rotY = 0) => {
    const lightGroup = new THREE.Group();
    lightGroup.position.set(x, 0, z);
    lightGroup.rotation.y = rotY;

    // Pole
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 6), materials.streetLight);
    pole.position.y = 3;
    pole.castShadow = true;
    lightGroup.add(pole);

    // Arm
    const arm = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 0.2), materials.streetLight);
    arm.position.set(0.8, 6, 0);
    lightGroup.add(arm);

    // Light head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 0.6), materials.facadeDark);
    head.position.set(1.6, 6, 0);
    lightGroup.add(head);

    // Point light (subtle)
    const pLight = new THREE.PointLight(0xFFFFFF, 0.5, 10);
    pLight.position.set(1.6, 5.8, 0);
    lightGroup.add(pLight);

    scene.add(lightGroup);
  };

  // Place streetlights along the roads
  for (let z = -45; z <= 45; z += 15) {
    if (Math.abs(z) < 8) continue; // Skip intersection
    createStreetlight(5, z, 0);
    createStreetlight(-5, z, Math.PI);
  }
  for (let x = -55; x <= 55; x += 15) {
    if (Math.abs(x) < 8) continue; // Skip intersection
    createStreetlight(x, 5, -Math.PI / 2);
    createStreetlight(x, -5, Math.PI / 2);
  }

  // --- SPORTS ZONE (Row along X at z=38) ---
  const sportsZoneX = -44; 
  const sportsZoneZ = 38;

  // COURT 1 — BASKETBALL COURT
  const basketballGroup = new THREE.Group();
  basketballGroup.position.set(sportsZoneX, 0, sportsZoneZ);

  const bbBaseGeo = new THREE.PlaneGeometry(28, 15);
  const bbBaseMat = new THREE.MeshStandardMaterial({ color: 0x4A7EC7, roughness: 0.8, metalness: 0.0 });
  const bbBase = new THREE.Mesh(bbBaseGeo, bbBaseMat);
  bbBase.rotation.x = -Math.PI / 2; bbBase.position.y = 0.02; bbBase.receiveShadow = true;
  bbBase.userData = {
    buildingId: 'basketball_court', buildingName: 'Basketball Court', currentPhase: 14, status: 'complete',
    description: 'Full-size basketball court with covered bleachers. Phase 14 complete — all QC snags closed.',
    isInteractive: true
  };
  basketballGroup.add(bbBase);

  const bbRunoff = new THREE.Mesh(new THREE.PlaneGeometry(32, 19), new THREE.MeshStandardMaterial({ color: 0x5A8ED4, roughness: 0.9 }));
  bbRunoff.rotation.x = -Math.PI / 2; bbRunoff.position.y = 0.01; bbRunoff.receiveShadow = true; bbRunoff.userData.isDecoration = true;
  basketballGroup.add(bbRunoff);

  const keyMat = new THREE.MeshStandardMaterial({ color: 0xC0392B, roughness: 0.8 });
  [-11.1, 11.1].forEach(x => {
    const key = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.01, 4.9), keyMat); key.position.set(x, 0.015, 0); key.userData.isDecoration = true;
    basketballGroup.add(key);
  });

  const lineMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.5 });
  const bbLines = [
    { g: [28, 0.01, 0.08], p: [0, 0.025, 7.46] }, { g: [28, 0.01, 0.08], p: [0, 0.025, -7.46] },
    { g: [0.08, 0.01, 15], p: [14, 0.025, 0] }, { g: [0.08, 0.01, 15], p: [-14, 0.025, 0] },
    { g: [0.08, 0.01, 15], p: [0, 0.025, 0] }
  ];
  bbLines.forEach(l => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...l.g), lineMat); mesh.position.set(...l.p); mesh.userData.isDecoration = true; basketballGroup.add(mesh);
  });

  const cCircle = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 8, 32), lineMat);
  cCircle.rotation.x = -Math.PI / 2; cCircle.position.y = 0.025; cCircle.userData.isDecoration = true; basketballGroup.add(cCircle);

  [-8.325, 8.325].forEach(x => {
    const ftc = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 8, 16), lineMat);
    ftc.rotation.x = -Math.PI / 2; ftc.position.set(x, 0.025, 0); ftc.userData.isDecoration = true; basketballGroup.add(ftc);
    [-2.45, 2.45].forEach(z => {
      const ftl = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.01, 0.08), lineMat); ftl.position.set(x, 0.025, z); ftl.userData.isDecoration = true; basketballGroup.add(ftl);
    });
  });

  const poleMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A });
  const bbBoardMat = new THREE.MeshPhysicalMaterial({ color: 0xAADDFF, opacity: 0.55, transparent: true });
  [-13, 13].forEach(x => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.05), poleMat); p.position.set(x, 1.525, 0); p.userData.isDecoration = true; basketballGroup.add(p);
    const b = new THREE.Mesh(new THREE.BoxGeometry(1.83, 1.07, 0.05), bbBoardMat); b.position.set(x > 0 ? x-0.1 : x+0.1, 3.05, 0); b.rotation.y = Math.PI/2; b.userData.isDecoration = true; basketballGroup.add(b);
    const r = new THREE.Mesh(new THREE.TorusGeometry(0.225, 0.02, 8, 16), new THREE.MeshStandardMaterial({ color: 0xE8690A })); r.rotation.x = -Math.PI/2; r.position.set(x > 0 ? x-0.4 : x+0.4, 3.05, 0); r.userData.isDecoration = true; basketballGroup.add(r);
  });

  const seatMat = new THREE.MeshStandardMaterial({ color: 0xA8C4E0, roughness: 0.6 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2A3A4A });
  [-7, 7].forEach(xOff => {
    [-9.5, 9.5].forEach(zOff => {
      const f = new THREE.Mesh(new THREE.BoxGeometry(7, 1.5, 1.5), frameMat); f.position.set(xOff, 0.75, zOff); f.userData.isDecoration = true; basketballGroup.add(f);
      for (let s=0; s<5; s++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(7, 0.28, 0.35), seatMat);
        step.position.set(xOff, 0.3*(s+1), zOff > 0 ? zOff + 0.35*s : zOff - 0.35*s);
        step.userData.isDecoration = true; basketballGroup.add(step);
      }
    });
  });
  scene.add(basketballGroup);

  // COURT 2 — FUTSAL COURT
  const futsalGroup = new THREE.Group();
  futsalGroup.position.set(sportsZoneX + 36, 0, sportsZoneZ);

  const fbBaseGeo = new THREE.PlaneGeometry(40, 20);
  const fbBaseMat = new THREE.MeshStandardMaterial({ color: 0x2ECC71, roughness: 1.0, metalness: 0.0 });
  const fbBase = new THREE.Mesh(fbBaseGeo, fbBaseMat);
  fbBase.rotation.x = -Math.PI / 2; fbBase.position.y = 0.02; fbBase.receiveShadow = true;
  fbBase.userData = {
    buildingId: 'football_court', buildingName: 'Football / Futsal Court', currentPhase: 14, status: 'complete',
    description: 'Floodlit futsal court with perimeter fencing. Fully handed over. Zero open snags.',
    isInteractive: true
  };
  futsalGroup.add(fbBase);

  const fbRunoff = new THREE.Mesh(new THREE.PlaneGeometry(44, 24), new THREE.MeshStandardMaterial({ color: 0xE74C3C }));
  fbRunoff.rotation.x = -Math.PI / 2; fbRunoff.position.y = 0.01; fbRunoff.receiveShadow = true; fbRunoff.userData.isDecoration = true;
  futsalGroup.add(fbRunoff);

  const fbLines = [
    { g: [40, 0.01, 0.07], p: [0, 0.025, 10] }, { g: [40, 0.01, 0.07], p: [0, 0.025, -10] },
    { g: [0.07, 0.01, 20], p: [20, 0.025, 0] }, { g: [0.07, 0.01, 20], p: [-20, 0.025, 0] },
    { g: [0.07, 0.01, 20], p: [0, 0.025, 0] }
  ];
  fbLines.forEach(l => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...l.g), lineMat); mesh.position.set(...l.p); mesh.userData.isDecoration = true; futsalGroup.add(mesh);
  });

  const fbCircle = new THREE.Mesh(new THREE.TorusGeometry(3, 0.06, 8, 32), lineMat); fbCircle.rotation.x = -Math.PI / 2; fbCircle.position.y = 0.025; fbCircle.userData.isDecoration = true; futsalGroup.add(fbCircle);
  [-15, 15].forEach(x => {
    const g1 = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.01, 5), lineMat); g1.position.set(x, 0.025, 0); g1.userData.isDecoration = true; futsalGroup.add(g1);
    const g2 = new THREE.Mesh(new THREE.BoxGeometry(5, 0.01, 0.07), lineMat); g2.position.set(x>0?x-2.5:x+2.5, 0.025, 2.5); g2.userData.isDecoration = true; futsalGroup.add(g2);
    const g3 = new THREE.Mesh(new THREE.BoxGeometry(5, 0.01, 0.07), lineMat); g3.position.set(x>0?x-2.5:x+2.5, 0.025, -2.5); g3.userData.isDecoration = true; futsalGroup.add(g3);
  });
  [-12, 12].forEach(x => {
    const spot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 4), lineMat); spot.scale.y = 0.05; spot.position.set(x, 0.025, 0); spot.userData.isDecoration = true; futsalGroup.add(spot);
  });

  for (let x = -22; x <= 22; x += 2) {
    [-12, 12].forEach(z => { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 4), postMat); p.position.set(x, 2, z); p.userData.isDecoration = true; futsalGroup.add(p); });
  }
  for (let z = -12; z <= 12; z += 2) {
    [-22, 22].forEach(x => { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 4), postMat); p.position.set(x, 2, z); p.userData.isDecoration = true; futsalGroup.add(p); });
  }

  const floodPoleGeo = new THREE.CylinderGeometry(0.06, 0.06, 8);
  const floodHeadGeo = new THREE.BoxGeometry(0.4, 0.15, 0.3);
  const floodHeadMat = new THREE.MeshStandardMaterial({ color: 0xE8E8E8, emissive: 0xFFFFCC, emissiveIntensity: 0.4 });
  [ [-22, -12], [22, -12], [-22, 12], [22, 12], [0, -12], [0, 12] ].forEach(([x, z]) => {
    const p = new THREE.Mesh(floodPoleGeo, poleMat); p.position.set(x, 4, z); p.userData.isDecoration = true; futsalGroup.add(p);
    const h = new THREE.Mesh(floodHeadGeo, floodHeadMat); h.position.set(x, 8, z); h.rotation.x = z > 0 ? 0.5 : -0.5; h.userData.isDecoration = true; futsalGroup.add(h);
  });

  [-20, 20].forEach(x => {
    [-1.5, 1.5].forEach(z => { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2), lineMat); p.position.set(x, 1, z); p.userData.isDecoration = true; futsalGroup.add(p); });
    const c = new THREE.Mesh(new THREE.BoxGeometry(3, 0.05, 0.05), lineMat); c.position.set(x, 2, 0); c.rotation.y = Math.PI/2; c.userData.isDecoration = true; futsalGroup.add(c);
    const n = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2, 3), netMat); n.position.set(x>0?x+0.75:x-0.75, 1, 0); n.userData.isDecoration = true; futsalGroup.add(n);
  });
  scene.add(futsalGroup);

  // COURT 3 — TENNIS COURT
  const tennisGroup = new THREE.Group();
  tennisGroup.position.set(sportsZoneX + 72, 0, sportsZoneZ);

  const woodBase = new THREE.Mesh(new THREE.PlaneGeometry(28, 14), new THREE.MeshStandardMaterial({ color: 0x8B5E3C, roughness: 0.7, metalness: 0.05 }));
  woodBase.rotation.x = -Math.PI / 2; woodBase.position.y = 0.02; woodBase.receiveShadow = true; woodBase.userData.isDecoration = true; tennisGroup.add(woodBase);
  for (let z = -6; z <= 6; z += 2.4) {
    const g = new THREE.Mesh(new THREE.BoxGeometry(28, 0.005, 0.015), grainMat); g.position.set(0, 0.025, z); g.userData.isDecoration = true; tennisGroup.add(g);
  }

  const tnSurface = new THREE.Mesh(new THREE.PlaneGeometry(23.77, 10.97), new THREE.MeshStandardMaterial({ color: 0x1B7A2E, roughness: 0.85 }));
  tnSurface.rotation.x = -Math.PI / 2; tnSurface.position.y = 0.03; tnSurface.receiveShadow = true;
  tnSurface.userData = {
    buildingId: 'tennis_court', buildingName: 'Tennis Court', currentPhase: 14, status: 'complete',
    description: 'Hardcourt tennis surface with timber surround. Amenity QC complete. Ready for handover.',
    isInteractive: true
  };
  tennisGroup.add(tnSurface);

  const tnLines = [
    { g: [23.77, 0.005, 0.05], p: [0, 0.035, 5.485] }, { g: [23.77, 0.005, 0.05], p: [0, 0.035, -5.485] },
    { g: [23.77, 0.005, 0.05], p: [0, 0.035, 4.115] }, { g: [23.77, 0.005, 0.05], p: [0, 0.035, -4.115] },
    { g: [0.05, 0.005, 10.97], p: [11.885, 0.035, 0] }, { g: [0.05, 0.005, 10.97], p: [-11.885, 0.035, 0] },
    { g: [6.4, 0.005, 0.05], p: [3.2, 0.035, 3.2] }, { g: [6.4, 0.005, 0.05], p: [-3.2, 0.035, 3.2] },
    { g: [6.4, 0.005, 0.05], p: [3.2, 0.035, -3.2] }, { g: [6.4, 0.005, 0.05], p: [-3.2, 0.035, -3.2] },
    { g: [0.05, 0.005, 6.4], p: [0, 0.035, 0] },
    { g: [0.05, 0.005, 0.2], p: [11.885, 0.035, 0] }, { g: [0.05, 0.005, 0.2], p: [-11.885, 0.035, 0] }
  ];
  tnLines.forEach(l => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...l.g), lineMat); mesh.position.set(...l.p); mesh.userData.isDecoration = true; tennisGroup.add(mesh);
  });

  [-5.485, 5.485].forEach(z => { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.07), poleMat); p.position.set(0, 0.535, z); p.userData.isDecoration = true; tennisGroup.add(p); });
  const cable = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 10.97), new THREE.MeshStandardMaterial({ color: 0xC0C0C0 })); cable.position.y = 1.07; cable.userData.isDecoration = true; tennisGroup.add(cable);
  const net = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.91, 10.97), new THREE.MeshStandardMaterial({ color: 0x1A1A1A, opacity: 0.35, transparent: true, wireframe: true })); net.position.y = 0.455; net.userData.isDecoration = true; tennisGroup.add(net);
  scene.add(tennisGroup);

  // Sports Zone Label
  const sportsDiv = document.createElement('div');
  sportsDiv.className = 'community-label';
  sportsDiv.innerHTML = `<span class="label-dot status-complete"></span><span class="label-name">Sports & Recreation</span><span class="label-phase">Phase 14/14</span>`;
  const sportsLabel = new CSS2DObject(sportsDiv);
  sportsLabel.position.set(sportsZoneX + 36, 6, sportsZoneZ);
  scene.add(sportsLabel);

  console.log('Sports zone added: basketball, futsal, tennis courts');

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
      const isUnderConstruction = bldgObj.status === 'in_progress' && i >= bldgObj.floors - 3;
      const isEarlyStage = bldgObj.status === 'early_stage' && i >= bldgObj.floors - 6;

      let phaseName = 'Finishing & Handover';
      let floorStatus = 'complete';
      let floorPhaseNum = 8;
      
      if (isEarlyStage) {
        phaseName = 'RCC Framework';
        floorStatus = 'early_stage';
        floorPhaseNum = 2;
      } else if (isUnderConstruction) {
        phaseName = 'Brickwork & Masonry';
        floorStatus = 'in_progress';
        floorPhaseNum = 3;
      } else if (i >= bldgObj.floors - 6 && bldgObj.status !== 'complete') {
        phaseName = 'Plastering & MEP';
        floorStatus = 'in_progress';
        floorPhaseNum = 5;
      }

      const floorData = {
        ...bldgObj,
        name: `${bldgObj.name} — Floor ${i + 1}`,
        currentPhase: floorPhaseNum,
        status: floorStatus,
        phaseName: phaseName,
        isInteractive: true
      };

      const floorGroup = new THREE.Group();
      floorGroup.position.y = currentY;

      // Clean white slab
      const slabGeo = new THREE.BoxGeometry(width + 0.4, 0.15, depth + 0.4);
      const slab = new THREE.Mesh(slabGeo, materials.facadePrimary);
      slab.position.y = 0.075;
      slab.castShadow = true;
      slab.receiveShadow = true;
      slab.userData = floorData;
      floorGroup.add(slab);

      if (isEarlyStage) {
        const colGeo = new THREE.BoxGeometry(0.4, floorHeight, 0.4);
        const positions = [ [-width/2 + 0.5, depth/2 - 0.5], [width/2 - 0.5, depth/2 - 0.5], [-width/2 + 0.5, -depth/2 + 0.5], [width/2 - 0.5, -depth/2 + 0.5] ];
        positions.forEach(([x, z]) => {
          const col = new THREE.Mesh(colGeo, materials.scaffolding);
          col.position.set(x, floorHeight/2, z);
          col.userData = floorData;
          floorGroup.add(col);
        });
      } else if (isUnderConstruction) {
        const wallGeo = new THREE.BoxGeometry(width - 0.2, floorHeight, depth - 0.2);
        const wall = new THREE.Mesh(wallGeo, materials.concrete);
        wall.position.y = floorHeight/2;
        wall.userData = floorData;
        floorGroup.add(wall);
      } else {
        // Modern Window block with increased reflections
        const glassGeo = new THREE.BoxGeometry(width - 0.1, floorHeight - 0.15, depth - 0.1);
        const glass = new THREE.Mesh(glassGeo, materials.glass);
        glass.position.y = floorHeight/2;
        glass.userData = floorData;
        floorGroup.add(glass);
        
        // Warm Wooden accents on corners
        const accentGeo = new THREE.BoxGeometry(1.5, floorHeight - 0.15, 1.5);
        const a1 = new THREE.Mesh(accentGeo, materials.facadeSecondary);
        a1.position.set(-width/2 + 0.75, floorHeight/2, depth/2 - 0.75);
        a1.userData = floorData;
        const a2 = new THREE.Mesh(accentGeo, materials.facadeSecondary);
        a2.position.set(width/2 - 0.75, floorHeight/2, depth/2 - 0.75);
        a2.userData = floorData;
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
    {x: -24, z: -18, r: 10}, // Tower A
    {x: 20, z: -18, r: 10}, // Tower B
    {x: -24, z: 18, r: 10}, // Tower C
    {x: 20, z: 18, r: 12}, // Clubhouse
    {x: -10, z: -18, r: 10}, // Pool
    {x: 0, z: 0, r: 6, isRoad: true, width: 10, length: 110}, // Vertical Road
    {x: 0, z: 0, r: 6, isRoad: true, width: 130, length: 10}, // Horizontal Road
    {x: 45, z: 25, r: 18}, // Basketball
    {x: 45, z: -25, r: 25}, // Football
    {x: -45, z: 25, r: 18}, // Tennis
    {x: -45, z: -28, r: 15} // Badminton
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
