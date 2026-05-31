/**
 * 时长选择器组件
 */
import tomatoActiveIcon from "../../assets/images/tomato_active.png";
import flowerIcon from "../../assets/images/flower.png";
import grassIcon from "../../assets/images/grass.png";

interface DurationItem {
  id: "focus" | "shortBreak" | "longBreak";
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
  longBreakAfter: number;
  onFocusDurationChange: (value: number) => void;
  onShortBreakDurationChange: (value: number) => void;
  onLongBreakDurationChange: (value: number) => void;
}

export function DurationSelector({
  focusDuration,
  shortBreakDuration,
  longBreakDuration,
  longBreakAfter,
  onFocusDurationChange,
  onShortBreakDurationChange,
  onLongBreakDurationChange,
}: DurationSelectorProps) {
  const items: DurationItem[] = [
    {
      id: "focus",
      label: "专注",
      icon: tomatoActiveIcon,
      value: focusDuration,
      min: 1,
      max: 60,
    },
    {
      id: "shortBreak",
      label: "小憩",
      icon: flowerIcon,
      value: shortBreakDuration,
      min: 1,
      max: 30,
    },
    {
      id: "longBreak",
      label: "长休",
      icon: grassIcon,
      value: longBreakDuration,
      min: 5,
      max: 60,
    },
  ];

  const handleValueChange = (item: DurationItem, newValue: number) => {
    const clampedValue = Math.max(item.min, Math.min(item.max, newValue));
    const setter = {
      focus: onFocusDurationChange,
      shortBreak: onShortBreakDurationChange,
      longBreak: onLongBreakDurationChange,
    }[item.id];
    setter?.(clampedValue);
  };

  const handleInputBlur = (item: DurationItem, e: Event) => {
    const input = e.target as HTMLInputElement;
    const newValue = parseInt(input.value) || item.min;
    handleValueChange(item, newValue);
    input.value = String(Math.max(item.min, Math.min(item.max, newValue)));
  };

  return (
    <div class="duration-selector">
      <div class="section-title">时长自定义</div>
      <div class="duration-items-row">
        {items.map((item) => (
          <div key={item.id} class="duration-item">
            <div class="duration-row">
              <img src={item.icon} alt={item.label} class="duration-icon-img" />
              <span class="duration-label-text">{item.label}</span>
            </div>
            <div class="duration-controls">
              <input
                type="number"
                class="duration-input"
                value={item.value}
                min={item.min}
                max={item.max}
                onInput={(e) =>
                  handleValueChange(
                    item,
                    parseInt((e.target as HTMLInputElement).value) || item.min,
                  )
                }
                onBlur={(e) => handleInputBlur(item, e)}
              />
              <span class="duration-unit">分钟</span>
            </div>
          </div>
        ))}
      </div>
      <div class="duration-tip">
        <span class="tip-text">完成{longBreakAfter}颗番茄后，进入长休息</span>
      </div>
    </div>
  );
}
