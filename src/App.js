import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MyReads from "./MyReads";
import Search from "./Search";
import * as BooksAPI from './BooksAPI';

function App() {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setAllBooks(res);
    }
    getBooks();
  }, []);

  // console.log(allBooks);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<MyReads allBooks={allBooks} setAllBooks={setAllBooks} />} />
          <Route path='/search' element={<Search allBooks={allBooks} setAllBooks={setAllBooks} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
