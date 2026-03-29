import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Play, Brain, Trophy, ExternalLink, Mail, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIAnalysisMockup from "@/components/mockups/AIAnalysisMockup";
import ReplayMockup from "@/components/mockups/ReplayMockup";

const CDN_VIDEO = "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/ce00696b-9f9b-465a-971c-dbf1334e556c.mp4";
const CDN_LOGO = "https://cdn.courtana.com/assets/logos/fulllogo-dark-transparent-grad.svg";
const CDN_AVATAR = "https://cdn.courtana.com/files/production/u/a3c7e1d0-4b2f-4a8e-9f1c-6d5e8b3a2c1f/7d873c1f-ec81-487a-8fe7-97bdb94a6397.png";
const CDN_RANK_BADGE = "https://cdn.courtana.com/files/production/u/0573819f-7e19-4e13-8d5c-90a771136f7e/58a41527-1ba8-4805-a8ab-5431ceb7c6ac.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const techCards = [
  { icon: Camera, title: "Smart Cameras", desc: "High-definition cameras capture every shot from multiple angles. No wearables, no setup — just play." },
  { icon: Play, title: "Instant Replay", desc: "Review any point on your phone seconds after it happens. Share highlights with friends instantly." },
  { icon: Brain, title: "AI Analysis", desc: "Our AI tracks shot placement, spin, speed, and patterns. Get actionable insights that improve your game." },
  { icon: Trophy, title: "Gamification", desc: "Earn badges, climb leaderboards, and complete challenges. Turn every session into a reason to come back." },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Technology", href: "#technology" },
  { label: "See It Live", href: "#live" },
  { label: "Contact", href: "#contact" },
];

const VenuePreview = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <a href="#about">
            <img src={CDN_LOGO} alt="Courtana" className="h-8" />
          </a>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setMobileNav(!mobileNav)}>
            {mobileNav ? (
              <ChevronUp size={24} />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
        {mobileNav && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 pb-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileNav(false)}
                className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ===== SECTION 1: Hero + About ===== */}
      <section id="about" className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background video */}
        <video
          src={CDN_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ backgroundColor: "#0f1923" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />

        <div className="relative z-10 container mx-auto max-w-4xl px-4 pt-24 pb-16">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeInUp} className="label-text text-primary mb-4 block text-sm font-semibold tracking-widest uppercase">
              About Courtana
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-foreground mb-8 leading-tight">
              Smart courts.<br />Smarter business.
            </motion.h1>
            <motion.div variants={fadeInUp} className="space-y-4 text-muted-foreground text-lg max-w-2xl">
              <p>
                Courtana is a sports technology company that turns ordinary courts into intelligent playing environments.
                Our camera-based system captures every shot, analyzes patterns with AI, and delivers insights that help
                players improve and venues grow.
              </p>
              <p>
                We believe technology should be invisible. No wearables, no apps to fumble with during play, no complicated setup.
                Just show up, play, and let the court do the rest.
              </p>
              <p>
                For venues, Courtana is a revenue multiplier. Our event programming, gamification features, and data-driven
                insights drive court utilization, player retention, and new revenue streams that didn't exist before.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-8">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2">
                <a href="https://courtana.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Learn more at courtana.com
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 2: Technology ===== */}
      <section id="technology" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            The Technology
          </motion.h2>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {techCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                className="glass rounded-2xl p-6 text-center glow-green-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <card.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive mockups */}
          <div className="grid lg:grid-cols-2 gap-6">
            <AIAnalysisMockup />
            <ReplayMockup />
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: See It Live ===== */}
      <section id="live" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              See It Live
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real highlights. Real data. Captured automatically from live play.
            </motion.p>
          </motion.div>

          {/* Video player with controls */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto mb-10"
          >
            <div className="rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)]">
              <video
                src={CDN_VIDEO}
                controls
                muted
                playsInline
                className="w-full"
                poster="https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/01915c59-9bb7-4683-bd53-e28bddcae12e.jpeg"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center mt-3 italic">
              AI-generated highlight — captured automatically from live match play. No cameras to operate, no editing required.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
          >
            {[
              { value: "4,097", label: "Highlights Captured" },
              { value: "25", label: "Ranked Players" },
              { value: "82+", label: "Badges Earned" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <div className="text-xl font-extrabold text-gradient-green">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
            <div className="glass rounded-xl p-4 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-xl font-extrabold text-gradient-green">LIVE</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">System Active</div>
            </div>
          </motion.div>

          {/* Player Profile Preview */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-md mx-auto mb-12"
          >
            <div className="glass rounded-2xl p-6 flex items-center gap-5">
              <div className="relative shrink-0">
                <img src={CDN_AVATAR} alt="PickleBill" className="w-16 h-16 rounded-full border-2 border-primary/40 object-cover" />
                <img src={CDN_RANK_BADGE} alt="Gold III" className="absolute -bottom-1 -right-1 w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">PickleBill</h4>
                <p className="text-sm text-primary font-semibold">Gold III · #1 Global</p>
                <p className="text-xs text-muted-foreground">Level 17 · 283,950 XP</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-3 italic">
              Every player gets a profile. Every session builds their story.
            </p>
          </motion.div>

          {/* Live links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2">
              <a href="https://courtana.com/session-highlights/KYMLnLpmA6Sq" target="_blank" rel="noopener noreferrer">
                <Play size={16} />
                View a Live Session →
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl gap-2">
              <a href="https://courtana.com/highlight/KyRtzDmrpBQN" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                Watch a Highlight Clip →
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 4: Contact ===== */}
      <section id="contact" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Bring Courtana to Your Venue
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-8">
              We're partnering with forward-thinking venues ready to offer the next generation of court sports experiences.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2">
                <a href="mailto:bill@courtana.com">
                  <Mail size={16} />
                  Email Us
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl gap-2">
                <a href="https://courtana.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Visit courtana.com
                </a>
              </Button>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm text-muted-foreground">
              bill@courtana.com · courtana.com
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center space-y-1">
          <p className="text-sm text-muted-foreground">© 2026 Courtana · <a href="https://courtana.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">courtana.com</a></p>
          <p className="text-xs text-muted-foreground/60">Powered by Courtana Smart Court Technology</p>
        </div>
      </footer>
    </div>
  );
};

export default VenuePreview;
