document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');

    // Load notes from local storage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <p>${note}</p>
                <button class="delete-btn" data-index="${index}">X</button>
            `;
            notesList.appendChild(noteElement);
        });
    };

    // Save notes to local storage
    const saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Add a new note
    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(noteText);
            saveNotes(notes);
            loadNotes();
            noteInput.value = '';
        }
    });

    // Delete a note
    notesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.splice(index, 1);
            saveNotes(notes);
            loadNotes();
        }
    });

    // Initial load
    loadNotes();
});
