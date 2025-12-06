// MUI
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
// 定数
import { TOGGLE_VALUES, TOGGLES_BG_COLOR, TOGGLE_WIDTH } from './constant';

// トグルボタンで描画内容を切り替えるためのコンポーネント
const ToggleButtons = ({ path, query, naviAddUrl }) => {
  // パスに対応するトグル要素を取得
  const { queryKey, togglevalue } = TOGGLE_VALUES[path];

  // navigate関数を付与したトグル用ビューモデルを生成
  //// naviAddUrlに部分適用し、クエリパラメータの値を受け取る関数に変換
  const toggleList = togglevalue.map((tV) => addNavi(tV, naviAddUrl(path, queryKey)));

  // ToggleButtonGroup用のpropsを生成
  const toggleProps = {
    value: query.value, // 現在のクエリパラメータを設定
    onChange: (_, newVal) => selectNavi(toggleList, newVal)(),
    exclusive: true, // トグルは排他的に選択される
  };

  return (
    // ※ToggleButtonGroupのvalueを持つToggleButtonが選択されるような仕組みにもともとなっている
    <ToggleButtonGroup {...toggleProps} size='small' aria-label='Small sizes' sx={{ bgcolor: TOGGLES_BG_COLOR }}>
      {toggleList.map(({ queryVal: value, label }) =>
        <ToggleButton key={value} value={value} sx={{ width: TOGGLE_WIDTH }}>{label}</ToggleButton>
      )}
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;

// トグル要素にnavigate関数を付与する関数
// ToDo: navi以外の要素を足す場合は関数名を変更する
const addNavi = (toggleValue, naviQueryVal) => {
  const { queryVal } = toggleValue;
  const navi = () => naviQueryVal(queryVal);
  return { ...toggleValue, navi };
};

// 入力値(newValue)から、navigate関数を探索して返す関数
const selectNavi = (toggleList, newValue) => {
  if (newValue === null) return;
  return toggleList.find(i => i.queryVal === newValue)?.navi;
};