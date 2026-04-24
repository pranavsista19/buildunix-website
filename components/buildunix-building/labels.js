import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ZONES } from './zones.config.js';

export function createLabels(scene) {
  ZONES.forEach(zone => {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'buildunix-zone-label';
    labelDiv.innerHTML = `
      <span class="label-phase">${zone.phase}</span>
      <span class="label-status label-status--${zone.status}"></span>
    `;

    const label = new CSS2DObject(labelDiv);
    label.position.set(zone.worldX + 2.2, zone.worldY, zone.worldZ);
    scene.add(label);
  });
}
