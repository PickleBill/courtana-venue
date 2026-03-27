import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, Link2, TrendingUp, ExternalLink, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EcosystemFlywheel from "@/components/partners/EcosystemFlywheel";
import { PartnerCard, OpenSlotCard } from "@/components/partners/PartnerCard";
import { partners, openSlots } from "@/data/partners";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const howItWorks = [
  {
    icon: Rocket,
    title: "We Build It",
    desc: "VibeCo builds partner sites from zero to live in hours. Custom brands, e-commerce, coaching platforms — all production-ready.",
  },
  {
    icon: Link2,
    title: "We Connect It",
    desc: "Courtana smart courts link everything: player data, event schedules, coaching analytics, and equipment partners.",
  },
  {
    icon: TrendingUp,
    title: "We Grow It",
    desc: "The marketing flywheel drives traffic, engagement, and revenue across every partner in the ecosystem.",
  },
];

const Partners = () => {
  const [view, setView] = useState("all");

  const filteredPartners = useMemo(() => {
    if (view === "venue") return partners.filter((p) => p.category === "Venue");
    if (view === "ecosystem") return partners.filter((p) => p.category !== "Venue");
    return partners;
  }, [view]);

  const peakPartner = partners.find((p) => p.name === "Peak Pickleball");

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-15" style={{ background: "radial-gradient(ellipse, hsl(145 100% 45% / 0.3), transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(48 100% 50% / 0.2), transparent 70%)" }} />
        </div>

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 variants={fadeInUp} className="text-foreground mb-4 font-extrabold" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.1 }}>
              The <span className="text-gradient-green">Courtana</span> Ecosystem
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-foreground/80 mb-6">
              Smart courts. Connected partners. Infinite possibilities.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Every partner in our ecosystem is connected through Courtana's smart court platform — creating a flywheel of value for venues, players, coaches, and brands.
            </motion.p>
          </motion.div>

          {/* Flywheel */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <EcosystemFlywheel />
          </motion.div>

          {/* Featured Venue — Compact Card */}
          {peakPartner && (
            <motion.div
              className="max-w-2xl mx-auto mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a href={peakPartner.url} target="_blank" rel="noopener noreferrer" className="block glass rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Rocket className="text-primary" size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-foreground text-lg">{peakPartner.name}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">Flagship Venue</span>
                    </div>
                    <div className="text-sm text-muted-foreground">19 Courts · Greensboro, NC · 6 Smart Courts Live April 7</div>
                  </div>
                  <ExternalLink size={16} className="text-muted-foreground flex-shrink-0" />
                </div>
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Partner Cards */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="text-foreground text-center mb-4 font-extrabold"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            Our Partners
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground text-center mb-8 max-w-xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            Live sites, connected platforms, and a growing network of pickleball innovators.
          </motion.p>

          <motion.div className="flex justify-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Tabs value={view} onValueChange={setView}>
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="venue">Venue Partners</TabsTrigger>
                <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {filteredPartners.map((p) => (
              <PartnerCard key={p.name} partner={p} />
            ))}
            {view !== "venue" && openSlots.map((s) => (
              <OpenSlotCard key={s.name} name={s.name} category={s.category} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            className="text-foreground text-center mb-14 font-extrabold"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          >
            How the Flywheel Works
          </motion.h2>
          <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {howItWorks.map((item) => (
              <motion.div key={item.title} variants={fadeInUp} className="glass rounded-2xl p-8 text-center glow-green-hover transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(ellipse, hsl(145 100% 45% / 0.4), transparent 70%)" }} />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeInUp} className="text-foreground mb-4 font-extrabold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }}>
              Want to join the ecosystem?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Whether you're a coach, brand, tournament organizer, or venue — there's a spot for you.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-10 py-6 text-lg font-bold glow-green gap-3" asChild>
                <Link to="/about">
                  Get In Touch <ArrowRight size={20} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary rounded-xl px-10 py-6 text-lg font-bold gap-3" asChild>
                <a href="https://courtana.com" target="_blank" rel="noopener noreferrer">
                  Visit courtana.com <ExternalLink size={16} />
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

export default Partners;
