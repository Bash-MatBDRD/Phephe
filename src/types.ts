export interface TikTokLiveStats {
  username: string;
  displayName: string;
  isLive: boolean;
  streamTitle: string;
  category: string;
  liveViewers: number;
  peakViewers: number;
  likeCount: number;
  followerGain: number;
  startedAt: string;
  chatSpeedMsgsPerMin: number;
  latestVideo: TikTokVideo;
}

export interface TikTokVideo {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  postedAt: string;
  url: string;
}

export interface StreamDataPoint {
  time: string;
  viewers: number;
  chatVelocity: number;
  likesK: number;
}

export interface DiscordMessage {
  id: string;
  author: {
    name: string;
    avatar: string;
    isBot?: boolean;
    roleColor?: string;
    tag?: string;
  };
  content: string;
  timestamp: string;
  embed?: {
    title: string;
    description: string;
    color: string;
    fields?: { name: string; value: string; inline?: boolean }[];
    footer?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
  };
  isAnonymizedCommand?: boolean; // For /say command deletion animation
  deletedSenderMessage?: string;
}

export interface SayCommandLog {
  id: string;
  timestamp: string;
  senderName: string;
  channel: string;
  messageContent: string;
  status: 'DELETED_AND_REPOSTED';
}

export interface BotConfig {
  botName: string;
  avatarUrl: string;
  aestheticSymbol: string; // '❀'
  strictEmojiFilter: boolean; // Only ❀ allowed
  aestheticPersonaLevel: 'soft' | 'warm' | 'full'; // Warm caring tone
  autoGreetingEnabled: boolean;
  greetingAskAboutDay: boolean; // Ask "Comment s'est passée ta journée ?"
  tiktokSyncIntervalSec: number;
  webhookUrl: string;
  liveRolePing: string; // '@everyone' | '@Notifications Live' | 'none'
  videoRolePing: string;
}

export type BotPresenceStatus = 'online' | 'dnd' | 'idle' | 'offline';
export type BotActivityType = 'PLAYING' | 'STREAMING' | 'LISTENING' | 'WATCHING' | 'CUSTOM';

export interface BotPresenceConfig {
  status: BotPresenceStatus;
  activityType: BotActivityType;
  activityName: string;
  customStatus: string;
  details?: string;
  stateText?: string;
}

export interface DiscordSalon {
  id: string;
  name: string;
  category: string;
  topic: string;
  unreadCount?: number;
  isPrivate?: boolean;
  slowmodeSec?: number;
}

export interface UserAccount {
  id: string;
  username: string;
  displayName: string;
  role: 'Owner' | 'Administrator' | 'Moderator' | 'VIP Member';
  avatar?: string;
  isLoggedIn: boolean;
  email?: string;
  lastLogin?: string;
}

export type ThemeMode = 'day' | 'night';

