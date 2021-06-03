const STORAGE_KEY = "BOOKSHELF_APPS";

let shelfs = [];

function isStorageExist() {
    if(typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(shelfs);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"))
}

function loadDataFromStorage() {
    const serializedData  = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if(data !== null) {
        shelfs = data;
        console.log(shelfs);
    }

    document.dispatchEvent(new Event("ondataLoaded"));

}

function updateDataToStorage()  {
    if (isStorageExist()) {
        saveData();
    }
}

function composeShelfObject(bookTitle, bookAuthor, bookYear, isCompleted) {
    return {
        id: +new Date(),
        bookTitle,
        bookAuthor,
        bookYear,
        isCompleted
    };
}

function findShelf(shelfId) {

    for (shelf of shelfs) {
        if(shelf.id === shelfId) {
            return shelf;
        }
    }
    
    return null;
}   

function findShelfIndex(shelfId) {
    let index = 0;
    for(shelf of shelfs) {
        if(shelf.id === shelfId) {
            return index;
        }
        index++;
    }
    return -1;
}