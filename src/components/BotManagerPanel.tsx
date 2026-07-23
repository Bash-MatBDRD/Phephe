import React, { useState } from 'react';
import { BotPresenceConfig, DiscordSalon, BotConfig } from '../types';
import { 
  Bot, Hash, Sparkles, Activity, ShieldCheck, MessageSquare, 
  Send, CheckCircle2, Lock, Eye, Bell, Heart, Terminal, Globe
} from 'lucide-react';

interface BotManagerPanelProps {
  config: BotConfig;
  presence: BotPresenceConfig;
  onUpdatePresence: (newPresence: BotPresenceConfig) => void;
  salons: DiscordSalon[];
  onUpdateSalonTopic: (salonId: string, topic: string) => void;
  onSendTestMessageToSalon: (channelName: string, content: string) => void;
}

export const BotManagerPanel: React.FC<BotManagerPanelProps> = ({
  config,
  presence,
  onUpdatePresence,
  salons,
  onUpdateSalonTopic,
  onSendTestMessageToSalon,
}) => {
  const [activeTab, setActiveTab] = useState<'presence' | 'salons' | 'say-logs'>('presence');
  const [testMessage, setTestMessage] = useState<string>('Coucou tout le monde~ ❀ Bienvenue sur le salon général !');
  const [selectedChannel, setSelectedChannel] = useState<string>('#général');
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [topicDraft, setTopicDraft] = useState<string>('');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const handlePresenceChange = (field: keyof BotPresenceConfig, value: any) => {
    const updated = { ...presence, [field]: value };
    onUpdatePresence(updated);
    setSavedNotification('Statut de présence Discord mis à jour ! ❀');
    setTimeout(() => setSavedNotification(null), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'dnd': return 'bg-rose-500';
      case 'idle': return 'bg-amber-500';
      case 'offline': return 'bg-slate-400';
      default: return 'bg-emerald-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return '🟢 En Ligne (Online)';
      case 'dnd': return '⛔ Ne Pas Déranger (DND)';
      case 'idle': return '🌙 Inactif (Idle)';
      case 'offline': return '⚪ Invisible / Hors Ligne';
      default: return 'En Ligne';
    }
  };

  const handleSaveTopic = (salonId: string) => {
    onUpdateSalonTopic(salonId, topicDraft);
    setEditingTopicId(null);
    setSavedNotification('Sujet du salon mis à jour ! ❀');
    setTimeout(() => setSavedNotification(null), 3000);
  };

  const handleSendToSalon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testMessage.trim()) return;
    onSendTestMessageToSalon(selectedChannel, testMessage);
    setSavedNotification(`Message du bot envoyé dans ${selectedChannel} ! ❀`);
    setTestMessage('');
    setTimeout(() => setSavedNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Tab Switcher */}
      <div className="p-6 bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#B48A8A]" />
            <h2 className="text-xl font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB]">
              Gestionnaire du Bot Discord & Salons
            </h2>
          </div>
          <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] mt-1">
            Gérez le Rich Presence, l'activité en temps réel (Online, DND, Offline) et tous les salons textuels du serveur.
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-2 bg-[#F7F3F0] dark:bg-[#282824] p-1.5 rounded-full border border-[#D9CEBF] dark:border-white/10">
          <button
            onClick={() => setActiveTab('presence')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'presence'
                ? 'bg-[#5A5A40] dark:bg-[#B48A8A] text-white shadow-sm'
                : 'text-[#7C7C6D] dark:text-[#A8A89A] hover:bg-white dark:hover:bg-[#1A1A18]'
            }`}
          >
            Activity & Presence
          </button>
          <button
            onClick={() => setActiveTab('salons')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'salons'
                ? 'bg-[#5A5A40] dark:bg-[#B48A8A] text-white shadow-sm'
                : 'text-[#7C7C6D] dark:text-[#A8A89A] hover:bg-white dark:hover:bg-[#1A1A18]'
            }`}
          >
            Salons & Messages ({salons.length})
          </button>
        </div>
      </div>

      {savedNotification && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === 'presence' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Controls */}
          <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 space-y-5 shadow-sm">
            <h3 className="text-base font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2 pb-3 border-b border-[#D9CEBF] dark:border-white/10">
              <Activity className="w-4 h-4 text-[#B48A8A]" />
              Configuration Rich Presence & Statut
            </h3>

            {/* Status Picker (Online, DND, Idle, Offline) */}
            <div>
              <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-2">
                Statut du Bot (Pastille Discord)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['online', 'dnd', 'idle', 'offline'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handlePresenceChange('status', st)}
                    className={`p-2.5 rounded-2xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      presence.status === st
                        ? 'bg-[#5A5A40] dark:bg-[#B48A8A] text-white border-transparent shadow-sm'
                        : 'bg-[#FDFBF7] dark:bg-[#282824] border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] hover:bg-white'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(st)}`} />
                    <span className="capitalize">{st}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Type (Playing, Streaming, Listening, Watching) */}
            <div>
              <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-2">
                Type d'Activité
              </label>
              <select
                value={presence.activityType}
                onChange={(e) => handlePresenceChange('activityType', e.target.value)}
                className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
              >
                <option value="PLAYING">Joue à (Playing)</option>
                <option value="STREAMING">En Direct sur (Streaming)</option>
                <option value="LISTENING">Écoute (Listening to)</option>
                <option value="WATCHING">Regarde (Watching)</option>
                <option value="CUSTOM">Statut Personnalisé (Custom)</option>
              </select>
            </div>

            {/* Activity Name */}
            <div>
              <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">
                Nom du Jeu / Titre d'Activité
              </label>
              <input
                type="text"
                value={presence.activityName}
                onChange={(e) => handlePresenceChange('activityName', e.target.value)}
                placeholder="Ex: Roblox MM2 / Live TikTok..."
                className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
              />
            </div>

            {/* Custom Status Symbol / Text */}
            <div>
              <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">
                Statut Personnalisé (Aesthetic Symbol)
              </label>
              <input
                type="text"
                value={presence.customStatus}
                onChange={(e) => handlePresenceChange('customStatus', e.target.value)}
                placeholder="Ex: °+•Ɛs 🌙 Noxélia ✨ ໒꒱ •°"
                className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40] font-mono"
              />
            </div>

            {/* Details / Subtext */}
            <div>
              <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">
                Détails supplémentaires (Sous-titre)
              </label>
              <input
                type="text"
                value={presence.details || ''}
                onChange={(e) => handlePresenceChange('details', e.target.value)}
                placeholder="Ex: En direct sur TikTok @noxi_nick ❀"
                className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
              />
            </div>
          </div>

          {/* Right: Live Preview of Discord User Card */}
          <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-base font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2 pb-3 border-b border-[#D9CEBF] dark:border-white/10 mb-5">
                <Eye className="w-4 h-4 text-[#B48A8A]" />
                Aperçu de la Carte de Profil Discord du Bot
              </h3>

              {/* Discord Profile Card Shell */}
              <div className="bg-[#232428] text-white rounded-2xl overflow-hidden shadow-xl border border-slate-700/60 max-w-sm mx-auto">
                {/* Banner */}
                <div className="h-20 bg-gradient-to-r from-[#8C5E5E] via-[#B48A8A] to-[#5A5A40] relative" />

                {/* Avatar & Status dot */}
                <div className="px-4 pb-4 pt-0 relative">
                  <div className="relative -mt-10 inline-block">
                    <img
                      src={config.avatarUrl}
                      alt={config.botName}
                      className="w-20 h-20 rounded-full object-cover border-4 border-[#232428]"
                    />
                    <span
                      className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-[#232428] ${getStatusColor(presence.status)}`}
                      title={getStatusLabel(presence.status)}
                    />
                  </div>

                  {/* Name & Badge */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-base text-white">{config.botName}</h4>
                      <span className="bg-[#5865F2] text-white text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                        BOT
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">phephe_bot#0001</p>
                  </div>

                  {/* Custom Status */}
                  {presence.customStatus && (
                    <div className="mt-3 p-2 bg-[#111214] rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center gap-2 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span className="truncate">{presence.customStatus}</span>
                    </div>
                  )}

                  {/* Activity Card */}
                  <div className="mt-3 p-3 bg-[#111214] rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      ACTIVITÉ ACTUELLE
                    </span>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {presence.activityType} {presence.activityName}
                        </p>
                        {presence.details && (
                          <p className="text-[11px] text-slate-400">{presence.details}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bot Role Badge */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>Rôle : Bot Officiel ❀</span>
                    <span className="text-emerald-400 font-mono">{getStatusLabel(presence.status)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3.5 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[11px] text-[#7C7C6D] dark:text-[#A8A89A]">
              💡 <strong>Astuce Rich Presence :</strong> Les abonnés Discord verront ce statut en temps réel sur le panneau des membres !
            </div>
          </div>
        </div>
      )}

      {/* Salons & Dispatcher Tab */}
      {activeTab === 'salons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Salons List */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2 pb-3 border-b border-[#D9CEBF] dark:border-white/10">
              <Hash className="w-4 h-4 text-[#B48A8A]" />
              Salons Textuels du Serveur TikTok Discord
            </h3>

            <div className="space-y-3">
              {salons.map((salon) => (
                <div
                  key={salon.id}
                  className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-[#7C7C6D]" />
                      <span className="font-bold text-sm text-[#33332D] dark:text-[#EAE3DB]">{salon.name}</span>
                      <span className="text-[10px] bg-[#EAE3DB] dark:bg-[#33332D] text-[#7C7C6D] dark:text-[#A8A89A] px-2 py-0.5 rounded-full uppercase font-mono">
                        {salon.category}
                      </span>
                      {salon.isPrivate && (
                        <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Privé
                        </span>
                      )}
                    </div>

                    {editingTopicId === salon.id ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="text"
                          value={topicDraft}
                          onChange={(e) => setTopicDraft(e.target.value)}
                          className="flex-1 bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] text-xs px-3 py-1.5 rounded-xl"
                        />
                        <button
                          onClick={() => handleSaveTopic(salon.id)}
                          className="px-3 py-1 bg-[#5A5A40] text-white text-xs font-semibold rounded-xl"
                        >
                          Enregistrer
                        </button>
                        <button
                          onClick={() => setEditingTopicId(null)}
                          className="px-2 py-1 text-xs text-[#7C7C6D]"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] leading-relaxed">
                        {salon.topic}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingTopicId(salon.id);
                        setTopicDraft(salon.topic);
                      }}
                      className="px-3 py-1.5 rounded-full bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 text-[#5A5A40] dark:text-[#EAE3DB] text-xs font-medium hover:bg-[#EAE3DB]"
                    >
                      Éditer Sujet
                    </button>
                    <button
                      onClick={() => setSelectedChannel(salon.name)}
                      className="px-3 py-1.5 rounded-full bg-[#5A5A40] dark:bg-[#B48A8A] text-white text-xs font-medium hover:opacity-90"
                    >
                      Poster Ici
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Post Dispatcher to Salon */}
          <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2 pb-3 border-b border-[#D9CEBF] dark:border-white/10">
                <Send className="w-4 h-4 text-[#B48A8A]" />
                Envoyer un Message du Bot dans un Salon
              </h3>

              <form onSubmit={handleSendToSalon} className="space-y-4 mt-4">
                <div>
                  <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">
                    Salon Cible
                  </label>
                  <select
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                    className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
                  >
                    {salons.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">
                    Message du Bot (Sera posté avec ❀)
                  </label>
                  <textarea
                    rows={4}
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs p-3.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-full bg-[#5A5A40] dark:bg-[#B48A8A] hover:opacity-90 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Publier dans {selectedChannel}
                </button>
              </form>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[11px] text-[#7C7C6D] dark:text-[#A8A89A] mt-4">
              ❀ Le message apparaîtra instantanément sur le simulateur Discord sous l'identité de {config.botName}.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
