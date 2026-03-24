import { motion } from "framer-motion";
import { Play, SkipBack, SkipForward, Camera, Share2 } from "lucide-react";

const thumbnails = [
  { time: "0:12", label: "Serve" },
  { time: "0:18", label: "Rally" },
  { time: "0:24", label: "Winner" },
  { time: "0:31", label: "Ace" },
];

const ReplayMockup = () => (
  <div className="glass rounded-2xl overflow-hidden">
    <div className="p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Camera className="text-primary" size={20} />
        <h3 className="font-bold text-foreground">Instant Replay</h3>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Court 2 · 7:14 PM</span>
    </div>

    {/* Video area */}
    <div className="relative aspect-video bg-gradient-to-br from-secondary via-card to-secondary/80 flex items-center justify-center group cursor-pointer">
      {/* Court overlay lines */}
      <div className="absolute inset-8 border border-border/20 rounded" />
      <div className="absolute left-8 right-8 top-1/2 border-t border-border/20" />
      
      {/* Play button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30"
      >
        <Play size={28} className="text-primary-foreground ml-1" />
      </motion.div>

      {/* Timestamp */}
      <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-mono text-foreground">
        0:24 / 0:38
      </div>
      
      {/* Share */}
      <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 text-xs text-muted-foreground">
        <Share2 size={12} /> Share
      </div>
    </div>

    {/* Controls */}
    <div className="px-4 py-2 flex items-center gap-3 border-t border-border/50">
      <button className="text-muted-foreground hover:text-foreground transition-colors"><SkipBack size={16} /></button>
      <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
        <Play size={14} className="text-primary-foreground ml-0.5" />
      </button>
      <button className="text-muted-foreground hover:text-foreground transition-colors"><SkipForward size={16} /></button>
      <div className="flex-1 bg-secondary rounded-full h-1.5 mx-2">
        <div className="bg-primary rounded-full h-1.5 w-[63%]" />
      </div>
      <span className="text-xs text-muted-foreground font-mono">0.5x</span>
    </div>

    {/* Thumbnail strip */}
    <div className="px-4 py-3 border-t border-border/50 flex gap-2">
      {thumbnails.map((t, i) => (
        <motion.div
          key={t.time}
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={`flex-1 rounded-lg bg-secondary/80 border ${i === 2 ? "border-primary" : "border-border/50"} p-2 text-center cursor-pointer hover:bg-secondary transition-colors`}
        >
          <div className="text-[10px] font-mono text-muted-foreground">{t.time}</div>
          <div className="text-[10px] font-semibold text-foreground">{t.label}</div>
        </motion.div>
      ))}
    </div>

    <div className="p-3 border-t border-border text-center">
      <a href="https://courtana.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors">
        Instant Replay by Courtana
      </a>
    </div>
  </div>
);

export default ReplayMockup;
