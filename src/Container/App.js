import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "../Container/BooksAPI";
import MainPage from "../Routes/MainPage";
import SearchPage from "../Routes/SearchPage";
import NotFound from "../Routes/NotFound";
import "./App.css";


function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [AllBooks, setAllBooks] = useState([]);


  const changeBookShelf = (event, book) => {
    let newTarget = event.target.value;
    setAllBooks((prevBooks) => {
      return prevBooks.map((b) => {
        return b.id === book.id ? { ...b, shelf: newTarget } : b;
      });
    });
    BooksAPI.update(book, newTarget);
  };

  useEffect(() => {
    const getAPIBooks = async () => {
      try {
        const booksData = await BooksAPI.getAll();
        setAllBooks(booksData);
      } catch (error) {
        console.log(error);
      }
    };
    getAPIBooks();
  }, []);

  return (
    <Routes className="app">
      <Route
        path="/search"
        element={
          <SearchPage
            AllBooks={AllBooks}
            setAllBooks={setAllBooks}
            handleClick={changeBookShelf}
            showSearchPage={showSearchPage}
            setShowSearchpage={setShowSearchpage}
          />
        }
      />
      <Route
        exact
        path="/"
        element={
          <MainPage AllBooks={AllBooks} changeBookShelf={changeBookShelf} />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
