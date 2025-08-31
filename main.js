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


/// Pull up add button modal
const openBtn = document.getElementById("open-modal");
const closeBtn = document.getElementById("close-modal")
const modal = document.getElementById("modal")

openBtn.addEventListener("click", () => {
    modal.classList.add("open");
  });
closeBtn.addEventListener("click", () => {

})

modal.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    const title = data.title.trim();
    const author = data.author.trim();
    const pages = Number(data.pages);
    const genre = data.genre;
    addBookToLibrary(title, author, genre, pages, false)
    console.log(library)
    modal.classList.remove("open")
})

