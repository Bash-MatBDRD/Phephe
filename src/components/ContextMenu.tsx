import React, { useEffect } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  Sun, 
  Moon, 
  RefreshCw, 
  Copy, 
  LogIn, 
  LogOut, 
  Bell, 
  Settings, 
  ShieldCheck, 
  Check, 
  Radio,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
  targetType?: 'message' | 'channel' | 'user' | 'global';
  targetData?: any;
}

interface ContextMenuProps {
  contextMenu: ContextMenuState;
  onClose: () => void;
  themeMode: 'day' | 'night';
  onToggleTheme: () => void;
  onRefresh: () => void;
  onOpenAuth: () => void;
  onNavigateTab: (tab: 'dashboard' | 'simulator' | 'bot-manager' | 'community-care' | 'announcements' | 'config') => void;
  onToggleLive: () => void;
  isLive: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
  onShowToast: (msg: string) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  contextMenu,
  onClose,
  themeMode,
  onToggleTheme,
  onRefresh,
  onOpenAuth,
  onNavigateTab,
  onToggleLive,
  isLive,
  isLoggedIn,
  onLogout,
  onShowToast,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      onClose();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (contextMenu.isOpen) {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('scroll', handleClickOutside, true);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleClickOutside, true);
    };
  }, [contextMenu.isOpen, onClose]);

  if (!contextMenu.isOpen) return null;

  // Calculate position constrained within viewport
  const menuWidth = 230;
  const menuHeight = 320;
  const adjustedX = Math.min(contextMenu.x, window.innerWidth - menuWidth - 10);
  const adjustedY = Math.min(contextMenu.y, window.innerHeight - menuHeight - 10);

  const handleCopyDiscordId = (e: React.MouseEvent) => {
    e.stopPropagation();
    const mockId = contextMenu.targetData?.id || '987654321098765432';
    navigator.clipboard.writeText(mockId);
    setCopied(true);
    onShowToast(`ID Discord copié : ${mockId} ❀`);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
        style={{ top: `${adjustedY}px`, left: `${adjustedX}px` }}
        onClick={(e) => e.stopPropagation()}
        className="fixed z-50 w-56 bg-white/95 dark:bg-[#1A1A18]/95 border border-[#D9CEBF] dark:border-white/10 rounded-2xl p-1.5 shadow-2xl backdrop-blur-md text-xs font-medium text-[#33332D] dark:text-[#EAE3DB] space-y-0.5 select-none"
      >
        <div className="px-3 py-1.5 border-b border-[#D9CEBF]/50 dark:border-white/10 flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#8C5E5E] dark:text-[#E2BABA]">
          <span>Menu Rapide Noxélia ❀</span>
          <Sparkles className="w-3 h-3 text-[#B48A8A]" />
        </div>

        {/* Action: Open Quick Simulator Chat */}
        <button
          onClick={() => {
            onNavigateTab('simulator');
            onClose();
          }}
          className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F3F0] dark:hover:bg-[#282824] flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-[#5A5A40] dark:text-[#B48A8A]" />
            <span>Ouvrir Chat /say</span>
          </div>
          <span className="text-[10px] text-[#A89E8E] font-mono">/say</span>
        </button>

        {/* Action: Toggle TikTok Live */}
        <button
          onClick={() => {
            onToggleLive();
            onClose();
          }}
          className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F3F0] dark:hover:bg-[#282824] flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-rose-500" />
            <span>{isLive ? 'Arrière-plan Hors-Live' : 'Activer TikTok Live ❀'}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-rose-500 animate-pulse' : 'bg-gray-400'}`} />
        </button>

        {/* Action: Switch Theme (Day/Night) */}
        <button
          onClick={() => {
            onToggleTheme();
            onClose();
          }}
          className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F3F0] dark:hover:bg-[#282824] flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            {themeMode === 'day' ? (
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span>Mode {themeMode === 'day' ? 'Nuit 🌙' : 'Jour ☀️'}</span>
          </div>
          <span className="text-[10px] font-semibold text-[#8C5E5E] dark:text-[#E2BABA]">
            {themeMode === 'day' ? 'Jour' : 'Nuit'}
          </span>
        </button>

        {/* Action: Open Announcement Studio */}
        <button
          onClick={() => {
            onNavigateTab('announcements');
            onClose();
          }}
          className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F3F0] dark:hover:bg-[#282824] flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-[#B48A8A]" />
            <span>Créer Embed Discord</span>
          </div>
        </button>

        <div className="my-1 border-t border-[#D9CEBF]/50 dark:border-white/10" />

        {/* Action: Copy Discord ID */}
        <button
          onClick={handleCopyDiscordId}
          className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F3F0] dark:hover:bg-[#282824] flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[#7C7C6D]" />}
            <span>{copied ? 'ID Copié !' : 'Copier ID Discord'}</span>
          </div>
          <span className="text-[10px] text-[#A89E8E] font-mono">ID</span>
        </button>

        {/* Action: Refresh Data */}
        <button
          onClick={() => {
            onRefresh();
            onClose();
          }}
          className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F3F0] dark:hover:bg-[#282824] flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-[#5A5A40] dark:text-[#EAE3DB]" />
            <span>Rafraîchir les métriques</span>
          </div>
        </button>

        <div className="my-1 border-t border-[#D9CEBF]/50 dark:border-white/10" />

        {/* Auth / Login Action */}
        {isLoggedIn ? (
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-between text-left transition-colors font-semibold"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Se Déconnecter</span>
            </div>
          </button>
        ) : (
          <button
            onClick={() => {
              onOpenAuth();
              onClose();
            }}
            className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F3F0] dark:hover:bg-[#282824] text-[#5A5A40] dark:text-[#E2BABA] flex items-center justify-between text-left transition-colors font-semibold"
          >
            <div className="flex items-center gap-2">
              <LogIn className="w-3.5 h-3.5" />
              <span>Se Connecter / Auth</span>
            </div>
            <ShieldCheck className="w-3.5 h-3.5 text-[#B48A8A]" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
