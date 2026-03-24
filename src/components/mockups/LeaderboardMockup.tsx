import { motion } from "framer-motion";
import { Trophy, TrendingUp, Crown, Medal, Award } from "lucide-react";

const players = [
  { rank: 1, name: "Sarah M.", xp: 2840, level: "Gold", wins: 28, streak: 7, avatar: "SM", color: "bg-amber-500" },
  { rank: 2, name: "Jake T.", xp: 2650, level: "Gold", wins: 25, streak: 5, avatar: "JT", color: "bg-amber-500" },
  { rank: 3, name: "Maria L.", xp: 2310, level: "Silver", wins: 22, streak: 4, avatar: "ML", color: "bg-slate-400" },
  { rank: 4, name: "David K.", xp: 2180, level: "Silver", wins: 19, streak: 3, avatar: "DK", color: "bg-slate-400" },
  { rank: 5, name: "Lisa R.", xp: 1920, level: "Bronze", wins: 17, streak: 6, avatar: "LR", color: "bg-amber-700" },
  { rank: 6, name: "Mike P.", xp: 1750, level: "Bronze", wins: 15, streak: 2, avatar: "MP", color: "bg-amber-700" },
];

const rankIcon = (rank: number) => {
  if (rank === 1) return <Crown size={16} className="text-amber-400" />;
  if (rank === 2) return <Medal size={16} className="text-slate-300" />;
  if (rank === 3) return <Award size={16} className="text-amber-600" />;
  return <span className="text-xs text-muted-foreground font-bold">#{rank}</span>;
};

const LeaderboardMockup = () => (
  <div className="glass rounded-2xl overflow-hidden">
    <div className="p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Trophy className="text-accent" size={20} />
        <h3 className="font-bold text-foreground">Local Leaderboard</h3>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Peak · Season 1</span>
    </div>
    <div className="divide-y divide-border/50">
      {players.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className={`flex items-center gap-3 px-4 py-3 ${p.rank <= 3 ? "bg-accent/5" : ""} hover:bg-secondary/50 transition-colors`}
        >
          <div className="w-6 flex justify-center">{rankIcon(p.rank)}</div>
          <div className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-xs font-bold text-background`}>
            {p.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground text-sm">{p.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                p.level === "Gold" ? "bg-amber-500/20 text-amber-400" :
                p.level === "Silver" ? "bg-slate-400/20 text-slate-300" :
                "bg-amber-700/20 text-amber-600"
              }`}>{p.level}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5 mt-1">
              <div className="bg-primary rounded-full h-1.5 transition-all" style={{ width: `${(p.xp / 3000) * 100}%` }} />
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-foreground">{p.xp.toLocaleString()} XP</div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <TrendingUp size={10} className="text-primary" /> {p.streak} streak
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="p-3 border-t border-border text-center">
      <a href="https://courtana.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors">
        Powered by Courtana
      </a>
    </div>
  </div>
);

export default LeaderboardMockup;
