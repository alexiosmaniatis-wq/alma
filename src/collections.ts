/**
 * Array and Object manipulation utilities
 * Provides common array and object transformation functions
 * @module collections
 */

/**
 * Flattens a nested array to a specified depth
 * @param arr - The array to flatten
 * @param depth - Depth to flatten (default: Infinity)
 * @returns The flattened array
 * @example
 * ```ts
 * flatten([1, [2, 3, [4, 5]]]) // [1, 2, 3, 4, 5]
 * flatten([1, [2, 3, [4, 5]]], 1) // [1, 2, 3, [4, 5]]
 * ```
 */
export function flatten<T>(arr: unknown[], depth: number = Infinity): T[] {
  let result: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result = result.concat(flatten<T>(item, depth - 1));
    } else {
      result.push(item as T);
    }
  }
  return result;
}

/**
 * Creates a deep clone of an object or array
 * @param obj - The object to clone
 * @returns A deep clone of the object
 * @example
 * ```ts
 * const original = { a: { b: { c: 1 } } };
 * const cloned = deepClone(original);
 * cloned.a.b.c = 2;
 * console.log(original.a.b.c) // 1
 * ```
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) {
    const cloned: unknown[] = [];
    for (let i = 0; i < obj.length; i++) {
      cloned[i] = deepClone(obj[i]);
    }
    return cloned as T;
  }
  if (obj instanceof Object) {
    const cloned: Record<string, unknown> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone((obj as Record<string, unknown>)[key]);
      }
    }
    return cloned as T;
  }
  return obj;
}

/**
 * Merges multiple objects together, with later objects overwriting earlier ones
 * @param objects - Objects to merge
 * @returns The merged object
 * @example
 * ```ts
 * merge({ a: 1 }, { b: 2 }, { a: 3 }) // { a: 3, b: 2 }
 * ```
 */
export function merge<T extends Record<string, unknown>>(...objects: Array<Partial<T>>): T {
  const result: Record<string, unknown> = {};
  for (const obj of objects) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = obj[key];
      }
    }
  }
  return result as T;
}

/**
 * Performs a deep merge of objects, combining nested objects
 * @param objects - Objects to merge
 * @returns The deeply merged object
 * @example
 * ```ts
 * deepMerge({ a: { b: 1 } }, { a: { c: 2 } })
 * // { a: { b: 1, c: 2 } }
 * ```
 */
export function deepMerge<T extends Record<string, unknown>>(...objects: Array<Partial<T>>): T {
  const result: Record<string, unknown> = {};
  for (const obj of objects) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (
          value !== null &&
          typeof value === 'object' &&
          !Array.isArray(value) &&
          !(value instanceof Date)
        ) {
          result[key] =
            typeof result[key] === 'object' && result[key] !== null && !Array.isArray(result[key])
              ? deepMerge(result[key] as Record<string, unknown>, value as Record<string, unknown>)
              : deepClone(value);
        } else {
          result[key] = value;
        }
      }
    }
  }
  return result as T;
}

/**
 * Groups array elements by a key function
 * @param arr - The array to group
 * @param keyFn - Function that returns the grouping key
 * @returns Object with grouped elements
 * @example
 * ```ts
 * const users = [
 *   { name: 'Alice', age: 30 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 25 }
 * ];
 * groupBy(users, u => u.age)
 * // { '30': [{ name: 'Alice', age: 30 }, ...], '25': [...] }
 * ```
 */
export function groupBy<T, K extends string | number | symbol>(
  arr: T[],
  keyFn: (value: T) => K
): Record<K, T[]> {
  const result: Record<K, T[]> = {} as Record<K, T[]>;
  for (let i = 0; i < arr.length; i++) {
    const key = keyFn(arr[i]);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(arr[i]);
  }
  return result;
}

/**
 * Removes duplicate elements from an array
 * @param arr - The array to deduplicate
 * @param keyFn - Optional function to determine uniqueness
 * @returns Array with duplicates removed
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 1, 4]) // [1, 2, 3, 4]
 * unique([{ id: 1 }, { id: 2 }, { id: 1 }], x => x.id)
 * // [{ id: 1 }, { id: 2 }]
 * ```
 */
export function unique<T>(arr: T[], keyFn?: (value: T) => unknown): T[] {
  if (!keyFn) {
    return Array.from(new Set(arr));
  }
  const seen = new Set<unknown>();
  const result: T[] = [];
  for (const item of arr) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

/**
 * Picks specified keys from an object
 * @param obj - The object to pick from
 * @param keys - Keys to pick
 * @returns Object with only the picked keys
 * @example
 * ```ts
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 * ```
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result: Partial<Pick<T, K>> = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result as Pick<T, K>;
}

/**
 * Omits specified keys from an object
 * @param obj - The object to omit from
 * @param keys - Keys to omit
 * @returns Object without the omitted keys
 * @example
 * ```ts
 * omit({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
 * ```
 */
export function omit<T extends Record<string, unknown>>(obj: T, keys: (keyof T)[]): Partial<T> {
  const result: Partial<T> = {};
  const keysSet = new Set(keys);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keysSet.has(key as keyof T)) {
      result[key as keyof T] = obj[key];
    }
  }
  return result;
}

/**
 * Checks if an object is empty (no own properties)
 * @param obj - The object to check
 * @returns Whether the object is empty
 * @example
 * ```ts
 * isEmptyObject({}) // true
 * isEmptyObject({ a: 1 }) // false
 * ```
 */
export function isEmptyObject(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Gets a value from a nested object using dot notation
 * @param obj - The object to get from
 * @param path - Dot-separated path (e.g., 'a.b.c')
 * @param defaultValue - Default value if path doesn't exist
 * @returns The value at the path, or defaultValue
 * @example
 * ```ts
 * const obj = { a: { b: { c: 42 } } };
 * get(obj, 'a.b.c') // 42
 * get(obj, 'a.b.d', 0) // 0
 * ```
 */
export function get<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return defaultValue;
    }
  }
  if (current === undefined) {
    return defaultValue;
  }
  return current as T;
}

/**
 * Sorts an array of objects by a specified key or function
 * @param arr - The array to sort
 * @param keyOrFn - Key name or function to sort by
 * @param order - Sort order: 'asc' or 'desc' (default: 'asc')
 * @returns Sorted array (new array, original unchanged)
 * @example
 * ```ts
 * const items = [{ id: 3 }, { id: 1 }, { id: 2 }];
 * sortBy(items, 'id') // [{ id: 1 }, { id: 2 }, { id: 3 }]
 * sortBy(items, 'id', 'desc') // [{ id: 3 }, { id: 2 }, { id: 1 }]
 * ```
 */
export function sortBy<T>(
  arr: T[],
  keyOrFn: keyof T | ((value: T) => unknown),
  order: 'asc' | 'desc' = 'asc'
): T[] {
  const sorted = [...arr].sort((a, b) => {
    let aVal: unknown;
    let bVal: unknown;

    if (typeof keyOrFn === 'function') {
      aVal = keyOrFn(a);
      bVal = keyOrFn(b);
    } else {
      aVal = a[keyOrFn];
      bVal = b[keyOrFn];
    }

    if (aVal === null || aVal === undefined) return order === 'asc' ? 1 : -1;
    if (bVal === null || bVal === undefined) return order === 'asc' ? -1 : 1;

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}
