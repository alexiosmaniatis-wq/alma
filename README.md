# Alma

> A modern development and design toolkit focused on excellence and creativity

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
- ✅ **Zero Configuration** - Ready to develop immediately
- ✅ **Well Organized** - Clear folder structure for scalability
- ✅ **Test Ready** - Unit testing framework configured
- ✅ **Utility Library** - Practical reusable utilities for developers and designers

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

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** with clear messages (`git commit -m 'Add amazing feature'`)
4. **Push** to your branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Write TypeScript with strict mode enabled
- Add tests for new functionality
- Ensure all linting checks pass
- Follow the existing code style
- Update documentation as needed

### Running Tests Locally

Before submitting a PR, ensure:
```bash
npm run build       # Code compiles
npm run type-check  # Type checking passes
npm run lint        # Linting passes
npm run test        # Tests pass
```

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Documentation](https://eslint.org/docs/rules/)
- [Prettier Documentation](https://prettier.io/docs/)
- [Vitest Guide](https://vitest.dev/)

---

Made with ❤️ for the development and design community