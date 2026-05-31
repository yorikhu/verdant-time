# Verdant Time

A verdant, nature-inspired Pomodoro timer desktop application built with Electron.

## Features

- 🌱 Focus on growing habits through sustainable work/rest cycles
- 🍅 Pomodoro technique timer with customizable intervals
- 🎨 Beautiful, minimal interface inspired by nature
- 🖥️ Cross-platform desktop support (Windows, macOS, Linux)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
# Start the application
pnpm start

# Start with DevTools for debugging
pnpm dev
```

### Building

```bash
# Build for all platforms
pnpm build

# Build for Windows only
pnpm build:win

# Build for macOS only
pnpm build:mac

# Build for Linux only
pnpm build:linux
```

Built applications will be output to the `dist/` directory.

## Project Structure

```
verdant-time/
├── src/
│   ├── main/       # Main process (Electron main process code)
│   ├── renderer/   # Renderer process (UI files - HTML, CSS, JS)
│   └── preload/    # Preload scripts (secure IPC bridge)
├── build/          # Build assets (icons, etc.)
├── dist/           # Built application (generated)
└── package.json
```

## License

MIT 
