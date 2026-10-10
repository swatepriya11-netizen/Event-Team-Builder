import React from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';
import MongoStatusBar from './MongoStatusBar';

export default function Navbar({ onNavigate, currentPath, dbStatus, onRefreshDb, canManageDb }) {
  return (
    <header className="home-nav">
      <div className="nav-container">
        <div className="brand" onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
          <div className="brand-mark">
            <span>E</span>
          </div>
          <span className="brand-name">EVENT TEAM BUILDER</span>
        </div>

        <div className="nav-actions">
          <MongoStatusBar status={dbStatus} onRefresh={onRefreshDb} canManage={canManageDb} />

          <button
            onClick={() => onNavigate('/account')}
            className="nav-link"
          >
            Coordinator Log In
          </button>

          <button
            onClick={() => onNavigate('/dashboard')}
            className="btn btn-primary btn-sm"
          >
            <span>Launch workspace</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .home-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(18, 20, 18, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 68px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-mark {
          width: 32px;
          height: 32px;
          background: #1a1e1a;
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.15);
        }
        .brand-mark span {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 16px;
          color: var(--accent-primary);
        }
        .brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: var(--text-main);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.15s ease;
        }
        .nav-link:hover {
          color: var(--text-main);
        }
      `}</style>
    </header>
  );
}
