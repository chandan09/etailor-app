import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Printer, 
  Share2,
  AlertCircle
} from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useOrders } from '../context/OrderContext';
import './OrderList.css';

const OrderList = () => {
  const { searchTerm } = useSearch();
  const { orders, updateOrderStatus, toggleUrgency } = useOrders();
  const [activeTab, setActiveTab] = useState('all');
  const [activeMenu, setActiveMenu] = useState(null); 

  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const tabs = ['all', 'urgent', 'pending', 'active', 'completed', 'delivered', 'cancelled'];

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setActiveMenu(null);
  };

  const handleUrgencyToggle = (orderId) => {
    toggleUrgency(orderId);
    setActiveMenu(null);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'urgent') return matchesSearch && order.urgency;
    return matchesSearch && order.status.toLowerCase() === activeTab;
  });

  const getStatusBadge = (status, urgent) => {
    if (urgent && status !== 'Delivered' && status !== 'Cancelled') return <span className="badge badge-urgent">Urgent!</span>;
    const lower = status.toLowerCase();
    return <span className={`badge badge-${lower}`}>{status}</span>;
  };

  return (
    <div className="order-list-page animate-slide-in">
      <div className="page-header">
        <h1>Order Management</h1>
        <div className="header-actions">
          <button className="outline-btn"><Printer size={18} /> Export PDF</button>
          <Link to="/new-order" className="btn-primary">New Order</Link>
        </div>
      </div>

      <div className="order-filters-bar premium-card">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by Order ID, Customer..." 
            value={searchTerm}
            readOnly
          />
        </div>
        <div className="tabs">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <button className="filter-btn"><Filter size={18} /> Filters</button>
      </div>

      <div className="premium-card table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order Info</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Financials</th>
              <th>Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <div className="order-info">
                    <Link to={`/orders/${order.id}`} className="order-id">#{order.id}</Link>
                    <span className="order-item">{order.category}</span>
                  </div>
                </td>
                <td>
                  <div className="customer-cell">
                    <p className="c-name">{order.customerName}</p>
                    <p className="c-date">Ordered: {order.date}</p>
                  </div>
                </td>
                <td>{getStatusBadge(order.status, order.urgency)}</td>
                <td>
                  <div className="financial-cell">
                    <p className="total">₹{order.total}</p>
                    {order.total - order.paid > 0 ? (
                      <p className="pending">Pending: ₹{order.total - order.paid}</p>
                    ) : (
                      <p className="paid">Fully Paid</p>
                    )}
                  </div>
                </td>
                <td>
                  <div className="delivery-cell">
                    <p className={new Date(order.deliveryDate) < new Date() ? 'overdue' : ''}>
                      {order.deliveryDate}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="action-cell">
                    <button className="icon-btn" title="Share via WhatsApp"><Share2 size={16} /></button>
                    <div className="menu-container">
                      <button 
                        className={`icon-btn ${activeMenu === order.id ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(activeMenu === order.id ? null : order.id);
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {activeMenu === order.id && (
                        <div className="dropdown-menu">
                          <p className="menu-title">Change Status</p>
                          {['Pending', 'Active', 'Completed', 'Delivered', 'Cancelled'].map(s => (
                            <button 
                              key={s} 
                              className={`menu-item ${order.status === s ? 'current' : ''}`}
                              onClick={() => handleStatusUpdate(order.id, s)}
                            >
                              {s}
                            </button>
                          ))}
                          <div className="menu-divider"></div>
                          <button className="menu-item urgent-toggle" onClick={() => handleUrgencyToggle(order.id)}>
                            {order.urgency ? 'Remove Urgent Mark' : 'Mark as Urgent'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default OrderList;
