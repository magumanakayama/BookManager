const listFormatterBar = (bookInfo) => {
  // 月ごとに本の数をカウント
  const monthlyCounts = bookInfo.reduce((acc, book) => {
    const month = new Date(book.date).getMonth() + 1;
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // 月ごとのリストを作成
  const monthlyList = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString();
    return { month, count: monthlyCounts[month] || 0 };
  });

  return { monthlyList };
}

export default listFormatterBar;