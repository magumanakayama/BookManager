import { Box, Button } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';


const BookGraph = ({ bookInfo }) => {

  const authorFormattedBookList = bookInfo.map((book) => {
    const formattedAuthor = book.author.replace(/\s+/g, '');
    return { ...book, author: formattedAuthor };
  });

  const authorCounts = authorFormattedBookList.reduce((acc, book) => {
    acc[book.author] = (acc[book.author] || 0) + 1;
    return acc;
  }, {});

  const legendData = Object.entries(authorCounts);

  return (
    <Box>
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
    </Box >
  );
};

export default BookGraph;
