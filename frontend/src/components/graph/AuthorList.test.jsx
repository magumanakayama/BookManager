import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import AuthorList from './AuthorList';

const bookInfo = [
  { title: 'Title1', author: 'Author1', image: 'img1.jpg' },
  { title: 'Title2', author: 'Author2', image: 'img2.jpg' },
  { title: 'Title3', author: 'Author2', image: 'img3.jpg' },
];
const sortedAuthors = [
  { author: 'Author1', count: 1 },
  { author: 'Author2', count: 2 },
];

describe('AuthorListのテスト', () => {
  it('著者リストが正しく表示される', () => {
    render(<AuthorList bookInfo={bookInfo} sortedAuthors={sortedAuthors} />);
    expect(screen.getByText('Author1')).toBeInTheDocument();
    expect(screen.getByText('1冊')).toBeInTheDocument();
    expect(screen.getByText('Author2')).toBeInTheDocument();
    expect(screen.getByText('2冊')).toBeInTheDocument();
  });

  it('画像が表示される', () => {
    render(<AuthorList bookInfo={bookInfo} sortedAuthors={sortedAuthors} />);
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'img1.jpg');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'img2.jpg');
  });

  it('著者をクリックするとモーダルが開く', async () => {
    const { getByRole, getByText } = render(<AuthorList bookInfo={bookInfo} sortedAuthors={sortedAuthors} />);
    const authorButton = getByText('Author2');
    fireEvent.click(authorButton);
    await waitFor(() => {
      expect(getByRole('presentation')).toBeInTheDocument();
    });
    expect(getByText('Author1')).toBeInTheDocument();
    expect(getByText('Title3')).toBeInTheDocument();
    expect(getByText('2冊')).toBeInTheDocument();
  });
});
