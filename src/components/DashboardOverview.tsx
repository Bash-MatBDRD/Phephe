import React from 'react';
import { Users, Eye, Flame, MessageSquare, UserPlus, Radio, Video, Send, CheckCircle2, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TikTokLiveStats, StreamDataPoint, SayCommandLog } from '../types';

interface DashboardOverviewProps {
  stats: TikTokLiveStats;
  streamHistory: StreamDataPoint[];
  sayLogs: SayCommandLog[];
  onToggleLive: () => void;
  onPostLiveAnnouncement: () => void;
  onPostVideoAnnouncement: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats,
  streamHistory,
  sayLogs,
  onToggleLive,
  onPostLiveAnnouncement,
  onPostVideoAnnouncement,
}) => {
  return (
    <div className="space-y-6">
      {/* Stream Status Banner */}
      <div className={`p-6 rounded-[28px] border transition-all shadow-sm relative overflow-hidden ${
        stats.isLive
          ? 'bg-gradient-to-r from-white via-[#FDFBF7] to-[#F7F3F0] dark:from-[#1A1A18] dark:via-[#282824] dark:to-[#1A1A18] border-[#B48A8A]/40'
          : 'bg-white dark:bg-[#1A1A18] border-[#D9CEBF] dark:border-white/10'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-2xl ${stats.isLive ? 'bg-[#B48A8A]/15 text-[#8C5E5E] dark:text-[#E2BABA] border border-[#B48A8A]/30' : 'bg-[#EAE3DB] dark:bg-[#282824] text-[#7C7C6D]'}`}>
              <Radio className={`w-7 h-7 ${stats.isLive ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                  stats.isLive ? 'bg-[#B48A8A]/20 text-[#8C5E5E] dark:text-[#E2BABA] border border-[#B48A8A]/30' : 'bg-[#EAE3DB] dark:bg-[#282824] text-[#7C7C6D]'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${stats.isLive ? 'bg-[#B48A8A] animate-ping' : 'bg-[#9E9E8E]'}`} />
                  {stats.isLive ? 'LIVE TIKTOK ACTIF ❀' : 'HORS LIGNE'}
                </span>
                <span className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] font-mono">Compte : {stats.username}</span>
              </div>
              <h2 className="text-2xl font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] mt-1.5 tracking-tight">
                {stats.streamTitle}
              </h2>
              <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] mt-1 flex items-center gap-3">
                <span>Catégorie : <strong className="text-[#4A4A40] dark:text-[#EAE3DB]">{stats.category}</strong></span>
                <span>•</span>
                <span>Démarré à : <strong className="text-[#4A4A40] dark:text-[#EAE3DB]">{new Date(stats.startedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onToggleLive}
              className={`px-4.5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                stats.isLive
                  ? 'bg-[#B48A8A] hover:bg-[#A37979] text-white'
                  : 'bg-[#5A5A40] hover:bg-[#4A4A30] text-white'
              }`}
            >
              <Radio className="w-4 h-4" />
              {stats.isLive ? 'Arrêter le Live (Simulé)' : 'Lancer un Live TikTok (Simulé)'}
            </button>

            <button
              onClick={onPostLiveAnnouncement}
              className="px-4.5 py-2.5 rounded-full bg-white dark:bg-[#282824] hover:bg-[#FDFBF7] dark:hover:bg-[#33332D] text-[#5A5A40] dark:text-[#EAE3DB] border border-[#D9CEBF] dark:border-white/10 text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-[#B48A8A]" />
              Annoncer le Live sur Discord ❀
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Live Viewers */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A]">Spectateurs En Direct</span>
            <Users className="w-4 h-4 text-[#B48A8A]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB]">{stats.liveViewers}</span>
            <span className="text-xs text-[#8C5E5E] dark:text-[#E2BABA] font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-[11px] text-[#A89E8E] mt-1">Actifs en temps réel</p>
        </div>

        {/* Viewers Peak */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A]">Pic de Spectateurs</span>
            <Eye className="w-4 h-4 text-[#5A5A40] dark:text-[#B48A8A]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB]">{stats.peakViewers}</span>
            <span className="text-xs text-[#5A5A40] dark:text-[#A8A89A] font-semibold">Max session</span>
          </div>
          <p className="text-[11px] text-[#A89E8E] mt-1">Record du live actuel</p>
        </div>

        {/* Chat Speed */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A]">Vitesse du Chat</span>
            <MessageSquare className="w-4 h-4 text-[#5A5A40] dark:text-[#B48A8A]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB]">{stats.chatSpeedMsgsPerMin}</span>
            <span className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] font-medium">msg/min</span>
          </div>
          <p className="text-[11px] text-[#A89E8E] mt-1">Activité de la communauté</p>
        </div>

        {/* Likes Count */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A]">J'aime TikTok</span>
            <Heart className="w-4 h-4 text-[#B48A8A]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB]">{(stats.likeCount / 1000).toFixed(1)}k</span>
            <span className="text-xs text-[#8C5E5E] dark:text-[#E2BABA] font-semibold">+1.2k/5m</span>
          </div>
          <p className="text-[11px] text-[#A89E8E] mt-1">Interactions reçues</p>
        </div>

        {/* Follower Gain */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A]">Nouveaux Abonnés</span>
            <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB]">+{stats.followerGain}</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Gagnés ce live</span>
          </div>
          <p className="text-[11px] text-[#A89E8E] mt-1">Croissance durant le live</p>
        </div>
      </div>

      {/* Main Content Grid: Chart & Latest TikTok Video */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#B48A8A]" />
                Audience & Vitesse du Chat en Temps Réel
              </h3>
              <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A]">Évolution des spectateurs TikTok et du flux de messages Discord/TikTok</p>
            </div>
            <span className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] font-mono bg-[#F7F3F0] dark:bg-[#282824] px-2.5 py-1 rounded-full border border-[#D9CEBF] dark:border-white/10">
              Mise à jour / 15s
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={streamHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViewers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B48A8A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B48A8A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorChat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5A5A40" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5A5A40" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#D9CEBF" opacity={0.3} />
                <XAxis dataKey="time" stroke="#7C7C6D" fontSize={12} tickLine={false} />
                <YAxis stroke="#7C7C6D" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A18',
                    borderColor: '#282824',
                    borderRadius: '0.75rem',
                    color: '#EAE3DB',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="viewers" name="Spectateurs" stroke="#B48A8A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViewers)" />
                <Area type="monotone" dataKey="chatVelocity" name="Vitesse Chat (msg/min)" stroke="#5A5A40" strokeWidth={2} fillOpacity={1} fill="url(#colorChat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest TikTok Video Monitor & Announcer */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#8C5E5E] dark:text-[#E2BABA] uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#B48A8A]" />
                Dernière Vidéo TikTok
              </span>
              <span className="text-[11px] text-[#7C7C6D] dark:text-[#A8A89A]">{stats.latestVideo.postedAt}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#EAE3DB] dark:border-white/10 space-y-3">
              <h4 className="text-sm font-semibold text-[#33332D] dark:text-[#EAE3DB] leading-snug">
                {stats.latestVideo.title}
              </h4>

              <div className="grid grid-cols-3 gap-2 py-2.5 border-t border-b border-[#EAE3DB] dark:border-white/10 text-center">
                <div>
                  <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] block">Vues</span>
                  <span className="text-xs font-bold text-[#33332D] dark:text-[#EAE3DB]">{(stats.latestVideo.views / 1000).toFixed(1)}k</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] block">J'aime</span>
                  <span className="text-xs font-bold text-[#8C5E5E] dark:text-[#E2BABA]">{(stats.latestVideo.likes / 1000).toFixed(1)}k</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] block">Commentaires</span>
                  <span className="text-xs font-bold text-[#5A5A40] dark:text-[#EAE3DB]">{stats.latestVideo.comments}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#7C7C6D] dark:text-[#A8A89A] italic truncate">
                Lien : <a href={stats.latestVideo.url} target="_blank" rel="noopener noreferrer" className="text-[#8C5E5E] dark:text-[#E2BABA] hover:underline">{stats.latestVideo.url}</a>
              </p>
            </div>
          </div>

          <button
            onClick={onPostVideoAnnouncement}
            className="w-full mt-4 py-2.5 px-4 rounded-full bg-[#EAE3DB] dark:bg-[#282824] hover:bg-[#D9CEBF] text-[#33332D] dark:text-[#EAE3DB] border border-[#D9CEBF] dark:border-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-[#8C5E5E]" />
            Annoncer la Vidéo sur Discord ❀
          </button>
        </div>
      </div>

      {/* Recent /say Anonymized Activity Log */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B48A8A]" />
              Historique des Commandes /say & Annonces Anonymisées ❀
            </h3>
            <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A]">Le bot supprime le message d'origine pour préserver l'anonymat sur le serveur Discord</p>
          </div>
          <span className="text-xs bg-[#B48A8A]/15 text-[#8C5E5E] dark:text-[#E2BABA] border border-[#B48A8A]/30 px-3 py-1 rounded-full font-medium">
            Anonymat Garanti ❀
          </span>
        </div>

        <div className="space-y-2.5">
          {sayLogs.length === 0 ? (
            <p className="text-xs text-[#7C7C6D] italic p-3 text-center">Aucune commande /say exécutée récemment.</p>
          ) : (
            sayLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#EAE3DB] dark:border-white/10 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#B48A8A]/15 text-[#8C5E5E] border border-[#B48A8A]/20 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#33332D] dark:text-[#EAE3DB]">{log.senderName}</span>
                      <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A]">dans {log.channel}</span>
                      <span className="text-[10px] bg-[#EAE3DB] dark:bg-[#1A1A18] text-[#4A4A40] dark:text-[#A8A89A] px-2 py-0.5 rounded-full">Message original supprimé</span>
                    </div>
                    <p className="text-[#33332D] dark:text-[#EAE3DB] mt-1 font-sans bg-white dark:bg-[#1A1A18] p-2.5 rounded-xl border border-[#EAE3DB] dark:border-white/10 leading-relaxed">
                      "{log.messageContent}"
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] font-mono whitespace-nowrap">{log.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
