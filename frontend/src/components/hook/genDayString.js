// デフォルトは今日の日付
const genDayString = (day = new Date()) => {
  const yyyy = day.getFullYear();
  const mm = String(day.getMonth() + 1).padStart(2, '0');
  const dd = String(day.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
};

export default genDayString;
