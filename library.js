let myLibrary = [];
let submitButton = document.getElementById('submit-button');
let addBookButton = document.getElementById('add-book-button');


submitButton.addEventListener('click', function(){
  ui.addBookToLibrary()
});
addBookButton.addEventListener('click', function(){
  ui.visibilityOn()
});


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
let book1 = new Book()

Book.prototype.toggle = function(){
  if (this.status === "Yes"){
    this.status = 'No'
  } else if (this.status === 'No'){
    this.status = 'Yes'
  }
}

function UI(){};
let ui = new UI()
let ui2 = new UI();

UI.prototype.noDisplay = function() {
 let userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
 let bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
};
// look into "DOMContentLoaded"
ui.noDisplay();

UI.prototype.visibilityOff = function(){
  let userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
};
ui2.visibilityOff();


UI.prototype.visibilityOn = function() {
  let userButtonsContainer = document.getElementById('user-buttons-container').style.display = ''
  let bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
  document.getElementById("myForm").reset()
};

UI.prototype.createInfoLine = function(book1){
  counter 
  for(let property in book1){
    if (book1.hasOwnProperty(property)) {
    let h3 = document.createElement('h3');
    if (`${book1[property]}` == "No" || `${book1[property]}` == 'Yes') {
      continue; 
    }else if(`${book1[property]}` >= 0){
      continue;
    }else{
       newContent = document.createTextNode(`${book1[property]}`)
    }
    h3.classList.add('eachBook')
    h3.appendChild(newContent);
    let bookTitleContainer = document.getElementById('book-title-container')
    let theBookLine = bookTitleContainer.appendChild(h3)
    theBookLine.setAttribute('data-number', counter )
    }
  }
  let bookTitleContainer = document.getElementById('book-title-container')
  bookTitleContainer.appendChild(ui.createToggleButton(book1))
  bookTitleContainer.appendChild(ui.createTrashCan())
};

UI.prototype.deleteLine = function(e){
  let dataA = e.target.parentElement.getAttribute('data-number');

  let dataFromDiv = Array.from(document.querySelectorAll(`[data-number="${dataA}"]`))
   dataFromDiv.forEach(item => {
     let bookTitleContainer = document.getElementById('book-title-container')
     bookTitleContainer.removeChild(item)
     })
    
     book1.bookFilter(e)
}

Book.prototype.bookFilter = function(e){
  let dataA = e.target.parentElement.getAttribute('data-number')
  myLibrary = myLibrary.filter(book => {
    return book.counter != dataA
  })
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
  ui2.visibilityOff()
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'grid' 
  checkBox = document.getElementById('checkBox')
  checkBox.checked == true ? status = "Yes" : status ='No'
  book1 = new Book(title, author, numberOfPages, status)
  myLibrary.push(book1)
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
  // inputDiv.setAttribute('data-number', counter )
  // spanDiv.setAttribute('data-number', counter )
  inputDiv.addEventListener('click', function(event) {;
  toggleClickedNumber = event.target.getAttribute('data-number')
  bookItem = myLibrary.find(book => book.counter == toggleClickedNumber)
  bookItem.toggle()
  })
  return labelDiv
};

UI.prototype.createTrashCan = function(){
  let div = document.createElement('div')
  div.setAttribute('data-number', counter )
  div.id = 'theDiv'
  let trashDiv = document.createElement('i')
  // trashDiv.setAttribute('data-number', counter )
  trashDiv.classList = 'fa fa-trash-o fa-2x'
  div.appendChild(trashDiv)
  trashDiv.addEventListener('click', ui.deleteLine)
  return div
};


  
