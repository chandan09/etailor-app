import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import OrderList from './pages/OrderList';
import WorkerReport from './pages/WorkerReport';
import OrderDetail from './pages/OrderDetail';
import Payments from './pages/Payments';
import { SearchProvider } from './context/SearchContext';
import { OrderProvider } from './context/OrderContext';
import './index.css';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <OrderProvider>
      <SearchProvider>
        <Router>
          <div className="app-container">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
              <TopBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
              <div className="content-area">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/new-order" element={<NewOrder />} />
                  <Route path="/orders" element={<OrderList />} />
                  <Route path="/orders/:id" element={<OrderDetail />} />
                  <Route path="/workers" element={<WorkerReport />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </main>
          </div>
        </Router>
      </SearchProvider>
    </OrderProvider>
  );
}

export default App;
