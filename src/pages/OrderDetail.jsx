import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Printer, 
  Share2, 
  Clock, 
  CheckCircle2, 
  CreditCard,
  User,
  Scissors,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import './OrderDetail.css';

import { useOrders } from '../context/OrderContext';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="order-detail-page">
        <button className="back-btn" onClick={() => navigate('/orders')}>
          <ArrowLeft size={20} /> Back to Orders
        </button>
        <div className="error-state">
          <h2>Order Not Found</h2>
          <p>We couldn't find an order with ID: {id}</p>
        </div>
      </div>
    );
  }

  const steps = [
    { label: 'Accepted', date: 'May 1, 10:00 AM', completed: true },
    { label: 'Measuring', date: 'May 1, 11:30 AM', completed: true },
    { label: 'Stitching', date: 'May 2, 09:00 AM', completed: true },
    { label: 'Quality Check', date: 'Pending', completed: false },
    { label: 'Ready/Delivered', date: 'Expected May 5', completed: false },
  ];

  return (
    <div className="order-detail-page animate-slide-in">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate('/orders')}>
          <ArrowLeft size={20} /> Back to Orders
        </button>
        <div className="order-main-info">
          <div className="id-group">
            <h1>#{order.id}</h1>
            <span className={`service-type-badge ${order.serviceType}`}>{order.serviceType}</span>
          </div>
          <p className="order-subtitle">{order.category.toUpperCase()} • Ordered on {order.date}</p>
        </div>
        
        <div className="delivery-deadline">
          <div className="d-icon"><Clock size={20} /></div>
          <div>
            <p className="d-label">Expected Delivery</p>
            <p className="d-value">{order.deliveryDate || 'TBD'}</p>
          </div>
        </div>

        <div className="order-badges">
          {order.urgency && <span className="badge badge-urgent">High Priority</span>}
          <span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span>
        </div>
        <div className="header-actions">
          <button className="outline-btn"><Share2 size={18} /> Share</button>
          <button className="btn-primary"><Printer size={18} /> Print Invoice</button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="premium-card customer-card">
            <div className="card-header">
              <h3>Customer Information</h3>
              <button 
                className="text-btn"
                onClick={() => navigate(`/new-order?edit=${order.id}`)}
              >
                Edit
              </button>
            </div>
            <div className="customer-info-grid">
              <div className="info-item">
                <User size={18} />
                <div>
                  <p className="label">Full Name</p>
                  <p className="value">{order.customerName}</p>
                </div>
              </div>
              <div className="info-item">
                <Phone size={18} />
                <div>
                  <p className="label">Mobile Number</p>
                  <p className="value">{order.mobile}</p>
                </div>
              </div>
              <div className="info-item full-width">
                <MapPin size={18} />
                <div>
                  <p className="label">Primary Address</p>
                  <p className="value">{order.address || 'No address provided.'}</p>
                </div>
              </div>
              <div className="info-item">
                <Mail size={18} />
                <div>
                  <p className="label">Email Address</p>
                  <p className="value">{order.email || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-card financials-card">
            <div className="card-header">
              <h3>Financial Overview</h3>
              <button 
                className="text-btn"
                onClick={() => navigate(`/new-order?edit=${order.id}&step=4`)}
              >
                Edit
              </button>
            </div>
            <div className="financials-grid">
              {/* ... financials content ... */}
              <div className="fin-item">
                <p className="f-label">Total Amount</p>
                <p className="f-value">₹{order.total}</p>
              </div>
              <div className="fin-item">
                <p className="f-label">Advance Paid</p>
                <p className="f-value text-success">₹{order.paid}</p>
              </div>
              <div className="fin-item highlight">
                <p className="f-label">Balance Due</p>
                <p className={`f-value ${order.total - order.paid > 0 ? 'text-urgent' : 'text-success'}`}>
                  ₹{order.total - order.paid}
                </p>
              </div>
            </div>
          </div>

          <div className="premium-card measurements-card">
            <div className="card-header">
              <h3>Measurement Profile</h3>
              <button 
                className="text-btn"
                onClick={() => navigate(`/new-order?edit=${order.id}&step=3`)}
              >
                Edit
              </button>
            </div>
            <div className="measurements-display-grid">
              {/* ... measurements content ... */}
              {Object.entries(order.measurements || {}).length > 0 ? (
                Object.entries(order.measurements).map(([key, val]) => (
                  <div key={key} className="m-display-item">
                    <p className="m-label">{key.replace('_', ' ')}</p>
                    <p className="m-val">{val}{order.measurementUnit === 'cm' ? 'cm' : '"'}</p>
                  </div>
                ))
              ) : (
                <p className="no-data">No measurements recorded.</p>
              )}
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="premium-card timeline-card">
            <h3>Order Timeline</h3>
            <div className="timeline">
              {steps.map((step, i) => (
                <div key={i} className={`timeline-item ${step.completed ? 'completed' : ''}`}>
                  <div className="timeline-icon">
                    {step.completed ? <CheckCircle2 size={16} /> : <div className="dot"></div>}
                  </div>
                  <div className="timeline-content">
                    <p className="t-label">{step.label}</p>
                    <p className="t-date">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card notes-card">
            <div className="card-header">
              <h3>Special Instructions</h3>
              <button 
                className="text-btn"
                onClick={() => navigate(`/new-order?edit=${order.id}&step=5`)}
              >
                Edit
              </button>
            </div>
            <p className="notes-text">
              {order.description || "No special instructions provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
