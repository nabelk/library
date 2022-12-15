const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const addBook = new Book(title, author, pages, read);
    library.push(addBook);
}

addBookToLibrary('The hunger game', 'someone', 200, 'read');
addBookToLibrary('Harry potter', 'anyone', 500, 'not read');
addBookToLibrary('Sembilu', 'anyone', 500, 'not read');
addBookToLibrary('Self help', 'anyone', 500, 'not read');
addBookToLibrary('Great foods', 'anyone', 500, 'not read');
addBookToLibrary('Coffee vs Tea', 'anyone', 500, 'not read');

library.forEach((book) => {
    console.log(book.title);
    const bookCards = document.querySelector('#book-cards');
    const card = document.createElement('div');
    const h1 = document.createElement('h1');
    const div = document.createElement('div');
    card.className = 'card';
    h1.textContent = book.title;
    div.textContent = `Author: ${book.author}, Pages: ${book.pages}`;
    bookCards.appendChild(card);
    card.append(h1, div);
});

console.table(library);
