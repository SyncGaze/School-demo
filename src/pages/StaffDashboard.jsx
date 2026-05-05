import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  FaChalkboardTeacher, FaUsers, FaClipboardList, 
  FaUpload, FaBullhorn, FaCalendarAlt, FaSignOutAlt,
  FaCheckCircle, FaTimesCircle, FaSave, FaTrash
} from "react-icons/fa";
import toast from "react-hot-toast";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { themeColor, schoolData } = useApp();
  const [teacherData, setTeacherData] = useState(null);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("attendance");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [examType, setExamType] = useState("Midterm");
  const [marksData, setMarksData] = useState({});
  const [classAnnouncement, setClassAnnouncement] = useState("");
  const [classAnnouncements, setClassAnnouncements] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || JSON.parse(role) !== "faculty") {
      navigate("/role-selection");
      return;
    }

    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setTeacherData(profile);
    }

    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      const allStudents = JSON.parse(storedStudents);
      const teacherClass = teacherData?.assignedClass || "10A";
      const filteredStudents = allStudents.filter(s => s.class === teacherClass);
      setStudents(filteredStudents);
    }

    const storedClassAnnouncements = localStorage.getItem("classAnnouncements");
    if (storedClassAnnouncements) {
      setClassAnnouncements(JSON.parse(storedClassAnnouncements));
    }
  }, [navigate, teacherData?.assignedClass]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData({ ...attendanceData, [studentId]: status });
  };

  const submitAttendance = () => {
    if (Object.keys(attendanceData).length === 0) {
      toast.error("Please mark attendance for at least one student");
      return;
    }

    const savedAttendance = localStorage.getItem("attendance");
    let allAttendance = savedAttendance ? JSON.parse(savedAttendance) : [];

    Object.entries(attendanceData).forEach(([studentId, status]) => {
      const existingIndex = allAttendance.findIndex(
        a => a.studentId === studentId && a.date === selectedDate
      );
      
      const attendanceRecord = {
        studentId,
        date: selectedDate,
        status,
        class: teacherData?.assignedClass,
        subject: teacherData?.subject,
        timestamp: new Date().toISOString()
      };

      if (existingIndex !== -1) {
        allAttendance[existingIndex] = attendanceRecord;
      } else {
        allAttendance.push(attendanceRecord);
      }
    });

    localStorage.setItem("attendance", JSON.stringify(allAttendance));
    toast.success(`Attendance marked for ${Object.keys(attendanceData).length} students!`);
    setAttendanceData({});
  };

  const handleMarksChange = (studentId, marks) => {
    setMarksData({ ...marksData, [studentId]: marks });
  };

  const submitMarks = () => {
    if (Object.keys(marksData).length === 0) {
      toast.error("Please enter marks for at least one student");
      return;
    }

    const savedMarks = localStorage.getItem("marks");
    let allMarks = savedMarks ? JSON.parse(savedMarks) : [];

    Object.entries(marksData).forEach(([studentId, marksObtained]) => {
      const marksRecord = {
        id: Date.now().toString(),
        studentId,
        subject: teacherData?.subject,
        marksObtained: parseInt(marksObtained),
        totalMarks: 100,
        examType,
        date: new Date().toISOString().split('T')[0],
        class: teacherData?.assignedClass,
        timestamp: new Date().toISOString()
      };
      allMarks.push(marksRecord);
    });

    localStorage.setItem("marks", JSON.stringify(allMarks));
    toast.success(`Marks saved for ${Object.keys(marksData).length} students!`);
    setMarksData({});
  };

  const postClassAnnouncement = () => {
    if (!classAnnouncement.trim()) {
      toast.error("Please enter an announcement");
      return;
    }

    const newAnnouncement = {
      id: Date.now().toString(),
      title: `📢 Class ${teacherData?.assignedClass} Announcement`,
      content: classAnnouncement,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      postedBy: teacherData?.name || "Teacher",
      class: teacherData?.assignedClass
    };

    const updatedAnnouncements = [newAnnouncement, ...classAnnouncements];
    setClassAnnouncements(updatedAnnouncements);
    localStorage.setItem("classAnnouncements", JSON.stringify(updatedAnnouncements));
    
    toast.success("Announcement posted to class!");
    setClassAnnouncement("");
  };

  const deleteClassAnnouncement = (id) => {
    if (window.confirm("Delete this announcement?")) {
      const updated = classAnnouncements.filter(a => a.id !== id);
      setClassAnnouncements(updated);
      localStorage.setItem("classAnnouncements", JSON.stringify(updated));
      toast.success("Announcement deleted!");
    }
  };

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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-5 mb-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <FaChalkboardTeacher className="text-2xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Welcome, {teacherData?.name?.split(' ')[0] || "Teacher"}!</h1>
            <p className="text-sm opacity-90">{teacherData?.subject} | Class {teacherData?.assignedClass}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20">
          <div className="flex items-center gap-2">
            <FaUsers className="text-sm" />
            <span className="text-sm">{students.length} Students</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-sm" />
            <span className="text-sm">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-xl">
        {[
          { id: "attendance", label: "Attendance", icon: FaClipboardList },
          { id: "marks", label: "Marks", icon: FaUpload },
          { id: "announcements", label: "Announcements", icon: FaBullhorn }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.id 
                ? "bg-white text-purple-600 shadow-sm" 
                : "text-gray-500"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Attendance Tab */}
      {activeTab === "attendance" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">📋 Take Attendance</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm"
              />
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {students.map(student => (
                <div key={student.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-500">Roll: {student.rollNo}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAttendanceChange(student.id, "Present")}
                      className={`px-4 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                        attendanceData[student.id] === "Present" 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FaCheckCircle size={12} /> Present
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, "Absent")}
                      className={`px-4 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                        attendanceData[student.id] === "Absent" 
                          ? "bg-red-500 text-white" 
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FaTimesCircle size={12} /> Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={submitAttendance}
              className="w-full mt-4 bg-purple-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <FaSave size={14} /> Save Attendance
            </button>
          </div>
        </div>
      )}

      {/* Marks Tab */}
      {activeTab === "marks" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Exam Type</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full p-2 border rounded-lg text-sm"
              >
                <option>Midterm</option>
                <option>Final</option>
                <option>Quiz</option>
                <option>Assignment</option>
              </select>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {students.map(student => (
                <div key={student.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-500">Roll: {student.rollNo}</p>
                  </div>
                  <input
                    type="number"
                    placeholder="Marks"
                    value={marksData[student.id] || ""}
                    onChange={(e) => handleMarksChange(student.id, e.target.value)}
                    className="w-20 p-2 border rounded-lg text-sm text-center"
                    min="0"
                    max="100"
                  />
                </div>
              ))}
            </div>
            
            <button
              onClick={submitMarks}
              className="w-full mt-4 bg-purple-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <FaSave size={14} /> Save Marks
            </button>
          </div>
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === "announcements" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">📢 Post Class Announcement</h3>
            <textarea
              placeholder="Write an announcement for your students..."
              value={classAnnouncement}
              onChange={(e) => setClassAnnouncement(e.target.value)}
              rows="3"
              className="w-full p-3 border rounded-lg text-sm"
            />
            <button
              onClick={postClassAnnouncement}
              className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg font-medium"
            >
              Post Announcement
            </button>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">📋 Recent Class Announcements</h3>
            {classAnnouncements.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No announcements yet</p>
            ) : (
              <div className="space-y-3">
                {classAnnouncements.slice(0, 5).map(ann => (
                  <div key={ann.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{ann.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{ann.content}</p>
                        <p className="text-xs text-gray-400 mt-1">{ann.date}</p>
                      </div>
                      <button
                        onClick={() => deleteClassAnnouncement(ann.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mt-5">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaCalendarAlt className="text-purple-500" /> Today's Schedule
        </h3>
        <div className="space-y-2">
          {schedule.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b last:border-0">
              <span className="text-xs text-gray-500">{item.time}</span>
              <span className="text-sm font-medium text-gray-700">{item.subject}</span>
              <span className="text-xs text-gray-400">{item.class}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-5 py-3 rounded-lg font-medium text-red-600 border border-red-200 transition hover:bg-red-50 flex items-center justify-center gap-2"
      >
        <FaSignOutAlt size={14} /> Logout
      </button>
    </div>
  );
};

export default StaffDashboard;