import React, { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export type SparklesInstance = {
  destroy: () => void;
};

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string[];
  particleDensity?: number;
};

// ✅ **Usamos forwardRef para aceptar referencias**
export const SparklesCore = forwardRef<SparklesInstance | null, ParticlesProps>((props, ref) => {
  const { id, className, background, minSize, maxSize, speed, particleColor, particleDensity } = props;
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  let containerRef: Container | null = null;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      containerRef = container;
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  // ✅ **Exponer la función destroy en el ref**
  useImperativeHandle(ref, () => ({
    destroy: () => {
      containerRef?.destroy();
    },
  }));

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: background || "#0d47a1" } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            particles: {
              color: { value: particleColor || "#ffffff" },
              move: { enable: true, speed: speed || 4 },
              number: { value: particleDensity || 120 },
              size: { value: { min: minSize || 1, max: maxSize || 3 } },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
});

SparklesCore.displayName = "SparklesCore"; // Para evitar warnings en DevTools