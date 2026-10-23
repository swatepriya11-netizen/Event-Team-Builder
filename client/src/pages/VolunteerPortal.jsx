import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  RefreshCw,
  Save,
  ShieldCheck,
  Users,
} from 'lucide-react';
import api from '../services/api';

const AVAILABILITY = ['Morning', 'Evening', 'All Day'];
const NEXT_STATUS = { Pending: 'In Progress', 'In Progress': 'Completed', Completed: 'Pending' };

/**
 * The volunteer's entire workspace.
 *
 * Everything on this page is scoped by the API to the signed-in person: their
 * assignment, their team, their team's tasks and their own profile. There are no
 * coordinator controls here by design, and the server rejects them anyway.
 */
export default function VolunteerPortal({
  user,
  eventInfo,
  volunteers = [],
  teams = [],
  tasks = [],
  onRefresh,
  onShowToast,
}) {
  // Prefer the explicit link; fall back to email for accounts created before the
  // coordinator added the volunteer record.
  const me = useMemo(() => {
    const id = user?.volunteerId;
    const email = String(user?.email || '').toLowerCase();
    return (
      volunteers.find((v) => (id ? String(v._id) === String(id) : false)) ||
      volunteers.find((v) => String(v.email || '').toLowerCase() === email) ||
      null
    );
  }, [volunteers, user]);

  const team = useMemo(
    () => teams.find((t) => String(t._id) === String(me?.teamId)) || null,
    [teams, me]
  );

  const myTasks = useMemo(() => {
    if (!me) return [];
    return tasks.filter((t) => (t.assignees || []).map(String).includes(String(me._id)));
  }, [tasks, me]);

  const teammates = useMemo(() => {
    if (!me) return [];
    return volunteers.filter(
      (v) => String(v._id) !== String(me._id) && me.teamId && String(v.teamId) === String(me.teamId)
    );
  }, [volunteers, me]);

  const [phone, setPhone] = useState('');
  const [availability, setAvailability] = useState([]);
  const [saving, setSaving] = useState(false);
  const [busyTask, setBusyTask] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);

  // Keep the editable form in sync when the server reloads the profile.
  useEffect(() => {
    setPhone(me?.phone || '');
    setAvailability(Array.isArray(me?.availability) ? me.availability : []);
  }, [me?._id, me?.phone, me?.availability]);

  const toggleAvailability = (slot) => {
    setAvailability((current) =>
      current.includes(slot) ? current.filter((s) => s !== slot) : [...current, slot]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateMyVolunteer({ phone: phone.trim(), availability });
      if (onShowToast) onShowToast('Profile updated');
      if (onRefresh) await onRefresh();
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Could not save your profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCheckIn = async () => {
    if (!me) return;
    setCheckingIn(true);
    try {
      await api.updateMyVolunteer({ checkInStatus: !me.checkInStatus });
      if (onShowToast) onShowToast(me.checkInStatus ? 'Checked out' : 'Checked in — have a great shift!');
      if (onRefresh) await onRefresh();
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Could not update check-in');
    } finally {
      setCheckingIn(false);
    }
  };

  const handleAdvanceTask = async (task) => {
    setBusyTask(task._id);
    try {
      const next = NEXT_STATUS[task.status] || 'Pending';
      await api.updateTask(task._id, { status: next });
      if (onShowToast) onShowToast(`"${task.title}" is now ${next}`);
      if (onRefresh) await onRefresh();
    } catch (err) {
      if (onShowToast) onShowToast(err.message || 'Could not update that task');
    } finally {
      setBusyTask(null);
    }
  };

  if (!me) {
    return (
      <div className="vportal">
        <div className="vportal-empty">
          <div className="vportal-empty-icon">
            <ShieldCheck size={26} />
          </div>
          <h2>No volunteer profile linked yet</h2>
          <p>
            Your account is active, but no volunteer record matches
            <strong> {user?.email}</strong>. Ask your event coordinator to add you
            to the volunteer directory with this email address, then refresh.
          </p>
          <button className="btn btn-secondary" onClick={() => onRefresh && onRefresh()}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vportal">
      {/* Header */}
      <section className="vportal-hero">
        <div>
          <span className="vportal-eyebrow">MY VOLUNTEER WORKSPACE</span>
          <h1 className="vportal-title">Hi {String(me.name).split(' ')[0]} 👋</h1>
          <p className="vportal-subtitle">
            {eventInfo?.name || 'Your event'}
            {eventInfo?.dates ? ` · ${eventInfo.dates}` : ''}
            {eventInfo?.venue?.name ? ` · ${eventInfo.venue.name}` : ''}
          </p>
        </div>
        <button
          className={`btn ${me.checkInStatus ? 'btn-secondary' : 'btn-primary'}`}
          onClick={handleCheckIn}
          disabled={checkingIn}
        >
          {checkingIn ? (
            <><RefreshCw size={14} className="vportal-spin" /> Updating...</>
          ) : me.checkInStatus ? (
            <><CheckCircle2 size={15} /> Checked in · Check out</>
          ) : (
            <><CheckCircle2 size={15} /> Check in to my shift</>
          )}
        </button>
      </section>

      {/* Summary strip */}
      <section className="vportal-stats">
        <div className="vportal-stat">
          <span className="vportal-stat-label">Team</span>
          <span className="vportal-stat-value">{team?.name || 'Unassigned'}</span>
        </div>
        <div className="vportal-stat">
          <span className="vportal-stat-label">My role</span>
          <span className="vportal-stat-value">{me.role || 'General Crew'}</span>
        </div>
        <div className="vportal-stat">
          <span className="vportal-stat-label">My shifts</span>
          <span className="vportal-stat-value">{myTasks.length}</span>
        </div>
        <div className="vportal-stat">
          <span className="vportal-stat-label">Enrollment</span>
          <span className="vportal-stat-value">{me.enrollmentStatus || 'Confirmed'}</span>
        </div>
      </section>

      <div className="vportal-grid">
        {/* Shifts */}
        <section className="vportal-card vportal-card-wide">
          <header className="vportal-card-head">
            <h2><CalendarCheck size={17} /> My shifts & tasks</h2>
            <span className="vportal-muted">{myTasks.length} assigned</span>
          </header>

          {myTasks.length === 0 ? (
            <p className="vportal-muted">
              No tasks assigned to you yet. Your coordinator will add you to the
              crew schedule.
            </p>
          ) : (
            <ul className="vportal-task-list">
              {myTasks.map((task) => (
                <li key={task._id} className="vportal-task">
                  <div className="vportal-task-main">
                    <div className="vportal-task-top">
                      <strong>{task.title}</strong>
                      <span className={`vportal-pill vportal-pill-${task.status.replace(/\s+/g, '-').toLowerCase()}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="vportal-task-meta">
                      <span><Clock size={13} /> {task.shiftDate || 'Date TBC'} · {task.shiftTime}</span>
                      {task.location && <span><MapPin size={13} /> {task.location}</span>}
                      {task.teamName && <span><Users size={13} /> {task.teamName}</span>}
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleAdvanceTask(task)}
                    disabled={busyTask === task._id}
                    title="Update your task status"
                  >
                    {busyTask === task._id ? 'Saving...' : `Mark ${NEXT_STATUS[task.status] || 'In Progress'}`}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Team */}
        <section className="vportal-card">
          <header className="vportal-card-head">
            <h2><Users size={17} /> My team</h2>
          </header>
          {team ? (
            <>
              <p className="vportal-team-name">{team.name}</p>
              <p className="vportal-muted">{team.description}</p>
              <div className="vportal-team-meta">
                <span>{team.assignedCount || 0} crew</span>
                <span>Lead: {team.leadName || 'Unassigned'}</span>
              </div>
              <div className="vportal-roster">
                {teammates.length === 0 ? (
                  <span className="vportal-muted">You are the first person on this team.</span>
                ) : (
                  teammates.map((mate) => (
                    <div key={mate._id} className="vportal-mate">
                      <span
                        className="vportal-avatar"
                        style={{ background: mate.avatarColor || '#22c55e' }}
                      >
                        {String(mate.name).charAt(0)}
                      </span>
                      <span>
                        <strong>{mate.name}</strong>
                        <small>{mate.role}</small>
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <p className="vportal-muted">
              You are signed up for this event but have not been placed on a team yet.
            </p>
          )}
        </section>

        {/* Profile */}
        <section className="vportal-card">
          <header className="vportal-card-head">
            <h2><Phone size={17} /> My details</h2>
          </header>
          <form onSubmit={handleSave} className="vportal-form">
            <label className="vportal-label">
              Phone
              <input
                type="tel"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </label>

            <div className="vportal-label">
              Availability
              <div className="vportal-chips">
                {AVAILABILITY.map((slot) => {
                  const active = availability.includes(slot);
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => toggleAvailability(slot)}
                      className={`vportal-chip ${active ? 'vportal-chip-active' : ''}`}
                    >
                      {active ? <CheckCircle2 size={13} /> : null}
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="vportal-note">
              Name, email, skills and team placement are managed by your coordinator.
            </p>

            <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
              <Save size={14} /> {saving ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </section>
      </div>

      <style>{`
        .vportal { display: flex; flex-direction: column; gap: 20px; }
        .vportal-hero {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; flex-wrap: wrap;
          background: linear-gradient(135deg, #171b17, #141714);
          border: 1px solid var(--border-subtle); border-radius: var(--radius-xl);
          padding: 26px 28px;
        }
        .vportal-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 0.09em;
          color: var(--accent-primary);
        }
        .vportal-title { font-size: 28px; margin: 6px 0 4px; }
        .vportal-subtitle { color: var(--text-secondary); font-size: 14px; }
        .vportal-stats {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px;
        }
        .vportal-stat {
          background: #171b17; border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 14px 16px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .vportal-stat-label {
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--text-muted); font-weight: 700;
        }
        .vportal-stat-value { font-size: 16px; font-weight: 600; color: var(--text-main); }
        .vportal-grid {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;
          align-items: start;
        }
        .vportal-card {
          background: #171b17; border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl); padding: 22px;
        }
        .vportal-card-wide { grid-column: 1 / -1; }
        .vportal-card-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: 16px;
        }
        .vportal-card-head h2 {
          display: flex; align-items: center; gap: 8px; font-size: 16px;
        }
        .vportal-muted { color: var(--text-muted); font-size: 13px; line-height: 1.6; }
        .vportal-task-list { display: flex; flex-direction: column; gap: 10px; list-style: none; }
        .vportal-task {
          display: flex; align-items: center; justify-content: space-between;
          gap: 14px; padding: 14px; border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); background: #141714;
        }
        .vportal-task-main { min-width: 0; }
        .vportal-task-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .vportal-task-top strong { font-size: 14px; }
        .vportal-task-meta {
          display: flex; flex-wrap: wrap; gap: 6px 16px; margin-top: 7px;
          color: var(--text-muted); font-size: 12px;
        }
        .vportal-task-meta span { display: inline-flex; align-items: center; gap: 5px; }
        .vportal-pill {
          font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
          padding: 3px 9px; border-radius: 999px; text-transform: uppercase;
        }
        .vportal-pill-pending { background: rgba(245,158,11,.14); color: #fbbf24; }
        .vportal-pill-in-progress { background: rgba(56,189,248,.14); color: #38bdf8; }
        .vportal-pill-completed { background: rgba(34,197,94,.14); color: #4ade80; }
        .vportal-team-name { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .vportal-team-meta {
          display: flex; gap: 16px; margin: 12px 0; font-size: 12px; color: var(--text-secondary);
        }
        .vportal-roster { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
        .vportal-mate { display: flex; align-items: center; gap: 10px; }
        .vportal-mate strong { display: block; font-size: 13px; }
        .vportal-mate small { color: var(--text-muted); font-size: 11px; }
        .vportal-avatar {
          width: 30px; height: 30px; border-radius: 50%; color: #0b0d0b;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800;
        }
        .vportal-form { display: flex; flex-direction: column; gap: 14px; }
        .vportal-label {
          display: flex; flex-direction: column; gap: 7px;
          font-size: 12px; font-weight: 600; color: var(--text-secondary);
        }
        .vportal-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .vportal-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 12px; border-radius: 999px; font-size: 12px; font-weight: 600;
          border: 1px solid var(--border-medium); color: var(--text-secondary);
          background: transparent; cursor: pointer; transition: all .15s ease;
        }
        .vportal-chip:hover { border-color: var(--accent-primary); color: var(--text-main); }
        .vportal-chip-active {
          background: rgba(34,197,94,.14); border-color: rgba(34,197,94,.5); color: #4ade80;
        }
        .vportal-note { font-size: 11px; color: var(--text-muted); line-height: 1.5; }
        .vportal-empty {
          max-width: 520px; margin: 8vh auto; text-align: center;
          background: #171b17; border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl); padding: 40px 32px;
        }
        .vportal-empty-icon {
          width: 52px; height: 52px; margin: 0 auto 16px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(245,158,11,.12); color: #fbbf24;
        }
        .vportal-empty h2 { font-size: 20px; margin-bottom: 10px; }
        .vportal-empty p { color: var(--text-secondary); font-size: 13px; line-height: 1.65; margin-bottom: 18px; }
        .vportal-empty .btn { margin: 0 auto; }
        .vportal-spin { animation: vportal-spin 1s linear infinite; }
        @keyframes vportal-spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .vportal-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .vportal-grid { grid-template-columns: 1fr; }
          .vportal-task { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
