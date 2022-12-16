const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const bookCards = document.getElementById('book-cards');
    const addBook = new Book(title, author, Number(pages), read);
    library.push(addBook);
    const card = document.createElement('div');
    const h1 = document.createElement('h1');
    const div = document.createElement('div');
    const btn = document.createElement('button');
    card.className = 'card';
    card.setAttribute('data-title-card', addBook.title);
    h1.textContent = addBook.title;
    div.textContent = `Author: ${addBook.author}, Pages: ${addBook.pages}`;
    btn.textContent = 'Remove';
    btn.setAttribute('data-title-button', addBook.title);
    btn.addEventListener('click', (e) => {
        const findtitle = library.findIndex(
            (item) => item.title === e.target.getAttribute('data-title-button')
        );
        library.splice(findtitle, 1);
        document
            .querySelector(
                `[data-title-card="${e.target.getAttribute(
                    'data-title-button'
                )}"]`
            )
            .remove();
        console.table(library);
    });
    bookCards.appendChild(card);
    card.append(h1, div, btn);
    console.table(library);
}

addBookToLibrary('Catching Fire', 'Suzanne Collins', 391, 'read');

const addBookBtn = document.querySelector('button.add-book');
const addBookFormDiv = document.querySelector('#form-div');
const addBookOpacity = document.querySelector('#opacity');

addBookFormDiv.style.display = 'none';

addBookBtn.addEventListener('click', () => {
    addBookFormDiv.style.display = 'initial';
    addBookFormDiv.className = 'enable-form';
    addBookOpacity.className = 'opacity';
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(
        this.title.value,
        this.author.value,
        this.pages.value,
        this.read.value
    );
    addBookFormDiv.style.display = 'none';
    addBookOpacity.className = '';
    addBookFormDiv.className = '';
});
