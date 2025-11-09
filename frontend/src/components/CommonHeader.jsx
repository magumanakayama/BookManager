import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import useCustomParams from '../lib/paramsHook';
import { BASE_URL } from '../constant';

const CommonHeader = () => {
  const { path, getParam, genNavigate } = useCustomParams();

  const toggleList = () => {
    // ナビゲーション関数を部分適用して生成
    const topNavi = genNavigate('sort')();
    const graphNavi = genNavigate('mode')('/BookGraph');
    return {
      [BASE_URL]: [
        { value: 'new', label: '新しい順', navi: () => topNavi('new') },
        { value: 'old', label: '古い順', navi: () => topNavi('old') },
      ],
      [BASE_URL + '/BookGraph']: [
        { value: 'author', label: '著者', navi: () => graphNavi('author') },
        { value: 'monthly', label: '月次', navi: () => graphNavi('monthly') },
      ]
    };
  };

  const control = {
    value: getParam().val,
    onChange: (_, newValue) => {
      if (newValue === null) return;
      toggleList()[path].find(item => item.value === newValue)?.navi();
    },
    exclusive: true,
  };

  return (
    // ToggleButtonGroupのvalueを持つToggleButtonが選択されるような仕組みにもともとなっている
    <ToggleButtonGroup size='small' {...control} aria-label="Small sizes" sx={{ bgcolor: '#e0e0e0b9' }}>
      {toggleList()[path].map(({ value, label }) => <ToggleButton key={value} value={value} sx={{ width: 80 }}>{label}</ToggleButton>)}
    </ToggleButtonGroup>
  );
};

export default CommonHeader;
