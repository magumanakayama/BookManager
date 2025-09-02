import { BarChart } from '@mui/x-charts';

const MonthlyGraph = ({ monthlyList }) => {
  return (
    <BarChart
      dataset={monthlyList}
      xAxis={[{ dataKey: 'month', scaleType: 'band' }]} // datakeyがx軸のラベルになる
      series={[{ dataKey: 'count', label: '月別の本の数' }]} // datakeyがy軸の値になる
      height={300}
      width={600}
    />
  );
};

export default MonthlyGraph;
