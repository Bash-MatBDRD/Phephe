import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Bot, 
  HeartHandshake, 
  Bell, 
  Settings, 
  Sparkles,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

export type TabType = 'dashboard' | 'simulator' | 'bot-manager' | 'community-care' | 'announcements' | 'config';

interface NavigationBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
}

interface CategoryItem {
  id: TabType;
  label: string;
  categoryName: string;
  badge?: string;
  icon: React.ElementType;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'dashboard',
    label: "Vue d'ensemble",
    categoryName: "Statistiques & Live",
    badge: "Direct ❀",
    icon: LayoutDashboard,
  },
  {
    id: 'simulator',
    label: "Simulateur /say",
    categoryName: "Chat Discord",
    badge: "Anonyme",
    icon: MessageSquare,
  },
  {
    id: 'bot-manager',
    label: "Salons & Activité",
    categoryName: "Gestion Discord",
    badge: "Bot Config",
    icon: Bot,
  },
  {
    id: 'community-care',
    label: "Soutien & Modération",
    categoryName: "Espace Douceur",
    badge: "Soin ❀",
    icon: HeartHandshake,
  },
  {
    id: 'announcements',
    label: "Studio Embed",
    categoryName: "Annonces",
    badge: "Webhook",
    icon: Bell,
  },
  {
    id: 'config',
    label: "Configuration",
    categoryName: "Paramètres",
    badge: "Persona",
    icon: Settings,
  },
];

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeTab,
  onTabChange,
  unreadCount,
}) => {
  return (
    <nav className="space-y-2">
      {/* Category Section Title Bar */}
      <div className="flex items-center justify-between px-2 text-xs text-[#7C7C6D] dark:text-[#A8A89A]">
        <span className="font-semibold tracking-wide flex items-center gap-1.5 uppercase text-[11px] text-[#8C5E5E] dark:text-[#E2BABA]">
          <Layers className="w-3.5 h-3.5" />
          Catégories du Panel Noxélia
        </span>
        <span className="text-[10px] bg-white/80 dark:bg-[#282824] px-2 py-0.5 rounded-full border border-[#D9CEBF] dark:border-white/10 font-mono">
          6 Modules Actifs ❀
        </span>
      </div>

      {/* Main Category Bar */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 p-1.5 rounded-2xl shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none transition-colors duration-300">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onTabChange(cat.id)}
              className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'text-white shadow-md'
                  : 'text-[#7C7C6D] dark:text-[#A8A89A] hover:text-[#33332D] dark:hover:text-white hover:bg-[#F7F3F0] dark:hover:bg-[#282824]'
              }`}
            >
              {/* Active Slider Background Animation */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#5A5A40] dark:bg-[#B48A8A] rounded-xl shadow-sm z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8C5E5E] dark:text-[#D4A3A3]'}`} />
                <span>{cat.label}</span>
              </span>

              {cat.badge && (
                <span
                  className={`relative z-10 text-[9px] px-2 py-0.5 rounded-full font-bold transition-all ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#EAE3DB] dark:bg-[#282824] text-[#8C5E5E] dark:text-[#E2BABA] border border-[#D9CEBF] dark:border-white/10'
                  }`}
                >
                  {cat.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
