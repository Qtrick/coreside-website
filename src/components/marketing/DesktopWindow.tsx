import React from 'react';
import { DemoWindowControls } from '@/components/marketing/DemoWindowControls';

interface DesktopWindowProps {
  title?: string;
  subtitle?: string;
  rightAccessory?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleBarClassName?: string;
  bodyClassName?: string;
  active?: boolean;
}

/**
 * DesktopWindow models a realistic macOS desktop application frame for Coreside,
 * featuring colored traffic lights, subtle elevation, and authentic title bar chrome.
 */
export const DesktopWindow: React.FC<DesktopWindowProps> = ({
  title = 'Coreside',
  subtitle,
  rightAccessory,
  children,
  className = '',
  titleBarClassName = '',
  bodyClassName = '',
  active = true,
}) => {
  return (
    <div
      className={`rounded-xl md:rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#0e0e11] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.04)] dark:shadow-[0_24px_56px_-12px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-200 ${className}`}
      aria-label="Desktop application window"
    >
      {/* Title Bar */}
      <div
        className={`h-10 md:h-11 px-4 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-md flex items-center justify-between select-none ${titleBarClassName}`}
      >
        {/* Left: macOS Traffic Lights + Window Title */}
        <div className="flex items-center gap-3">
          <DemoWindowControls active={active} />
          <div className="flex items-center gap-2 pl-1 border-l border-neutral-300/60 dark:border-neutral-800">
            <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 tracking-tight">
              {title}
            </span>
            {subtitle && (
              <span className="text-[11px] text-neutral-500 font-mono hidden sm:inline">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Right accessory (e.g. status badge, step counter) */}
        {rightAccessory && (
          <div className="flex items-center gap-2">
            {rightAccessory}
          </div>
        )}
      </div>

      {/* Window Body */}
      <div className={`relative ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};
