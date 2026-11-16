# Contributing to Alma

Thank you for your interest in contributing to Alma! We welcome contributions from the community, including bug reports, feature requests, and code submissions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Committing](#committing)
- [Submitting Changes](#submitting-changes)
- [Code Style Guide](#code-style-guide)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Questions or Need Help?](#questions-or-need-help)

## Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct. By participating, you are expected to uphold this code. See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for details.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- Git
- Basic TypeScript knowledge (helpful but not required)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/alexiosmaniatis-wq/alma.git
cd alma
```

3. Add upstream remote:

```bash
git remote add upstream https://github.com/original/alma.git
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Verify Setup

Run all checks to ensure your environment is set up correctly:

```bash
npm run build       # TypeScript compilation
npm run type-check  # Type checking
npm run lint        # Linting
npm run test        # Run tests
```

All should pass without errors.

## Making Changes

### Create a Branch

Create a feature branch from `main`:

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

Use clear, descriptive branch names:
- `feature/add-new-utility` for new features
- `fix/correct-behavior` for bug fixes
- `docs/improve-readme` for documentation
- `refactor/optimize-performance` for refactoring

### File Structure

When adding new utilities:

1. Add implementation to appropriate module (e.g., `src/string.ts`)
2. Add tests to corresponding test file (e.g., `tests/string.test.ts`)
3. Export from `src/index.ts`
4. Document in README.md
5. Update CHANGELOG.md

### Example: Adding a New Utility

**1. Add to `src/string.ts`:**

```typescript
/**
 * Reverses the words in a string
 * @param str - The input string
 * @returns String with words reversed
 */
export function reverseWords(str: string): string {
  return str.split(' ').reverse().join(' ');
}
```

**2. Add test to `tests/string.test.ts`:**

```typescript
describe('reverseWords', () => {
  it('should reverse word order', () => {
    expect(reverseWords('hello world')).toBe('world hello');
    expect(reverseWords('a')).toBe('a');
    expect(reverseWords('one two three')).toBe('three two one');
  });
});
```

**3. Export from `src/index.ts`:**

Already handled by `export * from './string'`

**4. Document in README:**

Add to String Utilities section with examples

**5. Update CHANGELOG.md:**

Add under unreleased changes

## Testing

### Run All Tests

```bash
npm run test
```

### Run Tests in Watch Mode

```bash
npm run test -- --watch
```

### Run Specific Test File

```bash
npm run test -- string.test.ts
```

### Generate Coverage Report

```bash
npm run test:coverage
```

View HTML report in `coverage/` directory.

### Testing Guidelines

- Write tests for all new functionality
- Aim for >80% code coverage
- Include edge cases and error scenarios
- Use descriptive test names that explain what is being tested
- Test one thing per test (single responsibility)

Example test structure:

```typescript
describe('myFunction', () => {
  it('should handle basic case', () => {
    expect(myFunction('input')).toBe('expected');
  });

  it('should handle edge case', () => {
    expect(myFunction('')).toBe('empty');
  });

  it('should handle error case', () => {
    expect(() => myFunction(null)).toThrow();
  });
});
```

## Code Quality

### Type Checking

```bash
npm run type-check
```

Ensures strict TypeScript compliance. All code must pass this check.

### Linting

```bash
# Check for issues
npm run lint

# Automatically fix issues
npm run lint:fix
```

Follow ESLint rules defined in `eslint.config.js`. Most issues are auto-fixable.

### Formatting

```bash
# Check formatting
npm run format:check

# Apply formatting
npm run format
```

Prettier formats all TypeScript files. Must pass before submitting PR.

## Committing

### Commit Messages

Write clear, descriptive commit messages:

```
feat: add reverse words string utility

Add reverseWords function to reverse word order in strings.
Includes comprehensive tests and documentation.
Closes #42
```

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build, dependencies, or tooling

**Scope (optional):** Affected area (e.g., `string`, `collections`, `validation`)

**Subject:** Brief description (50 chars or less)

**Body:** Detailed explanation (optional but recommended)

**Footer:** Reference issues (e.g., `Closes #42`)

### Example Commits

```bash
git commit -m "feat(string): add reverse words utility

Add reverseWords function that reverses word order in strings.
Complements existing reverse function for character reversal.

Closes #42"
```

## Submitting Changes

### Before You Submit

Ensure all checks pass:

```bash
npm run build       # Compiles TypeScript
npm run type-check  # Strict type checking
npm run lint        # Linting
npm run test        # All tests pass
npm run format:check # Code formatting
```

### Create Pull Request

1. Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

2. Go to the original repository on GitHub
3. Click "New Pull Request"
4. Select your branch
5. Fill in the PR template with:
   - Clear description of changes
   - Why the changes are needed
   - Related issues (use `Closes #42` format)
   - Checklist items (follow template)

### Pull Request Guidelines

- **One feature per PR**: Keep PRs focused and reviewable
- **Up to date**: Rebase on latest `main` before submitting
- **Clear description**: Explain what and why, not just what
- **Tests included**: New features must have tests
- **Documentation updated**: Keep README and guides current
- **No breaking changes**: Unless specifically requested
- **Clean commit history**: Squash related commits if helpful

### Review Process

1. Maintainers review your PR
2. Address requested changes promptly
3. Push additional commits to address feedback
4. Maintainers merge once approved

## Code Style Guide

### TypeScript

- Use strict type annotations
- Avoid `any` type
- Document public functions with JSDoc
- Use meaningful variable names
- Keep functions focused and small

```typescript
/**
 * Transforms a string to kebab-case
 * @param str - The input string
 * @returns String converted to kebab-case
 * @example
 * kebabCase('helloWorld') // 'hello-world'
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
```

### Comments

Comment code that needs clarification, but not obvious code:

```typescript
// Good: Explains non-obvious logic
const result = value >> 2; // Right shift by 2 bits for faster division by 4

// Avoid: Obvious code doesn't need comments
const name = 'John'; // Set name to John
```

### Naming Conventions

- `camelCase` for variables and functions
- `PascalCase` for classes and types
- `UPPER_SNAKE_CASE` for constants
- Prefix private members with `_` or use `private` keyword

### Line Length

- Maximum 100 characters (enforced by formatter)
- Break long lines at logical points

## Testing Standards

### Coverage Requirements

- Aim for >80% overall coverage
- 100% for critical utilities
- All public functions tested
- Edge cases included

### Test Organization

```typescript
describe('module', () => {
  describe('function', () => {
    it('should handle normal case', () => { });
    it('should handle edge case', () => { });
    it('should throw on invalid input', () => { });
  });
});
```

## Issue Reporting

### Before Creating an Issue

- Search existing issues
- Check the FAQ and documentation
- Try reproducing with minimal example

### Issue Template

Use GitHub issue templates when available. Include:

1. **Description**: What is the issue?
2. **Steps to Reproduce**: How to reproduce the problem
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Node version, OS, package version
6. **Additional Context**: Screenshots, code examples, etc.

### Example Issue

```markdown
## Description
The `slugify` function removes numbers from slugs incorrectly.

## Steps to Reproduce
1. Call `slugify('test123')`
2. Observe output

## Expected
`test123`

## Actual
`test`

## Environment
- Node: 18.12.0
- alma: 0.1.0
- OS: macOS 13.0
```

## Questions or Need Help?

- **GitHub Issues**: Use for bug reports and feature requests
- **Discussions**: Use for questions and suggestions
- **Email**: Open an issue and maintainers will contact you
- **Chat**: Check if there's a Discord/Slack community

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Docs](https://prettier.io/docs/)
- [Vitest Guide](https://vitest.dev/)
- [Commit Conventions](https://www.conventionalcommits.org/)

## License

By contributing to Alma, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for contributing to Alma! 🎉
