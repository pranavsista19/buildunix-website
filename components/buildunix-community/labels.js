import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export function createBuildingLabel(buildingObj, mesh, totalHeight) {
  // Create a physical pole for the label to rest on
  const poleHeight = 2.5;
  const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, poleHeight);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x2A2A2E, roughness: 0.8 });
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.set(0, totalHeight + (poleHeight / 2), 0);
  mesh.add(pole);

  const div = document.createElement('div');
  div.className = 'community-label';
  div.innerHTML = `
    <span class="label-dot status-${buildingObj.status}"></span>
    <span class="label-name">${buildingObj.name.split(' — ')[0]}</span>
  `;

  const label = new CSS2DObject(div);
  label.position.set(0, totalHeight + poleHeight + 0.2, 0); // Position right on top of pole
  mesh.add(label);
}
