import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MonthlyList from './MonthlyList';

const thisYearMonthlyList = [
  { month: 1, count: 5 },
  { month: 2, count: 4 },
  { month: 3, count: 5 },
  { month: 4, count: 6 },
  { month: 5, count: 8 },
  { month: 6, count: 10 },
  { month: 7, count: 7 },
  { month: 8, count: 6 },
  { month: 9, count: 5 },
  { month: 10, count: 4 },
  { month: 11, count: 3 },
  { month: 12, count: 4 },
];

const checkScreenText = ([totalCount, annualCount, currentMonthCount]) => {
  expect(screen.getByText('累計')).toBeInTheDocument();
  expect(screen.getByTestId(`totalCount`)).toHaveTextContent(`${totalCount}冊`);
  expect(screen.getByText('今年')).toBeInTheDocument();
  expect(screen.getByTestId(`annualCount`)).toHaveTextContent(`${annualCount}冊`);
  expect(screen.getByText('今月')).toBeInTheDocument();
  expect(screen.getByTestId(`currentMonthCount`)).toHaveTextContent(`${currentMonthCount}冊`);
}

describe('MonthlyListのテスト', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-15'));
  });

  afterEach(() => vi.useRealTimers());

  const totalCount = 120; // 任意の累計値
  const annualCount = 67; // 今年の合計値
  const currentMonthCount = thisYearMonthlyList[2].count; // 3月の値

  it('月別リストが正しく表示される', () => {
    render(<MonthlyList totalCount={totalCount} thisYearMonthlyList={thisYearMonthlyList} />);
    checkScreenText([totalCount, annualCount, currentMonthCount]);
  });

  it('thisYearMonthlyListが空リストの場合', () => {
    render(<MonthlyList totalCount={totalCount} thisYearMonthlyList={[]} />);
    checkScreenText([totalCount, 0, 0]);
  });

  it('thisYearMonthlyListがnullの場合、何も表示しない', () => {
    const { container } = render(<MonthlyList totalCount={totalCount} thisYearMonthlyList={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});