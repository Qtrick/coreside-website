import React from 'react';

export const SiteAmbientBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle organic hairline contour curves */}
      <svg
        className="w-full h-full text-neutral-900/[0.025] dark:text-white/[0.028] transition-colors duration-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {/* Upper right gentle sweep */}
        <path
          d="M 900 -50 C 1100 120 1280 260 1500 380"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 960 -60 C 1140 160 1320 320 1520 460"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 840 -30 C 1050 180 1220 340 1460 520"
          stroke="currentColor"
          strokeWidth="0.75"
          vectorEffect="non-scaling-stroke"
        />

        {/* Mid-left organic contour */}
        <path
          d="M -50 350 C 220 420 380 560 480 820"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M -60 420 C 180 490 320 640 420 920"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="3 6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M -80 280 C 260 360 420 500 540 760"
          stroke="currentColor"
          strokeWidth="0.85"
          vectorEffect="non-scaling-stroke"
        />

        {/* Lower right topographic curve */}
        <path
          d="M 820 920 C 1040 760 1260 700 1520 740"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 760 950 C 990 810 1200 760 1480 810"
          stroke="currentColor"
          strokeWidth="0.75"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Very faint, tactile fine grain overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.022] dark:opacity-[0.035] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="site-ambient-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#site-ambient-grain)" />
      </svg>
    </div>
  );
};
