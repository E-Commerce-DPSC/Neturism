"use client";

import * as React from "react";
import Link from "next/link";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastData {
  id: string;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

type ToastType = "default" | "success" | "error" | "info";

interface ToastContextType {
  showToast: (
    toastOrTitle: Omit<ToastData, "id"> | string,
    typeOrDesc?: ToastType | string
  ) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const showToast = React.useCallback(
    (
      toastOrTitle: Omit<ToastData, "id"> | string,
      _typeOrDesc?: ToastType | string
    ) => {
      const id = Math.random().toString(36).substring(2, 9);
      const title =
        typeof toastOrTitle === "string" ? toastOrTitle : toastOrTitle.title;
      const description =
        typeof toastOrTitle === "string" ? undefined : toastOrTitle.description;
      const actionText =
        typeof toastOrTitle === "string" ? undefined : toastOrTitle.actionText;
      const actionHref =
        typeof toastOrTitle === "string" ? undefined : toastOrTitle.actionHref;

      setToasts((prev) => [...prev, { id, title, description, actionText, actionHref }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#111111] text-white border-2 border-white p-4 shadow-brutal-sm flex flex-col gap-2 transition-all animate-in slide-in-from-bottom-3 duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-white text-black font-bold flex items-center justify-center">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="font-label text-xs uppercase font-bold tracking-wider">
                  {toast.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-[#888888] hover:text-white p-0.5"
                aria-label="Tutup"
              >
                <X size={14} />
              </button>
            </div>

            {toast.description && (
              <p className="text-xs text-[#AAAAAA] font-body pl-6">
                {toast.description}
              </p>
            )}

            {toast.actionText && toast.actionHref && (
              <div className="pt-2 border-t border-[#222222] flex justify-end">
                <Link
                  href={toast.actionHref}
                  onClick={() => removeToast(toast.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-label uppercase font-bold tracking-wider hover:bg-black hover:text-white border border-white transition-colors"
                >
                  {toast.actionText} →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast harus digunakan di dalam ToastProvider");
  }
  return context;
}
