const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const memoryStore = require('../store/memoryStore');
const { getDBStatus } = require('../config/db');
const { slugify } = require('../lib/ids');
const { requireRole } = require('../middleware/auth');

/**
 * The normalised skill vocabulary. Referenced by id from Volunteer.skillIds and
 * Team.requiredSkillIds, which is what lets the matching engine compare ids
 * instead of guessing with substring matching.
 */

// GET /api/skills
router.get('/', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const skills = connected
      ? await Skill.find({}).sort({ category: 1, name: 1 }).lean()
      : memoryStore.getSkills();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/skills - create on demand (the UI can add a skill while editing)
router.post('/', requireRole('Coordinator'), async (req, res) => {
  try {
    if (!req.body?.name) return res.status(400).json({ error: 'Skill name is required' });
    const { connected } = getDBStatus();

    // Look up the *base* slug. Checking a uniquified slug here would never find
    // the existing skill, so re-adding "Pyrotechnics" would silently fork into
    // "pyrotechnics-2" and break matching.
    const base = slugify(req.body.name, 'skill');
    const existing = connected
      ? await Skill.findById(base).lean()
      : memoryStore.getSkills().find((s) => s._id === base) || null;
    if (existing) return res.status(200).json(existing);

    if (connected) {
      const created = await Skill.create({ ...req.body, _id: base });
      return res.status(201).json(created);
    }

    res.status(201).json(memoryStore.createSkill({ ...req.body, _id: base }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
