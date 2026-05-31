/**
 * 底部控制面板组件
 */
import { ControlButtons } from '../controls/ControlButtons';
import { DurationSelector } from '../controls/DurationSelector';
import { PomodoroStats } from '../controls/PomodoroStats';

interface ControlPanelProps {
  isRunning: boolean;
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  completedPomodoros: number;
  totalFocusMinutes: number;
  onReset: () => void;
  onPlayPause: () => void;
  onSkip: () => void;
  onFocusDurationChange: (value: number) => void;
  onShortBreakDurationChange: (value: number) => void;
  onLongBreakDurationChange: (value: number) => void;
}

export function ControlPanel({
  isRunning,
  focusDuration,
  shortBreakDuration,
  longBreakDuration,
  completedPomodoros,
  totalFocusMinutes,
  onReset,
  onPlayPause,
  onSkip,
  onFocusDurationChange,
  onShortBreakDurationChange,
  onLongBreakDurationChange,
}: ControlPanelProps) {
  return (
    <section class="control-panel">
      <div class="control-panel-left">
        <ControlButtons
          isRunning={isRunning}
          onReset={onReset}
          onPlayPause={onPlayPause}
          onSkip={onSkip}
        />
      </div>

      <div class="control-panel-center">
        <DurationSelector
          focusDuration={focusDuration}
          shortBreakDuration={shortBreakDuration}
          longBreakDuration={longBreakDuration}
          onFocusDurationChange={onFocusDurationChange}
          onShortBreakDurationChange={onShortBreakDurationChange}
          onLongBreakDurationChange={onLongBreakDurationChange}
        />
      </div>

      <div class="control-panel-right">
        <PomodoroStats
          completedPomodoros={completedPomodoros}
          totalFocusMinutes={totalFocusMinutes}
        />
      </div>
    </section>
  );
}
