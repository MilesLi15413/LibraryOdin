import { useState, useEffect } from 'react';
import BookCard from './BookCard';
import AddBookModal from './AddBookModal';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();
    setBooks(data);
  }

  async function addBook(newBook) {
    await fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    });
    fetchBooks();
    setShowModal(false);
  }

  async function removeBook(id) {
    await fetch(`http://localhost:3000/books/${id}`, {
      method: 'DELETE'
    });
    fetchBooks();
  }

  return (
    <div>
      <div className="showCollection">
        <div className="textShowCollection">Your Collection</div>
        {books.map((book) => (
          <BookCard key={book._id} book={book} onRemove={removeBook} />
        ))}
      </div>

      <div className="addBook">
        <button className="addBookBtn" onClick={() => setShowModal(true)}>
          +
        </button>
      </div>

      {showModal && (
        <AddBookModal onSave={addBook} onCancel={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;