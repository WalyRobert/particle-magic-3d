
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ParticleSystem from './ParticleSystem';
import { useStore } from '../store';

const Scene: React.FC = () => {
  const arMode = useStore((state) => state.arMode);
  
  // Fix for JSX.IntrinsicElements errors by using local component aliases
  const DirectionalLight = 'directionalLight' as any;
  const AmbientLight = 'ambientLight' as any;
  const PointLight = 'pointLight' as any;

  return (
    <div className={`absolute inset-0 pointer-events-none ${arMode ? 'z-10' : 'z-0 bg-gradient-to-b from-gray-900 to-black'}`}>
      <Canvas
        camera={{ position: [0, 0, 0.15], fov: 60 }} // Câmera aproximada para o novo escala 100x menor
        dpr={[1, 1.5]} // Ligeira otimização de DPR para 100k partículas
        gl={{ antialias: false, toneMapping: 3, alpha: true }} // Antialias desativado para performance com 100k
        className="pointer-events-auto"
      >
        <Suspense fallback={null}>
          <ParticleSystem />
          
          {!arMode && (
            <>
  
              <Stars radius={1} depth={0.5} count={5000} factor={0.04} saturation={0} fade speed={1} />
            </>
          )}

          {/* Use the aliased components to avoid JSX property errors */}
          {arMode && <DirectionalLight position={[0, 1, 0.5]} intensity={2} />}
          
          <AmbientLight intensity={arMode ? 0.8 : 0.2} />
          <PointLight position={[0.1, 0.1, 0.1]} intensity={1} />
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={0.05} 
            maxDistance={0.5}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
