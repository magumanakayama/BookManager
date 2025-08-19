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


  return (
    <PieChart
      series={[
        {
          data: Object.entries(authorCounts).map(([label, value], index) => ({
            id: index,
            value,
            label,
          })),
          arcLabel: 'value'
        },
      ]}
      width={240}
      height={240}
    />
  );
};

export default BookGraph;
