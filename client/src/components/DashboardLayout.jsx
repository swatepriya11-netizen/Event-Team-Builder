import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  CalendarCheck, 
  Settings, 
  ExternalLink, 
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import MongoStatusBar from './MongoStatusBar';
import EventSwitcher from './EventSwitcher';

export default function DashboardLayout({ 
  currentPath, 
  onNavigate, 
  children, 
  eventInfo, 
  events,
  activeEventId,
  onSwitchEvent,
  onEventsChanged,
  dbStatus, 
  onRefreshDb,
  user,
  onLogout
}) {
  const isCoordinator = user?.role === 'Coordinator';

  // Volunteers get one page scoped to their own assignment; coordinators get the
  // full management workspace.
  const navItems = isCoordinator
    ? [
        { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Volunteers', path: '/dashboard/volunteers', icon: Users },
        { label: 'Team builder', path: '/dashboard/teams', icon: Layers },
        { label: 'Tasks & shifts', path: '/dashboard/tasks', icon: CalendarCheck },
        { label: 'Settings', path: '/dashboard/settings', icon: Settings },
      ]
    : [{ label: 'My dashboard', path: '/dashboard', icon: LayoutDashboard }];

  // Changing the cluster wipes and reseeds collections, so only Coordinators see
  // an actionable status pill.
  const canManageDb = isCoordinator;

  return (
    <div className="dashboard-shell">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand" onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
            <div className="sidebar-brand-mark">
              <span>E</span>
            </div>
            <div className="sidebar-brand-text">
              <span className="sidebar-brand-name">EVENT TEAM BUILDER</span>
              <span className="sidebar-brand-kicker">CAMPUS OPERATIONS</span>
            </div>
          </div>

          <div className="event-kicker-badge">
            <span className="event-kicker-dot" />
            <EventSwitcher
              events={events}
              activeEventId={activeEventId}
              onSwitch={onSwitchEvent}
              onRefresh={onEventsChanged}
            />
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                >
                  <div className="nav-item-content">
                    <Icon size={18} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                  </div>
                  {isActive && <div className="nav-active-indicator" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-status-box">
            <MongoStatusBar status={dbStatus} onRefresh={onRefreshDb} canManage={canManageDb} />
          </div>

          <button 
            onClick={() => onNavigate('/')}
            className="external-link-btn"
          >
            <span>Preview Landing Page</span>
            <ExternalLink size={13} />
          </button>

          <div className="user-profile-card">
            <div className="user-avatar">
              <span>{(user?.name || 'Campus Coordinator').charAt(0)}</span>
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Coordinator'}</span>
              <span className="user-role">{user?.role || 'Coordinator'}</span>
            </div>
            <button 
              onClick={onLogout}
              className="logout-mini-btn"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <span className="breadcrumb-event">{eventInfo?.kicker || eventInfo?.name || 'EVENT'}</span>
            <ChevronRight size={14} color="#6b7280" />
            <span className="breadcrumb-current">
              {navItems.find(i => i.path === currentPath)?.label || 'Dashboard'}
            </span>
          </div>

          <div className="topbar-right">
            <div className="badge badge-live">
              <span className="status-dot" />
              <span>{eventInfo?.status || 'LIVE'}</span>
            </div>
            <MongoStatusBar status={dbStatus} onRefresh={onRefreshDb} canManage={canManageDb} />
          </div>
        </header>

        <div className="content-container">
          {children}
        </div>
      </main>

      <style>{`
        .dashboard-shell {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-main);
        }
        .sidebar {
          width: 260px;
          background-color: #141714;
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 0;
          height: 100vh;
          padding: 24px 16px;
          z-index: 50;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 8px 20px 8px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .sidebar-brand-mark {
          width: 32px;
          height: 32px;
          background: #1a1e1a;
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sidebar-brand-mark span {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 16px;
          color: var(--accent-primary);
        }
        .sidebar-brand-text {
          display: flex;
          flex-direction: column;
        }
        .sidebar-brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: var(--text-main);
        }
        .sidebar-brand-kicker {
          font-size: 10px;
          letter-spacing: 0.05em;
          color: var(--accent-primary);
          font-weight: 600;
        }
        .event-kicker-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1a1f1a;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          margin: 16px 0;
        }
        .event-kicker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 6px var(--accent-primary);
        }
        .event-kicker-title {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          transition: all var(--transition-fast);
          position: relative;
        }
        .nav-item:hover {
          color: var(--text-main);
          background-color: var(--bg-surface-elevated);
        }
        .nav-item-active {
          color: #fff;
          background-color: rgba(34, 197, 94, 0.12);
          font-weight: 600;
        }
        .nav-item-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-icon {
          color: inherit;
        }
        .nav-active-indicator {
          width: 4px;
          height: 18px;
          background: var(--accent-primary);
          border-radius: 2px;
        }
        .sidebar-bottom {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .sidebar-status-box {
          display: flex;
          justify-content: center;
        }
        .external-link-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: #171b17;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--text-secondary);
          transition: all 0.15s;
        }
        .external-link-btn:hover {
          color: var(--text-main);
          border-color: var(--border-medium);
        }
        .user-profile-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          background: #181d18;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #272e27;
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        .user-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-role {
          font-size: 10px;
          color: var(--text-muted);
        }
        .logout-mini-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          transition: color 0.15s;
        }
        .logout-mini-btn:hover {
          color: #f87171;
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .topbar {
          height: 68px;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          background: rgba(18, 20, 18, 0.7);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .breadcrumb-event {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .breadcrumb-current {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .content-container {
          padding: 32px;
          max-width: 1300px;
          width: 100%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
