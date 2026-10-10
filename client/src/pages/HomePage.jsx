import React from 'react';
import { ArrowRight, CheckCircle2, Users, Calendar, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function HomePage({ onNavigate, dbStatus, onRefreshDb, eventInfo, canManageDb }) {
  return (
    <div className="home-page">
      <Navbar 
        onNavigate={onNavigate} 
        currentPath="/" 
        dbStatus={dbStatus} 
        onRefreshDb={onRefreshDb} 
        canManageDb={canManageDb}
      />

      <div className="hero-glow" />

      {/* Hero / Introduction Split */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-copy">
            <div className="eyebrow-badge">
              <Sparkles size={12} color="#4ade80" />
              <span>{eventInfo?.kicker || 'BUILT FOR CAMPUS CREWS'}</span>
            </div>

            <h1 className="hero-headline">
              Make every campus event run like a great team.
            </h1>

            <p className="hero-description">
              Bring volunteers, roles, tasks, and progress into one shared workspace — so every student knows where to show up and how to contribute.
            </p>

            <div className="hero-actions">
              <button 
                onClick={() => onNavigate('/dashboard')} 
                className="btn btn-primary btn-lg"
              >
                <span>Start organizing</span>
                <ArrowRight size={16} />
              </button>

              <button 
                onClick={() => {
                  const el = document.getElementById('coordination-flow');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="btn btn-secondary btn-lg"
              >
                Explore the flow
              </button>
            </div>

            <p className="hero-note">
              From first sign-up to final check-out, stay aligned without the spreadsheet scramble.
            </p>
          </div>

          {/* Interactive Live Workspace Preview */}
          <div className="hero-preview">
            <div className="preview-card">
              <div className="preview-topbar">
                <div className="preview-title-box">
                  <span className="preview-kicker">SAMPLE PREVIEW</span>
                  <span className="preview-event-name">{eventInfo?.name || 'Aurelia Cultural Fest ’26'}</span>
                </div>
                <div className="badge badge-neutral">
                  <span className="status-dot" />
                  <span>DEMO</span>
                </div>
              </div>

              <div className="preview-metrics">
                <div className="preview-metric">
                  <span className="metric-number">45</span>
                  <span className="metric-label">volunteer target</span>
                </div>
                <div className="preview-metric">
                  <span className="metric-number">6</span>
                  <span className="metric-label">crew squads</span>
                </div>
              </div>

              <div className="preview-roster">
                <div className="roster-header">
                  <span className="roster-title">Today’s crew</span>
                  <span className="roster-time">09:30 briefing</span>
                </div>

                <div className="roster-volunteer">
                  <div className="volunteer-profile">
                    <div className="volunteer-avatar" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
                      A
                    </div>
                    <div className="volunteer-details">
                      <span className="volunteer-name">Aarav Menon</span>
                      <span className="volunteer-role">Stage operations</span>
                    </div>
                  </div>
                  <span className="badge badge-live" style={{ fontSize: 10 }}>Assigned</span>
                </div>

                <div className="roster-volunteer">
                  <div className="volunteer-profile">
                    <div className="volunteer-avatar" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
                      A
                    </div>
                    <div className="volunteer-details">
                      <span className="volunteer-name">Ananya Shah</span>
                      <span className="volunteer-role">Media team (Recommended)</span>
                    </div>
                  </div>
                  <span className="badge badge-warning" style={{ fontSize: 10 }}>Ready</span>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('/dashboard')}
                className="preview-cta"
              >
                <span>Open Live Workspace</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Tool Integrations */}
      <section className="integrations-section">
        <div className="integrations-container">
          <span className="integrations-label">WORKS ALONGSIDE</span>
          <div className="integrations-list">
            <span className="integration-item">Campus Discord</span>
            <span className="dot-sep">•</span>
            <span className="integration-item">Google Sheets</span>
            <span className="dot-sep">•</span>
            <span className="integration-item">WhatsApp Broadcast</span>
            <span className="dot-sep">•</span>
            <span className="integration-item">Student Portal SSO</span>
          </div>
        </div>
      </section>

      {/* Coordination Flow Section */}
      <section id="coordination-flow" className="flow-section">
        <div className="flow-container">
          <div className="flow-header">
            <h2 className="flow-title">Less chasing. More showing up.</h2>
            <p className="flow-subtitle">One clear rhythm for every role.</p>
          </div>

          <div className="flow-grid">
            <div className="flow-step-card">
              <div className="step-badge">
                <span className="step-num">01</span>
              </div>
              <h3 className="step-title">Recruit by fit</h3>
              <p className="step-desc">
                Let students surface their skills and interests before they join the team.
              </p>
              <div className="step-indicator-bar" />
            </div>

            <div className="flow-step-card">
              <div className="step-badge">
                <span className="step-num">02</span>
                <span className="step-sym">↳</span>
              </div>
              <h3 className="step-title">Assign with clarity</h3>
              <p className="step-desc">
                Give every volunteer a role, task, and moment to be exactly where they’re needed.
              </p>
              <div className="step-indicator-bar" style={{ background: 'var(--color-guest)' }} />
            </div>

            <div className="flow-step-card">
              <div className="step-badge">
                <span className="step-num">03</span>
                <span className="step-sym">+</span>
              </div>
              <h3 className="step-title">Keep the record</h3>
              <p className="step-desc">
                Capture participation history so reliable volunteers get the recognition they earn.
              </p>
              <div className="step-indicator-bar" style={{ background: 'var(--color-media)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Campus Invitation Banner */}
      <section className="invitation-section">
        <div className="invitation-container">
          <div className="invitation-box">
            <span className="invitation-kicker">FOR STUDENT LEADERS WHO MOVE CULTURE</span>
            <h2 className="invitation-title">
              Your next great event starts with a better crew.
            </h2>
            <button 
              onClick={() => onNavigate('/dashboard')} 
              className="btn btn-primary btn-lg"
            >
              Create your first event
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-container">
          <div className="footer-left">
            <span className="brand-name">EVENT TEAM BUILDER</span>
            <span className="footer-desc">Full-stack campus event operations with Node.js, React, Express & MongoDB</span>
          </div>
          <div className="footer-right">
            <span>© 2026 Event Team Builder. All rights reserved.</span>
          </div>
        </div>
      </footer>

      <style>{`
        .home-page {
          min-height: 100vh;
          position: relative;
          background: #121412;
        }
        .hero-section {
          padding: 80px 24px 60px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        .eyebrow-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #4ade80;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: var(--radius-pill);
          margin-bottom: 20px;
        }
        .hero-headline {
          font-size: 48px;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }
        @media (max-width: 600px) {
          .hero-headline {
            font-size: 34px;
          }
        }
        .hero-description {
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 520px;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .hero-note {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .preview-card {
          background: #161a16;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
          position: relative;
          overflow: hidden;
        }
        .preview-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 20px;
        }
        .preview-title-box {
          display: flex;
          flex-direction: column;
        }
        .preview-kicker {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .preview-event-name {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-main);
        }
        .preview-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .preview-metric {
          background: #1a1f1a;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
        }
        .metric-number {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 800;
          color: var(--text-main);
        }
        .metric-label {
          font-size: 12px;
          color: var(--text-muted);
        }
        .preview-roster {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .roster-header {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        .roster-volunteer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: #1c211c;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .volunteer-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .volunteer-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .volunteer-details {
          display: flex;
          flex-direction: column;
        }
        .volunteer-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
        }
        .volunteer-role {
          font-size: 11px;
          color: var(--text-muted);
        }
        .preview-cta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-md);
          color: #4ade80;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s;
        }
        .preview-cta:hover {
          background: rgba(34, 197, 94, 0.2);
          border-color: #4ade80;
        }
        .integrations-section {
          padding: 30px 24px;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(22, 26, 22, 0.5);
        }
        .integrations-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .integrations-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }
        .integrations-list {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .dot-sep {
          color: #3b443b;
        }
        .flow-section {
          padding: 90px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .flow-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .flow-title {
          font-size: 38px;
          margin-bottom: 8px;
        }
        .flow-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
        }
        .flow-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 800px) {
          .flow-grid {
            grid-template-columns: 1fr;
          }
        }
        .flow-step-card {
          background: #161a16;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .step-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .step-num {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 800;
          color: var(--accent-primary);
        }
        .step-sym {
          font-size: 18px;
          color: var(--text-muted);
        }
        .step-title {
          font-size: 20px;
          margin-bottom: 12px;
        }
        .step-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
          flex: 1;
        }
        .step-indicator-bar {
          height: 3px;
          width: 40px;
          background: var(--accent-primary);
          border-radius: 2px;
        }
        .invitation-section {
          padding: 40px 24px 80px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .invitation-box {
          background: linear-gradient(135deg, #182018 0%, #151a15 100%);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-xl);
          padding: 56px 40px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
        }
        .invitation-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent-primary);
          margin-bottom: 12px;
          display: block;
        }
        .invitation-title {
          font-size: 36px;
          margin-bottom: 28px;
        }
        .home-footer {
          border-top: 1px solid var(--border-subtle);
          padding: 40px 24px;
          background: #101210;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .footer-desc {
          font-size: 12px;
          color: var(--text-muted);
        }
        .footer-right {
          font-size: 12px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
