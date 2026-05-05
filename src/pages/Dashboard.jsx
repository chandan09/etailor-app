import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  ChevronRight,
  Plus
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';
import './Dashboard.css';

import { useOrders } from '../context/OrderContext';

const Dashboard = () => {
  const { orders } = useOrders();

  const activeCount = orders.filter(o => o.status === 'Active' || o.status === 'Pending').length;
  const completedCount = orders.filter(o => o.status === 'Completed').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.total) || 0), 0);

  const stats = [
    { label: 'Active Orders', value: activeCount, icon: Clock, color: 'var(--color-pending)', trend: '+12%' },
    { label: 'Completed', value: completedCount, icon: CheckCircle2, color: 'var(--color-completed)', trend: '+5%' },
    { label: 'Delivered', value: deliveredCount, icon: ShoppingBag, color: 'var(--color-delivered)', trend: '+18%' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'var(--color-primary)', trend: '+24%' },
  ];

  // Keep mock data for graphs that require historical timestamps we don't track yet
  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const yearlyData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ];

  // Dynamic pie chart calculation
  const stitchingCount = orders.filter(o => o.serviceType === 'stitching').length;
  const alterationCount = orders.filter(o => o.serviceType === 'alteration').length;
  const totalServices = (stitchingCount + alterationCount) || 1; 

  const serviceData = [
    { name: 'Stitching', value: Math.round((stitchingCount / totalServices) * 100) },
    { name: 'Alteration', value: Math.round((alterationCount / totalServices) * 100) },
  ];

  const priorityOrders = orders.filter(o => o.urgency).slice(0, 5);
  const displayOrders = priorityOrders.length > 0 ? priorityOrders : orders.slice(0, 5);

  const COLORS = ['var(--color-primary)', 'var(--color-primary-light)'];

  return (
    <div className="dashboard-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Executive Dashboard</h1>
          <p className="subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="header-actions" style={{display: 'flex', gap: 'var(--spacing-md)'}}>
          <button className="outline-btn">
            <TrendingUp size={18} />
            <span>Reports</span>
          </button>
          <Link to="/new-order" className="btn-primary">
            <Plus size={18} />
            <span>New Order</span>
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="premium-card stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-trend positive">{stat.trend} from last month</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="premium-card chart-container main-chart">
          <div className="chart-header">
            <h3>Sales Report (Weekly)</h3>
            <div className="chart-actions">
              <select className="chart-select">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)'}}
                />
                <Bar dataKey="sales" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card chart-container side-chart">
          <div className="chart-header">
            <h3>Service Breakdown</h3>
          </div>
          <div className="chart-wrapper pie-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={serviceData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {serviceData.map((item, i) => (
                <div key={i} className="legend-item">
                  <span className="dot" style={{ backgroundColor: COLORS[i] }}></span>
                  <span className="label">{item.name}</span>
                  <span className="value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="premium-card chart-container full-chart">
          <div className="chart-header">
            <h3>Yearly Revenue Trends</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={yearlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-primary)" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="recent-orders-section">
        <div className="section-header">
          <h3>Recent High-Priority Orders</h3>
          <button className="text-btn">View All <ChevronRight size={16} /></button>
        </div>
        <div className="premium-card table-card">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/orders/${order.id}`} className="order-link">#{order.id}</Link>
                  </td>
                  <td>{order.customerName}</td>
                  <td>{order.category.toUpperCase()}</td>
                  <td>{order.deliveryDate}</td>
                  <td>
                    {order.urgency ? (
                      <span className="badge badge-urgent">Urgent!</span>
                    ) : (
                      <span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/orders/${order.id}`} className="text-btn">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
