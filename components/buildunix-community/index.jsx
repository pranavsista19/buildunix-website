'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupScene } from './scene.js';
import { buildCommunity } from './community.js';
import { setupRaycaster, interactiveObjects } from './raycaster.js';
import { startAnimationLoop } from './animate.js';
import './community.css';

export default function BuildunixCommunitySection() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        
        if (isVisible && !isLoadedRef.current) {
          isLoadedRef.current = true;
          setIsLoaded(true);
          initThreeJS();
        }

        if (containerRef.current) {
          containerRef.current.dataset.visible = isVisible ? 'true' : 'false';
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const initThreeJS = () => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    const dpr = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = window.innerWidth >= 768;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(container.clientWidth, container.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.left = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    if (window.innerWidth < 768) labelRenderer.domElement.style.display = 'none';
    container.appendChild(labelRenderer.domElement);

    // Scene setup
    const scene = setupScene(container, renderer);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.5,
      500
    );
    camera.position.set(75, 55, 75);
    camera.lookAt(0, 5, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 250;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.25;

    // Build geometry
    buildCommunity(scene);

    // Collect interactive objects
    interactiveObjects.length = 0; // Clear previous
    scene.traverse(obj => {
      if (obj.isMesh && obj.userData && obj.userData.isInteractive) {
        interactiveObjects.push(obj);
      }
    });

    const raycasterContext = setupRaycaster(container, camera, controls, scene);
    
    // Animation loop
    const cleanupAnim = startAnimationLoop(renderer, labelRenderer, scene, camera, controls, raycasterContext, container);

    // Resize handler
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      labelRenderer.setSize(container.clientWidth, container.clientHeight);
      
      if (window.innerWidth < 768) {
        renderer.shadowMap.enabled = false;
        labelRenderer.domElement.style.display = 'none';
      } else {
        renderer.shadowMap.enabled = true;
        labelRenderer.domElement.style.display = 'block';
      }
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    containerRef.current._cleanup = () => {
      window.removeEventListener('resize', onResize);
      cleanupAnim();
      raycasterContext.cleanup();
      
      scene.traverse(obj => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
            else obj.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      if (container.contains(labelRenderer.domElement)) container.removeChild(labelRenderer.domElement);
    };
  };

  useEffect(() => {
    return () => {
      if (containerRef.current && containerRef.current._cleanup) {
        containerRef.current._cleanup();
      }
    };
  }, []);

  return (
    <section className="buildunix-community-section" id="how-it-works" ref={sectionRef}>
      <div className="community-intro">
        <div className="eyebrow">LIVE PROJECT VIEW</div>
        <h2>One community.<br/>Phase template.<br/>Zero chaos.</h2>
        <p>BuildUNIX manages every tower, every common area,
        and every phase simultaneously. Hover any building
        to see its live construction status.</p>
        <div className="community-legend">
          <div className="legend-row">
            <span className="legend-dot complete"></span>
            <span>Complete — All phases signed off</span>
          </div>
          <div className="legend-row">
            <span className="legend-dot in_progress"></span>
            <span>In Progress — Active phase gate</span>
          </div>
          <div className="legend-row">
            <span className="legend-dot early_stage"></span>
            <span>Early Stage — Structural phase</span>
          </div>
        </div>
      </div>

      <div className="community-canvas-wrapper">
        <div id="buildunix-community-3d" ref={containerRef}>
          {!isLoaded && <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8A89E', fontFamily: 'DM Mono', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em'}}>Loading Interactive Community...</div>}
          
          <div className="buildunix-community-tooltip">
            <div className="tooltip-header">
              <span className="tooltip-status-dot"></span>
              <div className="tooltip-building-name"></div>
              <button className="tooltip-close" title="Close Tooltip">×</button>
            </div>
            <div className="tooltip-meta"></div>
            <div className="tooltip-hint">Click to pin · Click again to release</div>
          </div>
          
          <div className="instruction-pane">
            <div className="instruction-row">
              <span className="instruction-key">Left Click</span>
              <span>Rotate View</span>
            </div>
            <div className="instruction-row">
              <span className="instruction-key">Right Click</span>
              <span>Move Focus (Pan)</span>
            </div>
            <div className="instruction-row">
              <span className="instruction-key">Scroll</span>
              <span>Zoom In/Out</span>
            </div>
            <div className="instruction-row">
              <span className="instruction-key">Click</span>
              <span>Select/Pin Info</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
