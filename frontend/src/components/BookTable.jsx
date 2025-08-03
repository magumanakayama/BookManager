import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../theme';

const BookTable = ({ bookInfo }) => {
  const rows = bookInfo.map((book, index) => ({ id: index + 1, title: book.title, author: book.author, date: book.date }));
  const columns = [
    { field: 'title', headerName: 'タイトル', flex: 5 },
    { field: 'author', headerName: '著者', flex: 3 },
    { field: 'date', headerName: '読了日', flex: 2 }
  ];

  return (
    <Box sx={{ width: '100dvw' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaders': {
            // backgroundColor: '#000000', // 好きな色に変更
            color: theme.palette.primary.main, // 文字色も変更したい場合
          },
        }}
      />
    </Box>
  );
}

export default BookTable;