import React from 'react';
import { X, Printer, Share2, Scissors } from 'lucide-react';
import './InvoiceModal.css';

const InvoiceModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content premium-card invoice-paper">
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        
        <div className="invoice-header">
          <div className="i-logo">
            <Scissors size={32} />
            <div>
              <h2>eTailor Pro</h2>
              <p>Premium Boutique Solutions</p>
            </div>
          </div>
          <div className="i-meta">
            <h1>INVOICE</h1>
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="invoice-addresses">
          <div className="i-from">
            <h4>Boutique Address</h4>
            <p>123 Fashion Street, Silk City</p>
            <p>Contact: +91 98765 43210</p>
          </div>
          <div className="i-to">
            <h4>Bill To</h4>
            <p><strong>{order.customer}</strong></p>
            <p>Mobile: {order.mobile || 'N/A'}</p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.item} (Stitching)</td>
              <td>1</td>
              <td>₹{order.total}</td>
              <td>₹{order.total}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Amount</td>
              <td>₹{order.total}</td>
            </tr>
            <tr>
              <td colSpan="3">Amount Paid</td>
              <td>₹{order.paid}</td>
            </tr>
            <tr className="balance-due">
              <td colSpan="3">Balance Due</td>
              <td>₹{order.total - order.paid}</td>
            </tr>
          </tfoot>
        </table>

        <div className="invoice-footer">
          <p>Thank you for choosing eTailor Pro!</p>
          <div className="footer-actions">
            <button className="btn-primary" onClick={() => window.print()}>
              <Printer size={18} /> Print Invoice
            </button>
            <button className="outline-btn">
              <Share2 size={18} /> WhatsApp Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
