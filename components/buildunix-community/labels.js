import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export function createBuildingLabel(buildingObj, mesh, totalHeight) {
  const div = document.createElement('div');
  div.className = 'community-label';
  div.innerHTML = `
    <span class="label-dot status-${buildingObj.status}"></span>
    <span class="label-name">${buildingObj.name}</span>
    <span class="label-phase">Phase ${buildingObj.currentPhase}/14</span>
  `;

  const label = new CSS2DObject(div);
  label.position.set(0, totalHeight + 2, 0);
  mesh.add(label);
}
