# Verdant Time 青植番茄钟

A verdant, nature-inspired Pomodoro timer desktop application built with Electron.

一款清新自然风格的番茄钟桌面应用，基于 Electron 构建。

## Features 功能特点

- 🌱 Focus on growing habits through sustainable work/rest cycles
- 🍅 Pomodoro technique timer with customizable intervals
- 🎨 Beautiful, minimal interface inspired by nature
- 🖥️ Cross-platform desktop support (Windows, macOS, Linux)
- ✨ Gradient backgrounds with layered depth
- ⚙️ Customizable focus and break durations

## Getting Started 快速开始

### Prerequisites 前置要求

- Node.js (v20 or higher)
- pnpm

### Installation 安装

```bash
# Install dependencies
pnpm install
```

### Development 开发

```bash
# Start the application in development mode
pnpm dev
```

### Building 构建

```bash
# Quick test build (current platform, unpacked)
pnpm build

# Production build (current platform, creates installer)
pnpm build:prod

# Platform-specific builds
pnpm build:win      # Windows (NSIS installer)
pnpm build:mac      # macOS (DMG)
pnpm build:linux    # Linux (AppImage)

# Build for all platforms (requires CI/CD or respective OS)
pnpm build:all
```

Built applications will be output to the `dist-app/` directory.

> **Note**: Code signing is disabled for development. For distribution, you may need to configure code signing certificates for your platform.

## Project Structure 项目结构

```
verdant-time/
├── src/
│   ├── main/       # Main process (Electron main process code)
│   ├── renderer/   # Renderer process (UI - Preact + SCSS)
│   ├── preload/    # Preload scripts (secure IPC bridge)
│   ├── hooks/      # Custom React hooks
│   ├── store/      # State management (Zustand)
│   └── shared/     # Shared utilities and types
├── build/          # Build assets (icons, etc.)
├── dist/           # Compiled output (generated)
├── dist-app/       # Final application installers (generated)
└── package.json
```

## Tech Stack 技术栈

- **Desktop Framework**: Electron
- **UI Framework**: Preact
- **Styling**: SCSS
- **Build Tool**: Vite
- **State Management**: Zustand
- **TypeScript**: Full type safety

## License

MIT
