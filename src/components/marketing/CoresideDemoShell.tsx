import React from 'react';
import { MessageSquare, Wrench, Folder, Settings } from 'lucide-react';

interface CoresideDemoShellProps {
  sidebarActiveItem?: 'chat' | 'app' | 'project';
  activeChatTitle?: string;
  activeAppTitle?: string;
  chatPanel?: React.ReactNode;
  toolCanvas?: React.ReactNode;
  footerStatus?: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
}

/**
 * CoresideDemoShell provides an authentic, editorially simplified desktop layout
 * based directly on the canonical Coreside AppShell architecture (Sidebar + Chat/Tool Split).
 */
export const CoresideDemoShell: React.FC<CoresideDemoShellProps> = ({
  sidebarActiveItem = 'app',
  activeChatTitle = 'Study Planner',
  activeAppTitle = 'Study Planner',
  chatPanel,
  toolCanvas,
  footerStatus,
  className = '',
  showSidebar = true,
}) => {
  return (
    <div
      className={`grid grid-cols-1 ${
        showSidebar ? 'md:grid-cols-[190px_1fr] lg:grid-cols-[210px_1fr]' : ''
      } min-h-[440px] md:min-h-[480px] bg-neutral-50/60 dark:bg-[#0c0c0e] ${className}`}
    >
      {/* Coreside Desktop Sidebar (Authentic Sidebar.tsx representation) */}
      {showSidebar && (
        <aside className="hidden md:flex flex-col justify-between p-3 border-r border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/60 dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400 text-xs select-none">
          {/* Top: Brand Mark & Nav Lists */}
          <div className="space-y-4">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2 px-2 py-1.5 font-semibold text-neutral-900 dark:text-neutral-100">
              <svg
                width="18"
                height="18"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-950 dark:text-white shrink-0"
              >
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="20" cy="12" r="4.5" fill="currentColor" />
                <circle cx="12" cy="24" r="4.5" fill="currentColor" />
                <circle cx="28" cy="24" r="4.5" fill="currentColor" />
                <circle cx="20" cy="20" r="2.5" fill="currentColor" />
              </svg>
              <span className="text-xs tracking-tight font-bold">Coreside</span>
            </div>

            {/* Chats Section */}
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                Conversations
              </div>
              <div
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] transition-colors ${
                  sidebarActiveItem === 'chat'
                    ? 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium'
                    : 'hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                <span className="truncate">{activeChatTitle}</span>
              </div>
            </div>

            {/* Personal Apps Section */}
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                Personal Apps
              </div>
              <div
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] transition-colors ${
                  sidebarActiveItem === 'app'
                    ? 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium'
                    : 'hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="truncate">{activeAppTitle}</span>
              </div>
            </div>

            {/* Projects Section */}
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-mono tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                Workspace Projects
              </div>
              <div
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] transition-colors ${
                  sidebarActiveItem === 'project'
                    ? 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium'
                    : 'hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <Folder className="w-3.5 h-3.5 text-neutral-400" />
                <span className="truncate">Fall Semester</span>
              </div>
            </div>
          </div>

          {/* Bottom Settings Link */}
          <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
            <div className="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 cursor-default">
              <Settings className="w-3.5 h-3.5" />
              <span>Workspace Settings</span>
            </div>
          </div>
        </aside>
      )}

      {/* Main Workspace Area (Chat / Tool Canvas Split) */}
      <main className="flex flex-col justify-between p-4 sm:p-5 md:p-6 space-y-4 overflow-hidden">
        {chatPanel && (
          <div className="shrink-0">{chatPanel}</div>
        )}

        {toolCanvas && (
          <div className="flex-1 flex flex-col justify-center">{toolCanvas}</div>
        )}

        {footerStatus && (
          <div className="shrink-0 pt-2 border-t border-neutral-100 dark:border-neutral-800/70 text-[11px] text-neutral-500 flex items-center justify-between">
            {footerStatus}
          </div>
        )}
      </main>
    </div>
  );
};
