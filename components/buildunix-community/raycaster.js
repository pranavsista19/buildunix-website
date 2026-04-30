import * as THREE from 'three';
import { showTooltip, hideTooltip } from './tooltip.js';

export const interactiveObjects = [];

export function setupRaycaster(container, camera, controls, scene) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoveredObject = null;
  let lockedObject = null;

  const onMouseMove = (e) => {
    if (lockedObject) return; // Stop tooltip from running away from mouse when pinned
    
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const tooltip = document.querySelector('.buildunix-community-tooltip');
    if (tooltip && window.innerWidth >= 768) {
      const xOffset = 20;
      const yOffset = 20;
      
      let left = e.clientX - rect.left + xOffset;
      let top = e.clientY - rect.top + yOffset;
      
      // Keep tooltip in bounds
      if (left + 220 > rect.width) left = rect.width - 240;
      
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
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

  const closeBtn = document.querySelector('.tooltip-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Don't trigger the container click
      lockedObject = null;
      hoveredObject = null;
      hideTooltip();
      controls.autoRotate = true;
    });
  }

  container.addEventListener('mousemove', onMouseMove, { passive: true });
  container.addEventListener('click', onClick);

  function applyHoverMaterial(mesh) {
    if (!mesh.material) return;
    mesh.userData._originalMaterial = mesh.material;
    const highlightMat = mesh.material.clone();
    highlightMat.emissive = new THREE.Color(0xE8690A);
    highlightMat.emissiveIntensity = 0.2;
    mesh.material = highlightMat;
  }

  function restoreOriginalMaterial(mesh) {
    if (mesh && mesh.userData && mesh.userData._originalMaterial) {
      mesh.material = mesh.userData._originalMaterial;
      delete mesh.userData._originalMaterial;
    }
  }

  const update = () => {
    if (lockedObject) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects, false);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (hoveredObject !== object) {
        if (hoveredObject) restoreOriginalMaterial(hoveredObject);
        hoveredObject = object;
        applyHoverMaterial(hoveredObject);
        showTooltip(object.userData);
        controls.autoRotate = false;
        container.style.cursor = 'pointer';
      }
    } else {
      if (hoveredObject) {
        restoreOriginalMaterial(hoveredObject);
        hoveredObject = null;
        hideTooltip();
        controls.autoRotate = true;
        container.style.cursor = 'default';
      }
    }
  };

  const cleanup = () => {
    container.removeEventListener('mousemove', onMouseMove);
    container.removeEventListener('click', onClick);
  };

  return { update, cleanup };
}
