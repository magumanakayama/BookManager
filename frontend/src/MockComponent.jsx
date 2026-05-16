

const MockComponent = () => {

  // localStorageの使用容量を計算
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += ((localStorage[key].length + key.length) * 2); // 1文字2バイト
    }
  }
  console.log(`localStorage使用容量: ${total} バイト (${(total / 1024).toFixed(2)} KB)`);


  return (
    <div>
      <h2>Mock Component</h2>
    </div>
  );
};

export default MockComponent;
