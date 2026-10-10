/**
 * Shared id/slug helpers.
 *
 * Every collection in this app uses a human-readable String _id rather than an
 * ObjectId (e.g. "team-stage-ops", "evt-aurelia-2026"). That keeps seed data
 * legible in a shell, avoids the ObjectId cast errors that plagued the original
 * models, and means cross-collection refs are plain strings that never need
 * casting. Cross-collection type mismatches cannot occur because they are all
 * the same type.
 */

/** Lowercase, hyphen-separated, safe for URLs and Mongo keys. */
function slugify(value, fallback = 'item') {
  const base = String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics: "Café" -> "cafe"
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || fallback;
}

/**
 * Build a slug that does not collide with `taken`.
 * Used when a user-supplied name has to become a unique key.
 */
function uniqueSlug(value, taken = [], fallback = 'item') {
  const base = slugify(value, fallback);
  if (!taken.includes(base)) return base;
  let n = 2;
  while (taken.includes(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

/** Readable, collision-resistant id for a newly created document. */
function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Format a date range the way the UI historically displayed it, e.g.
 * "18-20 September 2026" or "18 September - 2 October 2026".
 */
function formatDateRange(start, end) {
  if (!start) return '';
  const s = new Date(start);
  if (!end) {
    return s.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  const e = new Date(end);
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  const sameYear = s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${s.getDate()}-${e.getDate()} ${s.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
  }
  if (sameYear) {
    return `${s.getDate()} ${s.toLocaleDateString('en-GB', { month: 'short' })} - ${e.getDate()} ${e.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
  }
  return `${formatDateRange(s, null)} - ${formatDateRange(e, null)}`;
}

/** "09:30 - 13:00" style label for a task's shift window. */
function formatShift(start, end) {
  if (!start) return '';
  const time = (d) =>
    new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  return end ? `${time(start)} - ${time(end)}` : time(start);
}

module.exports = { slugify, uniqueSlug, makeId, formatDateRange, formatShift };
