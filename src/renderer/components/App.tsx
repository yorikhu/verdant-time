/**
 * 主应用组件 - 青植番茄钟
 */
import { useEffect } from 'preact/hooks';
import { Header } from './layout/Header';
import { TimerSection } from './layout/TimerSection';
import { ControlButtons } from './controls/ControlButtons';
import { DurationSelector } from './controls/DurationSelector';
import { PomodoroStats } from './controls/PomodoroStats';
import { InfoBar } from './layout/InfoBar';
import { useTimer } from '../hooks/useTimer';
import { useSettingsStore } from '../store/settingsStore';

export function App() {
  const {
    mode,
    remaining,
    duration,
    cycle,
    isRunning,
    isPaused,
    start,
    pause,
    reset,
    skip,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakAfter,
    completedPomodoros,
    totalFocusMinutes,
  } = useTimer();

  const { selectedTheme } = useSettingsStore();

  // 应用主题
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  return (
    <div class="app" data-theme={selectedTheme}>
      <Header />

      <main class="main-content">
        {/* 时长选择和番茄统计 - 上方区域 */}
        <div class="top-section">
          <DurationSelector
            focusDuration={focusDuration}
            shortBreakDuration={shortBreakDuration}
            longBreakDuration={longBreakDuration}
            onFocusDurationChange={(value) => {
              console.log('Focus duration:', value);
            }}
            onShortBreakDurationChange={(value) => {
              console.log('Short break duration:', value);
            }}
            onLongBreakDurationChange={(value) => {
              console.log('Long break duration:', value);
            }}
          />
          <PomodoroStats
            completedPomodoros={completedPomodoros}
            totalFocusMinutes={totalFocusMinutes}
          />
        </div>

        {/* 时间显示区域 */}
        <TimerSection
          mode={mode}
          remaining={remaining}
          duration={duration}
          cycle={cycle}
          isRunning={isRunning}
          isPaused={isPaused}
        />

        {/* 控制按钮 - 圆环下方居中 */}
        <div class="bottom-section">
          <ControlButtons
            isRunning={isRunning}
            onReset={reset}
            onPlayPause={isRunning ? pause : start}
            onSkip={skip}
          />
        </div>
      </main>

      {/* 底部信息栏 - 贴住底部 */}
      <InfoBar longBreakAfter={longBreakAfter} />
    </div>
  );
}
