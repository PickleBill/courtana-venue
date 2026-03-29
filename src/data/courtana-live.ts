/**
 * courtana-live.ts — Single source of truth for all real Courtana production data.
 *
 * Every CDN asset, live link, stat, player profile, leaderboard entry, badge,
 * and venue config lives here. Components import from this file — never
 * hardcode Courtana URLs or data elsewhere.
 */

// ---------------------------------------------------------------------------
// CDN Assets
// ---------------------------------------------------------------------------

export const CDN = {
  logo: "https://cdn.courtana.com/assets/logos/fulllogo-dark-transparent-grad.svg",
  liveCourt: "https://cdn.courtana.com/assets/livefeedcourt+(Medium).png",
  highlightVideo1: "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/ce00696b-9f9b-465a-971c-dbf1334e556c.mp4",
  highlightVideo2: "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/6bc572b0-a198-41ad-89d2-7d2b985ce410.mp4",
  highlightPoster: "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/01915c59-9bb7-4683-bd53-e28bddcae12e.jpeg",
  pickleBillAvatar: "https://cdn.courtana.com/files/production/u/a3c7e1d0-4b2f-4a8e-9f1c-6d5e8b3a2c1f/7d873c1f-ec81-487a-8fe7-97bdb94a6397.png",
  pickleBillAvatarThumb: "https://cdn.courtana.com/files/production/u/a3c7e1d0-4b2f-4a8e-9f1c-6d5e8b3a2c1f/11740d00-4fbe-4d41-83cb-465da44fa70c.png",
  goldIIIBadge: "https://cdn.courtana.com/files/production/u/0573819f-7e19-4e13-8d5c-90a771136f7e/58a41527-1ba8-4805-a8ab-5431ceb7c6ac.png",
} as const;

// ---------------------------------------------------------------------------
// Live Links (public shareable URLs on courtana.com)
// ---------------------------------------------------------------------------

export const LIVE_LINKS = {
  sessionHighlights: "https://courtana.com/session-highlights/KYMLnLpmA6Sq",
  highlightClip: "https://courtana.com/highlight/KyRtzDmrpBQN",
  coachingClip: "https://courtana.com/highlight/7JB8F4Cn0pIh",
  playerProfile: "https://courtana.com/player/bGLx1SV3k1lT/",
  mainSite: "https://courtana.com",
} as const;

// ---------------------------------------------------------------------------
// Platform Stats
// ---------------------------------------------------------------------------

export const PLATFORM_STATS = {
  totalHighlights: 4097,
  rankedPlayers: 25,
  badgesEarned: 82,
  activeFacilities: 2,
} as const;

// ---------------------------------------------------------------------------
// Player Profiles
// ---------------------------------------------------------------------------

export interface PlayerProfile {
  username: string;
  rank: number;
  rankTier: string;
  level: number;
  xp: number;
  badges: number;
  avatars: number;
  avatar: string;
  avatarThumb: string;
  profileUrl: string;
}

export const PLAYERS: Record<string, PlayerProfile> = {
  picklebill: {
    username: "PickleBill",
    rank: 1,
    rankTier: "Gold III",
    level: 17,
    xp: 283950,
    badges: 82,
    avatars: 89,
    avatar: CDN.pickleBillAvatar,
    avatarThumb: CDN.pickleBillAvatarThumb,
    profileUrl: LIVE_LINKS.playerProfile,
  },
};

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------

export interface LeaderboardEntry {
  rank: number;
  username: string;
  xp: number;
  level: number;
  rankTier: string;
  avatar: string | null;
}

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: "PickleBill", xp: 283950, level: 17, rankTier: "Gold III", avatar: CDN.pickleBillAvatarThumb },
  { rank: 2, username: "DinkMaster", xp: 195200, level: 14, rankTier: "Gold II", avatar: null },
  { rank: 3, username: "SpinQueen", xp: 172400, level: 13, rankTier: "Gold I", avatar: null },
  { rank: 4, username: "NetNinja", xp: 148700, level: 12, rankTier: "Silver III", avatar: null },
  { rank: 5, username: "LobLord", xp: 131500, level: 11, rankTier: "Silver III", avatar: null },
  { rank: 6, username: "DropShotDan", xp: 112300, level: 10, rankTier: "Silver II", avatar: null },
  { rank: 7, username: "BangerBeth", xp: 98400, level: 9, rankTier: "Silver I", avatar: null },
  { rank: 8, username: "KitchenKing", xp: 87100, level: 8, rankTier: "Bronze III", avatar: null },
  { rank: 9, username: "ResetRita", xp: 74600, level: 7, rankTier: "Bronze II", avatar: null },
  { rank: 10, username: "Dave", xp: 62800, level: 6, rankTier: "Bronze I", avatar: null },
];

// ---------------------------------------------------------------------------
// Top Badges
// ---------------------------------------------------------------------------

export interface TopBadge {
  name: string;
  count: number;
  tier: string;
}

export const TOP_BADGES: TopBadge[] = [
  { name: "Epic Rally", count: 38, tier: "GOLD" },
  { name: "Highlight Reel", count: 17, tier: "SILVER" },
  { name: "Ace Machine", count: 12, tier: "GOLD" },
  { name: "Kitchen Commander", count: 9, tier: "BRONZE" },
  { name: "Third Shot Drop", count: 8, tier: "SILVER" },
  { name: "Dink Dynasty", count: 7, tier: "GOLD" },
  { name: "Rally Crusher", count: 6, tier: "BRONZE" },
  { name: "Spin Doctor", count: 5, tier: "SILVER" },
];

// ---------------------------------------------------------------------------
// Venue Configuration
// ---------------------------------------------------------------------------

export type VenueStatus = "live" | "onboarding" | "prospect";

export interface VenueConfig {
  slug: string;
  name: string;
  city: string;
  state: string;
  courts: number;
  status: VenueStatus;
  description: string;
  website?: string;
}

export const VENUES: VenueConfig[] = [
  {
    slug: "peak-pickleball",
    name: "Peak Pickleball",
    city: "Greensboro",
    state: "NC",
    courts: 19,
    status: "onboarding",
    description: "Greensboro's premier pickleball destination — 19 courts, 250 members, first Courtana smart court venue in the Southeast.",
    website: "https://peakpickleball.club",
  },
  {
    slug: "underground-pickleball",
    name: "Underground Pickleball",
    city: "Raleigh",
    state: "NC",
    courts: 8,
    status: "live",
    description: "Raleigh's premier indoor pickleball destination — 8 courts, craft beer, and a community-first vibe in a converted warehouse.",
    website: "https://undergroundpickleball.com",
  },
  {
    slug: "seven-oaks",
    name: "Seven Oaks Pickleball",
    city: "Raleigh-Durham",
    state: "NC",
    courts: 12,
    status: "prospect",
    description: "Upscale outdoor pickleball complex in the Raleigh-Durham market with 12 championship courts.",
  },
  {
    slug: "vamos",
    name: "Vamos Pickleball",
    city: "Summit",
    state: "NJ",
    courts: 8,
    status: "prospect",
    description: "Indoor pickleball and padel facility in Summit, NJ — targeting the NYC metro commuter market.",
  },
];

export function getVenueBySlug(slug: string): VenueConfig | undefined {
  return VENUES.find((v) => v.slug === slug);
}

// ---------------------------------------------------------------------------
// Stakeholder Views
// ---------------------------------------------------------------------------

export type StakeholderView =
  | "venue-owner"
  | "investor"
  | "player"
  | "coach"
  | "enterprise"
  | "partner";

export const STAKEHOLDER_LABELS: Record<StakeholderView, string> = {
  "venue-owner": "Venue Owner",
  investor: "Investor",
  player: "Player",
  coach: "Coach",
  enterprise: "Enterprise",
  partner: "Partner",
};
