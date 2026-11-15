# Alma Usage Guide

A comprehensive guide to using Alma in your projects.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Import Methods](#import-methods)
- [Utility Modules](#utility-modules)
- [Framework Integration](#framework-integration)
- [Common Use Cases](#common-use-cases)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

## Installation

### via npm

```bash
npm install alma
```

### via yarn

```bash
yarn add alma
```

### via pnpm

```bash
pnpm add alma
```

### via bun

```bash
bun add alma
```

## Quick Start

### Basic Usage

```typescript
import { slugify, capitalize, deepClone, isEmail } from 'alma';

// String utilities
const slug = slugify('Hello World!');        // 'hello-world'
const title = capitalize('hello');           // 'Hello'

// Collection utilities
const clone = deepClone({ a: { b: 1 } });   // Deep copy

// Validation
const valid = isEmail('test@example.com');   // true
```

## Import Methods

### ES6 Module (Recommended)

```typescript
// Import specific utilities
import { slugify, camelCase, pascalCase } from 'alma';

// Or import all with namespace
import * as alma from 'alma';

const result = alma.slugify('Hello World');
```

### CommonJS

```javascript
// CommonJS imports
const { slugify, camelCase } = require('alma');

const result = slugify('Hello World');
```

### Mixed Imports

```typescript
import { slugify, deepClone } from 'alma';
import * as validation from 'alma'; // Available as namespace

const isValid = validation.isEmail('test@example.com');
```

## Utility Modules

### String Utilities

Transform and manipulate strings with ease.

#### Available Functions

```typescript
import {
  slugify,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  capitalize,
  reverse,
  isPalindrome,
  truncate,
  repeat,
  padCenter,
  count
} from 'alma';
```

#### Examples

```typescript
import { slugify, camelCase, pascalCase, capitalize } from 'alma';

// Create URL-friendly slugs
slugify('Hello World!');              // 'hello-world'
slugify('Café au Lait');              // 'cafe-au-lait'
slugify('UPPERCASE');                 // 'uppercase'

// Case conversions
camelCase('hello-world');             // 'helloWorld'
camelCase('hello_world_test');        // 'helloWorldTest'

pascalCase('hello-world');            // 'HelloWorld'
pascalCase('hello_world');            // 'HelloWorld'

snakeCase('helloWorld');              // 'hello_world'

kebabCase('helloWorld');              // 'hello-world'

// String manipulation
capitalize('hello');                  // 'Hello'
capitalize('hello world');            // 'Hello world'

reverse('hello');                     // 'olleh'

isPalindrome('racecar');              // true
isPalindrome('hello');                // false

truncate('Hello World Example', 8);   // 'Hello...'
truncate('Hi', 10);                   // 'Hi'

repeat('ab', 3);                      // 'ababab'

padCenter('hi', 10, '*');             // '****hi****'

count('hello', 'l');                  // 2
count('banana', 'a');                 // 3
```

### Collection Utilities

Handle arrays and objects efficiently.

#### Available Functions

```typescript
import {
  flatten,
  deepClone,
  merge,
  deepMerge,
  groupBy,
  unique,
  pick,
  omit,
  get,
  set,
  sortBy
} from 'alma';
```

#### Examples

```typescript
import {
  flatten,
  deepClone,
  merge,
  deepMerge,
  groupBy,
  unique,
  pick,
  omit,
  get,
  set,
  sortBy
} from 'alma';

// Flatten nested arrays
flatten([[1, 2], [3, [4, 5]]]);       // [1, 2, 3, [4, 5]]
flatten([[1, 2], [3, [4, 5]]], 2);    // [1, 2, 3, 4, 5]

// Deep cloning
const original = { a: { b: 1 }, c: [1, 2] };
const cloned = deepClone(original);
cloned.a.b = 2;
console.log(original.a.b);            // Still 1

// Merge objects (shallow)
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
merge(obj1, obj2);                    // { a: 1, b: 2, c: 3, d: 4 }

// Deep merge
const deep1 = { a: { x: 1 }, b: 2 };
const deep2 = { a: { y: 2 }, c: 3 };
deepMerge(deep1, deep2);              // { a: { x: 1, y: 2 }, b: 2, c: 3 }

// Group array by property
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' }
];
groupBy(users, u => u.role);
// {
//   admin: [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   user: [{ name: 'Bob', ... }]
// }

// Remove duplicates
unique([1, 2, 2, 3, 3, 3]);           // [1, 2, 3]
unique(['a', 'b', 'a']);              // ['a', 'b']

// Pick specific properties
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }

// Omit properties
omit({ a: 1, b: 2, c: 3 }, ['b']);   // { a: 1, c: 3 }

// Get nested values
const obj = { user: { profile: { name: 'John' } } };
get(obj, 'user.profile.name');        // 'John'
get(obj, 'user.profile.age', 25);     // 25 (default)

// Set nested values
set(obj, 'user.profile.age', 30);
// obj.user.profile.age is now 30

// Sort array by property
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];
sortBy(people, 'age');
// [{ name: 'Bob', age: 25 }, { name: 'Alice', age: 30 }]

sortBy(people, p => p.name);          // Sort by name (descending)
```

### Validation & Type Guards

Comprehensive type checking and validation.

#### Available Functions

```typescript
import {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isNull,
  isUndefined,
  isNil,
  isEmail,
  isURL,
  isHexColor,
  isInteger,
  isPositive,
  isNegative,
  isEven,
  isOdd,
  inRange,
  matches
} from 'alma';
```

#### Examples

```typescript
import {
  isEmail,
  isURL,
  isHexColor,
  isInteger,
  isPositive,
  isEven,
  inRange,
  matches
} from 'alma';

// Type checking
isString('hello');                    // true
isNumber(42);                         // true
isBoolean(true);                      // true
isArray([1, 2, 3]);                   // true
isObject({ a: 1 });                   // true
isNull(null);                         // true
isUndefined(undefined);               // true
isNil(null);                          // true
isNil(undefined);                     // true

// Special format validation
isEmail('test@example.com');          // true
isEmail('invalid-email');             // false

isURL('https://example.com');         // true
isURL('not a url');                   // false

isHexColor('#FF0000');                // true
isHexColor('#FFF');                   // true
isHexColor('red');                    // false

// Number validation
isInteger(42);                        // true
isInteger(42.5);                      // false

isPositive(5);                        // true
isPositive(-5);                       // false

isNegative(-5);                       // true
isNegative(5);                        // false

isEven(4);                            // true
isEven(5);                            // false

isOdd(5);                             // true
isOdd(4);                             // false

inRange(5, 0, 10);                    // true
inRange(15, 0, 10);                   // false

// Pattern matching
matches('test@example.com', /^[^\s@]+@[^\s@]+\.[^\s@]+$/); // true
```

### Color Utilities

Advanced color manipulation for design systems.

#### Available Functions

```typescript
import {
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToRgb,
  lighten,
  darken,
  saturate,
  desaturate,
  invert,
  complement,
  getLuminance,
  contrastRatio,
  meetsContrastRatio
} from 'alma';
```

#### Examples

```typescript
import {
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToRgb,
  lighten,
  darken,
  saturate,
  desaturate,
  invert,
  complement,
  getLuminance,
  contrastRatio,
  meetsContrastRatio
} from 'alma';

// Color conversion
hexToRgb('#FF0000');
// { r: 255, g: 0, b: 0 }

rgbToHex(255, 0, 0);
// '#FF0000'

hexToHsl('#FF0000');
// { h: 0, s: 100, l: 50 }

hslToRgb(0, 100, 50);
// { r: 255, g: 0, b: 0 }

// Color manipulation
lighten('#FF0000', 20);               // Lighter shade of red
darken('#FF0000', 20);                // Darker shade of red

saturate('#FF0000', 20);              // More saturated
desaturate('#FF0000', 20);            // Less saturated

invert('#FF0000');                    // Inverted color
complement('#FF0000');                // Complementary color

// Accessibility
getLuminance('#FFFFFF');              // 1 (brightest)
getLuminance('#000000');              // 0 (darkest)

contrastRatio('#FFFFFF', '#000000');  // 21 (maximum)
contrastRatio('#FFFFFF', '#CCCCCC');  // ~5

meetsContrastRatio('#FFFFFF', '#000000', 'AA');   // true (WCAG AA)
meetsContrastRatio('#FFFFFF', '#000000', 'AAA');  // true (WCAG AAA)
meetsContrastRatio('#FFF', '#CCC', 'AA');         // false
```

## Framework Integration

### React

```typescript
// components/Button.tsx
import { capitalize, hexToRgb } from 'alma';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  label: string;
  onClick?: () => void;
}

export function Button({ variant, label, onClick }: ButtonProps) {
  const text = capitalize(label);
  const bgColor = variant === 'primary' ? '#007AFF' : '#F2F2F7';
  
  return (
    <button 
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
```

### Vue 3

```typescript
// components/Card.vue
<template>
  <div :class="cardClass">
    <h2>{{ titleText }}</h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { capitalize, lighten, hexToRgb } from 'alma';

interface Props {
  title: string;
  theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  theme: '#007AFF'
});

const titleText = capitalize(props.title);
const lightColor = lighten(props.theme, 30);

const cardClass = {
  card: true,
  themed: !!props.theme
};
</script>
```

### Node.js/Express

```typescript
// middleware/validation.ts
import { isEmail, isURL } from 'alma';

export function validateEmail(email: string): boolean {
  return isEmail(email);
}

export function validateWebsite(url: string): boolean {
  return isURL(url);
}

// Usage in route handlers
app.post('/subscribe', (req, res) => {
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  // Process subscription
});
```

### Next.js

```typescript
// lib/utils.ts
import { slugify, camelCase } from 'alma';

export function createPageSlug(title: string): string {
  return slugify(title);
}

// pages/blog/[slug].tsx
import { createPageSlug } from '@/lib/utils';

export async function getStaticPaths() {
  const posts = await fetchPosts();
  return {
    paths: posts.map(post => ({
      params: { slug: createPageSlug(post.title) }
    }))
  };
}
```

## Common Use Cases

### 1. Form Validation

```typescript
import { isEmail, isURL, matches, inRange } from 'alma';

interface FormData {
  email: string;
  website: string;
  age: number;
  password: string;
}

function validateForm(data: FormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!isEmail(data.email)) {
    errors.push('Invalid email address');
  }

  if (!isURL(data.website)) {
    errors.push('Invalid website URL');
  }

  if (!inRange(data.age, 18, 120)) {
    errors.push('Age must be between 18 and 120');
  }

  if (!matches(data.password, /^(?=.*[A-Z])(?=.*\d).{8,}$/)) {
    errors.push('Password must be 8+ chars with uppercase and number');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
```

### 2. Data Transformation Pipeline

```typescript
import { slugify, camelCase, deepClone, groupBy } from 'alma';

interface Article {
  title: string;
  category: string;
  author: string;
}

function processArticles(articles: Article[]) {
  const cloned = deepClone(articles);
  
  const withSlug = cloned.map(article => ({
    ...article,
    slug: slugify(article.title),
    displayTitle: article.title // Could be processed further
  }));

  const byCategory = groupBy(withSlug, a => a.category);
  
  return byCategory;
}
```

### 3. Theme Generator

```typescript
import {
  lighten,
  darken,
  saturate,
  desaturate,
  complement,
  meetsContrastRatio
} from 'alma';

function generateTheme(primaryColor: string) {
  return {
    primary: primaryColor,
    light: lighten(primaryColor, 30),
    lighter: lighten(primaryColor, 60),
    dark: darken(primaryColor, 20),
    darker: darken(primaryColor, 40),
    complementary: complement(primaryColor),
    muted: desaturate(primaryColor, 40),
    vibrant: saturate(primaryColor, 30)
  };
}

// Validate accessibility
function validateTheme(colors: Record<string, string>) {
  const issues: string[] = [];
  
  if (!meetsContrastRatio(colors.primary, '#FFFFFF', 'AA')) {
    issues.push('Primary color fails WCAG AA contrast with white');
  }
  
  if (!meetsContrastRatio(colors.primary, '#000000', 'AA')) {
    issues.push('Primary color fails WCAG AA contrast with black');
  }
  
  return { valid: issues.length === 0, issues };
}
```

### 4. User Profile Processing

```typescript
import { pick, omit, deepMerge, get, set, capitalize } from 'alma';

interface UserProfile {
  id: string;
  personal: {
    firstName: string;
    lastName: string;
    email: string;
  };
  settings: {
    theme: string;
    notifications: boolean;
  };
  sensitive: {
    password: string;
    twoFactorSecret: string;
  };
}

// Public profile (remove sensitive data)
function getPublicProfile(profile: UserProfile) {
  return omit(profile, ['sensitive']);
}

// Update user settings safely
function updateSettings(profile: UserProfile, updates: Record<string, any>) {
  return deepMerge(profile, { settings: updates });
}

// Get nested value with default
function getUserEmail(profile: UserProfile): string {
  return get(profile, 'personal.email', 'no-email@example.com');
}

// Format display name
function getDisplayName(profile: UserProfile): string {
  const firstName = get(profile, 'personal.firstName', '');
  return capitalize(firstName);
}
```

## API Reference

For comprehensive API documentation, see the [main README](./README.md) and explore the source code at [src/](./src/).

## Troubleshooting

### Issue: Module not found

```
Error: Cannot find module 'alma'
```

**Solution:**
- Ensure you've installed the package: `npm install alma`
- Check that the package is in your `node_modules` directory
- Verify your import path is correct

### Issue: TypeScript errors with imports

```
error TS2307: Cannot find module 'alma' or its corresponding type declarations
```

**Solution:**
- Ensure `dist/index.d.ts` exists (run `npm run build`)
- Check that `types` field in package.json points to `dist/index.d.ts`
- Clear your TypeScript cache: `rm -rf node_modules/.cache`
- Restart your IDE

### Issue: Incorrect color conversion

```typescript
const result = hexToRgb('#FFFFFF');
// Expected: { r: 255, g: 255, b: 255 }
```

**Solution:**
- Ensure hex color uses 6-character format: `#FFFFFF` (not `#FFF`)
- For 3-character format, expand first: `#FFF` → `#FFFFFF`
- Use uppercase letters for consistency

### Issue: String utilities not working as expected

```typescript
slugify('Café');  // Returns 'cafe' without accent
```

**Solution:**
- Alma normalizes accents and special characters to ASCII
- This is intentional for URL-safe slugs
- Use raw strings if you need to preserve accents

### Issue: Deep clone not working for custom classes

```typescript
class CustomClass {}
const instance = new CustomClass();
const clone = deepClone(instance);
// clone is a plain object, not CustomClass instance
```

**Solution:**
- `deepClone` creates plain objects, not class instances
- For class instances, implement custom clone methods
- Consider using structural copying for your use case

### Issue: Performance with large datasets

```typescript
// Grouping 100k items is slow
groupBy(largeArray, item => item.category);
```

**Solution:**
- For very large datasets (100k+), consider using Map directly
- Implement pagination or chunking for batch processing
- Profile with your actual data to identify bottlenecks

### Getting Help

- Check the [examples in README](./README.md#utility-modules)
- Review [test files](./tests/) for usage patterns
- Open an issue on [GitHub](https://github.com/yourusername/alma/issues)
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for support options

---

Happy coding with Alma! 🎨
