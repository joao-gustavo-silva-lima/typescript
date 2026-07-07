# TypeScript Exercises

Welcome to my repository dedicated to solving TypeScript exercises from the Exercism platform! This repository serves as a personal laboratory for sharpening my TypeScript skills, mastering the type system, and implementing clean code principles through Test-Driven Development (TDD).

## 🚀 Repository Overview

Each directory inside this repository represents a standalone exercise provided by Exercism. The environment is configured using Yarn (with Plug'n'Play enabled) and Jest for robust unit testing.

### 📁 Project Structure

The project follows a consistent, modular structure for every challenge. Here is a visual mapping based on the `collatz-conjecture` exercise:

```text
typescript/
├── atbash-cipher/
├── binary-search/
├── bob/
├── clock/
└── collatz-conjecture/
    ├── .yarn/                  # Yarn local configuration and cache
    ├── .pnp.cjs                # Yarn Plug'n'Play runtime execution file
    ├── README.md               # Exercise introduction, instructions, and context
    ├── HELP.md                 # Exercism platform help utilities
    ├── collatz-conjecture.ts   # My production implementation / solution file
    ├── collatz-conjecture.test.ts # Unit tests provided by Exercism (Jest)
    ├── jest.config.cjs         # Test runner configurations
    ├── tsconfig.json           # TypeScript compilation settings
    ├── package.json            # Scripts and dependencies definition
    └── yarn.lock               # Locked dependency tree
```

---

## 🔑 Core Files per Exercise

When navigating into any exercise directory, the three most vital files to explore are:

1. 📝 **`README.md`**: Contains the official exercise instructions, problem domain description, and edge cases to consider.
2. 🧪 **`*.test.ts`**: The test suite powered by **Jest**. It contains comprehensive test assertions that my solution must pass to be considered correct.
3. 💻 **`*.ts`**: My custom solution file where the core logic, type definitions, and exported functions live.

---

## 🛠️ Getting Started & How to Run

To run the tests locally and explore the solutions, ensure you have **Node.js** and **Yarn** installed.

### 1. Clone the Repository
```bash
git clone https://github.com/joao-gustavo-silva-lima/typescript.git
cd typescript
```

### 2. Navigate to an Exercise
Choose any challenge folder from the root directory:
```bash
cd collatz-conjecture
```

### 3. Install Dependencies
This project utilizes Yarn PnP, keeping local footprints light:
```bash
yarn install
```

### 4. Execute the Test Suite
Run the Jest test runner to validate the solution's compliance with the requirements:
```bash
yarn test
```

To watch for active changes during refactoring:
```bash
yarn test --watch
```

---

## 📈 Goals

- **Type Safety**: Ensuring strict compiler flags are met and leveraging TypeScript's powerful type-inference model.
- **TDD Workflow**: Initially observing failing test blocks, writing minimal code to make them pass, and then iteratively refactoring for efficiency and readability.
- **Clean Commits**: Documenting progress through atomic commits (e.g., configuring setups, optimizing iterations, or renaming indexes to explicit terms like `stepCount`).

Enjoy Coding! 🚀
