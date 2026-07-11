import { motion } from "framer-motion";
import { clsx } from "clsx";

interface RiskGaugeProps {
  score: number; // 0 to 1 (probability)
  band: string;
}

export function RiskGauge({ score, band }: RiskGaugeProps) {
  // Convert probability to percentage 0-100
  const percentage = Math.round(score * 100);
  
  // Determine color based on risk
  const getColor = (p: number) => {
    if (p < 20) return "text-emerald-500 stroke-emerald-500";
    if (p < 50) return "text-amber-500 stroke-amber-500";
    return "text-rose-500 stroke-rose-500";
  };
  
  const colorClass = getColor(percentage);
  
  // SVG Arc Calculations
  const radius = 80;
  const stroke = 15;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background Circle */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="rotate-[-90deg] transform"
        >
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-slate-100"
          />
          {/* Progress Circle */}
          <motion.circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={clsx("transition-all duration-1000 ease-out", colorClass)}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
          />
        </svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-1">Risk Probability</span>
          <span className={clsx("text-4xl font-bold font-display", colorClass.split(' ')[0])}>
            {percentage}%
          </span>
          <span className={clsx("text-sm font-bold mt-1 px-2 py-0.5 rounded-full bg-slate-100 uppercase text-xs", colorClass.split(' ')[0])}>
            {band}
          </span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-500">
          This application has a <strong className="text-slate-700">{band.toLowerCase()}</strong> risk of default based on the ML model analysis.
        </p>
      </div>
    </div>
  );
}
