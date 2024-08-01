import { useState } from 'react';
import './App.css';

import WebApp from '@twa-dev/sdk';

function App() {
  const [count, setCount] = useState(0);
  const hash = window.location.hash.slice(1);
  console.log(hash);

  function getParams(key: string) {
    // const hash = window.location.hash.slice(1);
    // console.log(hash); // tgWebAppData=...&tgWebAppVersion=6.2&...

    const params = new URLSearchParams(decodeURIComponent(hash));
    console.log(key, params.get(key)); // "6. 2"
  }

  getParams('tgWebAppVersion');

  getParams('user');

  return (
    <>
      <h1>Telegram mini app</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {/* 在此处添加带有警告回调的按钮 */}
      <div className="card">
        <button
          onClick={() =>
            WebApp.showAlert(`Hello World! Current count is ${count}`)
          }
        >
          显示警告
        </button>
      </div>
    </>
  );
}

export default App;
