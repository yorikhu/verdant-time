/**
 * 底部信息栏组件 - 左中右结构
 */
import { useState } from 'preact/hooks';
import { WHITE_NOISES, THEMES } from '../../../shared/constants';
import { useSettingsStore } from '../../store/settingsStore';

interface InfoBarProps {
  longBreakAfter: number;
}

export function InfoBar({ longBreakAfter }: InfoBarProps) {
  const { selectedNoise, setSelectedNoise, selectedTheme, setSelectedTheme } = useSettingsStore();
  const [showNoiseMenu, setShowNoiseMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

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

      {/* 中间：提示信息 */}
      <div class="info-bar-item center-item">
        <span class="info-icon">💡</span>
        <span class="info-text">
          完成{longBreakAfter}颗番茄后，进入长休息
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
