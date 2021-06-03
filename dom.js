const UNCOMPLETED_LIST_SHELF_ID = "incompleteBookshelfList";

const COMPLETED_LIST_SHELF_ID = "completeBookshelfList";

const SHELF_ITEMID = "itemId";

// input user
function addShelf() {
    const unCompletedShelfId = document.getElementById(UNCOMPLETED_LIST_SHELF_ID);
    const completeBookShelfList = document.getElementById(COMPLETED_LIST_SHELF_ID);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;

    // checkbox
    const checkbox = document.getElementById("inputBookIsComplete");

    let shelf = "";
    const shelfObject = composeShelfObject(bookTitle, bookAuthor, bookYear, false);

    shelf[SHELF_ITEMID] = shelfObject.id;
    shelfs.push(shelfObject);
    
    if(checkbox.checked) {
        shelf = makeShelf(bookTitle, bookAuthor, bookYear, true);
        completeBookShelfList.append(shelf);
    } else {
        shelf = makeShelf(bookTitle, bookAuthor, bookYear, false);
        unCompletedShelfId.append(shelf);
    }
    updateDataToStorage();
    // end checkbox
}
// end input user

// make element
function makeShelf(dataTitle, dataAuthor, dataYear, isCompleted) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = dataTitle;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.innerText = dataAuthor;
    
    const bookYear = document.createElement("p");
    bookYear.classList.add("bookYear");
    bookYear.innerText = dataYear;
    
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");
    bookItem.append(bookTitle, bookAuthor, bookYear);

    if(isCompleted) {
        bookItem.append(createUndoButton(), createTrashButton());
    } else {
        bookItem.append(createCheckButton(), createTrashButton());
    }
    
    return bookItem;
}   
// end make Element

// checkbox
function checkbox() {

    const checkbox = document.getElementById("inputBookIsComplete");

    checkbox.addEventListener("change", function(){

        if(checkbox.checked == false) {
            document.querySelector("span").innerText = "belum selesai dibaca";
        } else {
            document.querySelector("span").innerText = "selesai dibaca";
        }
        
    })
}
// end checkbox

// create button for all
function createButton(buttonTypeClass, textButton, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = textButton;

    button.addEventListener("click", function(event){
        eventListener(event);
        event.stopPropagation();
    });

    return button;

}
// end create button for all

// create checkButton
function createCheckButton() {
    return createButton("green", "Selesai dibaca", function(event){
        addTaskToCompleted(event.target.parentElement);
    })
}

function addTaskToCompleted(taskElement) {
    
    const listCompleted = document.getElementById(COMPLETED_LIST_SHELF_ID);
    
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > .bookAuthor").innerText;
    const bookYear = taskElement.querySelector(".book_item > .bookYear").innerText;

    const newShelf = makeShelf(bookTitle, bookAuthor, bookYear, true);

    const shelf = findShelf(taskElement[SHELF_ITEMID]);
    shelf.isCompleted = true;
    newShelf[SHELF_ITEMID] = shelf.id;

    listCompleted.append(newShelf);

    taskElement.remove();

    updateDataToStorage();  
}
// end CheckButton

// create Trash Button
function createTrashButton() {
    return createButton("red", "Hapus Buku", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    })
}

function removeTaskFromCompleted(taskElement) {
    const shelfPosition = findShelfIndex(taskElement[SHELF_ITEMID])
    shelfs.splice(shelfPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}
// end create Trash Button

// create Undo Button
function createUndoButton() {
    return createButton("green", "Belum Selesai dibaca", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function undoTaskFromCompleted(taskElement){

    const listUnCompleted = document.getElementById(UNCOMPLETED_LIST_SHELF_ID);

    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > .bookAuthor").innerText;
    const bookYear = taskElement.querySelector(".book_item > .bookYear").innerText;

    const newShelf = makeShelf(bookTitle, bookAuthor, bookYear, false);

    const shelf = findShelf(taskElement[SHELF_ITEMID]);
    shelf.isCompleted = false;
    newShelf[SHELF_ITEMID] = shelf.id;

    listUnCompleted.append(newShelf);

    taskElement.remove();
    updateDataToStorage();
}
// end create Undo Button

function refreshDataFromShelf() {
    const listUnCompleted = document.getElementById(UNCOMPLETED_LIST_SHELF_ID);
    const listCompleted = document.getElementById(COMPLETED_LIST_SHELF_ID);

    for(shelf of shelfs) {
        const newShelf = makeShelf(shelf.bookTitle, self.bookAuthor, shelf.bookYear, shelf.isCompleted);
        newShelf[SHELF_ITEMID] = shelf.id;

        if(shelf.isCompleted) {
            listCompleted.append(newShelf);
        } else {
            listUnCompleted.append(newShelf);
        }
    }
}