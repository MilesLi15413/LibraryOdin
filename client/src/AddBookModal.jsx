import { useState } from 'react';

function AddBookModal({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [read, setRead] = useState(false);

  function handleSave() {
    onSave({ title, author, pages: Number(pages), read });
  }

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h2>Add a Book</h2>

        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book title" />

        <label>Author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" />

        <label>Pages</label>
        <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} placeholder="Number of pages" />

        <label>
          <input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} />
          Already read?
        </label>

        <div className="modalButtons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;