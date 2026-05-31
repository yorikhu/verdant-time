/**
 * 底部信息栏组件 - 左中右结构
 */
import { useState, useMemo } from 'preact/hooks';
import { WHITE_NOISES, THEMES } from '../../../shared/constants';
import { useSettingsStore } from '../../store/settingsStore';
import { getTodayQuote } from '../../utils/quotes';

interface InfoBarProps {}

export function InfoBar({}: InfoBarProps) {
  const { selectedNoise, setSelectedNoise, selectedTheme, setSelectedTheme } = useSettingsStore();
  const [showNoiseMenu, setShowNoiseMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // 获取今日鸡汤
  const todayQuote = useMemo(() => getTodayQuote(), []);

  const handleNoiseSelect = (noiseId: string | null) => {
    setSelectedNoise(noiseId);
    setShowNoiseMenu(false);
  };

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setShowThemeMenu(false);
  };

  const currentNoise = WHITE_NOISES.find((n) => n.id === selectedNoise);
  const currentTheme = THEMES[selectedTheme];

  return (
    <div class="info-bar">
      {/* 左侧：白噪音选择 */}
      <div class="info-bar-item">
        <button
          class="info-bar-button"
          onClick={() => setShowNoiseMenu(!showNoiseMenu)}
        >
          <span class="info-icon">🎵</span>
          <span class="info-text">
            {currentNoise ? currentNoise.name : '白噪音'}
          </span>
        </button>

        {showNoiseMenu && (
          <div class="dropdown-menu noise-menu">
            <button
              class={`dropdown-item ${selectedNoise === null ? 'active' : ''}`}
              onClick={() => handleNoiseSelect(null)}
            >
              <span class="dropdown-icon">🔇</span>
              <span>关闭</span>
            </button>
            {WHITE_NOISES.map((noise) => (
              <button
                key={noise.id}
                class={`dropdown-item ${selectedNoise === noise.id ? 'active' : ''}`}
                onClick={() => handleNoiseSelect(noise.id)}
              >
                <span class="dropdown-icon">{noise.icon}</span>
                <span>{noise.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 中间：鸡汤语录 */}
      <div class="info-bar-item center-item">
        <svg class="grass-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2C8 2 5 5 5 8C5 10 6 11 8 11C10 11 11 10 11 8C11 5 8 2 8 2Z" fill="#4CAF50"/>
          <path d="M8 11V14M5 8C5 8 4 9 4 10M11 8C11 8 12 9 12 10" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span class="info-text quote-text">
          {todayQuote.text}
        </span>
      </div>

      {/* 右侧：皮肤切换 */}
      <div class="info-bar-item">
        <button
          class="info-bar-button"
          onClick={() => setShowThemeMenu(!showThemeMenu)}
        >
          <span class="info-icon">🎨</span>
          <span class="info-text">{currentTheme?.name}</span>
        </button>

        {showThemeMenu && (
          <div class="dropdown-menu theme-menu">
            {Object.values(THEMES).map((theme) => (
              <button
                key={theme.id}
                class={`dropdown-item ${selectedTheme === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeSelect(theme.id)}
              >
                <span
                  class="theme-preview"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
