// この形がテンプレ
// Object.entries(yearlyCounts).map

const listFormatterBar = (bookInfo) => {
  const totalCount = bookInfo.length;
  const yearlyList = genYearlyList(bookInfo);
  const monthlyList = genMonthlyList(bookInfo);
  return { totalCount, yearlyList, monthlyList };
}

const genYearlyList = (bookInfo) => {
  // 年ごとに本の数をカウント
  const yearlyCounts = bookInfo.reduce((acc, book) => {
    const year = new Date(book.date).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // 年ごとのリストを作成
  const yearlyList = Object.entries(yearlyCounts).map(([year, count]) => ({ year: Number(year), count }));

  return yearlyList;
}

const genMonthlyList = (bookInfo) => {
  // 年ごとに月別の本の数をカウント
  const monthlyListByYear = bookInfo.reduce((acc, book) => {
    const year = new Date(book.date).getFullYear();
    const month = new Date(book.date).getMonth() + 1;
    acc[year] = acc[year] || {};
    acc[year][month] = (acc[year][month] || 0) + 1;
    return acc;
  }, {});

  // 年ごとに月別のリストを作成
  const monthlyCountByYear = Object.entries(monthlyListByYear).map(([year, months]) => ({
    year: Number(year),
    months: Object.entries(months).map(([month, count]) => ({ month, count })),
  }));

  // 月が存在しない場合は0で埋める
  const monthlyListByYearZeroPlum = monthlyCountByYear.map(({ year, months }) => {
    const monthCounts = Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString();
      return { month, count: months.find(m => m.month === month)?.count || 0 };
    });
    return { year, months: monthCounts };
  });

  return monthlyListByYearZeroPlum;
}

export default listFormatterBar;
