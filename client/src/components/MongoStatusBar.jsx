import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Database, CheckCircle, AlertTriangle, X, RefreshCw, Server } from 'lucide-react';
import api, { endSession } from '../services/api';

export default function MongoStatusBar({ status, onRefresh, canManage = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [uri, setUri] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const isConnected = status?.connected;

  // Reconnecting to another cluster wipes and reseeds collections, so the
  // server restricts it to Coordinators. Mirror that here instead of letting a
  // visitor click through to a 403.
  const openPanel = () => {
    if (!canManage) return;
    setError(null);
    setMessage(null);
    setIsOpen(true);
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!uri) return;
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await api.connectMongoDB(uri);
      if (res.sessionInvalidated) {
        // Switching to a database that has no account for this token ends every
        // session. Report it and bounce to sign-in instead of closing the panel
        // as if nothing happened.
        setError(res.sessionMessage || 'Connected, but you must sign in again.');
        endSession();
        return;
      }
      setMessage(res.message);
      if (onRefresh) onRefresh();
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to connect to MongoDB');
    } finally {
      setLoading(false);
    }
  };

  // Close on Escape and stop the page behind the overlay from scrolling.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <div 
        onClick={openPanel}
        className="mongo-status-pill"
        style={canManage ? undefined : { cursor: 'default' }}
        title={canManage ? 'Click to manage MongoDB connection' : 'Sign in as a Coordinator to change the database connection'}
      >
        <span className={`status-indicator ${isConnected ? 'status-connected' : 'status-fallback'}`}>
          <Database size={13} />
          <span>
            {isConnected
              ? 'MongoDB Connected'
              : canManage
                ? 'Local Fallback (Click to connect DB)'
                : 'Local Fallback (Sign in as Coordinator to connect)'}
          </span>
          <span className="dot" />
        </span>
      </div>

      {/* Rendered into <body> because both navbars use backdrop-filter, which
          makes them the containing block for position:fixed children. Without
          the portal the overlay is clamped to the 68px header and the dialog is
          pushed off the top of the screen. */}
      {isOpen && createPortal(
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className={`icon-circle ${isConnected ? 'icon-success' : 'icon-warning'}`}>
                  <Database size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, color: '#f3f4f6' }}>MongoDB Connection</h3>
                  <p style={{ fontSize: 13, color: '#9ca3af' }}>
                    {isConnected ? 'Active database connection verified' : 'Running in resilient local storage'}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '20px 24px' }}>
              <div className="status-banner" style={{
                background: isConnected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                border: `1px solid ${isConnected ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                borderRadius: 12,
                padding: '14px 16px',
                marginBottom: 20
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  {isConnected ? <CheckCircle size={16} color="#4ade80" /> : <AlertTriangle size={16} color="#fbbf24" />}
                  <strong style={{ fontSize: 14, color: isConnected ? '#4ade80' : '#fbbf24' }}>
                    {isConnected ? 'Connected to MongoDB' : 'No MongoDB connection active'}
                  </strong>
                </div>
                <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.4 }}>
                  {isConnected
                    ? (status?.counts
                        ? `Live collections: ${status.counts.volunteers || 0} volunteers, ${status.counts.teams || 0} teams, ${status.counts.tasks || 0} tasks.`
                        : 'Active database connection verified. Sign in to view collection totals.')
                    : 'The app is fully functioning with local seed storage. To persist in your own MongoDB Atlas cluster or local database, provide the connection URI below.'}
                </p>
                {status?.uri && (
                  <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#6b7280', marginTop: 6, wordBreak: 'break-all' }}>
                    URI: {status.uri}
                  </div>
                )}
              </div>

              <form onSubmit={handleConnect}>
                <div className="form-group">
                  <label className="form-label">MongoDB Connection String</label>
                  <input
                    type="text"
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
                    placeholder="mongodb+srv://user:password@cluster.mongodb.net/event-team-builder"
                    className="form-input"
                    style={{ fontSize: 13, fontFamily: 'monospace' }}
                  />
                  <span style={{ fontSize: 11, color: '#6b7280' }}>
                    Supports MongoDB Atlas Cloud (`mongodb+srv://...`) or Local (`mongodb://localhost:27017/...`)
                  </span>
                </div>

                {message && (
                  <div style={{ padding: '10px 14px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
                    ✓ {message}
                  </div>
                )}

                {error && (
                  <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
                    ✕ {error}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setUri('mongodb://localhost:27017/event-team-builder');
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    Use Localhost
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !uri}
                    className="btn btn-primary"
                    style={{ minWidth: 140 }}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={14} className="spin" />
                        Connecting...
                      </>
                    ) : (
                      'Connect & Sync'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .mongo-status-pill {
          cursor: pointer;
          user-select: none;
          display: inline-flex;
        }
        .status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all 0.2s ease;
        }
        .status-connected {
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.35);
          color: #4ade80;
        }
        .status-connected:hover {
          background: rgba(34, 197, 94, 0.22);
          border-color: #4ade80;
        }
        .status-fallback {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #fbbf24;
        }
        .status-fallback:hover {
          background: rgba(245, 158, 11, 0.22);
          border-color: #fbbf24;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 6px currentColor;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .icon-circle {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-success {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
        }
        .icon-warning {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .close-btn {
          color: #9ca3af;
          padding: 6px;
          border-radius: 6px;
          transition: color 0.15s;
        }
        .close-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
