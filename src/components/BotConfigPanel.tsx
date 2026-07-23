import React, { useState } from 'react';
import { Settings, ShieldCheck, Heart, Sparkles, Bot, Radio, CheckCircle2, Save, Terminal, AlertCircle } from 'lucide-react';
import { BotConfig } from '../types';

interface BotConfigPanelProps {
  config: BotConfig;
  onUpdateConfig: (updated: BotConfig) => void;
}

export const BotConfigPanel: React.FC<BotConfigPanelProps> = ({ config, onUpdateConfig }) => {
  const [formData, setFormData] = useState<BotConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-xl font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#B48A8A]" />
            Configuration du Bot & Personnalité Phephe Aesthetic ❀
          </h2>
          <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] mt-1">
            Ajustez le comportement de votre bot Discord, la règle stricte sur les émojis ❀ et les réponses automatiques.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Modifications enregistrées avec succès ! ❀</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Identity & Emoji Rules */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2 pb-2 border-b border-[#D9CEBF] dark:border-white/10">
            <Bot className="w-4 h-4 text-[#B48A8A]" />
            Identité & Règle Stricte sur les Émojis
          </h3>

          {/* Bot Name */}
          <div>
            <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">Nom du Bot Discord</label>
            <input
              type="text"
              value={formData.botName}
              onChange={(e) => setFormData({ ...formData, botName: e.target.value })}
              className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">URL de l'Avatar</label>
            <input
              type="url"
              value={formData.avatarUrl}
              onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
              className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40] font-mono"
            />
          </div>

          {/* Strict Emoji Rule Toggle */}
          <div className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#EAE3DB] dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#8C5E5E] dark:text-[#E2BABA] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B48A8A]" />
                Filtre Strict Émojis : Seul "❀" Autorisé
              </label>
              <input
                type="checkbox"
                checked={formData.strictEmojiFilter}
                onChange={(e) => setFormData({ ...formData, strictEmojiFilter: e.target.checked })}
                className="w-4 h-4 rounded text-[#5A5A40] focus:ring-[#5A5A40] bg-white dark:bg-[#1A1A18] border-[#D9CEBF] dark:border-white/10"
              />
            </div>
            <p className="text-[11px] text-[#7C7C6D] dark:text-[#A8A89A] leading-relaxed">
              Conformément à la consigne : le bot ne répondra avec <strong>aucun émoji standard</strong> (pas de ❤️, 😊, ✨, etc.) à l'exception stricte du symbole esthétique fleur <strong>"❀"</strong>.
            </p>
          </div>

          {/* Auto Greeting Ask About Day */}
          <div className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#EAE3DB] dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#B48A8A]" />
                Réponse Automatique aux Salutations ("Bonjour / Coucou")
              </label>
              <input
                type="checkbox"
                checked={formData.greetingAskAboutDay}
                onChange={(e) => setFormData({ ...formData, greetingAskAboutDay: e.target.checked })}
                className="w-4 h-4 rounded text-[#5A5A40] focus:ring-[#5A5A40] bg-white dark:bg-[#1A1A18] border-[#D9CEBF] dark:border-white/10"
              />
            </div>
            <p className="text-[11px] text-[#7C7C6D] dark:text-[#A8A89A] leading-relaxed">
              Si quelqu'un dit bonjour/salut dans le chat, le bot hésite pas à répondre par-dessus en lui demandant gentiment :
              <em className="text-[#8C5E5E] dark:text-[#E2BABA] block mt-1">"Oh coucou~ ❀ Comment s'est passée ta journée ? J'espère que tu as pu te reposer un peu~ ❀"</em>
            </p>
          </div>
        </div>

        {/* Right Column: TikTok Sync & Active Commands List */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2 pb-2 border-b border-[#D9CEBF] dark:border-white/10">
            <Terminal className="w-4 h-4 text-[#B48A8A]" />
            Commandes Discord & Fréquence TikTok Sync
          </h3>

          {/* Sync Interval */}
          <div>
            <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">
              Intervalle de vérification TikTok Live (secondes)
            </label>
            <input
              type="number"
              min={5}
              max={300}
              value={formData.tiktokSyncIntervalSec}
              onChange={(e) => setFormData({ ...formData, tiktokSyncIntervalSec: Number(e.target.value) })}
              className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
            />
          </div>

          {/* Active Bot Features Summary */}
          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-bold text-[#33332D] dark:text-[#EAE3DB] block">Fonctionnalités Actives sur le Bot :</span>

            <div className="p-3.5 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#EAE3DB] dark:border-white/10 text-xs space-y-1">
              <span className="font-mono text-[#8C5E5E] dark:text-[#E2BABA] font-bold">/say [message]</span>
              <p className="text-[#7C7C6D] dark:text-[#A8A89A] text-[11px]">
                Le bot supprime immédiatement votre message et le ré-émet sous l'identité du bot pour garantir l'anonymat sur le serveur ❀
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#EAE3DB] dark:border-white/10 text-xs space-y-1">
              <span className="font-mono text-[#5A5A40] dark:text-[#EAE3DB] font-bold">TikTok Live & Video Webhook</span>
              <p className="text-[#7C7C6D] dark:text-[#A8A89A] text-[11px]">
                Envoie automatiquement des annonces enrichies avec boutons lors des démarrages de live ou sorties de nouvelles vidéos.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#EAE3DB] dark:border-white/10 text-xs space-y-1">
              <span className="font-mono text-[#8C5E5E] dark:text-[#E2BABA] font-bold">Moteur Phephe Aesthetic ❀</span>
              <p className="text-[#7C7C6D] dark:text-[#A8A89A] text-[11px]">
                Bot communautaire avec style ultra doux, attentionné et réconfortant.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 px-4 rounded-full bg-[#5A5A40] dark:bg-[#B48A8A] hover:opacity-90 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Enregistrer la Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
