import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { 
  CreditCard, 
  TrendingUp, 
  AlertCircle, 
  Calendar,
  Search,
  Filter,
  Download
} from 'lucide-react';
import './Payments.css';

const Payments = () => {
  const { orders } = useOrders();
  const [timeFilter, setTimeFilter] = useState('month'); // 'week' or 'month'
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate dates based on current system time (May 2026)
  const today = new Date('2026-05-05T00:00:00');
  
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      
      // Time filtering
      let matchesTime = false;
      if (timeFilter === 'month') {
        matchesTime = orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
      } else if (timeFilter === 'week') {
        const diffTime = Math.abs(today - orderDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        matchesTime = diffDays <= 7;
      } else {
        matchesTime = true; // All time
      }

      // Search filtering
      const matchesSearch = 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTime && matchesSearch;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [orders, timeFilter, searchTerm]);

  // Aggregate metrics
  const metrics = useMemo(() => {
    let totalBilled = 0;
    let totalCollected = 0;
    let pendingDues = 0;

    filteredOrders.forEach(o => {
      totalBilled += Number(o.total) || 0;
      totalCollected += Number(o.paid) || 0;
    });
    
    pendingDues = totalBilled - totalCollected;

    return { totalBilled, totalCollected, pendingDues };
  }, [filteredOrders]);

  return (
    <div className="payments-page animate-slide-in">
      <div className="page-header">
        <div>
          <h1>Payment History</h1>
          <p className="subtitle">Track revenue, deposits, and pending balances.</p>
        </div>
        <div className="header-actions">
          <button className="outline-btn"><Download size={18} /> Export CSV</button>
        </div>
      </div>

      <div className="metrics-row">
        <div className="premium-card metric-card">
          <div className="metric-icon" style={{ backgroundColor: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}>
            <CreditCard size={24} />
          </div>
          <div>
            <p>Total Billed</p>
            <h3>₹{metrics.totalBilled.toLocaleString()}</h3>
          </div>
        </div>
        <div className="premium-card metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#d1fae5', color: 'var(--color-delivered)' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <p>Total Collected</p>
            <h3>₹{metrics.totalCollected.toLocaleString()}</h3>
          </div>
        </div>
        <div className="premium-card metric-card highlight-danger">
          <div className="metric-icon" style={{ backgroundColor: '#fee2e2', color: 'var(--color-urgent)' }}>
            <AlertCircle size={24} />
          </div>
          <div>
            <p>Pending Dues</p>
            <h3>₹{metrics.pendingDues.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="premium-card payments-table-container">
        <div className="table-controls">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <div className="time-toggles">
              <button 
                className={timeFilter === 'week' ? 'active' : ''} 
                onClick={() => setTimeFilter('week')}
              >
                This Week
              </button>
              <button 
                className={timeFilter === 'month' ? 'active' : ''} 
                onClick={() => setTimeFilter('month')}
              >
                This Month
              </button>
              <button 
                className={timeFilter === 'all' ? 'active' : ''} 
                onClick={() => setTimeFilter('all')}
              >
                All Time
              </button>
            </div>
            <button className="outline-btn filter-btn"><Filter size={18} /> Filter</button>
          </div>
        </div>

        <table className="payments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Bill</th>
              <th>Paid Amount</th>
              <th>Balance Due</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => {
                const balance = (Number(order.total) || 0) - (Number(order.paid) || 0);
                return (
                  <tr key={order.id}>
                    <td>
                      <div className="date-cell">
                        <Calendar size={14} className="c-icon" />
                        {order.date}
                      </div>
                    </td>
                    <td>
                      <Link to={`/orders/${order.id}`} className="order-link">
                        <strong>#{order.id}</strong>
                      </Link>
                    </td>
                    <td>{order.customerName}</td>
                    <td>₹{order.total}</td>
                    <td className="text-success">₹{order.paid}</td>
                    <td className={balance > 0 ? 'text-urgent' : 'text-success'}>
                      <strong>₹{balance}</strong>
                    </td>
                    <td>
                      {balance > 0 ? (
                        <span className="badge badge-pending">Partial</span>
                      ) : (
                        <span className="badge badge-delivered">Settled</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="no-data">No payment records found for this period.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
