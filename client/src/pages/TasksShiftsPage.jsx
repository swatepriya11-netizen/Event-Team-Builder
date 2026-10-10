import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Users, 
  Check, 
  MoreVertical,
  Trash2,
  MapPin
} from 'lucide-react';
import api from '../services/api';

export default function TasksShiftsPage({ 
  tasks = [], 
  teams = [], 
  metrics, 
  onRefresh, 
  onShowToast,
  onOpenCreateTask 
}) {
  const [filterPriority, setFilterPriority] = useState('All');

  const filteredTasks = tasks.filter(t => {
    if (filterPriority === 'All') return true;
    return t.priority === filterPriority;
  });

  const handleToggleTaskStatus = async (task) => {
    const nextStatus = task.status === 'Completed' ? 'Pending' : task.status === 'Pending' ? 'In Progress' : 'Completed';
    try {
      await api.updateTask(task._id, { status: nextStatus });
      if (onShowToast) onShowToast(`Task status: ${nextStatus}`);
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteTask = async (taskId, taskTitle) => {
    if (!window.confirm(`Delete "${taskTitle}"?`)) return;
    try {
      await api.deleteTask(taskId);
      if (onShowToast) onShowToast('Task deleted');
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="tasks-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="page-kicker">AURELIA CULTURAL FEST ’26</span>
          <h1 className="page-title">Tasks & Shifts</h1>
          <p className="page-subtitle">
            Coordinate day-of-event shifts, critical production runs, and crew rosters in real-time.
          </p>
        </div>

        <button onClick={onOpenCreateTask} className="btn btn-primary">
          <Plus size={16} />
          <span>New Shift / Task</span>
        </button>
      </div>

      {/* Top Metrics Row */}
      <div className="tasks-metrics-grid">
        <div className="card metric-box">
          <span className="metric-tag">TOTAL TASKS</span>
          <span className="metric-num">{metrics?.totalTasks ?? tasks.length}</span>
          <span className="metric-sub sub-warning">
            {metrics?.highPrioritySubtext || `${metrics?.highPriority ?? 0} High Priority`}
          </span>
        </div>

        <div className="card metric-box">
          <span className="metric-tag">ACTIVE SHIFTS</span>
          <span className="metric-num">{metrics?.activeShifts ?? 0}</span>
          <span className="metric-sub">{metrics?.activeShiftsSubtext || 'No active shifts'}</span>
        </div>

        <div className="card metric-box">
          <span className="metric-tag">STAFF COVERAGE</span>
          <span className="metric-num">
            {metrics ? metrics.staffCoverage : `${tasks.reduce((s, t) => s + (t.assignedCrewCount || 0), 0)} / ${tasks.reduce((s, t) => s + (t.requiredCrew || 0), 0)}`}
          </span>
          <span className="metric-sub sub-success">{metrics?.staffCoveragePercent || '0% Capacity Assigned'}</span>
        </div>

        <div className="card metric-box">
          <span className="metric-tag">COMPLETION RATE</span>
          <span className="metric-num">{metrics ? `${metrics.completionRate}%` : '—'}</span>
          <span className="metric-sub sub-success">
            {metrics?.completionRateSubtext || 'Across all tasks'}
          </span>
        </div>
      </div>

      {/* Board Split: Shifts Timeline & Task Queue */}
      <div className="tasks-board">
        {/* Left Column: Today's Shifts */}
        <div className="card shifts-column">
          <div className="column-header">
            <h3 className="column-heading">Today’s shifts</h3>
            <span className="column-note">19 September 2026</span>
          </div>

          <div className="shifts-stack">
            {tasks.map((task) => (
              <div key={task._id} className="shift-card">
                <div className="shift-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Clock size={14} color="#4ade80" />
                    <span className="shift-label">{task.shiftTime || task.title}</span>
                  </div>
                  <span className="badge badge-neutral">
                    {task.assignedCrewCount || 0} / {task.requiredCrew || 4} crew
                  </span>
                </div>

                <div className="shift-meta">
                  <span className="shift-team-tag">{task.teamName || 'General Crew'}</span>
                  <span className="shift-loc">
                    <MapPin size={11} />
                    {task.location || 'Mainstage'}
                  </span>
                </div>

                <div className="progress-bar-bg" style={{ height: 4, marginTop: 8 }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${Math.min(100, Math.round(((task.assignedCrewCount || 0) / (task.requiredCrew || 4)) * 100))}%`,
                      backgroundColor: '#22c55e',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Priority Task Queue */}
        <div className="card queue-column">
          <div className="column-header">
            <div>
              <h3 className="column-heading">Priority Task Queue</h3>
              <p className="column-note">Click checkbox to transition: Pending → In Progress → Completed</p>
            </div>

            <div className="priority-filters">
              {['All', 'High', 'Medium', 'Low'].map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`p-filter-btn ${filterPriority === p ? 'p-filter-active' : ''}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="queue-list">
            {filteredTasks.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#6b7280' }}>
                No tasks match the selected priority filter.
              </div>
            ) : (
              filteredTasks.map((task) => {
                const isComplete = task.status === 'Completed';
                const inProgress = task.status === 'In Progress';

                return (
                  <div 
                    key={task._id} 
                    className={`queue-item ${isComplete ? 'queue-item-complete' : ''}`}
                  >
                    <button
                      onClick={() => handleToggleTaskStatus(task)}
                      className={`task-check-circle ${isComplete ? 'check-done' : inProgress ? 'check-progress' : ''}`}
                      title="Click to toggle status"
                    >
                      {isComplete && <Check size={12} color="#0c140c" />}
                      {inProgress && <div className="progress-dot" />}
                    </button>

                    <div className="queue-item-content">
                      <div className="task-title-line">
                        <span className={`task-title ${isComplete ? 'task-title-strike' : ''}`}>
                          {task.title}
                        </span>
                        <span className={`priority-badge priority-badge-${task.priority.toLowerCase()}`}>
                          {task.priority}
                        </span>
                      </div>

                      <p className="task-description">{task.description}</p>

                      <div className="task-bottom-meta">
                        <span className="task-assignees">
                          <Users size={12} />
                          {task.assigneeNames?.length > 0 
                            ? task.assigneeNames.join(', ')
                            : `${task.assignedCrewCount || 0} crew assigned`}
                        </span>
                        <span className="task-status-pill">{task.status}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTask(task._id, task.title)}
                      className="task-delete-btn"
                      title="Delete task"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <style>{`
        .tasks-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }
        .page-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 4px;
        }
        .page-title {
          font-size: 30px;
          margin-bottom: 6px;
        }
        .page-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .tasks-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .tasks-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .tasks-metrics-grid {
            grid-template-columns: 1fr;
          }
        }
        .metric-box {
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
        }
        .metric-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .metric-num {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .metric-sub {
          font-size: 11px;
          color: var(--text-muted);
        }
        .sub-warning {
          color: #fbbf24;
          font-weight: 600;
        }
        .sub-success {
          color: #4ade80;
          font-weight: 600;
        }
        .tasks-board {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 24px;
        }
        @media (max-width: 960px) {
          .tasks-board {
            grid-template-columns: 1fr;
          }
        }
        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .column-heading {
          font-size: 17px;
          margin-bottom: 2px;
        }
        .column-note {
          font-size: 12px;
          color: var(--text-muted);
        }
        .priority-filters {
          display: flex;
          gap: 4px;
        }
        .p-filter-btn {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: #191e19;
          border: 1px solid var(--border-subtle);
          transition: all 0.15s;
        }
        .p-filter-active {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border-color: rgba(34, 197, 94, 0.4);
        }
        .shifts-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .shift-card {
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .shift-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .shift-label {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }
        .shift-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .shift-loc {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .queue-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .queue-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: background 0.15s;
        }
        .queue-item:hover {
          background: #1d231d;
        }
        .queue-item-complete {
          opacity: 0.65;
        }
        .task-check-circle {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid var(--border-medium);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .task-check-circle:hover {
          border-color: var(--accent-primary);
        }
        .check-done {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }
        .check-progress {
          border-color: #fbbf24;
        }
        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fbbf24;
        }
        .queue-item-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .task-title-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .task-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }
        .task-title-strike {
          text-decoration: line-through;
          color: var(--text-muted);
        }
        .priority-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .priority-badge-high {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }
        .priority-badge-medium {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .priority-badge-low {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
        }
        .task-description {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .task-bottom-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .task-assignees {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .task-status-pill {
          background: #141714;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .task-delete-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          transition: color 0.15s;
        }
        .task-delete-btn:hover {
          color: #f87171;
        }
      `}</style>
    </div>
  );
}
