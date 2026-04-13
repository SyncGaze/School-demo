import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  FaSignOutAlt, FaUsers, FaChalkboardTeacher, FaBullhorn, 
  FaSchool, FaChartLine, FaClock, FaBookOpen, FaCalendarAlt,
  FaMoneyBillWave, FaUserGraduate, FaUserTie
} from "react-icons/fa";
import toast from "react-hot-toast";

const ManagementDashboard = () => {
  const navigate = useNavigate();
  const { schoolData, userProfile, logout, themeColor } = useApp();
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || JSON.parse(role) !== "admin") {
      navigate("/role-selection");
    }

    const storedStudents = localStorage.getItem("students");
    const storedStaff = localStorage.getItem("staff");
    if (storedStudents) setStudents(JSON.parse(storedStudents));
    if (storedStaff) setStaff(JSON.parse(storedStaff));
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/role-selection");
  };

  return (
    <div className="p-4 pb-20">
      {/* Header with Theme Color */}
      <div className="rounded-2xl p-5 mb-5 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <FaSchool className="text-2xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Welcome, {userProfile?.name || "Admin"}!</h1>
            <p className="text-sm opacity-90">{schoolData?.schoolName || "School Management"}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20">
          <div className="flex items-center gap-2">
            <FaUsers className="text-sm" />
            <span className="text-sm">{students.length} Students</span>
          </div>
          <div className="flex items-center gap-2">
            <FaChalkboardTeacher className="text-sm" />
            <span className="text-sm">{staff.length} Staff</span>
          </div>
        </div>
      </div>

      {/* Stats Cards with Theme Color */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div 
          onClick={() => navigate("/admin/students")}
          className="rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition"
          style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
        >
          <FaUserGraduate className="text-xl mb-2" />
          <p className="text-2xl font-bold">{students.length}</p>
          <p className="text-xs opacity-90">Total Students</p>
          <p className="text-xs mt-2 opacity-75">Manage →</p>
        </div>
        <div 
          onClick={() => navigate("/admin/staff")}
          className="rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition"
          style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
        >
          <FaUserTie className="text-xl mb-2" />
          <p className="text-2xl font-bold">{staff.length}</p>
          <p className="text-xs opacity-90">Total Staff</p>
          <p className="text-xs mt-2 opacity-75">Manage →</p>
        </div>
      </div>

      {/* Management Sections */}
      <div className="space-y-3 mb-5">
        {/* Student Management */}
        <div 
          onClick={() => navigate("/admin/students")}
          className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition"
          style={{ borderLeftColor: themeColor, borderLeftWidth: "4px" }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">👥 Student Management</h3>
              <p className="text-xs text-gray-500 mt-1">Add, edit, or remove students</p>
            </div>
            <button className="text-sm font-medium" style={{ color: themeColor }}>Manage →</button>
          </div>
        </div>
        
        {/* Staff Management */}
        <div 
          onClick={() => navigate("/admin/staff")}
          className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition"
          style={{ borderLeftColor: themeColor, borderLeftWidth: "4px" }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">👨‍🏫 Staff Management</h3>
              <p className="text-xs text-gray-500 mt-1">Manage teachers and staff</p>
            </div>
            <button className="text-sm font-medium" style={{ color: themeColor }}>Manage →</button>
          </div>
        </div>
        
        {/* Time Table Management */}
        <div 
          onClick={() => navigate("/admin/timetable")}
          className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition"
          style={{ borderLeftColor: themeColor, borderLeftWidth: "4px" }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">🗓️ Time Table Management</h3>
              <p className="text-xs text-gray-500 mt-1">Create and manage class schedules</p>
            </div>
            <button className="text-sm font-medium" style={{ color: themeColor }}>Manage →</button>
          </div>
        </div>
        
        {/* Announcements */}
        <div 
          onClick={() => navigate("/admin/announcements")}
          className="bg-white rounded-xl p-4 shadow-sm border cursor-pointer hover:shadow-md transition"
          style={{ borderLeftColor: themeColor, borderLeftWidth: "4px" }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">📢 Announcements</h3>
              <p className="text-xs text-gray-500 mt-1">Post updates for everyone</p>
            </div>
            <button className="text-sm font-medium" style={{ color: themeColor }}>Post →</button>
          </div>
        </div>
      </div>

      {/* School Info Card */}
      <div className="bg-gray-50 rounded-xl p-4 mb-5">
        <h3 className="font-semibold text-gray-800 text-sm mb-2">School Information</h3>
        <div className="space-y-1 text-xs">
          <p className="text-gray-600">📍 {schoolData?.address || "Address not set"}, {schoolData?.city || ""}</p>
          <p className="text-gray-600">📞 {schoolData?.contact || schoolData?.phone || "Phone not set"}</p>
          <p className="text-gray-600">✉️ {schoolData?.email || "Email not set"}</p>
          <p className="text-gray-600">📅 Established: {schoolData?.establishedYear || "Not set"}</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-lg font-medium text-red-600 border border-red-200 transition hover:bg-red-50 flex items-center justify-center gap-2"
      >
        <FaSignOutAlt size={14} /> Logout
      </button>
    </div>
  );
};

export default ManagementDashboard;