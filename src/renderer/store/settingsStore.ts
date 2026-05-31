/**
 * 设置状态管理
 */
import { create } from 'zustand';
import type { SettingsStore } from '../types/timer';
import { DEFAULT_SETTINGS } from '../../shared/constants';
import { loadSettings, saveSettings } from '../utils/storage';

// 加载初始设置
const initialSettings = loadSettings();

export const useSettingsStore = create<SettingsStore>()((set) => ({
  // 初始状态
  ...DEFAULT_SETTINGS,
  ...initialSettings,

  // Actions
  updateSettings: (settings) => {
    set((state) => {
      const newState = { ...state, ...settings };
      saveSettings(newState);
      return newState;
    });
  },

  resetSettings: () => {
    set(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
  },

  setFocusDuration: (duration) => {
    set((state) => {
      const newState = { ...state, focusDuration: duration };
      saveSettings(newState);
      return newState;
    });
  },

  setShortBreakDuration: (duration) => {
    set((state) => {
      const newState = { ...state, shortBreakDuration: duration };
      saveSettings(newState);
      return newState;
    });
  },

  setLongBreakDuration: (duration) => {
    set((state) => {
      const newState = { ...state, longBreakDuration: duration };
      saveSettings(newState);
      return newState;
    });
  },

  setLongBreakAfter: (count) => {
    set((state) => {
      const newState = { ...state, longBreakAfter: count };
      saveSettings(newState);
      return newState;
    });
  },

  setAutoStartBreaks: (enabled) => {
    set((state) => {
      const newState = { ...state, autoStartBreaks: enabled };
      saveSettings(newState);
      return newState;
    });
  },

  setAutoStartPomodoros: (enabled) => {
    set((state) => {
      const newState = { ...state, autoStartPomodoros: enabled };
      saveSettings(newState);
      return newState;
    });
  },

  setSoundEnabled: (enabled) => {
    set((state) => {
      const newState = { ...state, soundEnabled: enabled };
      saveSettings(newState);
      return newState;
    });
  },

  setVolume: (volume) => {
    set((state) => {
      const newState = { ...state, volume: Math.max(0, Math.min(1, volume)) };
      saveSettings(newState);
      return newState;
    });
  },

  setSelectedTheme: (theme) => {
    set((state) => {
      const newState = { ...state, selectedTheme: theme };
      saveSettings(newState);
      return newState;
    });
  },

  setSelectedNoise: (noise) => {
    set((state) => {
      const newState = { ...state, selectedNoise: noise };
      saveSettings(newState);
      return newState;
    });
  },

  setNoiseVolume: (volume) => {
    set((state) => {
      const newState = { ...state, noiseVolume: Math.max(0, Math.min(1, volume)) };
      saveSettings(newState);
      return newState;
    });
  },
}));
