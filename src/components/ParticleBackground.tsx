import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  scrollY?: number;
}

/**
 * Generate uniform points inside a 3D sphere volume
 * (Matching maath/random inSphere algorithm)
 */
function generateSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    // Cube root gives uniform density throughout the sphere volume
    const r = Math.cbrt(Math.random()) * radius;
    const sinPhi = Math.sin(phi);

    positions[i * 3] = r * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

/**
 * Generates subtle starlight color tones:
 * Predominantly crisp white (#FFFFFF) with subtle cool indigo/cyan (#C7D2FE, #BAE6FD)
 * and faint warm star (#FEF3C7) tints.
 */
function generateStarColors(count: number): Float32Array {
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const pick = Math.random();
    if (pick > 0.85) {
      // Soft indigo tint
      colors[i * 3] = 0.78;
      colors[i * 3 + 1] = 0.82;
      colors[i * 3 + 2] = 1.0;
    } else if (pick > 0.72) {
      // Soft warm star tint
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.95;
      colors[i * 3 + 2] = 0.85;
    } else {
      // Pure crisp white
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 1.0;
      colors[i * 3 + 2] = 1.0;
    }
  }
  return colors;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ scrollY = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse parallax state for spatial depth
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track subtle mouse movement across window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Primary Renderer: Try WebGL (Three.js Points), fallback cleanly to 2D Canvas with 3D projection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number | null = null;
    let isCleanedUp = false;

    // Detect screen width and scale particle count for performance
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    const particleCount = isMobile ? 380 : isTablet ? 700 : 1200;
    const sphereRadius = 1.25;

    const positions = generateSpherePoints(particleCount, sphereRadius);
    const colors = generateStarColors(particleCount);

    let renderer: THREE.WebGLRenderer | null = null;
    let threeScene: THREE.Scene | null = null;
    let threeCamera: THREE.PerspectiveCamera | null = null;
    let pointsGroup: THREE.Group | null = null;
    let threePoints: THREE.Points | null = null;

    // Test if WebGL can be initialized
    let useWebGL = false;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (gl) {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: 'low-power',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.pointerEvents = 'none';
        container.appendChild(renderer.domElement);

        threeScene = new THREE.Scene();
        threeCamera = new THREE.PerspectiveCamera(
          55,
          window.innerWidth / window.innerHeight,
          0.1,
          100
        );
        threeCamera.position.z = 1.0;

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: isMobile ? 0.0025 : 0.002,
          vertexColors: true,
          transparent: true,
          opacity: 0.75,
          depthWrite: false,
          sizeAttenuation: true,
        });

        threePoints = new THREE.Points(geometry, material);
        pointsGroup = new THREE.Group();
        pointsGroup.rotation.z = Math.PI / 4;
        pointsGroup.add(threePoints);
        threeScene.add(pointsGroup);

        useWebGL = true;
      }
    } catch {
      useWebGL = false;
    }

    // 2D Canvas Fallback Setup
    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    if (!useWebGL && canvas) {
      ctx = canvas.getContext('2d', { alpha: true });
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    }

    // Animation variables
    let lastTime = performance.now();
    let rotX = 0;
    let rotY = 0;
    const rotZ = Math.PI / 4;

    const renderLoop = (now: number) => {
      if (isCleanedUp) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Mouse parallax smooth interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Continuous slow rotation (matching space-portfolio delta / 10 and delta / 15)
      if (!prefersReducedMotion) {
        rotX -= delta / 10;
        rotY -= delta / 15;
      }

      const mouseTiltX = mouseRef.current.y * 0.15;
      const mouseTiltY = mouseRef.current.x * 0.15;
      const scrollTilt = (scrollY * 0.0003) % (Math.PI * 2);

      if (useWebGL && renderer && threeScene && threeCamera && pointsGroup) {
        pointsGroup.rotation.x = rotX + mouseTiltX - scrollTilt;
        pointsGroup.rotation.y = rotY + mouseTiltY;
        renderer.render(threeScene, threeCamera);
      } else if (canvas && ctx) {
        // High-performance 2D Canvas 3D Perspective Projection
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const focalLength = height * 0.85;

        // Precompute trigonometric matrices for 3D rotation
        const currentRotX = rotX + mouseTiltX - scrollTilt;
        const currentRotY = rotY + mouseTiltY;

        const cosX = Math.cos(currentRotX);
        const sinX = Math.sin(currentRotX);
        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);
        const cosZ = Math.cos(rotZ);
        const sinZ = Math.sin(rotZ);

        for (let i = 0; i < particleCount; i++) {
          const px = positions[i * 3];
          const py = positions[i * 3 + 1];
          const pz = positions[i * 3 + 2];

          // 1. Rotate Y
          const x1 = px * cosY + pz * sinY;
          const y1 = py;
          const z1 = -px * sinY + pz * cosY;

          // 2. Rotate X
          const x2 = x1;
          const y2 = y1 * cosX - z1 * sinX;
          const z2 = y1 * sinX + z1 * cosX;

          // 3. Tilt Z (Math.PI / 4)
          const x3 = x2 * cosZ - y2 * sinZ;
          const y3 = x2 * sinZ + y2 * cosZ;
          const z3 = z2 + 1.6; // camera distance

          if (z3 > 0.1) {
            const scale = focalLength / z3;
            const screenX = cx + x3 * scale;
            const screenY = cy + y3 * scale;

            if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
              // Depth attenuation: closer stars are larger and brighter
              const depthRatio = Math.max(0.1, Math.min(1.0, 1.4 - z3 * 0.5));
              const starRadius = Math.max(0.6, depthRatio * (isMobile ? 1.4 : 1.8));

              const r = Math.round(colors[i * 3] * 255);
              const g = Math.round(colors[i * 3 + 1] * 255);
              const b = Math.round(colors[i * 3 + 2] * 255);
              const alpha = (depthRatio * 0.75).toFixed(2);

              ctx.beginPath();
              ctx.arc(screenX, screenY, starRadius, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    // Resize handling
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (useWebGL && renderer && threeCamera) {
        threeCamera.aspect = w / h;
        threeCamera.updateProjectionMatrix();
        renderer.setSize(w, h);
      } else if (canvas && ctx) {
        const dpr = Math.min(window.devicePixelRatio, 1.5);
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isCleanedUp = true;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);

      if (renderer) {
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      if (threePoints) {
        threePoints.geometry.dispose();
        if (Array.isArray(threePoints.material)) {
          threePoints.material.forEach((m) => m.dispose());
        } else {
          threePoints.material.dispose();
        }
      }
    };
  }, [prefersReducedMotion, scrollY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Fallback 2D Canvas element */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Subtle Atmospheric Depth Glows (Layered Spatial Ambient Light) */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 20%, rgba(99, 102, 241, 0.045), transparent 70%), radial-gradient(ellipse 55% 45% at 85% 65%, rgba(147, 197, 253, 0.035), transparent 65%), radial-gradient(ellipse 60% 50% at 15% 85%, rgba(129, 140, 248, 0.03), transparent 65%)',
          transform: `translate3d(${mouseRef.current.x * 12}px, ${mouseRef.current.y * 12}px, 0)`,
        }}
      />
    </div>
  );
};
