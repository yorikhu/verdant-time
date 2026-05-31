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
  size = 300,
  strokeWidth = 15,
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
      shape-rendering="geometricPrecision"
    >
      {/* 定义渐变 */}
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#81C784" />
        </linearGradient>
      </defs>

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
        stroke="url(#progressGradient)"
        stroke-dasharray={circumference}
        stroke-dashoffset={offset}
        stroke-linecap="round"
      />

      {/* 叶子装饰 - 在进度环上方 */}
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
          r={5}
          fill="#4CAF50"
          class="leaf-dot"
        />
      </g>

      {/* 底部小番茄装饰 */}
      <circle
        cx={size / 2}
        cy={size - strokeWidth / 2 - 2}
        r={8}
        fill="#FF5722"
      />
    </svg>
  );
}
