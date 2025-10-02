import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookCard from './BookCard';

const renderBookCard = (book) => {
  const setSelectedBook = vi.fn();
  const setOpen = vi.fn();
  const handleSubmit = vi.fn();

  const result = render(
    <MemoryRouter>
      <BookCard book={book} setSelectedBook={setSelectedBook} setOpen={setOpen} handleSubmit={handleSubmit} />
    </MemoryRouter>
  )

  return { result, setSelectedBook, setOpen, handleSubmit }
};

describe('BookCardのテスト', () => {
  const bookMock = {
    Item: {
      title: 'ドキュメント',
      author: '湊かなえ',
      largeImageUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7214/9784041147214_1_3.jpg?_ex=200x200',

    }
  };

  it('表示内容のテスト', () => {
    const { result } = renderBookCard(bookMock);

    expect(result.getByText('ドキュメント')).toBeInTheDocument();
    expect(result.getByText('湊かなえ')).toBeInTheDocument();
    expect(result.getByRole('img', { name: 'ドキュメント' })).toHaveAttribute('src', bookMock.Item.largeImageUrl);
  });

  it('書籍/登録ボタンのテスト', async () => {
    const { result, setSelectedBook, setOpen, handleSubmit } = renderBookCard(bookMock);

    fireEvent.click(result.getByRole('button', { name: new RegExp(bookMock.Item.title) }));
    expect(setSelectedBook).toHaveBeenCalledWith(bookMock);
    expect(setOpen).toHaveBeenCalledWith(true);

    fireEvent.click(result.getByRole('button', { name: '登録' }));
    expect(handleSubmit).toHaveBeenCalledWith(bookMock.Item);
  });

  it('タイトル/著者名が8文字以上', () => {
    const longBookMock = {
      Item: {
        title: 'ドキュメントドキュメント',
        author: '湊かなえ湊かなえ湊かなえ',
        largeImageUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7214/9784041147214_1_3.jpg?_ex=200x200',
      }
    };

    const { result } = renderBookCard(longBookMock);
    expect(result.getByText('ドキュメントドキ...')).toBeInTheDocument();
    expect(result.getByText('湊かなえ湊かなえ...')).toBeInTheDocument();
  });

  it('著者名がない場合のテスト', () => {
    const noAuthorBookMock = {
      Item: {
        title: 'ドキュメント',
        largeImageUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7214/9784041147214_1_3.jpg?_ex=200x200',
      }
    };

    const { result } = renderBookCard(noAuthorBookMock);
    expect(result.getByText('著者不明')).toBeInTheDocument();
  });

});