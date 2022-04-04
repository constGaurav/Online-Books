

const searchText = document.getElementById("search-text");
const myForm = document.getElementById("my-form");

// books
const books = document.getElementById("results");

myForm.addEventListener("submit", (event) => {
  // prevent the Form from autosubmitting.
  // event.preventDefault();

  const searchTxt = searchText.value;
  // alert(searchTxt);

  const api = `https://www.googleapis.com/books/v1/volumes?q=${searchTxt}`;
  fetch(api)
    .then((response) => response.json())
    .then((res) => {
      let size = 6;
      if (size > res.items.length) size = res.items.length;

      let booksLists = '<ul class="cardTypeList"> ';
      for (let i = 0; i < size; i++) {
        // get the title of the books
        let title = res.items[i].volumeInfo.title;
        let author = res.items[i].volumeInfo.authors;
        let readMore = res.items[i].volumeInfo.infoLink;
        let imgUrl = res.items[i].volumeInfo.imageLinks.thumbnail;

        booksLists += `<li class="cardTypeList__item">
                            <div class="cardTypeList__imageBox">
                                <img class="cardTypeList__image" src=${imgUrl} width="500" height="600">
                            </div>
                            <dl class="cardTypeList__textBox">
                                <h2 class="cardTypeList__title">Title: ${title}</h2>
                                <h3 class="cardTypeList__author">Authors: ${author}</h3>
                            </dl>
                            <a class="btn" href=${readMore}>Read More</a>
                        </li>
                        
                        `;
        console.log(title);
      }
      booksLists += "</ul>";
      books.innerHTML = booksLists;
      books.style.display = "block";
    });
});
