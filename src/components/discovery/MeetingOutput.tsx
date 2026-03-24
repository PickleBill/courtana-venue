import { type VenueData, type Scores, getOpportunityLevers } from "@/lib/discoveryLogic";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

const MeetingOutput = ({ data, scores }: { data: VenueData; scores: Scores }) => {
  const levers = useMemo(() => getOpportunityLevers(data), [data]);

  const whatWeHeard = useMemo(() => {
    const points: string[] = [];
    if (data.workedBefore) points.push(`What's worked: "${data.workedBefore.slice(0, 100)}${data.workedBefore.length > 100 ? "..." : ""}"`);
    if (data.notWorkedBefore) points.push(`What hasn't: "${data.notWorkedBefore.slice(0, 100)}${data.notWorkedBefore.length > 100 ? "..." : ""}"`);
    points.push(`Tools typically stay active for ${data.toolLifespan}`);
    if (data.dropoffReasons.length) points.push(`Key dropoff reasons: ${data.dropoffReasons.slice(0, 3).join(", ")}`);
    return points;
  }, [data]);

  const whatMatters = useMemo(() => {
    const top = Object.entries(data.playerMotivation).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => k);
    return [
      `Players are driven by ${top.join(" and ")}`,
      `${data.playerTypeFocus} is the primary audience`,
      data.successCriteria ? `Success = "${data.successCriteria.slice(0, 120)}${data.successCriteria.length > 120 ? "..." : ""}"` : "Success criteria not yet defined",
    ];
  }, [data]);

  const nextSteps = useMemo(() => [
    `Propose ${data.pilotCourts}-court, ${data.pilotDuration}-month pilot`,
    `Lead with ${levers[0]?.title || "core smart court experience"}`,
    `Address "${data.biggestObjection}" concern with prepared talking points`,
    "Schedule follow-up within 1 week",
    data.trialOpenness === "yes" ? "Move to installation planning" : "Send ROI summary + case study",
  ], [data, levers]);

  const kpis = useMemo(() => [
    `${data.targetRepeatVisits}% repeat visit increase`,
    `${data.targetEventParticipation}% event participation lift`,
    `${data.targetPremiumUpsell}% premium upsell growth`,
    "> 60% player engagement in week 1",
  ], [data]);

  const sections = [
    { title: "What We Heard", items: whatWeHeard, color: "text-primary" },
    { title: "What Matters Most", items: whatMatters, color: "text-accent" },
    { title: "What to Propose Next", items: nextSteps, color: "text-primary" },
    { title: "KPIs to Validate", items: kpis, color: "text-accent" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 rounded-lg bg-primary/10"><ClipboardList className="w-5 h-5 text-primary" /></div>
        <h3 className="font-bold text-lg text-foreground">Meeting Output Summary</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <div key={s.title} className="space-y-2">
            <h4 className={`text-sm font-bold ${s.color}`}>{s.title}</h4>
            <ul className="space-y-1.5">
              {s.items.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className={`${s.color} mt-1`}>•</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {data.meetingNotes && (
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-bold text-muted-foreground mb-2">Raw Meeting Notes</h4>
          <p className="text-sm text-muted-foreground/80 whitespace-pre-wrap">{data.meetingNotes}</p>
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <a href="https://courtana.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          Powered by Courtana Smart Court Technology — courtana.com
        </a>
      </div>
    </motion.div>
  );
};

export default MeetingOutput;
