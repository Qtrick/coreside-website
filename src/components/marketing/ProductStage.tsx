import React from 'react';

export type StageVariant = 'glacier' | 'sage' | 'warm' | 'midnight' | 'aurora';

interface ProductStageProps {
  variant?: StageVariant;
  children: React.ReactNode;
  className?: string;
  stagePadding?: string;
  badge?: string;
}

/**
 * ProductStage provides a rich, professionally art-directed visual environment
 * that frames realistic Coreside desktop windows, elevating them above the monochrome site.
 */
export const ProductStage: React.FC<ProductStageProps> = ({
  variant = 'glacier',
  children,
  className = '',
  stagePadding = 'p-4 sm:p-6 md:p-8 lg:p-10',
  badge,
}) => {
  // Variant styles mapped for both light and dark site modes
  const variantStyles: Record<
    StageVariant,
    {
      bgLight: string;
      bgDark: string;
      radialGlow: string;
      border: string;
      glowAccent: string;
    }
  > = {
    glacier: {
      bgLight: 'from-[#eef4f9] via-[#e4ecf4] to-[#ebf1f7]',
      bgDark: 'dark:from-[#0a111a] dark:via-[#111c2a] dark:to-[#070c13]',
      radialGlow: 'rgba(56, 189, 248, 0.12)',
      border: 'border-sky-200/50 dark:border-sky-900/30',
      glowAccent: 'from-sky-400/10 via-indigo-500/10 to-transparent',
    },
    sage: {
      bgLight: 'from-[#eef6f2] via-[#e2efe8] to-[#edf5f1]',
      bgDark: 'dark:from-[#081512] dark:via-[#0e211c] dark:to-[#060f0d]',
      radialGlow: 'rgba(52, 211, 153, 0.12)',
      border: 'border-emerald-200/50 dark:border-emerald-900/30',
      glowAccent: 'from-emerald-400/10 via-teal-500/10 to-transparent',
    },
    warm: {
      bgLight: 'from-[#faf5f1] via-[#f3ebe4] to-[#f8f2ed]',
      bgDark: 'dark:from-[#18110e] dark:via-[#221814] dark:to-[#100b09]',
      radialGlow: 'rgba(251, 146, 60, 0.10)',
      border: 'border-amber-200/50 dark:border-amber-900/30',
      glowAccent: 'from-amber-400/10 via-rose-500/10 to-transparent',
    },
    midnight: {
      bgLight: 'from-[#e8ecf2] via-[#dde3ed] to-[#e4eaf2]',
      bgDark: 'dark:from-[#05070a] dark:via-[#0b101b] dark:to-[#030406]',
      radialGlow: 'rgba(99, 102, 241, 0.14)',
      border: 'border-indigo-200/50 dark:border-indigo-950/40',
      glowAccent: 'from-indigo-500/12 via-blue-600/10 to-transparent',
    },
    aurora: {
      bgLight: 'from-[#eaf5f5] via-[#e0edf2] to-[#e8f2f4]',
      bgDark: 'dark:from-[#050b0e] dark:via-[#09171f] dark:to-[#03070a]',
      radialGlow: 'rgba(45, 212, 191, 0.15)',
      border: 'border-teal-200/50 dark:border-teal-900/30',
      glowAccent: 'from-teal-400/14 via-indigo-500/12 to-transparent',
    },
  };

  const current = variantStyles[variant];

  return (
    <div
      className={`relative rounded-2xl md:rounded-3xl border bg-gradient-to-br ${current.bgLight} ${current.bgDark} ${current.border} shadow-xl overflow-hidden transition-all duration-300 ${className}`}
      aria-label="Product demonstration environment"
    >
      {/* Ambient Radial Illumination behind the software window */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Primary soft atmospheric light */}
        <div
          className="absolute -top-[15%] -right-[10%] w-[70%] h-[70%] rounded-full blur-3xl opacity-75 transition-opacity"
          style={{
            background: `radial-gradient(circle, ${current.radialGlow} 0%, transparent 70%)`,
          }}
        />
        {/* Secondary subtle ground reflection */}
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[65%] h-[65%] rounded-full blur-3xl opacity-50 transition-opacity"
          style={{
            background: `radial-gradient(circle, ${current.radialGlow} 0%, transparent 70%)`,
          }}
        />
        {/* Linear soft atmospheric gradient curtain */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${current.glowAccent} opacity-60 mix-blend-overlay`}
        />
        {/* Subtle noise grain for organic texture */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Optional stage corner badge */}
      {badge && (
        <div className="absolute top-3.5 right-4 z-10">
          <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-md text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-800/60 shadow-2xs">
            {badge}
          </span>
        </div>
      )}

      {/* Staged Content (Desktop Window) */}
      <div className={`relative z-10 ${stagePadding}`}>
        {children}
      </div>
    </div>
  );
};
