/**
 * 计时器状态管理
 */
import { create } from 'zustand';
import type { TimerStore } from '../types/timer';
import { loadTimerState, saveTimerState, clearTimerState } from '../utils/storage';
import { loadSettings } from '../utils/storage';

// 加载保存的状态
const savedState = loadTimerState();
const settings = loadSettings();

// 根据模式获取默认时长
const getDefaultDuration = (mode: 'focus' | 'shortBreak' | 'longBreak'): number => {
  switch (mode) {
    case 'focus':
      return settings.focusDuration * 60;
    case 'shortBreak':
      return settings.shortBreakDuration * 60;
    case 'longBreak':
      return settings.longBreakDuration * 60;
    default:
      return 25 * 60;
  }
};

export const useTimerStore = create<TimerStore>((set, get) => ({
  // 初始状态
  mode: savedState?.mode || 'focus',
  duration: getDefaultDuration(savedState?.mode || 'focus'),
  remaining: savedState?.remaining ?? getDefaultDuration('focus'),
  isRunning: false,
  isPaused: false,
  cycle: savedState?.cycle || 0,

  // Actions
  setMode: (mode) => {
    set((state) => {
      const duration = getDefaultDuration(mode);
      // 保存状态
      saveTimerState({
        mode,
        remaining: duration,
        cycle: state.cycle,
      });
      return {
        mode,
        duration,
        remaining: duration,
        isRunning: false,
        isPaused: false,
      };
    });
  },

  setDuration: (duration) => {
    set({ duration, remaining: duration });
  },

  start: () => {
    set({ isRunning: true, isPaused: false });
  },

  pause: () => {
    set({ isRunning: false, isPaused: true });
  },

  reset: () => {
    const mode = get().mode;
    const duration = getDefaultDuration(mode);
    set({
      duration,
      remaining: duration,
      isRunning: false,
      isPaused: false,
    });
    // 清除保存的状态
    clearTimerState();
  },

  skip: () => {
    const mode = get().mode;
    let nextMode: 'focus' | 'shortBreak' | 'longBreak' = 'focus';

    // 根据当前模式决定下一个模式
    if (mode === 'focus') {
      const cycle = get().cycle + 1;
      const longBreakAfter = settings.longBreakAfter;
      if ((cycle + 1) % longBreakAfter === 0) {
        nextMode = 'longBreak';
      } else {
        nextMode = 'shortBreak';
      }
    } else {
      nextMode = 'focus';
    }

    get().setMode(nextMode);
  },

  tick: () => {
    set((state) => {
      if (state.remaining > 0) {
        const newRemaining = state.remaining - 1;
        // 保存状态
        saveTimerState({
          mode: state.mode,
          remaining: newRemaining,
          cycle: state.cycle,
        });
        return { remaining: newRemaining };
      }
      return state;
    });
  },

  setCycle: (cycle) => {
    set({ cycle });
  },
}));
