import React, { useContext, useMemo } from 'react';
import { BookOpen, StickyNote } from 'lucide-react';
import { NotesContext } from '../context/NotesContext';
import { NoteCard } from '../components/NoteCard';

export const HomePage = () => {
  const { notesList, searchText, tagSearch } = useContext(NotesContext);

  // 1. Get only active notes
  let displayNotes = notesList.filter(note => note.status === 'active');

  // 2. Filter by search bar
  if (searchText !== '') {
    displayNotes = displayNotes.filter(note => 
      note.title.toLowerCase().includes(searchText.toLowerCase()) || 
      note.desc.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // 3. Filter by tag
  if (tagSearch !== '') {
    displayNotes = displayNotes.filter(note => note.tags.includes(tagSearch));
  }

  // 4. Sort notes (Pinned ones go first, then newest)
  displayNotes.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.date - a.date;
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-gray-800">My Active Notes</h2>
      {displayNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
           <BookOpen className="w-12 h-12 mb-3 opacity-20" />
           <p className="text-center">You have no active notes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNotes.map(note => (
            <NoteCard key={note.id} note={note} pageType="active" />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;