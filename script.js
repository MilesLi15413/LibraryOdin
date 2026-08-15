function newBookBtn(){
    document.getElementById("modalOverlay").style.display = "flex";
}

async function showCollection(){
    const container = document.querySelector(".showCollection");
    container.innerHTML = "";
    
    const response = await fetch('http://localhost:3000/books');
    const books = await response.json();

    books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.read ? "Read" : "Not read yet"}</p>
            <button onclick="removeBook('${book._id}')">Remove</button>
        `;
        container.appendChild(bookCard);
    });
}

async function removeBook(id){
    await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE'
    });
    showCollection();
}

function closeModal(){
    document.getElementById("modalOverlay").style.display = "none";
    clearForm();
}

async function saveBook(){
    const title = document.getElementById("inputTitle").value;
    const author = document.getElementById("inputAuthor").value;
const pages = Number(document.getElementById("inputPages").value);
    const read = document.getElementById("inputRead").checked;

    await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, pages, read })
    });
    showCollection();
    closeModal();
}

function clearForm(){
    document.getElementById("inputTitle").value = "";
    document.getElementById("inputAuthor").value = "";
    document.getElementById("inputPages").value = "";
    document.getElementById("inputRead").checked = false;
}

showCollection();