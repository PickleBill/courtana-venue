import { motion } from "framer-motion";
import { Shield, Flame, Target, Zap, Star, Award, Trophy, Heart } from "lucide-react";

const badges = [
  { name: "Rally Master", desc: "Won a rally over 20 shots", icon: Zap, color: "from-purple-500 to-indigo-600", earned: true },
  { name: "Kitchen King", desc: "50 dinks in one session", icon: Target, color: "from-teal-400 to-cyan-600", earned: true },
  { name: "Steady Eddie", desc: "Played 5 days in a row", icon: Flame, color: "from-orange-400 to-red-500", earned: true },
  { name: "Ace Machine", desc: "10 service aces in one event", icon: Star, color: "from-amber-400 to-yellow-600", earned: true },
  { name: "Social Butterfly", desc: "Played with 20+ partners", icon: Heart, color: "from-pink-400 to-rose-600", earned: true },
  { name: "Iron Wall", desc: "95%+ return rate in a match", icon: Shield, color: "from-blue-400 to-blue-600", earned: false },
  { name: "Tournament Titan", desc: "Won 3 tournaments", icon: Trophy, color: "from-amber-500 to-amber-700", earned: false },
  { name: "Sharpshooter", desc: "80%+ shot accuracy", icon: Award, color: "from-emerald-400 to-green-600", earned: false },
];

const BadgesMockup = () => (
  <div className="glass rounded-2xl overflow-hidden">
    <div className="p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Shield className="text-primary" size={20} />
        <h3 className="font-bold text-foreground">Badges & Achievements</h3>
      </div>
      <span className="text-xs text-primary font-semibold">5/8 earned</span>
    </div>
    <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {badges.map((b, i) => (
        <motion.div
          key={b.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className={`relative rounded-xl p-3 text-center transition-all ${
            b.earned ? "bg-secondary/80 hover:bg-secondary" : "bg-secondary/30 opacity-50"
          }`}
        >
          <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center mb-2 ${
            !b.earned ? "grayscale" : ""
          }`}>
            <b.icon size={20} className="text-white" />
          </div>
          <div className="text-xs font-bold text-foreground leading-tight">{b.name}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{b.desc}</div>
          {!b.earned && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-muted-foreground bg-background/80 px-2 py-0.5 rounded-full">Locked</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
    <div className="p-3 border-t border-border text-center">
      <a href="https://courtana.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors">
        Gamification by Courtana
      </a>
    </div>
  </div>
);

export default BadgesMockup;
