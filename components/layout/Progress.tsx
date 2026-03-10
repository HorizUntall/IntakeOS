import { type_protein, type_cal } from "@/types/entryType";

interface ProgressProps {
  type: string;
  val1: number;
  val2: number;
  val3?: number;
  size?: number;
  strokeWidth?: number;
}

export default function CircularProgress({
  type,
  val1,
  val2,
  val3 = 0,
  size = 200, // Slightly larger looks more premium
  strokeWidth = 12, // Thinner stroke is more elegant
}: ProgressProps) {
  const percentage = Math.min(Math.max((val1 / val2) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  // Premium Color Palette & Status
  let colorClass = "text-zinc-200"; // Default background
  let progressColor = "text-zinc-800";
  let status = "";

  if (type === type_cal) {
    if (val1 < val3) {
      progressColor = "text-amber-500";
      status = "Keep going";
    } else if (val1 <= val2) {
      progressColor = "text-emerald-500";
      status = "On track";
    } else {
      progressColor = "text-rose-500";
      status = "Over limit";
    }
  } else {
    if (val1 < val2) {
      progressColor = "text-amber-500";
      status = "Need more protein";
    } else {
      progressColor = "text-emerald-500";
      status = "Goal reached";
    }
  }

  return (
    <div
      className="relative flex items-center justify-center transition-all duration-500"
      style={{ width: size, height: size }}
    >
      {/* SVG Ring */}
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-zinc-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          strokeLinecap="round"
          className={progressColor}
        />
      </svg>

      {/* Center Text Wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <div className="flex items-baseline gap-0.5">
          <span className="text-3xl font-bold tracking-tight text-zinc-800">
            {val1}
          </span>
          <span className="text-sm font-medium text-zinc-400">/{val2}</span>
        </div>

        {/* Status Text with forced wrapping/limit */}
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mt-1 max-w-[120px] leading-tight">
          {status}
        </p>
      </div>
    </div>
  );
}
