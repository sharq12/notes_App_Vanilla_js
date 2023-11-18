import { renderNotes } from "./app.js"

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

let showArchivedNotes = document.querySelector(".archive-notes-container");


showArchivedNotes.addEventListener("click", (event)=>{
    let noteId = event.target.dataset.id;
    let type = event.target.dataset.type;

    switch (type){
        case "del":
            arrayOfNotes = arrayOfNotes.filter((note)=> note.id.toString() !== noteId);
            showArchivedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isArchived})=> isArchived === true))
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;

        case "archived":
            arrayOfNotes = arrayOfNotes.map((note)=> note.id.toString() === noteId? {...note, isArchived: !note.isArchived}: note);
            showArchivedNotes = renderNotes(arrayOfNotes.filter((note)=>note.isArchived === true));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;  
    }
})

showArchivedNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=>note.isArchived === true));

