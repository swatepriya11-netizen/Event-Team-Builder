import React, { useState } from 'react';
import { X, CalendarCheck } from 'lucide-react';
import api from '../services/api';

/**
 * Format a Date as the value a `datetime-local` input expects
 * ("2026-09-19T09:30"), in the viewer's own timezone. Using toISOString() here
 * would shift the time by the UTC offset and silently move the shift.
 */
function toLocalInputValue(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

const defaultForm = (teams) => ({
  title: '',
  description: '',
  shiftStart: toLocalInputValue(new Date()),
  shiftEnd: '',
  priority: 'Medium',
  status: 'Pending',
  teamId: teams[0]?._id || '',
  requiredCrew: 4,
  location: 'Main Stage',
  // Crew are picked from this event's volunteers and stored as ids, so the task
  // roster can never drift from the volunteer directory.
  assignees: [],
});

export default function CreateTaskModal({
  isOpen,
  onClose,
  teams = [],
  volunteers = [],
  onTaskCreated,
  onShowToast,
}) {
  const [formData, setFormData] = useState(() => defaultForm(teams));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setFormData(defaultForm(teams));
    setError('');
  };

  const close = () => {
    reset();
    onClose();
  };

  const toggleAssignee = (id) => {
    setFormData((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(id)
        ? prev.assignees.filter((a) => a !== id)
        : [...prev.assignees, id],
    }));
  };

  // Keep the end time ahead of the start time as the user types, rather than
  // failing on submit.
  const onStartChange = (value) => {
    setFormData((prev) => {
      const next = { ...prev, shiftStart: value };
      if (prev.shiftEnd && prev.shiftEnd <= value) next.shiftEnd = '';
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }
    if (!formData.shiftStart) {
      setError('A shift start time is required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await api.createTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        // Real timestamps, so shifts can be sorted chronologically and
        // range-queried. Previously these were unparseable strings.
        shiftStart: new Date(formData.shiftStart).toISOString(),
        shiftEnd: formData.shiftEnd ? new Date(formData.shiftEnd).toISOString() : null,
        priority: formData.priority,
        status: formData.status,
        teamId: formData.teamId || null,
        requiredCrew: Number(formData.requiredCrew) || 0,
        location: formData.location.trim(),
        assignees: formData.assignees,
      });
      if (onShowToast) onShowToast(`Shift/Task "${formData.title}" scheduled!`);
      reset();
      if (onTaskCreated) onTaskCreated();
      onClose();
    } catch (err) {
      setError(err.message || 'Could not schedule the task');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarCheck size={18} />
            </div>
            <h3 style={{ fontSize: 17, color: '#f3f4f6' }}>Schedule Shift or Task</h3>
          </div>
          <button onClick={close} className="close-btn" aria-label="Close"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px 24px' }}>
          <div className="form-group">
            <label className="form-label">Task / Shift Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. VIP check-in, Soundcheck"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description / Instructions</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Key responsibilities and step-by-step cue details..."
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Shift starts</label>
              <input
                type="datetime-local"
                required
                value={formData.shiftStart}
                onChange={(e) => onStartChange(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Shift ends <span className="form-hint">(optional)</span></label>
              <input
                type="datetime-local"
                min={formData.shiftStart || undefined}
                value={formData.shiftEnd}
                onChange={(e) => setFormData({ ...formData, shiftEnd: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location / Zone</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Amphitheater, North Quad Gate B"
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="form-input"
              >
                <option value="High">High (Urgent)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assigned Squad</label>
              <select
                value={formData.teamId}
                onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
                className="form-input"
              >
                <option value="">General Crew</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Crew Needed</label>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.requiredCrew}
                onChange={(e) => setFormData({ ...formData, requiredCrew: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Crew assigned <span className="form-hint">(this event only)</span>
            </label>
            {volunteers.length === 0 ? (
              <span className="form-hint">No volunteers in this event yet.</span>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 130, overflowY: 'auto' }}>
                {volunteers.map((v) => {
                  const selected = formData.assignees.includes(v._id);
                  return (
                    <button
                      type="button"
                      key={v._id}
                      onClick={() => toggleAssignee(v._id)}
                      className={`skill-chip ${selected ? 'skill-chip-selected' : ''}`}
                    >
                      {v.name}
                    </button>
                  );
                })}
              </div>
            )}
            <span className="form-hint">
              {formData.assignees.length} assigned of {formData.requiredCrew || 0} needed
            </span>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
            <button type="button" onClick={close} className="btn btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm">
              {loading ? 'Scheduling...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
