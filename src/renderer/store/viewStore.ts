/**
 * 视图状态管理
 */
import { create } from 'zustand';
import type { ViewState, AppView } from '../types/timer';

export const useViewStore = create<ViewState>((set) => ({
  // 初始状态
  currentView: 'timer',
  isSettingsOpen: false,

  // Actions
  setCurrentView: (view: AppView) => {
    set({ currentView: view });
  },

  setSettingsOpen: (open) => {
    set({ isSettingsOpen: open });
  },
}));
