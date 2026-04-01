import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import ParticleField from './ParticleField';

function MainSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} scale={2} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#0ea5e9"
          roughness={0.1}
          metalness={0.9}
          distort={0.25}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function GlassRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[3, -0.5, -1.5]} scale={1}>
        <torusGeometry args={[1, 0.15, 16, 64]} />
        <MeshDistortMaterial
          color="#2dd4bf"
          roughness={0.05}
          metalness={1}
          distort={0.15}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8}>
      <mesh ref={meshRef} position={[-3, 2, -2]} scale={0.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>
    </Float>
  );
}

function SmallOrbs() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      {[
        { pos: [-4, -1, -3] as [number, number, number], scale: 0.2 },
        { pos: [4, 2, -4] as [number, number, number], scale: 0.15 },
        { pos: [-2, 3, -2] as [number, number, number], scale: 0.1 },
        { pos: [2, -2, -3] as [number, number, number], scale: 0.18 },
      ].map((orb, i) => (
        <mesh key={i} position={orb.pos} scale={orb.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#2dd4bf"
            emissiveIntensity={0.8}
            roughness={0}
            metalness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#0ea5e9" />
          <pointLight position={[-5, -5, 5]} intensity={0.4} color="#2dd4bf" />
          <pointLight position={[3, 3, 3]} intensity={0.3} color="#0ea5e9" />
          <MainSphere />
          <GlassRing />
          <FloatingCube />
          <SmallOrbs />
          <ParticleField count={300} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
