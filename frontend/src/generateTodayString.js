const generateTodayString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1);
  const dd = String(today.getDate());
  return `${yyyy}/${mm}/${dd}`;
};

export default generateTodayString;
