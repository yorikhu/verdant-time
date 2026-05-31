/**
 * 底部信息栏组件 - 左中右结构
 */
import { useState, useMemo } from 'preact/hooks';
import { WHITE_NOISES, THEMES } from '../../../../shared/constants';
import { useSettingsStore } from '../../../store/settingsStore';
import { getTodayQuote } from '../../../utils/quotes';
import styles from './style.module.scss';

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
    <div class={styles['info-bar']}>
      {/* 左侧：白噪音选择 */}
      <div class={styles['info-bar-item']}>
        <button
          class={styles['info-bar-button']}
          onClick={() => setShowNoiseMenu(!showNoiseMenu)}
        >
          <span class={styles['info-icon']}>🎵</span>
          <span class={styles['info-text']}>
            {currentNoise ? currentNoise.name : '白噪音'}
          </span>
        </button>

        {showNoiseMenu && (
          <div class={`${styles['dropdown-menu']} ${styles['noise-menu']}`}>
            <button
              class={`${styles['dropdown-item']} ${selectedNoise === null ? styles.active : ''}`}
              onClick={() => handleNoiseSelect(null)}
            >
              <span class={styles['dropdown-icon']}>🔇</span>
              <span>关闭</span>
            </button>
            {WHITE_NOISES.map((noise) => (
              <button
                key={noise.id}
                class={`${styles['dropdown-item']} ${selectedNoise === noise.id ? styles.active : ''}`}
                onClick={() => handleNoiseSelect(noise.id)}
              >
                <span class={styles['dropdown-icon']}>{noise.icon}</span>
                <span>{noise.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 中间：鸡汤语录 */}
      <div class={`${styles['info-bar-item']} ${styles['center-item']}`}>
        <svg class={styles['grass-icon']} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2C8 2 5 5 5 8C5 10 6 11 8 11C10 11 11 10 11 8C11 5 8 2 8 2Z" fill="#4CAF50"/>
          <path d="M8 11V14M5 8C5 8 4 9 4 10M11 8C11 8 12 9 12 10" stroke="#4CAF50" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span class={`${styles['info-text']} ${styles['quote-text']}`}>
          {todayQuote.text}
        </span>
      </div>

      {/* 右侧：皮肤切换 */}
      <div class={styles['info-bar-item']}>
        <button
          class={styles['info-bar-button']}
          onClick={() => setShowThemeMenu(!showThemeMenu)}
        >
          <span class={styles['info-icon']}>🎨</span>
          <span class={styles['info-text']}>{currentTheme?.name}</span>
        </button>

        {showThemeMenu && (
          <div class={`${styles['dropdown-menu']} ${styles['theme-menu']}`}>
            {Object.values(THEMES).map((theme) => (
              <button
                key={theme.id}
                class={`${styles['dropdown-item']} ${selectedTheme === theme.id ? styles.active : ''}`}
                onClick={() => handleThemeSelect(theme.id)}
              >
                <span
                  class={styles['theme-preview']}
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
