import React, { useEffect } from 'react';
import { Menu, Search, Bell, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import './TopBar.css';

const TopBar = ({ toggleSidebar }) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm && location.pathname !== '/orders') {
      navigate('/orders');
    }
  }, [searchTerm, navigate, location.pathname]);

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search orders, customers..." 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* ... rest of the component */}

      <div className="top-bar-right">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <button className="icon-btn">
          <Settings size={20} />
        </button>
        <div className="date-display">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
