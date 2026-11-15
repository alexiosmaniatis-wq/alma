# Contributing to Alma

Thank you for your interest in contributing to Alma! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/alma.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Follow the setup instructions in the main README

## Development Process

### Before Making Changes

- Check existing issues and PRs to avoid duplicates
- Create an issue for substantial changes
- Discuss your approach in the issue before coding

### Making Changes

1. Write clean, well-typed TypeScript code
2. Follow the existing code style (Prettier enforces this)
3. Add or update tests for your changes
4. Add JSDoc comments to public functions
5. Update documentation if needed

### Running Quality Checks

```bash
# Format code
npm run format

# Check types
npm run type-check

# Lint code
npm run lint:fix

# Run tests
npm run test

# Build
npm run build
```

### Commit Guidelines

- Use clear, descriptive commit messages
- Reference issues: "Fix: resolve issue #123"
- Use conventional commits when possible
- Keep commits focused and logical

## Pull Request Process

1. Ensure all checks pass locally
2. Update README.md if needed
3. Add entry to CHANGELOG if applicable
4. Submit PR with clear description
5. Respond to review feedback
6. Maintainers will merge when approved

## Code Standards

### TypeScript

- Use strict mode (enabled by default)
- Add explicit return types to functions
- Avoid `any` type; use generics or unions
- Document complex logic with comments

### Testing

- Write tests for new functionality
- Aim for meaningful coverage
- Test edge cases and error conditions
- Use descriptive test names

### Formatting

- Prettier runs automatically in CI
- Run `npm run format` before committing
- Follow `.editorconfig` settings

## Reporting Issues

Include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, etc.)
- Screenshots or error messages

## Questions?

- Open a discussion issue
- Check existing documentation
- Review similar features in codebase

Thank you for contributing! 🙏
