import type { COBEOptions } from 'cobe'

// Use the COBEOptions type directly from cobe instead of redefining it
export type { COBEOptions }

export const GLOBE_CONFIG: COBEOptions = {
devicePixelRatio: 1,
width: 1000,
height: 1000,
phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 20000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [0.1, 0.8, 1],
  glowColor: [1, 1, 1],
  markers: [],
  onRender: () => {}
};