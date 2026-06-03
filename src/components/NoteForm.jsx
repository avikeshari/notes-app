import React, { useState, useEffect } from 'react';

export const NoteForm = ({ existingNote, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Load note data if we are editing
  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setDesc(existingNote.desc);
      setTagsInput(existingNote.tags.join(', '));
    }
  }, [existingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' && desc.trim() === '') {
      setErrorMsg('Please enter a title or a description.');
      return;
    }

    // Convert comma string to array and clean up spaces
    let tagsArray = [];
    if (tagsInput.trim() !== '') {
      tagsArray = tagsInput.split(',').map(t => t.trim()).filter(t => t !== '');
    }

    onSubmit({ title, desc, tags: tagsArray });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="p-6 flex-1">
        {errorMsg && <p className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-sm font-medium">{errorMsg}</p>}
        
        <input 
          type="text" 
          placeholder="Note Title..." 
          className="w-full text-2xl font-bold border-none outline-none mb-4 text-gray-800 placeholder-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        
        <textarea 
          placeholder="Write your note details here..." 
          className="w-full h-48 resize-none border-none outline-none text-gray-600 text-lg"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-2">Tags (Separate by commas)</label>
          <input 
            type="text" 
            placeholder="e.g. work, urgent, personal" 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all text-sm"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 border-t flex justify-end gap-3 rounded-b-xl">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">
          Save Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;