/**
 * 番茄打卡统计组件
 */
import { useMemo } from 'preact/hooks';
import tomatoActiveIcon from '../../../assets/images/tomato_active.png';
import tomatoDeactiveIcon from '../../../assets/images/tomato_deactive.png';
import styles from './style.module.scss';

const DISPLAY_COUNT = 5;

interface PomodoroStatsProps {
  completedPomodoros: number;
}

export function PomodoroStats({ completedPomodoros }: PomodoroStatsProps) {
  const tomatoDisplay = useMemo(() => {
    const display = [];

    if (completedPomodoros <= DISPLAY_COUNT) {
      // 5个或更少：显示对应数量的活跃番茄
      for (let i = 0; i < DISPLAY_COUNT; i++) {
        display.push({
          type: 'icon' as const,
          completed: i < completedPomodoros,
        });
      }
    } else {
      // 超过5个：前4个显示活跃番茄，第5个显示+数字
      for (let i = 0; i < DISPLAY_COUNT - 1; i++) {
        display.push({
          type: 'icon' as const,
          completed: true,
        });
      }
      display.push({
        type: 'more' as const,
        count: completedPomodoros - (DISPLAY_COUNT - 1),
      });
    }

    return display;
  }, [completedPomodoros]);

  return (
    <div class={styles['pomodoro-stats']}>
      <div class={styles['section-title']}>今日番茄打卡</div>

      <div class={styles['stats-tomatoes']}>
        {tomatoDisplay.map((item, index) => {
          if (item.type === 'icon') {
            return (
              <img
                key={index}
                src={item.completed ? tomatoActiveIcon : tomatoDeactiveIcon}
                alt="tomato"
                class={`${styles['tomato-icon']} ${item.completed ? styles.completed : ''}`}
              />
            );
          } else {
            return (
              <div key={index} class={styles['tomato-more']}>
                +{item.count}
              </div>
            );
          }
        })}
      </div>

      <div class={styles['stats-summary']}>
        <span class={styles['stats-label']}>今日总计</span>
        <span class={styles['stats-value']}>{completedPomodoros}</span>
        <span class={styles['stats-unit']}>个番茄</span>
      </div>
    </div>
  );
}
