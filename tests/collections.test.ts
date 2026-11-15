import { describe, it, expect } from 'vitest';
import {
  flatten,
  deepClone,
  merge,
  deepMerge,
  groupBy,
  unique,
  pick,
  omit,
  isEmptyObject,
  get,
  sortBy,
} from '../src/collections';

describe('Collection Utilities', () => {
  describe('flatten', () => {
    it('flattens nested arrays', () => {
      expect(flatten([1, [2, 3, [4, 5]]])).toEqual([1, 2, 3, 4, 5]);
    });

    it('flattens to specific depth', () => {
      expect(flatten([1, [2, 3, [4, 5]]], 1)).toEqual([1, 2, 3, [4, 5]]);
    });

    it('handles empty arrays', () => {
      expect(flatten([])).toEqual([]);
    });

    it('handles deeply nested arrays', () => {
      expect(flatten([1, [2, [3, [4, [5]]]]], 2)).toEqual([1, 2, 3, [4, [5]]]);
    });
  });

  describe('deepClone', () => {
    it('clones objects deeply', () => {
      const original = { a: { b: { c: 1 } } };
      const cloned = deepClone(original);
      cloned.a.b.c = 2;
      expect(original.a.b.c).toBe(1);
    });

    it('clones arrays deeply', () => {
      const original = [1, [2, [3, 4]]];
      const cloned = deepClone(original);
      (cloned[1] as (number | number[])[])[0] = 99;
      expect(original[1]).toEqual([2, [3, 4]]);
    });

    it('clones Dates', () => {
      const date = new Date('2024-01-01');
      const cloned = deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    it('handles primitives', () => {
      expect(deepClone(5)).toBe(5);
      expect(deepClone('hello')).toBe('hello');
    });

    it('handles null', () => {
      expect(deepClone(null)).toBe(null);
    });
  });

  describe('merge', () => {
    it('merges multiple objects', () => {
      expect(merge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('later objects override earlier ones', () => {
      expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });

    it('handles empty objects', () => {
      expect(merge({}, { a: 1 })).toEqual({ a: 1 });
    });
  });

  describe('deepMerge', () => {
    it('merges nested objects', () => {
      expect(deepMerge({ a: { b: 1 } }, { a: { c: 2 } })).toEqual({
        a: { b: 1, c: 2 },
      });
    });

    it('overwrites primitives', () => {
      expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });

    it('handles arrays as values', () => {
      const result = deepMerge({ a: [1, 2] }, { a: [3, 4] });
      expect(result.a).toEqual([3, 4]);
    });
  });

  describe('groupBy', () => {
    it('groups array elements', () => {
      const items = [
        { id: 1, type: 'A' },
        { id: 2, type: 'B' },
        { id: 3, type: 'A' },
      ];
      const grouped = groupBy(items, (item) => item.type);
      expect(grouped.A).toHaveLength(2);
      expect(grouped.B).toHaveLength(1);
    });

    it('supports numeric keys', () => {
      const items = [10, 20, 15, 25];
      const grouped = groupBy(items, (item) => (item > 15 ? 'high' : 'low'));
      expect(grouped.low).toEqual([10, 15]);
      expect(grouped.high).toEqual([20, 25]);
    });
  });

  describe('unique', () => {
    it('removes duplicates from primitives', () => {
      expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });

    it('removes duplicates by key function', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 1 }];
      const result = unique(items, (x) => (x as Record<string, number>).id);
      expect(result).toHaveLength(2);
    });

    it('preserves order', () => {
      expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    });
  });

  describe('pick', () => {
    it('picks specified keys', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('ignores missing keys', () => {
      expect(pick({ a: 1, b: 2 }, ['a', 'c'])).toEqual({ a: 1 });
    });
  });

  describe('omit', () => {
    it('omits specified keys', () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('returns new object without omitted keys', () => {
      const original = { a: 1, b: 2, c: 3 };
      const result = omit(original, ['b']);
      expect(result).toEqual({ a: 1, c: 3 });
      expect(original).toEqual({ a: 1, b: 2, c: 3 });
    });
  });

  describe('isEmpty', () => {
    it('detects empty objects', () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it('detects non-empty objects', () => {
      expect(isEmptyObject({ a: 1 })).toBe(false);
    });
  });

  describe('get', () => {
    it('gets nested values by path', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(get(obj, 'a.b.c')).toBe(42);
    });

    it('returns default value if path not found', () => {
      const obj = { a: { b: 1 } };
      expect(get(obj, 'a.c', 'default')).toBe('default');
    });

    it('handles undefined values', () => {
      const obj = { a: { b: undefined } };
      expect(get(obj, 'a.b', 'default')).toBe('default');
    });
  });

  describe('sortBy', () => {
    it('sorts array by key', () => {
      const items = [{ id: 3 }, { id: 1 }, { id: 2 }];
      const result = sortBy(items, 'id');
      expect(result.map((x: Record<string, number>) => x.id)).toEqual([1, 2, 3]);
    });

    it('sorts in descending order', () => {
      const items = [{ id: 3 }, { id: 1 }, { id: 2 }];
      const result = sortBy(items, 'id', 'desc');
      expect(result.map((x: Record<string, number>) => x.id)).toEqual([3, 2, 1]);
    });

    it('sorts by function', () => {
      const items = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
      const result = sortBy(items, (x) => (x as Record<string, string>).name);
      expect(result.map((x: Record<string, string>) => x.name)).toEqual([
        'Alice',
        'Bob',
        'Charlie',
      ]);
    });

    it('does not mutate original array', () => {
      const items = [{ id: 3 }, { id: 1 }];
      const original = JSON.stringify(items);
      sortBy(items, 'id');
      expect(JSON.stringify(items)).toBe(original);
    });
  });
});
