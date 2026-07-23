import React, { useState, useRef, useEffect } from 'react';
import { Send, Hash, Users, Bot, Sparkles, Trash2, ShieldCheck, Heart, Radio, Video, CornerDownRight, Info, AlertCircle, Lock } from 'lucide-react';
import { DiscordMessage, BotConfig, TikTokLiveStats, SayCommandLog, DiscordSalon } from '../types';

interface DiscordSimulatorProps {
  messages: DiscordMessage[];
  config: BotConfig;
  stats: TikTokLiveStats;
  salons?: DiscordSalon[];
  onSendMessage: (content: string, channel: string) => void;
  onSayCommandExecuted: (log: SayCommandLog) => void;
}

export const DiscordSimulator: React.FC<DiscordSimulatorProps> = ({
  messages,
  config,
  stats,
  salons,
  onSendMessage,
  onSayCommandExecuted,
}) => {
  const [activeChannel, setActiveChannel] = useState<string>('#général');
  const [inputText, setInputText] = useState<string>('');
  const [userName, setUserName] = useState<string>('Membre_Community');
  const [isDeletingAnimation, setIsDeletingAnimation] = useState<boolean>(false);
  const [lastDeletedSayText, setLastDeletedSayText] = useState<string | null>(null);
  const [isLoadingAiReply, setIsLoadingAiReply] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const channelsList = salons && salons.length > 0 
    ? salons.map(s => s.name)
    : ['#général', '#annonces-live', '#nouvelles-vidéos', '#commandes-bot', '#espace-bien-être', '#logs-modération'];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isDeletingAnimation]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const rawInput = inputText.trim();
    setInputText('');

    // Check if command is /say
    if (rawInput.startsWith('/say ')) {
      const sayMessageContent = rawInput.substring(5).trim();
      if (!sayMessageContent) return;

      // 1. Trigger deletion animation for anonymity
      setLastDeletedSayText(rawInput);
      setIsDeletingAnimation(true);

      setTimeout(() => {
        setIsDeletingAnimation(false);

        // 2. Add log record
        const newLog: SayCommandLog = {
          id: `say_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          senderName: userName,
          channel: activeChannel,
          messageContent: sayMessageContent,
          status: 'DELETED_AND_REPOSTED',
        };
        onSayCommandExecuted(newLog);

        // 3. Post as Noxélia Bot with anonymized tag
        onSendMessage(sayMessageContent, activeChannel);
      }, 1200);

      return;
    }

    // Normal Message flow
    onSendMessage(rawInput, activeChannel);

    // Friendly local response from Phephe Bot
    const isGreeting = /bonjour|coucou|salut|hello|bonsoir|hey|ça va|ca va/i.test(rawInput);

    setIsLoadingAiReply(true);

    setTimeout(() => {
      setIsLoadingAiReply(false);
      if (isGreeting) {
        onSendMessage(
          `Oh coucou ${userName}~ ❀ Comment s'est passée ta journée ? J'espère que tu as pu te reposer un peu~ ❀ Installe-toi bien pour le live !`,
          activeChannel
        );
      } else {
        onSendMessage(
          `Merci pour ton message ${userName}~ ❀ N'hésite pas si tu as besoin de quoi que ce soit sur le serveur ! Prends bien soin de toi~ ❀`,
          activeChannel
        );
      }
    }, 600);
  };

  const handleQuickCommand = (cmd: string) => {
    setInputText(cmd);
  };

  return (
    <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] overflow-hidden shadow-sm flex flex-col md:flex-row h-[650px] transition-colors">
      {/* Discord Left Sidebar: Channels */}
      <div className="w-full md:w-60 bg-[#EAE3DB] dark:bg-[#282824] border-r border-[#D9CEBF] dark:border-white/10 flex flex-col justify-between p-3 shrink-0">
        <div>
          {/* Server Title */}
          <div className="p-2.5 mb-3 border-b border-[#D9CEBF] dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B48A8A] animate-pulse" />
              <h2 className="font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] text-base truncate">Noxélia TikTok ❀</h2>
            </div>
            <Sparkles className="w-4 h-4 text-[#B48A8A]" />
          </div>

          {/* Channels List */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#7C7C6D] dark:text-[#A8A89A] px-2 tracking-wider block mb-1">
              SALONS DISCORD
            </span>
            {channelsList.map((chan) => (
              <button
                key={chan}
                onClick={() => setActiveChannel(chan)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeChannel === chan
                    ? 'bg-[#5A5A40] dark:bg-[#B48A8A] text-white font-semibold shadow-sm'
                    : 'text-[#7C7C6D] dark:text-[#A8A89A] hover:bg-white/60 dark:hover:bg-[#1A1A18] hover:text-[#33332D]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Hash className="w-3.5 h-3.5 opacity-70 shrink-0" />
                  <span className="truncate">{chan.replace('#', '')}</span>
                </div>
                {chan === '#annonces-live' && stats.isLive && (
                  <span className="w-2 h-2 rounded-full bg-[#B48A8A] shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Current User Badge Switcher */}
        <div className="p-3 rounded-2xl bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 mt-4 shadow-sm">
          <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] block mb-1 font-medium">Votre Pseudo Discord</span>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-2.5 py-1.5 rounded-xl focus:outline-none focus:border-[#5A5A40]"
            placeholder="Entrez votre nom..."
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-[#F7F3F0] dark:bg-[#0F0F0D] flex flex-col justify-between h-full overflow-hidden">
        {/* Chat Header */}
        <div className="p-3 bg-[#FDFBF7] dark:bg-[#1A1A18] border-b border-[#D9CEBF] dark:border-white/10 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-[#7C7C6D]" />
            <span className="font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB] text-base">{activeChannel.replace('#', '')}</span>
            <span className="text-xs text-[#7C7C6D] dark:text-[#A8A89A] hidden sm:inline">• Bot Phephe ❀ actif</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8C5E5E] dark:text-[#E2BABA] bg-[#B48A8A]/15 border border-[#B48A8A]/30 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anonymat /say On ❀</span>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {/* Welcome Info Box */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 text-xs text-[#4A4A40] dark:text-[#EAE3DB] space-y-1 shadow-sm">
            <p className="font-semibold text-[#8C5E5E] dark:text-[#E2BABA] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#B48A8A]" />
              Simulateur Discord interactif pour tester le Bot Phephe & /say
            </p>
            <p className="text-[#7C7C6D] dark:text-[#A8A89A] text-[11px] leading-relaxed">
              • Tapez <code className="text-[#8C5E5E] dark:text-[#E2BABA] bg-[#F7F3F0] dark:bg-[#282824] px-1.5 py-0.5 rounded-full border border-[#D9CEBF] dark:border-white/10">/say [votre message]</code> pour voir la commande supprimer votre message original et le reposter anonymement !
              <br />
              • Dites <code className="text-[#8C5E5E] dark:text-[#E2BABA] bg-[#F7F3F0] dark:bg-[#282824] px-1.5 py-0.5 rounded-full border border-[#D9CEBF] dark:border-white/10">bonjour</code> ou <code className="text-[#8C5E5E] dark:text-[#E2BABA] bg-[#F7F3F0] dark:bg-[#282824] px-1.5 py-0.5 rounded-full border border-[#D9CEBF] dark:border-white/10">coucou</code> pour voir la réponse bienveillante du Bot Phephe ❀.
            </p>
          </div>

          {/* Render Messages */}
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 group hover:bg-white/50 dark:hover:bg-[#282824]/50 p-2 rounded-2xl transition-colors">
              <img
                src={msg.author.avatar}
                alt={msg.author.name}
                className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5 border border-[#D9CEBF] dark:border-white/10"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs hover:underline cursor-pointer text-[#33332D] dark:text-[#EAE3DB]">
                    {msg.author.name}
                  </span>

                  {msg.author.isBot && (
                    <span className="bg-[#B48A8A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {msg.author.tag || 'BOT'}
                    </span>
                  )}

                  <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] font-mono">{msg.timestamp}</span>
                </div>

                {/* Message Content */}
                <p className="text-xs text-[#33332D] dark:text-[#EAE3DB] mt-1 leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>

                {/* Discord Embed if Present */}
                {msg.embed && (
                  <div className="mt-2.5 p-4 rounded-2xl bg-white dark:bg-[#1A1A18] border-l-4 border-[#B48A8A] border-y border-r border-[#EAE3DB] dark:border-white/10 shadow-sm space-y-2 max-w-lg">
                    <h4 className="font-serif-aesthetic font-bold text-sm text-[#33332D] dark:text-[#EAE3DB] flex items-center gap-1.5">
                      {msg.embed.title}
                    </h4>
                    <p className="text-xs text-[#4A4A40] dark:text-[#A8A89A] whitespace-pre-wrap leading-relaxed">
                      {msg.embed.description}
                    </p>

                    {msg.embed.fields && msg.embed.fields.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EAE3DB] dark:border-white/10 text-xs">
                        {msg.embed.fields.map((f, idx) => (
                          <div key={idx}>
                            <span className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] block">{f.name}</span>
                            <span className="text-xs font-semibold text-[#33332D] dark:text-[#EAE3DB]">{f.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.embed.footer && (
                      <p className="text-[10px] text-[#7C7C6D] dark:text-[#A8A89A] pt-1.5 border-t border-[#EAE3DB] dark:border-white/10">
                        {msg.embed.footer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Anonymity Message Deletion Animation Indicator */}
          {isDeletingAnimation && (
            <div className="p-3.5 rounded-2xl bg-[#B48A8A]/15 border border-[#B48A8A]/30 text-xs text-[#8C5E5E] dark:text-[#E2BABA] flex items-center justify-between animate-bounce shadow-sm">
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-[#B48A8A] animate-pulse" />
                <span>
                  <strong>Commande /say détectée :</strong> Suppression immédiate du message de{' '}
                  <strong className="underline">{userName}</strong> pour préserver l'anonymat...
                </span>
              </div>
              <span className="text-[10px] bg-[#B48A8A]/20 px-2.5 py-0.5 rounded-full font-mono">Suppression 100% ❀</span>
            </div>
          )}

          {/* Thinking Indicator */}
          {isLoadingAiReply && (
            <div className="flex items-center gap-2 text-xs text-[#8C5E5E] dark:text-[#E2BABA] italic p-2.5 bg-white dark:bg-[#1A1A18] rounded-full border border-[#D9CEBF] dark:border-white/10 w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-[#B48A8A]" />
              <span>Phephe Bot ❀ prépare une réponse douce...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2.5 bg-[#EAE3DB] dark:bg-[#282824] border-t border-[#D9CEBF] dark:border-white/10 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-[10px] font-bold text-[#7C7C6D] dark:text-[#A8A89A] uppercase">Commandes rapides :</span>
          <button
            onClick={() => handleQuickCommand('/say Coucou tout le monde ! Nouvelle annonce pour le live Roblox ❀')}
            className="px-3 py-1 rounded-full bg-white dark:bg-[#1A1A18] text-[#8C5E5E] dark:text-[#E2BABA] border border-[#D9CEBF] dark:border-white/10 font-mono text-[11px] whitespace-nowrap shadow-sm"
          >
            /say [Annonce Anonyme]
          </button>
          <button
            onClick={() => handleQuickCommand('Bonjour Phephe Bot !')}
            className="px-3 py-1 rounded-full bg-white dark:bg-[#1A1A18] text-[#5A5A40] dark:text-[#EAE3DB] border border-[#D9CEBF] dark:border-white/10 text-[11px] whitespace-nowrap shadow-sm"
          >
            Bonjour ! ❀
          </button>
          <button
            onClick={() => handleQuickCommand('/say Le live Roblox MM2 commence dans 10 minutes ! ❀')}
            className="px-3 py-1 rounded-full bg-white dark:bg-[#1A1A18] text-[#8C5E5E] dark:text-[#E2BABA] border border-[#D9CEBF] dark:border-white/10 font-mono text-[11px] whitespace-nowrap shadow-sm"
          >
            /say [Alerte Live]
          </button>
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-[#FDFBF7] dark:bg-[#1A1A18] border-t border-[#D9CEBF] dark:border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Envoyer un message dans ${activeChannel} (ex: /say Mon message anonyme)`}
            className="flex-1 bg-white dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-4 py-2.5 rounded-full focus:outline-none focus:border-[#5A5A40] transition-colors shadow-sm"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isDeletingAnimation}
            className="p-2.5 rounded-full bg-[#5A5A40] dark:bg-[#B48A8A] hover:opacity-90 disabled:opacity-40 text-white transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
