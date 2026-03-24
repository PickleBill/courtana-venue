import { type VenueData, type Scores } from "@/lib/discoveryLogic";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Rocket, CheckCircle } from "lucide-react";

const TrialRecommendation = ({ data, scores }: { data: VenueData; scores: Scores }) => {
  const rec = useMemo(() => {
    const features: string[] = [];
    if (data.rankingsImportance >= 6) features.push("Leaderboards & Rankings");
    if (data.highlightsImportance >= 6) features.push("Instant Replay & Highlights");
    if (data.playerMotivation.competition >= 6) features.push("Competitive Formats (King of the Court)");
    if (data.playerMotivation.improvement >= 6) features.push("AI Coaching Analysis");
    if (data.shareableImportance >= 6) features.push("Social Sharing Integration");
    if (features.length === 0) features.push("Core Smart Court Experience", "Gamification & Badges");

    const kpis = [
      `${data.targetRepeatVisits}% increase in repeat visits`,
      `${data.targetEventParticipation}% increase in event participation`,
      `${data.targetPremiumUpsell}% increase in premium upsell`,
      "Player engagement rate > 60% in first week",
      "Court utilization during Courtana events vs baseline",
    ];

    return { courts: data.pilotCourts, duration: data.pilotDuration, features, kpis };
  }, [data]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 glow-green">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 rounded-lg bg-primary/10"><Rocket className="w-5 h-5 text-primary" /></div>
        <h3 className="font-bold text-lg text-foreground">Recommended Pilot Structure</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Setup</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Courts</span><span className="font-bold text-foreground">{rec.courts}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Duration</span><span className="font-bold text-foreground">{rec.duration} months</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Readiness</span><span className="font-bold text-primary">{scores.readiness}/100</span></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Key Features</div>
          <div className="space-y-1.5">
            {rec.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" /><span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">60-Day KPIs</div>
          <div className="space-y-1.5">
            {rec.kpis.map((k) => (
              <div key={k} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-0.5">→</span><span>{k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrialRecommendation;
