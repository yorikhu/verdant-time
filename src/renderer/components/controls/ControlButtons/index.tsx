/**
 * 控制按钮组件
 */
import { useRef, useEffect } from 'preact/hooks';
import styles from './style.module.scss';

interface ControlButtonsProps {
  isRunning: boolean;
  onReset: () => void;
  onPlayPause: () => void;
  onSkip: () => void;
}

export function ControlButtons({ isRunning, onReset, onPlayPause, onSkip }: ControlButtonsProps) {
  const playButtonRef = useRef<HTMLButtonElement>(null);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        onPlayPause();
      } else if (e.code === 'KeyR') {
        onReset();
      } else if (e.code === 'KeyS') {
        onSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPlayPause, onReset, onSkip]);

  return (
    <div class={styles['control-buttons']}>
      <button class={`${styles['control-btn']} ${styles['btn-reset']}`} onClick={onReset} title="重置 (R)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      <button
        ref={playButtonRef}
        class={`${styles['control-btn']} ${styles['btn-play']}`}
        onClick={onPlayPause}
        title={isRunning ? '暂停 (Space)' : '开始 (Space)'}
      >
        {isRunning ? (
          // 暂停图标
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          // 播放图标（叶子形状）
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4c0-1.1.9-2 2-2s2 .9 2 2v16c0 1.1-.9 2-2 2s-2-.9-2-2V4zm8 0c0-1.1.9-2 2-2s2 .9 2 2v16c0 1.1-.9 2-2 2s-2-.9-2-2V4z" />
          </svg>
        )}
      </button>

      <button class={`${styles['control-btn']} ${styles['btn-skip']}`} onClick={onSkip} title="跳过 (S)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5,4 15,12 5,20" />
          <line x1="19" y1="5" x2="19" y2="19" />
        </svg>
      </button>
    </div>
  );
}
