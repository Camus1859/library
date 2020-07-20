let myLibrary = [];
let submitButton = document.getElementById('submit-button');
let addBookButton = document.getElementById('add-book-button');
let bookTitleContainer = document.getElementById('book-title-container');
let toggleClickedNumber;

submitButton.addEventListener('click', function(){
  ui.addBookToLibrary()
});
addBookButton.addEventListener('click', function(){
  ui.visibilityOn()
});

submitButton.addEventListener('click', saveToStorage);


let add = (function () {
  let counter = -1;
  return function () {
    counter = counter + 1;
    return counter
  }
})()

function Book(title, author, numberOfPages, status) {
  counter = add()
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages
  this.status = status
  this.counter = counter
};

Book.prototype.bookFilter = function(e){
  let dataA = e.target.parentElement.getAttribute('data-number')
  myLibrary = myLibrary.filter(book => {
    return book.counter != dataA
  })
  ui.remElement(e)
}

Book.prototype.findNum = function(){
    let currentBooksInStorage = JSON.parse(localStorage.getItem('Library'))
    localStorage.clear()
    let bookObjectClicked = currentBooksInStorage.filter(book => {
    return book.counter === toggleClickedNumber
    })
  bookObjectClicked = bookObjectClicked.map(book => {
    if (book.status === "Yes"){
      book.status = "No"
    }else if(book.status === "No"){
      book.status = "Yes"
    }
    localStorage.setItem('Library', JSON.stringify(currentBooksInStorage))
  })
}


Book.prototype.pushBook = function(){
  myLibrary.push(book1)
}

function UI(){};
let ui = new UI()

UI.prototype.noDisplay = function() {
 let userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
 bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
};
// look into "DOMContentLoaded"
ui.noDisplay();


UI.prototype.visibilityOff = function(){
  let userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
};
ui.visibilityOff();


UI.prototype.visibilityOn = function() {
  let userButtonsContainer = document.getElementById('user-buttons-container').style.display = ''
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
  document.getElementById("myForm").reset()
};

UI.prototype.createInfoLine = function(book1){
  for(let property in book1){
    if (book1.hasOwnProperty(property)) {
    let h3 = document.createElement('h3');
    if (`${book1[property]}` == "No" || `${book1[property]}` == 'Yes' || `${book1[property]}` == counter) {
      continue; 
    }else{
       newContent = document.createTextNode(`${book1[property]}`)
    }
    h3.classList.add('eachBook')
    h3.appendChild(newContent);
    bookTitleContainer = document.getElementById('book-title-container')
    let theBookLine = bookTitleContainer.appendChild(h3)
    theBookLine.setAttribute('data-number', counter )
    }
  }
  bookTitleContainer = document.getElementById('book-title-container')
  bookTitleContainer.appendChild(ui.createToggleButton(book1))
  bookTitleContainer.appendChild(ui.createTrashCan())
};

UI.prototype.deleteLine = function(e){
  let dataA = e.target.parentElement.getAttribute('data-number');
  let titleOfBookDeleted = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
  let currentBooksInStorage = JSON.parse(localStorage.getItem('Library'))
  updatedBooksInStorage = currentBooksInStorage.filter(book =>{
   return book.title != titleOfBookDeleted
  })
localStorage.setItem('Library', JSON.stringify(updatedBooksInStorage))
  let dataFromDiv = Array.from(document.querySelectorAll(`[data-number="${dataA}"]`))
   dataFromDiv.forEach(item => {
     bookTitleContainer = document.getElementById('book-title-container')
     bookTitleContainer.removeChild(item)
     })
    // this shouldn't necessarily be in your UI prototype
     book1.bookFilter(e) 
}

UI.prototype.remElement = function(e){
  e.target.parentElement.remove();
  e.target.remove(); 
}

UI.prototype.addBookToLibrary = function() {
  title = document.getElementById('book-title').value
  author = document.getElementById('author').value
  numberOfPages = document.getElementById('pages').value;
  if (title === "" || author === "" || numberOfPages === "")  {
    alert("Please Fill All Lines")
    return false;
  }else{
  ui.visibilityOff()
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'grid' 
  checkBox = document.getElementById('checkBox')
  checkBox.checked == true ? status = "Yes" : status ='No'
  book1 = new Book(title, author, numberOfPages, status)
  book1.pushBook()
  ui.createInfoLine(book1)
  }
};


UI.prototype.createToggleButton = function(book1){
  let labelDiv = document.createElement('label')
  labelDiv.classList = 'switch'
  labelDiv.id = 'toggle-button'
  inputDiv = document.createElement('input')
  inputDiv.setAttribute('type', 'checkbox')
  inputDiv.id = 'checkBox2'
  labelDiv.appendChild(inputDiv)
  let spanDiv = document.createElement('span')
  spanDiv.classList = ('slider round')
  labelDiv.insertBefore(spanDiv, inputDiv.nextSibling);
  book1.status == "Yes" ? inputDiv.checked = true : inputDiv.checked = false
  labelDiv.setAttribute('data-number', counter )
  inputDiv.addEventListener('click', toggleClicked)
  return labelDiv
}

UI.prototype.createTrashCan = function(){
  let div = document.createElement('div')
  div.setAttribute('data-number', counter )
  div.id = 'theDiv'
  let trashDiv = document.createElement('i')
  trashDiv.classList = 'fa fa-trash-o fa-2x'
  div.appendChild(trashDiv)
  trashDiv.addEventListener('click', ui.deleteLine)
  return div
};

function toggleClicked(event){
 toggleClickedNumber = Number(event.target.parentElement.getAttribute('data-number'))
  // consider making find a Book prototype method, and see if you can chain these methods together!
book1.findNum()
};

function saveToStorage(){
  let book = myLibrary[myLibrary.length - 1]
  if(localStorage.getItem('Library') === null) {
    myLibrary = []
  }else{
    myLibrary = JSON.parse(localStorage.getItem('Library'));
  }
  myLibrary.push(book)
  localStorage.setItem('Library', JSON.stringify(myLibrary))
}

function renderBooksOnPage(){
    if(localStorage.getItem('Library') === null) {
      myLibrary = []
  }else{
    booksInStorage = JSON.parse(localStorage.getItem('Library'))
    booksInStorage.forEach(book =>{
      title = book.title
      author = book.author 
      numberOfPages = book.numberOfPages
      status = book.status
      book1 = new Book(title, author, numberOfPages, status)
      ui.createInfoLine(book1)
    })
  }
}

renderBooksOnPage()
