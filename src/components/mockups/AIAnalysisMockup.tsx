import { motion } from "framer-motion";
import { Brain, Crosshair } from "lucide-react";

const stats = [
  { label: "Shot Speed", value: "34 mph", bar: 68 },
  { label: "Spin Rate", value: "1,240 rpm", bar: 82 },
  { label: "Accuracy", value: "76%", bar: 76 },
  { label: "Consistency", value: "84%", bar: 84 },
];

const shotDots = [
  { x: 25, y: 30, size: 8, opacity: 0.9 },
  { x: 40, y: 20, size: 6, opacity: 0.7 },
  { x: 60, y: 35, size: 10, opacity: 1 },
  { x: 35, y: 55, size: 7, opacity: 0.8 },
  { x: 70, y: 25, size: 9, opacity: 0.9 },
  { x: 50, y: 45, size: 6, opacity: 0.6 },
  { x: 30, y: 70, size: 8, opacity: 0.85 },
  { x: 65, y: 60, size: 7, opacity: 0.75 },
  { x: 45, y: 15, size: 5, opacity: 0.65 },
  { x: 55, y: 72, size: 8, opacity: 0.9 },
];

const AIAnalysisMockup = () => (
  <div className="glass rounded-2xl overflow-hidden">
    <div className="p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Brain className="text-primary" size={20} />
        <h3 className="font-bold text-foreground">AI Shot Analysis</h3>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-primary font-bold">Live</span>
    </div>
    <div className="p-4 grid grid-cols-2 gap-4">
      {/* Court diagram */}
      <div className="relative bg-secondary/50 rounded-xl border border-border aspect-[3/4] overflow-hidden">
        {/* Court lines */}
        <div className="absolute inset-3 border border-border/60 rounded" />
        <div className="absolute left-3 right-3 top-1/2 border-t border-border/60" />
        <div className="absolute left-3 right-3 top-[30%] border-t border-dashed border-border/30" />
        <div className="absolute left-3 right-3 top-[70%] border-t border-dashed border-border/30" />
        <div className="absolute top-3 bottom-3 left-1/2 border-l border-border/40" />
        {/* Shot placement dots */}
        {shotDots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
            className="absolute rounded-full bg-primary"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
              boxShadow: "0 0 8px hsl(var(--primary) / 0.5)",
            }}
          />
        ))}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] text-muted-foreground">
          <Crosshair size={10} /> Shot placement
        </div>
      </div>

      {/* Stats panel */}
      <div className="space-y-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">{s.label}</span>
              <span className="font-bold text-foreground">{s.value}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5">
              <motion.div
                className="bg-primary rounded-full h-1.5"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.bar}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              />
            </div>
          </motion.div>
        ))}
        <div className="pt-2">
          <div className="text-[10px] text-muted-foreground mb-1">AI Insight</div>
          <p className="text-xs text-foreground leading-relaxed">
            Strong cross-court placement. Work on kitchen-line consistency — 
            shots landing 6" deeper than optimal.
          </p>
        </div>
      </div>
    </div>
    <div className="p-3 border-t border-border text-center">
      <a href="https://courtana.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors">
        AI Analysis by Courtana
      </a>
    </div>
  </div>
);

export default AIAnalysisMockup;
