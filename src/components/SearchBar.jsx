import React, { useContext } from 'react';
import { Search } from 'lucide-react';
import { NotesContext } from '../context/NotesContext';

export const SearchBar = () => {
  const { searchText, setSearchText } = useContext(NotesContext);
  
  return (
    <div className="relative w-full max-w-md">
      <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
      <input 
        type="text" 
        placeholder="Search notes..." 
        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;