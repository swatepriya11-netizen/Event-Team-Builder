import React from 'react';
import { 
  Users, 
  Layers, 
  CalendarCheck, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Database,
  ArrowUpRight
} from 'lucide-react';

export default function DashboardOverview({ 
  eventInfo, 
  volunteers = [], 
  teams = [], 
  tasks = [], 
  metrics, 
  onNavigate,
  onOpenAddVolunteer
}) {
  const readyVolunteers = volunteers.filter(v => v.status === 'Ready');
  const assignedVolunteers = volunteers.filter(v => v.status === 'Assigned');

  return (
    <div className="dashboard-overview">
      {/* Page Header */}
      <div className="overview-header">
        <div>
          <span className="overview-kicker">{eventInfo?.kicker || 'BUILT FOR CAMPUS CREWS'}</span>
          <h1 className="overview-title">Operations Dashboard</h1>
          <p className="overview-subtitle">
            Live volunteer deployment, shift progression, and squad coverage for {eventInfo?.name || 'Aurelia Cultural Fest ’26'}.
          </p>
        </div>

        <div className="overview-header-actions">
          <button 
            onClick={onOpenAddVolunteer} 
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>Add Volunteer</span>
          </button>
          <button 
            onClick={() => onNavigate('/dashboard/teams')} 
            className="btn btn-secondary"
          >
            <Layers size={16} />
            <span>Team Builder</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="card metric-card" onClick={() => onNavigate('/dashboard/volunteers')}>
          <div className="metric-header">
            <span className="metric-label">VOLUNTEER ROSTER</span>
            <Users size={18} color="#4ade80" />
          </div>
          <div className="metric-value">{volunteers.length} Active</div>
          <div className="metric-subtext">
            <span className="subtext-pill subtext-success">
              {assignedVolunteers.length} Assigned
            </span>
            <span style={{ color: '#9ca3af' }}>{readyVolunteers.length} Ready to match</span>
          </div>
        </div>

        <div className="card metric-card" onClick={() => onNavigate('/dashboard/tasks')}>
          <div className="metric-header">
            <span className="metric-label">TASKS & SHIFTS</span>
            <CalendarCheck size={18} color="#38bdf8" />
          </div>
          <div className="metric-value">{metrics?.totalTasks ?? tasks.length}</div>
          <div className="metric-subtext">
            <span className="subtext-pill subtext-warning">
              {metrics?.highPrioritySubtext || `${metrics?.highPriority ?? 0} High Priority`}
            </span>
            <span>Active today</span>
          </div>
        </div>

        <div className="card metric-card" onClick={() => onNavigate('/dashboard/teams')}>
          <div className="metric-header">
            <span className="metric-label">TEAM CAPACITY</span>
            <Layers size={18} color="#a855f7" />
          </div>
          <div className="metric-value">{metrics?.staffCoverage || '—'}</div>
          <div className="metric-subtext">
            <span className="subtext-pill subtext-info">
              {metrics?.staffCoveragePercent || '—'}
            </span>
            <span>Across {teams.length} teams</span>
          </div>
        </div>

        <div className="card metric-card" onClick={() => onNavigate('/dashboard/settings')}>
          <div className="metric-header">
            <span className="metric-label">COMPLETION RATE</span>
            <Sparkles size={18} color="#f59e0b" />
          </div>
          <div className="metric-value">{metrics ? `${metrics.completionRate}%` : '—'}</div>
          <div className="metric-subtext">
            <span className="subtext-pill subtext-success">
              {metrics?.completionRateSubtext || 'Across all tasks'}
            </span>
            <span>Target on schedule</span>
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="overview-split">
        {/* Left Column: Today's Shifts & Priority Tasks */}
        <div className="card section-card">
          <div className="section-header">
            <div>
              <h3 className="section-title">Today’s Shifts & Schedule</h3>
              <p className="section-desc">Active morning, afternoon, and evening crew rotations.</p>
            </div>
            <button 
              onClick={() => onNavigate('/dashboard/tasks')}
              className="btn btn-outline btn-sm"
            >
              <span>View All</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="shifts-list">
            {tasks.slice(0, 4).map((task) => (
              <div key={task._id} className="shift-row">
                <div className="shift-left">
                  <div className={`priority-indicator priority-${(task.priority || 'medium').toLowerCase()}`} />
                  <div>
                    <span className="shift-name">{task.title}</span>
                    <span className="shift-time">{task.shiftTime} • {task.location || 'Main Amphitheater'}</span>
                  </div>
                </div>

                <div className="shift-right">
                  <span className="badge badge-neutral">
                    {task.assignedCrewCount || 0} / {task.requiredCrew || 4} crew
                  </span>
                  <span className={`badge ${task.status === 'Completed' ? 'badge-live' : task.status === 'In Progress' ? 'badge-warning' : 'badge-neutral'}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Squad Coverage */}
        <div className="card section-card">
          <div className="section-header">
            <div>
              <h3 className="section-title">Team Coverage</h3>
              <p className="section-desc">Squad staffing status across event functional zones.</p>
            </div>
            <button 
              onClick={() => onNavigate('/dashboard/teams')}
              className="btn btn-outline btn-sm"
            >
              <span>Manage Teams</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="team-bars-list">
            {teams.map((team) => {
              const percent = Math.min(100, Math.round(((team.assignedCount || 0) / (team.targetCapacity || 8)) * 100));
              return (
                <div key={team._id} className="team-progress-card">
                  <div className="team-progress-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="team-dot" style={{ background: team.color || '#22c55e' }} />
                      <span className="team-title">{team.name}</span>
                    </div>
                    <span className="team-status-text">
                      {team.assignedCount || 0} / {team.targetCapacity || 8} assigned
                    </span>
                  </div>

                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${percent}%`,
                        backgroundColor: team.color || '#22c55e' 
                      }} 
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6b7280', marginTop: 4 }}>
                    <span>Lead: {team.leadName || 'Unassigned'}</span>
                    <span>{percent}% Filled</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-overview {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .overview-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }
        .overview-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 4px;
        }
        .overview-title {
          font-size: 30px;
          margin-bottom: 6px;
        }
        .overview-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .overview-header-actions {
          display: flex;
          gap: 10px;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
        .metric-card {
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 20px;
        }
        .metric-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }
        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .metric-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .metric-value {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .metric-subtext {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          flex-wrap: wrap;
        }
        .subtext-pill {
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 11px;
        }
        .subtext-success {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
        }
        .subtext-warning {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .subtext-info {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }
        .overview-split {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .overview-split {
            grid-template-columns: 1fr;
          }
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .section-title {
          font-size: 17px;
          margin-bottom: 4px;
        }
        .section-desc {
          font-size: 12px;
          color: var(--text-muted);
        }
        .shifts-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .shift-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .shift-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .priority-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .priority-high {
          background: #ef4444;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
        }
        .priority-medium {
          background: #f59e0b;
        }
        .priority-low {
          background: #3b82f6;
        }
        .shift-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
          display: block;
        }
        .shift-time {
          font-size: 11px;
          color: var(--text-muted);
        }
        .shift-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .team-bars-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .team-progress-card {
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .team-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .team-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .team-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }
        .team-status-text {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .progress-bar-bg {
          width: 100%;
          height: 6px;
          background: #272e27;
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.4s ease;
        }
      `}</style>
    </div>
  );
}
