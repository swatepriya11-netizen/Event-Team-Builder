import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Check, Star, X, Calendar } from 'lucide-react';
import api from '../services/api';

/**
 * Event switcher.
 *
 * The app holds many events, and every team / volunteer / task belongs to exactly
 * one of them. Switching here changes the active event, which the API layer sends
 * as `?eventId=` on every subsequent request.
 *
 * One event is flagged "default" (isActive on the server). That is what the app
 * falls back to when a request does not name an event, and it is the sensible
 * landing event for a fresh session.
 */
export default function EventSwitcher({ events = [], activeEventId, onSwitch, onCreate, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', startsAt: '', endsAt: '' });
  const containerRef = useRef(null);

  const active = events.find((e) => e._id === activeEventId) || null;

  // Close on outside click / Escape, so the panel does not trap the user.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setCreating(false);
        setError('');
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Event name is required');
    if (!form.startsAt || !form.endsAt) return setError('Start and end dates are required');

    setBusy(true);
    setError('');
    try {
      const created = await api.createEvent({
        name: form.name.trim(),
        // datetime-local gives "2027-03-08T09:00"; send it as real UTC ISO.
        startsAt: new Date(form.startsAt).toISOString(),
        endsAt: new Date(form.endsAt).toISOString(),
      });
      setForm({ name: '', startsAt: '', endsAt: '' });
      setCreating(false);
      setOpen(false);
      await onRefresh?.();
      // Jump straight into the event that was just created.
      await onSwitch?.(created._id);
    } catch (err) {
      setError(err.message || 'Could not create the event');
    } finally {
      setBusy(false);
    }
  };

  const handleSetDefault = async (id) => {
    setBusy(true);
    try {
      await api.activateEvent(id);
      await onRefresh?.();
    } catch (err) {
      setError(err.message || 'Could not change the default event');
    } finally {
      setBusy(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="event-switcher" ref={containerRef}>
      <button
        type="button"
        className="event-switcher-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Switch event"
      >
        <span className="event-switcher-dot" />
        <span className="event-switcher-current">{active?.name || 'Select event'}</span>
        <ChevronDown size={14} className={open ? 'event-switcher-chevron event-switcher-chevron-open' : 'event-switcher-chevron'} />
      </button>

      {open && (
        <div className="event-switcher-panel" role="listbox">
          <div className="event-switcher-panel-head">
            <span>Events</span>
            <span className="event-switcher-count">{events.length}</span>
          </div>

          {events.length === 0 && (
            <p className="event-switcher-empty">No events yet. Create one to get started.</p>
          )}

          <div className="event-switcher-list">
            {events.map((event) => {
              const isActive = event._id === activeEventId;
              return (
                <div key={event._id} className={`event-switcher-row ${isActive ? 'event-switcher-row-active' : ''}`}>
                  <button
                    type="button"
                    className="event-switcher-row-main"
                    onClick={() => {
                      setOpen(false);
                      onSwitch?.(event._id);
                    }}
                    role="option"
                    aria-selected={isActive}
                  >
                    <span className="event-switcher-row-top">
                      <span className="event-switcher-row-name">{event.name}</span>
                      {isActive && <Check size={14} className="event-switcher-check" />}
                    </span>
                    <span className="event-switcher-row-meta">
                      <span className={`event-status event-status-${(event.status || 'planning').toLowerCase()}`}>
                        {event.status || 'Planning'}
                      </span>
                      <span className="event-switcher-row-dates">
                        {formatDate(event.startsAt)} – {formatDate(event.endsAt)}
                      </span>
                    </span>
                    <span className="event-switcher-row-counts">
                      {event.counts?.teams ?? 0} teams · {event.counts?.volunteers ?? 0} volunteers ·{' '}
                      {event.counts?.tasks ?? 0} tasks
                    </span>
                  </button>

                  {event.isActive ? (
                    <span className="event-switcher-default-tag" title="Default event for new sessions">
                      <Star size={11} /> Default
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="event-switcher-default-btn"
                      onClick={() => handleSetDefault(event._id)}
                      disabled={busy}
                      title="Make this the default event"
                    >
                      <Star size={11} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {creating ? (
            <form className="event-switcher-form" onSubmit={handleCreate}>
              <div className="event-switcher-form-head">
                <span>New event</span>
                <button type="button" className="event-switcher-close" onClick={() => { setCreating(false); setError(''); }} aria-label="Cancel">
                  <X size={13} />
                </button>
              </div>
              <input
                className="event-switcher-input"
                placeholder="Event name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoFocus
              />
              <label className="event-switcher-label">
                <Calendar size={12} /> Starts
                <input
                  type="datetime-local"
                  className="event-switcher-input"
                  value={form.startsAt}
                  onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
                />
              </label>
              <label className="event-switcher-label">
                <Calendar size={12} /> Ends
                <input
                  type="datetime-local"
                  className="event-switcher-input"
                  value={form.endsAt}
                  onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
                />
              </label>
              {error && <p className="event-switcher-error">{error}</p>}
              <button type="submit" className="event-switcher-submit" disabled={busy}>
                {busy ? 'Creating…' : 'Create event'}
              </button>
            </form>
          ) : (
            <button
              type="button"
              className="event-switcher-add"
              onClick={() => setCreating(true)}
            >
              <Plus size={14} /> New event
            </button>
          )}

          {error && !creating && <p className="event-switcher-error">{error}</p>}
        </div>
      )}
    </div>
  );
}
