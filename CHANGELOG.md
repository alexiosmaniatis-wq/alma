# Changelog

All notable changes to Alma will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial npm package preparation
- Comprehensive USAGE.md guide
- CONTRIBUTING.md for community support
- Security policy (SECURITY.md)
- Community Code of Conduct
- GitHub issue and PR templates

### Changed
- Enhanced package.json with npm publishing metadata
- Updated package with files array for npm distribution
- Added prepublishOnly script for quality assurance

### Fixed
- N/A

## [0.1.0] - 2026-11-15

### Added
- **String Utilities**: Complete set of string manipulation functions
  - `slugify()` - Convert to URL-friendly slugs
  - `camelCase()`, `pascalCase()`, `snakeCase()`, `kebabCase()` - Case conversion
  - `capitalize()`, `reverse()` - String transformations
  - `isPalindrome()` - Palindrome detection
  - `truncate()`, `repeat()`, `padCenter()` - String formatting
  - `count()` - Substring counting

- **Collection Utilities**: Array and object manipulation
  - `flatten()` - Flatten nested arrays
  - `deepClone()` - Deep object/array copying
  - `merge()`, `deepMerge()` - Object merging
  - `groupBy()` - Group array elements
  - `unique()` - Remove duplicates
  - `pick()`, `omit()` - Select/exclude properties
  - `get()`, `set()` - Access nested values with dot notation
  - `sortBy()` - Sort arrays by key or function

- **Validation & Type Guards**: Comprehensive type checking
  - Type guards: `isString()`, `isNumber()`, `isBoolean()`, `isArray()`, `isObject()`
  - Format validation: `isEmail()`, `isURL()`, `isHexColor()`
  - Number validation: `isInteger()`, `isPositive()`, `isNegative()`, `isEven()`, `isOdd()`
  - Range checking: `inRange()`
  - Pattern matching: `matches()`

- **Color Utilities**: Advanced color manipulation
  - Conversion: `hexToRgb()`, `rgbToHex()`, `hexToHsl()`, `hslToRgb()`
  - Manipulation: `lighten()`, `darken()`, `saturate()`, `desaturate()`, `invert()`, `complement()`
  - Accessibility: `getLuminance()`, `contrastRatio()`, `meetsContrastRatio()` (WCAG compliance)

- **Build & Development**
  - TypeScript 5.x with strict configuration
  - ESLint with TypeScript support
  - Prettier for code formatting
  - Vitest for unit testing
  - 100+ comprehensive test cases

- **Documentation**
  - Comprehensive README with examples
  - API reference for all utilities
  - Project structure documentation
  - Contributing guidelines

### Changed
- N/A

### Fixed
- N/A

### Security
- N/A

---

## Version Guide

### How to Read This File

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for security-related changes

### Semantic Versioning

Given a version number MAJOR.MINOR.PATCH, increment:
- MAJOR version when you make incompatible API changes
- MINOR version when you add functionality in a backwards-compatible manner
- PATCH version when you make backwards-compatible bug fixes

### Release Process

Releases are tagged with version numbers matching the CHANGELOG.md entries.
See [CONTRIBUTING.md](./CONTRIBUTING.md) for release procedures.

---

For the complete development history, see [Git commit log](https://github.com/yourusername/alma/commits/main).
