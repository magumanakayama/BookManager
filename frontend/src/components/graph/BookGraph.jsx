import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import AuthorList from './AuthorList';
import HeaderLayout from '../HeaderLayout';
import GraphHeader from './GraphHeader';
import listFormatter from './listFormatter';


const BookGraph = ({ bookInfo }) => {
  const MAX_DISPLAY = 5;
  const [graphMode, setGraphMode] = useState("author");
  const { sortedAuthors, legendData } = listFormatter(bookInfo, MAX_DISPLAY);


  return (
    <Box>
      <HeaderLayout>
        <GraphHeader graphMode={graphMode} setGraphMode={setGraphMode} />
      </HeaderLayout>
      <Button variant="outlined" onClick={() => window.history.back()} >戻る</Button>
      <PieChart
        series={[
          {
            data: legendData.map(([label, value], index) => ({
              id: index,
              value,
              label,
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
        width={240}
        height={240}
      />
      <AuthorList bookInfo={bookInfo} sortedAuthors={sortedAuthors} />
    </Box >
  );
};

export default BookGraph;