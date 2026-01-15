# Battleship

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![The Odin Project](https://img.shields.io/badge/The%20Odin%20Project-Lesson-red)](https://www.theodinproject.com/lessons/javascript-battleship)

> A fully functional, TDD-based Battleship game built with Vanilla JavaScript and Webpack. This project marks a major milestone in my journey through The Odin Project, focusing on complex game logic, factory functions, and comprehensive unit testing.

## 📋 Table of Contents

- [Battleship](#battleship)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Building for Production](#building-for-production)
  - [💡 Future Improvements](#-future-improvements)
  - [📚 What I Learned](#-what-i-learned)

## ✨ Features

- **Drag and Drop Ship Placement:** Intuitively position your fleet before the battle begins.
- **Immersive Audio:** Integrated sound effects for hits, misses, and game events to enhance gameplay.
- **Ready System:** A dedicated "Ready" state to confirm fleet positioning before starting the game loop.
- **Game Control:** Added an "End Game" feature to reset the board or exit a session immediately.
- **Test-Driven Development:** Core game logic (Ships, Gameboards, Players) developed using Jest unit tests.
- **Modern Build Pipeline:** Optimized asset bundling and development server using Webpack.

## 🚀 Getting Started

Want to run this project locally? Here's how:

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository:**

```bash
git clone [https://github.com/top-submissions/fullstackjs-battleship.git](https://github.com/top-submissions/fullstackjs-battleship.git)

```

1. **Navigate to the directory:**

```bash
cd fullstackjs-battleship

```

1. **Install all dependencies:**

```bash
npm run dep:all

```

### Building for Production

1. **Generate the production bundle:**

```bash
npm run build

```

1. **Preview the app:**
Open the `dist/index.html` file in your browser or use a local live server.

## 💡 Future Improvements

If I were to continue working on this project, here's what I'd add:

- [x] **Drag and Drop:** Allow users to manually place their ships on the grid.
- [ ] **Two-Player Mode:** Implement a pass-and-play feature for two human players.
- [x] **Sound Effects:** Add audio feedback for explosions, water splashes, and game victory.
- [ ] **Advanced AI:** Implement a "hunt-and-target" algorithm for a more challenging experience.

## 📚 What I Learned

- **Factory Functions vs Classes:** Deciding when to use closures for private state versus modern JS classes.
- **Separation of Concerns:** Keeping the game logic (pure JavaScript) completely isolated from the DOM manipulation.
- **Unit Testing with Jest:** Mastering the art of testing individual components like `receiveAttack()` and `allSunk()`.
- **Webpack Configuration:** Setting up loaders for CSS and HTML to create a cohesive build process.

---

<div align="center">

Built with 💡 and ☕ as part of my journey through <a href="https://www.theodinproject.com/">The Odin Project</a>

</div>
