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


// where we will add cards
const bodyWidget = document.getElementById("body-widget");
const bodyWidgetClone = bodyWidget.cloneNode(true);

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

function displayLibrary(page) {
    let pageNumber = page;
    let booksToDisplay = filterBooks(library).reverse();
    let startingIndex = (page-1) *6
    // display books from pagenumbber
    bodyWidget.innerHTML = bodyWidgetClone.innerHTML

    
    for (let i = startingIndex; i < (startingIndex +6); i++) {
        const card = document.createElement("div");
        const title = document.createElement("h2");
        title.textContent = (booksToDisplay[i].title || "");
        const author = document.createElement("span");
        author.textContent = booksToDisplay[i].author;
        const pages = document.createElement("span");
        pages.textContent = booksToDisplay[i].pages;
        const genre =document.createElement("span");
        genre.textContent = booksToDisplay[i].genre;
        const read = document .createElement("button");
        const removeBook = document.createElement("button");
        removeBook.style.height = "30px";
        read.style.height = "30px";
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(genre)
        card.appendChild(read);
        card.appendChild(removeBook);
        card.classList.add("book-card")

        bodyWidget.appendChild(card)
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


