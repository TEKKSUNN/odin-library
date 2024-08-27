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
    class Book {
        constructor(name) {
            this.name = name;
            this.read = false;
        }
    };

    // Construct Library Object
    class Library extends Array {
        // Checks if a book name is in the library
        inLibrary = function(bookName) {
            let res = false;
            this.forEach((bookObject) => {
                if (bookObject.name === bookName) {
                    res = true;
                }
            });
            return res;
        };

        // Adds book to library
        addBook = function(bookName) {
            // Check if book name is in the library
            if (myLibrary.inLibrary(bookName)) {
                window.alert(`Book name \"${bookName}\" already in local library.`);
                return;
            }
            const newBook = new Book(bookName);
            this.push(newBook);
            this.history.push(`Added book \"${bookName}\".`);
            this.update();
        };

        // Shows book names
        showBookNames = function() { 
            this.forEach(function(bookObject) {
                console.log(bookObject.name);
            });
        };

        // Delete a book
        removeBook = function(bookName) {
            this.forEach(function(bookObject, index) {
                if (bookObject.name === bookName) {
                    this.splice(index, 1);
                }
            }.bind(this));
            this.history.push(`Deleted book \"${bookName}\".`);
            this.update();
        };

        // Change "read" state of a book
        readStatus = function(bookName, boolValue) {
            this.forEach(function(bookObject) {
                if (bookObject.name === bookName) {
                    bookObject.read = boolValue;
                }
            });
        };

        // Update book list tab
        updateBookList = function() {
            const bookList = document.querySelector("section.book-list > ul.articles");
            const newList = document.createElement("ul");
            this.forEach(function(bookObject, index) {
                const newItem = document.createElement("li");
                newItem.textContent = bookObject.name;
                const delItem = document.createElement("button");
                delItem.className = "delete-item";
                delItem.textContent = "Delete";

                // Add Read Check Box
                const readCheckBox = document.createElement("div");
                readCheckBox.className = "read-checkbox";
                const readLabel = document.createElement("label");
                readLabel.setAttribute("for", `read-item-${index}`);
                readLabel.textContent = "READ:"
                const readItem = document.createElement("input");
                readItem.setAttribute("id", `read-item-${index}`);
                readItem.setAttribute("type", "checkbox");
                readItem.setAttribute("name", `read-item-${index}`);
                readItem.className = "read-item-checkbox";
                readCheckBox.appendChild(readLabel);
                readCheckBox.appendChild(readItem);

                newItem.appendChild(readCheckBox);
                newItem.appendChild(delItem);
                newList.appendChild(newItem);
            });
            bookList.innerHTML = newList.innerHTML;
            const DEL_BUTTONS = Array.from(document.querySelectorAll(".delete-item"));
            DEL_BUTTONS.forEach(function(button) {
                button.addEventListener("click", (event) => {
                    const target = event.target;
                    const bookName = target.parentNode.firstChild.textContent;
                    this.removeBook(bookName);
                });
                console.log(button.attributes);
            }.bind(this));
            const READ_ITEM_CHECKBOXES = Array.from(document.querySelectorAll(".read-item-checkbox"));
            READ_ITEM_CHECKBOXES.forEach(function(checkboxElement) {
                checkboxElement.addEventListener("click", (event) => {
                    const target = event.target;
                    const bookName = target.parentNode.parentNode.firstChild.textContent;
                    this.readStatus(bookName, target.checked);
                    this.history.push(`Changed \"read\" state of book \"${bookName}\" to ${target.checked}`);
                    this.updateHistory();
                });
            }.bind(this));
        };

        // Create history property
        history = [];

        // Update "History" tab
        updateHistory = function() {
            const history = document.querySelector("section.history > ul.articles");
            const newList = document.createElement("ul");
            this.history.forEach(function(action) {
                const newItem = document.createElement("li");
                newItem.textContent = action;
                newList.appendChild(newItem);
            });
            history.innerHTML = newList.innerHTML;
            history.scrollTop = history.scrollHeight - history.clientHeight;
        }

        // Update
        update = function() {
            this.updateBookList();
            this.updateHistory();
        }
    };

    // Create library variable
    let myLibrary = new Library();
    const defaultBooks = ["The Great Gatsby", "Catch-22", "Wuthering Heights", "To Kill a Mockingbird", "The Catcher in the Rye", "Mrs Dalloway"];
    defaultBooks.forEach((bookName) => myLibrary.addBook(bookName));

    // Add new books through webpage
    const form = document.querySelector("dialog > div > form");
    form.addEventListener("submit", function() {
        bookElement = document.getElementById("book-name");
        bookName = bookElement.value.trim();
        if (bookName === "") {
            return;
        }
        myLibrary.addBook(bookName);
    });
});