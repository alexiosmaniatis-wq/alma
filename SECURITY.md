# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Alma, report it privately using [GitHub's vulnerability reporting](https://github.com/alexiosmaniatis-wq/alma/security/advisories/new). If that option is unavailable, contact the repository owner through [their GitHub profile](https://github.com/alexiosmaniatis-wq). Do not include vulnerability details in a public issue.

**Do not** open a public GitHub issue for security vulnerabilities.

### Reporting Process

1. **Report Details**: Send a clear description including:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact of the vulnerability
   - Any suggested fixes (optional)

2. **Response Timeline**:
   - Acknowledgment of receipt within 48 hours
   - Initial assessment within 5 business days
   - Regular updates on progress

3. **Disclosure**:
   - We will work with you to develop a fix
   - A security advisory will be published after fixes are released
   - You will be credited in the advisory (if desired)

## Security Considerations

### Input Validation

Alma utilities perform input validation and sanitization:

- **String utilities**: Safely handle special characters and Unicode
- **Color utilities**: Validate color formats before processing
- **Validation utilities**: Provide type guards and format checking

### No External Dependencies

Alma has **zero runtime dependencies**, reducing the attack surface:

- No external code execution
- No network requests
- No environment-dependent behavior
- All algorithms implemented internally

### TypeScript & Type Safety

- Written in TypeScript with strict mode enabled
- Full type annotations prevent undefined behavior
- Compile-time type checking catches many errors
- No use of `any` type

### Testing & Code Quality

- 120+ test cases covering edge cases
- Strict linting and code style enforcement
- Regular security audits of code
- Continuous integration testing

## Security Best Practices for Users

### 1. Keep Alma Updated

```bash
npm update alma
```

Subscribe to security advisories:
- GitHub releases: Watch the repository
- npm Security Advisories: Run `npm audit`

### 2. Input Validation

While Alma provides validation utilities, always validate user input at boundaries:

```typescript
import { isEmail, isURL } from 'alma';

function processUserInput(email: string, website: string) {
  // First line of defense
  if (!isEmail(email)) {
    throw new Error('Invalid email');
  }
  
  if (!isURL(website)) {
    throw new Error('Invalid URL');
  }
  
  // Then process safely
}
```

### 3. Color Validation

When processing user-provided colors:

```typescript
import { isHexColor, hexToRgb } from 'alma';

function safeColorProcessing(colorInput: string) {
  if (!isHexColor(colorInput)) {
    return '#000000'; // Safe default
  }
  
  return hexToRgb(colorInput);
}
```

### 4. Handle Edge Cases

Be aware of edge cases in utility functions:

```typescript
import { deepClone, get } from 'alma';

// Deep clone creates new objects but doesn't preserve class instances
const obj = new MyClass();
const clone = deepClone(obj); // Not an instance of MyClass anymore

// Get safely handles missing paths
const value = get(obj, 'deeply.nested.path', 'fallback');
```

### 5. Performance Considerations

For large datasets, be aware of performance implications:

```typescript
import { groupBy, deepClone } from 'alma';

// Avoid on extremely large arrays (millions of items)
const grouped = groupBy(hugeArray, x => x.key);

// Deep cloning is recursive; large objects may be slow
const massive = deepClone(veryLargeObject);
```

## Dependency Security

### Runtime Dependencies

Alma has **zero runtime dependencies**, meaning:
- No npm packages to audit for vulnerabilities
- No transitive dependency risks
- Smaller bundle size
- No supply chain security concerns

### Development Dependencies

Development dependencies (only used during build, not included in distribution):

- TypeScript - Language compiler (Microsoft)
- ESLint - Code quality (OpenJS Foundation)
- Prettier - Code formatter (Prettier Foundation)
- Vitest - Test framework (Community-driven)

These are only used during development and testing, not included in published packages.

## Security Advisories

Security advisories are published in:

1. **GitHub Advisories**: https://github.com/alexiosmaniatis-wq/alma/security/advisories
2. **npm Security**: https://www.npmjs.com/package/alma (if any)
3. **Release Notes**: https://github.com/alexiosmaniatis-wq/alma/releases

## Scope of This Policy

This security policy applies to:
- Current version and recent releases
- Official npm package from `npm install alma`
- Official GitHub repository

Not covered:
- Forks or unofficial implementations
- Code modified after installation
- Integration issues in dependent projects

## Known Limitations

### String Utilities
- `slugify()` normalizes accents (by design for URL safety)
- Pattern matching with `matches()` uses JavaScript regex (common vulnerabilities apply)

### Color Utilities
- Color conversions use standard algorithms; precision may vary
- `contrastRatio()` follows WCAG guidelines for accessibility

### Validation Utilities
- Regular expressions may be vulnerable to ReDoS (Regex Denial of Service)
- Basic format validation only; server-side validation recommended
- No protection against business logic attacks

### Collection Utilities
- `deepClone()` is not suitable for functions or cyclic structures
- No circular reference detection

## Security Audit

The Alma codebase is designed with security in mind:

- ✅ No external dependencies
- ✅ No system calls or file I/O
- ✅ No network requests
- ✅ No eval or dynamic code execution
- ✅ Type-safe implementation
- ✅ Comprehensive test coverage
- ✅ Code review process for all changes

## Security Contacts

- **Private reporting**: https://github.com/alexiosmaniatis-wq/alma/security/advisories/new
- **GitHub Issues**: For non-security issues only

---

## Version

This document applies to Alma 0.1.0 and later.

Last Updated: November 15, 2026
