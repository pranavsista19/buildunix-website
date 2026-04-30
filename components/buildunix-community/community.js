import * as THREE from 'three';
import { BUILDINGS } from './community.config.js';
import { getMaterials } from './materials.js';
import { createBuildingLabel } from './labels.js';

export function buildCommunity(scene) {
  const materials = getMaterials();

  // ─── Base Landscape ──────────────────────────────────────────────────────────
  
  // Base Plate (Grass/Land)
  const baseGeo = new THREE.PlaneGeometry(100, 80);
  const basePlate = new THREE.Mesh(baseGeo, materials.basePlate);
  basePlate.rotation.x = -Math.PI / 2;
  basePlate.receiveShadow = true;
  scene.add(basePlate);

  // Integrated Roads (Ref Image 2: More organic paths)
  const createRoad = (width, height, x, z, rotY = 0) => {
    const road = new THREE.Mesh(new THREE.PlaneGeometry(width, height), materials.concrete);
    road.rotation.x = -Math.PI / 2;
    road.rotation.z = rotY;
    road.position.set(x, 0.06, z);
    road.receiveShadow = true;
    scene.add(road);
    
    // Road Markings (Subtle details)
    const lineGeo = new THREE.PlaneGeometry(width, 0.1);
    const line = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true }));
    line.rotation.x = -Math.PI / 2;
    line.rotation.z = rotY;
    line.position.set(x, 0.07, z);
    scene.add(line);
  };

  // Main Spine Road
  createRoad(100, 6, 0, 15);
  // Cross Roads
  createRoad(6, 60, -15, 0);
  createRoad(6, 60, 20, 0);

  // ─── Building Helper ────────────────────────────────────────────────────────

  const addFloor = (group, bldg, floorIndex, y, w, d, height, isUnderConstruction = false) => {
    const floorGroup = new THREE.Group();
    floorGroup.position.y = y;
    
    // Slab
    const slabGeo = new THREE.BoxGeometry(w + 0.4, 0.2, d + 0.4);
    const slab = new THREE.Mesh(slabGeo, materials.facadeSecondary);
    slab.position.y = 0.1;
    slab.castShadow = true;
    slab.receiveShadow = true;
    floorGroup.add(slab);

    // Glass / Walls
    if (!isUnderConstruction) {
      const glassGeo = new THREE.BoxGeometry(w, height - 0.2, d);
      const glass = new THREE.Mesh(glassGeo, materials.glass);
      glass.position.y = height / 2;
      
      // Attach metadata to the floor glass for raycasting
      glass.userData = { 
        ...bldg, 
        type: 'floor', 
        floorIndex, 
        isInteractive: true,
        phase: bldg.phases ? bldg.phases[floorIndex % bldg.phases.length] : 'Structural Work'
      };
      floorGroup.add(glass);
      
      // Structural Mullions (Professional detailing)
      const mullionGeo = new THREE.BoxGeometry(0.1, height - 0.2, 0.15);
      for (let i = -1; i <= 1; i++) {
        const m = new THREE.Mesh(mullionGeo, materials.facadeDark);
        m.position.set((w/2) * i, height/2, d/2 + 0.05);
        floorGroup.add(m);
      }
    } else {
      // Construction state (exposed columns)
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

  BUILDINGS.forEach(b => {
    const bldgGroup = new THREE.Group();
    bldgGroup.position.set(b.x, b.y, b.z);
    scene.add(bldgGroup);

    const fH = 1.4;
    let currentY = 0;
    
    // Ground Floor (Solid Base)
    const gf = new THREE.Mesh(new THREE.BoxGeometry(b.width, fH * 1.5, b.depth), materials.facadePrimary);
    gf.position.y = (fH * 1.5) / 2;
    gf.castShadow = true;
    gf.userData = { ...b, type: 'building', isInteractive: true };
    bldgGroup.add(gf);
    currentY += fH * 1.5;

    // Floors
    const totalFloors = b.id === 'tower_a' ? 12 : (b.id === 'tower_b' ? 8 : 6);
    const constructionStart = b.id === 'tower_b' ? 5 : (b.id === 'tower_c' ? 3 : 100);

    for (let i = 0; i < totalFloors; i++) {
      addFloor(bldgGroup, b, i + 1, currentY, b.width, b.depth, fH, i >= constructionStart);
      currentY += fH;
    }

    // Roof / Penthouse
    const roof = new THREE.Mesh(new THREE.BoxGeometry(b.width + 0.2, 0.5, b.depth + 0.2), materials.facadeDark);
    roof.position.y = currentY + 0.25;
    bldgGroup.add(roof);

    b.totalHeight = currentY + 0.5;
    createBuildingLabel(b, bldgGroup, b.totalHeight);
  });
}
