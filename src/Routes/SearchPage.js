import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Book from "../Components/Book";
import * as BooksAPI from "../Container/BooksAPI";

const SearchPage = ({ AllBooks, setAllBooks, handleClick }) => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [query, setQuery] = useState("");

  const updateMainPageBooks = (event, book) => {
    const updatedShelf = event.target.value;
    const updateMainBooks = async () => {
      await BooksAPI.update(book, updatedShelf);
      const res = await BooksAPI.getAll();
      setAllBooks(res);
    };
    updateMainBooks();
  };

  const filterBooks = searchedBooks
    .filter((b) => b.hasOwnProperty("imageLinks"))
    .filter((book) =>
      AllBooks.map((b) => {
        if (book.id === b.id) {
          book.shelf = b.shelf;
          return book;
        } else {
          return book;
        }
      })
    )
    .map((newbook) => (
      <Book key={newbook.id} book={newbook} handleClick={updateMainPageBooks} />
    ));

  useEffect(() => {
    const onSearchChange = async () => {
      if (query.length > 0) {
        const result = await BooksAPI.search(query);
        result.error ? setSearchedBooks([]) : setSearchedBooks(result);
      } else {
        setSearchedBooks([]);
      }
    };
    onSearchChange();
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => setQuery(event?.target?.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">{filterBooks}</ol>
      </div>
    </div>
  );
};

export default SearchPage;
