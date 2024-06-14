import React, { useState, useEffect } from 'react';
import {
  onNotesValueChange, createNote, updateNote, deleteNote, resize, recolor,
} from '../datastore';
import Note from './Note';

const App = () => {
  const [notes, setNotes] = useState({});
  const [inputValue, setInputValue] = useState('');

  const setNotesAndLog = (notesNew) => {
    setNotes(notesNew);
    console.log('Updated Notes: ', notesNew);
  };

  useEffect(() => {
    // Setting up the subscription to Firebase
    onNotesValueChange(setNotesAndLog);
  }, []);

  const handleUpdate = (id, updatedFields) => {
    updateNote(id, updatedFields);
  };

  const handleDelete = (id) => {
    deleteNote(id);
  };

  const handleResize = (id, newWidth, newHeight) => {
    resize(id, newWidth, newHeight);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleColorChange = (id, newColor) => {
    recolor(id, newColor);
  };

  const handleAddNote = () => {
    if (inputValue.trim()) {
      const newNote = {
        title: inputValue,
        text: 'x2 click title to edit!',
        x: 400,
        y: 400,
        zIndex: 1,
        draggable: true,
        width: 200,
        height: 200,
        backgroundColor: '#f9f86c',
      };
      createNote(newNote);
      setInputValue('');
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="My note is..."
        value={inputValue}
        onChange={handleInputChange}
      />

      <button type="button" onClick={handleAddNote}>Add Note</button>
      <div className="noteList">
        {Object.keys(notes).map((id) => (
          <Note
            key={id}
            id={id}
            note={notes[id]}
            updateNote={handleUpdate}
            deleteNote={handleDelete}
            resize={handleResize}
            recolor={handleColorChange}
          />
        ))}
      </div>
    </div>
  );
};

export default App;