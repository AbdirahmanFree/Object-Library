const library = []

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

addBookToLibrary("The Lord of The Rings", "J.R.R Tolkien", "Fantasy", "300", false)

console.log(library)
