import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import BookModal from './BookModal';
import { render, screen, waitFor, } from '@testing-library/react';

const renderModal = (open, inputBooks) => {
  const setOpen = vi.fn();
  const handleSubmit = vi.fn();
  const setInputBooks = vi.fn();

  const result = render(
    <BookModal
      open={open}
      setOpen={setOpen}
      inputBooks={inputBooks}
      handleSubmit={handleSubmit}
      setInputBooks={setInputBooks}
    />
  );

  return { result, setOpen, handleSubmit };
};


describe('BookModal Component', () => {
  it('モーダルが閉じているときは入力欄が表示されない', () => {
    const inputBooks = { title: '', author: '', date: '' };
    const { result } = renderModal(false, inputBooks);

    expect(result.queryByLabelText('タイトル')).not.toBeInTheDocument();
    expect(result.queryByLabelText('著者')).not.toBeInTheDocument();
    expect(result.queryByLabelText('読了日入力欄')).not.toBeInTheDocument();
  });

  it('モーダルのレンダリングテスト', () => {
    const inputBooks = { title: '', author: '', date: '' };
    const { result } = renderModal(true, inputBooks);

    expect(result.getByRole('textbox', { name: 'タイトル' })).toBeInTheDocument();
    expect(result.getByRole('textbox', { name: '著者' })).toBeInTheDocument();
    expect(result.getByLabelText('読了日入力欄')).toBeInTheDocument();
    expect(result.getByRole('button', { name: 'デバックプリセット' })).toBeInTheDocument();
    expect(result.getByRole('button', { name: '登録' })).toBeInTheDocument();
  });

  it('初期値有り', () => {
    const inputBooks = { title: '告白', author: '湊かなえ', date: '0101' };
    const { result } = renderModal(true, inputBooks);

    expect(result.getByLabelText('タイトル')).toHaveValue('告白');
    expect(result.getByLabelText('著者')).toHaveValue('湊かなえ');
    expect(result.getByLabelText('読了日入力欄')).toHaveValue('01/01');
  });

  it('登録ボタンの動作確認', () => {
    const inputBooks = { title: '告白', author: '湊かなえ', date: '0101' };
    const { result, handleSubmit } = renderModal(true, inputBooks);

    result.getByText('登録').click();
    expect(handleSubmit).toHaveBeenCalledWith(expect.anything(), inputBooks);
  });

  it('閉じるボタンの動作確認', () => {
    const inputBooks = { title: '', author: '', date: '' };
    const { result, setOpen, handleSubmit } = renderModal(true, inputBooks);

    result.getByText('閉じる').click();
    expect(handleSubmit).not.toHaveBeenCalled(); // 閉じるボタンはhandleSubmitを呼ばない
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});