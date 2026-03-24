import { getObjectionTalkingPoints } from "@/lib/discoveryLogic";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const ObjectionHandling = ({ objection }: { objection: string }) => {
  const points = useMemo(() => getObjectionTalkingPoints(objection), [objection]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-accent/10"><Shield className="w-5 h-5 text-accent" /></div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Objection Response</h3>
          <p className="text-xs text-muted-foreground capitalize">Concern: {objection}</p>
        </div>
      </div>
      <div className="space-y-3">
        {points.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30">
            <span className="text-primary font-bold text-sm mt-0.5">{i + 1}.</span>
            <p className="text-sm text-muted-foreground leading-relaxed">{p}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ObjectionHandling;
