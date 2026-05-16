import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// テスト対象のコンポーネント
import SubmitModal from './SubmitModal';

const testMethod = () => {
  const mockHandleSubmit = vi.fn();
  const mockOnClose = vi.fn();
  const { getByRole } = render(<SubmitModal handleSubmit={mockHandleSubmit} onClose={mockOnClose} />);
  const title = getByRole('textbox', { name: 'タイトル' });
  const author = getByRole('textbox', { name: '著者' });
  const date = getByRole('group', { name: '読了日' });
  const dateButton = getByRole('button', { name: 'Choose date' });
  const submitButton = getByRole('button', { name: '登録' });
  const closeButton = getByRole('button', { name: '閉じる' });
  const selectYearDay = selectYearDayToPicker(getByRole);

  return { title, author, date, dateButton, submitButton, closeButton, mockHandleSubmit, mockOnClose, getByRole, selectYearDay };
};

const selectYearDayToPicker = (getByRole) => (year, day) => {
  // 日を選択
  const dayButton = getByRole('gridcell', { name: String(day) });
  fireEvent.click(dayButton);

  // 年を選択
  const yearsOpenButton = getByRole('button', { name: 'calendar view is open, switch to year view' });
  fireEvent.click(yearsOpenButton);
  const yearButton = getByRole('radio', { name: String(year) });
  fireEvent.click(yearButton);
}

const handleInput = (inputList) => inputList.forEach(([inputElement, value]) => fireEvent.change(inputElement, { target: { value } }));

describe('登録モーダル', () => {
  it('初期表示、閉じる押下', () => {
    const { submitButton, closeButton, mockOnClose } = testMethod();

    // 登録ボタンが無効であることを確認
    expect(submitButton).toBeDisabled();

    // 閉じるボタンをクリック
    fireEvent.click(closeButton);

    // onCloseが呼ばれることを確認
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('必須項目入力後、登録', () => {
    const { title, author, submitButton, mockHandleSubmit } = testMethod();
    handleInput([
      [title, 'テストタイトル'],
      [author, 'テスト著者名'],
    ]);

    // 登録ボタンが有効化されることを確認
    expect(submitButton).toBeEnabled();

    // 登録ボタンをクリック
    fireEvent.click(submitButton);

    // handleSubmitが正しい引数で呼ばれることを確認
    expect(mockHandleSubmit).toHaveBeenCalledWith(expect.objectContaining(
      { title: 'テストタイトル', author: 'テスト著者名' }
    ));
  });

  it('日付を設定', () => {
    const { submitButton, date, dateButton, getByRole, selectYearDay } = testMethod();
    // 日付ボタンをクリック
    fireEvent.click(dateButton);

    // 日付ピッカーが表示されることを確認
    const datePicker = getByRole('dialog', { name: '読了日' });
    expect(datePicker).toBeVisible();

    // 年と日を選択(月を選択するのは面倒そうなので省略)
    selectYearDay(2020, 12);

    // 日付ピッカーが閉じることを確認
    waitFor(() => expect(datePicker).not.toBeVisible());

    // 選択した日付が表示されていることを確認
    const nowMonth = new Date().getMonth() + 1;
    expect(date).toHaveTextContent(`2020/${nowMonth}/12`);

    // 日付選択だけでは登録ボタンが無効であることを確認
    expect(submitButton).toBeDisabled();
  });
});