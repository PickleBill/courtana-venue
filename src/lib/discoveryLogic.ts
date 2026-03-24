export interface VenueData {
  venueName: string;
  courts: number;
  members: number;
  monthlyBookings: number;
  monthlyEvents: number;
  hasFnB: boolean;
  businessModel: string[];
  biggestDriver: string;
  toolLifespan: string;
  dropoffReasons: string[];
  workedBefore: string;
  notWorkedBefore: string;
  playerMotivation: Record<string, number>;
  playerTypeFocus: string;
  shareableImportance: number;
  rankingsImportance: number;
  highlightsImportance: number;
  successCriteria: string;
  targetRepeatVisits: number;
  targetEventParticipation: number;
  targetPremiumUpsell: number;
  trialOpenness: string;
  pilotCourts: number;
  pilotDuration: number;
  biggestObjection: string;
  meetingNotes: string;
}

export interface Scores {
  overall: number;
  engagement: number;
  monetization: number;
  readiness: number;
}

export function calculateScores(d: VenueData): Scores {
  // Fit score — leagues/tournaments, recurring members, competition interest
  let fit = 30;
  if (d.businessModel.includes("leagues")) fit += 12;
  if (d.businessModel.includes("tournaments")) fit += 10;
  if (d.members > 200) fit += 10;
  if (d.members > 500) fit += 5;
  if (d.monthlyEvents > 4) fit += 8;
  if (d.playerMotivation.competition >= 7) fit += 8;
  if (d.playerMotivation.social >= 7) fit += 5;
  if (d.rankingsImportance >= 7) fit += 6;
  if (d.highlightsImportance >= 7) fit += 6;
  fit = Math.min(100, fit);

  // Engagement opportunity — higher when tools drop off fast, no sticky loop
  let eng = 20;
  if (d.toolLifespan === "less than 1 month") eng += 25;
  else if (d.toolLifespan === "1-2 months") eng += 20;
  else if (d.toolLifespan === "3-6 months") eng += 10;
  if (d.dropoffReasons.includes("novelty wears off")) eng += 10;
  if (d.dropoffReasons.includes("low player habit formation")) eng += 10;
  if (d.dropoffReasons.includes("not enough competitive energy")) eng += 8;
  if (d.dropoffReasons.includes("not enough social sharing")) eng += 8;
  if (d.shareableImportance >= 6) eng += 7;
  if (d.targetRepeatVisits >= 15) eng += 5;
  eng = Math.min(100, eng);

  // Monetization
  let mon = 25;
  if (d.hasFnB) mon += 10;
  if (d.businessModel.includes("events / corporate")) mon += 10;
  if (d.businessModel.includes("tournaments")) mon += 8;
  if (d.courts >= 8) mon += 8;
  if (d.targetPremiumUpsell >= 10) mon += 8;
  if (d.monthlyBookings > 800) mon += 8;
  if (d.businessModel.length >= 4) mon += 8;
  if (d.playerMotivation.content >= 6) mon += 7;
  mon = Math.min(100, mon);

  // Readiness
  let ready = 20;
  if (d.trialOpenness === "yes") ready += 30;
  else if (d.trialOpenness === "maybe") ready += 15;
  if (d.pilotCourts >= 4) ready += 10;
  if (d.pilotDuration >= 2) ready += 10;
  const severeObjections = ["budget", "need internal approval", "timing"];
  if (!severeObjections.includes(d.biggestObjection)) ready += 15;
  if (d.biggestObjection === "ROI unclear") ready += 5; // can be addressed
  ready = Math.min(100, ready);

  return { overall: fit, engagement: eng, monetization: mon, readiness: ready };
}

export function getStatusPill(s: Scores) {
  const avg = (s.overall + s.engagement + s.monetization + s.readiness) / 4;
  if (avg >= 75) return { label: "Strong Fit", classes: "bg-primary/15 border-primary/40 text-primary", dotClass: "bg-primary" };
  if (avg >= 55) return { label: "Revenue Opportunity", classes: "bg-accent/15 border-accent/40 text-accent", dotClass: "bg-accent" };
  if (avg >= 40) return { label: "Early Fit", classes: "bg-blue-500/15 border-blue-500/40 text-blue-400", dotClass: "bg-blue-400" };
  return { label: "Needs Validation", classes: "bg-muted border-border text-muted-foreground", dotClass: "bg-muted-foreground" };
}

export function generateSummary(d: VenueData, s: Scores): string {
  const strengths: string[] = [];
  const opportunities: string[] = [];

  if (d.businessModel.includes("leagues")) strengths.push("leagues");
  if (d.businessModel.includes("tournaments")) strengths.push("tournaments");
  if (d.members > 200) strengths.push(`a strong member base of ${d.members}`);
  if (d.monthlyEvents > 4) strengths.push("active event programming");

  if (d.toolLifespan === "less than 1 month" || d.toolLifespan === "1-2 months")
    opportunities.push("player engagement tools tend to drop off after " + d.toolLifespan);
  if (d.playerMotivation.competition >= 7)
    opportunities.push("competition and ranking drive player interest");
  if (d.shareableImportance >= 6)
    opportunities.push("shareable content resonates with this audience");
  if (d.highlightsImportance >= 6)
    opportunities.push("highlights and replays are valued");

  const fitWord = s.overall >= 70 ? "strong" : s.overall >= 50 ? "promising" : "potential";

  return `${d.venueName || "This venue"} appears to be a ${fitWord} fit for Courtana${strengths.length ? ` because ${strengths.join(", ")} are already core to their business` : ""}. ${opportunities.length ? `The strongest opportunity is that ${opportunities.join(", and ")}. ` : ""}The data suggests Courtana can convert competitive energy and replay-worthy moments into repeat visits, event participation, and premium experiences.`;
}

export function getOpportunityLevers(d: VenueData): Array<{ title: string; why: string; signal: string; effect: string }> {
  const levers: Array<{ title: string; why: string; signal: string; effect: string; score: number }> = [];

  if (d.rankingsImportance >= 6 || d.playerMotivation.competition >= 6) {
    levers.push({ title: "Leaderboard-Driven Retention", why: "Competitive players stay when they can track progress and compare.", signal: `Rankings importance: ${d.rankingsImportance}/10, Competition drive: ${d.playerMotivation.competition}/10`, effect: "+15-25% repeat visit rate from leaderboard engagement", score: d.rankingsImportance + d.playerMotivation.competition });
  }
  if (d.shareableImportance >= 5 || d.highlightsImportance >= 5) {
    levers.push({ title: "Highlight-Sharing Loop", why: "Shareable content creates organic awareness and brings players back.", signal: `Shareable importance: ${d.shareableImportance}/10, Highlights: ${d.highlightsImportance}/10`, effect: "+20-40% social reach, 2-3x content engagement", score: d.shareableImportance + d.highlightsImportance });
  }
  if (d.businessModel.includes("leagues") || d.monthlyEvents > 3) {
    levers.push({ title: "League Participation Lift", why: "Existing league infrastructure amplifies Courtana's impact on event revenue.", signal: `${d.monthlyEvents} events/month, leagues in business model`, effect: "+20-35% league participation within 60 days", score: d.monthlyEvents + 5 });
  }
  if (d.highlightsImportance >= 6 || d.playerMotivation.content >= 5) {
    levers.push({ title: "Premium Replay Package", why: "Players will pay for curated highlights and match analysis.", signal: `Highlights: ${d.highlightsImportance}/10, Content motivation: ${d.playerMotivation.content}/10`, effect: "$5-15/player upsell per session, new revenue stream", score: d.highlightsImportance + d.playerMotivation.content });
  }
  if (d.playerMotivation.competition >= 7) {
    levers.push({ title: "King of the Court Format", why: "High-energy competitive formats drive spectators, F&B, and premium court time.", signal: `Competition drive: ${d.playerMotivation.competition}/10`, effect: "+30% court utilization during event windows", score: d.playerMotivation.competition + 4 });
  }
  if (d.playerMotivation.improvement >= 6) {
    levers.push({ title: "AI Coaching Insights", why: "Players seeking improvement will engage deeply with AI-powered analysis.", signal: `Improvement drive: ${d.playerMotivation.improvement}/10`, effect: "+25% session frequency from improvement-focused players", score: d.playerMotivation.improvement + 5 });
  }

  return levers.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function getEventConcepts(d: VenueData): Array<{ name: string; target: string; goal: string; fit: number }> {
  const events: Array<{ name: string; target: string; goal: string; fit: number }> = [];

  if (d.playerMotivation.competition >= 6) events.push({ name: "King of the Court Showdown", target: "Competitive players", goal: "Drive premium court bookings + spectator engagement", fit: Math.min(100, d.playerMotivation.competition * 12) });
  if (d.shareableImportance >= 5) events.push({ name: "Weekly Highlight Night", target: "All players", goal: "Social sharing + repeat visits", fit: Math.min(100, d.shareableImportance * 11) });
  if (d.rankingsImportance >= 6) events.push({ name: "Ladder Leaderboard Series", target: "League players", goal: "Retention + competitive engagement", fit: Math.min(100, d.rankingsImportance * 11) });
  if (d.playerMotivation.improvement >= 5) events.push({ name: "Improvement Challenge Week", target: "Casual → intermediate players", goal: "Upsell lessons + AI coaching", fit: Math.min(100, d.playerMotivation.improvement * 12) });
  if (d.businessModel.includes("tournaments")) events.push({ name: "Tournament Replay Recap", target: "Tournament participants", goal: "Premium content upsell + social reach", fit: 78 });
  if (d.hasFnB) events.push({ name: "Friday Night Lights + Bites", target: "Mixed audience", goal: "F&B revenue + community building", fit: 82 });

  return events.slice(0, 5);
}

export function getObjectionTalkingPoints(objection: string): string[] {
  const map: Record<string, string[]> = {
    "ROI unclear": [
      "We structure every pilot with measurable KPIs — repeat visits, event participation, and revenue per court hour — so ROI is visible within 30 days.",
      "Our dashboard gives you real-time data on exactly how Courtana impacts your bottom line. No guesswork.",
      "Most venues see 20-35% lift in event participation within the first 60 days, which directly translates to bookable revenue.",
    ],
    "player adoption": [
      "Courtana is designed for zero-friction adoption — players don't download an app or create accounts to start. The court experience is automatic.",
      "We've seen 70%+ player engagement in the first week because the experience is built into the court, not bolted on.",
      "Our onboarding playbook includes staff training, launch events, and in-venue signage to maximize day-one adoption.",
    ],
    "staff bandwidth": [
      "Courtana runs autonomously — once installed, courts capture and process everything automatically. Staff involvement is minimal.",
      "We provide a dedicated launch manager for the first 30 days to handle setup, training, and optimization.",
      "Most venues report that Courtana actually reduces staff workload by automating league tracking, scoring, and content creation.",
    ],
    "installation concerns": [
      "Installation is non-invasive — our smart camera system mounts above the court with no structural modifications required.",
      "Typical installation takes 2-3 hours per court with zero downtime. Courts are playable immediately after.",
      "We handle the full installation process including site survey, mounting, calibration, and testing.",
    ],
    "budget": [
      "Our pilot model is designed to prove ROI before any long-term commitment. We share the risk with you.",
      "The revenue generated from premium experiences, increased event participation, and higher retention typically covers the investment within 60 days.",
      "We offer flexible pricing tiers based on court count, and the per-court economics improve significantly at scale.",
    ],
    "timing": [
      "We can have you up and running in as little as 2 weeks from agreement. The technology is deployment-ready.",
      "Starting now means you capture the upcoming season's momentum. Waiting means missing peak engagement windows.",
      "A shorter pilot (4-6 weeks) can give you the validation data you need without a long commitment.",
    ],
    "need internal approval": [
      "We can prepare a one-page ROI summary customized to your venue that makes the internal case easy to present.",
      "Happy to join a call with your team or board to walk through the business case and answer technical questions.",
      "Our pilot structure is specifically designed for low-risk internal approval — short duration, clear KPIs, no long-term lock-in.",
    ],
    "other": [
      "We'd love to understand your specific concern so we can address it directly. Every venue is different.",
      "Our flexible pilot model is designed to de-risk the decision. We succeed only when you succeed.",
      "Let's identify the core blocker and build a plan that addresses it head-on.",
    ],
  };
  return map[objection] || map["other"];
}

export function getFunnelData(d: VenueData) {
  let awareness = 100;
  let firstUse = d.toolLifespan === "less than 1 month" ? 55 : d.toolLifespan === "1-2 months" ? 65 : 75;
  let repeatUse = firstUse * (d.dropoffReasons.includes("novelty wears off") ? 0.5 : 0.7);
  let habit = repeatUse * (d.dropoffReasons.includes("low player habit formation") ? 0.4 : 0.6);

  return [
    { stage: "Awareness", value: Math.round(awareness), fill: "hsl(145, 100%, 45%)" },
    { stage: "First Use", value: Math.round(firstUse), fill: "hsl(145, 80%, 50%)" },
    { stage: "Repeat Use", value: Math.round(repeatUse), fill: "hsl(48, 100%, 50%)" },
    { stage: "Habit Formation", value: Math.round(habit), fill: d.dropoffReasons.includes("low player habit formation") ? "hsl(0, 84%, 60%)" : "hsl(48, 80%, 55%)" },
  ];
}
