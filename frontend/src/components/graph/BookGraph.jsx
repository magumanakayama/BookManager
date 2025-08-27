import { Box, Button } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import AuthorList from './AuthorList';


const BookGraph = ({ bookInfo }) => {
  const MAX_DISPLAY = 5;

  const authorFormattedBookList = bookInfo.map((book) => {
    const formattedAuthor = book.author.replace(/\s+/g, '');
    return { ...book, author: formattedAuthor };
  });

  const authorCounts = authorFormattedBookList.reduce((acc, book) => {
    acc[book.author] = (acc[book.author] || 0) + 1;
    return acc;
  }, {});


  const sortedAuthors = Object.entries(authorCounts).sort((a, b) => b[1] - a[1]);
  const tmp = {
    top5: sortedAuthors.slice(0, MAX_DISPLAY),
    others: sortedAuthors.length > MAX_DISPLAY ? ['その他', sortedAuthors.slice(MAX_DISPLAY).reduce((sum, [, count]) => sum + count, 0)] : [],
  };
  const legendData = [...tmp.top5, tmp.others];


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
      <AuthorList bookInfo={bookInfo} sortedAuthors={sortedAuthors} />
    </Box >
  );
};

export default BookGraph;