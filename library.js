let myLibrary = [];

function Book(Title, Author, NumberOfPages, ReadorNot) {
  this.Title = Title,
  this.Author = Author,
  this.NumberOfPages = NumberOfPages,
  this.ReadorNot = ReadorNot
}

let string;

Book.prototype.info = function() {
  string = `The ${this.Title} by ${this.Author}, ${this.NumberOfPages} pages`;
  var ending;

  if(this.ReadorNot === 'Yes' || this.ReadorNot === 'yes') {
    ending = ' already read.';
  }
  else if(this.ReadorNot === 'No' || this.ReadorNot === 'no') {
    ending = ' has not read yet.'
  }
  string += ending;
  return string
}

let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click',addBookToLibrary);

function addBookToLibrary(){
  let userInput = document.getElementById('user-input').value;
  myLibrary.push(userInput)
};





