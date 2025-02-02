document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');
    const tabButtons = document.querySelectorAll('.tab-btn');
    let activeTab = 'daily';

    // Load notes from local storage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
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
        localStorage.setItem(activeTab, JSON.stringify(notes));
    };

    // Add a new note
    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
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
            const notes = JSON.parse(localStorage.getItem(activeTab)) || [];
            notes.splice(index, 1);
            saveNotes(notes);
            loadNotes();
        }
    });

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            activeTab = e.target.getAttribute('data-tab');
            loadNotes();
        });
    });

    // Initial load
    loadNotes();

    // Apply navbar styling dynamically
    document.querySelector('.nav-bar').style.display = 'flex';
    document.querySelector('.nav-bar').style.justifyContent = 'space-around';
    document.querySelector('.nav-bar').style.padding = '10px';
    document.querySelector('.nav-bar').style.backgroundColor = '#333';
    document.querySelector('.nav-bar').style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.style.padding = '10px 20px';
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background 0.3s';
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.backgroundColor = '#555');
        btn.addEventListener('mouseleave', () => btn.style.backgroundColor = '');
    });
});
