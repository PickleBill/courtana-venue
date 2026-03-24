import { type VenueData, getEventConcepts } from "@/lib/discoveryLogic";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Target, TrendingUp } from "lucide-react";

const EventConcepts = ({ data }: { data: VenueData }) => {
  const events = useMemo(() => getEventConcepts(data), [data]);

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-primary/10"><Calendar className="w-5 h-5 text-primary" /></div>
        <h3 className="font-bold text-lg text-foreground">Recommended Event Concepts</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {events.map((ev, i) => (
          <motion.div key={ev.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5 space-y-3 glow-green-hover transition-all">
            <h4 className="font-bold text-foreground">{ev.name}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="w-3.5 h-3.5 text-primary" />
                <span>{ev.target}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-3.5 h-3.5 text-accent" />
                <span>{ev.goal}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${ev.fit}%` }} transition={{ duration: 0.6, delay: i * 0.1 }} />
              </div>
              <span className="text-xs font-bold text-primary">{ev.fit}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventConcepts;
