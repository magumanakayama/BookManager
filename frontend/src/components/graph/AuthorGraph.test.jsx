import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// PieChart をモックして渡された props を検証しやすくする
vi.mock('@mui/x-charts', () => {
  return {
    PieChart: (props) =>
      createElement('div', {
        'data-testid': 'mock-pie',
        'data-props': JSON.stringify(props),
      }),
  };
});

import AuthorGraph from './AuthorGraph';

describe('AuthorGraph', () => {
  it('正常系', () => {
    const legendData = [
      { author: 'A', count: 2 },
      { author: 'B', count: 5 },
    ];

    render(<AuthorGraph legendData={legendData} />);

    const el = screen.getByTestId('mock-pie');
    const props = JSON.parse(el.getAttribute('data-props'));

    expect(props.series[0].data).toEqual([
      { id: 0, value: 2, label: 'A' },
      { id: 1, value: 5, label: 'B' },
    ]);
  });

  it('空リスト', () => {
    const legendData = [];

    render(<AuthorGraph legendData={legendData} />);

    const el = screen.getByTestId('mock-pie');
    const props = JSON.parse(el.getAttribute('data-props'));

    expect(props.series[0].data).toEqual([]);
  });
});