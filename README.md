# Alma

> A modern development and design toolkit focused on excellence and creativity

[![npm version](https://img.shields.io/npm/v/alma.svg)](https://www.npmjs.com/package/alma)
[![npm downloads](https://img.shields.io/npm/dm/alma.svg)](https://www.npmjs.com/package/alma)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

Alma is a comprehensive toolkit designed for developers and designers who want to build beautiful, performant, and maintainable applications. Built with TypeScript and modern tooling, it provides a solid foundation for development projects.

## Vision

Alma empowers teams to:
- Build with **confidence** through strong typing and tooling
- Maintain **quality** with automated linting, formatting, and testing
- Scale **seamlessly** with a clean, modular architecture
- Create **beautiful** experiences through thoughtful design principles

## Features

- ✅ **TypeScript First** - Full type safety out of the box
- ✅ **Modern Tooling** - ESLint, Prettier, Vitest pre-configured
- ✅ **Best Practices** - Follows industry standards and conventions
- ✅ **Zero Dependencies** - No external runtime dependencies
- ✅ **Well Tested** - 120+ comprehensive tests with >80% coverage
- ✅ **Utility Library** - Practical reusable utilities for developers and designers
- ✅ **Production Ready** - Ready for npm and community use

## Quick Start

### Installation

```bash
npm install alma
```

```bash
yarn add alma
```

```bash
pnpm add alma
```

### Basic Usage

```typescript
import { slugify, camelCase, deepClone, isEmail } from 'alma';

// String utilities
const slug = slugify('Hello World!');      // 'hello-world'

// Collection utilities
const clone = deepClone({ a: { b: 1 } }); // Deep copy

// Validation
const valid = isEmail('test@example.com'); // true
```

📖 [See USAGE.md](./USAGE.md) for comprehensive guide with all examples and framework integrations.

## Utility Modules

Alma provides a comprehensive set of utility modules for common development tasks:

### String Utilities
Transform and manipulate strings with ease:
- `slugify()` - Convert to URL-friendly slug format
- `camelCase()`, `pascalCase()`, `snakeCase()` - Case converters
- `capitalize()`, `reverse()` - String transformations
- `isPalindrome()` - Check for palindromes
- `truncate()`, `repeat()`, `padCenter()` - String formatting
- `count()` - Count occurrences of substrings

**Example:**
```typescript
import { slugify, camelCase, pascalCase } from 'alma';

slugify('Hello World!');        // 'hello-world'
camelCase('hello-world');       // 'helloWorld'
pascalCase('hello_world');      // 'HelloWorld'
```

### Collection Utilities
Handle arrays and objects efficiently:
- `flatten()` - Flatten nested arrays to specified depth
- `deepClone()` - Create deep copies of objects/arrays
- `merge()` / `deepMerge()` - Combine objects
- `groupBy()` - Group array elements by key
- `unique()` - Remove duplicates
- `pick()` / `omit()` - Select or exclude object properties
- `get()` - Access nested values with dot notation
- `sortBy()` - Sort arrays by key or function

**Example:**
```typescript
import { groupBy, unique, sortBy, get } from 'alma';

const users = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 30 }];
groupBy(users, u => u.age);    // Group by age
unique([1, 2, 2, 3]);          // [1, 2, 3]
sortBy(users, 'age');          // Sort by age
get({ a: { b: { c: 42 } } }, 'a.b.c');  // 42
```

### Validation & Type Guards
Comprehensive type checking and validation:
- Type guards: `isString()`, `isNumber()`, `isBoolean()`, `isArray()`, `isObject()`, etc.
- Special checks: `isEmail()`, `isURL()`, `isHexColor()`
- Number validation: `isInteger()`, `isPositive()`, `isNegative()`, `isEven()`, `isOdd()`
- Range checking: `inRange()`
- Pattern matching: `matches()`

**Example:**
```typescript
import { isEmail, isURL, isHexColor, inRange } from 'alma';

isEmail('test@example.com');    // true
isURL('https://example.com');   // true
isHexColor('#FF0000');          // true
inRange(5, 0, 10);              // true
```

### Color Utilities
Advanced color manipulation for design systems:
- **Conversion**: `hexToRgb()`, `rgbToHex()`, `hexToHsl()`, `hslToRgb()`, etc.
- **Manipulation**: `lighten()`, `darken()`, `saturate()`, `desaturate()`, `invert()`, `complement()`
- **Accessibility**: `getLuminance()`, `contrastRatio()`, `meetsContrastRatio()` (WCAG compliance)

**Example:**
```typescript
import {
  hexToRgb,
  lighten,
  darken,
  contrastRatio,
  meetsContrastRatio
} from 'alma';

hexToRgb('#FF0000');                    // { r: 255, g: 0, b: 0 }
lighten('#FF0000', 20);                 // Lighter red
darken('#FF0000', 20);                  // Darker red
contrastRatio('#FFFFFF', '#000000');    // 21
meetsContrastRatio('#FFF', '#000', 'AA'); // true (WCAG AA)
```

## Tech Stack

- **Language**: TypeScript 5.x
- **Testing**: Vitest
- **Linting**: ESLint + TypeScript
- **Formatting**: Prettier
- **Package Manager**: npm (or your preferred manager)
- **Node.js**: 18.x or higher

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone <repository-url>
cd alma
npm install
```

### Development

```bash
# Start development mode with file watching
npm run dev

# Type check your code
npm run type-check

# Run linter
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Building

```bash
# Build for production
npm run build

# Clean build artifacts
npm run clean
```

## Project Structure

```
alma/
├── src/                 # Source code
│   ├── index.ts        # Main export
│   ├── string.ts       # String utilities
│   ├── collections.ts  # Array/object utilities
│   ├── validation.ts   # Type guards and validation
│   └── color.ts        # Color utilities
├── tests/              # Test files
│   ├── index.test.ts
│   ├── string.test.ts
│   ├── collections.test.ts
│   ├── validation.test.ts
│   └── color.test.ts
├── dist/               # Build output (generated)
├── docs/               # Documentation
├── package.json        # Project metadata & dependencies
├── tsconfig.json       # TypeScript configuration
├── eslint.config.js    # ESLint configuration
├── .prettierrc.json    # Prettier configuration
├── vitest.config.ts    # Vitest configuration
├── .editorconfig       # Editor configuration
├── .gitignore          # Git ignore rules
├── LICENSE             # Apache 2.0 License
└── README.md          # This file
```

## Code Quality

This project enforces high code quality standards:

- **Type Safety**: Strict TypeScript configuration
- **Linting**: ESLint with TypeScript plugin catches common errors
- **Formatting**: Prettier ensures consistent code style
- **Testing**: Vitest provides fast unit testing with 122+ tests
- **Coverage**: Strong test coverage for all utility modules

### Running Quality Checks

```bash
# Run all checks
npm run type-check && npm run lint && npm run test

# Or run individually
npm run type-check  # TypeScript strict mode
npm run lint        # ESLint
npm run test        # Vitest
```

## Documentation

- 📘 **[USAGE.md](./USAGE.md)** - Complete usage guide with examples and framework integrations
- 🤝 **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contributing guidelines and development setup
- 🛣️ **[ROADMAP.md](./ROADMAP.md)** - Future features and version timeline
- 🔒 **[SECURITY.md](./SECURITY.md)** - Security policy and best practices
- 📋 **[CHANGELOG.md](./CHANGELOG.md)** - Version history and changes
- 💬 **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** - Community standards

## Community & Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

1. **Development Setup** - Get your environment ready
2. **Code Standards** - Follow our style guide
3. **Testing** - Write tests for new functionality
4. **Submitting** - PR process and guidelines

### Quick Start for Contributors

```bash
# Clone the repository
git clone https://github.com/yourusername/alma.git
cd alma

# Install dependencies
npm install

# Verify setup
npm run build && npm run test

# Create feature branch
git checkout -b feature/your-feature

# Run all checks before submitting
npm run build && npm run type-check && npm run lint && npm run test
```

### Support & Issues

- 🐛 **[Report Bugs](https://github.com/yourusername/alma/issues/new?template=bug_report.md)** - Use the bug template
- 💡 **[Request Features](https://github.com/yourusername/alma/issues/new?template=feature_request.md)** - Use the feature template
- 📚 **[Documentation Issues](https://github.com/yourusername/alma/issues/new?template=documentation.md)** - Help improve docs
- 💬 **[Discussions](https://github.com/yourusername/alma/discussions)** - Ask questions and share ideas

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/docs/rules/)
- [Prettier Documentation](https://prettier.io/docs/)
- [Vitest Guide](https://vitest.dev/)

---

Made with ❤️ for the development and design community