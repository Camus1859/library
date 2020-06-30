let myLibrary = [];
let title;
let author;
let numberOfPages;
let myCheck;
let string;
let submitButton = document.getElementById('submit-button');
let addBookButton = document.getElementById('add-book-button');

submitButton.addEventListener('click',addBookToLibrary);
addBookButton.addEventListener('click',addAbook);

// function Book(title, author, numberOfPages, readOrNot) {
//   this.title = title,
//   this.author = author,
//   this.numberOfPages = numberOfPages,
//   this.readorNot = readOrNot
// }

// Book.prototype.info = function() {
//   string = `The ${this.title} by ${this.author}, ${this.numberOfPages} pages`;
//   let ending;

//   if(this.readorNot === 'Yes' || this.readorNot === 'yes') {
//     ending = ' already read.';
//   }
//   else if(this.readorNot === 'No' || this.readorNot === 'no') {
//     ending = ' has not read yet.'
//   }
//   string += ending;
//   return string
// }

function addBookToLibrary(){
  title = document.getElementById('book-title').value
  author = document.getElementById('author').value;
  numberOfPages = document.getElementById('pages').value;
  readOrNot = document.getElementById('read-or-not').value;
  let book1 = new Book(title, author, numberOfPages, readOrNot)
  myLibrary.push(book1)
};

function visibilityOff(){
  document.getElementById('book-title').style.visibility='hidden';
  author = document.getElementById('author').style.visibility='hidden';
  numberOfPages = document.getElementById('pages').style.visibility='hidden';
  alreadyRead = document.getElementById('alreadyRead').style.visibility='hidden';
  checkBox = document.getElementById('checkBox').style.visibility='hidden'
  submitButton = document.getElementById('submit-button').style.visibility='hidden';
  userButtonsContainer = document.getElementById('user-buttons-container').style.visibility='hidden'
  

}
visibilityOff();

function addAbook() {
  visibilityOn()
}

function visibilityOn() {
  document.getElementById('book-title').style.visibility='visible';
  author = document.getElementById('author').style.visibility='visible';
  numberOfPages = document.getElementById('pages').style.visibility='visible';
  userSubmitButton = document.getElementById('submit-button').style.visibility='visible';
  alreadyRead = document.getElementById('alreadyRead').style.visibility='visible';
  checkBox = document.getElementById('checkBox').style.visibility='visible';
  submitButton = document.getElementById('submit-button').style.visibility='visible';
  userButtonsContainer = document.getElementById('user-buttons-container').style.visibility='visible';


}