debugger;
import { renderNotes } from "./app.js";
let title = document.querySelector(".title");
let note = document.querySelector(".note");
let addNoteButton = document.querySelector(".add-btn");
let notesDisplay = document.querySelector(".notes-display");
let showPinnedNotes = document.querySelector(".pinned-notes-container");
let showOtherNotes = document.querySelector(".notes-container");
let pinnedTitle = document.querySelector(".pin-title ");
let otherTitle = document.querySelector(".other-title");


let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

if(arrayOfNotes.length > 0){
    pinnedTitle.classList.toggle("d-none");
    otherTitle.classList.toggle("d-none");  
}

addNoteButton.addEventListener("click", (event)=>{
    if(title.value.trim().length > 0 && note.value.trim().length > 0){
        arrayOfNotes = [...arrayOfNotes, {title: title.value.trim(), 
                                        note: note.value.trim(),
                                        id: Date.now(),
                                        isPinned: false,
                                        isArchived: false }];
    note.value = title.value = "";
    showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=>note.isPinned === false && note.isArchived === false ));
    localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
   }
});

notesDisplay.addEventListener("click", (event)=>{
    debugger;
    let dataset = event.target.dataset ;
    let noteId = event.target.dataset.id;
    let type = event.target.dataset.type;

    switch (type){
        case "del":
            arrayOfNotes = arrayOfNotes.filter((note)=> note.id.toString() !== noteId)
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned === false && note.isArchived === false));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned === true && note.isArchived === false));
            break;

        case "pinned":
            debugger;
            arrayOfNotes = arrayOfNotes.map((note)=>{
                if(note.id.toString() === noteId){
                   return  {...note, isPinned: !note.isPinned }
                }
                   return note; 
            });
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived})=>isPinned === true && isArchived === false));
            showOtherNotes.innerHTML= renderNotes(arrayOfNotes.filter((note)=>note.isPinned === false && note.isArchived === false));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;

        case "archived":
            debugger ;
            arrayOfNotes = arrayOfNotes.map((note)=>note.id.toString() === noteId? {...note, isArchived: !note.isArchived}: note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isArchived === false && note.isPinned === false));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=>note.isArchived === false && note.isPinned === true));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;

    }
    
});
debugger;
showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived})=>isPinned === true && isArchived === false));
showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=>note.isPinned === false && note.isArchived === false));

