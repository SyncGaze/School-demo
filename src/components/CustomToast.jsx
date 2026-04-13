import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

const CustomToast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <FaCheckCircle className="text-green-500" size={18} />,
    error: <FaTimesCircle className="text-red-500" size={18} />,
    info: <FaInfoCircle className="text-blue-500" size={18} />,
    warning: <FaExclamationTriangle className="text-yellow-500" size={18} />
  };

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200"
  };

  const textColors = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
    warning: "text-yellow-800"
  };

  return (
    <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm rounded-lg shadow-lg border ${bgColors[type]} p-3 animate-slide-up`}>
      <div className="flex items-center gap-3">
        {icons[type]}
        <p className={`text-sm flex-1 ${textColors[type]}`}>{message}</p>
        <button onClick={() => { setIsVisible(false); onClose(); }} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>
    </div>
  );
};

export default CustomToast;