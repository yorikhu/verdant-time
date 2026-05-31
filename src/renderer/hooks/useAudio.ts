/**
 * 音频播放 Hook
 */
import { useEffect, useRef, useState, useCallback } from 'preact/hooks';
import { useSettingsStore } from '../store/settingsStore';
import { WHITE_NOISES } from '../../shared/constants';

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { soundEnabled, selectedNoise, noiseVolume, setSelectedNoise, setNoiseVolume } =
    useSettingsStore();

  const [isPlaying, setIsPlaying] = useState(false);

  // 初始化音频元素
  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = noiseVolume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 更新音量
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = noiseVolume;
    }
  }, [noiseVolume]);

  // 播放白噪音
  const playNoise = useCallback(
    (noiseId: string | null) => {
      if (!soundEnabled || !audioRef.current) {
        return;
      }

      // 停止当前播放
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      if (noiseId) {
        const noise = WHITE_NOISES.find((n) => n.id === noiseId);
        if (noise && noise.src) {
          audioRef.current.src = noise.src;
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        } else {
          // 占位符：显示提示
          console.log(`白噪音功能框架：${noiseId} (需要添加音频文件)`);
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(false);
      }

      setSelectedNoise(noiseId);
    },
    [soundEnabled, setSelectedNoise]
  );

  // 停止播放
  const stopNoise = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setSelectedNoise(null);
  }, [setSelectedNoise]);

  // 切换播放状态
  const toggleNoise = useCallback(() => {
    if (isPlaying) {
      stopNoise();
    } else if (selectedNoise) {
      playNoise(selectedNoise);
    }
  }, [isPlaying, selectedNoise, playNoise, stopNoise]);

  return {
    isPlaying,
    selectedNoise,
    noiseVolume,
    playNoise,
    stopNoise,
    toggleNoise,
    setVolume: setNoiseVolume,
    noises: WHITE_NOISES,
  };
}
