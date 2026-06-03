import React, { useContext } from 'react';
import { X } from 'lucide-react';
import { NotesContext } from '../context/NotesContext';
import { NoteForm } from './NoteForm';

export const NoteModal = () => {
  const { showModal, setShowModal, currentNote, addOrUpdateNote } = useContext(NotesContext);

  if (!showModal) return null; // Don't show if false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="font-bold text-xl text-gray-800">{currentNote ? 'Edit Note' : 'Create New Note'}</h2>
          <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-800 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
            <X className="w-5 h-5"/>
          </button>
        </div>
        
        <NoteForm 
          existingNote={currentNote} 
          onSubmit={addOrUpdateNote} 
          onCancel={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default NoteModal;