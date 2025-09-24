import { describe, it, expect } from 'vitest';
import listFormatterPie from './listFormatterPie';

describe('正常系', () => {
  const sampleBooks = [
    { title: 'Book1', author: 'Author1', date: '2023-01-10' },
    { title: 'Book2', author: 'Author2 ', date: '2023-01-15' },
    { title: 'Book3', author: ' Author3', date: '2023-02-01' },
    { title: 'Book4', author: 'Author4', date: '2024-04-23' },
    { title: 'Book5', author: 'Author5', date: '2025-05-09' },
    { title: 'Book6', author: 'Author6', date: '2025-06-02' },
    { title: 'Book7', author: 'Author1', date: '2003-10-11' },
  ];

  it('authorFormattedBookListのテスト', () => {
    const { authorFormattedBookList } = listFormatterPie(sampleBooks);
    expect(authorFormattedBookList).toEqual([
      { title: 'Book1', author: 'Author1', date: '2023-01-10' },
      { title: 'Book2', author: 'Author2', date: '2023-01-15' },
      { title: 'Book3', author: 'Author3', date: '2023-02-01' },
      { title: 'Book4', author: 'Author4', date: '2024-04-23' },
      { title: 'Book5', author: 'Author5', date: '2025-05-09' },
      { title: 'Book6', author: 'Author6', date: '2025-06-02' },
      { title: 'Book7', author: 'Author1', date: '2003-10-11' },
    ]);
  });

  it('sortedAuthorsのテスト', () => {
    const { sortedAuthors } = listFormatterPie(sampleBooks);
    expect(sortedAuthors).toEqual([
      { author: 'Author1', count: 2 },
      { author: 'Author2', count: 1 },
      { author: 'Author3', count: 1 },
      { author: 'Author4', count: 1 },
      { author: 'Author5', count: 1 },
      { author: 'Author6', count: 1 },
    ]);
  });

  it('legendDataのテスト', () => {
    const { legendData } = listFormatterPie(sampleBooks, 4);
    expect(legendData).toEqual([
      { author: 'Author1', count: 2 },
      { author: 'Author2', count: 1 },
      { author: 'Author3', count: 1 },
      { author: 'Author4', count: 1 },
      { author: 'その他', count: 2 },
    ]);
  });

});

describe('異常系', () => {
  it('空配列のテスト', () => {
    const { authorFormattedBookList, sortedAuthors, legendData } = listFormatterPie([]);
    expect(authorFormattedBookList).toEqual([]);
    expect(sortedAuthors).toEqual([]);
    expect(legendData).toEqual([]);
  });

  it('著者が全て同じ場合のテスト', () => {
    const sampleBooks = [
      { title: 'Book1', author: 'Author1', date: '2023-01-10' },
      { title: 'Book2', author: 'Author1 ', date: '2023-01-15' },
      { title: 'Book3', author: ' Author1', date: '2023-02-01' },
    ];
    const { authorFormattedBookList, sortedAuthors, legendData } = listFormatterPie(sampleBooks, 5);
    expect(authorFormattedBookList).toEqual([
      { title: 'Book1', author: 'Author1', date: '2023-01-10' },
      { title: 'Book2', author: 'Author1', date: '2023-01-15' },
      { title: 'Book3', author: 'Author1', date: '2023-02-01' },
    ]);
    expect(sortedAuthors).toEqual([{ author: 'Author1', count: 3 }]);
    expect(legendData).toEqual([{ author: 'Author1', count: 3 }]);
  });
});