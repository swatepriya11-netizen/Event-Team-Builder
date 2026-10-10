const mongoose = require('mongoose');
const { slugify } = require('../lib/ids');

/**
 * Normalised skill vocabulary.
 *
 * Previously skills were free-text strings on Volunteer and Team, so matching
 * had to compare substrings ("Sound" vs "Sound Engineering") and could not tell
 * a typo from a different skill. Both sides now reference a Skill by its slug,
 * so matching is an exact id comparison.
 *
 * The slug is the _id, which keeps it readable ("sound-engineering") while
 * still being a real, unique, referenceable key.
 */
const SkillSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Technical', 'Creative', 'Operations', 'Hospitality', 'Safety', 'General'],
    default: 'General',
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

SkillSchema.pre('validate', function deriveId(next) {
  if (!this.name) return next();
  if (!this._id) this._id = slugify(this.name, 'skill');
  next();
});

module.exports = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
