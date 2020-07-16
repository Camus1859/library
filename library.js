let myLibrary = [];
function UI(){};
let submitButton = document.getElementById('submit-button');
let addBookButton = document.getElementById('add-book-button');
let add = (function () {
  let counter = -1;
  return function () {
    counter = counter + 1;
    return counter
  }
})()

submitButton.addEventListener('click', function(){
  let ui = new UI()
  ui.addBookToLibrary()
});

addBookButton.addEventListener('click', function(){
  let ui = new UI()
  ui.visibilityOn()
});

UI.prototype.noDisplay = function() {
 let userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
 let bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
};
// look into "DOMContentLoaded"
let ui = new UI();
ui.noDisplay();

UI.prototype.visibilityOff = function(){
  let userButtonsContainer = document.getElementById('user-buttons-container').style.display = 'none'
};
let ui2 = new UI();
ui2.visibilityOff();

UI.prototype.visibilityOn = function() {
  let userButtonsContainer = document.getElementById('user-buttons-container').style.display = ''
  let bookTitleContainer = document.getElementById('book-title-container').style.display = 'none'
  document.getElementById("myForm").reset()
};

// Perhaps you can figure out a way to include an id, so then you can pass this down to other functions that need a unique ID tied to the Book instance and the DOM
function Book(title, author, numberOfPages, status) {
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages
  this.status = status
};

UI.prototype.createInfoLine = function(book1){
  counter = add()
  for(let property in book1){
    if (book1.hasOwnProperty(property)) {
    let h3 = document.createElement('h3');
    if (`${book1[property]}` == "No" || `${book1[property]}` == 'Yes') {
      continue; 
    }else {
       newContent = document.createTextNode(`${book1[property]}`)
    }
    h3.classList.add('eachBook')
    h3.appendChild(newContent);
    let bookTitleContainer = document.getElementById('book-title-container')
    let theBookLine = bookTitleContainer.appendChild(h3)
    theBookLine.setAttribute('data-number', counter )
    }
  }
  // UI might be a great thing to instantiate in the global space because we need it in so many places. that's an example of an appropriate variable to have globally
  let ui = new UI()
  let bookTitleContainer = document.getElementById('book-title-container')
  bookTitleContainer.appendChild(ui.createToggleButton(book1))
  bookTitleContainer.appendChild(ui.createTrashCan())
};

UI.prototype.deleteLine = function(e){

  let dataA = e.target.getAttribute('data-number')
  console.log(dataA)
  // Consider reducing the number of loops you have here
  // all of your elements have 1 commonality- the data number. No need to have separate loops to delete them.  
  let dataFromDiv = Array.from(document.querySelectorAll(`h3[data-number="${dataA}"]`))
   dataFromDiv.forEach(item => {
     let bookTitleContainer = document.getElementById('book-title-container')
     bookTitleContainer.removeChild(item)

     // there is only one Label per row, so this doesn't have to be an array, nor does it have to be a looop
     let dataFromLabel = Array.from(document.querySelectorAll(`label[data-number="${dataA}"]`))
     dataFromLabel.forEach(item =>{
      bookTitleContainer.removeChild(item)
     })
  })

  // this is a Book prototype method
  // separation of concerns, we do not want to give UI based functions power to alter things to do with Book objects, we only want to focus on the DOM/UI
     bookRemoved = myLibrary.splice(dataA, 1)
     e.target.parentElement.remove()
     e.target.remove()
     // not sure what this is meant to achieve
     
    //  let dataNumAll = Array.from(document.querySelectorAll(`[data-number]`))
    //  dataNumAll.forEach(item => {
    //    dataB = item.getAttribute('data-number')
    //    if (dataB === "0" ) {
    //      return;
    //    }else{
    //     item.setAttribute('data-number', dataB - 1) 
    //    }
    //  })
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
  let book1 = new Book(title, author, numberOfPages, status)
  myLibrary.push(book1)
  let ui = new UI()
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
  inputDiv.setAttribute('data-number', counter )
  spanDiv.setAttribute('data-number', counter )
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
  div.setAttribute('data-number', counter )
  div.id = 'theDiv'
  let trashDiv = document.createElement('i')
  trashDiv.setAttribute('data-number', counter )


  trashDiv.classList = 'fa fa-trash-o fa-2x'
  div.appendChild(trashDiv)
  let ui = new UI()
  trashDiv.addEventListener('click', ui.deleteLine)
 
  return div
};


  
