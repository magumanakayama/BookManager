import { describe, it, expect } from 'vitest';
import listFormatterBar from './listFormatterBar';

describe('正常系', () => {
  const sampleBooks = [
    { title: 'Book1', date: '2023-01-10' },
    { title: 'Book2', date: '2023-01-15' },
    { title: 'Book3', date: '2023-02-01' },
    { title: 'Book4', date: '2024-03-05' },
    { title: 'Book5', date: '2024-03-10' },
    { title: 'Book6', date: '2024-12-25' },
    { title: 'Book7', date: '2025-08-25' },
    { title: 'Book8', date: '2003-10-25' },
  ];

  it('totalCountのテスト', () => {
    const { totalCount } = listFormatterBar(sampleBooks);
    expect(totalCount).toBe(8);
  });

  it('yearlyListのテスト', () => {
    const { yearlyList } = listFormatterBar(sampleBooks);
    expect(yearlyList).toEqual([
      { year: 2003, count: 1 },
      { year: 2023, count: 3 },
      { year: 2024, count: 3 },
      { year: 2025, count: 1 },
    ]);
  });

  it('monthlyListByYearZeroPlumのテスト', () => {
    const { monthlyList } = listFormatterBar(sampleBooks);
    // 2023年
    expect(monthlyList.find(y => y.year === 2023).months).toEqual([
      { month: '1', count: 2 },
      { month: '2', count: 1 },
      { month: '3', count: 0 },
      { month: '4', count: 0 },
      { month: '5', count: 0 },
      { month: '6', count: 0 },
      { month: '7', count: 0 },
      { month: '8', count: 0 },
      { month: '9', count: 0 },
      { month: '10', count: 0 },
      { month: '11', count: 0 },
      { month: '12', count: 0 },
    ]);
    // 2024年
    expect(monthlyList.find(y => y.year === 2024).months).toEqual([
      { month: '1', count: 0 },
      { month: '2', count: 0 },
      { month: '3', count: 2 },
      { month: '4', count: 0 },
      { month: '5', count: 0 },
      { month: '6', count: 0 },
      { month: '7', count: 0 },
      { month: '8', count: 0 },
      { month: '9', count: 0 },
      { month: '10', count: 0 },
      { month: '11', count: 0 },
      { month: '12', count: 1 },
    ]);
    // 2025年
    expect(monthlyList.find(y => y.year === 2025).months).toEqual([
      { month: '1', count: 0 },
      { month: '2', count: 0 },
      { month: '3', count: 0 },
      { month: '4', count: 0 },
      { month: '5', count: 0 },
      { month: '6', count: 0 },
      { month: '7', count: 0 },
      { month: '8', count: 1 },
      { month: '9', count: 0 },
      { month: '10', count: 0 },
      { month: '11', count: 0 },
      { month: '12', count: 0 },
    ]);
    // 2003年
    expect(monthlyList.find(y => y.year === 2003).months).toEqual([
      { month: '1', count: 0 },
      { month: '2', count: 0 },
      { month: '3', count: 0 },
      { month: '4', count: 0 },
      { month: '5', count: 0 },
      { month: '6', count: 0 },
      { month: '7', count: 0 },
      { month: '8', count: 0 },
      { month: '9', count: 0 },
      { month: '10', count: 1 },
      { month: '11', count: 0 },
      { month: '12', count: 0 },
    ]);
  });
});

describe('異常系', () => {
  it('空配列のテスト', () => {
    const { totalCount, yearlyList, monthlyList } = listFormatterBar([]);
    expect(totalCount).toBe(0);
    expect(yearlyList).toEqual([]);
    expect(monthlyList).toEqual([]);
  });

  // it('日付なしデータのテスト', () => {
  //   const sampleBooks = [
  //     { title: 'Book1' },
  //     { title: 'Book2', date: '' },
  //     { title: 'Book3', date: null },
  //   ];
  //   const { totalCount, yearlyList, monthlyList } = listFormatterBar(sampleBooks);
  //   expect(totalCount).toBe(3);
  //   expect(yearlyList).toEqual([]);
  //   expect(monthlyList).toEqual([]);
  // });

});