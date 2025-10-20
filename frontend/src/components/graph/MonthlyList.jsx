import { Box, List, ListItem, Typography, Divider } from '@mui/material';

const MonthlyList = ({ totalCount, thisYearMonthlyList }) => {
  if (!thisYearMonthlyList) return null;

  const annualCount = thisYearMonthlyList.reduce((acc, { count }) => acc + count, 0);
  const currentMonthCount = thisYearMonthlyList[new Date().getMonth()].count;

  const infoList = [
    { label: "累計", value: totalCount },
    { label: "今年", value: annualCount },
    { label: "今月", value: currentMonthCount }
  ];

  return (
    <List>
      <Divider />
      {infoList.map(({ label, value }) => {
        return (
          <>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', overflow: 'hidden' }} key={label}>
              <Typography variant="body1" sx={{ color: '#000' }}>{label}</Typography>
              <Typography variant="body1" sx={{ color: '#000' }}>{value}冊</Typography>
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
};

export default MonthlyList;