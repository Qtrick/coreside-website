import React from 'react';

interface SiteAmbientBackgroundProps {
  className?: string;
}

/**
 * SiteAmbientBackground provides a persistent, quiet, neutral atmospheric contour
 * and tactile grain depth behind the non-hero narrative across all sections.
 *
 * Uses viewport-fixed positioning with preserveAspectRatio="xMidYMid slice" to ensure
 * lines never stretch or distort on tall pages, with contrast calibrated for both
 * light and dark modes.
 */
export const SiteAmbientBackground: React.FC<SiteAmbientBackgroundProps> = ({ className = '' }) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 1. Subtle Organic Contour Linework (Topographic sweeps) */}
      <svg
        className="absolute inset-0 w-full h-full text-neutral-950 dark:text-white transition-colors duration-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        {/* Top-Right sweep cluster */}
        <path
          d="M 880 -40 C 1060 140 1240 280 1480 390"
          stroke="currentColor"
          strokeWidth="1.2"
          className="opacity-[0.075] dark:opacity-[0.08]"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 940 -50 C 1110 170 1280 330 1510 470"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeDasharray="4 8"
          className="opacity-[0.05] dark:opacity-[0.055]"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 820 -20 C 1020 200 1190 360 1440 540"
          stroke="currentColor"
          strokeWidth="0.8"
          className="opacity-[0.06] dark:opacity-[0.07]"
          vectorEffect="non-scaling-stroke"
        />

        {/* Mid-Left organic contours */}
        <path
          d="M -40 320 C 240 390 410 540 500 820"
          stroke="currentColor"
          strokeWidth="1.1"
          className="opacity-[0.07] dark:opacity-[0.075]"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M -60 390 C 190 460 350 620 440 920"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeDasharray="3 7"
          className="opacity-[0.045] dark:opacity-[0.05]"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M -70 250 C 270 330 450 480 570 760"
          stroke="currentColor"
          strokeWidth="0.8"
          className="opacity-[0.055] dark:opacity-[0.06]"
          vectorEffect="non-scaling-stroke"
        />

        {/* Bottom-Right topographic curve */}
        <path
          d="M 780 940 C 1010 770 1240 710 1520 750"
          stroke="currentColor"
          strokeWidth="1.1"
          className="opacity-[0.07] dark:opacity-[0.075]"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 720 970 C 960 820 1180 770 1480 820"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeDasharray="4 8"
          className="opacity-[0.05] dark:opacity-[0.055]"
          vectorEffect="non-scaling-stroke"
        />

        {/* Diagonal soft guide line across mid-page */}
        <path
          d="M 150 960 C 480 720 840 540 1350 480"
          stroke="currentColor"
          strokeWidth="0.75"
          className="opacity-[0.045] dark:opacity-[0.05]"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* 2. Peripheral Atmospheric Neutral Depth Pools (No bright neon spotlights) */}
      <div
        className="absolute top-0 right-0 w-[55vw] h-[55vh] rounded-full blur-3xl pointer-events-none opacity-[0.035] dark:opacity-[0.04] bg-neutral-900 dark:bg-white transition-opacity"
        style={{
          background: 'radial-gradient(circle at 80% 20%, currentColor 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[50vw] h-[50vh] rounded-full blur-3xl pointer-events-none opacity-[0.03] dark:opacity-[0.035] bg-neutral-900 dark:bg-white transition-opacity"
        style={{
          background: 'radial-gradient(circle at 20% 80%, currentColor 0%, transparent 70%)',
        }}
      />

      {/* 3. Tactile Fine Grain Texture Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.055] mix-blend-multiply dark:mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="site-ambient-grain-v4">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#site-ambient-grain-v4)" />
      </svg>
    </div>
  );
};
