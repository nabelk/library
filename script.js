const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const bookCards = document.getElementById('book-cards');

function addBookToLibrary(title, author, pages, read) {
    const addBook = new Book(title, author, pages, read);
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

addBookToLibrary('The hunger game', 'someone', 200, 'read');
