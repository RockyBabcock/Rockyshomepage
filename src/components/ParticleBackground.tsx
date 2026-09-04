import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  scrollY?: number;
}

interface DepthLayer {
  name: string;
  count: number;
  minRadius: number;
  maxRadius: number;
  size: number;
  opacity: number;
  rotSpeedX: number;
  rotSpeedY: number;
  parallaxFactor: number;
}

/**
 * Generate uniform points within a spherical 3D volume shell [minRadius, maxRadius]
 * Uses mathematical cubic distribution to prevent cluster bias.
 */
function generateLayerPoints(count: number, minRadius: number, maxRadius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const minCube = Math.pow(minRadius, 3);
  const maxCube = Math.pow(maxRadius, 3);

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    // Cubic root provides uniform spatial density throughout the spherical shell
    const r = Math.cbrt(Math.random() * (maxCube - minCube) + minCube);
    const sinPhi = Math.sin(phi);

    positions[i * 3] = r * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

/**
 * Generates subtle celestial star color tones:
 * - 82% crisp pure white (#FFFFFF)
 * - 12% subtle soft indigo/cool tint (#C7D2FE)
 * - 6% subtle soft warm tint (#FEF3C7)
 */
function generateStarColors(count: number): Float32Array {
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const pick = Math.random();
    if (pick > 0.88) {
      // Soft indigo tint
      colors[i * 3] = 0.78;
      colors[i * 3 + 1] = 0.83;
      colors[i * 3 + 2] = 1.0;
    } else if (pick > 0.82) {
      // Soft warm star tint
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.96;
      colors[i * 3 + 2] = 0.88;
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

  // Runtime scroll ref so animation loop reads high-frequency updates without recreating Three.js scene
  const scrollYRef = useRef(scrollY);
  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  // Section-based atmosphere intensity tracking (Home: subtle -> Work: balanced -> Skills: enhanced depth -> Footer: calm)
  const intensityRef = useRef(0.8);

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

  // Track subtle mouse movement (only on fine pointer devices)
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Primary Renderer: Multi-Layer Three.js Scene, fallback cleanly to 2D Canvas with 3D projection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number | null = null;
    let isCleanedUp = false;

    // Adaptive density depending on device capability
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    // 3 Distinct Spatial Depth Layers
    const layersConfig: DepthLayer[] = [
      {
        name: 'background',
        count: isMobile ? 550 : isTablet ? 1300 : 2600,
        minRadius: 1.5,
        maxRadius: 2.4,
        size: isMobile ? 0.0016 : 0.0013,
        opacity: 0.45,
        rotSpeedX: 1 / 22,
        rotSpeedY: 1 / 28,
        parallaxFactor: 0.012, // ~2px maximum visual displacement
      },
      {
        name: 'midground',
        count: isMobile ? 350 : isTablet ? 730 : 1400,
        minRadius: 1.0,
        maxRadius: 1.6,
        size: isMobile ? 0.0022 : 0.0018,
        opacity: 0.70,
        rotSpeedX: 1 / 15,
        rotSpeedY: 1 / 19,
        parallaxFactor: 0.028, // ~4-5px maximum visual displacement
      },
      {
        name: 'foreground',
        count: isMobile ? 100 : isTablet ? 220 : 450,
        minRadius: 0.6,
        maxRadius: 1.1,
        size: isMobile ? 0.0028 : 0.0023,
        opacity: 0.88,
        rotSpeedX: 1 / 10,
        rotSpeedY: 1 / 13,
        parallaxFactor: 0.052, // ~7-8px maximum visual displacement
      },
    ];

    // Data containers for both WebGL and 2D canvas fallback
    const layerData = layersConfig.map((config) => ({
      config,
      positions: generateLayerPoints(config.count, config.minRadius, config.maxRadius),
      colors: generateStarColors(config.count),
      rotX: 0,
      rotY: 0,
    }));

    let renderer: THREE.WebGLRenderer | null = null;
    let threeScene: THREE.Scene | null = null;
    let threeCamera: THREE.PerspectiveCamera | null = null;
    const threeGroups: THREE.Group[] = [];
    const threePointsList: THREE.Points[] = [];

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
        renderer.domElement.className = 'particle-canvas';
        container.appendChild(renderer.domElement);

        threeScene = new THREE.Scene();
        threeCamera = new THREE.PerspectiveCamera(
          55,
          window.innerWidth / window.innerHeight,
          0.1,
          100
        );
        threeCamera.position.z = 1.0;

        // Build each depth layer as its own Points mesh with custom sizeAttenuation
        layerData.forEach((layer) => {
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.BufferAttribute(layer.positions, 3));
          geometry.setAttribute('color', new THREE.BufferAttribute(layer.colors, 3));

          const material = new THREE.PointsMaterial({
            size: layer.config.size,
            vertexColors: true,
            transparent: true,
            opacity: layer.config.opacity,
            depthWrite: false,
            sizeAttenuation: true, // Crucial for true 3D spatial depth scaling
          });

          const points = new THREE.Points(geometry, material);
          const group = new THREE.Group();
          group.rotation.z = Math.PI / 4;
          group.add(points);
          threeScene!.add(group);

          threeGroups.push(group);
          threePointsList.push(points);
        });

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
    const rotZ = Math.PI / 4;

    const renderLoop = (now: number) => {
      if (isCleanedUp) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth mouse parallax interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const currentScrollY = scrollYRef.current;
      const scrollTilt = (currentScrollY * 0.0002) % (Math.PI * 2);

      // Section-based atmosphere modulation (Home -> Work -> Skills -> Footer)
      const vh = window.innerHeight;
      let targetIntensity = 0.8;
      if (currentScrollY < vh * 0.8) {
        targetIntensity = 0.8; // Home: subtle, calm
      } else if (currentScrollY < vh * 2.1) {
        targetIntensity = 1.0; // Work: medium
      } else if (currentScrollY < vh * 3.4) {
        targetIntensity = 1.22; // Skills: slightly enhanced depth
      } else {
        targetIntensity = 0.75; // Footer: quiet
      }
      intensityRef.current += (targetIntensity - intensityRef.current) * 0.04;

      if (useWebGL && renderer && threeScene && threeCamera) {
        layerData.forEach((layer, index) => {
          if (!prefersReducedMotion) {
            layer.rotX -= delta * layer.config.rotSpeedX;
            layer.rotY -= delta * layer.config.rotSpeedY;
          }

          const points = threePointsList[index];
          if (points && points.material) {
            (points.material as THREE.PointsMaterial).opacity =
              layer.config.opacity * intensityRef.current;
          }

          const group = threeGroups[index];
          if (group) {
            // Rotational drift
            group.rotation.x = layer.rotX - scrollTilt;
            group.rotation.y = layer.rotY;

            // Restrained 3D spatial parallax displacement (2-8px equivalent in camera frustum)
            if (!prefersReducedMotion) {
              group.position.x = mouseRef.current.x * layer.config.parallaxFactor;
              group.position.y = -mouseRef.current.y * layer.config.parallaxFactor;
            }
          }
        });

        renderer.render(threeScene, threeCamera);
      } else if (canvas && ctx) {
        // High-performance 2D Canvas Multi-Layer 3D Perspective Projection
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const focalLength = height * 0.85;

        layerData.forEach((layer) => {
          if (!prefersReducedMotion) {
            layer.rotX -= delta * layer.config.rotSpeedX;
            layer.rotY -= delta * layer.config.rotSpeedY;
          }

          const mouseTiltX = prefersReducedMotion ? 0 : mouseRef.current.y * layer.config.parallaxFactor * 2;
          const mouseTiltY = prefersReducedMotion ? 0 : mouseRef.current.x * layer.config.parallaxFactor * 2;

          const currentRotX = layer.rotX + mouseTiltX - scrollTilt;
          const currentRotY = layer.rotY + mouseTiltY;

          const cosX = Math.cos(currentRotX);
          const sinX = Math.sin(currentRotX);
          const cosY = Math.cos(currentRotY);
          const sinY = Math.sin(currentRotY);
          const cosZ = Math.cos(rotZ);
          const sinZ = Math.sin(rotZ);

          const count = layer.config.count;
          const positions = layer.positions;
          const colors = layer.colors;

          for (let i = 0; i < count; i++) {
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

            // 3. Tilt Z
            const x3 = x2 * cosZ - y2 * sinZ;
            const y3 = x2 * sinZ + y2 * cosZ;
            const z3 = z2 + 1.6; // camera distance

            if (z3 > 0.1) {
              const scale = focalLength / z3;
              const screenX = cx + x3 * scale;
              const screenY = cy + y3 * scale;

              if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
                // True depth attenuation: closer stars are slightly larger and brighter
                const depthRatio = Math.max(0.15, Math.min(1.0, 1.4 - z3 * 0.45));
                const starRadius = Math.max(0.5, depthRatio * (isMobile ? 1.3 : 1.6));

                const r = Math.round(colors[i * 3] * 255);
                const g = Math.round(colors[i * 3 + 1] * 255);
                const b = Math.round(colors[i * 3 + 2] * 255);
                const alpha = (depthRatio * layer.config.opacity * intensityRef.current).toFixed(2);

                ctx.beginPath();
                ctx.arc(screenX, screenY, starRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.fill();
              }
            }
          }
        });
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
      threePointsList.forEach((points) => {
        points.geometry.dispose();
        if (Array.isArray(points.material)) {
          points.material.forEach((m) => m.dispose());
        } else {
          points.material.dispose();
        }
      });
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="particle-background fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Fallback 2D Canvas element */}
      <canvas
        ref={canvasRef}
        className="particle-canvas absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Extremely subtle layered ambient depth glow (Restrained 3-4% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 20%, rgba(99, 102, 241, 0.035), transparent 70%), radial-gradient(ellipse 55% 45% at 85% 65%, rgba(147, 197, 253, 0.025), transparent 65%), radial-gradient(ellipse 60% 50% at 15% 85%, rgba(129, 140, 248, 0.02), transparent 65%)',
          transform: `translate3d(${mouseRef.current.x * 6}px, ${mouseRef.current.y * 6}px, 0)`,
        }}
      />
    </div>
  );
};
