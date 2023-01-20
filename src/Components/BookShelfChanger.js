const BookShelfChanger = ({ book, changeShelfState }) => {

  const checkBookShelf = book.shelf ? book.shelf : "none";

  return (
    <div className="book-shelf-changer">
      <select
        onChange={(event) => changeShelfState(event, book)}
        defaultValue={checkBookShelf}
      >
        <option value="noValue" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
