import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLAYERS, LEADERBOARD, TOP_BADGES, CDN, LIVE_LINKS, PLATFORM_STATS } from "@/data/courtana-live";

const player = PLAYERS.picklebill;

const PlayerShowcase = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="section-title text-foreground">
              <span className="text-gradient-green">Player</span> Experience
            </h1>
            <p className="text-muted-foreground mt-2">
              See what players get from Courtana-powered courts — profiles, highlights, badges, and leaderboards.
            </p>
          </div>

          {/* Featured Player Card */}
          <div className="glass rounded-2xl p-6 flex items-center gap-5 mb-8 max-w-md">
            <div className="relative shrink-0">
              <img src={player.avatar} alt={player.username} className="w-16 h-16 rounded-full border-2 border-primary/40 object-cover" />
              <img src={CDN.goldIIIBadge} alt={player.rankTier} className="absolute -bottom-1 -right-1 w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-lg">{player.username}</h4>
              <p className="text-sm text-primary font-semibold">{player.rankTier} · #{player.rank} Global</p>
              <p className="text-xs text-muted-foreground">Level {player.level} · {player.xp.toLocaleString()} XP · {player.badges} badges</p>
            </div>
          </div>

          {/* Placeholder sections — Lovable will fill with existing mockup components */}
          <div className="grid gap-6">
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">AI Analysis Mockup</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Replay Mockup</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Badges Collection ({TOP_BADGES.length} types, {PLATFORM_STATS.badgesEarned} total earned)</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Leaderboard ({LEADERBOARD.length} ranked players)</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlayerShowcase;
