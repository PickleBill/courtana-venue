import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Partner, PartnerCategory } from "@/data/partners";

const categoryColors: Record<PartnerCategory, string> = {
  "Core Platform": "bg-primary/20 text-primary",
  "Coaching": "bg-amber-500/20 text-amber-400",
  "Community": "bg-purple-500/20 text-purple-400",
  "Equipment": "bg-red-500/20 text-red-400",
  "Technology": "bg-cyan-500/20 text-cyan-400",
  "Agency": "bg-pink-500/20 text-pink-400",
  "Venue": "bg-primary/20 text-primary",
  "Health & Wellness": "bg-emerald-500/20 text-emerald-400",
  "Marketing": "bg-orange-500/20 text-orange-400",
};

const statusColors: Record<string, string> = {
  Live: "bg-primary/20 text-primary",
  "In Development": "bg-amber-500/20 text-amber-400",
  "Coming Soon": "bg-muted text-muted-foreground",
  "Open Slot": "border border-dashed border-border text-muted-foreground",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const PartnerCard = ({ partner }: { partner: Partner }) => (
  <motion.div variants={fadeInUp} className="glass rounded-2xl overflow-hidden glow-green-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
    {partner.videoUrl && (
      <div className="relative">
        <video
          src={partner.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-primary/30">
          <Play size={10} className="text-primary" />
          <span className="text-[10px] font-bold text-primary">Courtana Live</span>
        </div>
      </div>
    )}
    <div className="p-8 flex flex-col flex-1">
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <partner.icon className="text-primary" size={24} />
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColors[partner.status]}`}>
          {partner.status}
        </span>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-1">{partner.name}</h3>
      <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold mb-4 w-fit ${categoryColors[partner.category]}`}>
        {partner.category}
      </span>
      <p className="text-base text-muted-foreground leading-relaxed mb-4 flex-1">{partner.description}</p>
      <p className="text-sm text-muted-foreground/70 italic mb-6">🔗 {partner.connection}</p>
      <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 w-full gap-2" asChild>
        <a href={partner.url} target="_blank" rel="noopener noreferrer">
          Visit Site <ExternalLink size={14} />
        </a>
      </Button>
    </div>
  </motion.div>
);

export const OpenSlotCard = ({ name, category }: { name: string; category: PartnerCategory }) => (
  <motion.div variants={fadeInUp} className="rounded-2xl p-8 border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-center min-h-[280px] hover:border-primary/30 transition-colors">
    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
      <span className="text-2xl">+</span>
    </div>
    <h3 className="text-lg font-bold text-muted-foreground mb-1">{name}</h3>
    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${categoryColors[category]}`}>{category}</span>
  </motion.div>
);