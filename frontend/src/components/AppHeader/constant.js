// トグルボタン用定数
//// トグルの背景色
export const TOGGLES_BG_COLOR = '#e0e0e0b9';

//// トグルボタンの幅
export const TOGGLE_WIDTH = 80;

// ToDo: トグルではなくクエリの値という定数にしてgetParamと同じ定数を読み込み共通化させる
//// トグルリスト用定数
////// 第1階層：クエリパラメータのキー
////// 第2階層：{ value：クエリパラメータの値 lable: トグル表示文言 }
export const TOGGLE_VALUES = {
  ['/']: {
    queryKey: 'sort',
    togglevalue: [
      { queryVal: 'new', label: '新しい順' },
      { queryVal: 'old', label: '古い順' },
    ]
  },
  ['/BookGraph']: {
    queryKey: 'mode',
    togglevalue: [
      { queryVal: 'author', label: '著者' },
      { queryVal: 'monthly', label: '月次' }
    ]
  },
};