import * as THREE from 'three';
import { showTooltip, hideTooltip } from './tooltip.js';

export const interactiveObjects = [];

export function setupRaycaster(container, camera, controls, scene) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoveredBuilding = null;
  let lockedBuilding = null;

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Update tooltip position
    const tooltip = document.querySelector('.buildunix-community-tooltip');
    if (tooltip) {
      const xOffset = 20;
      const yOffset = 20;
      tooltip.style.left = `${e.clientX - rect.left + xOffset}px`;
      tooltip.style.top = `${e.clientY - rect.top + yOffset}px`;
    }
  };

  const onClick = () => {
    if (hoveredBuilding) {
      if (lockedBuilding === hoveredBuilding) {
        lockedBuilding = null;
        controls.autoRotate = true;
      } else {
        lockedBuilding = hoveredBuilding;
        controls.autoRotate = false;
      }
    } else if (lockedBuilding) {
      lockedBuilding = null;
      controls.autoRotate = true;
    }
  };

  container.addEventListener('mousemove', onMouseMove, { passive: true });
  container.addEventListener('click', onClick);

  function applyHoverMaterial(mesh) {
    mesh.userData._originalMaterial = mesh.material;
    const highlightMat = mesh.material.clone();
    highlightMat.emissive = new THREE.Color(0xE8690A);
    highlightMat.emissiveIntensity = 0.2;
    mesh.material = highlightMat;
  }

  function restoreOriginalMaterial(mesh) {
    if (mesh.userData._originalMaterial) {
      mesh.material = mesh.userData._originalMaterial;
      delete mesh.userData._originalMaterial;
    }
  }

  function onHoveringBuilding(building) {
    if (!building) {
      if (hoveredBuilding) {
        restoreOriginalMaterial(hoveredBuilding);
        hoveredBuilding = null;
        hideTooltip();
        controls.autoRotate = true;
        container.style.cursor = 'default';
      }
      return;
    }

    if (hoveredBuilding !== building) {
      if (hoveredBuilding) restoreOriginalMaterial(hoveredBuilding);
      hoveredBuilding = building;
      applyHoverMaterial(building);
      showTooltip(building.userData);
      controls.autoRotate = false;
      container.style.cursor = 'pointer';
    }
  }

  const update = () => {
    if (lockedBuilding) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, false);
    onHoveringBuilding(intersects.length > 0 ? intersects[0].object : null);
  };

  const cleanup = () => {
    container.removeEventListener('mousemove', onMouseMove);
    container.removeEventListener('click', onClick);
  };

  return { update, cleanup };
}
