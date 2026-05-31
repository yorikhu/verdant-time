/**
 * 圆形进度条组件
 */
import { getCircleOffset } from '../../utils/time';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 280,
  strokeWidth = 6,
  className = '',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = getCircleOffset(progress, radius);

  return (
    <svg
      class={`progress-ring ${className}`}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* 背景圆环 */}
      <circle
        class="progress-bg"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke-width={strokeWidth}
      />

      {/* 进度圆环 */}
      <circle
        class="progress-bar"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke-width={strokeWidth}
        stroke-dasharray={circumference}
        stroke-dashoffset={offset}
        stroke-linecap="round"
      />

      {/* 叶子装饰 */}
      <g
        class="leaf-decoration"
        style={{
          transform: `rotate(${progress * 3.6}deg)`,
          transformOrigin: 'center',
        }}
      >
        <circle
          cx={size / 2}
          cy={strokeWidth / 2 + 2}
          r={4}
          fill="currentColor"
          class="leaf-dot"
        />
      </g>
    </svg>
  );
}
