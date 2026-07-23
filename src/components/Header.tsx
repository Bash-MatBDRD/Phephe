import React from 'react';
import { Radio, Sparkles, RefreshCw, ExternalLink, Sun, Moon, UserCheck, Lock, User } from 'lucide-react';
import { TikTokLiveStats, BotConfig, ThemeMode, UserAccount } from '../types';

interface HeaderProps {
  stats: TikTokLiveStats;
  config: BotConfig;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  user?: UserAccount | null;
  currentUser?: UserAccount | null;
  onOpenAuthModal?: () => void;
  onOpenAuth?: () => void;
  onToggleLive: () => void;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  config,
  themeMode,
  onToggleTheme,
  user,
  currentUser,
  onOpenAuthModal,
  onOpenAuth,
  onToggleLive,
  isRefreshing,
  onRefresh,
}) => {
  const activeUser = user || currentUser || {
    id: 'usr-default',
    username: 'noxi_nick',
    displayName: 'Noxélia',
    role: 'Owner',
    isLoggedIn: true,
  };

  const handleAuthClick = onOpenAuthModal || onOpenAuth || (() => {});

  return (
    <header className="bg-[#EAE3DB] dark:bg-[#1A1A18] border-b border-[#D9CEBF] dark:border-white/10 sticky top-0 z-40 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Bot Identity */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-[#D9CEBF] dark:bg-[#282824] p-0.5 shadow-md border border-[#C8BBAA] dark:border-white/10">
              <img
                src={config.avatarUrl}
                alt={config.botName}
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#EAE3DB] dark:border-[#1A1A18]" title="Bot Discord actif" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif-aesthetic italic font-bold text-[#33332D] dark:text-[#EAE3DB] tracking-tight flex items-center gap-1.5">
                {config.botName}
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#B48A8A]/15 dark:bg-[#B48A8A]/25 text-[#8C5E5E] dark:text-[#E2BABA] rounded-full border border-[#B48A8A]/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#B48A8A]" />
                Aesthetic Care ❀
              </span>
            </div>
            <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] flex items-center gap-2 mt-0.5">
              <span>Phephe TikTok & Discord Manager</span>
              <span className="text-[#A89E8E]">•</span>
              <span className="text-[#8C5E5E] dark:text-[#D4A3A3] font-medium">Commande /say active ❀</span>
            </p>
          </div>
        </div>

        {/* Live Status Indicator & Quick Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* TikTok Live Status Switch Badge */}
          <button
            onClick={onToggleLive}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all shadow-sm ${
              stats.isLive
                ? 'bg-[#B48A8A]/20 border-[#B48A8A]/40 text-[#8C5E5E] dark:text-[#E2BABA] hover:bg-[#B48A8A]/30'
                : 'bg-white dark:bg-[#282824] border-[#D9CEBF] dark:border-white/10 text-[#7C7C6D] dark:text-[#A8A89A]'
            }`}
            title="Cliquer pour basculer le statut TikTok Live"
          >
            <span className={`w-2 h-2 rounded-full ${stats.isLive ? 'bg-[#B48A8A] animate-ping' : 'bg-[#9E9E8E]'}`} />
            <Radio className="w-3.5 h-3.5 text-[#8C5E5E]" />
            <span className="hidden sm:inline">{stats.isLive ? 'LIVE TIKTOK EN COURS ❀' : 'TIKTOK HORS LIGNE'}</span>
          </button>

          {/* Functional Clean Day / Night Theme Switch Button (No Liquid Glass) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-xs font-bold text-[#33332D] dark:text-[#EAE3DB] hover:bg-[#FDFBF7] dark:hover:bg-[#33332D] transition-all shadow-sm"
            title={`Passer en mode ${themeMode === 'day' ? 'Nuit (Sombre)' : 'Jour (Clair)'}`}
          >
            {themeMode === 'day' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Jour</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Nuit</span>
              </>
            )}
          </button>

          {/* Refresh Data Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-full bg-white dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#5A5A40] dark:text-[#EAE3DB] hover:bg-[#FDFBF7] dark:hover:bg-[#33332D] transition-all disabled:opacity-50 shadow-sm"
            title="Rafraîchir les métriques"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#B48A8A]' : ''}`} />
          </button>

          {/* TikTok Profile Link */}
          <a
            href="https://www.tiktok.com/@noxi_nick"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5A5A40] dark:bg-[#B48A8A] text-white hover:opacity-90 text-xs font-medium transition-all shadow-sm"
          >
            <span>@noxi_nick</span>
            <ExternalLink className="w-3 h-3 text-white/80" />
          </a>

          {/* Auth Button / Admin Access Badge (No User Photo) */}
          <button
            onClick={handleAuthClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 hover:border-[#5A5A40] text-xs font-medium text-[#33332D] dark:text-[#EAE3DB] transition-all shadow-sm"
            title="Gérer l'authentification et votre compte"
          >
            <div className="w-5 h-5 rounded-full bg-[#B48A8A]/20 dark:bg-[#B48A8A]/30 text-[#8C5E5E] dark:text-[#E2BABA] flex items-center justify-center font-bold text-[10px]">
              <User className="w-3 h-3" />
            </div>
            <span className="max-w-[100px] sm:max-w-none truncate font-bold">{activeUser.displayName || activeUser.username}</span>
            {activeUser.isLoggedIn ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <UserCheck className="w-3 h-3" />
                <span>Connecté</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-[#8C5E5E] dark:text-[#E2BABA] font-bold bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                <Lock className="w-3 h-3" />
                <span>Login</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

