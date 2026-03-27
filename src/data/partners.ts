import { Monitor, GraduationCap, Swords, ShoppingBag, Users, FlaskConical, Rocket, MapPin, Dumbbell, Megaphone, type LucideIcon } from "lucide-react";

export type PartnerCategory = "Core Platform" | "Coaching" | "Community" | "Equipment" | "Technology" | "Agency" | "Venue" | "Health & Wellness" | "Marketing";
export type PartnerStatus = "Live" | "In Development" | "Coming Soon" | "Open Slot";

export interface Partner {
  name: string;
  category: PartnerCategory;
  url: string;
  status: PartnerStatus;
  description: string;
  connection: string;
  icon: LucideIcon;
  videoUrl?: string;
  imageUrl?: string;
}

export interface WeekPartner {
  label: string;
  partnerName: string;
  url: string;
}

export const partners: Partner[] = [
  {
    name: "Peak Pickleball",
    category: "Venue",
    url: "https://peakpickleball.club",
    status: "Live",
    description: "Greensboro's premier pickleball destination — 19 courts, 250 members, and the first Courtana smart court venue in the Southeast.",
    connection: "The flagship venue proving the smart court model. 6 Courtana courts live April 7. Full 19-court expansion in progress.",
    icon: MapPin,
    videoUrl: "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/ce00696b-9f9b-465a-971c-dbf1334e556c.mp4",
    imageUrl: "https://peakpickleball.club/wp-content/uploads/2026/03/IMG_2132-scaled.jpeg",
  },
  {
    name: "Underground Pickleball",
    category: "Venue",
    url: "https://undergroundpickleball.com",
    status: "Live",
    description: "Charlotte's underground pickleball scene — indoor courts, craft beer, and late-night play in a converted warehouse.",
    connection: "Second Courtana venue partner. Smart courts powering league play and social events.",
    icon: MapPin,
  },
  {
    name: "Seven Oaks Pickleball",
    category: "Venue",
    url: "#",
    status: "Coming Soon",
    description: "Upscale outdoor pickleball complex in the Raleigh-Durham market with 12 championship courts.",
    connection: "Expansion market venue. Courtana install planned for Q3 2026.",
    icon: MapPin,
  },
  {
    name: "Urban Pickleball ATX",
    category: "Venue",
    url: "#",
    status: "Coming Soon",
    description: "Austin's newest indoor pickleball destination — 8 courts, rooftop bar, and a focus on competitive play.",
    connection: "First Texas venue partner. Smart courts for league and tournament play.",
    icon: MapPin,
  },
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
  {
    name: "Capital City Pickleball",
    category: "Venue",
    url: "#",
    status: "Coming Soon",
    description: "DC-area pickleball complex targeting the government and corporate market with premium amenities.",
    connection: "Northeast expansion venue. Smart court install planned for late 2026.",
    icon: MapPin,
  },
  {
    name: "StretchLab",
    category: "Health & Wellness",
    url: "#",
    status: "Coming Soon",
    description: "Assisted stretching studio — recovery and flexibility for competitive pickleball players.",
    connection: "Wellness partner offering recovery sessions at Courtana venues. Player health data integration.",
    icon: Dumbbell,
  },
  {
    name: "G5quared",
    category: "Marketing",
    url: "#",
    status: "Coming Soon",
    description: "Performance marketing and growth strategy for sports and entertainment brands.",
    connection: "Marketing partner driving venue awareness and player acquisition across the ecosystem.",
    icon: Megaphone,
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
