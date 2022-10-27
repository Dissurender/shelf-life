const deleteBtn = document.querySelectorAll('.del');
const updateBtn = document.querySelectorAll('span.not');

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteBook);
});

Array.from(updateBtn).forEach((el) => {
  el.addEventListener('click', updateBook);
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

async function updateBook() {
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
