import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import api from '../services/api';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  role: 'General Crew',
  skillIds: [],
  availability: ['Morning'],
  teamId: '',
  notes: '',
};

export default function AddVolunteerModal({
  isOpen,
  onClose,
  teams = [],
  skills = [],
  onVolunteerAdded,
  onShowToast,
}) {
  const [formData, setFormData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setFormData(EMPTY);
    setError('');
  };

  const close = () => {
    reset();
    onClose();
  };

  const handleCheckboxChange = (time) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(time)
        ? prev.availability.filter(t => t !== time)
        : [...prev.availability, time]
    }));
  };

  const toggleSkill = (id) => {
    setFormData(prev => ({
      ...prev,
      skillIds: prev.skillIds.includes(id)
        ? prev.skillIds.filter(s => s !== id)
        : [...prev.skillIds, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return setError('Name is required');
    if (!formData.email.trim()) return setError('Email is required');

    setLoading(true);
    setError('');
    try {
      await api.createVolunteer({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        role: formData.role.trim() || 'General Crew',
        notes: formData.notes.trim(),
        // Skill ids from the shared vocabulary, so matching compares exact keys.
        skillIds: formData.skillIds,
        teamId: formData.teamId || null,
      });
      if (onShowToast) onShowToast(`${formData.name} added to roster!`);
      reset();
      if (onVolunteerAdded) onVolunteerAdded();
      onClose();
    } catch (err) {
      setError(err.message || 'Could not add the volunteer');
    } finally {
      setLoading(false);
    }
  };

  // Group the vocabulary by category so a 15-item list stays scannable.
  const byCategory = skills.reduce((acc, skill) => {
    (acc[skill.category || 'General'] ||= []).push(skill);
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserPlus size={18} />
            </div>
            <h3 style={{ fontSize: 17, color: '#f3f4f6' }}>Add New Volunteer</h3>
          </div>
          <button onClick={close} className="close-btn" aria-label="Close"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px 24px' }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ananya Shah"
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Campus Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@campus.edu"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Skills <span className="form-hint">(drives squad auto-matching)</span>
            </label>
            {skills.length === 0 ? (
              <span className="form-hint">No skills defined yet.</span>
            ) : (
              Object.entries(byCategory).map(([category, list]) => (
                <div key={category} style={{ marginBottom: 8 }}>
                  <div className="form-hint" style={{ marginBottom: 4 }}>{category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {list.map((skill) => {
                      const selected = formData.skillIds.includes(skill._id);
                      return (
                        <button
                          type="button"
                          key={skill._id}
                          onClick={() => toggleSkill(skill._id)}
                          className={`skill-chip ${selected ? 'skill-chip-selected' : ''}`}
                        >
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Availability Windows</label>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              {['Morning', 'Evening', 'Weekend', 'Full Event'].map(time => (
                <label key={time} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#d1d5db', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.availability.includes(time)}
                    onChange={() => handleCheckboxChange(time)}
                    style={{ accentColor: '#22c55e' }}
                  />
                  <span>{time}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Assign to Squad</label>
              <select
                value={formData.teamId}
                onChange={e => setFormData({ ...formData, teamId: e.target.value })}
                className="form-input"
              >
                <option value="">Leave Unassigned (Ready)</option>
                {teams.map(t => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Designated Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                placeholder="Stage Crew, Greeter, etc."
                className="form-input"
              />
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
            <button type="button" onClick={close} className="btn btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm">
              {loading ? 'Adding...' : 'Save Volunteer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
