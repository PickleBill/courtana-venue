import { type VenueData, type Scores, getOpportunityLevers } from "@/lib/discoveryLogic";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const OpportunityLevers = ({ data, scores }: { data: VenueData; scores: Scores }) => {
  const levers = useMemo(() => getOpportunityLevers(data), [data]);

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-primary/10"><Zap className="w-5 h-5 text-primary" /></div>
        <h3 className="font-bold text-lg text-foreground">Priority Opportunity Levers</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {levers.map((l, i) => (
          <motion.div key={l.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5 space-y-3 glow-green-hover transition-all group">
            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{l.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{l.why}</p>
            <div className="text-xs text-muted-foreground/70 border-t border-border pt-2 space-y-1">
              <p><span className="text-primary font-semibold">Signal:</span> {l.signal}</p>
              <p><span className="text-accent font-semibold">Impact:</span> {l.effect}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OpportunityLevers;
