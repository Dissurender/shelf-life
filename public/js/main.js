const deleteBtn = document.querySelectorAll('.del');
const bookItem = document.querySelectorAll('span.not');

Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteBook);
});

Array.from(bookItem).forEach((el) => {
    el.addEventListener('click', markComplete);
});

async function deleteBook() {
    const bookId = this.parentNode.dataset.id;
    try {
        const response = await fetch(`books/delete/${bookId}`, {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

async function markComplete() {
    const bookId = this.parentNode.dataset.id;
    try {
        const response = await fetch(`books/update/${bookId}`, {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}
