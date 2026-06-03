import React, { useContext } from 'react';
import { Trash2 } from 'lucide-react';
import { NotesContext } from '../context/NotesContext';
import { NoteCard } from '../components/NoteCard';

export const TrashPage = () => {
  const { notesList, searchText, tagSearch, emptyTrash } = useContext(NotesContext);

  let displayNotes = notesList.filter(note => note.status === 'trashed');

  if (searchText !== '') {
    displayNotes = displayNotes.filter(note => 
      note.title.toLowerCase().includes(searchText.toLowerCase()) || 
      note.desc.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (tagSearch !== '') {
    displayNotes = displayNotes.filter(note => note.tags.includes(tagSearch));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Trash Bin</h2>
        {displayNotes.length > 0 && (
          <button onClick={emptyTrash} className="text-red-600 font-medium hover:text-red-800 flex gap-1 items-center transition-colors">
            <Trash2 className="w-4 h-4"/> Empty Trash
          </button>
        )}
      </div>
      
      {displayNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
           <Trash2 className="w-12 h-12 mb-3 opacity-20" />
           <p className="text-center">Trash is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNotes.map(note => (
            <NoteCard key={note.id} note={note} pageType="trashed" />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrashPage;