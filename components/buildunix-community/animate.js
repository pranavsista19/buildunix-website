export function startAnimationLoop(renderer, labelRenderer, scene, camera, controls, raycasterContext) {
  let animationFrameId;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    
    controls.update();
    raycasterContext.update();

    if (scene.userData.accentLight) {
      scene.userData.accentLight.intensity = 0.5 + Math.sin(Date.now() * 0.0015) * 0.3;
    }

    if (scene.userData.waterMesh) {
      scene.userData.waterMesh.material.opacity = 0.65 + Math.sin(Date.now() * 0.0008) * 0.05;
    }

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  };

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}
