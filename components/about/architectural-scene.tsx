"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface ArchitecturalSceneProps {
  className?: string;
}

/**
 * A slow-drifting cluster of abstract massing blocks — not a model of any
 * real building, just clean rectangular volumes in the studio's own
 * terracotta/sienna/linen palette, evoking "shaping space" for the About
 * hero's backdrop. Vanilla three.js (no @react-three/fiber): this project
 * already carries GSAP + Motion + Lenis, and a raw WebGL canvas mounted
 * once in a ref is fewer moving parts than a second React renderer.
 *
 * Respects prefers-reduced-motion (renders one static frame, no rAF loop)
 * and pauses the render loop via IntersectionObserver while the hero is
 * scrolled out of view. Everything is torn down on unmount.
 */
export function ArchitecturalScene({ className = "" }: ArchitecturalSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x4b2e2b, 6, 15);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0.8, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const palette = [0xc08552, 0x8c5a3c, 0xfff8f0];
    const blockCount = 7;
    for (let i = 0; i < blockCount; i++) {
      const geometry = new THREE.BoxGeometry(
        THREE.MathUtils.randFloat(0.6, 1.8),
        THREE.MathUtils.randFloat(0.6, 2.4),
        THREE.MathUtils.randFloat(0.6, 1.8),
      );
      const material = new THREE.MeshStandardMaterial({
        color: palette[i % palette.length],
        roughness: 0.6,
        metalness: 0.06,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        THREE.MathUtils.randFloatSpread(5),
        THREE.MathUtils.randFloatSpread(2.6) - 0.2,
        THREE.MathUtils.randFloatSpread(3.5) - 1,
      );
      mesh.rotation.set(
        THREE.MathUtils.randFloat(-0.25, 0.25),
        THREE.MathUtils.randFloat(-0.6, 0.6),
        THREE.MathUtils.randFloat(-0.1, 0.1),
      );
      group.add(mesh);
    }

    const key = new THREE.DirectionalLight(0xfff1e0, 1.5);
    key.position.set(4, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc08552, 0.5);
    fill.position.set(-5, -2, -3);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x4b2e2b, 1));

    let rafId = 0;
    let pointerX = 0;
    let pointerY = 0;

    function resize() {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    }

    function handlePointerMove(event: PointerEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    }

    function renderFrame() {
      renderer.render(scene, camera);
    }

    function tick() {
      group.rotation.y += 0.0015;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointerY * 0.1, 0.04);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerX * 0.5, 0.04);
      camera.lookAt(0, 0, 0);
      renderFrame();
      rafId = requestAnimationFrame(tick);
    }

    resize();
    renderFrame();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (prefersReducedMotion) return;
        if (entry.isIntersecting && !rafId) {
          rafId = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      observer.disconnect();
      group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
