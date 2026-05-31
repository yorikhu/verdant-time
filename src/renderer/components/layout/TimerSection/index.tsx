/**
 * 时间显示区域组件
 */
import { TimerDisplay } from '../../timer/TimerDisplay';
import styles from './style.module.scss';

interface TimerSectionProps {
  mode: 'focus' | 'shortBreak' | 'longBreak';
  remaining: number;
  duration: number;
  cycle: number;
  isRunning: boolean;
  isPaused: boolean;
}

export function TimerSection(props: TimerSectionProps) {
  return (
    <section class={styles['timer-section']}>
      <TimerDisplay
        mode={props.mode}
        remaining={props.remaining}
        duration={props.duration}
        cycle={props.cycle}
        isRunning={props.isRunning}
        isPaused={props.isPaused}
      />
    </section>
  );
}
