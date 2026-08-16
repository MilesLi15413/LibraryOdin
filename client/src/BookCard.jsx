function BookCard({ book, onRemove }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.pages} pages</p>
      <p>{book.read ? "Read" : "Not read yet"}</p>
      <button onClick={() => onRemove(book._id)}>Remove</button>
    </div>
  );
}

export default BookCard;