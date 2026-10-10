import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  UserPlus, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Plus, 
  Users, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import api from '../services/api';

export default function TeamBuilderPage({ 
  teams = [], 
  volunteers = [], 
  matches = [], 
  onRefresh, 
  onShowToast,
  onOpenCreateTeam 
}) {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]?._id || null);
  const [approvingId, setApprovingId] = useState(null);

  const activeTeam = teams.find(t => t._id === selectedTeam) || teams[0];
  const teamVolunteers = volunteers.filter(v => v.teamId === activeTeam?._id || v.teamId === activeTeam?.code);

  const handleApproveMatch = async (match) => {
    setApprovingId(match.volunteerId);
    try {
      await api.updateVolunteer(match.volunteerId, { teamId: match.targetTeamId });
      if (onShowToast) onShowToast(`${match.volunteerName} matched to ${match.targetTeamName}!`);
      onRefresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <div className="team-builder-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="page-kicker">AURELIA CULTURAL FEST ’26</span>
          <h1 className="page-title">Team Builder</h1>
          <p className="page-subtitle">
            Balance staff capacity, assign squad leads, and auto-match volunteers by skills and shift availability.
          </p>
        </div>

        <button onClick={onOpenCreateTeam} className="btn btn-primary">
          <Plus size={16} />
          <span>New Team Squad</span>
        </button>
      </div>

      {/* Main Grid: Team Coverage Cards & Candidate Matches */}
      <div className="builder-layout">
        {/* Left: Squad Cards & Selected Team View */}
        <div className="squads-column">
          <h3 className="column-title">Team Coverage</h3>

          <div className="teams-grid">
            {teams.map((team) => {
              const assigned = volunteers.filter(v => v.teamId === team._id || v.teamId === team.code).length;
              const capacity = team.targetCapacity || 8;
              const isSelected = activeTeam?._id === team._id;
              const percent = Math.min(100, Math.round((assigned / capacity) * 100));

              return (
                <div
                  key={team._id}
                  onClick={() => setSelectedTeam(team._id)}
                  className={`card squad-card ${isSelected ? 'squad-card-selected' : ''}`}
                >
                  <div className="squad-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="squad-indicator-dot" style={{ background: team.color || '#22c55e' }} />
                      <span className="squad-name">{team.name}</span>
                    </div>
                    <span className="squad-status-pill">
                      {assigned} / {capacity} assigned
                    </span>
                  </div>

                  <p className="squad-desc">{team.description}</p>

                  <div className="progress-bar-bg" style={{ margin: '14px 0 10px' }}>
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: team.color || '#22c55e',
                      }}
                    />
                  </div>

                  <div className="squad-footer">
                    <span className="squad-lead">Lead: {team.leadName || 'Unassigned'}</span>
                    <span className="squad-percent">{percent}% capacity</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Squad Detailed Roster */}
          {activeTeam && (
            <div className="card roster-detail-card">
              <div className="detail-header">
                <div>
                  <h4 style={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: activeTeam.color }} />
                    <span>{activeTeam.name} Roster</span>
                  </h4>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                    {teamVolunteers.length} members currently deployed in this squad
                  </p>
                </div>

                <div className="skill-tags-row">
                  {activeTeam.requiredSkills?.map((s, i) => (
                    <span key={i} className="skill-chip">{s}</span>
                  ))}
                </div>
              </div>

              <div className="detail-volunteers-list">
                {teamVolunteers.length === 0 ? (
                  <div style={{ padding: 24, textAlign: 'center', color: '#6b7280', fontSize: 13 }}>
                    No volunteers assigned yet. Choose candidates from the recommended matches column to staff this squad!
                  </div>
                ) : (
                  teamVolunteers.map((vol) => (
                    <div key={vol._id} className="team-member-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div 
                          className="member-avatar"
                          style={{ background: `${vol.avatarColor || '#22c55e'}22`, color: vol.avatarColor || '#22c55e' }}
                        >
                          {vol.name.charAt(0)}
                        </div>
                        <div>
                          <span className="member-name">{vol.name}</span>
                          <span className="member-role">{vol.role || 'Crew'} • {vol.availability?.join(', ')}</span>
                        </div>
                      </div>

                      <button
                        onClick={async () => {
                          await api.updateVolunteer(vol._id, { teamId: null });
                          if (onShowToast) onShowToast(`${vol.name} unassigned`);
                          onRefresh();
                        }}
                        className="btn btn-outline btn-sm"
                        style={{ fontSize: 11, padding: '3px 8px' }}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Candidate Matches */}
        <div className="matches-column">
          <div className="matches-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={16} color="#4ade80" />
              <h3 className="column-title" style={{ margin: 0 }}>Recommended matches</h3>
            </div>
            <span className="badge badge-live" style={{ fontSize: 10 }}>
              AI Fit Engine
            </span>
          </div>

          <p className="matches-intro">
            Candidates mapped from the volunteer intake pool matching squad skills and scheduling windows:
          </p>

          <div className="matches-list">
            {matches.length === 0 ? (
              <div className="card" style={{ padding: 28, textAlign: 'center', color: '#9ca3af' }}>
                <Check size={28} color="#4ade80" style={{ margin: '0 auto 10px' }} />
                <p style={{ fontSize: 14, color: '#f3f4f6' }}>All intake volunteers assigned!</p>
                <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                  Add more volunteers in the Roster tab to trigger new matching proposals.
                </p>
              </div>
            ) : (
              matches.map((match) => (
                <div key={match.volunteerId} className="card match-card">
                  <div className="match-top">
                    <div className="match-title-row">
                      <span className="match-name">{match.volunteerName}</span>
                      <span className="match-arrow">→</span>
                      <span className="match-team" style={{ color: match.targetTeamColor || '#4ade80' }}>
                        {match.targetTeamName}
                      </span>
                    </div>
                    <span className="match-score">{match.fitScore}% Fit</span>
                  </div>

                  <p className="match-reason">{match.reason}</p>

                  <div className="match-actions">
                    <button
                      onClick={() => handleApproveMatch(match)}
                      disabled={approvingId === match.volunteerId}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                    >
                      <UserPlus size={14} />
                      <span>{approvingId === match.volunteerId ? 'Assigning...' : 'Approve Match & Deploy'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .team-builder-page {
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
        .builder-layout {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 24px;
        }
        @media (max-width: 960px) {
          .builder-layout {
            grid-template-columns: 1fr;
          }
        }
        .column-title {
          font-size: 17px;
          margin-bottom: 14px;
        }
        .teams-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 600px) {
          .teams-grid {
            grid-template-columns: 1fr;
          }
        }
        .squad-card {
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 18px;
        }
        .squad-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }
        .squad-card-selected {
          border-color: var(--accent-primary);
          background: #171d17;
          box-shadow: 0 0 16px rgba(34, 197, 94, 0.15);
        }
        .squad-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .squad-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .squad-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-main);
        }
        .squad-status-pill {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .squad-desc {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
          min-height: 34px;
        }
        .squad-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: var(--text-muted);
        }
        .roster-detail-card {
          padding: 20px;
        }
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill-tags-row {
          display: flex;
          gap: 6px;
        }
        .skill-chip {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 8px;
          background: #1f251f;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }
        .detail-volunteers-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .team-member-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #191e19;
          border-radius: var(--radius-sm);
        }
        .member-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .member-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
          display: block;
        }
        .member-role {
          font-size: 11px;
          color: var(--text-muted);
        }
        .matches-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .matches-intro {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .matches-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .match-card {
          padding: 16px;
          background: #181d18;
          border: 1px solid var(--border-subtle);
        }
        .match-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .match-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
        }
        .match-name {
          color: #fff;
        }
        .match-arrow {
          color: var(--text-muted);
        }
        .match-team {
          font-weight: 700;
        }
        .match-score {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-primary);
          background: rgba(34, 197, 94, 0.12);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .match-reason {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 14px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
