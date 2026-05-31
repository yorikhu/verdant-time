/**
 * 时长选择器组件
 */

interface DurationItem {
  id: 'focus' | 'shortBreak' | 'longBreak';
  label: string;
  icon: string;
  value: number;
  min: number;
  max: number;
}

interface DurationSelectorProps {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  onFocusDurationChange: (value: number) => void;
  onShortBreakDurationChange: (value: number) => void;
  onLongBreakDurationChange: (value: number) => void;
}

export function DurationSelector({
  focusDuration,
  shortBreakDuration,
  longBreakDuration,
  onFocusDurationChange,
  onShortBreakDurationChange,
  onLongBreakDurationChange,
}: DurationSelectorProps) {
  const items: DurationItem[] = [
    { id: 'focus', label: '专注', icon: '🍅', value: focusDuration, min: 1, max: 60 },
    { id: 'shortBreak', label: '小憩', icon: '☕', value: shortBreakDuration, min: 1, max: 30 },
    { id: 'longBreak', label: '长休', icon: '🌿', value: longBreakDuration, min: 5, max: 60 },
  ];

  const handleValueChange = (item: DurationItem, delta: number) => {
    const newValue = Math.max(item.min, Math.min(item.max, item.value + delta));
    const setter = {
      focus: onFocusDurationChange,
      shortBreak: onShortBreakDurationChange,
      longBreak: onLongBreakDurationChange,
    }[item.id];
    setter?.(newValue);
  };

  return (
    <div class="duration-selector">
      {items.map((item) => (
        <div key={item.id} class="duration-item">
          <div class="duration-label">
            <span class="duration-icon">{item.icon}</span>
            <span class="duration-text">{item.label}</span>
          </div>

          <div class="duration-controls">
            <button
              class="duration-btn"
              onClick={() => handleValueChange(item, -1)}
              disabled={item.value <= item.min}
            >
              −
            </button>
            <span class="duration-value">{item.value}</span>
            <button
              class="duration-btn"
              onClick={() => handleValueChange(item, 1)}
              disabled={item.value >= item.max}
            >
              +
            </button>
            <span class="duration-unit">分钟</span>
          </div>
        </div>
      ))}
    </div>
  );
}
