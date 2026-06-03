import React, { createContext, useState, useEffect , useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/noteHelpers';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notesList, setNotesList] = useLocalStorage('my-notes-app', []);
  const [searchText, setSearchText] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  
  // Modal states for adding/editing notes
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  // Functions to manage notes
  const addOrUpdateNote = (noteData) => {
    if (currentNote != null) {
      // Edit existing note
      const updatedNotes = notesList.map((note) => {
        if (note.id === currentNote.id) {
          return { ...note, title: noteData.title, desc: noteData.desc, tags: noteData.tags, date: Date.now() };
        }
        return note;
      });
      setNotesList(updatedNotes);
    } else {
      // Add new note
      const newNote = {
        id: generateId(),
        title: noteData.title,
        desc: noteData.desc,
        tags: noteData.tags,
        isPinned: false,
        status: 'active', // can be 'active', 'archive', or 'trashed'
        date: Date.now(),
      };
      setNotesList([newNote, ...notesList]);
    }
    setShowModal(false);
    setCurrentNote(null);
  };

  const changeNoteStatus = (id, newStatus) => {
    const updated = notesList.map(note => {
      if (note.id === id) {
        return { ...note, status: newStatus, isPinned: false }; // Unpin if moved
      }
      return note;
    });
    setNotesList(updated);
  };

  const togglePin = (id) => {
    const updated = notesList.map(note => {
      if (note.id === id) {
        return { ...note, isPinned: !note.isPinned };
      }
      return note;
    });
    setNotesList(updated);
  };

  const deleteForever = (id) => {
    const filtered = notesList.filter(note => note.id !== id);
    setNotesList(filtered);
  };

  const emptyTrash = () => {
    const keptNotes = notesList.filter(note => note.status !== 'trashed');
    setNotesList(keptNotes);
  };

  // Provide all these values to the rest of the app
  const contextValue = {
    notesList,
    searchText,
    setSearchText,
    tagSearch,
    setTagSearch,
    showModal,
    setShowModal,
    currentNote,
    setCurrentNote,
    addOrUpdateNote,
    changeNoteStatus,
    togglePin,
    deleteForever,
    emptyTrash
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;