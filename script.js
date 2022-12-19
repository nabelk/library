const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function (status) {
    this.read = status;
};

function addBookToLibrary(title, author, pages, read) {
    const bookCards = document.getElementById('book-cards');
    const addBook = new Book(title, author, Number(pages), read);
    library.push(addBook);
    const card = document.createElement('div');
    const h2 = document.createElement('h2');
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const btn = document.createElement('button');
    card.className = 'card';
    card.setAttribute('data-title-card', addBook.title);
    h2.textContent = addBook.title;
    div.textContent = `by ${addBook.author}, ${addBook.pages} pages`;
    label.textContent = 'Read Status ';
    input.setAttribute('type', 'checkbox');
    input.setAttribute('data-title', addBook.title);
    if (read) {
        input.checked = true;
    } else {
        input.checked = false;
    }
    input.addEventListener('change', (e) => {
        const findIndex = library.findIndex(
            (item) => item.title === e.target.getAttribute('data-title')
        );
        if (input.checked) {
            library[findIndex].toggleRead(true);
        } else {
            library[findIndex].toggleRead(false);
        }
    });
    btn.textContent = 'Remove';
    btn.setAttribute('data-title-button', addBook.title);
    btn.addEventListener('click', (e) => {
        const dataTitle = e.target.getAttribute('data-title-button');
        const findtitle = library.findIndex((item) => item.title === dataTitle);
        const confirmation = document.getElementById('remove-confirmation');
        const div1 = document.createElement('div');
        const btn1 = document.createElement('button');
        const btn2 = document.createElement('button');
        btn1.textContent = 'Yes';
        btn2.textContent = 'No';
        div1.append(btn1, btn2);
        confirmation.appendChild(div1);
        confirmation.style.display = 'flex';

        function removeManipulation() {
            confirmation.style.display = 'none';
            div1.remove();
        }

        btn1.addEventListener('click', () => {
            library.splice(findtitle, 1);
            document.querySelector(`[data-title-card="${dataTitle}"]`).remove();
            removeManipulation();
        });

        btn2.addEventListener('click', () => {
            removeManipulation();
        });
    });
    bookCards.appendChild(card);
    label.appendChild(input);
    card.append(h2, div, label, btn);
}

addBookToLibrary('Catching Fire', 'Suzanne Collins', 391, true);

// Add book dom

const formDoc = document.querySelector('form');
const addBookBtn = document.querySelector('button.add-book');
const addBookFormDiv = document.querySelector('#form-div');
const addBookOpacity = document.querySelector('#opacity');
const exitAddBook = document.querySelector('button.exit');

function displayManipulation(option) {
    switch (option) {
        case 'enable':
            addBookFormDiv.style.display = 'initial';
            addBookOpacity.className = 'opacity';
            break;
        case 'disable':
            addBookFormDiv.style.display = 'none';
            addBookOpacity.className = '';
            break;
    }
}

addBookBtn.addEventListener('click', () => displayManipulation('enable'));
exitAddBook.addEventListener('click', () => displayManipulation('disable'));
formDoc.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleValue = document.querySelector('input[name="title"]').value;
    const authorValue = document.querySelector('input[name="author"]').value;
    const pagesValue = document.querySelector('input[name="pages"]').value;
    const readValue = document.querySelector('input[name="read"]').checked;

    const findDuplicate = library.find(
        (item) => item.title.toLowerCase() === titleValue.toLowerCase()
    );
    if (findDuplicate) {
        alert('Book has been added');
    } else {
        addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
        displayManipulation('disable');
    }
});
