import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { useState } from 'react';
import YearSelect, { ERROR_MESSAGE } from './YearSelect';

const selectClick = (yearList) => {
  yearList.forEach((year) => {
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText(year));
    expect(screen.getByRole('combobox')).toHaveTextContent(year);
  });
};

describe('YearSelectのテスト', () => {
  const yearlyList = [
    { year: 2021, count: 5 },
    { year: 2022, count: 18 },
    { year: 2023, count: 12 },
  ];
  const Wrapper = ({ initialYear = 2022 }) => {
    const [year, setYear] = useState(initialYear);
    return <YearSelect yearlyList={yearlyList} year={year} setYear={setYear} />;
  };

  it('年リストが正しく表示される', () => {
    render(<Wrapper />);
    fireEvent.mouseDown(screen.getByRole('combobox', { name: '年' }));
    expect(screen.getByRole('option', { name: '2021' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '2022' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '2023' })).toBeInTheDocument();
  });

  it('年を選択するとステートが更新される', () => {
    render(<Wrapper />);
    selectClick([2021, 2022, 2023]);
  });

  it('リストに無い年が初期値', () => {
    render(<Wrapper initialYear={2025} />);
    expect(screen.getByRole('combobox', { name: '年' })).not.toHaveTextContent('2025');

    selectClick([2021]);
    expect(screen.getByRole('combobox', { name: '年' })).not.toHaveTextContent('2025');
  });

  it('yearlyList が undefined でもクラッシュしない', () => {
    render(<YearSelect yearlyList={undefined} year={2022} setYear={() => { }} />);
    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
  });
});