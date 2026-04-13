import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  FaChalkboardTeacher, FaUsers, FaClipboardList, 
  FaUpload, FaBullhorn, FaCalendarAlt, FaSignOutAlt,
  FaChartLine, FaClock, FaUserTie
} from "react-icons/fa";
import toast from "react-hot-toast";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { themeColor, schoolData } = useApp();
  const [teacherData, setTeacherData] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || JSON.parse(role) !== "faculty") {
      navigate("/role-selection");
      return;
    }

    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      setTeacherData(JSON.parse(userProfile));
    }

    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      const allStudents = JSON.parse(storedStudents);
      const teacherClass = teacherData?.assignedClass || "10A";
      setStudents(allStudents.filter(s => s.class === teacherClass));
    }
  }, [navigate, teacherData?.assignedClass]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");
    toast.success("Logged out successfully!");
    navigate("/role-selection");
  };

  const schedule = [
    { time: "9:00 - 10:00 AM", subject: teacherData?.subject || "Mathematics", class: `Class ${teacherData?.assignedClass || "10A"}` },
    { time: "10:00 - 11:00 AM", subject: "Physics", class: "Class 10B" },
    { time: "11:00 - 12:00 PM", subject: "Doubt Clearing", class: "Class 10A & 10B" },
    { time: "12:00 - 1:00 PM", subject: "Lunch Break", class: "-" },
    { time: "1:00 - 2:00 PM", subject: "Chemistry", class: "Class 10C" }
  ];

  return (
    <div className="p-4 pb-20">
      {/* Header with Theme Color */}
      <div className="rounded-2xl p-5 mb-5 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><FaChalkboardTeacher className="text-2xl" /></div>
          <div><h1 className="text-xl font-bold">Welcome, {teacherData?.name?.split(' ')[0] || "Teacher"}!</h1><p className="text-sm opacity-90">{teacherData?.subject} Teacher | Class {teacherData?.assignedClass}</p></div>
        </div>
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20">
          <div className="flex items-center gap-2"><FaUsers className="text-sm" /><span className="text-sm">{students.length} Students</span></div>
          <div className="flex items-center gap-2"><FaCalendarAlt className="text-sm" /><span className="text-sm">{new Date().toLocaleDateString()}</span></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white rounded-xl p-4 shadow-sm border text-center" style={{ borderColor: `${themeColor}30` }}>
          <FaChartLine className="text-xl mx-auto mb-2" style={{ color: themeColor }} />
          <p className="text-2xl font-bold text-gray-800">92%</p><p className="text-xs text-gray-500">Class Average</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border text-center" style={{ borderColor: `${themeColor}30` }}>
          <FaClock className="text-xl mx-auto mb-2" style={{ color: themeColor }} />
          <p className="text-2xl font-bold text-gray-800">5</p><p className="text-xs text-gray-500">Today's Classes</p>
        </div>
      </div>

      {/* Action Buttons with Theme Color */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button onClick={() => navigate("/teacher/attendance")} className="text-white rounded-xl p-4 text-center hover:opacity-90 transition" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          <FaClipboardList className="text-2xl mx-auto mb-2" /><p className="text-sm font-medium">Mark Attendance</p>
        </button>
        <button onClick={() => navigate("/teacher/marks")} className="text-white rounded-xl p-4 text-center hover:opacity-90 transition" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          <FaUpload className="text-2xl mx-auto mb-2" /><p className="text-sm font-medium">Upload Marks</p>
        </button>
        <button onClick={() => navigate("/teacher/announcements")} className="text-white rounded-xl p-4 text-center hover:opacity-90 transition" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          <FaBullhorn className="text-2xl mx-auto mb-2" /><p className="text-sm font-medium">Announcements</p>
        </button>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl p-5 shadow-sm border mb-5" style={{ borderColor: `${themeColor}30` }}>
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaCalendarAlt style={{ color: themeColor }} /> Today's Schedule</h3>
        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div key={index} className={`flex items-center p-3 rounded-lg ${item.subject === "Lunch Break" ? "bg-amber-50" : "bg-gray-50"}`}>
              <div className="w-24"><span className="text-xs font-medium text-gray-600">{item.time}</span></div>
              <div className="flex-1"><p className="text-sm font-medium text-gray-800">{item.subject}</p></div>
              <div><span className="text-xs text-gray-500">{item.class}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="w-full py-3 rounded-lg font-medium text-red-600 border border-red-200 transition hover:bg-red-50 flex items-center justify-center gap-2">
        <FaSignOutAlt size={14} /> Logout
      </button>
    </div>
  );
};

export default TeacherDashboard;