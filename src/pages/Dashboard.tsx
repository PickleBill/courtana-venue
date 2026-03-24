import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from "recharts";
import { TrendingUp, Users, Calendar, DollarSign, Activity, Trophy, Zap, ArrowUpRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeaderboardMockup from "@/components/mockups/LeaderboardMockup";
import BadgesMockup from "@/components/mockups/BadgesMockup";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const kpis = [
  { label: "Total Revenue", value: "$4,280", change: "+18%", icon: DollarSign, accent: true },
  { label: "Court Utilization", value: "67%", change: "+23%", icon: Activity },
  { label: "Active Players", value: "142", change: "+34", icon: Users },
  { label: "Events Run", value: "12", change: "4 this week", icon: Calendar },
];

const revenueData = [
  { week: "Wk 1", courtana: 320, baseline: 180 },
  { week: "Wk 2", courtana: 580, baseline: 200 },
  { week: "Wk 3", courtana: 450, baseline: 190 },
  { week: "Wk 4", courtana: 720, baseline: 210 },
  { week: "Wk 5", courtana: 860, baseline: 195 },
  { week: "Wk 6", courtana: 950, baseline: 220 },
  { week: "Wk 7", courtana: 1100, baseline: 205 },
  { week: "Wk 8", courtana: 1280, baseline: 215 },
];

const playerGrowth = [
  { week: "Wk 1", players: 18 },
  { week: "Wk 2", players: 34 },
  { week: "Wk 3", players: 52 },
  { week: "Wk 4", players: 71 },
  { week: "Wk 5", players: 89 },
  { week: "Wk 6", players: 108 },
  { week: "Wk 7", players: 126 },
  { week: "Wk 8", players: 142 },
];

const utilizationHeatmap = [
  { hour: "8 AM", Mon: 20, Tue: 30, Wed: 55, Thu: 25, Fri: 40, Sat: 75, Sun: 60 },
  { hour: "10 AM", Mon: 35, Tue: 45, Wed: 70, Thu: 40, Fri: 50, Sat: 90, Sun: 75 },
  { hour: "12 PM", Mon: 50, Tue: 55, Wed: 85, Thu: 60, Fri: 65, Sat: 95, Sun: 80 },
  { hour: "2 PM", Mon: 45, Tue: 50, Wed: 80, Thu: 55, Fri: 60, Sat: 88, Sun: 70 },
  { hour: "4 PM", Mon: 60, Tue: 65, Wed: 90, Thu: 70, Fri: 75, Sat: 92, Sun: 65 },
  { hour: "6 PM", Mon: 75, Tue: 80, Wed: 95, Thu: 85, Fri: 90, Sat: 85, Sun: 55 },
  { hour: "8 PM", Mon: 55, Tue: 60, Wed: 80, Thu: 65, Fri: 85, Sat: 70, Sun: 40 },
];

const eventPerformance = [
  { name: "Launch Night Open Play", revenue: "$0", attendance: "40/40", repeat: "72%", roi: "★★★★★" },
  { name: "Drill & Play Clinic", revenue: "$640", attendance: "16/16", repeat: "81%", roi: "★★★★★" },
  { name: "Charity Round Robin", revenue: "$360", attendance: "24/24", repeat: "68%", roi: "★★★★☆" },
  { name: "Beginner Bootcamp", revenue: "$300", attendance: "12/12", repeat: "92%", roi: "★★★★★" },
  { name: "Friday Night Fights", revenue: "$320", attendance: "32/32", repeat: "88%", roi: "★★★★★" },
  { name: "Pro-Am Exhibition", revenue: "$1,200", attendance: "58/60", repeat: "65%", roi: "★★★★☆" },
];

const engagementMetrics = [
  { label: "Leaderboard Participation", value: "78%", icon: Trophy },
  { label: "Badges Earned", value: "324", icon: Zap },
  { label: "Avg Sessions/Week", value: "2.4", icon: Activity },
  { label: "Referral Rate", value: "31%", icon: Users },
];

const getHeatColor = (val: number) => {
  if (val >= 90) return "bg-primary text-primary-foreground font-bold";
  if (val >= 75) return "bg-primary/60 text-foreground";
  if (val >= 55) return "bg-primary/30 text-foreground";
  if (val >= 35) return "bg-primary/15 text-muted-foreground";
  return "bg-secondary text-muted-foreground";
};

const Dashboard = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-10">
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="section-title text-foreground">
                Courtana × <span className="text-gradient-green">Peak</span> Dashboard
              </h1>
              <p className="text-muted-foreground">Pilot performance at a glance — 8 weeks of data.</p>
            </div>
            <a
              href="https://courtana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary hover:bg-primary/20 transition-colors"
            >
              <ExternalLink size={14} />
              Powered by courtana.com
            </a>
          </motion.div>
        </motion.div>

        {/* KPIs */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {kpis.map((k) => (
            <motion.div
              key={k.label}
              variants={fadeInUp}
              className={`glass rounded-2xl p-5 ${k.accent ? "border-accent/30 glow-green" : ""}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{k.label}</span>
                <k.icon size={16} className={k.accent ? "text-accent" : "text-primary"} />
              </div>
              <div className={`text-2xl md:text-3xl font-extrabold ${k.accent ? "text-gradient-gold" : "text-foreground"}`}>
                {k.value}
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                <ArrowUpRight size={12} /> {k.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revenue Chart + Player Growth */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="lg:col-span-2 glass rounded-2xl p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="font-bold text-foreground mb-1">Revenue Trend</h3>
            <p className="text-xs text-muted-foreground mb-4">Courtana events vs baseline court revenue</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(145, 100%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(145, 100%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 15%)" />
                  <XAxis dataKey="week" tick={{ fill: "hsl(215, 16%, 62%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(215, 16%, 62%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(220, 26%, 10%)", border: "1px solid hsl(215, 20%, 15%)", borderRadius: 12, fontSize: 12 }}
                    labelStyle={{ color: "hsl(214, 32%, 91%)" }}
                  />
                  <Area type="monotone" dataKey="courtana" stroke="hsl(145, 100%, 45%)" fill="url(#colorRev)" strokeWidth={2} name="Courtana Events" />
                  <Area type="monotone" dataKey="baseline" stroke="hsl(215, 16%, 47%)" fill="transparent" strokeWidth={1.5} strokeDasharray="4 4" name="Baseline" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="font-bold text-foreground mb-1">Player Growth</h3>
            <p className="text-xs text-muted-foreground mb-4">Cumulative signups over pilot</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={playerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 15%)" />
                  <XAxis dataKey="week" tick={{ fill: "hsl(215, 16%, 62%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(215, 16%, 62%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(220, 26%, 10%)", border: "1px solid hsl(215, 20%, 15%)", borderRadius: 12, fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="players" stroke="hsl(145, 100%, 45%)" strokeWidth={2} dot={{ fill: "hsl(145, 100%, 45%)", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Utilization Heatmap */}
        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="font-bold text-foreground mb-1">Court Utilization Heatmap</h3>
          <p className="text-xs text-muted-foreground mb-4">% utilization by hour and day (darker = busier)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="p-2 text-left text-muted-foreground font-semibold">Time</th>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <th key={d} className="p-2 text-center text-muted-foreground font-semibold">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {utilizationHeatmap.map((row) => (
                  <tr key={row.hour}>
                    <td className="p-2 text-muted-foreground font-medium">{row.hour}</td>
                    {(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const).map((day) => (
                      <td key={day} className="p-1">
                        <div className={`rounded-lg py-2 text-center text-[11px] font-medium ${getHeatColor(row[day])}`}>
                          {row[day]}%
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Event Performance + Engagement */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          <motion.div
            className="lg:col-span-3 glass rounded-2xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="p-6 pb-0">
              <h3 className="font-bold text-foreground mb-1">Event Performance</h3>
              <p className="text-xs text-muted-foreground mb-4">Revenue, attendance, and repeat player rates</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-muted-foreground font-semibold">Event</th>
                    <th className="text-right p-4 text-muted-foreground font-semibold">Revenue</th>
                    <th className="text-right p-4 text-muted-foreground font-semibold">Attendance</th>
                    <th className="text-right p-4 text-muted-foreground font-semibold">Repeat %</th>
                    <th className="text-right p-4 text-muted-foreground font-semibold">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {eventPerformance.map((e) => (
                    <tr key={e.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-4 text-foreground font-medium">{e.name}</td>
                      <td className="p-4 text-right text-primary font-semibold">{e.revenue}</td>
                      <td className="p-4 text-right text-foreground">{e.attendance}</td>
                      <td className="p-4 text-right text-foreground">{e.repeat}</td>
                      <td className="p-4 text-right text-accent">{e.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <h3 className="font-bold text-foreground">Engagement Metrics</h3>
            {engagementMetrics.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeInUp}
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <m.icon size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                  <div className="text-lg font-bold text-foreground">{m.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Leaderboard + Badges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="section-title text-foreground mb-6">Player Engagement</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <LeaderboardMockup />
            <BadgesMockup />
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Dashboard;
