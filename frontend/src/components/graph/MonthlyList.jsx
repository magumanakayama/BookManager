import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

const MonthlyList = ({ monthlyList }) => {
  const annualCount = monthlyList.reduce((acc, { count }) => acc + count, 0);
  const currentMonthCount = monthlyList[new Date().getMonth()].count;

  return (
    <List>
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', overflow: 'hidden', mx: 2 }}>
        <Typography variant="body1">ことし</Typography>
        <Typography variant="body1">{annualCount}冊</Typography>
      </ListItem>
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', overflow: 'hidden', mx: 2 }}>
        <Typography variant="body1">こんげつ</Typography>
        <Typography variant="body1">{currentMonthCount}冊</Typography>
      </ListItem>
    </List>
  );
};

export default MonthlyList;