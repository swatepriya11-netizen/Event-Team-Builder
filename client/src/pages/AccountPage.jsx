import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, KeyRound, LogOut } from 'lucide-react';
import api from '../services/api';

const DEMO_EMAIL = 'coordinator@campus.edu';
const DEMO_PASSWORD = 'password123';

export default function AccountPage({
  onNavigate,
  onLoginSuccess,
  onLogout,
  isAuthenticated,
  checkingSession
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [name, setName] = useState('Campus Coordinator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let res;
      if (isRegister) {
        res = await api.register({ name, email, password });
      } else {
        res = await api.login({ email, password });
      }
      // The token is persisted by App via setToken in onLoginSuccess.
      onLoginSuccess(res.user, res.token);
      onNavigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // Signs in through the real API using the seeded demo account, so the demo
  // path is subject to exactly the same credential check as manual login.
  const handleQuickDemoLogin = async () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setLoading(true);
    setError(null);

    try {
      const res = await api.login({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
      onLoginSuccess(res.user, res.token);
      onNavigate('/dashboard');
    } catch (err) {
      setError(
        err.message ||
          'Demo account unavailable. Run "npm run seed" on the server to recreate it.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="account-page">
        <div className="account-container">
          <div className="account-form-wrapper" style={{ gridColumn: '1 / -1' }}>
            <div className="account-form-card" style={{ textAlign: 'center' }}>
              <p className="form-subtitle">Restoring your session...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Already signed in - offer the workspace instead of a redundant form.
  if (isAuthenticated) {
    return (
      <div className="account-page">
        <div className="account-container">
          <div className="account-form-wrapper" style={{ gridColumn: '1 / -1' }}>
            <div className="account-form-card">
              <div className="form-heading">
                <h2 className="form-title">You are signed in</h2>
                <p className="form-subtitle">
                  Choose where you want to go, or sign out on this device.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('/dashboard')}
                className="btn btn-primary submit-btn"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={16} />
              </button>

              <div className="quick-demo-box">
                <button
                  type="button"
                  onClick={onLogout}
                  className="btn btn-secondary quick-demo-btn"
                >
                  <LogOut size={15} color="#f87171" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-container">
        {/* Left Column: Brand Context */}
        <div className="account-context">
          <div className="brand" onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
            <div className="brand-mark">
              <span>E</span>
            </div>
            <span className="brand-name">EVENT TEAM BUILDER</span>
          </div>

          <div className="context-copy">
            <div className="context-badge">
              <Sparkles size={12} color="#4ade80" />
              <span>YOUR CAMPUS CREW, CONNECTED</span>
            </div>

            <h1 className="context-title">
              Bring the whole event team back into sync.
            </h1>

            <p className="context-desc">
              Sign in to pick up assignments, recruit your next crew, and keep every event moving in one shared place.
            </p>

            <div className="context-highlights">
              <div className="highlight-item">
                <CheckCircle2 size={16} color="#4ade80" />
                <span>Synchronized role assignment & shift scheduling</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={16} color="#4ade80" />
                <span>Automated skill-to-team matching engine</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={16} color="#4ade80" />
                <span>Live MongoDB cloud & local database sync</span>
              </div>
            </div>
          </div>

          <div className="context-footer">
            <span className="footer-note">Volunteer records and activity stay organized.</span>
          </div>
        </div>

        {/* Right Column: Account Form Area */}
        <div className="account-form-wrapper">
          <div className="account-form-card">
            <div className="form-heading">
              <h2 className="form-title">{isRegister ? 'Create an account' : 'Welcome back'}</h2>
              <p className="form-subtitle">
                {isRegister
                  ? 'Join your campus event leadership team.'
                  : 'Sign in to continue to your event workspace.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="sign-in-form">
              {isRegister && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="form-input"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Campus email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="coordinator@campus.edu"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <div className="password-row">
                  <label className="form-label">Password</label>
                  {!isRegister && (
                    <span
                      className="forgot-link"
                      onClick={() =>
                        alert(
                          `No password reset flow is wired up yet.\n\nDemo credentials: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`
                        )
                      }
                    >
                      Forgot password?
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>

              {error && (
                <div className="error-alert">
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary submit-btn"
              >
                <span>{loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight size={16} />
              </button>

              <div className="quick-demo-box">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={loading}
                  className="btn btn-secondary quick-demo-btn"
                >
                  <KeyRound size={15} color="#4ade80" />
                  <span>
                    {loading ? 'Signing in...' : '1-Click Coordinator Demo'}
                  </span>
                </button>
              </div>

              <div className="toggle-auth">
                <span className="toggle-question">
                  {isRegister ? 'Already have an account?' : 'New to Event Team Builder?'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="toggle-link"
                >
                  {isRegister ? 'Sign in' : 'Create an account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .account-page {
          min-height: 100vh;
          background: #121412;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }
        .account-container {
          max-width: 1080px;
          width: 100%;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 850px) {
          .account-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        .account-context {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-mark {
          width: 34px;
          height: 34px;
          background: #1a1e1a;
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-mark span {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 17px;
          color: var(--accent-primary);
        }
        .brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: var(--text-main);
        }
        .context-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #4ade80;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: var(--radius-pill);
          margin-bottom: 16px;
        }
        .context-title {
          font-size: 40px;
          line-height: 1.18;
          margin-bottom: 16px;
        }
        .context-desc {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .context-highlights {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
        }
        .context-footer {
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .footer-note {
          font-size: 13px;
          color: var(--text-muted);
        }
        .account-form-wrapper {
          display: flex;
          justify-content: center;
        }
        .account-form-card {
          background: #171b17;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 36px 32px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
        }
        .form-heading {
          margin-bottom: 24px;
        }
        .form-title {
          font-size: 24px;
          margin-bottom: 6px;
        }
        .form-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .password-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .forgot-link {
          font-size: 12px;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.15s;
        }
        .forgot-link:hover {
          color: var(--accent-primary);
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          margin-top: 8px;
        }
        .quick-demo-box {
          margin-top: 14px;
        }
        .quick-demo-btn {
          width: 100%;
          font-size: 13px;
          padding: 10px;
        }
        .error-alert {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          padding: 10px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          margin-bottom: 14px;
        }
        .toggle-auth {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
          font-size: 13px;
        }
        .toggle-question {
          color: var(--text-muted);
        }
        .toggle-link {
          color: var(--accent-primary);
          font-weight: 600;
          transition: color 0.15s;
        }
        .toggle-link:hover {
          color: var(--accent-hover);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
