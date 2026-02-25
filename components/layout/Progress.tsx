import { cal, protein } from "@/types/entryType";

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
  size = 150,
  strokeWidth = 20,
}: ProgressProps) {
  // Calculate percentage and radius
  const percentage = Math.min(Math.max((val1 / val2) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Calculate stroke offset
  const offset = circumference - (percentage / 100) * circumference;

  // Color of progress bar
  let color;
  let status;
  if (type === cal) {
    if (val1 < val3) {
      color = "text-yellow-600";
      status = "More!";
    } else if (val1 < val2) {
      color = "text-green-600";
      status = "Doing Good!";
    } else {
      color = "text-red-600";
      status = "Exceeded";
    }
  } else {
    if (val1 < val2) {
      color = "text-yellow-600";
      status = "Hit your protein!";
    } else {
      color = "text-green-600";
      status = "You hit your protein! Congrats.";
    }
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />

        {/* Progress Circle */}
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
            transition: "stroke-dashoffset 0.5s ease",
          }}
          strokeLinecap="round"
          className={color}
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        {/* Percentage Text */}
        <span className="text-sm font-semibold">
          {val1}/{val2}
        </span>

        {/* Status Text*/}
        <span className="text-sm font-medium">{status}</span>
      </div>
    </div>
  );
}
