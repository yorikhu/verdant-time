/**
 * 番茄打卡统计组件
 */
import { useMemo } from 'preact/hooks';
import { DAILY_GOAL } from '../../../shared/constants';

interface PomodoroStatsProps {
  completedPomodoros: number;
  totalFocusMinutes: number;
}

export function PomodoroStats({ completedPomodoros, totalFocusMinutes }: PomodoroStatsProps) {
  const tomatoIcons = useMemo(() => {
    return Array.from({ length: DAILY_GOAL }, (_, i) => ({
      index: i,
      completed: i < completedPomodoros,
    }));
  }, [completedPomodoros]);

  const progressPercent = useMemo(() => {
    return Math.min(100, (completedPomodoros / DAILY_GOAL) * 100);
  }, [completedPomodoros]);

  // 格式化专注时间
  const formatFocusTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}分钟`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}小时${mins > 0 ? mins + '分钟' : ''}`;
  };

  return (
    <div class="pomodoro-stats">
      <div class="stats-header">
        <span class="stats-icon">🍅</span>
        <span class="stats-title">今日番茄打卡</span>
      </div>

      <div class="stats-tomatoes">
        {tomatoIcons.map((tomato) => (
          <span
            key={tomato.index}
            class={`tomato-icon ${tomato.completed ? 'completed' : ''}`}
          >
            {tomato.completed ? '✓' : '○'}
          </span>
        ))}
      </div>

      <div class="stats-summary">
        <div class="stats-item">
          <span class="stats-label">今日总计</span>
          <span class="stats-value">{completedPomodoros} 颗番茄</span>
        </div>
        <div class="stats-item">
          <span class="stats-label">专注时长</span>
          <span class="stats-value">{formatFocusTime(totalFocusMinutes)}</span>
        </div>
      </div>

      <div class="stats-progress-bar">
        <div class="stats-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );
}
