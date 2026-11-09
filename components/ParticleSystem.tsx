
import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store';
import { getTargetPosition, getTextPointsPure } from '../utils/math';

const dummy = new THREE.Object3D();

const ParticleSystem: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { count, shape, color, handOpen, handPosition, isTracking, voiceMode, voiceText } = useStore();
  
  // Fix for JSX.IntrinsicElements errors by using local component aliases
  const InstancedMesh = 'instancedMesh' as any;
  const BoxGeometry = 'boxGeometry' as any;
  const MeshStandardMaterial = 'meshStandardMaterial' as any;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return { positions, velocities };
  }, [count]);

  const targetPositions = useMemo(() => {
    if (voiceMode === 'text' && voiceText) {
      return getTextPointsPure(voiceText, count);
    }
    const targets = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const vec = getTargetPosition(i, count, shape);
      targets[i * 3] = vec.x;
      targets[i * 3 + 1] = vec.y;
      targets[i * 3 + 2] = vec.z;
    }
    return targets;
  }, [count, shape, voiceMode, voiceText]);

  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    }
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const { positions, velocities } = particles;

    const isHandActive = isTracking;
    const attractionStrength = isHandActive ? (1 - handOpen) * 0.15 : 0;
    const shapeStrength = isHandActive ? (handOpen * 0.05) + 0.015 : 0.055;
    
    // Coordenadas da mão escalonadas para o novo tamanho de mundo (100x menor)
    const handX = handPosition.x * 0.05;
    const handY = handPosition.y * 0.03;
    const handZ = 0.02;

    const cosT = Math.cos(time * 0.2);
    const sinT = Math.sin(time * 0.2);
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      let px = positions[ix];
      let py = positions[iy];
      let pz = positions[iz];

      const txRaw = targetPositions[ix];
      const tyRaw = targetPositions[iy];
      const tzRaw = targetPositions[iz];
      
      
      const tx = voiceMode === 'text' ? txRaw : (txRaw * cosT - tzRaw * sinT);
      const ty = tyRaw;
      const tz = voiceMode === 'text' ? tzRaw : (txRaw * sinT + tzRaw * cosT);

      velocities[ix] *= 0.92;
      velocities[iy] *= 0.92;
      velocities[iz] *= 0.92;

      velocities[ix] += (tx - px) * shapeStrength;
      velocities[iy] += (ty - py) * shapeStrength;
      velocities[iz] += (tz - pz) * shapeStrength;

      if (isHandActive && attractionStrength > 0.01) {
        const dx = handX - px;
        const dy = handY - py;
        const dz = handZ - pz;
        const distSq = dx*dx + dy*dy + dz*dz + 0.001;
        const force = Math.min(attractionStrength * 0.5 / distSq, 0.5);
        velocities[ix] += dx * force;
        velocities[iy] += dy * force;
        velocities[iz] += dz * force;
      }
      
      velocities[ix] += (Math.random() - 0.5) * 0.0001;
      velocities[iy] += (Math.random() - 0.5) * 0.0001;
      velocities[iz] += (Math.random() - 0.5) * 0.0001;

      positions[ix] += velocities[ix];
      positions[iy] += velocities[iy];
      positions[iz] += velocities[iz];

      dummy.position.set(positions[ix], positions[iy], positions[iz]);
      // Escala 100x menor (era 0.065, agora ~0.00065)
      const scaleBase = 0.00065;
      const scaleDynamic = isHandActive ? scaleBase + (handOpen * 0.0004) : scaleBase;
      dummy.scale.setScalar(scaleDynamic);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Use the aliased components to avoid JSX property errors
  return (
    <InstancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <BoxGeometry args={[1, 1, 1]} /> 
      <MeshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={2.5}
        roughness={0.1}
        metalness={1.0}
        toneMapped={false}
      />
    </InstancedMesh>
  );
};

export default ParticleSystem;
