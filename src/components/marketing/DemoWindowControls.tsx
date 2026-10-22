import React from 'react';

interface DemoWindowControlsProps {
  className?: string;
  active?: boolean;
}

/**
 * Authentic macOS desktop window traffic light controls.
 * Strictly decorative and inaccessible to screen readers (aria-hidden="true").
 */
export const DemoWindowControls: React.FC<DemoWindowControlsProps> = ({
  className = '',
  active = true,
}) => {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-hidden="true"
    >
      {/* Close button */}
      <span
        className={`w-3 h-3 rounded-full transition-colors ${
          active
            ? 'bg-[#FF5F57] border border-[#E0443E]/50 shadow-[0_0_1px_rgba(0,0,0,0.3)]'
            : 'bg-neutral-300 dark:bg-neutral-700'
        }`}
      />
      {/* Minimize button */}
      <span
        className={`w-3 h-3 rounded-full transition-colors ${
          active
            ? 'bg-[#FEBC2E] border border-[#D89E24]/50 shadow-[0_0_1px_rgba(0,0,0,0.3)]'
            : 'bg-neutral-300 dark:bg-neutral-700'
        }`}
      />
      {/* Zoom / Maximize button */}
      <span
        className={`w-3 h-3 rounded-full transition-colors ${
          active
            ? 'bg-[#28C840] border border-[#1AAB29]/50 shadow-[0_0_1px_rgba(0,0,0,0.3)]'
            : 'bg-neutral-300 dark:bg-neutral-700'
        }`}
      />
    </div>
  );
};
