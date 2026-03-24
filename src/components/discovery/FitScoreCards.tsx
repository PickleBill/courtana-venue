import { type Scores } from "@/lib/discoveryLogic";
import { motion } from "framer-motion";

const scoreColor = (v: number) => v >= 70 ? "text-primary" : v >= 50 ? "text-accent" : "text-destructive";
const ringColor = (v: number) => v >= 70 ? "stroke-primary" : v >= 50 ? "stroke-accent" : "stroke-destructive";
const trailColor = (v: number) => v >= 70 ? "stroke-primary/20" : v >= 50 ? "stroke-accent/20" : "stroke-destructive/20";

const CircleScore = ({ value, label }: { value: number; label: string }) => {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-6 flex flex-col items-center gap-3 glow-green-hover transition-all">
      <svg width="90" height="90" className="-rotate-90">
        <circle cx="45" cy="45" r={r} fill="none" strokeWidth="6" className={trailColor(value)} />
        <motion.circle cx="45" cy="45" r={r} fill="none" strokeWidth="6" className={ringColor(value)} strokeLinecap="round"
          strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <span className={`text-3xl font-extrabold ${scoreColor(value)} -mt-[72px] mb-6`}>{value}</span>
      <span className="text-xs text-muted-foreground font-medium text-center">{label}</span>
    </motion.div>
  );
};

const FitScoreCards = ({ scores }: { scores: Scores }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <CircleScore value={scores.overall} label="Venue Fit" />
    <CircleScore value={scores.engagement} label="Engagement Opportunity" />
    <CircleScore value={scores.monetization} label="Monetization Opportunity" />
    <CircleScore value={scores.readiness} label="Trial Readiness" />
  </div>
);

export default FitScoreCards;
