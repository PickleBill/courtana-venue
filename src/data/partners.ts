import { Monitor, GraduationCap, Swords, ShoppingBag, Users, FlaskConical, Rocket, type LucideIcon } from "lucide-react";

export type PartnerCategory = "Core Platform" | "Coaching" | "Community" | "Equipment" | "Technology" | "Agency";
export type PartnerStatus = "Live" | "In Development" | "Coming Soon" | "Open Slot";

export interface Partner {
  name: string;
  category: PartnerCategory;
  url: string;
  status: PartnerStatus;
  description: string;
  connection: string;
  icon: LucideIcon;
}

export interface WeekPartner {
  label: string;
  partnerName: string;
  url: string;
}

export const partners: Partner[] = [
  {
    name: "Courtana Smart Courts",
    category: "Core Platform",
    url: "https://courtana.com",
    status: "Live",
    description: "AI-powered smart court technology — cameras, sensors, and real-time analytics for every point played.",
    connection: "The engine powering the entire ecosystem. Every partner feature runs on Courtana data.",
    icon: Monitor,
  },
  {
    name: "Courtana Coach Connect",
    category: "Coaching",
    url: "https://courtana-coach-play.lovable.app",
    status: "Live",
    description: "The coaching marketplace connecting certified pros with venues and players.",
    connection: "Coaches book through venues, teach on smart courts, and use AI insights to personalize lessons.",
    icon: GraduationCap,
  },
  {
    name: "Kings Court Coach (Casey)",
    category: "Coaching",
    url: "https://courtana-coach-play.lovable.app",
    status: "Live",
    description: "Data-driven coaching by Casey — blending analytics and sport science for next-level player development.",
    connection: "Individual coach powered by Courtana analytics. Proof that the platform scales to pros.",
    icon: GraduationCap,
  },
  {
    name: "Freakshow Paddles",
    category: "Equipment",
    url: "https://freakfosho.lovable.app",
    status: "Live",
    description: "Bold, high-performance custom paddles for players who refuse to blend in.",
    connection: "Equipment sponsor for launch events. Players demo paddles at Courtana-powered venues.",
    icon: Swords,
  },
  {
    name: "Paddles & Pals",
    category: "Community",
    url: "https://paddles-and-pals.lovable.app",
    status: "Live",
    description: "The social hub for recreational pickleball — meetups, groups, and community-first play.",
    connection: "Feeds players into venue events. Community layer that drives repeat visits and group bookings.",
    icon: Users,
  },
  {
    name: "Layup Lab",
    category: "Technology",
    url: "https://layuplab.lovable.app",
    status: "Live",
    description: "Advanced analytics and training platform — deep dives into shot patterns, fitness metrics, and improvement tracking.",
    connection: "Analytics layer for serious players. Data flows from smart courts into personalized training plans.",
    icon: FlaskConical,
  },
  {
    name: "VibeCo Labs",
    category: "Agency",
    url: "https://vibeco.lovable.app",
    status: "Live",
    description: "The builder behind the ecosystem. Zero-to-one websites, brands, and digital products — shipped in hours.",
    connection: "Builds partner sites, marketing assets, and MVPs. The agency flywheel powering ecosystem growth.",
    icon: Rocket,
  },
];

export const openSlots: { name: string; category: PartnerCategory }[] = [
  { name: "Your Brand Here", category: "Equipment" },
  { name: "Tournament Organizer", category: "Community" },
  { name: "Beverage Sponsor", category: "Equipment" },
  { name: "Apparel Partner", category: "Equipment" },
];

export const weekPartners: Record<number, WeekPartner> = {
  1: { label: "Sponsored by", partnerName: "Freakshow Paddles", url: "https://freakfosho.lovable.app" },
  2: { label: "Hosted by", partnerName: "Coach Connect", url: "https://courtana-coach-play.lovable.app" },
  3: { label: "Community by", partnerName: "Paddles & Pals", url: "https://paddles-and-pals.lovable.app" },
  4: { label: "Powered by", partnerName: "Courtana Smart Courts", url: "https://courtana.com" },
  5: { label: "Analytics by", partnerName: "Layup Lab", url: "https://layuplab.lovable.app" },
  6: { label: "Featured Coach", partnerName: "Casey — Kings Court", url: "https://courtana-coach-play.lovable.app" },
  7: { label: "Powered by", partnerName: "Courtana AI", url: "https://courtana.com" },
  8: { label: "Built by", partnerName: "VibeCo Labs", url: "https://vibeco.lovable.app" },
};
