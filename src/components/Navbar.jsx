import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Archive, Trash2, X, StickyNote } from 'lucide-react';

export const Navbar = ({ isMobileOpen, setIsMobileOpen }) => {
  // This function automatically highlights the active page!
  const navLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${
      isActive 
        ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <>
      {/* Dark overlay for mobile screens when menu is open */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}
      
      {/* Sidebar Navigation */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Logo Area */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <BookOpen className="w-6 h-6" /> Avi's Notes
          </h1>
          <button className="md:hidden text-gray-500 p-1 hover:bg-gray-100 rounded-lg" onClick={() => setIsMobileOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Links */}
        <nav className="px-4 space-y-2 mt-6">
          <NavLink to="/" onClick={() => setIsMobileOpen(false)} className={navLinkClass}>
            <StickyNote className="w-5 h-5" /> Active Notes
          </NavLink>
          
          <NavLink to="/archive" onClick={() => setIsMobileOpen(false)} className={navLinkClass}>
            <Archive className="w-5 h-5" /> Archive
          </NavLink>
          
          <NavLink to="/trash" onClick={() => setIsMobileOpen(false)} className={navLinkClass}>
            <Trash2 className="w-5 h-5" /> Trash
          </NavLink>
        </nav>
        
      </aside>
    </>
  );
};