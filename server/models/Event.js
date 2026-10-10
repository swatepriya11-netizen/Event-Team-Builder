const mongoose = require('mongoose');
const { slugify } = require('../lib/ids');

/**
 * An Event is the root of the whole data tree. Teams, volunteers, assignments
 * and tasks all carry an eventId, so the app can hold many events side by side.
 *
 * There used to be exactly one Event document with no way to reference it. That
 * is why every other model lacked an eventId.
 */
const EventSchema = new mongoose.Schema({
  // String _id for consistency with every other model. Derived from the slug so
  // it is stable and predictable ("evt-aurelia-cultural-fest-2026").
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },

  // Real Date fields. The previous `dates: "18-20 September 2026"` string could
  // not be range-queried or sorted.
  startsAt: { type: Date, required: true },
  endsAt: { type: Date, required: true },

  venue: {
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
  },

  status: {
    type: String,
    enum: ['Planning', 'Live', 'Completed', 'Cancelled'],
    default: 'Planning',
  },

  // Exactly one event is "active" at a time; it is the default scope for any
  // request that does not name an eventId.
  isActive: { type: Boolean, default: false },

  targets: {
    activeVolunteers: { type: Number, default: 45 },
    teams: { type: Number, default: 6 },
  },

  // The three loose top-level settings (autoMatching / shiftAlerts /
  // coordinatorEditing) live together here instead of at the root.
  settings: {
    autoMatching: { type: Boolean, default: true },
    shiftAlertLeadMinutes: { type: Number, default: 120 },
    coordinatorEditing: { type: Boolean, default: true },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// At most one active event. Enforced in the route layer (which can report a
// friendly error); this index at least makes "find the active event" fast.
EventSchema.index({ isActive: 1 });

EventSchema.pre('validate', function deriveIdentity(next) {
  if (!this.slug && this.name) this.slug = slugify(this.name, 'event');
  if (!this._id && this.slug) this._id = `evt-${this.slug}`;
  next();
});

/**
 * Fields the client expects that are derived from startsAt/endsAt. Returned
 * alongside the document so the UI can keep rendering its date label without
 * reimplementing date formatting.
 */
EventSchema.methods.toClientJSON = function toClientJSON() {
  const { formatDateRange } = require('../lib/ids');
  return {
    ...this.toObject(),
    dates: formatDateRange(this.startsAt, this.endsAt),
    shiftAlerts: `Sent ${Math.round((this.settings?.shiftAlertLeadMinutes ?? 120) / 60)}h before`,
    autoMatching: this.settings?.autoMatching ?? true,
    coordinatorEditing: this.settings?.coordinatorEditing ?? true,
    activeVolunteersTarget: this.targets?.activeVolunteers ?? 45,
  };
};

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
