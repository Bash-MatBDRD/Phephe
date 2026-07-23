import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { DiscordSimulator } from './components/DiscordSimulator';
import { AnnouncementStudio } from './components/AnnouncementStudio';
import { BotConfigPanel } from './components/BotConfigPanel';
import { BotManagerPanel } from './components/BotManagerPanel';
import { CommunityCarePanel } from './components/CommunityCarePanel';
import { AuthModal } from './components/AuthModal';
import { ContextMenu, ContextMenuState } from './components/ContextMenu';
import { NavigationBar, TabType } from './components/NavigationBar';

import {
  INITIAL_TIKTOK_STATS,
  INITIAL_STREAM_HISTORY,
  INITIAL_DISCORD_MESSAGES,
  INITIAL_SAY_LOGS,
  DEFAULT_BOT_CONFIG,
} from './data/mockData';
import { TikTokLiveStats, StreamDataPoint, DiscordMessage, SayCommandLog, BotConfig, UserAccount, BotPresenceConfig, DiscordSalon } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [stats, setStats] = useState<TikTokLiveStats>(INITIAL_TIKTOK_STATS);
  const [streamHistory, setStreamHistory] = useState<StreamDataPoint[]>(INITIAL_STREAM_HISTORY);
  const [messages, setMessages] = useState<DiscordMessage[]>(INITIAL_DISCORD_MESSAGES);
  const [sayLogs, setSayLogs] = useState<SayCommandLog[]>(INITIAL_SAY_LOGS);
  const [config, setConfig] = useState<BotConfig>(DEFAULT_BOT_CONFIG);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Global State for Theme (Day / Night)
  const [themeMode, setThemeMode] = useState<'day' | 'night'>(() => {
    const saved = localStorage.getItem('noxelia_theme');
    return saved === 'night' ? 'night' : 'day';
  });

  // Right-Click Context Menu State
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
  });

  // Global State for Presence & Salons
  const [presence, setPresence] = useState<BotPresenceConfig>({
    status: 'online',
    activityType: 'STREAMING',
    activityName: 'Live TikTok',
    customStatus: '°+•Ɛs 🌙 Noxélia ✨ ໒꒱ •°',
    details: 'En direct sur TikTok @noxi_nick ❀',
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Persistent Auth Account State (No profile image)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('noxelia_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      id: 'usr-1',
      username: 'noxi_nick',
      displayName: 'Noxélia',
      role: 'Owner',
      isLoggedIn: true,
      lastLogin: 'Aujourd\'hui à 18:30',
    };
  });

  const [salons, setSalons] = useState<DiscordSalon[]>([
    { id: 'annonces-live', name: '#annonces-live', category: 'ANNONCES', topic: 'Annonces officielles des direct TikTok Noxélia ❀', unreadCount: 2 },
    { id: 'general-chat', name: '#général', category: 'COMMUNAUTÉ', topic: 'Espace de discussion bienveillant pour la communauté Noxélia ❀' },
    { id: 'commandes-bot', name: '#commandes-bot', category: 'BOT', topic: 'Commandes du bot et test de /say en direct' },
    { id: 'soutien-bien-etre', name: '#soutien-bien-être', category: 'SOUTIEN', topic: 'Entraide, conseils et mots doux entre membres' },
  ]);

  // Sync Day / Night Theme Class to HTML & Body
  useEffect(() => {
    if (themeMode === 'night') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('night-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('night-mode');
    }
    localStorage.setItem('noxelia_theme', themeMode);
  }, [themeMode]);

  // Periodic simulation update for stats & chart data
  useEffect(() => {
    const interval = setInterval(() => {
      if (stats.isLive) {
        const deltaViewers = Math.floor(Math.random() * 21) - 10;
        const newViewers = Math.max(150, stats.liveViewers + deltaViewers);
        const newPeak = Math.max(stats.peakViewers, newViewers);
        const newLikes = stats.likeCount + Math.floor(Math.random() * 85);
        const newChatSpeed = Math.floor(Math.random() * 40) + 120;

        setStats((prev) => ({
          ...prev,
          liveViewers: newViewers,
          peakViewers: newPeak,
          likeCount: newLikes,
          chatSpeedMsgsPerMin: newChatSpeed,
        }));

        const nowTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        setStreamHistory((prev) => {
          const updated = [...prev];
          if (updated.length > 8) updated.shift();
          updated.push({
            time: nowTime,
            viewers: newViewers,
            chatVelocity: newChatSpeed,
            likesK: parseFloat((newLikes / 1000).toFixed(1)),
          });
          return updated;
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [stats.isLive, stats.liveViewers, stats.peakViewers, stats.likeCount]);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleToggleTheme = () => {
    const newMode = themeMode === 'day' ? 'night' : 'day';
    setThemeMode(newMode);
    showToast(`Passage en mode ${newMode === 'night' ? 'Nuit 🌙' : 'Jour ☀️'} ❀`);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleLoginUser = (username: string, role: 'Owner' | 'Administrator' | 'Moderator' | 'VIP Member') => {
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      username,
      displayName: username === 'noxi_nick' ? 'Noxélia' : username,
      role,
      isLoggedIn: true,
      lastLogin: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
    setCurrentUser(newUser);
    localStorage.setItem('noxelia_user', JSON.stringify(newUser));
  };

  const handleLogoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('noxelia_user');
  };

  const handleToggleLive = () => {
    const nextState = !stats.isLive;
    setStats((prev) => ({
      ...prev,
      isLive: nextState,
      liveViewers: nextState ? 380 : 0,
    }));

    if (nextState) {
      showToast('Live TikTok démarré ! Une annonce automatique a été préparée ❀');
      const liveEmbedMsg: DiscordMessage = {
        id: `msg_live_${Date.now()}`,
        author: {
          name: config.botName,
          avatar: config.avatarUrl,
          isBot: true,
          tag: 'BOT',
          roleColor: '#ec4899',
        },
        content: `@everyone 📢 **DIRECT TIKTOK EN COURS !**`,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        embed: {
          title: `🔴 ${stats.displayName} est en LIVE sur TikTok !`,
          description: `${stats.streamTitle}\n\nVenez nous rejoindre pour discuter et passer un moment très agréable ensemble~ ❀`,
          color: '#ff0050',
          fields: [
            { name: 'Catégorie', value: stats.category, inline: true },
            { name: 'Spectateurs', value: `${stats.liveViewers} en direct`, inline: true },
          ],
          footer: 'Phephe Bot ❀ • TikTok Live Community',
        },
      };
      setMessages((prev) => [...prev, liveEmbedMsg]);
    } else {
      showToast('Live TikTok arrêté (simulation)');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Données TikTok & Discord rafraîchies ❀');
    }, 600);
  };

  const handleSendMessageToSimulator = (content: string, channel: string) => {
    const isBotReplying = content.includes('❀') || content.includes('coucou~') || content.includes('Comment s\'est passée');

    const newMsg: DiscordMessage = {
      id: `m_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      author: isBotReplying
        ? {
            name: config.botName,
            avatar: config.avatarUrl,
            isBot: true,
            tag: 'BOT',
            roleColor: '#ec4899',
          }
        : {
            name: currentUser?.displayName || 'Membre_Community',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          },
      content,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  const handleSayCommandExecuted = (log: SayCommandLog) => {
    setSayLogs((prev) => [log, ...prev]);
    showToast(`Commande /say exécutée : message original supprimé pour anonymat ❀`);
  };

  const handlePostEmbedToSimulator = (embedObj: any, pingText: string) => {
    const pingContent = pingText !== 'none' ? `${pingText} 📢` : '';
    const newEmbedMsg: DiscordMessage = {
      id: `embed_msg_${Date.now()}`,
      author: {
        name: config.botName,
        avatar: config.avatarUrl,
        isBot: true,
        tag: 'BOT',
        roleColor: '#ec4899',
      },
      content: pingContent,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      embed: embedObj,
    };

    setMessages((prev) => [...prev, newEmbedMsg]);
    showToast('Annonce publiée dans le simulateur Discord (#annonces-live) ❀');
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className="min-h-screen bg-[#F7F3F0] dark:bg-[#0F0F0D] text-[#4A4A40] dark:text-[#EAE3DB] font-sans selection:bg-[#B48A8A] selection:text-white pb-12 transition-colors duration-250"
    >
      {/* Right-Click Context Menu */}
      <ContextMenu
        contextMenu={contextMenu}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        onRefresh={handleRefresh}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onToggleLive={handleToggleLive}
        isLive={stats.isLive}
        isLoggedIn={!!currentUser?.isLoggedIn}
        onLogout={handleLogoutUser}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-[#1A1A18] border border-[#B48A8A]/50 text-[#33332D] dark:text-[#EAE3DB] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#B48A8A]" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLoginUser}
        onLogout={handleLogoutUser}
      />

      {/* Top Header */}
      <Header
        stats={stats}
        config={config}
        onToggleLive={handleToggleLive}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* Redesigned Category Navigation Bar */}
        <NavigationBar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />

        {/* Tab Views with Motion Transition Effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {activeTab === 'dashboard' && (
              <DashboardOverview
                stats={stats}
                streamHistory={streamHistory}
                sayLogs={sayLogs}
                onToggleLive={handleToggleLive}
                onPostLiveAnnouncement={() =>
                  handlePostEmbedToSimulator(
                    {
                      title: `🔴 ${stats.displayName} est actuellement en LIVE TikTok !`,
                      description: `${stats.streamTitle}\n\nVenez passer un moment chaleureux et poser vos questions dans le chat ❀`,
                      color: '#ff0050',
                      fields: [
                        { name: 'Catégorie', value: stats.category, inline: true },
                        { name: 'Spectateurs', value: `${stats.liveViewers} en direct`, inline: true },
                      ],
                      footer: 'Phephe Bot ❀ • TikTok Live Community',
                    },
                    '@everyone'
                  )
                }
                onPostVideoAnnouncement={() =>
                  handlePostEmbedToSimulator(
                    {
                      title: `🎥 Nouvelle Vidéo TikTok disponible !`,
                      description: `${stats.latestVideo.title}\n\nAllez jeter un coup d'œil et laissez votre petit commentaire~ ❀`,
                      color: '#a855f7',
                      fields: [
                        { name: 'Auteur', value: stats.username, inline: true },
                        { name: 'Vues', value: `${stats.latestVideo.views}`, inline: true },
                      ],
                      footer: 'Phephe Bot ❀ • TikTok Feed',
                    },
                    '@Notifications TikTok'
                  )
                }
              />
            )}

            {activeTab === 'simulator' && (
              <DiscordSimulator
                messages={messages}
                config={config}
                stats={stats}
                salons={salons}
                onSendMessage={handleSendMessageToSimulator}
                onSayCommandExecuted={handleSayCommandExecuted}
              />
            )}

            {activeTab === 'bot-manager' && (
              <BotManagerPanel
                config={config}
                presence={presence}
                salons={salons}
                onUpdatePresence={(p) => {
                  setPresence(p);
                  showToast(`Statut Discord mis à jour (${p.status}) ❀`);
                }}
                onUpdateSalonTopic={(salonId, topic) => {
                  setSalons((prev) =>
                    prev.map((s) => (s.id === salonId ? { ...s, topic } : s))
                  );
                  showToast('Sujet du salon mis à jour ! ❀');
                }}
                onSendTestMessageToSalon={(channelName, content) => {
                  handleSendMessageToSimulator(content, channelName);
                  showToast(`Message envoyé dans ${channelName} ❀`);
                }}
              />
            )}

            {activeTab === 'community-care' && (
              <CommunityCarePanel
                config={config}
                sayLogs={sayLogs}
                onClearLogs={() => {
                  setSayLogs([]);
                  showToast('Logs de modération effacés ❀');
                }}
              />
            )}

            {activeTab === 'announcements' && (
              <AnnouncementStudio
                config={config}
                stats={stats}
                onPostToSimulator={handlePostEmbedToSimulator}
              />
            )}

            {activeTab === 'config' && (
              <BotConfigPanel
                config={config}
                onUpdateConfig={(updated) => {
                  setConfig(updated);
                  showToast('Configuration enregistrée ! ❀');
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
