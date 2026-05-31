/**
 * 顶部导航栏组件
 */
import { useViewStore } from '../../store/viewStore';

interface HeaderProps {
  onHelp?: () => void;
}

export function Header({ onHelp }: HeaderProps) {
  const { currentView, setCurrentView } = useViewStore();

  const views = [
    { id: 'timer' as const, label: '专注番茄' },
    { id: 'shortBreak' as const, label: '短休息' },
    { id: 'longBreak' as const, label: '长休息' },
    { id: 'settings' as const, label: '设置' },
  ];

  const handleViewChange = (viewId: 'timer' | 'shortBreak' | 'longBreak' | 'settings') => {
    setCurrentView(viewId);
  };

  const handleFullscreen = () => {
    window.electronAPI?.toggleFullscreen();
  };

  const handleClose = () => {
    window.electronAPI?.closeWindow();
  };

  return (
    <header class="app-header">
      <div class="header-left">
        <div class="app-logo">
          <span class="logo-icon">🍅</span>
          <h1 class="app-title">青植番茄钟</h1>
        </div>
      </div>

      <nav class="header-nav">
        {views.map((view) => (
          <button
            key={view.id}
            class={`nav-item ${currentView === view.id ? 'active' : ''}`}
            onClick={() => handleViewChange(view.id)}
          >
            {view.label}
          </button>
        ))}
      </nav>

      <div class="header-right">
        {onHelp && (
          <button class="header-btn" onClick={onHelp} title="帮助">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
        )}
        <button class="header-btn" onClick={handleFullscreen} title="全屏">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
        <button class="header-btn close-btn" onClick={handleClose} title="关闭">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
