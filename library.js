let myLibrary = [];
let title;
let author;
let numberOfPages;
let readOrNot;
let string;

let submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click',addBookToLibrary);

function Book(title, author, numberOfPages, readOrNot) {
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages,
  this.readorNot = readOrNot
}

Book.prototype.info = function() {
  string = `The ${this.title} by ${this.author}, ${this.numberOfPages} pages`;
  let ending;

  if(this.readorNot === 'Yes' || this.readorNot === 'yes') {
    ending = ' already read.';
  }
  else if(this.readorNot === 'No' || this.readorNot === 'no') {
    ending = ' has not read yet.'
  }
  string += ending;
  return string
}

function addBookToLibrary(){
  title = document.getElementById('book-title').value;
  author = document.getElementById('author').value;
  numberOfPages = document.getElementById('pages').value;
  readOrNot = document.getElementById('read-or-not').value;
  myLibrary.push(title)
  myLibrary.push(author)
  myLibrary.push(numberOfPages)
  myLibrary.push(readOrNot)

  let book1 = new Book(title, author, numberOfPages, readOrNot)
  console.log(book1)
};

