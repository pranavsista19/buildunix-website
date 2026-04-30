import * as THREE from 'three';
import { showTooltip, hideTooltip } from './tooltip.js';

export const interactiveObjects = [];

export function setupRaycaster(container, camera, controls, scene) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoveredObject = null;
  let lockedObject = null;

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Update tooltip position (follow mouse)
    const tooltip = document.querySelector('.buildunix-community-tooltip');
    if (tooltip) {
      const xOffset = 25;
      const yOffset = -20;
      tooltip.style.left = `${e.clientX - rect.left + xOffset}px`;
      tooltip.style.top = `${e.clientY - rect.top + yOffset}px`;
    }
  };

  const onClick = () => {
    if (hoveredObject) {
      if (lockedObject === hoveredObject) {
        lockedObject = null;
        controls.autoRotate = true;
      } else {
        lockedObject = hoveredObject;
        controls.autoRotate = false;
      }
    } else if (lockedObject) {
      lockedObject = null;
      controls.autoRotate = true;
    }
  };

  container.addEventListener('mousemove', onMouseMove, { passive: true });
  container.addEventListener('click', onClick);

  function applyHighlight(mesh) {
    mesh.userData._originalMaterial = mesh.material;
    const highlightMat = mesh.material.clone();
    
    // Highlight effect
    if (mesh.userData.type === 'floor') {
      highlightMat.emissive = new THREE.Color(0xE8690A); // Warm orange highlight for floor
      highlightMat.emissiveIntensity = 0.4;
    } else {
      highlightMat.emissive = new THREE.Color(0xABC4D1); // Soft blue for general buildings
      highlightMat.emissiveIntensity = 0.2;
    }
    
    mesh.material = highlightMat;
  }

  function restoreMaterial(mesh) {
    if (mesh && mesh.userData._originalMaterial) {
      mesh.material = mesh.userData._originalMaterial;
      delete mesh.userData._originalMaterial;
    }
  }

  function handleIntersections(intersectedObject) {
    if (!intersectedObject) {
      if (hoveredObject) {
        restoreMaterial(hoveredObject);
        hoveredObject = null;
        hideTooltip();
        controls.autoRotate = true;
        container.style.cursor = 'default';
      }
      return;
    }

    if (hoveredObject !== intersectedObject) {
      if (hoveredObject) restoreMaterial(hoveredObject);
      hoveredObject = intersectedObject;
      applyHighlight(intersectedObject);
      showTooltip(intersectedObject.userData);
      controls.autoRotate = false;
      container.style.cursor = 'pointer';
    }
  }

  const update = () => {
    if (lockedObject) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, false);
    handleIntersections(intersects.length > 0 ? intersects[0].object : null);
  };

  const cleanup = () => {
    container.removeEventListener('mousemove', onMouseMove);
    container.removeEventListener('click', onClick);
  };

  return { update, cleanup };
}
