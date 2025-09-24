import { PieChart } from '@mui/x-charts';


const AuthorGraph = ({ legendData }) => {
  return (
    <PieChart
      series={[
        {
          data: legendData.map(({ author, count }, index) => ({
            id: index,
            value: count,
            label: author,
          })),
          arcLabel: 'value',
          paddingAngle: 2,
          cornerRadius: 5,
        },
      ]}
      slotProps={{
        legend: {
          direction: 'horizontal',
          position: {
            vertical: 'top',
            horizontal: 'center'
          }
        }
      }}
      // width={240}
      height={240}
    />
  );
};

export default AuthorGraph;