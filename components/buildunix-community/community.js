import * as THREE from 'three';
import { BUILDINGS } from './community.config.js';
import { getMaterials } from './materials.js';
import { createBuildingLabel } from './labels.js';

export function buildCommunity(scene) {
  const materials = getMaterials();

  // ─── Base Landscape ──────────────────────────────────────────────────────────
  
  // Base Plate (Grass/Land)
  const baseGeo = new THREE.PlaneGeometry(120, 100);
  const basePlate = new THREE.Mesh(baseGeo, materials.basePlate);
  basePlate.rotation.x = -Math.PI / 2;
  basePlate.receiveShadow = true;
  scene.add(basePlate);

  // Integrated Roads (Ref Image 2)
  const createRoad = (width, height, x, z, rotY = 0) => {
    const road = new THREE.Mesh(new THREE.PlaneGeometry(width, height), materials.concrete);
    road.rotation.x = -Math.PI / 2;
    road.rotation.z = rotY;
    road.position.set(x, 0.02, z);
    road.receiveShadow = true;
    scene.add(road);
    
    // Subtle road markings
    const dashContainer = new THREE.Group();
    const dashGeo = new THREE.PlaneGeometry(2, 0.15);
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.15, transparent: true });
    
    for (let i = -width/2 + 2; i < width/2 - 2; i += 6) {
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.position.set(i, 0.03, 0);
      dashContainer.add(dash);
    }
    dashContainer.rotation.x = -Math.PI / 2;
    dashContainer.rotation.z = rotY;
    dashContainer.position.set(x, 0, z);
    scene.add(dashContainer);
  };

  createRoad(120, 8, 0, 20); // Main spine
  createRoad(8, 80, -10, 0); // Side road
  createRoad(8, 80, 25, 0); // Side road

  // ─── Building Helper ────────────────────────────────────────────────────────

  const addFloor = (group, bldg, floorIndex, y, w, d, height, isUnderConstruction = false) => {
    const floorGroup = new THREE.Group();
    floorGroup.position.y = y;
    
    // Slab
    const slabGeo = new THREE.BoxGeometry(w + 0.2, 0.15, d + 0.2);
    const slab = new THREE.Mesh(slabGeo, materials.facadeSecondary);
    slab.position.y = 0.075;
    slab.castShadow = true;
    slab.receiveShadow = true;
    floorGroup.add(slab);

    // Glass / Walls
    if (!isUnderConstruction) {
      const glassGeo = new THREE.BoxGeometry(w - 0.1, height - 0.15, d - 0.1);
      const glass = new THREE.Mesh(glassGeo, materials.glass);
      glass.position.y = (height - 0.15) / 2 + 0.15;
      
      glass.userData = { 
        ...bldg, 
        type: 'floor', 
        floorIndex, 
        isInteractive: true,
        phase: bldg.phases ? bldg.phases[floorIndex % bldg.phases.length] : 'Plastering & Internal'
      };
      floorGroup.add(glass);
      
      // Structural Mullions
      const mullionGeo = new THREE.BoxGeometry(0.1, height - 0.15, 0.15);
      const mullions = [[-w/2, d/2], [w/2, d/2], [-w/2, -d/2], [w/2, -d/2], [0, d/2], [0, -d/2]];
      mullions.forEach(([mx, mz]) => {
        const m = new THREE.Mesh(mullionGeo, materials.facadeDark);
        m.position.set(mx, (height - 0.15)/2 + 0.15, mz);
        floorGroup.add(m);
      });
    } else {
      // Exposed columns
      const colGeo = new THREE.BoxGeometry(0.4, height, 0.4);
      const positions = [[-w/2+0.5, d/2-0.5], [w/2-0.5, d/2-0.5], [-w/2+0.5, -d/2+0.5], [w/2-0.5, -d/2+0.5]];
      positions.forEach(([cx, cz]) => {
        const col = new THREE.Mesh(colGeo, materials.scaffolding);
        col.position.set(cx, height/2, cz);
        col.userData = { ...bldg, type: 'floor', floorIndex, isInteractive: true, phase: 'RCC Framework' };
        floorGroup.add(col);
      });
    }

    group.add(floorGroup);
  };

  // ─── Towers ────────────────────────────────────────────────────────────────

  const towers = BUILDINGS.filter(b => b.id.startsWith('tower'));
  towers.forEach(b => {
    // FIX: Provide default dimensions if missing in config
    const w = b.width || (b.id === 'tower_a' ? 14 : (b.id === 'tower_b' ? 12 : 14));
    const d = b.depth || (b.id === 'tower_a' ? 10 : (b.id === 'tower_b' ? 10 : 8));
    
    const bldgGroup = new THREE.Group();
    bldgGroup.position.set(b.x, b.y, b.z);
    scene.add(bldgGroup);

    const fH = 1.3;
    let currentY = 0;
    
    // GF
    const gf = new THREE.Mesh(new THREE.BoxGeometry(w, fH * 1.2, d), materials.facadePrimary);
    gf.position.y = (fH * 1.2) / 2;
    gf.castShadow = true;
    gf.receiveShadow = true;
    gf.userData = { ...b, type: 'building', isInteractive: true };
    bldgGroup.add(gf);
    currentY += fH * 1.2;

    const totalFloors = b.id === 'tower_a' ? 10 : (b.id === 'tower_b' ? 8 : 6);
    const constructionStart = b.id === 'tower_b' ? 4 : (b.id === 'tower_c' ? 2 : 100);

    for (let i = 0; i < totalFloors; i++) {
      addFloor(bldgGroup, b, i + 1, currentY, w, d, fH, i >= constructionStart);
      currentY += fH;
    }

    const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.4, d + 0.2), materials.facadeDark);
    roof.position.y = currentY + 0.2;
    bldgGroup.add(roof);

    b.totalHeight = currentY + 0.4;
    createBuildingLabel(b, bldgGroup, b.totalHeight);
  });

  // ─── Special Structures (Clubhouse, Pool) ──────────────────────────────────
  
  const clubhouse = BUILDINGS.find(b => b.id === 'clubhouse');
  if (clubhouse) {
    const chGroup = new THREE.Group();
    chGroup.position.set(clubhouse.x, 0, clubhouse.z);
    const body = new THREE.Mesh(new THREE.BoxGeometry(18, 4, 12), materials.facadeDark);
    body.position.y = 2;
    body.castShadow = true;
    body.userData = { ...clubhouse, isInteractive: true };
    chGroup.add(body);
    scene.add(chGroup);
    createBuildingLabel(clubhouse, chGroup, 4.5);
  }

  const pool = BUILDINGS.find(b => b.id === 'pool');
  if (pool) {
    const pGroup = new THREE.Group();
    pGroup.position.set(pool.x, 0, pool.z);
    const water = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), materials.water);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.1;
    water.userData = { ...pool, isInteractive: true };
    pGroup.add(water);
    scene.add(pGroup);
    scene.userData.waterMesh = water;
  }
}
