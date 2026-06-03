import React, { useContext } from 'react';
import { Tag } from 'lucide-react';
import { NotesContext } from '../context/NotesContext';

export const TagFilter = () => {
  const { notesList, tagSearch, setTagSearch } = useContext(NotesContext);
  
  // Find all unique tags from all notes
  let allTags = [];
  notesList.forEach(note => {
    note.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });

  if (allTags.length === 0) return null;

  return (
    <div className="bg-white px-6 py-3 border-b flex items-center gap-2 overflow-x-auto no-scrollbar shadow-sm">
      <Tag className="w-4 h-4 text-gray-400 min-w-max" />
      <button 
        onClick={() => setTagSearch('')}
        className={`px-3 py-1 rounded-full border text-sm min-w-max transition-colors ${tagSearch === '' ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
      >
        All Tags
      </button>
      {allTags.map(tag => (
        <button 
          key={tag}
          onClick={() => setTagSearch(tag)}
          className={`px-3 py-1 rounded-full border text-sm min-w-max transition-colors ${tagSearch === tag ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;