import { renderNotes } from "./app.js";

let mainArchivedContainer = document.querySelector(".archive-notes");
let archiveNotes = document.querySelector(".archive-notes-container");

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];
// arrayOfNotes = arrayOfNotes.filter(({ isArchived }) => isArchived === true);


mainArchivedContainer.addEventListener("click", (event) => {
    let type = event.target.dataset.type;
    let noteID = event.target.dataset.id;

    switch (type) {
        case "del":
            arrayOfNotes = arrayOfNotes.filter(({ id }) =>
                id.toString() !== noteID
            )
            archiveNotes.innerHTML = renderNotes(arrayOfNotes);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "pinned":
            arrayOfNotes = arrayOfNotes.map((note) => note.id.toString() === noteID ? { ...note, isArchived: !note.isArchived, isPinned: !note.isPinned } : note);
            archiveNotes.innerHTML = renderNotes(arrayOfNotes.filter(({ isArchived }) =>
                isArchived === true
            ));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "archived":

            arrayOfNotes = arrayOfNotes.map((note) => note.id.toString() === noteID ? { ...note, isArchived: !note.isArchived } : note);
            archiveNotes.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned, isArchived }) =>
                isArchived === true
            ));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
    }

})


archiveNotes.innerHTML = renderNotes(arrayOfNotes.filter(({ isArchived }) =>
    isArchived === true
));