/**
 * 主应用组件
 */
import { useEffect } from 'preact/hooks';
import { Header } from './layout/Header';
import { TimerSection } from './layout/TimerSection';
import { ControlPanel } from './layout/ControlPanel';
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

  const handleHelp = () => {
    // 显示帮助对话框
    alert(
      '青植番茄钟帮助\n\n' +
        '快捷键：\n' +
        'Space - 开始/暂停\n' +
        'R - 重置计时器\n' +
        'S - 跳过当前阶段\n\n' +
        '功能说明：\n' +
        '• 专注番茄：25分钟专注时间\n' +
        '• 短休息：5分钟休息\n' +
        '• 长休息：15分钟长休息（每完成4个番茄后）'
    );
  };

  return (
    <div class="app" data-theme={selectedTheme}>
      <Header onHelp={handleHelp} />

      <main class="main-content">
        <TimerSection
          mode={mode}
          remaining={remaining}
          duration={duration}
          cycle={cycle}
          isRunning={isRunning}
          isPaused={isPaused}
        />

        <ControlPanel
          isRunning={isRunning}
          focusDuration={focusDuration}
          shortBreakDuration={shortBreakDuration}
          longBreakDuration={longBreakDuration}
          completedPomodoros={completedPomodoros}
          totalFocusMinutes={totalFocusMinutes}
          onReset={reset}
          onPlayPause={isRunning ? pause : start}
          onSkip={skip}
          onFocusDurationChange={(value) => {
            // TODO: 实现时长更新
            console.log('Focus duration:', value);
          }}
          onShortBreakDurationChange={(value) => {
            console.log('Short break duration:', value);
          }}
          onLongBreakDurationChange={(value) => {
            console.log('Long break duration:', value);
          }}
        />
      </main>

      <InfoBar longBreakAfter={longBreakAfter} />
    </div>
  );
}
