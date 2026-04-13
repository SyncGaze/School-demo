import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState(null);
  const [themeColor, setThemeColor] = useState("#6366f1");

  useEffect(() => {
    // Load data from localStorage
    const data = localStorage.getItem("schoolData");
    const color = localStorage.getItem("themeColor");
    const userRole = localStorage.getItem("userRole");
    
    // Check if user is logged in
    if (!userRole) {
      navigate("/");
      return;
    }
    
    if (data) {
      setSchoolData(JSON.parse(data));
    }
    if (color) {
      setThemeColor(color);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!schoolData) {
    return (
      <div className="flex items-center justify-center h-full p-5">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-5 pb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold shadow-md"
          style={{ backgroundColor: themeColor }}
        >
          {schoolData.schoolName?.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-xl font-bold text-gray-800">{schoolData.schoolName}</h1>
        <p className="text-xs text-gray-500 mt-1">{schoolData.city || "Location not set"}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-gray-800">{schoolData.students}</p>
          <p className="text-xs text-gray-500 mt-1">Total Students</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-2xl font-bold text-gray-800">{schoolData.teachers}</p>
          <p className="text-xs text-gray-500 mt-1">Total Staff</p>
        </div>
      </div>

      {/* School Information Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
        <h3 className="font-semibold text-gray-800 mb-3">School Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Address:</span>
            <span className="text-gray-700 text-right">{schoolData.address || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">City:</span>
            <span className="text-gray-700">{schoolData.city || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phone:</span>
            <span className="text-gray-700">{schoolData.phone || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email:</span>
            <span className="text-gray-700">{schoolData.email || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Established:</span>
            <span className="text-gray-700">{schoolData.establishedYear || "Not provided"}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button 
          className="w-full py-3 rounded-lg font-medium text-white transition hover:opacity-90"
          style={{ backgroundColor: themeColor }}
        >
          📊 View Reports
        </button>
        <button 
          className="w-full py-3 rounded-lg font-medium border text-gray-700 transition hover:bg-gray-50"
          style={{ borderColor: themeColor }}
        >
          👥 Manage Students
        </button>
        <button 
          className="w-full py-3 rounded-lg font-medium border text-gray-700 transition hover:bg-gray-50"
          style={{ borderColor: themeColor }}
        >
          👨‍🏫 Manage Staff
        </button>
        <button 
          onClick={handleLogout}
          className="w-full py-3 rounded-lg font-medium text-red-600 border border-red-200 transition hover:bg-red-50"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;