// トグルボタン用定数
//// トグルの背景色
export const TOGGLES_BG_COLOR = '#e0e0e0b9';

//// トグルボタンの幅
export const TOGGLE_WIDTH = 80;

//// トグルリスト用定数
////// 第1階層：クエリパラメータのキー
////// 第2階層：{ value：トグル値 lable: トグル表示文言 }
export const TOGGLE_VALUES = {
  sort: [
    { value: 'new', label: '新しい順' },
    { value: 'old', label: '古い順' },
  ],
  mode: [
    { value: 'author', label: '著者' },
    { value: 'monthly', label: '月次' },
  ],
};