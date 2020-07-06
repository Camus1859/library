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
}

noDisplay()

submitButton.addEventListener('click', addBookToLibrary);
addBookButton.addEventListener('click', visibilityOn);
submitButton.addEventListener('click', submitBookinfo);



function Book(title, author, numberOfPages) {
  this.title = title,
  this.author = author,
  this.numberOfPages = numberOfPages
}

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
 allArrayData = {1:lastBook.title, 2:lastBook.author, 3:lastBook.numberOfPages, 4:status}
 createInfoLine(allArrayData)
}

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
}

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
  bookTitleContainer.appendChild(createTrashCan())
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
}

// function deleteLine(e) {
//   dataA = e.target.getAttribute('data-number')
//   e.target.remove()

//   let dataFromDiv = Array.from(document.querySelectorAll(`h3[data-number="${dataA}"]`))
//   dataFromDiv.forEach(item => {
//     bookTitleContainer = document.getElementById('book-title-container')
//     bookTitleContainer.removeChild(item)
// })
    
//     bookRemoved = myLibrary.splice(myLibrary[dataA], 1)
//     let iDel =(document.querySelector(`i[data-number="${dataA}"]`))

//     theDiv = document.getElementById('theDiv')
//     theDiv.removeChild(iDel)
//     console.log(iDel)

//     bookTitleContainer.removeChild(theDiv)
// }

function deleteLine(e) {
  let dataA = e.target.getAttribute('data-number')
  console.log(dataA)
 
   let dataFromDiv = Array.from(document.querySelectorAll(`h3[data-number="${dataA}"]`))
   dataFromDiv.forEach(item => {
     bookTitleContainer = document.getElementById('book-title-container')
     bookTitleContainer.removeChild(item)
 })
     bookRemoved = myLibrary.splice(myLibrary[dataA], 1)
     console.log(e.target)
     e.target.parentElement.remove()
     e.target.remove()
 }



// function deleteLine() {
//   let theBooks = Array.from(document.querySelectorAll('.eachBook'))
//     theBooks.forEach(book => {
//       data = book.getAttribute('data-number') 
//       console.log(data)
//     })
//       for(let i = 0; i < myLibrary.length; i++) {
//         num = myLibrary.indexOf(myLibrary[i])
//         console.log(num)
//         if (num == data) {
//       }
//     }
//   }


