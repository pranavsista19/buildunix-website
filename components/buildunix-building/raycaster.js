import * as THREE from 'three';
import { showTooltip, hideTooltip } from './tooltip.js';

export function setupRaycaster(container, camera, scene, controls) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  const context = {
    raycaster,
    mouse,
    camera,
    scene,
    controls,
    INTERSECTED: null,
    LOCKED: null,
    cleanup: null
  };

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const onClick = () => {
    if (context.INTERSECTED) {
      if (context.LOCKED === context.INTERSECTED) {
        context.LOCKED = null;
        context.INTERSECTED.material.emissiveIntensity = 0;
      } else {
        if (context.LOCKED) context.LOCKED.material.emissiveIntensity = 0;
        context.LOCKED = context.INTERSECTED;
      }
    }
  };

  container.addEventListener('mousemove', onMouseMove, { passive: true });
  container.addEventListener('click', onClick);

  context.cleanup = () => {
    container.removeEventListener('mousemove', onMouseMove);
    container.removeEventListener('click', onClick);
  };

  return context;
}

export function updateRaycaster(context) {
  const { raycaster, mouse, camera, scene, controls } = context;

  if (context.LOCKED) return;

  raycaster.setFromCamera(mouse, camera);
  
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  // Find first intersected object that has a valid userData.id
  let validHit = null;
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.userData && intersects[i].object.userData.id) {
      validHit = intersects[i].object;
      break;
    }
  }

  if (validHit) {
    const hit = validHit;
    if (context.INTERSECTED !== hit) {
      if (context.INTERSECTED) {
        context.INTERSECTED.material.emissiveIntensity = 0;
      }
      context.INTERSECTED = hit;
      context.INTERSECTED.material.emissive.setHex(context.INTERSECTED.userData.emissive);
      context.INTERSECTED.material.emissiveIntensity = 0.35;
      controls.autoRotate = false;
      showTooltip(context.INTERSECTED.userData);
    }
  } else {
    if (context.INTERSECTED && !context.LOCKED) {
      context.INTERSECTED.material.emissiveIntensity = 0;
      context.INTERSECTED = null;
      if (!context.LOCKED) controls.autoRotate = true;
      hideTooltip();
    }
  }
}
