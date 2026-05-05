import React, { useState } from 'react';
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
import './OrderList.css';

const OrderList = () => {
  const { searchTerm } = useSearch();
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    { id: 'ORD-7241', customer: 'Priya Sharma', item: 'Bridal Blouse', date: '2026-05-01', delivery: '2026-05-05', status: 'In Progress', total: 2500, paid: 1000, urgent: true },
    { id: 'ORD-7238', customer: 'Anjali Nair', item: 'Designer Saree', date: '2026-04-28', delivery: '2026-05-06', status: 'Accepted', total: 4500, paid: 4500, urgent: false },
    { id: 'ORD-7235', customer: 'Meera Das', item: 'Lehenga Choli', date: '2026-04-25', delivery: '2026-05-02', status: 'Completed', total: 8000, paid: 5000, urgent: false },
    { id: 'ORD-7232', customer: 'Sneha Rao', item: 'Kurti', date: '2026-04-20', delivery: '2026-04-25', status: 'Delivered', total: 1200, paid: 1200, urgent: false },
  ];

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status, urgent) => {
    if (urgent && status !== 'Delivered') return <span className="badge badge-urgent">Urgent!</span>;
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="tabs">
          {['all', 'pending', 'active', 'completed', 'delivered'].map(tab => (
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
                    <span className="order-item">{order.item}</span>
                  </div>
                </td>
                <td>
                  <div className="customer-cell">
                    <p className="c-name">{order.customer}</p>
                    <p className="c-date">Ordered: {order.date}</p>
                  </div>
                </td>
                <td>{getStatusBadge(order.status, order.urgent)}</td>
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
                    <p className={new Date(order.delivery) < new Date() ? 'overdue' : ''}>
                      {order.delivery}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="action-cell">
                    <button className="icon-btn" title="Share via WhatsApp"><Share2 size={16} /></button>
                    <button className="icon-btn"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pending-summary">
        <div className="premium-card summary-item urgent">
          <AlertCircle size={24} />
          <div>
            <h3>3 Urgent Orders</h3>
            <p>Awaiting completion today</p>
          </div>
        </div>
        <div className="premium-card summary-item balance">
          <div className="val-group">
            <p>Total Pending Amount</p>
            <h3>₹12,450</h3>
          </div>
          <button className="btn-link">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
