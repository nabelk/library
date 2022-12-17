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
    const label = document.createElement('label');
    const input = document.createElement('input');
    const btn = document.createElement('button');
    card.className = 'card';
    card.setAttribute('data-title-card', addBook.title);
    h1.textContent = addBook.title;
    div.textContent = `Author: ${addBook.author}, Pages: ${addBook.pages}`;
    label.textContent = 'Read: ';
    input.setAttribute('type', 'checkbox');
    input.setAttribute('data-title', addBook.title);
    if (read === 'read') {
        input.checked = true;
    } else {
        input.checked = false;
    }
    input.addEventListener('change', (e) => {
        console.log(e.target);
        console.log(input.checked);
        const findIndex = library.findIndex(
            (item) => item.title === e.target.getAttribute('data-title')
        );
        if (input.checked) {
            library[findIndex].toggleRead('read');
        } else {
            library[findIndex].toggleRead('not read');
        }
        console.table(library);
    });
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
    label.appendChild(input);
    card.append(h1, div, label, btn);
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

    const titleValue = document.querySelector('input[name="title"]').value;
    const authorValue = document.querySelector('input[name="author"]').value;
    const pagesValue = document.querySelector('input[name="pages"]').value;
    const readValue = document.querySelector('input[name="read"]').value;

    const findDuplicate = library.find(
        (item) => item.title.toLowerCase() === titleValue.toLowerCase()
    );
    if (findDuplicate) {
        alert('Book has been added');
    } else {
        addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
        addBookFormDiv.style.display = 'none';
        addBookOpacity.className = '';
        addBookFormDiv.className = '';
    }
});

Book.prototype.toggleRead = function (haveread) {
    this.read = haveread;
};
