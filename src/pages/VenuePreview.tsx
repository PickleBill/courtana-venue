import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Play, Brain, Trophy, ExternalLink, Mail, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIAnalysisMockup from "@/components/mockups/AIAnalysisMockup";
import ReplayMockup from "@/components/mockups/ReplayMockup";
import { CDN, LIVE_LINKS, PLATFORM_STATS, PLAYERS, LEADERBOARD } from "@/data/courtana-live";

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

const HIGHLIGHT_CLIPS = [
  { url: "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/70043064-c6c3-4f60-8744-5671a1f85e35.mp4", label: "Rally Highlight" },
  { url: "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/0ec3d983-c439-4126-ae11-d659c4c5e379.mp4", label: "Kitchen Battle" },
  { url: "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/bccb8b27-3b6c-4189-86b4-d6677798a50a.mp4", label: "Ace Serve" },
  { url: "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/96f9f529-d92e-4ab4-a675-0305a8b0b9ea.mp4", label: "Cross-Court Winner" },
  { url: "https://cdn.courtana.com/files/production/u/01915c59-9bb7-4683-bd53-e28bddcae12e/c30b464e-25b4-4029-ba30-49b1f3877f42.mp4", label: "Dink Rally" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Technology", href: "#technology" },
  { label: "See It Live", href: "#live" },
  { label: "Contact", href: "#contact" },
];

const tierColor = (tier: string) => {
  if (tier.startsWith("Gold")) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
  if (tier.startsWith("Silver")) return "text-gray-300 bg-gray-300/10 border-gray-300/20";
  return "text-orange-400 bg-orange-400/10 border-orange-400/20";
};

const HighlightCard = ({ clip }: { clip: typeof HIGHLIGHT_CLIPS[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="min-w-[260px] sm:min-w-[300px] snap-start bg-gray-900/80 rounded-xl overflow-hidden flex-shrink-0"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; }}
      onTouchStart={() => videoRef.current?.play()}
    >
      <video
        ref={videoRef}
        src={clip.url}
        poster={CDN.highlightPoster}
        muted
        playsInline
        className="w-full aspect-video object-cover"
      />
      <div className="px-3 py-2">
        <span className="text-sm font-semibold text-white">{clip.label}</span>
      </div>
    </div>
  );
};

const VenuePreview = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileNav(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <a href="#about" onClick={(e) => scrollToSection(e, "#about")}>
            <img src={CDN.logo} alt="Courtana" className="h-8" />
          </a>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => scrollToSection(e, l.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#action"
              onClick={(e) => scrollToSection(e, "#action")}
              className="text-sm font-bold text-primary border border-primary/30 px-4 py-1.5 rounded-full hover:bg-primary/10 transition-colors glow-green-hover"
            >
              See It In Action
            </a>
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
                onClick={(e) => scrollToSection(e, l.href)}
                className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#action"
              onClick={(e) => scrollToSection(e, "#action")}
              className="block py-2.5 text-sm font-bold text-primary"
            >
              See It In Action
            </a>
          </div>
        )}
      </header>

      {/* ===== SECTION 1: Hero + About ===== */}
      <section id="about" className="relative min-h-[90vh] flex items-center overflow-hidden scroll-mt-16">
        {/* Background — Looping highlight video */}
        <video
          src={CDN.highlightVideo2}
          poster={CDN.highlightPoster}
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
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
              Smart courts.<br />Smarter business.
            </motion.h1>
            <motion.div variants={fadeInUp} className="space-y-4 text-gray-300 text-lg max-w-2xl">
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
                <a href={LIVE_LINKS.mainSite} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Learn more at courtana.com
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION: See It In Action Carousel ===== */}
      <section id="action" className="py-20 px-4 scroll-mt-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-8">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-3">
              See It In Action
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400">
              Real highlights. Real players. Captured automatically by Courtana.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {HIGHLIGHT_CLIPS.map((clip) => (
              <HighlightCard key={clip.label} clip={clip} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 2: Technology ===== */}
      <section id="technology" className="py-20 px-4 bg-card/50 scroll-mt-16">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
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
                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-300">{card.desc}</p>
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
      <section id="live" className="py-20 px-4 scroll-mt-16">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-3">
              See It Live
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 text-lg max-w-xl mx-auto">
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
                src={CDN.highlightVideo1}
                controls
                muted
                playsInline
                className="w-full"
                poster={CDN.highlightPoster}
              />
            </div>
            <p className="text-sm text-gray-400 text-center mt-3 italic">
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
              { value: PLATFORM_STATS.totalHighlights.toLocaleString(), label: "Highlights Captured" },
              { value: String(PLATFORM_STATS.rankedPlayers), label: "Ranked Players" },
              { value: `${PLATFORM_STATS.badgesEarned}+`, label: "Badges Earned" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <div className="text-xl font-extrabold text-gradient-green">{s.value}</div>
                <div className="text-xs text-gray-300 mt-1">{s.label}</div>
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
              <div className="text-xs text-gray-300 mt-1">System Active</div>
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
            <a href={PLAYERS.picklebill.profileUrl} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-6 flex items-center gap-5 group hover:border-primary/40 transition-colors block">
              <div className="relative shrink-0">
                <img src={PLAYERS.picklebill.avatar} alt={PLAYERS.picklebill.username} className="w-16 h-16 rounded-full border-2 border-primary/40 object-cover" />
                <img src={CDN.goldIIIBadge} alt={PLAYERS.picklebill.rankTier} className="absolute -bottom-1 -right-1 w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{PLAYERS.picklebill.username}</h4>
                <p className="text-sm text-emerald-400 font-semibold">{PLAYERS.picklebill.rankTier} · #{PLAYERS.picklebill.rank} Global</p>
                <p className="text-xs text-gray-300">Level {PLAYERS.picklebill.level} · {PLAYERS.picklebill.xp.toLocaleString()} XP</p>
              </div>
            </a>
            <p className="text-sm text-gray-400 text-center mt-3 italic">
              Every player gets a profile. Every session builds their story.
            </p>
          </motion.div>

          {/* Mini Leaderboard */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-md mx-auto mb-12"
          >
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border flex items-center gap-2">
                <Trophy className="text-primary" size={18} />
                <h4 className="font-bold text-white">Top Players</h4>
              </div>
              <div className="divide-y divide-border/50">
                {LEADERBOARD.slice(0, 5).map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between px-4 py-3 ${
                      entry.rank === 1 ? "bg-emerald-500/10 border border-emerald-500/20 rounded-lg mx-1 my-1" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold w-5 text-center text-emerald-400">
                        {entry.rank}
                      </span>
                      {entry.rank === 1 ? (
                        <a
                          href={LIVE_LINKS.playerProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-white hover:text-primary transition-colors"
                        >
                          {entry.username}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-white">{entry.username}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-300">{entry.xp.toLocaleString()} XP</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tierColor(entry.rankTier)}`}>
                        {entry.rankTier}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center mt-3 italic">
              Live rankings from Courtana courts
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2">
              <a href={LIVE_LINKS.sessionHighlights} target="_blank" rel="noopener noreferrer">
                <Play size={16} />
                View a Live Session →
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl gap-2">
              <a href={LIVE_LINKS.highlightClip} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                Watch a Highlight Clip →
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 4: Contact ===== */}
      <section id="contact" className="py-20 px-4 bg-card/50 scroll-mt-16">
        <div className="container mx-auto max-w-xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white mb-4">
              Bring Courtana to Your Venue
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 text-lg mb-8">
              We're partnering with forward-thinking venues ready to offer the next generation of court sports experiences.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2">
                <a href="mailto:bill@courtana.com">
                  <Mail size={16} />
                  Email Us
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl gap-2">
                <a href={LIVE_LINKS.mainSite} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Visit courtana.com
                </a>
              </Button>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm text-gray-400">
              bill@courtana.com · (908) 601-8152
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center space-y-1">
          <p className="text-sm text-gray-400">© 2026 Courtana · <a href={LIVE_LINKS.mainSite} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">courtana.com</a></p>
          <p className="text-xs text-gray-500">Powered by Courtana Smart Court Technology</p>
        </div>
      </footer>
    </div>
  );
};

export default VenuePreview;
