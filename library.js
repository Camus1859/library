let myLibrary = [];
let title;
let author;
let numberOfPages;
let string;
let bookTitleContainer = document.getElementById('book-title-container')
let userButtonsContainer
let h3;
let submitButton = document.getElementById('submit-button');
let addBookButton = document.getElementById('add-book-button');

function noDisplay() {
  userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
};
noDisplay();

submitButton.addEventListener('click', addBookToLibrary);
addBookButton.addEventListener('click', visibilityOn);
submitButton.addEventListener('click', submitBookinfo);

function Book(title, author, numberOfPages) {
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages
};

function addBookToLibrary(){
  title = document.getElementById('book-title').value
  author = document.getElementById('author').value
  numberOfPages = document.getElementById('pages').value;
  let book1 = new Book(title, author, numberOfPages)
  myLibrary.push(book1)
  arrayOrganizer()
};

function visibilityOff(){
  userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
};

function visibilityOn() {
  userButtonsContainer = document.getElementById('user-buttons-container').style.display = ''
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
  document.getElementById("myForm").reset()
};

function submitBookinfo() {
  visibilityOff()
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'grid'
};

function arrayOrganizer() {
  let toggleButton = document.getElementById('toggle-button');
  let lastBook = myLibrary[myLibrary.length - 1]
  let checkBox = document.getElementById("checkBox");
  let status;
  if(checkBox.checked == true) {
    status = toggleButton
  }
  else if(checkBox.checked == false) {
    status = toggleButton
  }
 allArrayData = {1:lastBook.title, 2:lastBook.author, 3:lastBook.numberOfPages}
 createInfoLine(allArrayData)
};

Book.prototype.info = function() {
  string = `The ${this.title} by ${this.author}, ${this.numberOfPages} pages`;
  let ending;
  let checkBox = document.getElementById("checkBox");
  if(checkBox.checked == true) {
    ending = ' already read.';
  }
  else if(checkBox.checked == false) {
    ending = ' has not been read yet.'
  }
  string += ending;
  return string
};

function createInfoLine(obj) {
    for(const property in obj){
      h3 = document.createElement('h3');
      let newContent = document.createTextNode(`${obj[property]}`)
      h3.classList.add('eachBook')
      h3.appendChild(newContent);
      bookTitleContainer = document.getElementById('book-title-container')
      x = bookTitleContainer.appendChild(h3)
        x.setAttribute('data-number', myLibrary.length -1)
    }
    bookTitleContainer.appendChild(createToggleButton())
  bookTitleContainer.appendChild(createTrashCan())
};

{/* <label class="switch" id="toggle-button">
  <input type = "checkbox" checked>
  <span class ="slider round"></span>
</label> */}

function createToggleButton() {
  let labelDiv = document.createElement('label')
  labelDiv.setAttribute('data-number', myLibrary.length - 1)
  labelDiv.classList = 'switch'
  labelDiv.id = 'toggle-button'
  let inputDiv = document.createElement('input')
  inputDiv.setAttribute('data-number', myLibrary.length - 1)
  inputDiv.setAttribute('type', 'checkbox')
  labelDiv.appendChild(inputDiv)
  let spanDiv = document.createElement('span')
  spanDiv.setAttribute('data-number', myLibrary.length - 1)
  spanDiv.classList = ('slider round')
  labelDiv.insertBefore(spanDiv, inputDiv.nextSibling)
  // inputDiv.appendChild(spanDiv)
  return labelDiv
};


function createTrashCan(){
  let div = document.createElement('div')
  div.setAttribute('data-number', myLibrary.length - 1)
  div.id = 'theDiv'
  let trashDiv = document.createElement('i')
  trashDiv.classList = 'fa fa-trash-o fa-2x'
  div.appendChild(trashDiv)
  trashDiv.addEventListener('click', deleteLine)
  trashDiv.setAttribute('data-number', myLibrary.length - 1)
  return div
};

function deleteLine(e) {
  let dataA = e.target.getAttribute('data-number') 
  let dataFromDiv = Array.from(document.querySelectorAll(`h3[data-number="${dataA}"]`))
   dataFromDiv.forEach(item => {
     bookTitleContainer = document.getElementById('book-title-container')
     bookTitleContainer.removeChild(item)
  })
     bookRemoved = myLibrary.splice(dataA, 1)
     e.target.parentElement.remove()
     e.target.remove()
 };

