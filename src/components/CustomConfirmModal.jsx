import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const CustomConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[300px]">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-4 py-3 flex justify-between items-center border-b bg-red-50">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="text-red-500" size={18} />
              <h2 className="text-md font-bold text-red-600">
                {title || "Confirm Delete"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={16} />
            </button>
          </div>

          <div className="p-4">
            <p className="text-sm text-gray-600">
              {message || "Are you sure you want to delete this item?"}
            </p>
          </div>

          <div className="px-4 py-3 border-t flex gap-2">
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-sm active:bg-red-800 flex items-center justify-center gap-1"
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 py-2 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-gray-800 text-sm active:bg-gray-100 flex items-center justify-center gap-1"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomConfirmModal;
