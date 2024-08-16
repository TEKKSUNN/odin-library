document.addEventListener("DOMContentLoaded", function() {
    // Dialog Configuration
    const dialog = document.getElementById("add-book-dialog");
    const closeDialog = document.getElementById("close-dialog");
    closeDialog.addEventListener("click", function() {
        dialog.close();
    });
    const addBook = document.getElementById("add-book");
    addBook.addEventListener("click", function() {
        dialog.showModal();
    });

    // Construct Book Object
    const Book = function(name) {
        this.name = name;
    };

    // Construct Library Object
    const Library = function() {
        // Make "this" or the Library object be an Array for storing books
        Object.setPrototypeOf(this, Array.prototype)

        // Checks if a book name is in the library
        this.inLibrary = function(bookName) {
            this.forEach((bookObject) => {
                if (bookObject.name === bookName) {
                    window.alert("Book already exists.")
                    return true;
                }
            });
            return false;
        };

        // Adds book to library
        this.addBook = function(bookName) {
            // Check if book name is in the library
            if (myLibrary.inLibrary(bookName)) {
                window.alert(`Book name ${bookName} already in local library.`);
                return;
            }
            newBook = new Book(bookName);
            this.push(newBook);
        };

        // Shows book names
        this.showBookNames = function() { 
            this.forEach(function(bookObject) {
                console.log(bookObject.name);
            });
        };
    };

    // Create library variable
    let myLibrary = new Library();
});