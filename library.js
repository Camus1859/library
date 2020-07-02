let myLibrary = [];
let title;
let author;
let numberOfPages;
let myCheck;
let string;
let bookTitleContainer
let userButtonsContainer
let infoLine;
let submitButton = document.getElementById('submit-button');
let addBookButton = document.getElementById('add-book-button');

userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'

submitButton.addEventListener('click', addBookToLibrary);
addBookButton.addEventListener('click', visibilityOn);
submitButton.addEventListener('click', submitBookinfo);

function Book(title, author, numberOfPages) {
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages
}

Book.prototype.info = function() {
  string = `The ${this.title} by ${this.author}, ${this.numberOfPages} pages`;
  let ending;
  let checkBox = document.getElementById("checkBox");

  if(checkBox.checked == true) {
    ending = ' already read.';
    console.log(ending)
  }
  else if(checkBox.checked == false) {
    ending = ' has not been read yet.'
  }
  string += ending;
  return string
}

function addBookToLibrary(){
  title = document.getElementById('book-title').value
  author = document.getElementById('author').value;
  numberOfPages = document.getElementById('pages').value;
  let book1 = new Book(title, author, numberOfPages)
  myLibrary.push(book1)
  console.log(book1)
  console.log(myLibrary)
  arrayOrganizer()
};

function visibilityOff(){
userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
}


function visibilityOn() {
userButtonsContainer = document.getElementById('user-buttons-container').style.display = ''
bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
document.getElementById("myForm").reset()
}

function submitBookinfo() {
  visibilityOff()
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'grid'
}

function arrayOrganizer() {
  let lastBook = myLibrary[myLibrary.length - 1]
  let checkBox = document.getElementById("checkBox");
  let status;
  if(checkBox.checked == true) {
    status = 'Yes'
  }
  else if(checkBox.checked == false) {
    status = 'No'
  }
 allArrayData = `${lastBook.title} ${lastBook.author} ${lastBook.numberOfPages} ${status}`;
 createInfoLine()

}

function createInfoLine() {
  for (let i = 0; i < 4; i++) {
    let h3 = document.createElement('h3');
    let newContent = document.createTextNode(allArrayData.split(" ")[i])
    h3.classList.add('eachBook')
    h3.appendChild(newContent);
    bookTitleContainer = document.getElementById('book-title-container')
    x = bookTitleContainer.appendChild(h3)
    console.log(x)
  }
}



