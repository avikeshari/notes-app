import React, { useContext } from 'react';
import { Pin, Edit2, Archive, Trash2, RefreshCcw } from 'lucide-react';
import { NotesContext } from '../context/NotesContext';

export const NoteCard = ({ note, pageType }) => {
  const { togglePin, changeNoteStatus, deleteForever, setCurrentNote, setShowModal } = useContext(NotesContext);

  const handleEdit = () => {
    setCurrentNote(note);
    setShowModal(true);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col h-64 hover:shadow-md transition-shadow relative group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-1 flex-1 pr-2">{note.title}</h3>
        {pageType === 'active' && (
          <button 
            onClick={() => togglePin(note.id)} 
            className={`p-1.5 rounded-full transition-colors ${note.isPinned ? 'text-indigo-600 bg-indigo-100' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <Pin className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <p className="text-gray-600 text-sm flex-1 overflow-hidden whitespace-pre-wrap">{note.desc}</p>
      
      <div className="flex flex-wrap gap-1 mt-2 mb-2">
        {note.tags.map(tag => (
          <span key={tag} className="bg-gray-100 px-2.5 py-1 text-xs rounded-md text-gray-600 font-medium">{tag}</span>
        ))}
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-gray-400 font-medium">
          {new Date(note.date).toLocaleDateString()}
        </span>
        <div className="flex gap-1">
          {pageType === 'trashed' ? (
            <>
              <button onClick={() => changeNoteStatus(note.id, 'active')} className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Restore">
                <RefreshCcw className="w-4 h-4" />
              </button>
              <button onClick={() => deleteForever(note.id)} className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete Permanently">
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 rounded-lg transition-colors" title="Edit">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => changeNoteStatus(note.id, pageType === 'active' ? 'archive' : 'active')} className="p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-800 rounded-lg transition-colors" title={pageType === 'active' ? 'Archive' : 'Unarchive'}>
                <Archive className="w-4 h-4" />
              </button>
              <button onClick={() => changeNoteStatus(note.id, 'trashed')} className="p-1.5 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors" title="Move to Trash">
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;