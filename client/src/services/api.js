const API_BASE = '/api';
const TOKEN_KEY = 'etb_token';
const EVENT_KEY = 'etb_event';

/* ── auth token ─────────────────────────────────────────────────────────── */

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* private browsing / storage disabled - session simply won't persist */
  }
}

export function clearToken() {
  setToken(null);
}

/* ── active event ───────────────────────────────────────────────────────── */

// The app is event-scoped: every team, volunteer and task belongs to exactly one
// event, and the server needs to be told which one on every request. Persisted
// so a page refresh does not silently jump you back to the default event.
let activeEventId = (() => {
  try {
    return localStorage.getItem(EVENT_KEY);
  } catch {
    return null;
  }
})();

export function setActiveEventId(id) {
  activeEventId = id || null;
  try {
    if (id) localStorage.setItem(EVENT_KEY, id);
    else localStorage.removeItem(EVENT_KEY);
  } catch {
    /* non-fatal */
  }
}

export function getActiveEventId() {
  return activeEventId;
}

/**
 * Build a query string, defaulting `eventId` to the active event.
 * This is what scopes every data request to one event; the server falls back to
 * the active event if it is absent, so this is a convenience, not a requirement.
 */
function qs(params = {}) {
  const merged = { ...params };
  if (activeEventId && merged.eventId === undefined) merged.eventId = activeEventId;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (value === undefined || value === null || value === '') continue;
    search.set(key, value);
  }
  const str = search.toString();
  return str ? `?${str}` : '';
}

/** Notifies the app shell that the session is gone so it can bounce to /account. */
function broadcastAuthFailure() {
  try {
    window.dispatchEvent(new CustomEvent('etb:unauthorized'));
  } catch {
    /* no-op */
  }
}

/**
 * End the current session locally and tell the app shell about it.
 *
 * Needed when we know a session has become invalid for a reason the server will
 * not report on the next request - e.g. after switching to a different database,
 * where the account behind the stored token does not exist. Without this the
 * user keeps clicking and getting unexplained 401s until they reload.
 */
export function endSession() {
  clearToken();
  broadcastAuthFailure();
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = getToken();
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };
  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const res = await fetch(url, config);

    // 204 and empty bodies should not be forced through res.json().
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (res.status === 401) {
      clearToken();
      broadcastAuthFailure();
    }

    if (!res.ok) {
      throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Server returned an unexpected response');
    }
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  register: (data) => request('/auth/register', { method: 'POST', body: data }),
  getProfile: () => request('/auth/me'),

  // Public - no token required. Used by the landing page before sign-in.
  getHealth: () => request('/health'),

  // Events - a real collection now, so the app can hold many at once.
  getEvents: () => request('/events'),
  getEvent: (id) => request(`/events/${id}`),
  getActiveEvent: () => request(`/events/active${qs()}`),
  createEvent: (data) => request('/events', { method: 'POST', body: data }),
  updateEvent: (id, data) => request(`/events/${id}`, { method: 'PUT', body: data }),
  deleteEvent: (id) => request(`/events/${id}`, { method: 'DELETE' }),
  activateEvent: (id) => request(`/events/${id}/activate`, { method: 'POST' }),

  // Skills - normalised vocabulary shared by volunteers and teams
  getSkills: () => request('/skills'),
  createSkill: (data) => request('/skills', { method: 'POST', body: data }),

  // Teams
  getTeams: () => request(`/teams${qs()}`),
  getTeam: (id) => request(`/teams/${id}${qs()}`),
  createTeam: (data) => request(`/teams${qs()}`, { method: 'POST', body: data }),
  updateTeam: (id, data) => request(`/teams/${id}${qs()}`, { method: 'PUT', body: data }),
  deleteTeam: (id) => request(`/teams/${id}${qs()}`, { method: 'DELETE' }),

  // Volunteers
  getVolunteers: (params = {}) => request(`/volunteers${qs(params)}`),
  getMyVolunteer: () => request(`/volunteers/me${qs()}`),
  updateMyVolunteer: (data) => request(`/volunteers/me${qs()}`, { method: 'PUT', body: data }),
  getVolunteer: (id) => request(`/volunteers/${id}${qs()}`),
  createVolunteer: (data) => request(`/volunteers${qs()}`, { method: 'POST', body: data }),
  updateVolunteer: (id, data) => request(`/volunteers/${id}${qs()}`, { method: 'PUT', body: data }),
  deleteVolunteer: (id) => request(`/volunteers/${id}${qs()}`, { method: 'DELETE' }),
  getMatches: () => request(`/volunteers/matches${qs()}`),

  // Tasks & Shifts
  getTasks: () => request(`/tasks${qs()}`),
  getTaskMetrics: () => request(`/tasks/metrics${qs()}`),
  getTask: (id) => request(`/tasks/${id}${qs()}`),
  createTask: (data) => request(`/tasks${qs()}`, { method: 'POST', body: data }),
  updateTask: (id, data) => request(`/tasks/${id}${qs()}`, { method: 'PUT', body: data }),
  deleteTask: (id) => request(`/tasks/${id}${qs()}`, { method: 'DELETE' }),

  // System & MongoDB
  getSystemStatus: () => request(`/system/status${qs()}`),
  connectMongoDB: (uri) => request('/system/connect-mongodb', { method: 'POST', body: { uri } }),
  seedDatabase: () => request('/system/seed', { method: 'POST' }),
};

export default api;
