import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast-notification">
      <CheckCircle2 size={16} color="#4ade80" />
      <span>{message}</span>
      <style>{`
        .toast-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #192019;
          border: 1px solid rgba(34, 197, 94, 0.4);
          color: #f3f4f6;
          padding: 12px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
          z-index: 9999;
          animation: toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
