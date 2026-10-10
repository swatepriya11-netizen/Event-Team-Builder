import React, { useState, useEffect } from 'react'; 
import { 
  Settings as SettingsIcon, 
  Database, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Bell, 
  Calendar,
  Layers
} from 'lucide-react';
import api, { endSession } from '../services/api';

/** Date -> the value a `datetime-local` input expects, in the viewer's timezone. */
function toLocalInputValue(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
}

/**
 * Build the editable form from the loaded event.
 *
 * eventInfo arrives asynchronously, so this cannot be a useState initialiser -
 * it has to run in an effect keyed on the event id. Otherwise the form would
 * still hold the previous event's (or empty) values when the user hits Save, and
 * with multiple events that would write one event's details onto another.
 */
function toForm(eventInfo) {
  return {
    name: eventInfo?.name ?? '',
    startsAt: toLocalInputValue(eventInfo?.startsAt),
    endsAt: toLocalInputValue(eventInfo?.endsAt),
    status: eventInfo?.status ?? 'Planning',
    venueName: eventInfo?.venue?.name ?? '',
    venueAddress: eventInfo?.venue?.address ?? '',
    venueCity: eventInfo?.venue?.city ?? '',
    description: eventInfo?.description ?? '',
    activeVolunteersTarget: eventInfo?.activeVolunteersTarget ?? 45,
    // The server flattens these three back into event.settings on write.
    coordinatorEditing: eventInfo?.coordinatorEditing ?? true,
    shiftAlerts: eventInfo?.shiftAlerts || 'Sent 2h before',
    autoMatching: eventInfo?.autoMatching ?? true,
  };
}

export default function SettingsPage({ 
  eventInfo, 
  dbStatus, 
  onRefreshDb, 
  onRefreshEvent, 
  onShowToast 
}) {
  const [formData, setFormData] = useState(() => toForm(null));
  const [eventError, setEventError] = useState(null);

  const [savingEvent, setSavingEvent] = useState(false);
  const [mongoUri, setMongoUri] = useState('');
  const [connectingDb, setConnectingDb] = useState(false);
  const [dbMessage, setDbMessage] = useState(null);
  const [dbError, setDbError] = useState(null);
  const [seeding, setSeeding] = useState(false);

  // Re-seed the form whenever a different event is loaded.
  useEffect(() => {
    setFormData(toForm(eventInfo));
    setEventError(null);
  }, [eventInfo?._id]);

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!eventInfo?._id) {
      setEventError('No event is loaded yet.');
      return;
    }
    if (!formData.name.trim()) {
      setEventError('Event name is required');
      return;
    }
    if (!formData.startsAt || !formData.endsAt) {
      setEventError('Start and end dates are required');
      return;
    }
    if (new Date(formData.endsAt) < new Date(formData.startsAt)) {
      setEventError('The end date cannot be before the start date');
      return;
    }

    setSavingEvent(true);
    setEventError(null);
    try {
      await api.updateEvent(eventInfo._id, {
        name: formData.name.trim(),
        // Real timestamps. The old single "18-20 September 2026" string could not
        // be range-queried or sorted.
        startsAt: new Date(formData.startsAt).toISOString(),
        endsAt: new Date(formData.endsAt).toISOString(),
        status: formData.status,
        venue: {
          name: formData.venueName.trim(),
          address: formData.venueAddress.trim(),
          city: formData.venueCity.trim(),
        },
        description: formData.description.trim(),
        targets: {
          ...(eventInfo.targets || {}),
          activeVolunteers: Number(formData.activeVolunteersTarget) || 45,
        },
        coordinatorEditing: formData.coordinatorEditing,
        shiftAlerts: formData.shiftAlerts,
        autoMatching: formData.autoMatching,
      });
      if (onShowToast) onShowToast('Workspace settings saved!');
      if (onRefreshEvent) onRefreshEvent();
    } catch (err) {
      setEventError(err.message || 'Could not save the event');
    } finally {
      setSavingEvent(false);
    }
  };

  const handleConnectMongo = async (e) => {
    e.preventDefault();
    if (!mongoUri) return;
    setConnectingDb(true);
    setDbMessage(null);
    setDbError(null);

    try {
      const res = await api.connectMongoDB(mongoUri);
      setDbMessage(res.message);
      if (res.sessionInvalidated) {
        // The new database does not contain this account, so the token we are
        // holding is now worthless. Say so, rather than letting the user hit an
        // unexplained 401 on their next click.
        setDbError(res.sessionMessage || 'Connected, but you must sign in again.');
        endSession();
      } else if (onShowToast) {
        onShowToast('Connected to MongoDB!');
      }
      if (onRefreshDb) onRefreshDb();
    } catch (err) {
      setDbError(err.message || 'Failed to connect to MongoDB');
    } finally {
      setConnectingDb(false);
    }
  };

  const handleSeedData = async () => {
    if (
      !window.confirm(
        'Reseed the database with the demo events?\n\nThis deletes every existing team, volunteer, task and event (sign-in accounts are kept).'
      )
    )
      return;
    setSeeding(true);
    try {
      const res = await api.seedDatabase();
      if (onShowToast) onShowToast(res.message || 'Database seeded!');
      if (onRefreshDb) onRefreshDb();
      if (onRefreshEvent) onRefreshEvent();
    } catch (err) {
      alert(err.message);
    } finally {
      setSeeding(false);
    }
  };

  const isConnected = dbStatus?.connected;

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="page-kicker">{(eventInfo?.name || 'EVENT').toUpperCase()}</span>
          <h1 className="page-title">Workspace Settings</h1>
          <p className="page-subtitle">
            Configure campus event metadata, coordinator permissions, shift alerts, and MongoDB connections.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Left Column: Event Configuration & Access */}
        <div className="settings-main-col">
          {/* Event Configuration */}
          <form onSubmit={handleSaveEvent} className="card settings-card">
            <h3 className="section-title">Event configuration</h3>
            <p className="section-desc">
              Manage primary title, event window dates, and campus venue grounds.
              <br />
              <span style={{ color: 'var(--accent-primary)' }}>{eventInfo?.name || 'No event selected'}</span>
            </p>

            <div className="form-group" style={{ marginTop: 20 }}>
              <label className="form-label">Event Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Event starts</label>
                <input
                  type="datetime-local"
                  value={formData.startsAt}
                  onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Event ends</label>
                <input
                  type="datetime-local"
                  min={formData.startsAt || undefined}
                  value={formData.endsAt}
                  onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-input team-select"
                >
                  <option value="Planning">Planning</option>
                  <option value="Live">Live</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Volunteer target</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={formData.activeVolunteersTarget}
                  onChange={(e) => setFormData({ ...formData, activeVolunteersTarget: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Campus Location</label>
              <div className="form-row-3">
                <input
                  type="text"
                  placeholder="Venue"
                  value={formData.venueName}
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.venueAddress}
                  onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={formData.venueCity}
                  onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Brief Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            {eventError && <div className="form-error">{eventError}</div>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button type="submit" disabled={savingEvent || !eventInfo?._id} className="btn btn-primary">
                <Save size={15} />
                <span>{savingEvent ? 'Saving...' : 'Save Configuration'}</span>
              </button>
            </div>
          </form>

          {/* Team Access Settings */}
          <div className="card settings-card">
            <h3 className="section-title">Team access & notifications</h3>
            <p className="section-desc">Volunteer lead privileges and real-time shift alert dispatching.</p>

            <div className="settings-toggle-list" style={{ marginTop: 20 }}>
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-title">Coordinator editing</span>
                  <span className="toggle-desc">Allow team leads to modify roster capacity and add tasks</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, coordinatorEditing: !formData.coordinatorEditing })}
                  className={`toggle-switch ${formData.coordinatorEditing ? 'switch-on' : ''}`}
                >
                  <div className="switch-thumb" />
                </button>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-title">Shift alerts</span>
                  <span className="toggle-desc">Dispatch automated shift preparation alerts to volunteers</span>
                </div>
                <select
                  value={formData.shiftAlerts}
                  onChange={(e) => setFormData({ ...formData, shiftAlerts: e.target.value })}
                  className="team-select"
                  style={{ width: 160 }}
                >
                  <option value="Sent 1h before">Sent 1h before</option>
                  <option value="Sent 2h before">Sent 2h before</option>
                  <option value="Sent 4h before">Sent 4h before</option>
                  <option value="Sent 24h before">Sent 24h before</option>
                </select>
              </div>

              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-title">AI Candidate Auto-matching</span>
                  <span className="toggle-desc">Suggest optimal squad fit based on skills & shift availability</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, autoMatching: !formData.autoMatching })}
                  className={`toggle-switch ${formData.autoMatching ? 'switch-on' : ''}`}
                >
                  <div className="switch-thumb" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: MongoDB Database Manager */}
        <div className="settings-side-col">
          <div className="card settings-card db-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div className={`db-icon-box ${isConnected ? 'db-icon-online' : 'db-icon-offline'}`}>
                <Database size={20} />
              </div>
              <div>
                <h3 className="section-title">MongoDB Connection</h3>
                <span className={`badge ${isConnected ? 'badge-live' : 'badge-warning'}`}>
                  {isConnected ? 'LIVE CLUSTER' : 'LOCAL FALLBACK'}
                </span>
              </div>
            </div>

            <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5, marginBottom: 16 }}>
              {isConnected
                ? 'Your Express backend is actively connected to MongoDB. Data modifications persist directly to your collections.'
                : 'Currently running on resilient local storage. Connect a MongoDB Atlas cloud cluster or local mongod service below.'}
            </p>

            {/* Collection Counts - scoped to the active event */}
            <div className="db-stats-box">
              <div className="db-stat-item">
                <span className="db-stat-num">{dbStatus?.counts?.volunteers ?? 0}</span>
                <span className="db-stat-label">Volunteers</span>
              </div>
              <div className="db-stat-item">
                <span className="db-stat-num">{dbStatus?.counts?.teams ?? 0}</span>
                <span className="db-stat-label">Teams</span>
              </div>
              <div className="db-stat-item">
                <span className="db-stat-num">{dbStatus?.counts?.tasks ?? 0}</span>
                <span className="db-stat-label">Tasks</span>
              </div>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
              Counts for the active event · {dbStatus?.counts?.events ?? 0} event
              {dbStatus?.counts?.events === 1 ? '' : 's'} in total · {dbStatus?.counts?.skills ?? 0} skills
            </p>

            {/* Connect Form */}
            <form onSubmit={handleConnectMongo} style={{ marginTop: 20 }}>
              <div className="form-group">
                <label className="form-label">Connect MongoDB Atlas / Local URI</label>
                <input
                  type="text"
                  value={mongoUri}
                  onChange={(e) => setMongoUri(e.target.value)}
                  placeholder="mongodb+srv://user:pass@cluster.mongodb.net/event-team-builder"
                  className="form-input"
                  style={{ fontSize: 12, fontFamily: 'monospace' }}
                />
              </div>

              {dbMessage && (
                <div style={{ padding: '8px 12px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', borderRadius: 6, fontSize: 12, marginBottom: 12 }}>
                  ✓ {dbMessage}
                </div>
              )}

              {dbError && (
                <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderRadius: 6, fontSize: 12, marginBottom: 12 }}>
                  ✕ {dbError}
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setMongoUri('mongodb://localhost:27017/event-team-builder')}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  Localhost URI
                </button>
                <button
                  type="submit"
                  disabled={connectingDb || !mongoUri}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  {connectingDb ? 'Testing...' : 'Test & Connect'}
                </button>
              </div>
            </form>

            <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border-subtle)' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: 6 }}>Database Seed & Reset</label>
              <button
                type="button"
                onClick={handleSeedData}
                disabled={seeding}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <RefreshCw size={14} className={seeding ? 'spin' : ''} />
                <span>{seeding ? 'Seeding...' : 'Reseed Demo Data'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .settings-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .page-header {
          margin-bottom: 4px;
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
        .settings-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 24px;
        }
        @media (max-width: 960px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
        .settings-main-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .settings-card {
          padding: 24px;
        }
        .section-title {
          font-size: 17px;
          margin-bottom: 4px;
        }
        .section-desc {
          font-size: 12px;
          color: var(--text-muted);
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr 1.4fr 1fr;
          gap: 10px;
        }
        @media (max-width: 600px) {
          .form-row-2,
          .form-row-3 {
            grid-template-columns: 1fr;
          }
        }
        .settings-toggle-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .toggle-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .toggle-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }
        .toggle-desc {
          font-size: 11px;
          color: var(--text-muted);
        }
        .toggle-switch {
          width: 44px;
          height: 24px;
          background: #272e27;
          border-radius: 12px;
          padding: 2px;
          transition: background 0.2s;
          display: flex;
          align-items: center;
        }
        .switch-on {
          background: var(--accent-primary);
        }
        .switch-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.2s;
        }
        .switch-on .switch-thumb {
          transform: translateX(20px);
        }
        .db-card {
          background: #171b17;
          border: 1px solid var(--border-subtle);
        }
        .db-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .db-icon-online {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
        }
        .db-icon-offline {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .db-stats-box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          background: #141714;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px;
          text-align: center;
        }
        .db-stat-num {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 800;
          color: var(--text-main);
          display: block;
        }
        .db-stat-label {
          font-size: 11px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
