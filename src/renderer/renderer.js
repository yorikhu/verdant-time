// Pomodoro Timer Application
class PomodoroTimer {
  constructor() {
    // Timer state
    this.isRunning = false;
    this.isPaused = false;
    this.timeRemaining = 25 * 60; // 25 minutes in seconds
    this.totalTime = 25 * 60;
    this.timerInterval = null;

    // DOM elements
    this.minutesEl = document.getElementById('minutes');
    this.secondsEl = document.getElementById('seconds');
    this.playBtn = document.getElementById('playBtn');
    this.resetBtn = document.getElementById('resetBtn');
    this.settingsBtn = document.getElementById('settingsBtn');
    this.themeButtons = document.querySelectorAll('.theme-btn');
    this.progressBar = document.querySelector('.progress-bar');
    this.app = document.getElementById('app');
    this.timeDisplay = document.querySelector('.time-display');

    // Initialize
    this.init();
  }

  init() {
    // Set up event listeners
    this.playBtn.addEventListener('click', () => this.toggleTimer());
    this.resetBtn.addEventListener('click', () => this.resetTimer());
    this.settingsBtn.addEventListener('click', () => this.showSettings());

    // Theme switching
    this.themeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.switchTheme(btn.dataset.theme));
    });

    // Load saved theme
    this.loadTheme();

    // Handle window focus changes
    window.addEventListener('focus', () => {
      document.body.classList.add('window-focused');
    });

    window.addEventListener('blur', () => {
      document.body.classList.remove('window-focused');
    });

    // Check for electronAPI
    if (window.electronAPI) {
      console.log('Electron API available:', window.electronAPI);
    }
  }

  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.isRunning = true;
    this.isPaused = false;
    this.updatePlayButton();

    this.timerInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  pauseTimer() {
    this.isRunning = false;
    this.isPaused = true;
    this.updatePlayButton();

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resetTimer() {
    // Stop the timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.isRunning = false;
    this.isPaused = false;
    this.timeRemaining = this.totalTime;

    this.updateDisplay();
    this.updatePlayButton();
    this.updateProgress();
  }

  tick() {
    if (this.timeRemaining > 0) {
      this.timeRemaining--;
      this.updateDisplay();
      this.updateProgress();
    } else {
      // Timer completed
      this.completeTimer();
    }
  }

  completeTimer() {
    this.pauseTimer();
    this.timeRemaining = this.totalTime;
    this.updateDisplay();
    this.updateProgress();

    // Play notification sound or show notification
    this.showNotification();
  }

  showNotification() {
    // Try to show system notification if available
    if (window.electronAPI && window.electronAPI.showNotification) {
      window.electronAPI.showNotification('Timer Complete!', 'Your focus session is done. Take a break!');
    } else {
      // Fallback: simple alert
      alert('Timer Complete! Take a break!');
    }
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;

    this.minutesEl.textContent = String(minutes).padStart(2, '0');
    this.secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateProgress() {
    // Calculate progress (1.0 = full, 0 = empty)
    const progress = this.timeRemaining / this.totalTime;
    const circumference = 2 * Math.PI * 90; // r = 90
    const offset = circumference * (1 - progress);

    this.progressBar.style.strokeDashoffset = offset;
  }

  updatePlayButton() {
    const playIcon = this.playBtn.querySelector('.play-icon');
    const pauseIcon = this.playBtn.querySelector('.pause-icon');

    if (this.isRunning) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      this.timeDisplay.classList.remove('paused');
    } else {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      this.timeDisplay.classList.add('paused');
    }
  }

  switchTheme(theme) {
    // Remove all theme classes
    this.app.className = '';
    // Add new theme class
    this.app.classList.add(`theme-${theme}`);

    // Update active button
    this.themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });

    // Save theme preference
    localStorage.setItem('pomodoro-theme', theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('pomodoro-theme') || 'default';
    this.switchTheme(savedTheme);
  }

  showSettings() {
    // TODO: Implement settings modal
    alert('Settings panel coming soon!');
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const timer = new PomodoroTimer();
  console.log('Pomodoro Timer initialized');
});

// Export for potential external access
window.pomodoroTimer = PomodoroTimer;
