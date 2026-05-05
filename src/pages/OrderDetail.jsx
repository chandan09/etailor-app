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
  Scissors
} from 'lucide-react';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data fetching based on ID
  const order = {
    id: id || 'ORD-7241',
    customer: 'Priya Sharma',
    mobile: '+91 98765 43210',
    item: 'Bridal Blouse',
    date: '2026-05-01',
    delivery: '2026-05-05',
    status: 'In Progress',
    total: 2500,
    paid: 1000,
    urgent: true,
    measurements: {
      length: '14.5"',
      shoulder: '14"',
      chest: '36"',
      waist: '30"',
      neck_front: '7"',
      neck_back: '9"',
      sleeve_length: '10"',
    }
  };

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
        <div className="header-actions">
          <button className="outline-btn"><Share2 size={18} /> WhatsApp</button>
          <button className="btn-primary"><Printer size={18} /> Print Invoice</button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="premium-card info-section">
            <div className="section-title">
              <div className="id-badge">#{order.id}</div>
              {order.urgent && <span className="badge badge-urgent">Urgent Priority</span>}
            </div>
            <div className="info-grid">
              <div className="info-item">
                <User size={18} />
                <div>
                  <p className="label">Customer</p>
                  <p className="value">{order.customer}</p>
                  <p className="sub-value">{order.mobile}</p>
                </div>
              </div>
              <div className="info-item">
                <Scissors size={18} />
                <div>
                  <p className="label">Item Type</p>
                  <p className="value">{order.item}</p>
                </div>
              </div>
              <div className="info-item">
                <Clock size={18} />
                <div>
                  <p className="label">Delivery Date</p>
                  <p className="value">{order.delivery}</p>
                </div>
              </div>
              <div className="info-item">
                <CreditCard size={18} />
                <div>
                  <p className="label">Payment Status</p>
                  <p className={`value ${order.total - order.paid > 0 ? 'text-urgent' : 'text-success'}`}>
                    {order.total - order.paid > 0 ? `₹${order.total - order.paid} Pending` : 'Fully Paid'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-card measurement-section">
            <h3>Measurement Profile</h3>
            <div className="m-display-grid">
              {Object.entries(order.measurements).map(([key, val]) => (
                <div key={key} className="m-item">
                  <span className="m-label">{key.replace('_', ' ').toUpperCase()}</span>
                  <span className="m-value">{val}</span>
                </div>
              ))}
            </div>
            <div className="m-diagram-preview">
              {/* Simplified Diagram Preview */}
              <svg viewBox="0 0 100 120" className="mini-anatomy">
                 <path d="M50,10 Q60,10 65,20 T70,40 L75,90 L25,90 L30,40 Q35,10 50,10" fill="none" stroke="var(--color-primary)" strokeWidth="1" />
                 <line x1="25" y1="50" x2="75" y2="50" stroke="var(--color-urgent)" strokeDasharray="2" strokeWidth="0.5" />
              </svg>
              <p>Visual Guide for {order.item}</p>
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
            <h3>Special Instructions</h3>
            <p className="notes-text">
              "Customer requested extra padding and deep neck in the back. Use golden piping on the borders."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
