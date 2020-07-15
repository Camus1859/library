let myLibrary = [];
let title;
let author;
let numberOfPages;
let string;
let bookTitleContainer = document.getElementById('book-title-container')
let userButtonsContainer
let h3;
let book1; 
let submitButton = document.getElementById('submit-button');
let addBookButton = document.getElementById('add-book-button');
let checkBox2 = document.getElementById('checkBox2')

submitButton.addEventListener('click', function(){
  let ui = new UI()
 return ui.addBookToLibrary()
});

addBookButton.addEventListener('click', visibilityOn);

function noDisplay() {
  userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
};
noDisplay();

function Book(title, author, numberOfPages, status) {
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages
  this.status = status
};

function UI(){}


UI.prototype.createInfoLine = function(book1){
  for(let property in book1){
    if (book1.hasOwnProperty(property)) {
    h3 = document.createElement('h3');
    if (`${book1[property]}` == "No" || `${book1[property]}` == 'Yes') {
      continue; 
    }else {
       newContent = document.createTextNode(`${book1[property]}`)
    }h3.classList.add('eachBook')
    h3.appendChild(newContent);
    bookTitleContainer = document.getElementById('book-title-container')
    theBookLine = bookTitleContainer.appendChild(h3)
      theBookLine.setAttribute('data-number', myLibrary.length -1)
    }
  }
  let ui = new UI()
  bookTitleContainer.appendChild(ui.createToggleButton(book1))

  bookTitleContainer.appendChild(ui.createTrashCan())
};

UI.prototype.deleteLine = function(e){
  let dataA = e.target.getAttribute('data-number') 
  let dataFromDiv = Array.from(document.querySelectorAll(`h3[data-number="${dataA}"]`))
   dataFromDiv.forEach(item => {
     bookTitleContainer = document.getElementById('book-title-container')
     bookTitleContainer.removeChild(item)
     let dataFromLabel = Array.from(document.querySelectorAll(`label[data-number="${dataA}"]`))
     dataFromLabel.forEach(item =>{
      bookTitleContainer = document.getElementById('book-title-container')
      bookTitleContainer.removeChild(item)
     })
  })
     bookRemoved = myLibrary.splice(dataA, 1)
     e.target.parentElement.remove()
     e.target.remove()
}

UI.prototype.addBookToLibrary = function() {
  title = document.getElementById('book-title').value
  author = document.getElementById('author').value
  numberOfPages = document.getElementById('pages').value;
  if (title === "" || author === "" || numberOfPages === "")  {
    alert("Please Fill All Lines")
    return false;
  }else{
  visibilityOff()
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'grid' 
  checkBox = document.getElementById('checkBox')
  checkBox.checked == true ? status = "Yes" : status ='No'
  book1 = new Book(title, author, numberOfPages, status)
  myLibrary.push(book1)
  let ui = new UI()
  ui.createInfoLine(book1)
  }
};

function visibilityOff(){
  userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
};

function visibilityOn() {
  userButtonsContainer = document.getElementById('user-buttons-container').style.display = ''
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
  document.getElementById("myForm").reset()
};


UI.prototype.createToggleButton = function(book1){
  let labelDiv = document.createElement('label')
  labelDiv.setAttribute('data-number', myLibrary.length - 1)
  labelDiv.classList = 'switch'
  labelDiv.id = 'toggle-button'
  inputDiv = document.createElement('input')
  inputDiv.setAttribute('type', 'checkbox')
  inputDiv.setAttribute('data-number', myLibrary.length - 1)
  inputDiv.id = 'checkBox2'
  labelDiv.appendChild(inputDiv)
  let spanDiv = document.createElement('span')
  spanDiv.setAttribute('data-number', myLibrary.length - 1)
  spanDiv.classList = ('slider round')
  labelDiv.insertBefore(spanDiv, inputDiv.nextSibling);
  book1.status == "Yes" ? inputDiv.checked = true : inputDiv.checked = false
  inputDiv.addEventListener('click', function(event) {;
  toggleClickedNumber = event.target.getAttribute('data-number')
  bookItem = myLibrary[toggleClickedNumber]
  bookItem.toggle()
  })
  return labelDiv
};

Book.prototype.toggle = function(){
  if (this.status === "Yes"){
    this.status = 'No'
  } else if (this.status === 'No'){
    this.status = 'Yes'
  }
}

UI.prototype.createTrashCan = function(){
  let div = document.createElement('div')
  div.setAttribute('data-number', myLibrary.length - 1)
  div.id = 'theDiv'
  let trashDiv = document.createElement('i')
  trashDiv.classList = 'fa fa-trash-o fa-2x'
  div.appendChild(trashDiv)
  let ui = new UI()
  trashDiv.addEventListener('click', ui.deleteLine)
  trashDiv.setAttribute('data-number', myLibrary.length - 1)
  return div
};


  
