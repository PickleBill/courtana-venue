import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart3, TrendingUp, Gamepad2, CalendarDays, Users, Search, Lock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CDN } from "@/data/courtana-live";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const dashboards = [
  {
    title: "Venue Dashboard",
    desc: "Pilot scorecard with utilization, revenue projections, and event tracking.",
    icon: BarChart3,
    to: "/dashboard",
    color: "hsl(145, 100%, 45%)",
  },
  {
    title: "Investor View",
    desc: "Market sizing, unit economics, and growth trajectory for stakeholders.",
    icon: TrendingUp,
    to: "/investor",
    color: "hsl(48, 100%, 50%)",
  },
  {
    title: "Player Showcase",
    desc: "Player profiles, leaderboards, badges, and the gamification experience.",
    icon: Gamepad2,
    to: "/player",
    color: "hsl(270, 60%, 60%)",
  },
  {
    title: "Event Programming",
    desc: "Launch calendar, tournament planning, and community event series.",
    icon: CalendarDays,
    to: "/events",
    color: "hsl(0, 70%, 60%)",
  },
  {
    title: "Schedule & Courts",
    desc: "Multi-court grid, booking calendar, and real-time court status.",
    icon: Users,
    to: "/schedule",
    color: "hsl(190, 80%, 50%)",
  },
  {
    title: "Discovery Tool",
    desc: "Interactive sales discovery — score venue fit, model revenue, handle objections.",
    icon: Search,
    to: "/discovery",
    color: "hsl(30, 90%, 55%)",
  },
];

const Exclusive = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative pt-36 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-15" style={{ background: "radial-gradient(ellipse, hsl(48 100% 50% / 0.3), transparent 70%)" }} />
      </div>
      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <Lock size={14} className="text-accent" />
            <span className="text-sm font-semibold text-accent tracking-wide">Exclusive Access</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-foreground mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Custom <span className="text-gradient-gold">Venue Dashboard</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The full suite of tools powering the Courtana smart court experience — from pilot analytics to player engagement.
          </motion.p>
        </motion.div>
      </div>
    </section>

    {/* Dashboard Grid */}
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {dashboards.map((d) => (
            <motion.div key={d.title} variants={fadeInUp}>
              <Link
                to={d.to}
                className="glass rounded-2xl p-8 flex flex-col h-full group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 glow-green-hover block"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${d.color}15` }}
                >
                  <d.icon size={28} style={{ color: d.color }} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{d.desc}</p>
                <span className="text-sm text-primary font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Powered by */}
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-md text-center">
        <img src={CDN.logo} alt="Courtana" className="h-8 mx-auto mb-4 opacity-50" />
        <p className="text-sm text-muted-foreground">
          Powered by Courtana Smart Court Technology
        </p>
      </div>
    </section>

    <Footer />
  </div>
);

export default Exclusive;
