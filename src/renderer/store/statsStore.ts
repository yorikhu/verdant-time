/**
 * 统计状态管理
 */
import { create } from 'zustand';
import type { StatsStore } from '../types/timer';
import { loadStats, saveStats } from '../utils/storage';
import { getTodayString } from '../utils/time';

// 加载初始统计
const initialStats = loadStats();

export const useStatsStore = create<StatsStore>((set, get) => ({
  // 初始状态
  today: initialStats.today,
  history: initialStats.history,

  // Actions
  completePomodoro: (minutes) => {
    set((state) => {
      const newToday = {
        completedPomodoros: state.today.completedPomodoros + 1,
        totalFocusMinutes: state.today.totalFocusMinutes + minutes,
        cycles: state.today.cycles + 1,
      };

      // 更新历史记录
      const today = getTodayString();
      const historyIndex = state.history.findIndex((h) => h.date === today);
      let newHistory = [...state.history];

      if (historyIndex >= 0) {
        // 更新今天的记录
        newHistory[historyIndex] = {
          date: today,
          ...newToday,
        };
      } else {
        // 添加今天的记录
        newHistory.push({
          date: today,
          ...newToday,
        });
      }

      // 保存到本地存储
      saveStats({
        today: newToday,
        history: newHistory,
      });

      return {
        today: newToday,
        history: newHistory,
      };
    });
  },

  resetToday: () => {
    set({
      today: {
        completedPomodoros: 0,
        totalFocusMinutes: 0,
        cycles: 0,
      },
    });
  },

  loadHistory: () => {
    const stats = loadStats();
    set({
      today: stats.today,
      history: stats.history,
    });
  },

  saveHistory: () => {
    const state = get();
    saveStats({
      today: state.today,
      history: state.history,
    });
  },
}));
