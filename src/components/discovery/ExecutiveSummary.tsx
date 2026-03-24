import { type VenueData, type Scores, generateSummary } from "@/lib/discoveryLogic";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const ExecutiveSummary = ({ data, scores }: { data: VenueData; scores: Scores }) => {
  const summary = useMemo(() => generateSummary(data, scores), [data, scores]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 glow-green">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-primary/10"><FileText className="w-5 h-5 text-primary" /></div>
        <h3 className="font-bold text-lg text-foreground">Executive Summary</h3>
      </div>
      <p className="text-base text-muted-foreground leading-relaxed">{summary}</p>
    </motion.div>
  );
};

export default ExecutiveSummary;
