import React from 'react';
// 待詢問 paginatoru這邊引入導致跑版 -> components那頁引入就不會
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import component
import BookSystem from "./Component/BookSystem";

function App() {
  return (
    <div className="App">
      <BookSystem />
    </div>
  );
}

export default App;
