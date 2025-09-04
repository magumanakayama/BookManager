import { BarChart } from '@mui/x-charts';
import { Box } from '@mui/material';

const MonthlyGraph = ({ monthlyList }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        dataset={monthlyList}
        xAxis={[{ dataKey: 'month', scaleType: 'band', tickSize: 0 }]} // datakeyがx軸のラベルになる
        series={[{ dataKey: 'count', label: '月別の本の数' }]} // datakeyがy軸の値になる
        barLabel={(item) => item.value > 0 ? item.value?.toString() : null} // 0のラベルを非表示に
        yAxis={[{ valueFormatter: v => Math.floor(v).toString() > 0 ? Math.floor(v).toString() : null }, { tickSize: 0 }]} // y軸を整数表示に
        height={320}
        width={360}
        margin={{ left: 0 }}
      />
    </Box>
  );
};

export default MonthlyGraph;
