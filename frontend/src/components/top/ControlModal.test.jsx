import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ControlModal from './ControlModal';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

const renderModal = (modalMode, open, initialInputBooks) => {
  const setOpen = vi.fn();
  const setBookInfo = vi.fn();
  const setAlert = vi.fn();
  const handleSubmit = vi.fn();

  // ダミーの書籍情報
  const bookInfo = [
    { title: '告白', author: '湊かなえ', date: '2025/01/01', image: '', isbn: '9784334776961' },
    { title: '少女', author: '湊かなえ', date: '2025/02/01', image: '', isbn: '9784334776962' },
    { title: '贖罪', author: '湊かなえ', date: '2025/03/01', image: '', isbn: '9784334776963' },
  ];

  // ラッパー
  const Wrapper = () => {
    const [inputBooks, setInputBooks] = useState(initialInputBooks);
    return (
      <ControlModal
        modalMode={modalMode}
        open={open}
        setOpen={setOpen}
        bookInfo={[...bookInfo]}
        setBookInfo={setBookInfo}
        setAlert={setAlert}
        inputBooks={inputBooks}
        setInputBooks={setInputBooks}
        handleSubmit={handleSubmit}
      />
    );
  };

  const result = render(<Wrapper />);

  return { result, setOpen, setBookInfo, setAlert, handleSubmit };
};


describe('モーダル共通動作', () => {
  it('モーダルが閉じているときは入力欄が表示されない', () => {
    const inputBooks = { title: '', author: '', date: '' };
    const { result } = renderModal("edit", false, inputBooks);

    expect(result.queryByLabelText('タイトル')).not.toBeInTheDocument();
    expect(result.queryByLabelText('著者')).not.toBeInTheDocument();
    expect(result.queryByLabelText('読了日')).not.toBeInTheDocument();
  });

  it('モーダルのレンダリングテスト', () => {
    const inputBooks = { title: '', author: '', date: '' };
    const { result } = renderModal("edit", true, inputBooks);

    expect(result.getByRole('textbox', { name: 'タイトル' })).toBeInTheDocument();
    expect(result.getByRole('textbox', { name: '著者' })).toBeInTheDocument();
    expect(result.getByLabelText('読了日入力欄')).toBeInTheDocument();
    expect(result.getByRole('button', { name: '削除' })).toBeInTheDocument();
    expect(result.getByRole('button', { name: '完了' })).toBeInTheDocument();
    expect(result.getByRole('button', { name: '閉じる' })).toBeInTheDocument();
  });

  it('初期値有り', () => {
    const inputBooks = { title: 'Nのために', author: '湊かなえ', date: '2025/04/01', image: '', isbn: '9784334776964' };
    const { result } = renderModal("edit", true, inputBooks);

    expect(result.getByLabelText('タイトル')).toHaveValue('Nのために');
    expect(result.getByLabelText('著者')).toHaveValue('湊かなえ');
    expect(result.getByLabelText('読了日入力欄')).toHaveValue('2025/04/01');
  });

  it('閉じるボタンの動作確認', () => {
    const inputBooks = { title: '', author: '', date: '' };
    const { result, setOpen, handleSubmit } = renderModal("submit", true, inputBooks);

    result.getByText('閉じる').click();
    expect(handleSubmit).not.toHaveBeenCalled(); // 閉じるボタンはhandleSubmitを呼ばない
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});

describe('Submitモード', () => {
  it('submitモードでのレンダリングテスト', () => {
    const inputBooks = { title: '', author: '', date: '' };
    const { result } = renderModal("submit", true, inputBooks);
    expect(result.queryByLabelText('削除')).not.toBeInTheDocument();
  });

  it('登録ボタンの動作確認', () => {
    const inputBooks = { title: 'Nのために', author: '湊かなえ', date: '2025/04/01' };
    const { result, handleSubmit } = renderModal("submit", true, inputBooks);
    result.getByRole('button', { name: '登録' }).click();
    expect(handleSubmit).toHaveBeenCalled();
  });
});

describe('Editモード', () => {
  it('editモードでの変更ボタンの動作確認', async () => {
    const inputBooks = { title: '告白', author: '湊かなえ', date: '2025/01/01', image: '', isbn: '9784334776961' };
    const { result, setOpen, setBookInfo, setAlert } = renderModal("edit", true, inputBooks);
    const testAuthor = result.getByRole('textbox', { name: '著者' });
    await userEvent.clear(testAuthor);
    await userEvent.type(testAuthor, '湊かなえEX');
    result.getByRole('button', { name: '完了' }).click();
    const afterBookInfo = [
      { title: '告白', author: '湊かなえEX', date: '2025/01/01', image: '', isbn: '9784334776961' },
      { title: '少女', author: '湊かなえ', date: '2025/02/01', image: '', isbn: '9784334776962' },
      { title: '贖罪', author: '湊かなえ', date: '2025/03/01', image: '', isbn: '9784334776963' },
    ];
    expect(setAlert).toHaveBeenCalledWith({ open: true, message: '書籍情報を更新しました', severity: 'success' });
    expect(setBookInfo).toHaveBeenCalled();
    expect(setOpen).toHaveBeenCalledWith(false);
    expect(setBookInfo).toHaveBeenCalledWith(afterBookInfo);
  });
});

describe('deleteモード', () => {
  it('editモードでの削除ボタンの動作確認', () => {
    const inputBooks = { title: '告白', author: '湊かなえ', date: '2025/01/01', image: '', isbn: '9784334776961' };
    const { result, setOpen, setBookInfo, setAlert } = renderModal("edit", true, inputBooks);
    result.getByRole('button', { name: '削除' }).click();
    const afterBookInfo = [
      { title: '少女', author: '湊かなえ', date: '2025/02/01', image: '', isbn: '9784334776962' },
      { title: '贖罪', author: '湊かなえ', date: '2025/03/01', image: '', isbn: '9784334776963' },
    ];
    expect(setAlert).toHaveBeenCalledWith({ open: true, message: '書籍情報を削除しました', severity: 'success' });
    expect(setBookInfo).toHaveBeenCalled();
    expect(setOpen).toHaveBeenCalledWith(false);
    expect(setBookInfo).toHaveBeenCalledWith(afterBookInfo);
  });
});