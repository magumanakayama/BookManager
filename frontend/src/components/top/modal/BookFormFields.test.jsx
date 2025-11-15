import { describe, it, expect } from 'vitest';
import { parseDate } from './BookFormFields';

const trulyMethod = ({ t, description }) => {
  const [dateStr, y, m, d] = t;
  const dateObj = parseDate(dateStr);
  expect(dateObj.getFullYear()).toBe(y);
  expect(dateObj.getMonth()).toBe(m - 1);
  expect(dateObj.getDate()).toBe(d);
  console.log(`OK：${description}`);
};

const falsyMethod = ({ t, description }) => {
  const [dateStr, e] = t;
  expect(parseDate(dateStr)).toBe(e)
  console.log(`OK：${description}`);
};

describe('parseDate関数のテスト', () => {
  it('正常系：Date型に変換', () => {
    const cases = [
      { t: ['2025/11/15', 2025, 11, 15], description: '通常の日付' },
      { t: ['2020/02/29', 2020, 2, 29], description: '閏年' },
      { t: ['2000/01/01', 2000, 1, 1], description: '2000年の始まり' },
      { t: ['1999/12/31', 1999, 12, 31], description: '1999年の終わり' },
    ];
    cases.forEach(trulyMethod);
  });

  it('異常系：異常値の場合はnullを返す', () => {
    const cases = [
      { t: [null, null], description: 'null' },
      { t: [undefined, null], description: 'undefined' },
      { t: ['', null], description: '空文字列' },
      { t: ['ABC', null], description: '不正な文字列' },
      { t: ['2025/11', null], description: '日付が欠けている' },
      { t: ['2025//15', null], description: '月が欠けている' },
    ];
    cases.forEach(falsyMethod);
  });
});