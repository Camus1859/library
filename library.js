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
    console.log(typeof counter)
    return counter
  }
})()


class Book {
  constructor (title, author, numberOfPages, status, counter) {
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages
  this.status = status
  this.counter = counter
  }

 static bookFilter(e){
    let dataA = e.target.parentElement.getAttribute('data-number')
    myLibrary = myLibrary.filter(book => {
      return book.counter != dataA
    })
    ui.remElement(e)
  }

  findNum(){
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

pushBook(){
  myLibrary.push(this)
}
  
}

class UI {
  noDisplay() {
    let userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
    bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
   };

   visibilityOff(){
    let userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
  };

  visibilityOn() {
    let userButtonsContainer = document.getElementById('user-buttons-container').style.display = ''
    bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
    document.getElementById("myForm").reset()
  };

  createInfoLine(book1){
    let newContent;
    for(let key in book1){
      if (book1.hasOwnProperty(key)) {
      let h3 = document.createElement('h3');
      if (`${key}` == 'status'  || `${key}` == 'counter') {
        continue; 
      }else{
        console.log(key)
         newContent = document.createTextNode(`${book1[key]}`)
      }
      h3.classList.add('eachBook')
      h3.appendChild(newContent);
      bookTitleContainer = document.getElementById('book-title-container')
      let theBookLine = bookTitleContainer.appendChild(h3)
      theBookLine.setAttribute('data-number', book1.counter )
      }
    }
    bookTitleContainer = document.getElementById('book-title-container')
    bookTitleContainer.appendChild(ui.createToggleButton(book1))
    bookTitleContainer.appendChild(ui.createTrashCan(book1))
  };

  deleteLine(e){
    let dataA = e.target.parentElement.getAttribute('data-number');
    let titleOfBookDeleted = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
    let currentBooksInStorage = JSON.parse(localStorage.getItem('Library'))
   let updatedBooksInStorage = currentBooksInStorage.filter(book =>{
     return book.title != titleOfBookDeleted
    })
  localStorage.setItem('Library', JSON.stringify(updatedBooksInStorage))
    let dataFromDiv = Array.from(document.querySelectorAll(`[data-number="${dataA}"]`))
     dataFromDiv.forEach(item => {
       bookTitleContainer = document.getElementById('book-title-container')
       bookTitleContainer.removeChild(item)
       })
      // this shouldn't necessarily be in your UI prototype
       Book.bookFilter(e) 
  }

  remElement(e){
    e.target.parentElement.remove();
    e.target.remove(); 
  }

  addBookToLibrary() {
   let title = document.getElementById('book-title').value
   let author = document.getElementById('author').value
   let numberOfPages = document.getElementById('pages').value;
    if (title === "" || author === "" || numberOfPages === "")  {
      alert("Please Fill All Lines")
      return false;
    }else{
    ui.visibilityOff()
   let bookTitleContainer = document.getElementById('book-title-container').style.display = 'grid' 
   let checkBox = document.getElementById('checkBox')
    checkBox.checked == true ? status = "Yes" : status ='No'
   let book1 = new Book(title, author, numberOfPages, status, add())
   console.log(book1)
    book1.pushBook()
    ui.createInfoLine(book1)
    }
  };

  createToggleButton(book1){
    let labelDiv = document.createElement('label')
    labelDiv.classList = 'switch'
    labelDiv.id = 'toggle-button'
    let inputDiv = document.createElement('input')
    inputDiv.setAttribute('type', 'checkbox')
    inputDiv.id = 'checkBox2'
    labelDiv.appendChild(inputDiv)
    let spanDiv = document.createElement('span')
    spanDiv.classList = ('slider round')
    labelDiv.insertBefore(spanDiv, inputDiv.nextSibling);
    book1.status == "Yes" ? inputDiv.checked = true : inputDiv.checked = false
    labelDiv.setAttribute('data-number', book1.counter )
    inputDiv.addEventListener('click', toggleClicked)
    return labelDiv
  }
  createTrashCan(book1){
    let div = document.createElement('div')
    div.setAttribute('data-number', book1.counter)
    div.id = 'theDiv'
    let trashDiv = document.createElement('i')
    trashDiv.classList = 'fa fa-trash-o fa-2x'
    div.appendChild(trashDiv)
    trashDiv.addEventListener('click', ui.deleteLine)
    return div
  };
};

let ui = new UI()
ui.noDisplay();
ui.visibilityOff();


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

