// MUI
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
// 定数
import { TOGGLE_VALUES, TOGGLES_BG_COLOR, TOGGLE_WIDTH } from './constant';

// トグルボタンで描画内容を切り替えるためのコンポーネント
const ToggleButtons = ({ path, query, naviAddUrl }) => {
  // クエリキーを元にトグル定数を参照し、これにnavigate関数をそれぞれ付与した、トグル用ビューモデル（リスト）を生成
  //// naviAddUrlに部分適用し、クエリパラメータの値を受け取る関数に変換
  const togglesViewModel = TOGGLE_VALUES[query.key].map((tV) => addNavi(tV, naviAddUrl(path, query.key)));

  // ToggleButtonGroup用のpropsを生成
  const toggleProps = {
    value: query.value, // 現在のクエリパラメータを設定
    onChange: (_, newVal) => selectNavi(togglesViewModel, newVal)(),
    exclusive: true, // トグルは排他的に選択される
  };

  return (
    // ※ToggleButtonGroupのvalueを持つToggleButtonが選択されるような仕組みにもともとなっている
    <ToggleButtonGroup {...toggleProps} size='small' aria-label='Small sizes' sx={{ bgcolor: TOGGLES_BG_COLOR }}>
      {togglesViewModel.map(({ value, label }) =>
        <ToggleButton key={value} value={value} sx={{ width: TOGGLE_WIDTH }}>{label}</ToggleButton>
      )}
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;

// トグル要素にnavigate関数を付与する関数
// ToDo: navi以外の要素を足す場合は関数名を変更する
const addNavi = (toggleValue, naviQueryVal) => {
  const { value } = toggleValue;
  const navi = () => naviQueryVal(value);
  return { ...toggleValue, navi };
};

// 入力値(newValue)から、navigate関数を探索して返す関数
const selectNavi = (togglesViewModel, newValue) => {
  if (newValue === null) return;
  return togglesViewModel.find(i => i.value === newValue)?.navi;
};