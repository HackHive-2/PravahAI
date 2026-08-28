import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-sm shadow-xl border flex items-start gap-3 bg-white ${
            t.type === 'success'
              ? 'border-[#2D5A43] text-[#2D5A43]'
              : t.type === 'warning'
              ? 'border-[#C97A2C] text-[#C97A2C]'
              : 'border-[#A67C52] text-[#A67C52]'
          }`}
        >
          {t.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#2D5A43] shrink-0 mt-0.5" />
          ) : t.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-[#C97A2C] shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-[#A67C52] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-xs">
            <div className="font-serif font-bold text-[#1A1A1A]">{t.title}</div>
            <div className="text-[#1A1A1A]/70 text-[11px] mt-0.5 leading-relaxed font-sans">{t.message}</div>
          </div>

          <button
            onClick={() => onDismiss(t.id)}
            className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
