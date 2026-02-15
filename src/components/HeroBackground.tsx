"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Grid of Squares Background with Blur Effect
 * 
 * Features:
 * - Background grid of individual squares
 * - Squares become blurry (fade) near active areas
 * - Mouse parallax interaction
 * - Scroll-based opacity fade
 * - Fallback for browsers without WebGL
 */

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isActiveRef = useRef(true);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    isActiveRef.current = true;

    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported, using fallback');
      setWebglFailed(true);
      return;
    }

    // Configuration
    const config = {
      parallaxStrength: 0.01,
    };

    // State
    const mouse = { x: 0, y: 0, worldX: 0, worldY: 0 };
    const targetCameraPos = new THREE.Vector3(0, 0, 25);
    const currentCameraPos = new THREE.Vector3(0, 0, 25);
    let scrollProgress = 0;

    // Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f14, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.copy(currentCameraPos);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn('Failed to create WebGL renderer:', e);
      setWebglFailed(true);
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    // Configure canvas to allow scrolling
    const webglCanvas = renderer.domElement;
    webglCanvas.style.pointerEvents = 'none';
    webglCanvas.style.touchAction = 'none';
    
    container.appendChild(webglCanvas);
    rendererRef.current = renderer;

    // Create background grid of squares - full screen coverage
    const gridGroup = new THREE.Group();
    const gridSquares: THREE.Mesh[] = [];
    const gridSize = 20; // Increased from 10 to 20 for more coverage
    const squareSize = 3; // Larger squares
    const gridSpacing = 3.5; // Increased spacing
    
    const squareGeometry = new THREE.PlaneGeometry(squareSize, squareSize);
    
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let y = -gridSize; y <= gridSize; y++) {
        const squareMaterial = new THREE.MeshBasicMaterial({
          color: 0x1a3a5c,
          transparent: true,
          opacity: 0.1,
          side: THREE.DoubleSide,
        });
        
        const square = new THREE.Mesh(squareGeometry, squareMaterial);
        square.position.set(
          x * gridSpacing,
          y * gridSpacing,
          -15 // Moved further back to cover more screen
        );
        
        // Store original opacity
        (square as any).originalOpacity = 0.1;
        
        gridGroup.add(square);
        gridSquares.push(square);
      }
    }
    scene.add(gridGroup);

    // Convert screen to world coordinates
    function screenToWorld(screenX: number, screenY: number) {
      const vector = new THREE.Vector3(
        (screenX / window.innerWidth) * 2 - 1,
        -(screenY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(distance));
    }

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      const worldPos = screenToWorld(e.clientX, e.clientY);
      mouse.worldX = worldPos.x;
      mouse.worldY = worldPos.y;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollProgress = Math.min(1, Math.max(0, scrollY / (window.innerHeight * 0.6)));
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;

    function animate() {
      if (!isActiveRef.current) return;
      animationId = requestAnimationFrame(animate);

      // Camera parallax
      const parallaxX = mouse.x * config.parallaxStrength * 8;
      const parallaxY = mouse.y * config.parallaxStrength * 5;

      targetCameraPos.x = parallaxX;
      targetCameraPos.y = parallaxY;
      targetCameraPos.z = 30 - scrollProgress * 15;

      currentCameraPos.lerp(targetCameraPos, 0.03);
      camera.position.copy(currentCameraPos);
      camera.lookAt(0, scrollProgress * 1.5, 0);

      // Update grid squares - blur effect near mouse
      gridSquares.forEach(square => {
        const sq = square as any;
        
        // Calculate distance to mouse
        const dx = sq.position.x - mouse.worldX;
        const dy = sq.position.y - mouse.worldY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Blur radius
        const blurRadius = 12;
        let targetOpacity = sq.originalOpacity;
        
        if (distance < blurRadius) {
          // Closer to mouse = more blurry (lower opacity)
          const blurFactor = 1 - (distance / blurRadius);
          targetOpacity = sq.originalOpacity * (1 - blurFactor * 0.8);
        }
        
        // Smooth transition
        const currentOpacity = (square.material as THREE.MeshBasicMaterial).opacity;
        const newOpacity = currentOpacity + (targetOpacity - currentOpacity) * 0.08;
        (square.material as THREE.MeshBasicMaterial).opacity = newOpacity * (1 - scrollProgress);
      });

      renderer.render(scene, camera);
    }

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    
    if (!prefersReducedMotion || isMobile) {
      animate();
    }

    // Cleanup
    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(animationId);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Dispose
      gridSquares.forEach(square => {
        square.geometry.dispose();
        (square.material as THREE.Material).dispose();
      });

      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Fallback for when WebGL fails
  if (webglFailed) {
    return (
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(70, 194, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(70, 194, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ 
        pointerEvents: "none",
        touchAction: "none"
      }}
      aria-hidden="true"
    />
  );
}
