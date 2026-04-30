export function startAnimationLoop(renderer, labelRenderer, scene, camera, controls, raycasterContext, container) {
  let animationFrameId;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    
    // Pause rendering if container is off-screen
    if (container && container.dataset.visible === 'false') {
      return;
    }

    controls.update();
    raycasterContext.update();

    // Pulse accent light
    if (scene.userData.accentLight) {
      scene.userData.accentLight.intensity = 0.5 + Math.sin(Date.now() * 0.002) * 0.3;
    }

    // Animate water
    if (scene.userData.waterMesh) {
      scene.userData.waterMesh.material.opacity = 0.7 + Math.sin(Date.now() * 0.001) * 0.1;
    }

    // Animate cranes
    scene.traverse((obj) => {
      if (obj.userData && obj.userData.isCrane) {
        obj.rotation.y += 0.002;
      }
    });

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  };

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}
