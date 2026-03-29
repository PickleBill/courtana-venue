/**
 * courtana-live.ts — Real-time data bridge to the Courtana production API.
 *
 * Provides typed fetchers for anonymous (public) endpoints so the venue app
 * can display live highlights, badges, leaderboards, store items, and player
 * profiles pulled straight from courtana.com.
 */

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const API_BASE = "https://courtana.com/app";
const CDN_BASE = "https://cdn.courtana.com";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ---------------------------------------------------------------------------
// Highlights
// ---------------------------------------------------------------------------

export type HighlightType = "STANDARD" | "PANEL" | "AI" | "FULL_MATCH" | "AI_ANALYSIS";

export interface Highlight {
  id: number;
  name: string;
  random_id: string;
  type: HighlightType;
  sport: string;
  file_url: string | null;
  thumbnail_url: string | null;
  duration: number | null;
  view_count: number;
  ai_analyzed: boolean;
  analysis_data: Record<string, unknown> | null;
  match: number | null;
  participants: PlayerProfile[];
  created_at: string;
}

export interface HighlightGroup {
  id: number;
  random_id: string;
  match: number;
  expected_highlight_count: number;
  is_ai_analysis: boolean;
  view_count: number;
  highlights: Highlight[];
}

export interface HighlightCollection {
  id: number;
  random_id: string;
  highlights: Highlight[];
  highlight_groups: HighlightGroup[];
}

// ---------------------------------------------------------------------------
// Matches
// ---------------------------------------------------------------------------

export type MatchStatus = "READY" | "STARTING_TASK" | "IN_PROGRESS" | "COMPLETE";

export interface MatchPlayer {
  profile_id: number | null;
  random_id: string | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_file: string | null;
  avatar_thumbnail_small: string | null;
}

export interface Match {
  id: number;
  random_id: string;
  court: number;
  court_name: string;
  status: MatchStatus;
  winning_score: 11 | 15 | 21;
  player_1: MatchPlayer | null;
  player_2: MatchPlayer | null;
  player_3: MatchPlayer | null;
  player_4: MatchPlayer | null;
  highlights_count: number;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Live Feeds
// ---------------------------------------------------------------------------

export interface LiveFeed {
  id: number;
  name: string;
  random_id: string;
  court: number | null;
  facility: number | null;
  thumbnail_url: string | null;
  hls_streaming_url: string | null;
  active: boolean;
}

// ---------------------------------------------------------------------------
// Badges & Avatars
// ---------------------------------------------------------------------------

export type BadgeTier = "BRICK" | "WOOD" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

export interface Badge {
  id: number;
  name: string;
  slug: string;
  description: string;
  criteria: string;
  tier: BadgeTier;
  type: "INDIVIDUAL" | "MATCH";
  file_url: string | null;
  thumbnail_small_url: string | null;
  thumbnail_medium_url: string | null;
  rarity: number | null;
  active: boolean;
}

export interface BadgeAward {
  id: number;
  random_id: string;
  badge: Badge;
  profile: PlayerProfile;
  gemini_reason: string | null;
  awarded_at: string;
  view_count: number;
  highlight: number | null;
  match: number | null;
}

export interface Avatar {
  id: number;
  name: string;
  slug: string;
  description: string;
  tier: BadgeTier;
  file_url: string | null;
  thumbnail_small_url: string | null;
  thumbnail_medium_url: string | null;
  is_default: boolean;
}

// ---------------------------------------------------------------------------
// Player Profiles
// ---------------------------------------------------------------------------

export interface PlayerProfile {
  id: number;
  random_id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_file: string | null;
  avatar_thumbnail_small: string | null;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export type StoreItemCategory = "HARDWARE" | "CABLE" | "ADAPTER" | "ACCESSORY";

export interface StoreItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: StoreItemCategory;
  price: string; // DecimalField serialised as string
  image_url: string | null;
  purchase_url: string | null;
  active: boolean;
  sort_order: number;
}

// ---------------------------------------------------------------------------
// Facilities & Courts
// ---------------------------------------------------------------------------

export interface Facility {
  id: number;
  name: string;
  city: string;
  state: string;
  timezone: string;
  subscribed_court_count: number;
}

export interface Court {
  id: number;
  name: string;
  random_id: string;
  facility_name: string;
  sport: string;
  sport_display: string;
  thumbnail_url: string | null;
  displayed_match: Match | null;
}

// ---------------------------------------------------------------------------
// Fetcher helper
// ---------------------------------------------------------------------------

async function fetchApi<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Courtana API ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Public (anon) fetchers
// ---------------------------------------------------------------------------

/** Fetch paginated highlights (anonymous). */
export function fetchHighlights(params?: Record<string, string>) {
  return fetchApi<PaginatedResponse<Highlight>>("/anon-highlights/", params);
}

/** Fetch a single highlight by random_id. */
export function fetchHighlight(randomId: string) {
  return fetchApi<Highlight>(`/anon-highlights/${randomId}/`);
}

/** Fetch highlight groups (anonymous). */
export function fetchHighlightGroups(params?: Record<string, string>) {
  return fetchApi<PaginatedResponse<HighlightGroup>>("/anon-highlight-groups/", params);
}

/** Fetch highlight collections (anonymous). */
export function fetchHighlightCollections(params?: Record<string, string>) {
  return fetchApi<PaginatedResponse<HighlightCollection>>("/anon-highlight-collections/", params);
}

/** Fetch matches (anonymous). */
export function fetchMatches(params?: Record<string, string>) {
  return fetchApi<PaginatedResponse<Match>>("/anon-matches/", params);
}

/** Fetch live camera feeds (anonymous). */
export function fetchLiveFeeds(params?: Record<string, string>) {
  return fetchApi<PaginatedResponse<LiveFeed>>("/anon-live-feeds/", params);
}

/** Fetch badge awards (anonymous). */
export function fetchBadgeAwards(params?: Record<string, string>) {
  return fetchApi<PaginatedResponse<BadgeAward>>("/anon-badge-awards/", params);
}

/** Fetch showcase / leaderboard (anonymous). */
export function fetchShowcase(params?: Record<string, string>) {
  return fetchApi<PaginatedResponse<unknown>>("/anon-showcase/", params);
}

/** Fetch player profiles (anonymous). */
export function fetchProfiles(params?: Record<string, string>) {
  return fetchApi<PaginatedResponse<PlayerProfile>>("/anon-profiles/", params);
}

/** Fetch store items (public). */
export function fetchStoreItems(params?: Record<string, string>) {
  return fetchApi<PaginatedResponse<StoreItem>>("/store-items/", params);
}

// ---------------------------------------------------------------------------
// CDN helpers
// ---------------------------------------------------------------------------

/** Build a CDN URL for a production file by directory UUID and file UUID. */
export function cdnFileUrl(directoryUuid: string, fileUuid: string) {
  return `${CDN_BASE}/files/production/u/${directoryUuid}/${fileUuid}`;
}

/** Well-known CDN directory UUIDs. */
export const CDN_DIRS = {
  highlights: "01915c59-9bb7-4683-bd53-e28bddcae12e",
  highlightThumbnails: "faad1826-b310-4602-89d2-cc8eea8444f6",
  avatars: "a3c7e1d0-4b2f-4a8e-9f1c-6d5e8b3a2c1f",
  ranks: "0573819f-7e19-4e13-8d5c-90a771136f7e",
  badges: "eefe1c2b-6708-4f79-ba0f-897f04974e94",
  courts: "8dd94047-e4f5-41d3-b68b-135c0087b874",
  storeItems: "a7c3e1f4-9b2d-4e8a-b5f6-c8d0e2f4a6b8",
  facilityScoreboards: "fef6135c-5343-4399-9c50-ab2739066852",
  liveFeeds: "a9d144b6-c982-4d13-9f9c-8d8e4c9405ff",
} as const;

/** Well-known asset URLs used across the venue app. */
export const CDN_ASSETS = {
  logo: `${CDN_BASE}/assets/logos/fulllogo-dark-transparent-grad.svg`,
  heroVideo: cdnFileUrl(CDN_DIRS.highlights, "ce00696b-9f9b-465a-971c-dbf1334e556c.mp4"),
  heroPoster: cdnFileUrl(CDN_DIRS.highlights, "01915c59-9bb7-4683-bd53-e28bddcae12e.jpeg"),
  picklebillAvatar: cdnFileUrl(CDN_DIRS.avatars, "7d873c1f-ec81-487a-8fe7-97bdb94a6397.png"),
  goldIIIBadge: cdnFileUrl(CDN_DIRS.ranks, "58a41527-1ba8-4805-a8ab-5431ceb7c6ac.png"),
} as const;

// ---------------------------------------------------------------------------
// View URL builders (public shareable links on courtana.com)
// ---------------------------------------------------------------------------

const SITE = "https://courtana.com";

export function highlightUrl(randomId: string) {
  return `${SITE}/highlight/${randomId}/`;
}

export function highlightGroupUrl(randomId: string) {
  return `${SITE}/highlight-group/${randomId}/`;
}

export function matchHighlightsUrl(randomId: string) {
  return `${SITE}/match-highlights/${randomId}/`;
}

export function badgeAwardUrl(randomId: string) {
  return `${SITE}/badge/${randomId}/`;
}

export function playerProfileUrl(randomId: string) {
  return `${SITE}/player/${randomId}/`;
}

export function sessionHighlightsUrl(randomId: string) {
  return `${SITE}/session-highlights/${randomId}/`;
}

// ---------------------------------------------------------------------------
// React Query key factory (for use with @tanstack/react-query)
// ---------------------------------------------------------------------------

export const courtanaKeys = {
  all: ["courtana"] as const,
  highlights: (params?: Record<string, string>) => [...courtanaKeys.all, "highlights", params] as const,
  highlightGroups: (params?: Record<string, string>) => [...courtanaKeys.all, "highlight-groups", params] as const,
  highlightCollections: (params?: Record<string, string>) => [...courtanaKeys.all, "highlight-collections", params] as const,
  matches: (params?: Record<string, string>) => [...courtanaKeys.all, "matches", params] as const,
  liveFeeds: (params?: Record<string, string>) => [...courtanaKeys.all, "live-feeds", params] as const,
  badgeAwards: (params?: Record<string, string>) => [...courtanaKeys.all, "badge-awards", params] as const,
  showcase: (params?: Record<string, string>) => [...courtanaKeys.all, "showcase", params] as const,
  profiles: (params?: Record<string, string>) => [...courtanaKeys.all, "profiles", params] as const,
  storeItems: (params?: Record<string, string>) => [...courtanaKeys.all, "store-items", params] as const,
} as const;
