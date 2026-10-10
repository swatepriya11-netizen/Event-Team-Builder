import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  CheckCircle, 
  Clock, 
  ShieldAlert, 
  MoreVertical,
  Check,
  UserCheck,
  Trash2,
  Edit2
} from 'lucide-react';
import api from '../services/api';

export default function VolunteersPage({ 
  volunteers = [], 
  teams = [], 
  onRefresh, 
  onOpenAddVolunteer,
  onShowToast 
}) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [assigningId, setAssigningId] = useState(null);

  const filteredVolunteers = volunteers.filter((vol) => {
    const matchesStatus = filterStatus === 'All' || vol.status.toLowerCase() === filterStatus.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch = 
      !search ||
      vol.name.toLowerCase().includes(query) ||
      vol.email.toLowerCase().includes(query) ||
      vol.role?.toLowerCase().includes(query) ||
      vol.skills?.some(s => s.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  const handleAssignTeam = async (volId, teamId) => {
    try {
      await api.updateVolunteer(volId, { teamId: teamId || null });
      if (onShowToast) onShowToast(teamId ? 'Assigned to team!' : 'Moved to unassigned');
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleCheckIn = async (vol) => {
    try {
      await api.updateVolunteer(vol._id, { checkInStatus: !vol.checkInStatus });
      if (onShowToast) onShowToast(vol.checkInStatus ? 'Check-in cancelled' : `${vol.name} checked in!`);
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteVolunteer = async (volId, volName) => {
    if (!window.confirm(`Are you sure you want to remove ${volName}?`)) return;
    try {
      await api.deleteVolunteer(volId);
      if (onShowToast) onShowToast('Volunteer removed');
      onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="volunteers-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="page-kicker">AURELIA CULTURAL FEST ’26</span>
          <h1 className="page-title">Volunteer Roster</h1>
          <p className="page-subtitle">
            Search, filter, check-in, and deploy volunteers across stage, media, and guest operations.
          </p>
        </div>

        <button onClick={onOpenAddVolunteer} className="btn btn-primary">
          <Plus size={16} />
          <span>Add Volunteer</span>
        </button>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="controls-card card">
        <div className="filter-pills">
          {['All', 'Ready', 'Assigned'].map((status) => {
            const count = status === 'All' 
              ? volunteers.length 
              : volunteers.filter(v => v.status.toLowerCase() === status.toLowerCase()).length;
            const isActive = filterStatus === status;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`filter-pill ${isActive ? 'filter-pill-active' : ''}`}
              >
                <span>{status === 'All' ? 'All Volunteers' : status}</span>
                <span className="pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="search-box">
          <Search size={15} color="#9ca3af" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, skill, or role..."
            className="search-input"
          />
        </div>
      </div>

      {/* Volunteers Roster List */}
      <div className="roster-wrapper card">
        <div className="roster-table-header">
          <span className="col-name">VOLUNTEER & ROLE</span>
          <span className="col-skills">SKILLS</span>
          <span className="col-avail">AVAILABILITY</span>
          <span className="col-team">ASSIGNED TEAM</span>
          <span className="col-status">CHECK-IN</span>
          <span className="col-actions">ACTION</span>
        </div>

        <div className="roster-table-body">
          {filteredVolunteers.length === 0 ? (
            <div className="empty-state">
              <Users size={32} color="#6b7280" />
              <p>No volunteers found matching your query.</p>
              <button onClick={() => { setFilterStatus('All'); setSearch(''); }} className="btn btn-outline btn-sm">
                Reset Filters
              </button>
            </div>
          ) : (
            filteredVolunteers.map((vol) => (
              <div key={vol._id} className="roster-row">
                {/* Profile */}
                <div className="col-name vol-profile-col">
                  <div className="vol-avatar" style={{ background: `${vol.avatarColor || '#22c55e'}22`, color: vol.avatarColor || '#22c55e' }}>
                    {vol.name.charAt(0)}
                  </div>
                  <div className="vol-info">
                    <span className="vol-name">{vol.name}</span>
                    <span className="vol-email">{vol.email}</span>
                    <span className="vol-role">{vol.role || 'Crew'}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="col-skills vol-skills-col">
                  {vol.skills?.slice(0, 3).map((skill, i) => (
                    <span key={i} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                  {vol.skills?.length > 3 && (
                    <span className="skill-tag" style={{ background: 'none', color: '#6b7280' }}>
                      +{vol.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Availability */}
                <div className="col-avail vol-avail-col">
                  {vol.availability?.map((a, i) => (
                    <span key={i} className="avail-badge">
                      <Clock size={11} />
                      {a}
                    </span>
                  ))}
                </div>

                {/* Assigned Team */}
                <div className="col-team vol-team-col">
                  <select
                    value={vol.teamId || ''}
                    onChange={(e) => handleAssignTeam(vol._id, e.target.value)}
                    className="team-select"
                  >
                    <option value="">Unassigned (Ready)</option>
                    {teams.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Check In Status */}
                <div className="col-status vol-status-col">
                  <button
                    onClick={() => handleToggleCheckIn(vol)}
                    className={`checkin-btn ${vol.checkInStatus ? 'checkin-active' : ''}`}
                    title={vol.checkInStatus ? 'Click to undo check-in' : 'Click to check in'}
                  >
                    {vol.checkInStatus ? (
                      <>
                        <Check size={13} />
                        <span>Checked In</span>
                      </>
                    ) : (
                      <span>Pending</span>
                    )}
                  </button>
                </div>

                {/* Actions */}
                <div className="col-actions vol-actions-col">
                  <button 
                    onClick={() => handleDeleteVolunteer(vol._id, vol.name)}
                    className="action-icon-btn action-delete"
                    title="Remove Volunteer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .volunteers-page {
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
        .controls-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .filter-pills {
          display: flex;
          gap: 8px;
        }
        .filter-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          font-size: 13px;
          font-weight: 600;
          background: #191e19;
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          transition: all 0.15s;
        }
        .filter-pill:hover {
          color: var(--text-main);
          border-color: var(--border-medium);
        }
        .filter-pill-active {
          background: rgba(34, 197, 94, 0.15);
          border-color: rgba(34, 197, 94, 0.4);
          color: #4ade80;
        }
        .pill-count {
          font-size: 11px;
          opacity: 0.8;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 8px 14px;
          width: 320px;
        }
        .search-input {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 13px;
          width: 100%;
        }
        .search-input::placeholder {
          color: #6b7280;
        }
        .roster-wrapper {
          padding: 0;
          overflow: hidden;
        }
        .roster-table-header {
          display: grid;
          grid-template-columns: 2.2fr 2fr 1.6fr 1.8fr 1.2fr 0.6fr;
          padding: 14px 20px;
          background: #151915;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        @media (max-width: 900px) {
          .roster-table-header {
            display: none;
          }
        }
        .roster-table-body {
          display: flex;
          flex-direction: column;
        }
        .roster-row {
          display: grid;
          grid-template-columns: 2.2fr 2fr 1.6fr 1.8fr 1.2fr 0.6fr;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-subtle);
          transition: background 0.15s;
        }
        @media (max-width: 900px) {
          .roster-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
        .roster-row:hover {
          background: #191e19;
        }
        .vol-profile-col {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .vol-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
        }
        .vol-info {
          display: flex;
          flex-direction: column;
        }
        .vol-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }
        .vol-email {
          font-size: 11px;
          color: var(--text-muted);
        }
        .vol-role {
          font-size: 11px;
          color: var(--accent-primary);
        }
        .vol-skills-col {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .skill-tag {
          font-size: 11px;
          padding: 3px 8px;
          background: #202720;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }
        .vol-avail-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--text-secondary);
        }
        .team-select {
          background: #181d18;
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          font-size: 12px;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          width: 100%;
          cursor: pointer;
        }
        .team-select:focus {
          border-color: var(--accent-primary);
        }
        .checkin-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: var(--radius-pill);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          transition: all 0.15s;
        }
        .checkin-active {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border-color: rgba(34, 197, 94, 0.35);
        }
        .action-icon-btn {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: all 0.15s;
        }
        .action-delete:hover {
          color: #f87171;
          background: rgba(239, 68, 68, 0.15);
        }
        .empty-state {
          padding: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          color: var(--text-muted);
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
