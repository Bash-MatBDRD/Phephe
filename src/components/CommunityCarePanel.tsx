import React, { useState } from 'react';
import { BotConfig, SayCommandLog } from '../types';
import { Heart, Sparkles, ShieldCheck, User, MessageCircle, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';

interface CommunityCarePanelProps {
  config: BotConfig;
  sayLogs: SayCommandLog[];
  onClearLogs: () => void;
}

export const CommunityCarePanel: React.FC<CommunityCarePanelProps> = ({
  config,
  sayLogs,
  onClearLogs,
}) => {
  const [vibeNote, setVibeNote] = useState<string>('Passez une douce journée et prenez soin de vous ! ❀');
  const [positiveNotes, setPositiveNotes] = useState<string[]>([
    'Installe-toi confortablement pour le prochain live Roblox MM2 ❀',
    'N\'oublie pas de boire un verre d\'eau et de te reposer un peu~ ❀',
    'Merci d\'être aussi bienveillants dans le chat ! ❀',
  ]);

  const handleAddVibeNote = () => {
    if (!vibeNote.trim()) return;
    setPositiveNotes([vibeNote.trim(), ...positiveNotes]);
    setVibeNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#B48A8A]" />
            <h2 className="text-xl font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB]">
              Espace Bien-être & Communauté Noxélia ❀
            </h2>
          </div>
          <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] mt-1">
            Gérez la bienveillance sur le serveur TikTok, suivez les messages anonymes /say et diffusez des mots doux.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Positive Vibes Feed */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2 pb-3 border-b border-[#D9CEBF] dark:border-white/10">
            <Sparkles className="w-4 h-4 text-[#B48A8A]" />
            Mur de Douceur & Mots Chaleureux ❀
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={vibeNote}
              onChange={(e) => setVibeNote(e.target.value)}
              placeholder="Ajouter une note de bienveillance..."
              className="flex-1 bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-full focus:outline-none"
            />
            <button
              onClick={handleAddVibeNote}
              className="px-4 py-2 bg-[#5A5A40] dark:bg-[#B48A8A] text-white text-xs font-semibold rounded-full hover:opacity-90"
            >
              Ajouter
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {positiveNotes.map((note, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-xs text-[#33332D] dark:text-[#EAE3DB] flex items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-[#B48A8A] shrink-0" />
                  <span className="leading-relaxed">{note}</span>
                </div>
                <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] shrink-0 font-mono">
                  Posté ❀
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* /say Anonymous Command Moderation Audit Log */}
        <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9CEBF] dark:border-white/10">
            <h3 className="text-base font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8C5E5E]" />
              Logs de Modération Anonymes /say
            </h3>
            <button
              onClick={onClearLogs}
              className="text-xs text-[#7C7C6D] hover:text-[#33332D] flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Effacer
            </button>
          </div>

          <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A]">
            Historique confidentiel réservé aux modérateurs pour surveiller l'usage de la commande anonyme <code className="bg-[#F7F3F0] dark:bg-[#282824] px-1.5 py-0.5 rounded border border-[#D9CEBF]">/say</code>.
          </p>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {sayLogs.length === 0 ? (
              <p className="text-xs text-[#7C7C6D] italic text-center py-6">
                Aucun log pour le moment.
              </p>
            ) : (
              sayLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#7C7C6D] dark:text-[#A8A89A]">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <strong className="text-[#33332D] dark:text-[#EAE3DB]">{log.senderName}</strong>
                      <span>dans {log.channel}</span>
                    </div>
                    <span className="font-mono text-[10px]">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#33332D] dark:text-[#EAE3DB] bg-white dark:bg-[#1A1A18] p-2.5 rounded-xl border border-[#D9CEBF] dark:border-white/10 leading-relaxed">
                    "{log.messageContent}"
                  </p>
                  <span className="inline-block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ Supprimé & Ré-émis anonymement par le bot
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
