import { type VenueData } from "@/lib/discoveryLogic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Users, TrendingUp, Target, Rocket } from "lucide-react";

interface Props { data: VenueData; update: (p: Partial<VenueData>) => void; }

const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <div className="glass rounded-2xl p-5 space-y-4 glow-green-hover transition-all">
    <div className="flex items-center gap-2.5">
      <div className="p-2 rounded-lg bg-primary/10"><Icon className="w-4 h-4 text-primary" /></div>
      <h3 className="font-bold text-foreground text-sm">{title}</h3>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const businessModelOptions = ["memberships", "open play", "court bookings", "leagues", "tournaments", "lessons", "food & beverage", "events / corporate"];
const dropoffOptions = ["novelty wears off", "too much friction", "low player habit formation", "not enough competitive energy", "not enough social sharing", "staff doesn't push it", "unclear player value", "other"];

const DiscoveryInputs = ({ data, update }: Props) => {
  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground px-1">Discovery Inputs</h2>

      {/* A. Venue Snapshot */}
      <Section icon={Building2} title="Venue Snapshot">
        <Field label="Venue Name">
          <Input value={data.venueName} onChange={(e) => update({ venueName: e.target.value })} className="bg-secondary/50 border-border h-9 text-sm" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          {([
            { label: "Courts", key: "courts" as const, step: 1, min: 1 },
            { label: "Members", key: "members" as const, step: 50, min: 0 },
            { label: "Monthly Bookings", key: "monthlyBookings" as const, step: 100, min: 0 },
            { label: "Monthly Events", key: "monthlyEvents" as const, step: 1, min: 0 },
          ] as const).map((field) => (
            <Field key={field.key} label={field.label}>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => update({ [field.key]: Math.max(field.min, data[field.key] - field.step) })}
                  className="w-9 h-9 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span className="flex-1 text-center text-sm font-bold text-foreground tabular-nums">{data[field.key].toLocaleString()}</span>
                <button
                  type="button"
                  onClick={() => update({ [field.key]: data[field.key] + field.step })}
                  className="w-9 h-9 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
            </Field>
          ))}
        </div>
        <Field label="Has F&B Revenue?">
          <div className="flex items-center gap-2">
            <Switch checked={data.hasFnB} onCheckedChange={(v) => update({ hasFnB: v })} />
            <span className="text-sm text-muted-foreground">{data.hasFnB ? "Yes" : "No"}</span>
          </div>
        </Field>
        <Field label="Core Business Model">
          <div className="grid grid-cols-2 gap-2">
            {businessModelOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <Checkbox checked={data.businessModel.includes(opt)} onCheckedChange={() => update({ businessModel: toggleArray(data.businessModel, opt) })} />
                <span className="capitalize">{opt}</span>
              </label>
            ))}
          </div>
        </Field>
        <Field label="Biggest Revenue Driver">
          <Select value={data.biggestDriver} onValueChange={(v) => update({ biggestDriver: v })}>
            <SelectTrigger className="bg-secondary/50 border-border h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {businessModelOptions.map((o) => <SelectItem key={o} value={o} className="capitalize">{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </Section>

      {/* B. Engagement & Retention */}
      <Section icon={TrendingUp} title="Engagement & Retention">
        <Field label="How long do new tools stay active?">
          <Select value={data.toolLifespan} onValueChange={(v) => update({ toolLifespan: v })}>
            <SelectTrigger className="bg-secondary/50 border-border h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="less than 1 month">Less than 1 month</SelectItem>
              <SelectItem value="1-2 months">1–2 months</SelectItem>
              <SelectItem value="3-6 months">3–6 months</SelectItem>
              <SelectItem value="6+ months">6+ months</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Primary Reasons for Dropoff">
          <div className="grid grid-cols-1 gap-1.5">
            {dropoffOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <Checkbox checked={data.dropoffReasons.includes(opt)} onCheckedChange={() => update({ dropoffReasons: toggleArray(data.dropoffReasons, opt) })} />
                <span className="capitalize">{opt}</span>
              </label>
            ))}
          </div>
        </Field>
        <Field label="What has worked before?">
          <Textarea value={data.workedBefore} onChange={(e) => update({ workedBefore: e.target.value })} className="bg-secondary/50 border-border text-sm min-h-[60px]" />
        </Field>
        <Field label="What has NOT worked?">
          <Textarea value={data.notWorkedBefore} onChange={(e) => update({ notWorkedBefore: e.target.value })} className="bg-secondary/50 border-border text-sm min-h-[60px]" />
        </Field>
      </Section>

      {/* C. Player Behavior */}
      <Section icon={Users} title="Player Behavior">
        {Object.entries(data.playerMotivation).map(([key, val]) => (
          <Field key={key} label={`${key.charAt(0).toUpperCase() + key.slice(1)} (${val}/10)`}>
            <Slider value={[val]} min={1} max={10} step={1} onValueChange={([v]) => update({ playerMotivation: { ...data.playerMotivation, [key]: v } })} />
          </Field>
        ))}
        <Field label="Player Type Focus">
          <Select value={data.playerTypeFocus} onValueChange={(v) => update({ playerTypeFocus: v })}>
            <SelectTrigger className="bg-secondary/50 border-border h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="casual players">Casual Players</SelectItem>
              <SelectItem value="league players">League Players</SelectItem>
              <SelectItem value="competitive players">Competitive Players</SelectItem>
              <SelectItem value="mixed audience">Mixed Audience</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label={`Shareable Content Importance (${data.shareableImportance}/10)`}>
          <Slider value={[data.shareableImportance]} min={1} max={10} step={1} onValueChange={([v]) => update({ shareableImportance: v })} />
        </Field>
        <Field label={`Rankings Importance (${data.rankingsImportance}/10)`}>
          <Slider value={[data.rankingsImportance]} min={1} max={10} step={1} onValueChange={([v]) => update({ rankingsImportance: v })} />
        </Field>
        <Field label={`Highlights Importance (${data.highlightsImportance}/10)`}>
          <Slider value={[data.highlightsImportance]} min={1} max={10} step={1} onValueChange={([v]) => update({ highlightsImportance: v })} />
        </Field>
      </Section>

      {/* D. Success Criteria */}
      <Section icon={Target} title="Success Criteria">
        <Field label="What does success look like in 60 days?">
          <Textarea value={data.successCriteria} onChange={(e) => update({ successCriteria: e.target.value })} className="bg-secondary/50 border-border text-sm min-h-[60px]" />
        </Field>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Target Repeat Visits Increase (%)">
            <Input type="number" value={data.targetRepeatVisits} onChange={(e) => update({ targetRepeatVisits: +e.target.value })} className="bg-secondary/50 border-border h-9 text-sm" />
          </Field>
          <Field label="Target Event Participation Increase (%)">
            <Input type="number" value={data.targetEventParticipation} onChange={(e) => update({ targetEventParticipation: +e.target.value })} className="bg-secondary/50 border-border h-9 text-sm" />
          </Field>
          <Field label="Target Premium Upsell Increase (%)">
            <Input type="number" value={data.targetPremiumUpsell} onChange={(e) => update({ targetPremiumUpsell: +e.target.value })} className="bg-secondary/50 border-border h-9 text-sm" />
          </Field>
        </div>
      </Section>

      {/* E. Trial Readiness */}
      <Section icon={Rocket} title="Trial Readiness">
        <Field label="Open to a trial?">
          <Select value={data.trialOpenness} onValueChange={(v) => update({ trialOpenness: v })}>
            <SelectTrigger className="bg-secondary/50 border-border h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="maybe">Maybe</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Pilot Courts">
            <Input type="number" value={data.pilotCourts} onChange={(e) => update({ pilotCourts: +e.target.value })} className="bg-secondary/50 border-border h-9 text-sm" />
          </Field>
          <Field label="Duration (months)">
            <Input type="number" value={data.pilotDuration} onChange={(e) => update({ pilotDuration: +e.target.value })} className="bg-secondary/50 border-border h-9 text-sm" />
          </Field>
        </div>
        <Field label="Biggest Objection">
          <Select value={data.biggestObjection} onValueChange={(v) => update({ biggestObjection: v })}>
            <SelectTrigger className="bg-secondary/50 border-border h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["ROI unclear", "player adoption", "staff bandwidth", "installation concerns", "budget", "timing", "need internal approval", "other"].map((o) => (
                <SelectItem key={o} value={o} className="capitalize">{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Meeting Notes">
          <Textarea value={data.meetingNotes} onChange={(e) => update({ meetingNotes: e.target.value })} placeholder="Capture key points from the conversation..." className="bg-secondary/50 border-border text-sm min-h-[80px]" />
        </Field>
      </Section>
    </div>
  );
};

export default DiscoveryInputs;
