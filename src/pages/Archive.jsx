import React, { useContext } from 'react';
import { Archive } from 'lucide-react';
import { Archive as ArchiveIcon } from 'lucide-react';
import { NotesContext } from '../context/NotesContext';
import { NoteCard } from '../components/NoteCard';

export const ArchivePage = () => {
  const { notesList, searchText, tagSearch } = useContext(NotesContext);

  let displayNotes = notesList.filter(note => note.status === 'archive');

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
      <h2 className="text-xl font-bold mb-6 text-gray-800">Archived Notes</h2>
      {displayNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
           <Archive className="w-12 h-12 mb-3 opacity-20" />
           <p className="text-center">No notes in the archive.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNotes.map(note => (
            <NoteCard key={note.id} note={note} pageType="archive" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArchivePage;