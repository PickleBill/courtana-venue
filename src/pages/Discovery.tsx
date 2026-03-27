import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DiscoveryInputs from "@/components/discovery/DiscoveryInputs";
import ExecutiveSummary from "@/components/discovery/ExecutiveSummary";
import FitScoreCards from "@/components/discovery/FitScoreCards";
import DiscoveryCharts from "@/components/discovery/DiscoveryCharts";
import OpportunityLevers from "@/components/discovery/OpportunityLevers";
import EventConcepts from "@/components/discovery/EventConcepts";
import TrialRecommendation from "@/components/discovery/TrialRecommendation";
import ObjectionHandling from "@/components/discovery/ObjectionHandling";
import MeetingOutput from "@/components/discovery/MeetingOutput";
import { calculateScores, type VenueData, type Scores, getStatusPill } from "@/lib/discoveryLogic";
import { motion } from "framer-motion";

const defaultData: VenueData = {
  venueName: "Peak Pickleball",
  courts: 12,
  members: 450,
  monthlyBookings: 1200,
  monthlyEvents: 6,
  hasFnB: true,
  businessModel: ["memberships", "leagues", "court bookings", "open play"],
  biggestDriver: "memberships",
  toolLifespan: "1-2 months",
  dropoffReasons: ["novelty wears off", "low player habit formation", "not enough competitive energy"],
  workedBefore: "Social events and round robins drive the most energy. Players love the community aspect.",
  notWorkedBefore: "Tried a basic app but nobody used it after the first month. Video replay was clunky.",
  playerMotivation: { social: 8, competition: 7, improvement: 6, content: 5, convenience: 4 },
  playerTypeFocus: "mixed audience",
  shareableImportance: 7,
  rankingsImportance: 8,
  highlightsImportance: 6,
  successCriteria: "See measurable increase in repeat visits and event participation. Players talking about their stats and sharing highlights.",
  targetRepeatVisits: 20,
  targetEventParticipation: 30,
  targetPremiumUpsell: 15,
  trialOpenness: "yes",
  pilotCourts: 6,
  pilotDuration: 2,
  biggestObjection: "player adoption",
  meetingNotes: "",
};

const Discovery = () => {
  const [data, setData] = useState<VenueData>(defaultData);

  const scores: Scores = useMemo(() => calculateScores(data), [data]);
  const statusPill = useMemo(() => getStatusPill(scores), [scores]);

  const update = (partial: Partial<VenueData>) => setData((prev) => ({ ...prev, ...partial }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="pt-20 pb-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="label-text text-muted-foreground mb-2">Courtana × {data.venueName || "Venue"}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Venue Opportunity Dashboard
              </h1>
              <p className="text-muted-foreground mt-1 text-lg">Live discovery + scenario modeling</p>
            </div>
            <motion.div
              key={statusPill.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border self-start md:self-auto ${statusPill.classes}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${statusPill.dotClass}`} />
              {statusPill.label}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Panel — Discovery Inputs */}
          <div className="xl:col-span-4 2xl:col-span-3">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 space-y-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <DiscoveryInputs data={data} update={update} />
            </div>
          </div>

          {/* Right — Dynamic Output */}
          <div className="xl:col-span-8 2xl:col-span-9 space-y-8">
            <ExecutiveSummary data={data} scores={scores} />
            <FitScoreCards scores={scores} />
            <DiscoveryCharts data={data} scores={scores} />
            <OpportunityLevers data={data} scores={scores} />
            <EventConcepts data={data} />
            <TrialRecommendation data={data} scores={scores} />
            <ObjectionHandling objection={data.biggestObjection} />
            <MeetingOutput data={data} scores={scores} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Discovery;
