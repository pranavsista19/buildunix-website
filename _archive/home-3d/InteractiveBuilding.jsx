"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Text, Edges } from "@react-three/drei";
import * as THREE from "three";

const BUILDING_FLOORS = [
  { id: "basement", height: 1, y: 0.5, label: "Basement / Foundation", featureId: "foundation" },
  { id: "ground", height: 1.2, y: 1.6, label: "Ground Floor", featureId: "ground" },
  { id: "floor1", height: 1.2, y: 2.8, label: "Floor 1 (RCC)", featureId: "rcc" },
  { id: "floor2", height: 1.2, y: 4.0, label: "Floor 2 (Blockwork)", featureId: "blockwork" },
  { id: "floor3", height: 1.2, y: 5.2, label: "Floor 3 (Finishing)", featureId: "finishing" },
  { id: "roof", height: 0.5, y: 6.05, label: "Terrace", featureId: "roof" }
];

function Floor({ data, isHovered, onHover, onClick }) {
  const mesh = useRef();
  const targetScale = isHovered ? 1.05 : 1;
  const targetColor = isHovered ? "#3D85E8" : "#e0e5ec"; // BuildUNIX accent blue when hovered

  useFrame((state, delta) => {
    mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 10 * delta);
    mesh.current.scale.z = THREE.MathUtils.lerp(mesh.current.scale.z, targetScale, 10 * delta);
    mesh.current.material.color.lerp(new THREE.Color(targetColor), 10 * delta);
  });

  return (
    <group position={[0, data.y, 0]}>
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(data.id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick(data.id);
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[4, data.height - 0.05, 4]} />
        <meshStandardMaterial color="#e0e5ec" roughness={0.2} metalness={0.1} />
        <Edges scale={1} threshold={15} color={isHovered ? "#ffffff" : "#aab4c3"} />
      </mesh>
      
      {/* Scaffolding / Columns decoration */}
      {data.id !== "roof" && (
        <>
          <mesh position={[-1.9, 0, -1.9]}>
            <cylinderGeometry args={[0.05, 0.05, data.height]} />
            <meshStandardMaterial color="#6b7e95" />
          </mesh>
          <mesh position={[1.9, 0, -1.9]}>
            <cylinderGeometry args={[0.05, 0.05, data.height]} />
            <meshStandardMaterial color="#6b7e95" />
          </mesh>
          <mesh position={[-1.9, 0, 1.9]}>
            <cylinderGeometry args={[0.05, 0.05, data.height]} />
            <meshStandardMaterial color="#6b7e95" />
          </mesh>
          <mesh position={[1.9, 0, 1.9]}>
            <cylinderGeometry args={[0.05, 0.05, data.height]} />
            <meshStandardMaterial color="#6b7e95" />
          </mesh>
        </>
      )}
    </group>
  );
}

function BuildingModel({ onHoverFeature }) {
  const [hoveredFloor, setHoveredFloor] = useState(null);
  const groupRef = useRef();

  const handleHover = (floorId) => {
    setHoveredFloor(floorId);
    if (floorId) {
      const floor = BUILDING_FLOORS.find(f => f.id === floorId);
      if (floor) onHoverFeature(floor.featureId);
    }
  };

  useFrame((state) => {
    // Gentle floating rotation
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t / 2) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -3, 0]}>
      {/* Base platform */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[4.5, 4.5, 0.2, 32]} />
        <meshStandardMaterial color="#2a323d" />
      </mesh>
      
      {BUILDING_FLOORS.map((floor) => (
        <Floor
          key={floor.id}
          data={floor}
          isHovered={hoveredFloor === floor.id}
          onHover={handleHover}
        />
      ))}
      
      <ContactShadows position={[0, -0.1, 0]} opacity={0.5} scale={20} blur={2} far={10} />
    </group>
  );
}

export default function InteractiveBuilding({ onHoverFeature }) {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px", position: "relative", cursor: "pointer" }}>
      <Canvas shadows camera={{ position: [8, 6, 8], fov: 45 }}>
        <color attach="background" args={['transparent']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Environment preset="city" />
        
        <BuildingModel onHoverFeature={onHoverFeature} />
        
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 - 0.1}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
