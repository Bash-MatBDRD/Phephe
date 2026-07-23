import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, AlertCircle, Link, Copy, Eye, Radio, Bell, Video } from 'lucide-react';
import { BotConfig, TikTokLiveStats } from '../types';

interface AnnouncementStudioProps {
  config: BotConfig;
  stats: TikTokLiveStats;
  onPostToSimulator: (embed: any, pingText: string) => void;
}

export const AnnouncementStudio: React.FC<AnnouncementStudioProps> = ({
  config,
  stats,
  onPostToSimulator,
}) => {
  const [announcementType, setAnnouncementType] = useState<'LIVE' | 'VIDEO' | 'COMMUNITY'>('LIVE');
  const [title, setTitle] = useState<string>('🔴 Noxélia ❀ est actuellement en LIVE TikTok !');
  const [description, setDescription] = useState<string>(
    'Coucou tout le monde~ ❀ Venez passer un moment agréable et chaleureux en direct ! N\'hésitez pas à poser vos questions dans le chat ❀'
  );
  const [color, setColor] = useState<string>('#B48A8A');
  const [rolePing, setRolePing] = useState<string>('@everyone');
  const [webhookUrl, setWebhookUrl] = useState<string>(config.webhookUrl || '');
  const [isGeneratingTemplate, setIsGeneratingTemplate] = useState<boolean>(false);
  const [webhookStatus, setWebhookStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isSendingWebhook, setIsSendingWebhook] = useState<boolean>(false);

  const handleGenerateTemplateAnnouncement = () => {
    setIsGeneratingTemplate(true);
    setWebhookStatus(null);
    setTimeout(() => {
      setIsGeneratingTemplate(false);
      if (announcementType === 'LIVE') {
        setDescription(
          `Coucou tout le monde~ ❀ Noxélia est actuellement en direct sur TikTok ! Venez passer un moment ultra doux et chaleureux avec nous dans le chat~ ❀\n\nLien du live : https://www.tiktok.com/@noxi_nick`
        );
      } else if (announcementType === 'VIDEO') {
        setDescription(
          `Coucou les amis~ ❀ Une nouvelle vidéo TikTok est en ligne ! N'hésitez pas à aller la liker et me laisser un petit commentaire avec vos retours~ ❀`
        );
      } else {
        setDescription(
          `Message important pour la communauté~ ❀ Merci à toutes et à tous d'être aussi bienveillants au quotidien sur le serveur Discord et le chat TikTok ! Prenez bien soin de vous~ ❀`
        );
      }
    }, 400);
  };

  const handleSendToSimulator = () => {
    const embedObj = {
      title,
      description,
      color,
      fields: [
        { name: 'Compte TikTok', value: stats.username, inline: true },
        { name: 'Statut', value: stats.isLive ? 'EN DIRECT ❀' : 'Hors Ligne', inline: true },
      ],
      footer: 'Généré par Phephe Bot ❀ • TikTok Live Community',
    };

    onPostToSimulator(embedObj, rolePing);
    setWebhookStatus({
      success: true,
      message: 'Annonce publiée dans le simulateur Discord (#annonces-live) avec succès ! ❀',
    });
  };

  const handleSendRealWebhook = async () => {
    if (!webhookUrl || !webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
      setWebhookStatus({
        success: false,
        message: 'Veuillez saisir une URL de Webhook Discord valide (ex: https://discord.com/api/webhooks/...)',
      });
      return;
    }

    setIsSendingWebhook(true);
    setWebhookStatus(null);

    const embedObj = {
      title,
      description,
      color: parseInt(color.replace('#', ''), 16),
      footer: { text: 'Bot TikTok Community Phephe ❀' },
    };

    try {
      const res = await fetch('/api/webhook/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookUrl,
          content: rolePing !== 'none' ? rolePing : undefined,
          embed: embedObj,
        }),
      });

      const data = await res.json();
      setIsSendingWebhook(false);

      if (res.ok) {
        setWebhookStatus({
          success: true,
          message: 'Annonce envoyée sur votre VRAI serveur Discord via Webhook ! ❀',
        });
      } else {
        setWebhookStatus({
          success: false,
          message: data.error || "Erreur lors de l'envoi vers le Webhook Discord.",
        });
      }
    } catch (err: any) {
      setIsSendingWebhook(false);
      setWebhookStatus({
        success: false,
        message: `Erreur réseau : ${err.message}`,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Form Controls */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#D9CEBF] dark:border-white/10">
          <div>
            <h3 className="text-lg font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#B48A8A]" />
              Studio de Création d'Annonces Discord ❀
            </h3>
            <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A]">Préparez et envoyez des annonces enrichies avec votre bot</p>
          </div>
          <button
            onClick={handleGenerateTemplateAnnouncement}
            disabled={isGeneratingTemplate}
            className="px-3.5 py-1.5 rounded-full bg-[#B48A8A]/15 hover:bg-[#B48A8A]/25 text-[#8C5E5E] dark:text-[#E2BABA] border border-[#B48A8A]/30 text-xs font-semibold transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGeneratingTemplate ? 'animate-spin' : ''}`} />
            <span>Générer Modèle Phephe ❀</span>
          </button>
        </div>

        {/* Announcement Type Switch */}
        <div>
          <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-2">Type d'Annonce</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setAnnouncementType('LIVE');
                setTitle('🔴 Noxélia ❀ est en LIVE sur TikTok !');
                setColor('#B48A8A');
              }}
              className={`p-2.5 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                announcementType === 'LIVE'
                  ? 'bg-[#B48A8A]/20 border-[#B48A8A]/40 text-[#8C5E5E] dark:text-[#E2BABA] shadow-sm'
                  : 'bg-[#FDFBF7] dark:bg-[#282824] border-[#D9CEBF] dark:border-white/10 text-[#7C7C6D] dark:text-[#A8A89A] hover:bg-white dark:hover:bg-[#1A1A18]'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-[#B48A8A]" />
              Live TikTok
            </button>

            <button
              onClick={() => {
                setAnnouncementType('VIDEO');
                setTitle('🎥 Nouvelle Vidéo TikTok disponible !');
                setColor('#5A5A40');
              }}
              className={`p-2.5 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                announcementType === 'VIDEO'
                  ? 'bg-[#5A5A40]/15 border-[#5A5A40]/40 text-[#5A5A40] dark:text-[#EAE3DB] shadow-sm'
                  : 'bg-[#FDFBF7] dark:bg-[#282824] border-[#D9CEBF] dark:border-white/10 text-[#7C7C6D] dark:text-[#A8A89A] hover:bg-white dark:hover:bg-[#1A1A18]'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-[#5A5A40]" />
              Vidéo TikTok
            </button>

            <button
              onClick={() => {
                setAnnouncementType('COMMUNITY');
                setTitle('❀ Message Communautaire Important ❀');
                setColor('#8C5E5E');
              }}
              className={`p-2.5 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                announcementType === 'COMMUNITY'
                  ? 'bg-[#B48A8A]/20 border-[#B48A8A]/40 text-[#8C5E5E] dark:text-[#E2BABA] shadow-sm'
                  : 'bg-[#FDFBF7] dark:bg-[#282824] border-[#D9CEBF] dark:border-white/10 text-[#7C7C6D] dark:text-[#A8A89A] hover:bg-white dark:hover:bg-[#1A1A18]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B48A8A]" />
              Communauté
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div>
          <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">Titre de l'Embed</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
            placeholder="Titre de l'annonce..."
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">Description / Contenu (Phephe Style ❀)</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs p-3.5 rounded-2xl focus:outline-none focus:border-[#5A5A40] leading-relaxed"
            placeholder="Texte de l'annonce..."
          />
        </div>

        {/* Role Ping & Color Picker */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">Mention de Rôle (Ping)</label>
            <select
              value={rolePing}
              onChange={(e) => setRolePing(e.target.value)}
              className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
            >
              <option value="@everyone">@everyone</option>
              <option value="@here">@here</option>
              <option value="@Notifications Live">@Notifications Live</option>
              <option value="none">Aucune mention</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">Couleur de Bordure</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-9 h-9 bg-white dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 rounded-xl cursor-pointer p-0.5"
              />
              <span className="text-xs font-mono text-[#7C7C6D] dark:text-[#A8A89A]">{color}</span>
            </div>
          </div>
        </div>

        {/* Real Discord Webhook Input */}
        <div className="pt-3 border-t border-[#D9CEBF] dark:border-white/10">
          <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1 flex items-center justify-between">
            <span>URL de Webhook Discord Réel</span>
            <span className="text-[10px] text-[#8C5E5E] dark:text-[#E2BABA] font-normal">Optionnel pour envoi réel</span>
          </label>
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://discord.com/api/webhooks/123456789/abcxyz..."
            className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40] font-mono"
          />
        </div>

        {/* Status Message */}
        {webhookStatus && (
          <div
            className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2 ${
              webhookStatus.success
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
            }`}
          >
            {webhookStatus.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{webhookStatus.message}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSendToSimulator}
            className="flex-1 py-2.5 px-4 rounded-full bg-[#EAE3DB] dark:bg-[#282824] hover:bg-[#D9CEBF] text-[#33332D] dark:text-[#EAE3DB] border border-[#D9CEBF] dark:border-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4 text-[#8C5E5E] dark:text-[#E2BABA]" />
            Tester dans le Simulateur
          </button>

          <button
            onClick={handleSendRealWebhook}
            disabled={isSendingWebhook}
            className="flex-1 py-2.5 px-4 rounded-full bg-[#5A5A40] dark:bg-[#B48A8A] hover:opacity-90 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className={`w-4 h-4 ${isSendingWebhook ? 'animate-spin' : ''}`} />
            {isSendingWebhook ? 'Envoi...' : 'Envoyer sur VRAI Discord'}
          </button>
        </div>
      </div>

      {/* Right Column: Live Embed Preview */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#D9CEBF] dark:border-white/10 mb-4">
            <h3 className="text-lg font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#B48A8A]" />
              Aperçu en Temps Réel de l'Annonce Discord
            </h3>
            <span className="text-[10px] bg-[#F7F3F0] dark:bg-[#282824] text-[#7C7C6D] dark:text-[#A8A89A] px-2.5 py-1 rounded-full border border-[#D9CEBF] dark:border-white/10 font-mono">
              Pixel Perfect Preview
            </span>
          </div>

          {/* Discord Message Shell */}
          <div className="bg-[#F7F3F0] dark:bg-[#0F0F0D] border border-[#D9CEBF] dark:border-white/10 rounded-2xl p-4 space-y-3">
            {/* Mention Ping */}
            {rolePing !== 'none' && (
              <span className="text-xs bg-[#5A5A40]/15 dark:bg-[#B48A8A]/20 text-[#5A5A40] dark:text-[#E2BABA] border border-[#5A5A40]/30 dark:border-[#B48A8A]/30 px-2.5 py-0.5 rounded-full font-mono">
                {rolePing}
              </span>
            )}

            {/* Author */}
            <div className="flex items-center gap-2">
              <img
                src={config.avatarUrl}
                alt={config.botName}
                className="w-7 h-7 rounded-full object-cover border border-[#D9CEBF] dark:border-white/10"
              />
              <span className="font-bold text-xs text-[#33332D] dark:text-[#EAE3DB]">{config.botName}</span>
              <span className="bg-[#B48A8A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">BOT</span>
            </div>

            {/* Embed Card */}
            <div
              className="p-4 rounded-2xl bg-white dark:bg-[#1A1A18] border-l-4 space-y-2.5 shadow-sm border-y border-r border-[#EAE3DB] dark:border-white/10"
              style={{ borderLeftColor: color }}
            >
              <h4 className="font-serif-aesthetic font-bold text-sm text-[#33332D] dark:text-[#EAE3DB]">{title}</h4>
              <p className="text-xs text-[#4A4A40] dark:text-[#A8A89A] whitespace-pre-wrap leading-relaxed">
                {description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EAE3DB] dark:border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] block">Compte TikTok</span>
                  <span className="text-xs font-semibold text-[#33332D] dark:text-[#EAE3DB]">{stats.username}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] block">Statut</span>
                  <span className="text-xs font-semibold text-[#8C5E5E] dark:text-[#E2BABA]">{stats.isLive ? 'EN DIRECT ❀' : 'Hors Ligne'}</span>
                </div>
              </div>

              <div className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] pt-2 border-t border-[#EAE3DB] dark:border-white/10 flex items-center justify-between">
                <span>Généré par Phephe Bot ❀ • TikTok Live Community</span>
                <span>Aujourd'hui à 18:45</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#EAE3DB] dark:border-white/10 text-[11px] text-[#7C7C6D] dark:text-[#A8A89A] space-y-1">
          <p className="font-semibold text-[#33332D] dark:text-[#EAE3DB]">💡 Astuce Webhook Discord :</p>
          <p>
            Pour envoyer ce message sur votre vrai serveur Discord : allez dans Paramètres de votre salon Discord → Intégrations → Webhooks → Créer un Webhook → Copiez l'URL et collez-la ci-contre !
          </p>
        </div>
      </div>
    </div>
  );
};
