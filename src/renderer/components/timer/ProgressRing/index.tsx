/**
 * 圆形进度条组件
 */
import { getCircleOffset } from '../../../utils/time';
import styles from './style.module.scss';

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
    <div class={styles['progress-container']}>
      <svg
        class={`${styles['progress-ring']} ${className}`}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        shape-rendering="geometricPrecision"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* 定义渐变 */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="50%" stopColor="#66BB6A" />
            <stop offset="100%" stopColor="#81C784" />
          </linearGradient>
          {/* 粒子效果渐变 */}
          <radialGradient id="particleGradient">
            <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#81C784" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* 背景圆环 - 灰色 */}
        <circle
          class={styles['progress-bg']}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke-width={strokeWidth}
        />

        {/* 进度圆环 - 绿色粒子效果 */}
        <circle
          class={styles['progress-bar']}
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
      </svg>
    </div>
  );
}
