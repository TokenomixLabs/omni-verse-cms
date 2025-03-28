
import React from 'react';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import BrandSelector from '../BrandSelector';
import NotificationCenter from '../NotificationCenter';

interface HeaderActionsProps {
  searchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const HeaderActions = ({ 
  searchOpen, 
  setSearchOpen, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  isDarkMode,
  toggleDarkMode
}: HeaderActionsProps) => {
  return (
    <div className="flex items-center space-x-3">
      <BrandSelector />
      
      <NotificationCenter />

      <button 
        onClick={() => setSearchOpen(!searchOpen)}
        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Search"
      >
        <Search size={18} />
      </button>

      <button 
        onClick={toggleDarkMode}
        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Menu"
      >
        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div>
  );
};

export default HeaderActions;
