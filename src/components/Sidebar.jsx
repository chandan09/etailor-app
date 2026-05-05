import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  Users, 
  X,
  Scissors,
  Wallet
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: PlusCircle, label: 'New Order', path: '/new-order' },
    { icon: ClipboardList, label: 'Orders', path: '/orders' },
    { icon: Users, label: 'Workers', path: '/workers' },
    { icon: Wallet, label: 'Payments', path: '/payments' },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Scissors size={28} className="logo-icon" />
            <span>eTailor Pro</span>
          </div>
          <button className="mobile-close" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">AD</div>
            <div className="details">
              <p className="name">Admin Dashboard</p>
              <p className="role">Boutique Owner</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
