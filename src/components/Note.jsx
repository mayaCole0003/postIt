import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import dragIcon from './dragIcon.png';

const Note = ({
  id, note, updateNote, deleteNote,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [position, setPosition] = useState({ x: note.x, y: note.y });
  const [editableTitle, setEditableTitle] = useState(note.title);
  const [editableText, setEditableText] = useState(note.text);
  const [size, setSize] = useState({ width: note.width || 200, height: note.height || 200 });
  const [noteColor, setNoteColor] = useState(note.backgroundColor || '#f9f86c');

  const handleResize = (e, { element, size: newSize }) => {
    setSize(newSize);
    updateNote(id, { width: newSize.width, height: newSize.height });
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setNoteColor(newColor);
    updateNote(id, { backgroundColor: newColor });
  };

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleStopDrag = (e, data) => {
    updateNote(id, {
      x: data.x,
      y: data.y,
    });
    setPosition({ x: data.x, y: data.y });
    console.log('Stopped dragging at:', data.x, data.y);
  };

  const saveNote = () => {
    updateNote(id, {
      title: editableTitle,
      text: editableText,
      zIndex: note.zIndex,
      backgroundColor: noteColor,
    });
    setEditing(false);
  };

  return (
    <Draggable
      handle=".handle"
      grid={[25, 25]}
      position={{
        x: note.x, y: note.y, width: note.width, height: note.height,
      }}
      onDrag={handleDrag}
      onStop={handleStopDrag}
    >
      <Resizable width={size.width} height={size.height} onResize={handleResize}>
        <div className="note"
          style={{
            backgroundColor: noteColor, zIndex: note.zIndex, width: size.width, height: size.height,
          }}
        >
          {isEditing ? (
            <>
              <input type="text" value={editableTitle} onChange={(e) => setEditableTitle(e.target.value)} />
              <textarea value={editableText} onChange={(e) => setEditableText(e.target.value)} />
              <button className="save" type="button" onClick={saveNote}>Save</button>
              <button className="save" type="button" onClick={() => setEditing(false)}>Cancel</button>

            </>
          ) : (
            <>
              <div className="colorDragcontainer">
                <input
                  className="colorPicker"
                  type="color"
                  value={noteColor}
                  onChange={handleColorChange}
                />
                <div className="handle" style={{ backgroundImage: `url(${dragIcon})` }}>Drag</div>
              </div>

              <h1 onDoubleClick={() => setEditing(true)}>{note.title}</h1>
              {/* <p onDoubleClick={() => setEditing(true)}>{note.text}</p> */}
              <ReactMarkdown>{note.text}</ReactMarkdown>
              <button className="delete" type="button" onClick={() => deleteNote(id)}>Delete</button>
            </>
          )}
        </div>
      </Resizable>
    </Draggable>
  );
};

export default Note;