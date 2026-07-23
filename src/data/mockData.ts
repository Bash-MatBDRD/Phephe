import { TikTokLiveStats, StreamDataPoint, DiscordMessage, SayCommandLog, BotConfig, BotPresenceConfig, DiscordSalon, UserAccount } from '../types';

export const INITIAL_TIKTOK_STATS: TikTokLiveStats = {
  username: '@noxi_nick',
  displayName: 'Noxélia ❀',
  isLive: true,
  streamTitle: '°+•Ɛs 🌙 Live Roblox MM2 & Blabla ~ Venez dire coucou ! ❀',
  category: 'Roblox & Gaming',
  liveViewers: 428,
  peakViewers: 612,
  likeCount: 28400,
  followerGain: 96,
  startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  chatSpeedMsgsPerMin: 142,
  latestVideo: {
    id: 'vid_987',
    title: "°+•Ɛs 🌙 Nouvelle vidéo Roblox Evade / ASMR ! ❀ Vous l'avez vue ?",
    views: 18400,
    likes: 3120,
    comments: 420,
    postedAt: 'Il y a 3 heures',
    url: 'https://www.tiktok.com/@noxi_nick',
  },
};

export const INITIAL_STREAM_HISTORY: StreamDataPoint[] = [
  { time: '18:00', viewers: 120, chatVelocity: 45, likesK: 2.1 },
  { time: '18:15', viewers: 240, chatVelocity: 88, likesK: 6.4 },
  { time: '18:30', viewers: 390, chatVelocity: 120, likesK: 12.8 },
  { time: '18:45', viewers: 510, chatVelocity: 165, likesK: 19.5 },
  { time: '19:00', viewers: 612, chatVelocity: 180, likesK: 24.2 },
  { time: '19:15', viewers: 428, chatVelocity: 142, likesK: 28.4 },
];

export const INITIAL_DISCORD_MESSAGES: DiscordMessage[] = [
  {
    id: 'm1',
    author: {
      name: 'Phephe Bot ❀',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isBot: true,
      tag: 'BOT',
      roleColor: '#B48A8A',
    },
    content: 'Coucou tout le monde~ ❀ Bienvenue sur le serveur communautaire TikTok de Noxélia ! N\'hésitez pas à dire bonjour dans le chat ou utiliser la commande `/say` pour une annonce anonyme ❀',
    timestamp: '18:00',
  },
  {
    id: 'm2',
    author: {
      name: 'Lucas_92',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    },
    content: 'Bonjour à tous !',
    timestamp: '18:05',
  },
  {
    id: 'm3',
    author: {
      name: 'Phephe Bot ❀',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isBot: true,
      tag: 'BOT',
      roleColor: '#B48A8A',
    },
    content: 'Oh coucou Lucas_92~ ❀ Comment s\'est passée ta journée ? J\'espère que tu as pu te reposer un peu~ ❀ Installe-toi bien pour le live !',
    timestamp: '18:05',
  },
  {
    id: 'm4',
    author: {
      name: 'Phephe Bot ❀',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isBot: true,
      tag: 'BOT',
      roleColor: '#B48A8A',
    },
    content: '@everyone 📢 **DIRECT TIKTOK EN COURS !**',
    timestamp: '18:15',
    embed: {
      title: '🔴 Noxélia ❀ est en LIVE sur TikTok !',
      description: '°+•Ɛs 🌙 Live Roblox MM2 & Blabla ~ On s\'amuse ensemble ! ❀\n\nVenez passer un moment calme et agréable dans le chat~ ❀',
      color: '#B48A8A',
      fields: [
        { name: 'Jeu / Catégorie', value: 'Roblox & Gaming', inline: true },
        { name: 'Spectateurs', value: '428 en direct', inline: true },
      ],
      footer: 'Bot Phephe Live Sync ❀ • Cliquez ci-dessous pour rejoindre',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    },
  },
];

export const INITIAL_SAY_LOGS: SayCommandLog[] = [
  {
    id: 'say_1',
    timestamp: '18:22:10',
    senderName: 'Admin_Alex',
    channel: '#annonces-live',
    messageContent: 'Nouvelle règle pour le concours Roblox : tirage au sort ce vendredi en direct ❀',
    status: 'DELETED_AND_REPOSTED',
  },
  {
    id: 'say_2',
    timestamp: '18:40:05',
    senderName: 'Moderator_Sarah',
    channel: '#général',
    messageContent: 'Rappel bienveillance : merci de garder une ambiance chaleureuse dans le chat vocal ❀',
    status: 'DELETED_AND_REPOSTED',
  },
];

export const DEFAULT_BOT_CONFIG: BotConfig = {
  botName: 'Phephe Bot ❀',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  aestheticSymbol: '❀',
  strictEmojiFilter: true,
  aestheticPersonaLevel: 'warm',
  autoGreetingEnabled: true,
  greetingAskAboutDay: true,
  tiktokSyncIntervalSec: 15,
  webhookUrl: 'https://discord.com/api/webhooks/EXAMPLE_WEBHOOK_URL',
  liveRolePing: '@everyone',
  videoRolePing: '@Notifications TikTok',
};

export const INITIAL_PRESENCE_CONFIG: BotPresenceConfig = {
  status: 'online',
  activityType: 'STREAMING',
  activityName: 'Roblox MM2 & Evade',
  customStatus: '°+•Ɛs 🌙 Noxélia ✨ ໒꒱ •°',
  details: 'En direct sur TikTok @noxi_nick ❀',
  stateText: 'Communauté TikTok ❀',
};

export const INITIAL_DISCORD_SALONS: DiscordSalon[] = [
  {
    id: 's1',
    name: '#général',
    category: 'SALONS TEXTUELS',
    topic: 'Salon principal pour discuter dans le calme et la gentillesse ❀',
    unreadCount: 3,
  },
  {
    id: 's2',
    name: '#annonces-live',
    category: 'TIKTOK SYNC',
    topic: 'Annonces automatiques des streams TikTok de Noxélia ❀',
  },
  {
    id: 's3',
    name: '#nouvelles-vidéos',
    category: 'TIKTOK SYNC',
    topic: 'Alertes lors de la sortie de nouvelles vidéos TikTok ❀',
  },
  {
    id: 's4',
    name: '#commandes-bot',
    category: 'SALONS TEXTUELS',
    topic: 'Utilisez /say et interagissez avec Phephe Bot ❀',
  },
  {
    id: 's5',
    name: '#espace-bien-être',
    category: 'COMMUNAUTÉ',
    topic: 'Partagez vos bonnes ondes et discutez de votre journée ❀',
  },
  {
    id: 's6',
    name: '#logs-modération',
    category: 'ADMINISTRATION',
    topic: 'Historique des commandes anonymes /say et activité du bot',
    isPrivate: true,
  },
];

export const INITIAL_USER_ACCOUNT: UserAccount = {
  id: 'usr_noxi_01',
  username: 'noxi_nick',
  displayName: 'Noxélia Admin ❀',
  role: 'Owner',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  isLoggedIn: true,
  email: 'contact@noxelia-community.fr',
  lastLogin: 'Aujourd\'hui à ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
};

