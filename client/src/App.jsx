import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import DashboardOverview from './pages/DashboardOverview';
import VolunteersPage from './pages/VolunteersPage';
import TeamBuilderPage from './pages/TeamBuilderPage';
import TasksShiftsPage from './pages/TasksShiftsPage';
import SettingsPage from './pages/SettingsPage';
import VolunteerPortal from './pages/VolunteerPortal';
import DashboardLayout from './components/DashboardLayout';
import AddVolunteerModal from './components/AddVolunteerModal';
import CreateTeamModal from './components/CreateTeamModal';
import CreateTaskModal from './components/CreateTaskModal';
import Toast from './components/Toast';
import api, { getToken, setToken, clearToken, setActiveEventId, getActiveEventId } from './services/api';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  // The app holds many events. `activeEventId` scopes every data request;
  // `events` powers the switcher. Persisted, so a refresh keeps you where you were.
  const [events, setEvents] = useState([]);
  const [activeEventId, setActiveEventIdState] = useState(getActiveEventId());

  const [eventInfo, setEventInfo] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [matches, setMatches] = useState([]);
  const [skills, setSkills] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);
  const [publicDbStatus, setPublicDbStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [isAddVolunteerOpen, setIsAddVolunteerOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const isAuthenticated = Boolean(user);
  // Coordinators manage the whole event. Every other role is restricted to
  // their own assignment, team and shifts (enforced by the API as well).
  const isCoordinator = user?.role === 'Coordinator';
  const canManageDb = isCoordinator;

  // Navigation handler with browser pushState
  const navigate = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The landing page is public, so it reads the redacted /api/health summary
  // rather than the authenticated /api/system/status.
  const refreshHealth = useCallback(async () => {
    try {
      const health = await api.getHealth();
      setPublicDbStatus(health.db ?? null);
    } catch {
      setPublicDbStatus(null);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  }, []);

  const handleLogout = useCallback(() => {
    clearToken();
    setUser(null);
    setEvents([]);
    setEventInfo(null);
    setVolunteers([]);
    setTeams([]);
    setTasks([]);
    setMetrics(null);
    setMatches([]);
    setDbStatus(null);
    // The active event is per-browser, not per-account, so it survives sign-out.
    window.history.pushState({}, '', '/account');
    setCurrentPath('/account');
    showToast('Signed out successfully');
  }, [showToast]);

  /** Reload the event list (switcher, counts, "is this still the default?"). */
  const loadEvents = useCallback(async () => {
    try {
      const list = await api.getEvents();
      setEvents(list);

      // Reconcile the remembered selection against what actually exists - it may
      // have been deleted on another tab, or on another device.
      const remembered = getActiveEventId();
      const stillExists = remembered && list.some((e) => e._id === remembered);
      if (!stillExists) {
        const fallback = list.find((e) => e.isActive) || list[0] || null;
        setActiveEventId(fallback?._id ?? null);
        setActiveEventIdState(fallback?._id ?? null);
      }
      return list;
    } catch (err) {
      console.error('Failed to load events:', err);
      return [];
    }
  }, []);

  /**
   * Fetch the event list plus every dataset scoped to the active event.
   * Uses allSettled so one slow or failing endpoint cannot blank the whole page.
   */
  const loadData = useCallback(async () => {
    try {
      const list = await loadEvents();

      // Resolve which event we are showing before the scoped requests go out.
      const remembered = getActiveEventId();
      const resolved =
        (remembered && list.find((e) => e._id === remembered)) ||
        list.find((e) => e.isActive) ||
        list[0] ||
        null;
      if (resolved && resolved._id !== remembered) {
        setActiveEventId(resolved._id);
        setActiveEventIdState(resolved._id);
      }

      if (!resolved) {
        // No events exist. Clear the dashboard rather than showing another
        // event's volunteers under an empty header.
        setEventInfo(null);
        setVolunteers([]);
        setTeams([]);
        setTasks([]);
        setMetrics(null);
        setMatches([]);
        return;
      }

      const [evt, vols, tms, tsks, mtr, mtch, sys, skl] = await Promise.allSettled([
        api.getEvent(resolved._id),
        api.getVolunteers(),
        api.getTeams(),
        api.getTasks(),
        api.getTaskMetrics(),
        api.getMatches(),
        api.getSystemStatus(),
        api.getSkills()
      ]);

      if (evt.status === 'fulfilled') setEventInfo(evt.value);
      if (vols.status === 'fulfilled') setVolunteers(vols.value);
      if (tms.status === 'fulfilled') setTeams(tms.value);
      if (tsks.status === 'fulfilled') setTasks(tsks.value);
      if (mtr.status === 'fulfilled') setMetrics(mtr.value);
      if (mtch.status === 'fulfilled') setMatches(mtch.value);
      if (sys.status === 'fulfilled') setDbStatus(sys.value);
      // Skills are a global vocabulary, not event-scoped, so this only needs
      // loading when it changes.
      if (skl.status === 'fulfilled') setSkills(skl.value);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  }, [loadEvents]);

  /** Switch the active event. State first, so the reload reads the new scope. */
  const handleSwitchEvent = useCallback(
    async (id) => {
      setActiveEventId(id);
      setActiveEventIdState(id);
      setEventInfo(null);
      setVolunteers([]);
      setTeams([]);
      setTasks([]);
      setMetrics(null);
      setMatches([]);
      try {
        const evt = await api.getEvent(id);
        setEventInfo(evt);
        const [vols, tms, tsks, mtr, mtch, sys] = await Promise.allSettled([
          api.getVolunteers(),
          api.getTeams(),
          api.getTasks(),
          api.getTaskMetrics(),
          api.getMatches(),
          api.getSystemStatus()
        ]);
        if (vols.status === 'fulfilled') setVolunteers(vols.value);
        if (tms.status === 'fulfilled') setTeams(tms.value);
        if (tsks.status === 'fulfilled') setTasks(tsks.value);
        if (mtr.status === 'fulfilled') setMetrics(mtr.value);
        if (mtch.status === 'fulfilled') setMatches(mtch.value);
        if (sys.status === 'fulfilled') setDbStatus(sys.value);
      } catch (err) {
        console.error('Failed to switch event:', err);
        showToast('Could not load that event');
      }
    },
    [showToast]
  );

  // Restore an existing session on first load. Without this, a page refresh
  // dropped the user out of the dashboard because auth state lived in memory.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getToken()) {
        setCheckingSession(false);
        return;
      }
      try {
        const res = await api.getProfile();
        if (!cancelled && res?.user) setUser(res.user);
      } catch {
        if (!cancelled) {
          clearToken();
        }
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // A 401 from any request means the token died mid-session.
  useEffect(() => {
    const onUnauthorized = () => {
      setUser(null);
      if (window.location.pathname.startsWith('/dashboard')) {
        window.history.pushState({}, '', '/account');
        setCurrentPath('/account');
      }
    };
    window.addEventListener('etb:unauthorized', onUnauthorized);
    return () => window.removeEventListener('etb:unauthorized', onUnauthorized);
  }, []);

  // Refresh the public health summary on load and after any sign-in/out, so the
  // landing page pill stays accurate without needing credentials.
  useEffect(() => {
    refreshHealth();
  }, [refreshHealth, isAuthenticated]);

  // Dashboard data only loads once authenticated.
  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated]);

  // Gate protected routes.
  useEffect(() => {
    if (checkingSession) return;
    const protectedRoute = currentPath.startsWith('/dashboard');
    if (protectedRoute && !isAuthenticated) {
      window.history.pushState({}, '', '/account');
      setCurrentPath('/account');
    }
  }, [checkingSession, isAuthenticated, currentPath]);

  // Volunteers have one workspace page. Normalise any coordinator-only URL they
  // might land on (bookmark, stale link) back to it.
  useEffect(() => {
    if (checkingSession || !isAuthenticated || isCoordinator) return;
    if (currentPath.startsWith('/dashboard') && currentPath !== '/dashboard') {
      window.history.replaceState({}, '', '/dashboard');
      setCurrentPath('/dashboard');
    }
  }, [checkingSession, isAuthenticated, isCoordinator, currentPath]);

  const handleLoginSuccess = (userData, token) => {
    if (token) setToken(token);
    setUser(userData);
    showToast(`Welcome back, ${userData?.name || 'Coordinator'}!`);
  };

  // Determine view
  const isDashboardRoute = currentPath.startsWith('/dashboard');

  let content = null;

  if (currentPath === '/') {
    content = (
      <HomePage
        onNavigate={navigate}
        dbStatus={publicDbStatus}
        onRefreshDb={refreshHealth}
        eventInfo={eventInfo}
        canManageDb={canManageDb}
      />
    );
  } else if (currentPath === '/account') {
    content = (
      <AccountPage
        onNavigate={navigate}
        checkingSession={checkingSession}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  } else if (isDashboardRoute) {
    let dashboardContent = null;

    if (!isCoordinator) {
      // Restricted workspace: own assignment, team, shifts and profile only.
      dashboardContent = (
        <VolunteerPortal
          user={user}
          eventInfo={eventInfo}
          volunteers={volunteers}
          teams={teams}
          tasks={tasks}
          onRefresh={loadData}
          onShowToast={showToast}
        />
      );
    } else if (currentPath === '/dashboard') {
      dashboardContent = (
        <DashboardOverview
          eventInfo={eventInfo}
          volunteers={volunteers}
          teams={teams}
          tasks={tasks}
          metrics={metrics}
          onNavigate={navigate}
          onOpenAddVolunteer={() => setIsAddVolunteerOpen(true)}
        />
      );
    } else if (currentPath === '/dashboard/volunteers') {
      dashboardContent = (
        <VolunteersPage
          volunteers={volunteers}
          teams={teams}
          onRefresh={loadData}
          onOpenAddVolunteer={() => setIsAddVolunteerOpen(true)}
          onShowToast={showToast}
        />
      );
    } else if (currentPath === '/dashboard/teams') {
      dashboardContent = (
        <TeamBuilderPage
          teams={teams}
          volunteers={volunteers}
          matches={matches}
          onRefresh={loadData}
          onShowToast={showToast}
          onOpenCreateTeam={() => setIsCreateTeamOpen(true)}
        />
      );
    } else if (currentPath === '/dashboard/tasks') {
      dashboardContent = (
        <TasksShiftsPage
          tasks={tasks}
          teams={teams}
          metrics={metrics}
          onRefresh={loadData}
          onShowToast={showToast}
          onOpenCreateTask={() => setIsCreateTaskOpen(true)}
        />
      );
    } else if (currentPath === '/dashboard/settings') {
      dashboardContent = (
        <SettingsPage
          eventInfo={eventInfo}
          dbStatus={dbStatus}
          onRefreshDb={loadData}
          onRefreshEvent={loadData}
          onShowToast={showToast}
        />
      );
    }

    content = (
      <DashboardLayout
        currentPath={currentPath}
        onNavigate={navigate}
        eventInfo={eventInfo}
        events={events}
        activeEventId={activeEventId}
        onSwitchEvent={handleSwitchEvent}
        onEventsChanged={loadEvents}
        dbStatus={dbStatus}
        onRefreshDb={loadData}
        user={user}
        onLogout={handleLogout}
      >
        {dashboardContent}
      </DashboardLayout>
    );
  } else {
    // 404 fallback routes back to home
    content = (
      <HomePage
        onNavigate={navigate}
        dbStatus={publicDbStatus}
        onRefreshDb={refreshHealth}
        eventInfo={eventInfo}
        canManageDb={canManageDb}
      />
    );
  }

  return (
    <div className="app-root">
      {content}

      {/* Global Modals */}
      <AddVolunteerModal
        isOpen={isAddVolunteerOpen}
        onClose={() => setIsAddVolunteerOpen(false)}
        teams={teams}
        skills={skills}
        onVolunteerAdded={loadData}
        onShowToast={showToast}
      />

      <CreateTeamModal
        isOpen={isCreateTeamOpen}
        onClose={() => setIsCreateTeamOpen(false)}
        onTeamCreated={loadData}
        onShowToast={showToast}
        volunteers={volunteers}
        skills={skills}
      />

      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        teams={teams}
        volunteers={volunteers}
        onTaskCreated={loadData}
        onShowToast={showToast}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
