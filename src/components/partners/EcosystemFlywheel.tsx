import { motion } from "framer-motion";
import { Monitor, GraduationCap, Users, Swords, FlaskConical } from "lucide-react";

const layers = [
  { label: "Smart Courts", icon: Monitor, angle: 270, color: "hsl(145, 100%, 45%)" },
  { label: "Coaching", icon: GraduationCap, angle: 342, color: "hsl(40, 100%, 50%)" },
  { label: "Community", icon: Users, angle: 54, color: "hsl(270, 60%, 60%)" },
  { label: "Equipment", icon: Swords, angle: 126, color: "hsl(0, 70%, 60%)" },
  { label: "Technology", icon: FlaskConical, angle: 198, color: "hsl(190, 80%, 50%)" },
];

const EcosystemFlywheel = ({ compact = false }: { compact?: boolean }) => {
  const size = compact ? 260 : 360;
  const radius = compact ? 95 : 135;
  const center = size / 2;
  const nodeSize = compact ? 56 : 72;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer ring */}
      <svg className="absolute inset-0" width={size} height={size}>
        <circle cx={center} cy={center} r={radius + 10} fill="none" stroke="hsl(217, 19%, 17%)" strokeWidth="1" strokeDasharray="6 4" />
        <circle cx={center} cy={center} r={radius - 10} fill="none" stroke="hsl(217, 19%, 17%)" strokeWidth="0.5" />
        {/* Connection lines */}
        {layers.map((layer, i) => {
          const rad = (layer.angle * Math.PI) / 180;
          const x = center + radius * Math.cos(rad);
          const y = center + radius * Math.sin(rad);
          return (
            <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="hsl(145, 100%, 45%)" strokeWidth="0.5" opacity="0.2" />
          );
        })}
      </svg>

      {/* Center node */}
      <motion.div
        className="absolute z-10 rounded-full flex items-center justify-center"
        style={{
          width: compact ? 64 : 80,
          height: compact ? 64 : 80,
          left: center - (compact ? 32 : 40),
          top: center - (compact ? 32 : 40),
          background: "radial-gradient(circle, hsl(145 100% 45% / 0.15), hsl(220 22% 10%))",
          border: "2px solid hsl(145 100% 45% / 0.4)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <span className="text-primary font-extrabold text-xs tracking-wider">C</span>
      </motion.div>

      {/* Layer nodes */}
      {layers.map((layer, i) => {
        const rad = (layer.angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad) - nodeSize / 2;
        const y = center + radius * Math.sin(rad) - nodeSize / 2;
        const Icon = layer.icon;

        return (
          <motion.div
            key={layer.label}
            className="absolute flex flex-col items-center justify-center rounded-xl glass cursor-pointer hover:scale-110 transition-transform"
            style={{ width: nodeSize, height: nodeSize, left: x, top: y, borderColor: layer.color + "33" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.4, type: "spring" }}
          >
            <Icon size={compact ? 18 : 22} style={{ color: layer.color }} />
            {!compact && (
              <span className="text-[10px] text-muted-foreground mt-1 font-medium whitespace-nowrap">{layer.label}</span>
            )}
          </motion.div>
        );
      })}

      {/* Rotating orbit */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          background: "hsl(145, 100%, 45%)",
          boxShadow: "0 0 12px hsl(145, 100%, 45%)",
        }}
        animate={{
          left: layers.map((l) => center + radius * Math.cos((l.angle * Math.PI) / 180) - 4),
          top: layers.map((l) => center + radius * Math.sin((l.angle * Math.PI) / 180) - 4),
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />
    </div>
  );
};

export default EcosystemFlywheel;
