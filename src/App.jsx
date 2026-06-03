import React, { useState, useContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Plus, Menu } from 'lucide-react';

// --- Imports ---
import { NotesProvider, NotesContext } from './context/NotesContext';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { TagFilter } from './components/TagFilter';
import { NoteModal } from './components/NoteModal';
import { HomePage } from './pages/Home';         
import { ArchivePage } from './pages/Archive';
import { TrashPage } from './pages/Trash';

const GlobalStyles = () => (
  <style>{`
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

const AppLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // FIX: Pulling the correct functions from Context!
  const { setShowModal, setCurrentNote } = useContext(NotesContext);
  
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-800 font-sans overflow-hidden">
      <GlobalStyles />
      
      <Navbar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="p-2 -ml-2 text-gray-600 md:hidden hover:bg-gray-100 rounded-lg" 
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <SearchBar />
          </div>
          
          {/* FIX: Updated this button to use the correct functions! */}
          <button 
            onClick={() => {
              setCurrentNote(null); // Clears the form
              setShowModal(true);   // Opens the modal
            }} 
            className="ml-4 flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="w-5 h-5" /> <span className="hidden sm:inline">New Note</span>
          </button>
        </header>
        
        <TagFilter />
        
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/trash" element={<TrashPage />} />
          </Routes>
        </div>
      </main>

      <NoteModal />
    </div>
  );
};

export default function App() {
  return (
    <NotesProvider> 
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </NotesProvider>
  );
}