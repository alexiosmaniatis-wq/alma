/**
 * Type guards and validation utilities
 * Provides type checking and validation functions
 * @module validation
 */

/**
 * Checks if a value is a string
 * @param value - The value to check
 * @returns Whether the value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks if a value is a number
 * @param value - The value to check
 * @returns Whether the value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Checks if a value is an integer
 * @param value - The value to check
 * @returns Whether the value is an integer
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}

/**
 * Checks if a value is a boolean
 * @param value - The value to check
 * @returns Whether the value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Checks if a value is null
 * @param value - The value to check
 * @returns Whether the value is null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if a value is undefined
 * @param value - The value to check
 * @returns Whether the value is undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if a value is null or undefined
 * @param value - The value to check
 * @returns Whether the value is null or undefined
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Checks if a value is an array
 * @param value - The value to check
 * @returns Whether the value is an array
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a plain object (not array, Date, etc.)
 * @param value - The value to check
 * @returns Whether the value is a plain object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp)
  );
}

/**
 * Checks if a value is a Date object
 * @param value - The value to check
 * @returns Whether the value is a Date
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

/**
 * Checks if a value is a RegExp object
 * @param value - The value to check
 * @returns Whether the value is a RegExp
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

/**
 * Checks if a value is a function
 * @param value - The value to check
 * @returns Whether the value is a function
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * Checks if a string is a valid email address
 * @param email - The email to check
 * @returns Whether the email is valid
 * @example
 * ```ts
 * isEmail('test@example.com') // true
 * isEmail('invalid.email') // false
 * ```
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if a string is a valid URL
 * @param url - The URL to check
 * @returns Whether the URL is valid
 * @example
 * ```ts
 * isURL('https://example.com') // true
 * isURL('not-a-url') // false
 * ```
 */
export function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a string is a valid hex color
 * @param color - The color to check
 * @returns Whether the color is a valid hex color
 * @example
 * ```ts
 * isHexColor('#FF0000') // true
 * isHexColor('FF0000') // true
 * isHexColor('red') // false
 * ```
 */
export function isHexColor(color: string): boolean {
  const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

/**
 * Checks if a string matches a given pattern
 * @param str - The string to check
 * @param pattern - The pattern to match (can be regex or string)
 * @returns Whether the string matches the pattern
 * @example
 * ```ts
 * matches('hello123', /[0-9]+/) // true
 * matches('hello world', 'world') // true
 * ```
 */
export function matches(str: string, pattern: RegExp | string): boolean {
  if (pattern instanceof RegExp) {
    return pattern.test(str);
  }
  return str.includes(pattern);
}

/**
 * Validates that a value is within a range
 * @param value - The value to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Whether the value is within range
 * @example
 * ```ts
 * inRange(5, 0, 10) // true
 * inRange(15, 0, 10) // false
 * ```
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Checks if an object has a specific key
 * @param obj - The object to check
 * @param key - The key to check for
 * @returns Whether the object has the key
 * @example
 * ```ts
 * hasKey({ a: 1 }, 'a') // true
 * hasKey({ a: 1 }, 'b') // false
 * ```
 */
export function hasKey<T extends Record<string, unknown>>(
  obj: T,
  key: string | number | symbol
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Checks if a string is empty or contains only whitespace
 * @param str - The string to check
 * @returns Whether the string is empty or whitespace-only
 * @example
 * ```ts
 * isEmpty('') // true
 * isEmpty('   ') // true
 * isEmpty('hello') // false
 * ```
 */
export function isEmpty(str: string): boolean {
  return str.trim().length === 0;
}

/**
 * Checks if a value is a positive number
 * @param value - The value to check
 * @returns Whether the value is positive
 */
export function isPositive(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

/**
 * Checks if a value is a negative number
 * @param value - The value to check
 * @returns Whether the value is negative
 */
export function isNegative(value: unknown): value is number {
  return isNumber(value) && value < 0;
}

/**
 * Checks if a value is even
 * @param value - The value to check
 * @returns Whether the value is even
 */
export function isEven(value: unknown): value is number {
  return isInteger(value) && (value as number) % 2 === 0;
}

/**
 * Checks if a value is odd
 * @param value - The value to check
 * @returns Whether the value is odd
 */
export function isOdd(value: unknown): value is number {
  return isInteger(value) && (value as number) % 2 !== 0;
}
