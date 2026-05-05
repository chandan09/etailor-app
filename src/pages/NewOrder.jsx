import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Ruler, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Search,
  Plus,
  Clock
} from 'lucide-react';
import './NewOrder.css';

const NewOrder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    area: '',
    serviceType: 'stitching', // 'stitching' or 'alteration'
    category: '',
    description: '',
    measurements: {},
    urgency: false,
    deliveryDate: ''
  });
  const [suggestions, setSuggestions] = useState([]);

  const categories = [
    { id: 'blouse', label: 'Blouse', icon: '👚' },
    { id: 'saree', label: 'Saree', icon: '🧣' },
    { id: 'kurti', label: 'Kurti', icon: '👗' },
    { id: 'lehenga', label: 'Lehenga', icon: '💃' },
    { id: 'gown', label: 'Gown', icon: '👗' },
    { id: 'pant', label: 'Pant/Palazzo', icon: '👖' },
  ];

  const measurementFields = {
    blouse: [
      { id: 'length', label: 'Full Length', diagram: '📏' },
      { id: 'shoulder', label: 'Shoulder', diagram: '📏' },
      { id: 'chest', label: 'Chest/Bust', diagram: '📏' },
      { id: 'waist', label: 'Waist', diagram: '📏' },
      { id: 'neck_front', label: 'Front Neck Depth', diagram: '📏' },
      { id: 'neck_back', label: 'Back Neck Depth', diagram: '📏' },
      { id: 'sleeve_length', label: 'Sleeve Length', diagram: '📏' },
      { id: 'sleeve_round', label: 'Sleeve Round', diagram: '📏' },
      { id: 'armhole', label: 'Armhole', diagram: '📏' },
    ],
    kurti: [
      { id: 'length', label: 'Length', diagram: '📏' },
      { id: 'chest', label: 'Chest', diagram: '📏' },
      { id: 'waist', label: 'Waist', diagram: '📏' },
      { id: 'hip', label: 'Hip', diagram: '📏' },
      { id: 'shoulder', label: 'Shoulder', diagram: '📏' },
    ]
  };

  const handleNext = () => {
    console.log('Current Step:', step); // For debugging
    if (step === 1 && (!formData.customerName || !formData.mobile)) {
      alert('Please enter both Customer Name and Mobile Number.');
      return;
    }
    if (step === 2 && !formData.category) {
      alert('Please select an outfit category.');
      return;
    }
    
    if (step < 5) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0); // Scroll to top for new step
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const mockCustomers = [
    { name: 'Priya Sharma', mobile: '9876543210', area: 'Park Avenue' },
    { name: 'Anjali Nair', mobile: '9123456789', area: 'Silk City' },
    { name: 'Meera Das', mobile: '8877665544', area: 'Green Valley' },
    { name: 'Sneha Rao', mobile: '7766554433', area: 'Downtown' },
  ];

  const handleMobileSearch = (val) => {
    setFormData({...formData, mobile: val});
    if (val.length > 2) {
      const matches = mockCustomers.filter(c => c.mobile.includes(val));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleNameSearch = (val) => {
    setFormData({...formData, customerName: val});
    if (val.length > 1) {
      const matches = mockCustomers.filter(c => c.name.toLowerCase().includes(val.toLowerCase()));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const selectCustomer = (customer) => {
    setFormData({
      ...formData,
      customerName: customer.name,
      mobile: customer.mobile,
      area: customer.area
    });
    setSuggestions([]);
  };

  return (
    <div className="new-order-container">
      <div className="wizard-stepper">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className={`step-item ${step >= num ? 'active' : ''} ${step > num ? 'completed' : ''}`}>
            <div className="step-number">{step > num ? <CheckCircle size={20} /> : num}</div>
            <span className="step-label">
              {num === 1 && 'Customer'}
              {num === 2 && 'Category'}
              {num === 3 && 'Measurements'}
              {num === 4 && 'Delivery'}
              {num === 5 && 'Review'}
            </span>
            {num < 5 && <div className="step-line"></div>}
          </div>
        ))}
      </div>

      <div className="wizard-content premium-card">
        {step === 1 && (
          <div className="step-content animate-slide-in">
            <h2>Customer Information</h2>
            <p className="step-desc">Enter customer details or search existing profile.</p>
            <div className="form-grid">
              <div className="form-row">
                <div className="form-group search-container">
                  <label>Mobile Number</label>
                  <div className="input-with-icon">
                    <Search size={18} />
                    <input 
                      type="tel" 
                      placeholder="Search phone..." 
                      value={formData.mobile}
                      onChange={(e) => handleMobileSearch(e.target.value)}
                    />
                  </div>
                  {suggestions.length > 0 && step === 1 && (
                    <div className="suggestions-dropdown">
                      {suggestions.map((c, i) => (
                        <div key={i} className="suggestion-item" onClick={() => selectCustomer(c)}>
                          <p><strong>{c.name}</strong> - {c.mobile}</p>
                          <p className="s-area">{c.area}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} />
                    <input 
                      type="text" 
                      placeholder="Search name..." 
                      value={formData.customerName}
                      onChange={(e) => handleNameSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Area / Locality</label>
                  <div className="input-with-icon">
                    <Plus size={18} />
                    <input 
                      type="text" 
                      placeholder="Enter locality..." 
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button 
                    className="outline-btn" 
                    style={{ height: '52px', width: '100%', justifyContent: 'center' }}
                    onClick={() => setFormData({customerName: '', mobile: '', area: '', category: '', measurements: {}, urgency: false})}
                  >
                    <Plus size={16} /> New Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content animate-slide-in">
            <h2>Service & Category</h2>
            <p className="step-desc">Select the type of service and outfit.</p>
            
            <div className="service-radio-group">
              <label className={`radio-item ${formData.serviceType === 'stitching' ? 'checked' : ''}`}>
                <input 
                  type="radio" 
                  name="serviceType" 
                  value="stitching"
                  checked={formData.serviceType === 'stitching'}
                  onChange={() => setFormData({...formData, serviceType: 'stitching'})}
                />
                <span className="radio-dot"></span>
                <span className="radio-label">New Stitching</span>
              </label>
              <label className={`radio-item ${formData.serviceType === 'alteration' ? 'checked' : ''}`}>
                <input 
                  type="radio" 
                  name="serviceType" 
                  value="alteration"
                  checked={formData.serviceType === 'alteration'}
                  onChange={() => setFormData({...formData, serviceType: 'alteration'})}
                />
                <span className="radio-dot"></span>
                <span className="radio-label">Alteration</span>
              </label>
            </div>

            <div className="category-grid">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  className={`category-card ${formData.category === cat.id ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, category: cat.id})}
                >
                  <div className="cat-icon">{cat.icon}</div>
                  <span className="cat-label">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content measurement-step animate-slide-in">
            <div className="measurement-header">
              <h2>Measurements: {formData.category.toUpperCase()}</h2>
              <div className="unit-toggle">
                <button className="active">Inches</button>
                <button>cm</button>
              </div>
            </div>
            
            <div className="measurement-layout">
              <div className="measurement-inputs">
                {(measurementFields[formData.category] || measurementFields.blouse).map((field) => (
                  <div key={field.id} className="m-field">
                    <label>{field.label}</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      placeholder="0.0"
                      onChange={(e) => setFormData({
                        ...formData, 
                        measurements: {...formData.measurements, [field.id]: e.target.value}
                      })}
                    />
                  </div>
                ))}
              </div>
              <div className="measurement-diagram-container premium-card">
                <div className="diagram-placeholder">
                  <p>Measurement Guide for {formData.category}</p>
                  <div className="visual-guide">
                    {/* Anatomical diagram would go here */}
                    <div className="anatomy-silhouette">
                       <svg viewBox="0 0 100 200" className="anatomy-svg">
                         <path d="M50,20 Q60,20 65,30 T70,50 L75,100 L65,100 L60,180 L40,180 L35,100 L25,100 L30,50 Q35,20 50,20" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
                         <line x1="25" y1="60" x2="75" y2="60" stroke="var(--color-urgent)" strokeDasharray="4" />
                         <text x="78" y="62" fontSize="6" fill="var(--color-urgent)">Chest</text>
                         <line x1="35" y1="100" x2="65" y2="100" stroke="var(--color-urgent)" strokeDasharray="4" />
                         <text x="68" y="102" fontSize="6" fill="var(--color-urgent)">Waist</text>
                       </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content animate-slide-in">
            <h2>Details & Delivery</h2>
            <p className="step-desc">Enter special instructions and the expected delivery date.</p>
            <div className="form-grid">
              <div className="form-group">
                <label>Expected Delivery Date</label>
                <div className="input-with-icon">
                  <Clock size={18} />
                  <input 
                    type="date" 
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Special Instructions / Notes</label>
                <textarea 
                  placeholder="E.g. Extra padding, deep neck, golden piping..." 
                  className="premium-textarea"
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="form-group">
                 <div className="urgency-toggle-large">
                   <label className="switch">
                     <input 
                      type="checkbox" 
                      checked={formData.urgency}
                      onChange={(e) => setFormData({...formData, urgency: e.target.checked})}
                     />
                     <span className="slider round"></span>
                   </label>
                   <div>
                     <p className="u-label">Mark as <strong>Urgent!</strong></p>
                     <p className="u-desc">Prioritizes this order in the dashboard and worker list.</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="step-content animate-slide-in">
            <h2>Master Review</h2>
            <p className="step-desc">Verify all details before creating the order.</p>
            <div className="review-master-grid">
              <div className="review-card-mini">
                <h4>Customer Info</h4>
                <p><strong>{formData.customerName}</strong></p>
                <p>{formData.mobile}</p>
                <p>{formData.area}</p>
              </div>
              <div className="review-card-mini">
                <h4>Service & Outfit</h4>
                <p><strong>{formData.serviceType.toUpperCase()}</strong></p>
                <p>{formData.category.toUpperCase()}</p>
                {formData.urgency && <span className="badge badge-urgent">URGENT</span>}
              </div>
              <div className="review-card-mini">
                <h4>Delivery</h4>
                <p><strong>{formData.deliveryDate || 'Not Set'}</strong></p>
              </div>
            </div>
            
            <div className="review-measurements-summary">
              <h4>Measurement Profile</h4>
              <div className="m-summary-grid">
                {Object.entries(formData.measurements).map(([key, val]) => (
                  <div key={key} className="m-pill">
                    <span className="mp-label">{key.replace('_', ' ')}:</span>
                    <span className="mp-val">{val}"</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="review-notes">
               <h4>Notes</h4>
               <p>{formData.description || 'No special instructions.'}</p>
            </div>
          </div>
        )}

      </div>

      <div className="wizard-footer-fixed">
        <div className="footer-content">
          {step > 1 && (
            <button className="btn-secondary" onClick={handleBack}>
              <ArrowLeft size={18} /> Back
            </button>
          )}
          <button 
            className="btn-primary btn-pulsate" 
            id="wizard-continue-btn"
            onClick={step === 5 ? () => {
              alert('Order Created Successfully!');
              navigate('/orders');
            } : handleNext}
          >
            {step === 5 ? 'Create Order' : 'Continue'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
