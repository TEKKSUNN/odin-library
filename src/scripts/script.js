document.addEventListener("DOMContentLoaded", function() {
    const dialog = document.getElementById("add-book-dialog");
    const closeDialog = document.getElementById("close-dialog");
    closeDialog.addEventListener("click", function() {
        dialog.close();
    });
    const addBook = document.getElementById("add-book");
    addBook.addEventListener("click", function() {
        dialog.showModal();
    });
});