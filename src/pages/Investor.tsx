import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLATFORM_STATS, LEADERBOARD, VENUES, TOP_BADGES } from "@/data/courtana-live";

const Investor = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="section-title text-foreground">
              <span className="text-gradient-green">Courtana</span> — Investor View
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time platform metrics from live Courtana deployments.
            </p>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Highlights Captured", value: PLATFORM_STATS.totalHighlights.toLocaleString() },
              { label: "Ranked Players", value: PLATFORM_STATS.rankedPlayers },
              { label: "Badges Earned", value: PLATFORM_STATS.badgesEarned },
              { label: "Active Facilities", value: PLATFORM_STATS.activeFacilities },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5">
                <div className="text-2xl font-extrabold text-gradient-green">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Venue Pipeline */}
          <div className="glass rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-foreground mb-4">Venue Pipeline</h3>
            <div className="space-y-3">
              {VENUES.map((v) => (
                <div key={v.slug} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <span className="font-medium text-foreground">{v.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">{v.city}, {v.state}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{v.courts} courts</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold capitalize ${
                      v.status === "live" ? "bg-primary/20 text-primary" :
                      v.status === "onboarding" ? "bg-amber-500/20 text-amber-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>{v.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Placeholder sections — Lovable will fill these */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Leaderboard Preview ({LEADERBOARD.length} ranked players)</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Top Badges ({TOP_BADGES.length} badge types)</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Growth Metrics & Projections</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Revenue Model</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Investor;
