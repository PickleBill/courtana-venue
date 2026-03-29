import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Camera, Megaphone, Brain, Gamepad2, Users, Radio,
  ArrowRight, ExternalLink, Zap, ChevronDown, Handshake, CheckCircle, Play, Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EcosystemFlywheel from "@/components/partners/EcosystemFlywheel";
import { partners } from "@/data/partners";
import { CDN, LIVE_LINKS } from "@/data/courtana-live";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const stats = [
  { value: "6", label: "Smart Courts" },
  { value: "$0", label: "Upfront Cost" },
  { value: "8", label: "Week Pilot" },
  { value: "$95", label: "/court/mo post-pilot" },
];

const valueProps = [
  {
    icon: Camera, title: "Cameras on Every Court",
    desc: "High-definition cameras across your smart courts. Non-invasive install. Instant replay on court-side displays. Players see their highlights in real time.",
  },
  {
    icon: Megaphone, title: "We Run Your Events",
    desc: "Tournaments? We put cameras on them. Grand openings? We live-broadcast them. Coaching clinics? We handle booking and payment.",
  },
  {
    icon: Brain, title: "AI Coaching at $20–25",
    desc: "Your coaches' lessons, enhanced with AI video review. A new revenue tier between free advice and premium lessons. Revenue shared between coach, venue, and Courtana.",
  },
  {
    icon: Gamepad2, title: "Gamification That Sticks",
    desc: "Badges, XP, leaderboards, trick shot recognition. The dopamine loop that makes players say \"one more game.\" This is how we beat the novelty dropoff.",
  },
  {
    icon: Users, title: "Open Play, Solved",
    desc: "Real-time court displays showing who's playing, how many spots are open, skill levels on court. No more guessing. Players scan in and Courtana matches them.",
  },
  {
    icon: Radio, title: "Live Broadcast",
    desc: "Live streams from championship courts turn cameras into a marketing billboard. Nearby hotels, highways, and social feeds all become acquisition channels.",
  },
];

const weeks = [
  { num: 1, dates: "Week 1", title: "Install + Coach Preview", focus: "LAUNCH", color: "bg-purple-500/20 text-purple-400", desc: "Install cameras across smart courts. Configure displays. Run a private session for your coaching staff — let them see AI analysis on their own games. Coaches become evangelists before players ever see it." },
  { num: 2, dates: "Week 2", title: "Grand Opening Celebration", focus: "EVENTS", color: "bg-amber-500/20 text-amber-400", desc: "Mark the moment with a grand open house on the Courtana courts. Free play, live highlights on the big screens, player account sign-ups. First taste of the gamification system." },
  { num: 3, dates: "Week 3", title: "Coaching Clinic Series Launches", focus: "EVENTS", color: "bg-amber-500/20 text-amber-400", desc: "First paid coaching clinic on Courtana courts. Coach-led drills with AI analysis delivered to each player. Test the AI coaching revenue model." },
  { num: 4, dates: "Week 4", title: "Tournament Week", focus: "EVENTS", color: "bg-amber-500/20 text-amber-400", desc: "Your first Courtana-powered tournament. Every match recorded, highlights auto-generated, leaderboard running on displays. Every player leaves with a highlight reel and a reason to come back." },
  { num: 5, dates: "Week 5", title: "Community Event", focus: "LAUNCH", color: "bg-purple-500/20 text-purple-400", desc: "A signature community event powered by smart court tech — player stats, live leaderboard, instant replay on the big screens." },
  { num: 6, dates: "Week 6", title: "Gamification Goes Live", focus: "DATA", color: "bg-cyan-500/20 text-cyan-400", desc: "Full gamification rollout: badges, XP points, achievement system, trick shot recognition, weekly leaderboard. The retention play that beats the novelty wears-off problem." },
  { num: 7, dates: "Week 7", title: "Matchmaking + Open Play", focus: "GROWTH", color: "bg-primary/20 text-primary", desc: "Skill-based matchmaking and the open play display system. Real-time court status on screens — who's playing, skill level, spots open. Guest fees for non-members who come in through Courtana." },
  { num: 8, dates: "Week 8", title: "The Numbers", focus: "REVIEW", color: "bg-red-500/20 text-red-400", desc: "End-of-pilot ROI review. Hard numbers: court utilization lift, revenue from events and AI coaching, player engagement metrics, highlights generated, new player accounts." },
];

const revenueStreams = [
  { name: "Premium court pricing uplift", conservative: "$450", realistic: "$900", upside: "$1,350" },
  { name: "AI coaching reviews", conservative: "$500", realistic: "$1,000", upside: "$1,500" },
  { name: "Tournament/event revenue share", conservative: "$200", realistic: "$500", upside: "$800" },
  { name: "Walk-in/guest fees", conservative: "$100", realistic: "$300", upside: "$500" },
  { name: "Open play optimization", conservative: "$100", realistic: "$250", upside: "$400" },
];

const livePartners = partners.filter((p) => p.status === "Live").slice(0, 6);

const SeeMore = () => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(ellipse, hsl(145 100% 45% / 0.3), transparent 70%)" }} />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-base font-semibold text-primary tracking-wide">Courtana Smart Courts</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-foreground mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              The <span className="text-gradient-green">Ecosystem</span> &amp; The Plan
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              A growing network of venues, coaches, and brands — plus the 8-week playbook that proves ROI before you commit.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Flywheel */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
            <motion.h2 variants={fadeInUp} className="text-foreground mb-4 font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }}>
              Part of Something Bigger
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-14 max-w-xl mx-auto">
              Your venue joins a growing network building the future of court sports together.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center mb-14">
              <EcosystemFlywheel />
            </motion.div>

            {/* Partner highlights grid */}
            <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {livePartners.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-xl p-5 text-left hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <p.icon className="text-primary" size={18} />
                    </div>
                    <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{p.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                </a>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary rounded-xl px-8 py-5 text-base font-bold gap-2" asChild>
                <Link to="/partners">
                  Explore Full Ecosystem
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeInUp} className="glass rounded-2xl p-6 text-center glow-green">
                <div className="text-4xl md:text-5xl font-extrabold text-gradient-green mb-2">{s.value}</div>
                <div className="text-base text-muted-foreground font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 className="text-foreground text-center mb-4 font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            Built for Your Facility
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground text-center mb-14 max-w-xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            Every feature designed around your venue, your coaches, and your players.
          </motion.p>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {valueProps.map((v) => (
              <motion.div key={v.title} variants={fadeInUp} className="glass rounded-2xl p-8 glow-green-hover transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <v.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8-Week Timeline */}
      <section className="py-24 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 className="text-foreground text-center mb-4 font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            The 8-Week Playbook
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground text-center mb-14 max-w-xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            Each week builds on the last. By week 8, you'll have hard data on ROI.
          </motion.p>
          <motion.div className="space-y-4 relative" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <div className="absolute left-7 top-0 bottom-0 w-px bg-border hidden md:block" />
            {weeks.map((w) => {
              const isOpen = expandedWeek === w.num;
              return (
                <motion.div key={w.num} variants={fadeInUp} className="flex gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-base flex-shrink-0 z-10">
                      {w.num}
                    </div>
                  </div>
                  <div
                    className={`glass rounded-2xl flex-1 transition-all duration-300 cursor-pointer ${isOpen ? "ring-1 ring-primary/30" : "glow-green-hover hover:-translate-y-0.5"}`}
                    onClick={() => setExpandedWeek(isOpen ? null : w.num)}
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="md:hidden w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                          {w.num}
                        </span>
                        <h3 className="text-lg font-bold text-foreground flex-1">{w.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${w.color}`}>{w.focus}</span>
                        <ChevronDown size={18} className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 font-medium">{w.dates}</p>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <p className="text-base text-muted-foreground leading-relaxed">{w.desc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {!isOpen && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{w.desc}</p>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Economics */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.h2 className="text-foreground text-center mb-14 font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            The Economics
          </motion.h2>
          <motion.div className="grid md:grid-cols-3 gap-8 mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { label: "Your Investment During Pilot", value: "$0", sub: "Hardware, software, events support, marketing — all on us for 8 weeks." },
              { label: "Post-Pilot Subscription", value: "$95/court/mo", sub: "$0 during the 8-week pilot. Post-pilot: $95/court/mo for continued service. Cancel anytime." },
              { label: "Projected Revenue Lift", value: "$2,000–4,500/mo", sub: "From premium court pricing, coaching, events, and walk-ins combined.", gold: true },
            ].map((m) => (
              <motion.div key={m.label} variants={fadeInUp} className={`glass rounded-2xl p-8 text-center ${m.gold ? "border-accent/30 glow-green" : ""}`}>
                <div className="text-sm text-muted-foreground mb-3 font-medium">{m.label}</div>
                <div className={`font-extrabold mb-3 ${m.gold ? "text-gradient-gold" : "text-foreground"}`} style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{m.value}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{m.sub}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="glass rounded-2xl overflow-x-auto mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-5 text-muted-foreground font-semibold text-base">Revenue Stream</th>
                  <th className="text-right p-5 text-muted-foreground font-semibold text-base">Conservative</th>
                  <th className="text-right p-5 text-muted-foreground font-semibold text-base">Realistic</th>
                  <th className="text-right p-5 text-muted-foreground font-semibold text-base">Upside</th>
                </tr>
              </thead>
              <tbody>
                {revenueStreams.map((r) => (
                  <tr key={r.name} className="border-b border-border/50">
                    <td className="p-5 text-foreground text-sm font-medium">{r.name}</td>
                    <td className="p-5 text-right text-muted-foreground text-base">{r.conservative}</td>
                    <td className="p-5 text-right text-foreground text-base">{r.realistic}</td>
                    <td className="p-5 text-right text-primary font-bold text-base">{r.upside}</td>
                  </tr>
                ))}
                <tr className="bg-primary/5">
                  <td className="p-5 font-bold text-foreground text-lg">Total Monthly</td>
                  <td className="p-5 text-right font-bold text-muted-foreground text-lg">$1,350</td>
                  <td className="p-5 text-right font-bold text-foreground text-lg">$2,950</td>
                  <td className="p-5 text-right font-bold text-primary text-lg">$4,550</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          <motion.div className="glass rounded-2xl p-8 border-primary/20 glow-green" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Zap className="text-primary" size={22} />
              Zero Risk
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              $0 during the 8-week pilot. Post-pilot: $95/court/mo for continued service. Cancel anytime. Your first AI coaching clinic covers the monthly cost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Commitments */}
      <section className="py-24 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <motion.h2 className="text-foreground text-center mb-4 font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            Partnership Commitments
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground text-center mb-14 max-w-xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            What each side brings to the table.
          </motion.p>
          <motion.div className="grid md:grid-cols-2 gap-8 mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp} className="glass rounded-2xl p-8 border-l-4 border-l-primary">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Handshake className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">What Courtana Invests</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Hardware for your smart courts — shipped, configured, $0 to your facility",
                  "Full platform access — AI analysis, highlights, gamification, player app",
                  "Co-promotion of your events through the Courtana network",
                  "Social content creation during pilot",
                  "Weekly performance dashboard with real-time data",
                  "Dedicated partner contact — direct line to leadership",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <span className="text-base text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass rounded-2xl p-8 border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">What Your Venue Invests</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Your team installs cameras (we ship, you mount, we configure remotely)",
                  "1-hour coaching staff session — all coaches, Week 1",
                  "One launch email to your members (we draft it)",
                  "\"Powered by Courtana\" signage + marketing mention",
                  "Bi-weekly product feedback — what's working, what isn't",
                  "Coaches test new features and give structured feedback",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    <span className="text-base text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.p className="text-center text-muted-foreground italic text-base max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            "A development partnership, not a software purchase. We invest together. We win together."
          </motion.p>
        </div>
      </section>

      {/* The Path Forward */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.h2 className="text-foreground text-center mb-4 font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            The Path Forward
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground text-center mb-14 max-w-xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            A clear progression from pilot to partnership.
          </motion.p>
          <motion.div className="grid md:grid-cols-3 gap-0 relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-border -translate-y-1/2 z-0" />
            {[
              { num: 1, badge: "8 WEEKS", title: "The Pilot", desc: "Smart courts installed. Real events. Real data. We fund the hardware and platform. You bring the facility and the community. At Week 8, the numbers tell the story." },
              { num: 2, badge: "WEEK 8", title: "The Decision", desc: "We review success metrics together — court utilization, player engagement, platform revenue. If the data says go, we expand. If not, we pull the hardware and part as friends." },
              { num: 3, badge: "ONGOING", title: "The Partnership", desc: "Expand to more courts. Revenue shifts to your venue. New features ship to you first. Your feedback shapes the product. Your network grows the ecosystem." },
            ].map((step) => (
              <motion.div key={step.num} variants={fadeInUp} className="relative z-10 p-4">
                <div className="glass rounded-2xl p-8 text-center h-full flex flex-col">
                  <div className="inline-flex items-center justify-center mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider border border-primary/20">
                      {step.badge}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed flex-1">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-4 relative overflow-hidden bg-card/50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(ellipse, hsl(145 100% 45% / 0.4), transparent 70%)" }} />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeInUp} className="text-foreground mb-4 font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }}>
              Ready to bring smart courts to your venue?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Let's talk about what Courtana can do for your facility.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-6 text-lg font-bold glow-green gap-3" asChild>
                <a href="mailto:bill@courtana.com?subject=Courtana%20Smart%20Courts%20Partnership">
                  <ExternalLink size={20} />
                  Start the Conversation
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary rounded-xl px-8 py-6 text-lg font-bold gap-3" asChild>
                <a href={LIVE_LINKS.mainSite} target="_blank" rel="noopener noreferrer">
                  Learn more at courtana.com
                  <ArrowRight size={16} />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SeeMore;
