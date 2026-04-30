import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export function createBuildingLabel(buildingObj, mesh, totalHeight) {
  const div = document.createElement('div');
  div.className = 'community-label';
  div.innerHTML = `
    <span class="label-dot status-${buildingObj.status}"></span>
    <span class="label-name">${buildingObj.name.split(' — ')[0]}</span>
  `;

  const label = new CSS2DObject(div);
  label.position.set(0, totalHeight + 2, 0);
  mesh.add(label);
}
