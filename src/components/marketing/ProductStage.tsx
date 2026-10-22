import React from 'react';

export type StageVariant =
  | 'aurora-pearl'
  | 'apricot-dusk'
  | 'mineral-night'
  | 'glacier'
  | 'sage'
  | 'warm'
  | 'midnight'
  | 'aurora';

interface ProductStageProps {
  variant?: StageVariant;
  children: React.ReactNode;
  className?: string;
  stagePadding?: string;
  badge?: string;
}

// Canonical variant definitions
interface StagePalette {
  baseLight: string;
  baseDark: string;
  borderColor: string;
  glowTopRight: string;
  glowBottomLeft: string;
  glowTopLeft: string;
  glowBottomRight: string;
  radialCenterOverlay: string;
}

const STAGE_PALETTES: Record<'aurora-pearl' | 'apricot-dusk' | 'mineral-night', StagePalette> = {
  'aurora-pearl': {
    // Soft off-white canvas with sea-glass cyan, powder blue, periwinkle, lilac, and deep teal boundary
    baseLight: 'bg-[#f4f7fa]',
    baseDark: 'dark:bg-[#070c14]',
    borderColor: 'border-sky-200/60 dark:border-sky-900/40',
    // Top-right: Soft lilac & powder blue
    glowTopRight:
      'radial-gradient(ellipse at 85% 15%, rgba(192, 132, 252, 0.45) 0%, rgba(125, 211, 252, 0.35) 45%, transparent 75%)',
    // Bottom-left: Deep periwinkle & royal iris pool
    glowBottomLeft:
      'radial-gradient(circle at 12% 88%, rgba(99, 102, 241, 0.48) 0%, rgba(56, 189, 248, 0.32) 40%, transparent 70%)',
    // Top-left: Sea-glass cyan morning glow
    glowTopLeft:
      'radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.40) 0%, rgba(45, 212, 191, 0.25) 40%, transparent 65%)',
    // Bottom-right: Deep teal boundary edge
    glowBottomRight:
      'radial-gradient(ellipse at 88% 85%, rgba(13, 148, 136, 0.38) 0%, rgba(14, 165, 233, 0.22) 45%, transparent 70%)',
    radialCenterOverlay:
      'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.45) 0%, transparent 70%)',
  },
  'apricot-dusk': {
    // Warm porcelain ivory with soft peach, desaturated coral, rose-lavender, and twilight purple
    baseLight: 'bg-[#faf6f2]',
    baseDark: 'dark:bg-[#120a10]',
    borderColor: 'border-orange-200/60 dark:border-rose-950/40',
    // Top-right: Sunlit peach & nectarine
    glowTopRight:
      'radial-gradient(ellipse at 85% 18%, rgba(251, 146, 60, 0.46) 0%, rgba(244, 114, 182, 0.32) 45%, transparent 75%)',
    // Bottom-left: Desaturated coral & rose-lavender
    glowBottomLeft:
      'radial-gradient(circle at 15% 85%, rgba(244, 63, 94, 0.42) 0%, rgba(251, 113, 133, 0.30) 40%, transparent 70%)',
    // Top-left: Warm alabaster gold
    glowTopLeft:
      'radial-gradient(circle at 20% 20%, rgba(253, 224, 71, 0.30) 0%, rgba(251, 191, 36, 0.20) 40%, transparent 65%)',
    // Bottom-right: Restrained twilight purple
    glowBottomRight:
      'radial-gradient(ellipse at 85% 85%, rgba(168, 85, 247, 0.42) 0%, rgba(217, 70, 239, 0.25) 45%, transparent 70%)',
    radialCenterOverlay:
      'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.40) 0%, transparent 70%)',
  },
  'mineral-night': {
    // Smoky slate & cool sapphire with violet, electric cyan, and soft warm amber glow
    baseLight: 'bg-[#edf2f7]',
    baseDark: 'dark:bg-[#070a12]',
    borderColor: 'border-indigo-200/60 dark:border-indigo-950/50',
    // Top-right: Midnight violet & plum
    glowTopRight:
      'radial-gradient(ellipse at 85% 15%, rgba(139, 92, 246, 0.46) 0%, rgba(99, 102, 241, 0.32) 45%, transparent 75%)',
    // Bottom-left: Electric cyan & arctic sea
    glowBottomLeft:
      'radial-gradient(circle at 12% 85%, rgba(6, 182, 212, 0.44) 0%, rgba(37, 99, 235, 0.32) 40%, transparent 70%)',
    // Top-left: Deep sapphire navy
    glowTopLeft:
      'radial-gradient(circle at 18% 22%, rgba(59, 130, 246, 0.40) 0%, rgba(99, 102, 241, 0.25) 40%, transparent 65%)',
    // Bottom-right: Subtle soft amber glow
    glowBottomRight:
      'radial-gradient(ellipse at 88% 88%, rgba(245, 158, 11, 0.32) 0%, rgba(217, 119, 6, 0.18) 45%, transparent 70%)',
    radialCenterOverlay:
      'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.35) 0%, transparent 70%)',
  },
};

// Map legacy / alias variant keys to canonical palettes
const resolvePalette = (variant: StageVariant): StagePalette => {
  if (variant === 'apricot-dusk' || variant === 'warm' || variant === 'sage') {
    return STAGE_PALETTES['apricot-dusk'];
  }
  if (variant === 'mineral-night' || variant === 'midnight') {
    return STAGE_PALETTES['mineral-night'];
  }
  return STAGE_PALETTES['aurora-pearl'];
};

/**
 * ProductStage provides a rich, art-directed multicolor environment
 * that frames desktop application windows with layered soft color depth,
 * multi-region atmospheric glow, and elevated physical presence.
 */
export const ProductStage: React.FC<ProductStageProps> = ({
  variant = 'aurora-pearl',
  children,
  className = '',
  stagePadding = 'p-4 sm:p-6 md:p-8 lg:p-10',
  badge,
}) => {
  const palette = resolvePalette(variant);

  return (
    <div
      className={`relative rounded-2xl md:rounded-3xl border ${palette.baseLight} ${palette.baseDark} ${palette.borderColor} shadow-[0_20px_50px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)] overflow-hidden transition-all duration-300 ${className}`}
      aria-label="Product demonstration environment"
    >
      {/* Layered Multi-Region Atmospheric Color Composition */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Zone 1: Top-Right atmospheric pool with gentle ambient breathing */}
        <div
          className="absolute -top-[10%] -right-[10%] w-[75%] h-[75%] rounded-full blur-3xl opacity-80 dark:opacity-75 transition-opacity transform-gpu animate-stage-drift"
          style={{ background: palette.glowTopRight }}
        />

        {/* Zone 2: Bottom-Left deep pool */}
        <div
          className="absolute -bottom-[15%] -left-[10%] w-[70%] h-[70%] rounded-full blur-3xl opacity-75 dark:opacity-70 transition-opacity transform-gpu animate-stage-drift-reverse"
          style={{ background: palette.glowBottomLeft }}
        />

        {/* Zone 3: Top-Left morning light accent */}
        <div
          className="absolute -top-[10%] -left-[5%] w-[55%] h-[55%] rounded-full blur-3xl opacity-65 dark:opacity-60 transition-opacity"
          style={{ background: palette.glowTopLeft }}
        />

        {/* Zone 4: Bottom-Right edge boundary pool */}
        <div
          className="absolute -bottom-[10%] -right-[5%] w-[60%] h-[60%] rounded-full blur-3xl opacity-70 dark:opacity-65 transition-opacity"
          style={{ background: palette.glowBottomRight }}
        />

        {/* Center elevation soft light for high window contrast */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-20 mix-blend-overlay"
          style={{ background: palette.radialCenterOverlay }}
        />

        {/* Tactile micro-grain overlay for organic texture */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='stageNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23stageNoise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Crisp subtle inner edge highlight */}
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/40 dark:border-white/10 pointer-events-none" />
      </div>

      {/* Optional stage corner badge */}
      {badge && (
        <div className="absolute top-3.5 right-4 z-20">
          <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md text-neutral-700 dark:text-neutral-200 border border-neutral-200/70 dark:border-neutral-700/60 shadow-xs">
            {badge}
          </span>
        </div>
      )}

      {/* Staged Content (Desktop Window) with generous framing */}
      <div className={`relative z-10 ${stagePadding}`}>
        {children}
      </div>
    </div>
  );
};
