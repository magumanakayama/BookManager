const convertToCSV = () => {
  if (!bookInfo || bookInfo.length === 0) return '';
  const key = Object.keys(bookInfo[0]);
  const values = bookInfo.map((book) => Object.values(book));
  const array = [key].concat(values);
  return array.map((a) => a.join(',')).join('\n');
}

const downloadCSV = (csv, filename) => {
  const link = anchorRef.current
  if (!link) return

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url) // csvファイルの一時URLをセット
  link.setAttribute('download', filename) // ダウンロード用リンクであることを明記
  link.click()
}

