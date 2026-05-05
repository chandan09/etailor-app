import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within an OrderProvider');
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    { id: 'ORD-7241', customerName: 'Priya Sharma', mobile: '9876543210', address: '123, Rose Garden, Bangalore', category: 'blouse', date: '2026-05-01', deliveryDate: '2026-05-05', status: 'Active', total: 2500, paid: 1000, urgency: true, serviceType: 'stitching', measurements: { Chest: 36, Waist: 30 }, description: 'Heavy embroidery' },
    { id: 'ORD-7238', customerName: 'Anjali Nair', mobile: '9123456789', address: 'Plot 45, Green View, Kerala', category: 'kurti', date: '2026-04-28', deliveryDate: '2026-05-06', status: 'Pending', total: 4500, paid: 4500, urgency: false, serviceType: 'stitching', measurements: { Chest: 34, Waist: 28 }, description: '' },
    { id: 'ORD-7235', customerName: 'Meera Das', mobile: '9988776655', address: 'Apt 202, Skyline Towers, Kolkata', category: 'lehenga', date: '2026-04-25', deliveryDate: '2026-05-02', status: 'Completed', total: 8000, paid: 5000, urgency: false, serviceType: 'stitching', measurements: { Waist: 32, Length: 40 }, description: 'Velvet fabric' },
  ]);

  const addOrder = (newOrder) => setOrders(prev => [newOrder, ...prev]);
  const updateOrder = (updatedOrder) => setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  const updateOrderStatus = (orderId, status) => setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  const toggleUrgency = (orderId) => setOrders(prev => prev.map(o => o.id === orderId ? { ...o, urgency: !o.urgency } : o));
  const getOrderById = (id) => orders.find(o => o.id === id);

  useEffect(() => {
    localStorage.setItem('etailor_orders', JSON.stringify(orders));
  }, [orders]);

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      updateOrder,
      updateOrderStatus, 
      toggleUrgency, 
      getOrderById 
    }}>
      {children}
    </OrderContext.Provider>
  );
};
