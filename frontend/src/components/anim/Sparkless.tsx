"use client";

import React, { useEffect, useRef } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
type SparklesInstance = {
  destroy: () => void;
};
const SparklesPreview = () => {
  const sparklesRef = useRef<SparklesInstance | null>(null);

  useEffect(() => {
    return () => {
      if (sparklesRef.current) {
        sparklesRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-to-t from-white via-white to-transparent p-4 rounded-lg h-full">
      <div className="absolute inset-x-0 bottom-[30px] h-32">
        <SparklesCore
          ref={sparklesRef}
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor={["#000000", "#4263EB"]}
          speed={0.2}
        />
      </div>
    </div>
  );
};

const SparklesPreviewDark = () => {
  const sparklesRef = useRef<SparklesInstance | null>(null);

  useEffect(() => {
    return () => {
      if (sparklesRef.current) {
        sparklesRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md relative h-64">
      <div className="absolute inset-x-0 bottom-0 h-32">
        <SparklesCore
          ref={sparklesRef}
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor={["#FFFFFF", "#4263EB"]}
          speed={0.3}
        />
      </div>
    </div>
  );
};

const SparklesPreviewColorful = () => {
  const sparklesRef = useRef<SparklesInstance | null>(null);

  useEffect(() => {
    return () => {
      if (sparklesRef.current) {
        sparklesRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md relative h-64">
      <div className="absolute inset-x-0 bottom-0 h-32">
        <SparklesCore
          ref={sparklesRef}
          id="tsparticlescolorful"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor={["#00ff00", "#4263EB", "#ff00ff"]}
          speed={0.2}
        />
      </div>
    </div>
  );
};

export { SparklesPreview, SparklesPreviewDark, SparklesPreviewColorful };
