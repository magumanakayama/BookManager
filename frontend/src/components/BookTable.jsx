import { DataGrid } from '@mui/x-data-grid';

const BookTable = ({ bookInfo }) => {
  const rows = bookInfo.map((book, index) => ({ id: index + 1, title: book.title, author: book.author, date: book.date }));
  const columns = [
    { field: 'title', headerName: 'タイトル', flex: 5 },
    { field: 'author', headerName: '著者', flex: 3 },
    { field: 'date', headerName: '読了日', flex: 2 }
  ];

  return (
    <div style={{ height: '100%', width: 480 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default BookTable;