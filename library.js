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

submitButton.addEventListener('click', addBookToLibrary);
addBookButton.addEventListener('click', visibilityOn);

function noDisplay() {
  userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
  bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
};
noDisplay();

// Book Constructor 
function Book(title, author, numberOfPages, status) {
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages
  this.status = status
};

// UI Constructor
function UI() {}

UI.prototype.createInfoLine = function(book1){
    h3 = document.createElement('h3');
    newContent = document.createTextNode(`${book1.title}`)
    newContent = document.createTextNode(`${book1.author}`)
    newContent = document.createTextNode(`${book1.numberOfPages}`)
    newContent = document.createTextNode(`${book1.status}`)
    h3.classList.add('eachBook')
    h3.appendChild(newContent);
    bookTitleContainer = document.getElementById('book-title-container')
    x = bookTitleContainer.appendChild(h3)
      x.setAttribute('data-number', myLibrary.length -1)
    
  
  bookTitleContainer.appendChild(createToggleButton(book1))
  bookTitleContainer.appendChild(createTrashCan())

}






function addBookToLibrary(){
  //Get users values
  title = document.getElementById('book-title').value
  author = document.getElementById('author').value
  numberOfPages = document.getElementById('pages').value;

  // Instantiate book
  book1 = new Book(title, author, numberOfPages, status)

  //Instantiate UI
  let ui = new UI();

  //Add book to list
  ui.createInfoLine(book1);
  



  if (title === "" || author === "" || numberOfPages === "")  {
    alert("Please Fill All Lines")
    return false;
  }else{
    visibilityOff()
    bookTitleContainer = document.getElementById('book-title-container').style.display = 'grid'
    checkBox = document.getElementById('checkBox')
    checkBox.checked == true ? status = "Yes" : status ='No'
    myLibrary.push(book1)
    createInfoLine(book1)
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

// function createInfoLine(obj) {
//   for(let property in obj){
//     if (obj.hasOwnProperty(property)) {
//     h3 = document.createElement('h3');
//     if (`${obj[property]}` == "No" || `${obj[property]}` == 'Yes') {
//       continue; 
//     }else {
//        newContent = document.createTextNode(`${obj[property]}`)
//     }
//     h3.classList.add('eachBook')
//     h3.appendChild(newContent);
//     bookTitleContainer = document.getElementById('book-title-container')
//     x = bookTitleContainer.appendChild(h3)
//       x.setAttribute('data-number', myLibrary.length -1)
//     }
//   }
//   bookTitleContainer.appendChild(createToggleButton(obj))
//   bookTitleContainer.appendChild(createTrashCan())
// };

function createToggleButton(obj) {
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
  obj.status == "Yes" ? inputDiv.checked = true : inputDiv.checked = false
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
     let dataFromLabel = Array.from(document.querySelectorAll(`label[data-number="${dataA}"]`))
     dataFromLabel.forEach(item =>{
      bookTitleContainer = document.getElementById('book-title-container')
      bookTitleContainer.removeChild(item)
     })
  })
     bookRemoved = myLibrary.splice(dataA, 1)
     e.target.parentElement.remove()
     e.target.remove()
 };

  
