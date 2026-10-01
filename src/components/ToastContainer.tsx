import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#18181B] text-white p-3.5 shadow-2xl flex items-start gap-3 text-xs animate-in slide-in-from-bottom-3 duration-200 border-l-2 border-white"
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {!isSuccess && !isError && <Info className="w-4 h-4 text-stone-300 shrink-0 mt-0.5" />}

            <div className="flex-1 font-medium leading-relaxed">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white p-0.5 ml-1"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
