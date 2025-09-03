import { BarChart } from '@mui/x-charts';
import { Box } from '@mui/material';

const MonthlyGraph = ({ monthlyList }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        dataset={monthlyList}
        xAxis={[{ dataKey: 'month', scaleType: 'band' }]} // datakeyがx軸のラベルになる
        series={[{ dataKey: 'count', label: '月別の本の数' }]} // datakeyがy軸の値になる
        barLabel={(item) => {
          if (item.value <= 0) return null;
          return item.value?.toString();
        }}
        height={320}
        width={360}
        margin={{ left: 0 }}
      />
    </Box>
  );
};

export default MonthlyGraph;
