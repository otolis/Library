const myLibrary = [];
let bookIdCounter = 0;

class Book{
    constructor(title, author, pages, hasRead) {
    this.id = bookIdCounter++
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    }
    toggleReadStatus(){
        this.hasRead=!this.hasRead;
    }
}





function addBookToLibrary(title, author, pages, hasRead) {
    const newBook = new Book(title, author, pages, hasRead === "true");
    myLibrary.push(newBook);
    displayBooks();
}


function displayBooks() {
    const bookContainer = document.getElementById("bookContainer");
    bookContainer.innerHTML = ""; 

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");

        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.hasRead ? "Yes" : "No"}</p>
            <button class="removeButton" data-book-id="${book.id}">Remove</button>
            <button class="toggleReadButton" data-book-id="${book.id}">Toggle Read Status</button>
        `;

        bookContainer.appendChild(bookCard);
    });

    
    const removeButtons = document.querySelectorAll(".removeButton");
    const toggleReadButtons = document.querySelectorAll(".toggleReadButton");

    removeButtons.forEach((button) =>
        button.addEventListener("click", (e) => {
            const bookId = parseInt(e.target.getAttribute("data-book-id"));
            removeBook(bookId);
        })
    );

    toggleReadButtons.forEach((button) =>
        button.addEventListener("click", (e) => {
            const bookId = parseInt(e.target.getAttribute("data-book-id"));
            toggleBookReadStatus(bookId);
        })
    );
}


function removeBook(bookId) {
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }
}


function toggleBookReadStatus(bookId) {
    const book = myLibrary.find((book) => book.id === bookId);
    if (book) {
        book.toggleReadStatus();
        displayBooks();
    }
}


const newBookButton = document.getElementById("newBookButton");
const newBookModal = document.getElementById("newBookModal");
const newBookForm = document.getElementById("newBookForm");
const cancelButton = document.getElementById("cancelButton");

newBookButton.addEventListener("click", () => {
    newBookModal.showModal();
});

cancelButton.addEventListener("click", () => {
    newBookModal.close();
});

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("hasRead").value;

    addBookToLibrary(title, author, pages, hasRead);
    newBookModal.close(); 
    newBookForm.reset(); 
});

