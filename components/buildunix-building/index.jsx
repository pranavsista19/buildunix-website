'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import './building.css';

// Lazy loaded initialization
const initThreeJS = async (container) => {
  const { initScene } = await import('./scene.js');
  return initScene(container);
};

export default function BuildunixBuildingSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoaded) {
          setIsLoaded(true);
          observer.disconnect();
          
          if (containerRef.current) {
            initThreeJS(containerRef.current).then(cleanup => {
              cleanupRef.current = cleanup;
            });
          }
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [isLoaded]);

  return (
    <section className="buildunix-building-section" id="how-it-works" ref={sectionRef}>
      <div className="building-intro">
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>One Community.<br/>Every Tower.<br/>Enforced.</h2>
        <p>A real-scale gated community on BuildUNIX. Hover any tower, clubhouse, or amenity to see its live phase, crew, and approval gate.</p>
        <div className="building-legend">
          <div className="legend-item">
            <span className="legend-dot approved"></span> Approved
          </div>
          <div className="legend-item">
            <span className="legend-dot in-progress"></span> In Progress
          </div>
          <div className="legend-item">
            <span className="legend-dot pending"></span> Pending
          </div>
        </div>
      </div>
      <div className="buildunix-model-wrapper">
        <div id="buildunix-3d-container" ref={containerRef}>
          {!isLoaded && <div style={{width: '100%', height: '100%', background: '#161210', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8A89E', fontFamily: 'DM Mono', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em'}}>Loading interactive model...</div>}
        </div>
        
        {/* Tooltip injected here */}
        <div className="buildunix-model-tooltip">
          <div className="tooltip__phase"></div>
          <div className="tooltip__title"></div>
          <div className="tooltip__status">
            <span className="tooltip__status-dot"></span>
            <span className="tooltip__status-label"></span>
          </div>
          <p className="tooltip__description"></p>
          <div className="tooltip__hint">Click to lock · Click again to release</div>
        </div>
      </div>
    </section>
  );
}
