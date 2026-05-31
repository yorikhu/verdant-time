/**
 * 时间显示组件
 */
import { useMemo } from 'preact/hooks';
import { getProgress } from '../../utils/time';
import { ProgressRing } from './ProgressRing';
import { MODE_NAMES } from '../../../shared/constants';

interface TimerDisplayProps {
  mode: 'focus' | 'shortBreak' | 'longBreak';
  remaining: number;
  duration: number;
  cycle: number;
  isRunning: boolean;
  isPaused: boolean;
}

export function TimerDisplay({
  mode,
  remaining,
  duration,
  cycle,
  isRunning,
  isPaused,
}: TimerDisplayProps) {
  const { minutes, seconds } = useMemo(() => {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return { minutes: mins, seconds: secs };
  }, [remaining]);

  const progress = useMemo(() => {
    return getProgress(remaining, duration);
  }, [remaining, duration]);

  const modeLabel = MODE_NAMES[mode];
  const showColon = !isPaused && isRunning;

  return (
    <div class="timer-display">
      <ProgressRing progress={progress} />

      <div class="timer-content">
        <div class={`time-digits ${isPaused ? 'paused' : ''}`}>
          <span class="time-minutes">{String(minutes).padStart(2, '0')}</span>
          <span class={`time-colon ${showColon ? 'blinking' : ''}`}>:</span>
          <span class="time-seconds">{String(seconds).padStart(2, '0')}</span>
        </div>

        <div class="timer-status">
          <span class="status-mode">{modeLabel}</span>
          <span class="status-separator"> · </span>
          <span class="status-cycle">第{cycle + 1}颗番茄</span>
        </div>
      </div>
    </div>
  );
}
