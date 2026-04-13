import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type, duration });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const getToastStyles = () => {
    switch (toast?.type) {
      case "success":
        return "bg-green-50 border-green-500 text-green-800";
      case "error":
        return "bg-red-50 border-red-500 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-500 text-yellow-800";
      default:
        return "bg-blue-50 border-blue-500 text-blue-800";
    }
  };

  const getToastIcon = () => {
    switch (toast?.type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm animate-slide-up">
          <div className={`flex items-center gap-3 p-3 rounded-lg shadow-lg border-l-4 ${getToastStyles()}`}>
            <span className="text-lg">{getToastIcon()}</span>
            <p className="text-sm flex-1">{toast.message}</p>
            <button onClick={() => setToast(null)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};