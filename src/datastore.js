import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { data } from 'jquery';
import { store as notificationStore } from 'react-notifications-component';

const firebaseConfig = {
  apiKey: 'AIzaSyA_FLQNWjP_RSIay-der65yoykhNB9GJvk',
  authDomain: 'cs52-react-intro-420401.firebaseapp.com',
  databaseURL: 'https://cs52-react-intro-420401-default-rtdb.firebaseio.com',
  projectId: 'cs52-react-intro-420401',
  storageBucket: 'cs52-react-intro-420401.appspot.com',
  messagingSenderId: '165015935169',
  appId: '1:165015935169:web:c971edda7a227029bb9c40',
  measurementId: 'G-M8KFQW9XM8',
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export function createNote(newNote) {
  const notesRef = database.ref('notes');
  notesRef.push(newNote);
}

export function updateNote(id, updatedFields) {
  const noteRef = database.ref('notes').child(id);
  noteRef.update(updatedFields);
}

export function onNotesValueChange(callback) {
  const notesRef = database.ref('notes');
  notesRef.on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    console.log(`NEW NOTE: ${JSON.stringify(newNoteState)}`);

    if (newNoteState) {
      callback(newNoteState);
    }

    // null newNoteState conditional
    if (newNoteState === null) {
      callback({});
    }
  });
}

export function deleteNote(id) {
  const noteRef = database.ref('notes').child(id);
  noteRef.remove();
}

export function resize(id, newWidth, newHeight) {
  const noteRef = database.ref('notes').child(id);
  noteRef.update({
    width: newWidth,
    height: newHeight,
  });
}

export function recolor(id, newColor) {
  const noteRef = database.ref('notes').child(id);
  noteRef.update({
    backgroundColor: newColor,
  });
}