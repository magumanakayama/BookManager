const listFormatterPie = (bookInfo, MAX_DISPLAY = 5) => {
    // Authorの空白を削除して集計
    const authorFormattedBookList = bookInfo.map((book) => ({ ...book, author: book.author.replace(/\s+/g, '') }));

    // Authorごとに本の数をカウント
    const authorCounts = authorFormattedBookList.reduce((acc, book) => {
        acc[book.author] = (acc[book.author] || 0) + 1;
        return acc;
    }, {});

    // 本の数で降順ソート
    const _sortedAuthors = Object.entries(authorCounts).sort((a, b) => b[1] - a[1]);
    const sortedAuthors = _sortedAuthors.map(([author, count]) => ({ author, count }));

    // 上位MAX_DISPLAY件とその他のオブジェクト
    const tmp = {
        top: _sortedAuthors.slice(0, MAX_DISPLAY),
        others: _sortedAuthors.length > MAX_DISPLAY && ['その他', _sortedAuthors.slice(MAX_DISPLAY).reduce((sum, [, count]) => sum + count, 0)],
    };

    // グラフ用判例データ、その他が無い時はfileterで除外
    const legendData = [...tmp.top, tmp.others].filter(Boolean).map(([author, count]) => ({ author, count }));

    return { authorFormattedBookList, sortedAuthors, legendData };
};

export default listFormatterPie;