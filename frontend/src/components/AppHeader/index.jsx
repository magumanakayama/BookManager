// ReactRouter
import { Outlet } from 'react-router-dom';
// 独自定義コンポーネント
import HeaderLayout from './HeaderLayout';
import ToggleButtons from './ToggleButtons';

// カスタムフック
import useCustomParams from '../../lib/paramsHook';

// 共通ヘッダーを持つレイアウトコンポーネント
const AppHeader = () => {
  const { path, query, naviAddUrl } = useCustomParams();
  return (
    <>
      <HeaderLayout>
        <ToggleButtons path={path} query={query} naviAddUrl={naviAddUrl} />
      </HeaderLayout>
      {/* childrenコンポーネントが表示される */}
      <Outlet />
    </>
  );
};

export default AppHeader;