import { describe, it, expect } from 'vitest';
import {
  slugify,
  camelCase,
  pascalCase,
  snakeCase,
  capitalize,
  reverse,
  isPalindrome,
  truncate,
  repeat,
  padCenter,
  count,
} from '../src/string';

describe('String Utilities', () => {
  describe('slugify', () => {
    it('converts to lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
    });

    it('handles multiple spaces', () => {
      expect(slugify('Hello   World')).toBe('hello-world');
    });

    it('handles multiple hyphens', () => {
      expect(slugify('hello--world')).toBe('hello-world');
    });

    it('trims whitespace', () => {
      expect(slugify('  hello world  ')).toBe('hello-world');
    });
  });

  describe('camelCase', () => {
    it('converts hyphenated strings', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
    });

    it('converts snake_case', () => {
      expect(camelCase('hello_world')).toBe('helloWorld');
    });

    it('converts space-separated', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
    });

    it('starts with lowercase', () => {
      expect(camelCase('Hello World')).toBe('helloWorld');
    });
  });

  describe('pascalCase', () => {
    it('converts hyphenated strings', () => {
      expect(pascalCase('hello-world')).toBe('HelloWorld');
    });

    it('converts snake_case', () => {
      expect(pascalCase('hello_world')).toBe('HelloWorld');
    });

    it('starts with uppercase', () => {
      expect(pascalCase('hello world')).toBe('HelloWorld');
    });
  });

  describe('snakeCase', () => {
    it('converts camelCase', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
    });

    it('converts space-separated', () => {
      expect(snakeCase('hello world')).toBe('hello_world');
    });

    it('converts hyphenated', () => {
      expect(snakeCase('hello-world')).toBe('hello_world');
    });

    it('handles mixed cases', () => {
      expect(snakeCase('HelloWorld')).toBe('hello_world');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('handles empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
  });

  describe('reverse', () => {
    it('reverses a string', () => {
      expect(reverse('hello')).toBe('olleh');
    });

    it('handles empty strings', () => {
      expect(reverse('')).toBe('');
    });

    it('handles single character', () => {
      expect(reverse('a')).toBe('a');
    });
  });

  describe('isPalindrome', () => {
    it('detects palindromes', () => {
      expect(isPalindrome('racecar')).toBe(true);
    });

    it('handles case-insensitive palindromes', () => {
      expect(isPalindrome('RaceCar')).toBe(true);
    });

    it('ignores special characters', () => {
      expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    });

    it('rejects non-palindromes', () => {
      expect(isPalindrome('hello')).toBe(false);
    });
  });

  describe('truncate', () => {
    it('truncates long strings', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });

    it('uses custom suffix', () => {
      expect(truncate('Hello World', 8, '→')).toBe('Hello W→');
    });

    it('returns full string if shorter than length', () => {
      expect(truncate('Hi', 8)).toBe('Hi');
    });
  });

  describe('repeat', () => {
    it('repeats strings', () => {
      expect(repeat('ha', 3)).toBe('hahaha');
    });

    it('handles zero repetitions', () => {
      expect(repeat('ha', 0)).toBe('');
    });

    it('throws on negative count', () => {
      expect(() => repeat('ha', -1)).toThrow();
    });
  });

  describe('padCenter', () => {
    it('centers strings with spaces', () => {
      expect(padCenter('hello', 11)).toBe('   hello   ');
    });

    it('uses custom pad character', () => {
      expect(padCenter('hello', 11, '*')).toBe('***hello***');
    });

    it('returns original if no padding needed', () => {
      expect(padCenter('hello', 5)).toBe('hello');
    });
  });

  describe('count', () => {
    it('counts occurrences', () => {
      expect(count('hello hello', 'hello')).toBe(2);
    });

    it('case-sensitive by default', () => {
      expect(count('Hello hello', 'hello')).toBe(1);
    });

    it('case-insensitive when specified', () => {
      expect(count('Hello hello', 'hello', false)).toBe(2);
    });

    it('returns 0 for empty substring', () => {
      expect(count('hello', '')).toBe(0);
    });
  });
});
