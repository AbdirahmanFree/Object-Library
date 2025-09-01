const library = []
let page_index = 1;

function Book(title, author, genre, pages, read, id) {
    this.title = title,
    this.author = author,
    this.genre = genre,
    this.pages = pages,
    this.read = read,
    this.id = id
}

function addBookToLibrary(title, author, genre, pages, read,) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, genre, pages, read, id);
    library.push(book)
}

function toggleRead(book) {
    if (book.read == true) {
        book.read = false;
    }
    else {
        book.read = true
    }
    console.log(book)
}

function removeBookCard(index){
    library.splice(index,1);
    displayLibrary(page_index);
    console.log(library)
}

/// Add book buttons
const openBtn = document.getElementById("open-modal");
const closeBtn = document.getElementById("close-modal")
const modal = document.getElementById("modal")
const inputTitle = document.getElementById("title-M");
const inputAuthor = document.getElementById("author-M");
const inputPages = document.getElementById("pages-M");

/// filter buttons
const genreSelector = document.getElementById("genre");
const searchAuthor = document.getElementById("author");
const searchTitle = document.getElementById("title");
const reloadBtn = document.getElementById("reload");


// where we will add cards
const bodyWidget = document.getElementById("body-widget");


openBtn.addEventListener("click", () => {
    modal.classList.add("open");
  });

modal.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    const title = data.title.trim();
    const author = data.author.trim();
    const pages = Number(data.pages);
    const genre = data.genre;
    addBookToLibrary(title, author, genre, pages, false);
    console.log(library);
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    modal.classList.remove("open")
    displayLibrary(page_index);
})

function displayLibrary(page = 1) {
  const booksToDisplay = filterBooks(library).slice().reverse();
  const startingIndex = (page - 1) * 6;
  const end = Math.min(startingIndex + 6, booksToDisplay.length);

  // you don't need the clone; just clear the container
  bodyWidget.replaceChildren();

  for (let i = startingIndex; i < end; i++) {
    const b = booksToDisplay[i];

    const card = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = b.title || "";

    const author = document.createElement("span");
    author.textContent = b.author || "";

    const pages = document.createElement("span");
    pages.textContent = (b.pages ?? "") + "";

    const genre = document.createElement("span");
    genre.textContent = b.genre || "";

    const read = document.createElement("button");
    read.classList.add("read-false")
    read.textContent = "Not Read"
    read.addEventListener("click", () => {
        toggleRead(b);
        if (b.read) {
            read.classList.remove("read-false")
            read.classList.add("read-true")
           
        }
        else {
            read.classList.remove("read-true")
            read.classList.add("read-false")
            
        }
        read.textContent = b.read ? "Read" : "Not read";
    })

    const removeBook = document.createElement("button");
    removeBook.textContent = "Remove";
    removeBook.classList.add("read-false")
    removeBook.style.height = "30px";
    removeBook.addEventListener("click", () => {
        removeBookCard(i)

    })
    read.style.height = "30px";

    card.append(title, author, pages, genre, read, removeBook);
    card.classList.add("book-card");

    bodyWidget.appendChild(card);
  }
}

function filterBooks(arr) {

    let books = arr;

    const genre  = genreSelector.value.toLowerCase();
    const aQuery = searchAuthor.value.trim().toLowerCase();
    const tQuery = searchTitle.value.trim().toLowerCase();

    if (genre !== 'all') {
        books = books.filter(book => (book.genre || '').toLowerCase() === genre);
    }

    if (aQuery !== '') {
        books = books.filter(book => (book.author || '').toLowerCase().includes(aQuery));
    }

    if (tQuery !== '') {
        books = books.filter(book => (book.title || '').toLowerCase().includes(tQuery));
    }

    return books
}

reloadBtn.addEventListener("click", () => {
    return displayLibrary(page_index);
})

[genreSelector, searchAuthor, searchTitle].forEach(el => {
  el.addEventListener("input", () => displayLibrary(1));
});

document.addEventListener("DOMContentLoaded", () => displayLibrary(page_index));
