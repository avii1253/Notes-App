
import { renderNotes } from "./app.js";

let title = document.querySelector(".title");
let note = document.querySelector(".note");
let addButton = document.querySelector(".button");
let notesContainer = document.querySelector(".notes-display");
let showPinned = document.querySelector(".pinned-notes-container");
let showOthers = document.querySelector(".notes-container");
let pinTitle = document.querySelector(".pin-title");
let othertitle = document.querySelector(".other-title");
let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

if (arrayOfNotes.length > 0) {
    pinTitle.classList.toggle("d-none");
    othertitle.classList.toggle("d-none");
}

notesContainer.addEventListener("click", (event) => {
    let type = event.target.dataset.type;
    let noteID = event.target.dataset.id;

    switch (type) {
        case "del":
            arrayOfNotes = arrayOfNotes.filter(({ id }) => {
                return id.toString() !== noteID;
            });
            showOthers.innerHTML = renderNotes(arrayOfNotes);
            showPinned.innerHTML = renderNotes(arrayOfNotes);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;

        case "pinned":
            arrayOfNotes = arrayOfNotes.map((note) => note.id.toString() === noteID ? {
                ...note,
                isPinned: !note.isPinned
            } : note);
            showOthers.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned, isArchived }) =>
                isPinned === false && isArchived === false
            ))
            showPinned.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned, isArchived }) =>
                isPinned === true && isArchived === false
            ));

            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;

        case "archived":
            arrayOfNotes = arrayOfNotes.map((note) => note.id.toString() === noteID ? {
                ...note,
                isArchived: !note.isArchived,
                isPinned: false
            } : note);

            showOthers.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned, isArchived }) =>
                isArchived === false && isPinned === false
            ));

            showPinned.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned, isArchived }) =>
                isArchived === false && isPinned === true
            ));

            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
    }
});

addButton.addEventListener("click", (event) => {
    if (title.value && note.value) {
        arrayOfNotes = [...arrayOfNotes, { id: Date.now(), title: title.value, note: note.value, isPinned: false, isArchived: false }];

        showOthers.innerHTML = renderNotes(arrayOfNotes);   // this function will create a html for each value in the array and return to innerHTML and this will return an array 

        localStorage.setItem("notes", JSON.stringify(arrayOfNotes));

        //clearing the data in the textarea
        title.value = note.value = "";
    }
    
});

showOthers.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned, isArchived }) =>
    isPinned === false && isArchived === false
));

showPinned.innerHTML = renderNotes(arrayOfNotes.filter(({ isPinned, isArchived }) =>
    isPinned === true && isArchived === false
))
