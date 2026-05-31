/**
 * 计时器 Hook
 */
import { useEffect, useRef, useCallback } from 'preact/hooks';
import { useTimerStore } from '../store/timerStore';
import { useSettingsStore } from '../store/settingsStore';
import { useStatsStore } from '../store/statsStore';
import { useViewStore } from '../store/viewStore';

export function useTimer() {
  const timer = useTimerStore();
  const settings = useSettingsStore();
  const stats = useStatsStore();
  const view = useViewStore();

  const intervalRef = useRef<number | null>(null);
  const completionNotifiedRef = useRef(false);

  // 启动计时器
  const start = useCallback(() => {
    timer.start();
  }, [timer]);

  // 暂停计时器
  const pause = useCallback(() => {
    timer.pause();
  }, [timer]);

  // 重置计时器
  const reset = useCallback(() => {
    timer.reset();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    completionNotifiedRef.current = false;
  }, [timer]);

  // 跳过当前阶段
  const skip = useCallback(() => {
    timer.skip();
    completionNotifiedRef.current = false;
  }, [timer]);

  // 切换模式
  const switchMode = useCallback(
    (mode: 'focus' | 'shortBreak' | 'longBreak') => {
      timer.setMode(mode);
      view.setCurrentView(mode === 'focus' ? 'timer' : mode);
      completionNotifiedRef.current = false;
    },
    [timer, view]
  );

  // 计时器 tick
  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = window.setInterval(() => {
        timer.tick();

        // 检查是否完成
        const state = useTimerStore.getState();
        if (state.remaining <= 0 && !completionNotifiedRef.current) {
          completionNotifiedRef.current = true;

          // 停止计时器
          pause();

          // 如果是专注模式，记录统计
          if (state.mode === 'focus') {
            stats.completePomodoro(settings.focusDuration);
          }

          // 显示通知
          if (settings.soundEnabled && window.electronAPI) {
            const messages = {
              focus: '专注完成！该休息一下了。',
              shortBreak: '休息结束，继续加油！',
              longBreak: '长休息结束，准备开始新的专注！',
            };
            window.electronAPI
              .showNotification({
                title: '青植番茄钟',
                body: messages[state.mode],
              })
              .catch(console.error);
          }

          // 自动切换到下一个模式
          setTimeout(() => {
            if (settings.autoStartBreaks && state.mode === 'focus') {
              skip();
            } else if (settings.autoStartPomodoros && state.mode !== 'focus') {
              skip();
              start();
            }
          }, 1000);
        }
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isRunning, timer, pause, stats, settings, skip, start]);

  return {
    // 状态
    mode: timer.mode,
    duration: timer.duration,
    remaining: timer.remaining,
    isRunning: timer.isRunning,
    isPaused: timer.isPaused,
    cycle: timer.cycle,

    // 操作
    start,
    pause,
    reset,
    skip,
    switchMode,

    // 设置
    focusDuration: settings.focusDuration,
    shortBreakDuration: settings.shortBreakDuration,
    longBreakDuration: settings.longBreakDuration,
    longBreakAfter: settings.longBreakAfter,

    // 统计
    completedPomodoros: stats.today.completedPomodoros,
    totalFocusMinutes: stats.today.totalFocusMinutes,
  };
}
