import React from 'react';
import { Scissors, Ruler, TrendingUp, Award } from 'lucide-react';
import './WorkerReport.css';

const WorkerReport = () => {
  const workers = [
    { name: 'Sameer Ahmed', stitching: 24, alteration: 8, efficiency: '94%', status: 'Active' },
    { name: 'Radha Devi', stitching: 18, alteration: 12, efficiency: '88%', status: 'Active' },
    { name: 'Imran Khan', stitching: 32, alteration: 4, efficiency: '97%', status: 'On Break' },
    { name: 'Sunita Pal', stitching: 15, alteration: 20, efficiency: '91%', status: 'Active' },
  ];

  return (
    <div className="worker-report-page animate-slide-in">
      <div className="page-header">
        <h1>Worker Productivity</h1>
        <p className="subtitle">Track stitching and alteration tasks per worker.</p>
      </div>

      <div className="worker-stats-row">
        <div className="premium-card w-stat">
          <div className="w-stat-icon s"><Scissors size={20} /></div>
          <div>
            <p>Total Stitching</p>
            <h3>89 Units</h3>
          </div>
        </div>
        <div className="premium-card w-stat">
          <div className="w-stat-icon a"><Ruler size={20} /></div>
          <div>
            <p>Total Alterations</p>
            <h3>44 Units</h3>
          </div>
        </div>
        <div className="premium-card w-stat">
          <div className="w-stat-icon e"><TrendingUp size={20} /></div>
          <div>
            <p>Avg Efficiency</p>
            <h3>92.5%</h3>
          </div>
        </div>
      </div>

      <div className="premium-card table-wrapper">
        <table className="worker-table">
          <thead>
            <tr>
              <th>Worker Name</th>
              <th>Stitching</th>
              <th>Alteration</th>
              <th>Efficiency</th>
              <th>Status</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, i) => (
              <tr key={i}>
                <td>
                  <div className="worker-info">
                    <div className="w-avatar">{worker.name.charAt(0)}</div>
                    <span>{worker.name}</span>
                  </div>
                </td>
                <td><strong>{worker.stitching}</strong></td>
                <td>{worker.alteration}</td>
                <td><span className="eff-badge">{worker.efficiency}</span></td>
                <td>
                  <span className={`status-dot ${worker.status === 'Active' ? 'online' : 'offline'}`}></span>
                  {worker.status}
                </td>
                <td>
                  <div className="perf-bar">
                    <div className="perf-fill" style={{ width: worker.efficiency }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="top-performer premium-card">
        <Award size={32} className="award-icon" />
        <div className="performer-details">
          <h3>Top Performer of the Month</h3>
          <p><strong>Imran Khan</strong> completed 36 tasks with 97% accuracy.</p>
        </div>
        <button className="btn-primary">Reward Bonus</button>
      </div>
    </div>
  );
};

export default WorkerReport;
