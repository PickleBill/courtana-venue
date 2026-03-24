import { type VenueData, type Scores, getFunnelData } from "@/lib/discoveryLogic";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Activity, BarChart3, Filter } from "lucide-react";

const DiscoveryCharts = ({ data, scores }: { data: VenueData; scores: Scores }) => {
  const radarData = useMemo(() => Object.entries(data.playerMotivation).map(([key, val]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1), value: val, fullMark: 10,
  })), [data.playerMotivation]);

  const barData = useMemo(() => [
    { name: "Repeat Visits", current: 40, courtana: 40 + data.targetRepeatVisits },
    { name: "Event Participation", current: 35, courtana: 35 + data.targetEventParticipation },
    { name: "Premium Experience", current: 20, courtana: 20 + data.targetPremiumUpsell },
    { name: "Social Sharing", current: 15, courtana: 15 + Math.round(data.shareableImportance * 3) },
    { name: "Retention", current: 45, courtana: 45 + Math.round(scores.engagement * 0.3) },
  ], [data, scores]);

  const funnelData = useMemo(() => getFunnelData(data), [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Radar */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm text-foreground">Player Motivation</h4>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(217, 19%, 17%)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215, 16%, 62%)", fontSize: 11 }} />
            <Radar dataKey="value" stroke="hsl(145, 100%, 45%)" fill="hsl(145, 100%, 45%)" fillOpacity={0.2} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm text-foreground">Impact Projection</h4>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 19%, 17%)" />
            <XAxis type="number" tick={{ fill: "hsl(215, 16%, 62%)", fontSize: 10 }} />
            <YAxis dataKey="name" type="category" tick={{ fill: "hsl(215, 16%, 62%)", fontSize: 10 }} width={90} />
            <Tooltip contentStyle={{ background: "hsl(220, 22%, 10%)", border: "1px solid hsl(217, 19%, 17%)", borderRadius: 8, color: "hsl(214, 32%, 91%)" }} />
            <Bar dataKey="current" fill="hsl(215, 19%, 25%)" radius={[0, 4, 4, 0]} name="Current" />
            <Bar dataKey="courtana" fill="hsl(145, 100%, 45%)" radius={[0, 4, 4, 0]} name="With Courtana" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Funnel */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-primary" />
          <h4 className="font-bold text-sm text-foreground">Engagement Funnel</h4>
        </div>
        <div className="space-y-3 mt-2">
          {funnelData.map((item, i) => (
            <div key={item.stage} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{item.stage}</span>
                <span className="font-bold" style={{ color: item.fill }}>{item.value}%</span>
              </div>
              <div className="h-5 rounded-full bg-secondary/50 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: item.fill }}
                  initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ duration: 0.8, delay: i * 0.15 }}
                />
              </div>
            </div>
          ))}
          {funnelData[3]?.value < 30 && (
            <p className="text-xs text-destructive/80 mt-2">⚠ Habit formation is the likely breakdown point. Courtana's gamification loop addresses this directly.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DiscoveryCharts;
