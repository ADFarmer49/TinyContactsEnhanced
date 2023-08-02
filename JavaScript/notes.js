const noteList = document.getElementById('noteList');
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteBtn');
const error = document.getElementById('error');

// Initialize local storage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Creating the elements for the notes
function createNoteItem(noteText) {
  let noteItem = document.createElement('li');
  noteItem.innerText = noteText;
  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', function() {
    removeNoteFromDOM(noteItem);
    removeNoteFromStorage(noteText);
  });
  noteItem.appendChild(deleteButton);
  return noteItem;
}

function addNoteToDOM(noteItem) {
  noteList.appendChild(noteItem);
}

// Adding note to local storage 
function addNoteToStorage(noteText) {
  notes.push(noteText);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function removeNoteFromDOM(noteItem) {
  noteItem.remove();
}

// Deleting note from local storage
function removeNoteFromStorage(noteText) {
  notes.splice(notes.indexOf(noteText), 1);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote() {
  let noteText = noteInput.value.trim();

  // Handling error message functionality
  if (noteText !== '') {
    let noteItem = createNoteItem(noteText);
    addNoteToDOM(noteItem);
    noteInput.value = '';
    addNoteToStorage(noteText);
    error.style.display = "none";
  } else {
    error.style.display = "block";
  }
}

// Looks for button click or 'Enter' key press
function handleAddNote(event) {
  if ((event.type === 'click' && event.target === addNoteButton) || 
      (event.type === 'keyup' && event.key === 'Enter')) {
    addNote();
  }
}

notes.forEach(function(noteText) {
  let noteItem = createNoteItem(noteText);
  addNoteToDOM(noteItem);
});

// Add event listeners for click and Enter key press
noteInput.addEventListener('keyup', handleAddNote);
addNoteButton.addEventListener('click', handleAddNote);

noteList.addEventListener('click', function(event) {
  let deleteButton = event.target;
  if (deleteButton.tagName === 'BUTTON') {
    let noteItem = deleteButton.parentElement;
    let noteText = noteItem.innerText;
    removeNoteFromDOM(noteItem);
    removeNoteFromStorage(noteText);
  }
});