import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaSave, FaUsers } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const TeacherAttendance = () => {
  const navigate = useNavigate();
  const { themeColor } = useApp();
  const [teacherData, setTeacherData] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || JSON.parse(role) !== "faculty") { navigate("/role-selection"); return; }
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) setTeacherData(JSON.parse(userProfile));
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      const allStudents = JSON.parse(storedStudents);
      const teacherClass = teacherData?.assignedClass || "10A";
      setStudents(allStudents.filter(s => s.class === teacherClass));
    }
  }, [navigate, teacherData?.assignedClass]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData({ ...attendanceData, [studentId]: status });
  };

  const submitAttendance = () => {
    if (Object.keys(attendanceData).length === 0) { toast.error("Please mark attendance"); return; }
    const savedAttendance = localStorage.getItem("attendance");
    let allAttendance = savedAttendance ? JSON.parse(savedAttendance) : [];
    Object.entries(attendanceData).forEach(([studentId, status]) => {
      const existingIndex = allAttendance.findIndex(a => a.studentId === studentId && a.date === selectedDate);
      const attendanceRecord = { studentId, date: selectedDate, status, class: teacherData?.assignedClass, subject: teacherData?.subject };
      existingIndex !== -1 ? allAttendance[existingIndex] = attendanceRecord : allAttendance.push(attendanceRecord);
    });
    localStorage.setItem("attendance", JSON.stringify(allAttendance));
    toast.success(`Attendance marked for ${Object.keys(attendanceData).length} students!`);
    setAttendanceData({});
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate("/faculty/dashboard")} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><FaArrowLeft className="text-gray-600" /></button>
        <h1 className="text-xl font-bold text-gray-800">Mark Attendance</h1>
      </div>

      <div className="rounded-xl p-4 mb-5 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
        <div className="flex justify-between items-center">
          <div><p className="text-sm opacity-90">Class</p><p className="text-2xl font-bold">{teacherData?.assignedClass || "10A"}</p><p className="text-xs opacity-80">{teacherData?.subject || "Mathematics"}</p></div>
          <div className="text-right"><p className="text-sm opacity-90">Total Students</p><p className="text-2xl font-bold">{students.length}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border mb-4" style={{ borderColor: `${themeColor}30` }}>
        <div className="flex justify-between items-center"><label className="font-medium text-gray-700">Select Date</label><input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-3 py-2 border rounded-lg text-sm" /></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: `${themeColor}30` }}>
        <div className="bg-gray-50 px-4 py-3 border-b"><h3 className="font-semibold text-gray-800 flex items-center gap-2"><FaUsers style={{ color: themeColor }} /> Student List</h3></div>
        <div className="divide-y">
          {students.map(student => (
            <div key={student.id} className="p-4 flex justify-between items-center">
              <div><p className="font-medium text-gray-800">{student.name}</p><p className="text-xs text-gray-500">Roll: {student.rollNo}</p></div>
              <div className="flex gap-2">
                <button onClick={() => handleAttendanceChange(student.id, "Present")} className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1 ${attendanceData[student.id] === "Present" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"}`}><FaCheckCircle size={12} /> Present</button>
                <button onClick={() => handleAttendanceChange(student.id, "Absent")} className={`px-4 py-2 rounded-lg text-sm flex items-center gap-1 ${attendanceData[student.id] === "Absent" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"}`}><FaTimesCircle size={12} /> Absent</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={submitAttendance} disabled={Object.keys(attendanceData).length === 0} className={`w-full mt-5 py-3 rounded-lg font-medium flex items-center justify-center gap-2 text-white ${Object.keys(attendanceData).length === 0 ? "bg-gray-300 cursor-not-allowed" : ""}`} style={Object.keys(attendanceData).length === 0 ? {} : { backgroundColor: themeColor }}>
        <FaSave size={14} /> Save Attendance
      </button>
    </div>
  );
};

export default TeacherAttendance;