/**
 * 顶部导航栏组件
 */
import { useViewStore } from '../../store/viewStore';
import tomatoIcon from '../../assets/images/tomato_active.png';
import flowerIcon from '../../assets/images/flower.png';
import grassIcon from '../../assets/images/grass.png';

// 图标映射
const icons = {
  focus: tomatoIcon,
  shortBreak: flowerIcon,
  longBreak: grassIcon,
};

export function Header() {
  const { currentView, setCurrentView } = useViewStore();

  const views = [
    { id: 'timer' as const, label: '专注番茄', icon: icons.focus },
    { id: 'shortBreak' as const, label: '短休息', icon: icons.shortBreak },
    { id: 'longBreak' as const, label: '长休息', icon: icons.longBreak },
  ] as const;

  const handleViewChange = (viewId: 'timer' | 'shortBreak' | 'longBreak') => {
    setCurrentView(viewId);
  };

  const handleMinimize = () => {
    window.electronAPI?.minimizeWindow();
  };

  const handleMaximize = () => {
    window.electronAPI?.maximizeWindow();
  };

  const handleClose = () => {
    window.electronAPI?.closeWindow();
  };

  return (
    <header class="app-header">
      {/* 左侧 - 应用名称 */}
      <div class="header-left">
        <span class="app-name">青植时间</span>
      </div>

      {/* 中间 - 功能标签居中 */}
      <nav class="header-nav">
        {views.map((view) => {
          const isActive = currentView === 'timer' ? view.id === 'timer' : currentView === view.id;
          return (
            <button
              key={view.id}
              class={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleViewChange(view.id)}
            >
              <img src={view.icon} alt={view.label} class="nav-icon" />
              <span>{view.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 右侧 - 窗口控制按钮 */}
      <div class="header-right">
        <button class="header-btn" onClick={handleMinimize} title="最小化">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button class="header-btn" onClick={handleMaximize} title="最大化">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
        </button>
        <button class="header-btn close-btn" onClick={handleClose} title="关闭">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
