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

  // 年ごとに本の数をカウント
  const yearlyCounts = bookInfo.reduce((acc, book) => {
    const year = new Date(book.date).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // 年ごとのリストを作成
  const yearlyList = Object.entries(yearlyCounts).map(([year, count]) => ({ year: Number(year), count }));

  const monthlyListByYear = bookInfo.reduce((acc, book) => {
    const year2 = new Date(book.date).getFullYear();
    const month2 = new Date(book.date).getMonth() + 1;
    acc[year2] = acc[year2] || {};
    acc[year2][month2] = (acc[year2][month2] || 0) + 1;
    return acc;
  }, {});

  const monthlyCountByYear = Object.entries(monthlyListByYear).map(([year, months]) => ({
    year: Number(year),
    months: Object.entries(months).map(([month, count]) => ({ month, count })),
  }));

  return { monthlyList, yearlyList, monthlyCountByYear };
}

export default listFormatterBar;
