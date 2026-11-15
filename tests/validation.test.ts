import { describe, it, expect } from 'vitest';
import {
  isString,
  isNumber,
  isInteger,
  isBoolean,
  isNull,
  isUndefined,
  isNullish,
  isArray,
  isObject,
  isDate,
  isRegExp,
  isFunction,
  isEmail,
  isURL,
  isHexColor,
  matches,
  inRange,
  hasKey,
  isEmpty,
  isPositive,
  isNegative,
  isEven,
  isOdd,
} from '../src/validation';

describe('Validation Utilities', () => {
  describe('Type Guards', () => {
    it('isString', () => {
      expect(isString('hello')).toBe(true);
      expect(isString(123)).toBe(false);
    });

    it('isNumber', () => {
      expect(isNumber(42)).toBe(true);
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber('42')).toBe(false);
    });

    it('isInteger', () => {
      expect(isInteger(42)).toBe(true);
      expect(isInteger(42.5)).toBe(false);
      expect(isInteger('42')).toBe(false);
    });

    it('isBoolean', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(1)).toBe(false);
    });

    it('isNull', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(undefined)).toBe(false);
    });

    it('isUndefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(null)).toBe(false);
    });

    it('isNullish', () => {
      expect(isNullish(null)).toBe(true);
      expect(isNullish(undefined)).toBe(true);
      expect(isNullish(0)).toBe(false);
    });

    it('isArray', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray({})).toBe(false);
    });

    it('isObject', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
      expect(isObject([])).toBe(false);
      expect(isObject(new Date())).toBe(false);
    });

    it('isDate', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate('2024-01-01')).toBe(false);
    });

    it('isRegExp', () => {
      expect(isRegExp(/test/)).toBe(true);
      expect(isRegExp('test')).toBe(false);
    });

    it('isFunction', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction('function')).toBe(false);
    });
  });

  describe('String Validation', () => {
    it('isEmail', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user.name@company.co.uk')).toBe(true);
      expect(isEmail('invalid')).toBe(false);
      expect(isEmail('invalid@')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
    });

    it('isURL', () => {
      expect(isURL('https://example.com')).toBe(true);
      expect(isURL('http://example.com/path')).toBe(true);
      expect(isURL('ftp://files.example.com')).toBe(true);
      expect(isURL('not-a-url')).toBe(false);
      expect(isURL('example.com')).toBe(false);
    });

    it('isHexColor', () => {
      expect(isHexColor('#FF0000')).toBe(true);
      expect(isHexColor('FF0000')).toBe(true);
      expect(isHexColor('#F00')).toBe(true);
      expect(isHexColor('F00')).toBe(true);
      expect(isHexColor('red')).toBe(false);
      expect(isHexColor('12345')).toBe(false);
    });

    it('isEmpty (string)', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty('hello')).toBe(false);
    });
  });

  describe('Pattern Matching', () => {
    it('matches with regex', () => {
      expect(matches('hello123', /[0-9]+/)).toBe(true);
      expect(matches('hello', /[0-9]+/)).toBe(false);
    });

    it('matches with string', () => {
      expect(matches('hello world', 'world')).toBe(true);
      expect(matches('hello', 'world')).toBe(false);
    });
  });

  describe('Range Validation', () => {
    it('inRange', () => {
      expect(inRange(5, 0, 10)).toBe(true);
      expect(inRange(0, 0, 10)).toBe(true);
      expect(inRange(10, 0, 10)).toBe(true);
      expect(inRange(15, 0, 10)).toBe(false);
      expect(inRange(-5, 0, 10)).toBe(false);
    });
  });

  describe('Object Validation', () => {
    it('hasKey', () => {
      const obj = { a: 1, b: 2 };
      expect(hasKey(obj, 'a')).toBe(true);
      expect(hasKey(obj, 'c')).toBe(false);
    });
  });

  describe('Number Validation', () => {
    it('isPositive', () => {
      expect(isPositive(5)).toBe(true);
      expect(isPositive(0)).toBe(false);
      expect(isPositive(-5)).toBe(false);
    });

    it('isNegative', () => {
      expect(isNegative(-5)).toBe(true);
      expect(isNegative(0)).toBe(false);
      expect(isNegative(5)).toBe(false);
    });

    it('isEven', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(4)).toBe(true);
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
    });

    it('isOdd', () => {
      expect(isOdd(1)).toBe(true);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(2)).toBe(false);
      expect(isOdd(4)).toBe(false);
    });
  });
});
