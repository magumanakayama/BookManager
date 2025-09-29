const createUrl = (query, page) => {
  const BASE_URI = 'https://8t6x3iucgd.execute-api.ap-northeast-1.amazonaws.com/default/myFunc';
  const { title, author } = query;
  const titleQuery = title ? `title=${title}` : '';
  const authorQuery = author ? `author=${author}` : '';
  const pageQuery = `page=${page}`;
  const and = title && author ? '&' : '';

  return `${BASE_URI}?${titleQuery}${and}${authorQuery}&${pageQuery}`;
};

export default createUrl;