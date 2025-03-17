const myLibrary = [];
let bookIdCounter = 0;

function Book(title, author, pages, hasRead) {
  this.id = bookIdCounter++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.toggleReadStatus = function () {
  this.hasRead = !this.hasRead;
};

function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead === "true");
  myLibrary.push(newBook);
  displayBooks();
  updateLocalStorage();
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
          <button class="toggleReadButton" data-book-id="${
            book.id
          }">Toggle Read Status</button>
        `;

    bookContainer.appendChild(bookCard);
  });

  const removeButtons = document.querySelectorAll(".removeButton");
  const toggleReadButtons = document.querySelectorAll(".toggleReadButton");

  removeButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const bookId = parseInt(e.target.getAttribute("data-book-id"), 10);
      removeBook(bookId);
    })
  );

  toggleReadButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const bookId = parseInt(e.target.getAttribute("data-book-id"), 10);
      toggleBookReadStatus(bookId);
    })
  );
}

function removeBook(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
    updateLocalStorage();
  }
}

function toggleBookReadStatus(bookId) {
  const book = myLibrary.find((book) => book.id === bookId);
  if (book) {
    book.toggleReadStatus();
    displayBooks();
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  localStorage.setItem("bookIdCounter", bookIdCounter);
}

function loadFromLocalStorage() {
  const storedLibrary = localStorage.getItem("myLibrary");
  const storedCounter = localStorage.getItem("bookIdCounter");

  if (storedLibrary) {
    const parsedLibrary = JSON.parse(storedLibrary);
    parsedLibrary.forEach((bookData) => {
      const restoredBook = new Book(
        bookData.title,
        bookData.author,
        bookData.pages,
        bookData.hasRead
      );
      restoredBook.id = bookData.id;
      myLibrary.push(restoredBook);
    });
  }

  if (storedCounter) {
    bookIdCounter = parseInt(storedCounter, 10);
  }
}

loadFromLocalStorage();
displayBooks();

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
