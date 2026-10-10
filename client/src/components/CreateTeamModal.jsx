import React, { useState } from 'react';
import { X, Layers, Check } from 'lucide-react';
import api from '../services/api';

const COLORS = ['#22c55e', '#38bdf8', '#a855f7', '#f59e0b', '#ec4899', '#14b8a6', '#6366f1'];

const EMPTY = {
  name: '',
  description: '',
  color: '#22c55e',
  targetCapacity: 8,
  leadVolunteerId: '',
  requiredSkillIds: [],
};

export default function CreateTeamModal({
  isOpen,
  onClose,
  onTeamCreated,
  onShowToast,
  volunteers = [],
  skills = [],
}) {
  const [formData, setFormData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset when the modal closes, otherwise the previous team's values silently
  // carry over into the next one.
  const reset = () => {
    setFormData(EMPTY);
    setError('');
  };

  const close = () => {
    reset();
    onClose();
  };

  const toggleSkill = (id) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkillIds: prev.requiredSkillIds.includes(id)
        ? prev.requiredSkillIds.filter((s) => s !== id)
        : [...prev.requiredSkillIds, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Team name is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.createTeam({
        name: formData.name.trim(),
        description: formData.description.trim(),
        color: formData.color,
        targetCapacity: Number(formData.targetCapacity) || 8,
        // A reference, not a typed-in name - renaming the volunteer updates every
        // team they lead instead of leaving a stale string behind.
        leadVolunteerId: formData.leadVolunteerId || null,
        // Skill ids, so the matching engine compares exact keys.
        requiredSkillIds: formData.requiredSkillIds,
      });
      if (onShowToast) onShowToast(`Squad "${formData.name}" created!`);
      reset();
      if (onTeamCreated) onTeamCreated();
      onClose();
    } catch (err) {
      setError(err.message || 'Could not create the team');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Group the vocabulary by category so a 15-item list stays scannable.
  const byCategory = skills.reduce((acc, skill) => {
    (acc[skill.category || 'General'] ||= []).push(skill);
    return acc;
  }, {});

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={18} />
            </div>
            <h3 style={{ fontSize: 17, color: '#f3f4f6' }}>Create Functional Squad</h3>
          </div>
          <button onClick={close} className="close-btn" aria-label="Close"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px 24px' }}>
          <div className="form-group">
            <label className="form-label">Squad / Team Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Stage operations, Hospitality Crew"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Primary responsibilities and zone jurisdiction..."
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Target Capacity (Volunteers)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.targetCapacity}
                onChange={(e) => setFormData({ ...formData, targetCapacity: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Squad Lead</label>
              <select
                value={formData.leadVolunteerId}
                onChange={(e) => setFormData({ ...formData, leadVolunteerId: e.target.value })}
                className="form-input team-select"
              >
                <option value="">Unassigned</option>
                {volunteers.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name}
                  </option>
                ))}
              </select>
              {volunteers.length === 0 && (
                <span className="form-hint">No volunteers in this event yet.</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Required Skills <span className="form-hint">(drives candidate auto-matching)</span>
            </label>
            {skills.length === 0 ? (
              <span className="form-hint">No skills defined yet.</span>
            ) : (
              Object.entries(byCategory).map(([category, list]) => (
                <div key={category} style={{ marginBottom: 8 }}>
                  <div className="form-hint" style={{ marginBottom: 4 }}>{category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {list.map((skill) => {
                      const selected = formData.requiredSkillIds.includes(skill._id);
                      return (
                        <button
                          type="button"
                          key={skill._id}
                          onClick={() => toggleSkill(skill._id)}
                          className={`skill-chip ${selected ? 'skill-chip-selected' : ''}`}
                        >
                          {selected && <Check size={11} />}
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
            {formData.requiredSkillIds.length > 0 && (
              <span className="form-hint">
                {formData.requiredSkillIds.length} selected
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Badge Color Accent</label>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setFormData({ ...formData, color: c })}
                  aria-label={`Colour ${c}`}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: c,
                    border: formData.color === c ? '3px solid #ffffff' : '2px solid transparent',
                    cursor: 'pointer',
                    boxShadow: formData.color === c ? `0 0 10px ${c}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
            <button type="button" onClick={close} className="btn btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={loading} className="btn btn-primary btn-sm">
              {loading ? 'Creating...' : 'Create Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
