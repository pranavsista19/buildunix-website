import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export function createBuildingLabel(buildingObj, mesh, totalHeight) {
  const div = document.createElement('div');
  div.className = 'community-label';
  div.innerHTML = `
    <div class="label-container">
      <span class="label-name">${buildingObj.name}</span>
    </div>
  `;

  const label = new CSS2DObject(div);
  label.position.set(0, totalHeight + 1.2, 0);
  mesh.add(label);
}
