import { useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getVenueBySlug, PLATFORM_STATS } from "@/data/courtana-live";

const VenueDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const venue = slug ? getVenueBySlug(slug) : undefined;

  if (!venue) return <Navigate to="/" replace />;

  const statusColors: Record<string, string> = {
    live: "bg-primary/20 text-primary",
    onboarding: "bg-amber-500/20 text-amber-400",
    prospect: "bg-blue-500/20 text-blue-400",
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="section-title text-foreground">{venue.name}</h1>
              <span className={`text-xs px-3 py-1 rounded-full font-bold capitalize ${statusColors[venue.status]}`}>
                {venue.status}
              </span>
            </div>
            <p className="text-muted-foreground">
              {venue.city}, {venue.state} · {venue.courts} courts
            </p>
            <p className="text-muted-foreground mt-2">{venue.description}</p>
          </div>

          {/* Placeholder sections — Lovable will fill these */}
          <div className="grid gap-6">
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Court Map & Live Feeds</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Pilot Timeline & Milestones</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Revenue Projections</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
              <p className="text-sm">Event Calendar</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VenueDetail;
