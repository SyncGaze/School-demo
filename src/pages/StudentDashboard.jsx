import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  FaUser, FaBell, FaSignOutAlt, FaEye, FaExclamationTriangle, 
  FaCalendarCheck, FaMoneyBillWave, FaBookOpen, FaClock,
  FaClipboardList, FaStar, FaBook, FaRegCalendar, 
  FaRegFileAlt, FaChalkboardTeacher, FaTimes, FaHome,
  FaUserGraduate, FaChartLine, FaBars, FaUserCircle,
  FaCalendarAlt, FaFileInvoice, FaChalkboard, FaThLarge,
  FaUtensils
} from "react-icons/fa";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { themeColor } = useApp();
  const [studentData, setStudentData] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState("home");

  // Demo Student Data
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || JSON.parse(role) !== "student") {
      navigate("/role-selection");
      return;
    }

    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      setStudentData(JSON.parse(userProfile));
    } else {
      setStudentData({
        id: "s1", name: "Riya Singh", rollNo: "12307983", 
        class: "B.Tech Computer Science Engineering", 
        email: "riya.singh@school.edu",
        semester: "6th Semester",
        cgpa: "8.7"
      });
    }

    // Demo Attendance Data (Overall)
    const dummyAttendance = [
      { id: "1", studentId: "s1", date: "2024-04-01", status: "Present" },
      { id: "2", studentId: "s1", date: "2024-04-02", status: "Present" },
      { id: "3", studentId: "s1", date: "2024-04-03", status: "Absent" },
      { id: "4", studentId: "s1", date: "2024-04-04", status: "Present" },
      { id: "5", studentId: "s1", date: "2024-04-05", status: "Present" },
      { id: "6", studentId: "s1", date: "2024-04-06", status: "Present" },
      { id: "7", studentId: "s1", date: "2024-04-07", status: "Absent" },
      { id: "8", studentId: "s1", date: "2024-04-08", status: "Present" },
      { id: "9", studentId: "s1", date: "2024-04-09", status: "Present" },
      { id: "10", studentId: "s1", date: "2024-04-10", status: "Present" }
    ];
    setAttendance(dummyAttendance);

    // Demo Marks Data
    const dummyMarks = [
      { id: "m1", studentId: "s1", subject: "Mathematics", marksObtained: 85, totalMarks: 100, examType: "Midterm" },
      { id: "m2", studentId: "s1", subject: "Physics", marksObtained: 78, totalMarks: 100, examType: "Midterm" },
      { id: "m3", studentId: "s1", subject: "Computer Science", marksObtained: 92, totalMarks: 100, examType: "Midterm" },
      { id: "m4", studentId: "s1", subject: "Chemistry", marksObtained: 88, totalMarks: 100, examType: "Midterm" },
      { id: "m5", studentId: "s1", subject: "English", marksObtained: 90, totalMarks: 100, examType: "Midterm" }
    ];
    setMarks(dummyMarks);

    // Demo Announcements
    const dummyAnnouncements = [
      { id: "1", title: "📢 Parent-Teacher Meeting", content: "Annual parent-teacher meeting on April 25th at 10 AM in the auditorium.", date: "2024-04-25" },
      { id: "2", title: "🔬 Science Fair 2024", content: "Registration open until April 30th. Submit your innovative projects.", date: "2024-04-30" },
      { id: "3", title: "🏆 Sports Day", content: "Annual sports day scheduled for May 5th. Register by April 28th.", date: "2024-05-05" },
      { id: "4", title: "📚 Library Week", content: "Celebrate Library Week from April 20-27. Special events planned.", date: "2024-04-20" },
      { id: "5", title: "💻 Hackathon 2024", content: "24-hour hackathon on May 10th. Form your teams now!", date: "2024-05-10" }
    ];
    setAnnouncements(dummyAnnouncements);
  }, [navigate, studentData?.id]);

  const attendancePercentage = attendance.length > 0
    ? Math.round((attendance.filter(a => a.status === "Present").length / attendance.length) * 100)
    : 85;

  const averageMarks = marks.length > 0
    ? Math.round(marks.reduce((sum, m) => sum + (m.marksObtained / m.totalMarks * 100), 0) / marks.length)
    : 86;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");
    toast.success("Logged out successfully!");
    navigate("/role-selection");
  };

  // Full Week Timetable (Monday to Friday with Lunch Break)
  const fullWeekTimetable = {
    Monday: [
      { time: "9:00 - 10:00 AM", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 201" },
      { time: "10:00 - 11:00 AM", subject: "Physics", teacher: "Prof. Michael Brown", room: "Lab 3" },
      { time: "11:00 - 12:00 PM", subject: "Computer Science", teacher: "Ms. Lisa Wong", room: "Lab 1" },
      { time: "12:00 - 1:00 PM", subject: "🍽️ Lunch Break", teacher: "-", room: "Cafeteria" },
      { time: "1:00 - 2:00 PM", subject: "English", teacher: "Ms. Emily Davis", room: "Room 205" },
      { time: "2:00 - 3:00 PM", subject: "Chemistry", teacher: "Dr. Robert Chen", room: "Lab 2" }
    ],
    Tuesday: [
      { time: "9:00 - 10:00 AM", subject: "Physics", teacher: "Prof. Michael Brown", room: "Lab 3" },
      { time: "10:00 - 11:00 AM", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 201" },
      { time: "11:00 - 12:00 PM", subject: "English", teacher: "Ms. Emily Davis", room: "Room 205" },
      { time: "12:00 - 1:00 PM", subject: "🍽️ Lunch Break", teacher: "-", room: "Cafeteria" },
      { time: "1:00 - 2:00 PM", subject: "Computer Science", teacher: "Ms. Lisa Wong", room: "Lab 1" },
      { time: "2:00 - 3:00 PM", subject: "Physical Education", teacher: "Mr. David Wilson", room: "Ground" }
    ],
    Wednesday: [
      { time: "9:00 - 10:00 AM", subject: "Computer Science", teacher: "Ms. Lisa Wong", room: "Lab 1" },
      { time: "10:00 - 11:00 AM", subject: "Chemistry", teacher: "Dr. Robert Chen", room: "Lab 2" },
      { time: "11:00 - 12:00 PM", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 201" },
      { time: "12:00 - 1:00 PM", subject: "🍽️ Lunch Break", teacher: "-", room: "Cafeteria" },
      { time: "1:00 - 2:00 PM", subject: "Physics", teacher: "Prof. Michael Brown", room: "Lab 3" },
      { time: "2:00 - 3:00 PM", subject: "English", teacher: "Ms. Emily Davis", room: "Room 205" }
    ],
    Thursday: [
      { time: "9:00 - 10:00 AM", subject: "English", teacher: "Ms. Emily Davis", room: "Room 205" },
      { time: "10:00 - 11:00 AM", subject: "Physics", teacher: "Prof. Michael Brown", room: "Lab 3" },
      { time: "11:00 - 12:00 PM", subject: "Chemistry", teacher: "Dr. Robert Chen", room: "Lab 2" },
      { time: "12:00 - 1:00 PM", subject: "🍽️ Lunch Break", teacher: "-", room: "Cafeteria" },
      { time: "1:00 - 2:00 PM", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 201" },
      { time: "2:00 - 3:00 PM", subject: "Computer Science", teacher: "Ms. Lisa Wong", room: "Lab 1" }
    ],
    Friday: [
      { time: "9:00 - 10:00 AM", subject: "Chemistry", teacher: "Dr. Robert Chen", room: "Lab 2" },
      { time: "10:00 - 11:00 AM", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 201" },
      { time: "11:00 - 12:00 PM", subject: "Physics", teacher: "Prof. Michael Brown", room: "Lab 3" },
      { time: "12:00 - 1:00 PM", subject: "🍽️ Lunch Break", teacher: "-", room: "Cafeteria" },
      { time: "1:00 - 2:00 PM", subject: "English", teacher: "Ms. Emily Davis", room: "Room 205" },
      { time: "2:00 - 3:00 PM", subject: "Computer Science", teacher: "Ms. Lisa Wong", room: "Lab 1" }
    ]
  };

  // Today's Schedule (Wednesday)
  const todaySchedule = fullWeekTimetable.Wednesday;

  // Demo Fee Details
  const feeDetails = {
    totalFee: 75000,
    paid: 55000,
    pending: 20000,
    lastPayment: "2024-03-15",
    nextDue: "2024-04-15",
    transactions: [
      { date: "2024-01-10", amount: 25000, type: "Tuition Fee" },
      { date: "2024-02-15", amount: 15000, type: "Library Fee" },
      { date: "2024-03-15", amount: 15000, type: "Tuition Fee" }
    ]
  };

  // Demo Library Books
  const libraryBooks = [
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen", issueDate: "2024-03-01", dueDate: "2024-03-30", status: "Issued" },
    { title: "Clean Code", author: "Robert C. Martin", issueDate: "2024-03-10", dueDate: "2024-04-10", status: "Issued" },
    { title: "The Pragmatic Programmer", author: "David Thomas", issueDate: "2024-03-20", dueDate: "2024-04-20", status: "Issued" }
  ];

  // Demo Exam Schedule
  const examSchedule = [
    { subject: "Mathematics", date: "2024-04-28", time: "9:00 AM - 12:00 PM", room: "Hall A" },
    { subject: "Physics", date: "2024-04-29", time: "9:00 AM - 12:00 PM", room: "Hall B" },
    { subject: "Computer Science", date: "2024-04-30", time: "9:00 AM - 12:00 PM", room: "Lab 1" },
    { subject: "Chemistry", date: "2024-05-01", time: "9:00 AM - 12:00 PM", room: "Hall A" },
    { subject: "English", date: "2024-05-02", time: "9:00 AM - 12:00 PM", room: "Hall C" }
  ];

  // Demo Assignments
  const assignments = [
    { subject: "Mathematics", title: "Calculus Assignment", dueDate: "2024-04-25", status: "Pending" },
    { subject: "Computer Science", title: "Web Development Project", dueDate: "2024-04-30", status: "In Progress" },
    { subject: "Physics", title: "Laws of Motion Lab Report", dueDate: "2024-04-22", status: "Submitted" }
  ];

  // Demo Complaint Types
  const complaintTypes = ["Academic", "Infrastructure", "Faculty", "Library", "Canteen", "Other"];

  const handleMenuItemClick = (id) => {
    setIsDrawerOpen(false);
    
    switch(id) {
      case "profile":
        setModalTitle("👤 Profile");
        setModalContent(
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
              <FaUserGraduate className="text-3xl text-indigo-500" />
            </div>
            <p className="font-bold text-lg">{studentData?.name}</p>
            <p className="text-sm text-gray-500">Roll No: {studentData?.rollNo}</p>
            <p className="text-xs text-gray-400 mt-2">{studentData?.class}</p>
            <p className="text-xs text-gray-400">{studentData?.email}</p>
            <p className="text-xs text-gray-400 mt-1">Semester: {studentData?.semester}</p>
            <p className="text-xs font-semibold mt-2" style={{ color: themeColor }}>CGPA: {studentData?.cgpa}</p>
          </div>
        );
        break;
      case "happenings":
        setModalTitle("📢 Happenings");
        setModalContent(
          <div className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">{ann.title}</p>
                <p className="text-xs text-gray-600 mt-1">{ann.content}</p>
                <p className="text-xs text-gray-400 mt-1">📅 {ann.date}</p>
              </div>
            ))}
          </div>
        );
        break;
      case "complaint":
        setModalTitle("⚠️ Raise Complaint");
        setModalContent(
          <div>
            <select className="w-full p-2 border rounded-lg text-sm mb-2">
              <option>Select Complaint Type</option>
              {complaintTypes.map(type => <option key={type}>{type}</option>)}
            </select>
            <textarea 
              placeholder="Describe your complaint in detail..." 
              className="w-full p-3 border rounded-lg text-sm mb-3" 
              rows="4"
            />
            <button className="w-full py-2 rounded-lg text-white" style={{ backgroundColor: themeColor }}>Submit Complaint</button>
          </div>
        );
        break;
      case "feeDetails":
        setModalTitle("💰 Fee Details");
        setModalContent(
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between mb-2"><span>Total Fee:</span><span className="font-bold">₹{feeDetails.totalFee.toLocaleString()}</span></div>
              <div className="flex justify-between mb-2"><span>Paid:</span><span className="text-green-600">₹{feeDetails.paid.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Pending:</span><span className="text-red-600">₹{feeDetails.pending.toLocaleString()}</span></div>
            </div>
            <p className="text-xs font-medium text-gray-700">Payment History:</p>
            {feeDetails.transactions.map((t, i) => (
              <div key={i} className="flex justify-between text-sm border-b py-1">
                <span>{t.date}</span><span>{t.type}</span><span className="font-medium">₹{t.amount}</span>
              </div>
            ))}
            <button className="w-full py-2 rounded-lg text-white text-sm mt-2" style={{ backgroundColor: themeColor }}>Pay Now</button>
          </div>
        );
        break;
      case "exams":
        setModalTitle("📋 Exam Schedule");
        setModalContent(
          <div className="space-y-2">
            {examSchedule.map((exam, i) => (
              <div key={i} className="p-2 border-b">
                <p className="font-medium text-sm">{exam.subject}</p>
                <p className="text-xs text-gray-500">📅 {exam.date} | ⏰ {exam.time}</p>
                <p className="text-xs text-gray-400">📍 {exam.room}</p>
              </div>
            ))}
          </div>
        );
        break;
      case "library":
        setModalTitle("📖 Library Books");
        setModalContent(
          <div className="space-y-2">
            {libraryBooks.map((book, i) => (
              <div key={i} className="p-2 border-b">
                <p className="font-medium text-sm">{book.title}</p>
                <p className="text-xs text-gray-500">by {book.author}</p>
                <p className="text-xs text-gray-400">Due: {book.dueDate}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Issued</span>
              </div>
            ))}
          </div>
        );
        break;
      case "timetable":
        setModalTitle("📅 Weekly Time Table");
        setModalContent(
          <div className="space-y-4">
            {Object.entries(fullWeekTimetable).map(([day, schedule]) => (
              <div key={day}>
                <p className="font-semibold text-sm mb-2" style={{ color: themeColor }}>{day}</p>
                <div className="space-y-1">
                  {schedule.map((item, idx) => (
                    <div key={idx} className={`text-xs p-1.5 rounded ${item.subject.includes("Lunch") ? "bg-amber-50 text-amber-700" : "bg-gray-50"}`}>
                      <span className="font-medium">{item.time}</span> - {item.subject} 
                      {!item.subject.includes("Lunch") && ` (${item.teacher}) - ${item.room}`}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case "results":
        setModalTitle("📊 Academic Results");
        setModalContent(
          <div>
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4" style={{ borderColor: `${themeColor}50` }}>
                <span className="text-2xl font-bold" style={{ color: themeColor }}>{averageMarks}%</span>
              </div>
              <p className="text-sm font-medium mt-2">Overall Percentage</p>
              <p className="text-xs text-gray-500">CGPA: {studentData?.cgpa}/10</p>
            </div>
            <div className="space-y-2">
              {marks.map(m => (
                <div key={m.id} className="p-2 border-b">
                  <div className="flex justify-between"><span className="font-medium">{m.subject}</span><span className="font-bold" style={{ color: themeColor }}>{m.marksObtained}/{m.totalMarks}</span></div>
                  <div className="h-1.5 bg-gray-200 rounded-full mt-1"><div className="h-full rounded-full" style={{ width: `${(m.marksObtained/m.totalMarks)*100}%`, backgroundColor: themeColor }} /></div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case "attendance":
        setModalTitle("📋 Attendance Record");
        setModalContent(
          <div>
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4" style={{ borderColor: `${themeColor}50` }}>
                <span className="text-2xl font-bold" style={{ color: themeColor }}>{attendancePercentage}%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Present: {attendance.filter(a => a.status === "Present").length} / {attendance.length} days</p>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {attendance.slice().reverse().map(record => (
                <div key={record.id} className="flex justify-between p-2 border-b">
                  <span className="text-sm">{record.date}</span>
                  <span className={`text-sm font-medium ${record.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                    {record.status === "Present" ? "✅ Present" : "❌ Absent"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case "assignments":
        setModalTitle("📄 Assignments");
        setModalContent(
          <div className="space-y-2">
            {assignments.map((ass, i) => (
              <div key={i} className="p-2 border-b">
                <p className="font-medium text-sm">{ass.subject}: {ass.title}</p>
                <p className="text-xs text-gray-500">Due: {ass.dueDate}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${ass.status === "Submitted" ? "bg-green-100 text-green-700" : ass.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {ass.status}
                </span>
              </div>
            ))}
          </div>
        );
        break;
      case "logout":
        handleLogout();
        return;
      default:
        setModalContent(<p className="text-center text-gray-500 py-8">Coming soon!</p>);
    }
    setShowModal(true);
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-[340px] max-h-[80vh] overflow-hidden shadow-2xl">
          <div className="p-3 flex justify-between items-center border-b" style={{ backgroundColor: `${themeColor}10` }}>
            <h3 className="font-semibold text-sm" style={{ color: themeColor }}>{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FaTimes size={16} /></button>
          </div>
          <div className="p-3 overflow-y-auto max-h-[60vh] text-sm">
            {children}
          </div>
          <div className="p-2 border-t">
            <button onClick={onClose} className="w-full py-1.5 bg-gray-100 rounded-lg text-xs">Close</button>
          </div>
        </div>
      </div>
    );
  };

  // 9 Dashboard Icons
  const dashboardIcons = [
    { id: "viewMarks", title: "Marks", icon: <FaEye className="text-lg" />, color: "#3b82f6", bgColor: "bg-blue-50" },
    { id: "attendance", title: "Attendance", icon: <FaClipboardList className="text-lg" />, color: "#10b981", bgColor: "bg-emerald-50" },
    { id: "results", title: "Results", icon: <FaStar className="text-lg" />, color: "#8b5cf6", bgColor: "bg-purple-50" },
    { id: "exams", title: "Exams", icon: <FaRegCalendar className="text-lg" />, color: "#f59e0b", bgColor: "bg-orange-50" },
    { id: "assignments", title: "Assignments", icon: <FaRegFileAlt className="text-lg" />, color: "#06b6d4", bgColor: "bg-cyan-50" },
    { id: "library", title: "Library", icon: <FaBook className="text-lg" />, color: "#eab308", bgColor: "bg-yellow-50" },
    { id: "timetable", title: "TimeTable", icon: <FaClock className="text-lg" />, color: "#6366f1", bgColor: "bg-indigo-50" },
    { id: "feeDetails", title: "Fee", icon: <FaMoneyBillWave className="text-lg" />, color: "#22c55e", bgColor: "bg-green-50" },
    { id: "complaint", title: "Complaint", icon: <FaExclamationTriangle className="text-lg" />, color: "#ef4444", bgColor: "bg-red-50" }
  ];

  const handleIconClick = (id) => {
    handleMenuItemClick(id);
  };

  const menuItems = [
    { id: "profile", title: "Profile", icon: <FaUserCircle className="text-lg" />, color: "#3b82f6" },
    { id: "happenings", title: "Happenings", icon: <FaBell className="text-lg" />, color: "#ef4444" },
    { id: "feeDetails", title: "Fee Details", icon: <FaMoneyBillWave className="text-lg" />, color: "#10b981" },
    { id: "exams", title: "Exam Schedule", icon: <FaRegCalendar className="text-lg" />, color: "#f59e0b" },
    { id: "timetable", title: "Time Table", icon: <FaClock className="text-lg" />, color: "#6366f1" },
    { id: "library", title: "Library", icon: <FaBook className="text-lg" />, color: "#eab308" },
    { id: "complaint", title: "Complaint", icon: <FaExclamationTriangle className="text-lg" />, color: "#ef4444" },
    { id: "results", title: "Results", icon: <FaStar className="text-lg" />, color: "#8b5cf6" },
    { id: "attendance", title: "Attendance", icon: <FaClipboardList className="text-lg" />, color: "#10b981" },
    { id: "assignments", title: "Assignments", icon: <FaRegFileAlt className="text-lg" />, color: "#06b6d4" },
    { id: "logout", title: "Logout", icon: <FaSignOutAlt className="text-lg" />, color: "#dc2626" }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col relative">
      
      {/* Header */}
      <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm border-b border-gray-100 flex-shrink-0">
        <button onClick={() => setIsDrawerOpen(true)} className="p-1">
          <FaBars size={20} style={{ color: themeColor }} />
        </button>
        <div className="text-center">
          <h1 className="text-md font-bold text-gray-800">Dashboard</h1>
          <p className="text-xs text-gray-500">Welcome, {studentData?.name?.split(' ')[0] || "Student"}!</p>
        </div>
        <button onClick={() => handleMenuItemClick("happenings")} className="relative p-1">
          <FaBell size={18} style={{ color: themeColor }} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{announcements.length}</span>
        </button>
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && (
        <>
          <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setIsDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white z-50 shadow-2xl overflow-y-auto animate-slide-in">
            <div className="p-4 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaUserGraduate className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{studentData?.name}</p>
                  <p className="text-xs opacity-80">Roll No: {studentData?.rollNo}</p>
                </div>
              </div>
              <p className="text-xs opacity-80 mt-2">{studentData?.class}</p>
            </div>
            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                  <span className="text-sm text-gray-700">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-16">
        
        {/* Today's Schedule */}
        <div className="px-3 pt-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FaClock size={14} style={{ color: themeColor }} />
            Today's Schedule (Wednesday)
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {todaySchedule.map((item, idx) => (
              <div key={idx} className={`min-w-[150px] rounded-xl p-2 shadow-sm border ${item.subject.includes("Lunch") ? "bg-amber-50 border-amber-200" : "bg-white border-gray-100"}`}>
                <p className={`text-xs font-medium ${item.subject.includes("Lunch") ? "text-amber-700" : "text-gray-500"}`}>{item.time}</p>
                <p className={`font-semibold text-sm mt-1 ${item.subject.includes("Lunch") ? "text-amber-700" : "text-gray-800"}`}>{item.subject}</p>
                {!item.subject.includes("Lunch") && (
                  <>
                    <p className="text-xs text-gray-500 mt-1">👨‍🏫 {item.teacher}</p>
                    <p className="text-xs text-gray-500">📍 {item.room}</p>
                  </>
                )}
                {item.subject.includes("Lunch") && <p className="text-xs text-amber-600 mt-1">🍽️ {item.room}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Overall Attendance & Overall Score Cards - Side by Side */}
        <div className="grid grid-cols-2 gap-3 mx-3 mt-4">
          {/* Overall Attendance Card */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-gray-500">Overall Attendance</p>
                <p className="text-2xl font-bold" style={{ color: themeColor }}>{attendancePercentage}%</p>
                <p className="text-xs text-gray-400 mt-1">
                  📅 {attendance.filter(a => a.status === "Present").length} / {attendance.length} days
                </p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${themeColor}15` }}>
                <FaClipboardList className="text-lg" style={{ color: themeColor }} />
              </div>
            </div>
          </div>

          {/* Overall Score Card */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-gray-500">Overall Score</p>
                <p className="text-2xl font-bold" style={{ color: themeColor }}>{averageMarks}%</p>
                <p className="text-xs text-gray-400 mt-1">
                  🎓 CGPA: {studentData?.cgpa} / 10
                </p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${themeColor}15` }}>
                <FaStar className="text-lg" style={{ color: themeColor }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Icons */}
        <div className="px-3 pt-4 pb-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Quick Access</h2>
          <div className="grid grid-cols-3 gap-2">
            {dashboardIcons.map((icon) => (
              <button
                key={icon.id}
                onClick={() => handleIconClick(icon.id)}
                className={`${icon.bgColor} rounded-xl p-2 text-center transition-all hover:scale-105 active:scale-95`}
              >
                <div className="flex justify-center mb-1" style={{ color: icon.color }}>
                  {icon.icon}
                </div>
                <p className="text-xs font-medium text-gray-700">{icon.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-100 shadow-lg flex-shrink-0">
        <div className="flex justify-around items-center py-2 px-4">
          <button onClick={() => setActiveBottomTab("home")} className="flex flex-col items-center gap-1">
            <FaHome size={18} className={activeBottomTab === "home" ? "text-indigo-500" : "text-gray-400"} />
            <span className={`text-[10px] ${activeBottomTab === "home" ? "text-indigo-500 font-medium" : "text-gray-400"}`}>Home</span>
          </button>
          <button onClick={() => setActiveBottomTab("academics")} className="flex flex-col items-center gap-1">
            <FaBookOpen size={18} className={activeBottomTab === "academics" ? "text-indigo-500" : "text-gray-400"} />
            <span className={`text-[10px] ${activeBottomTab === "academics" ? "text-indigo-500 font-medium" : "text-gray-400"}`}>Academics</span>
          </button>
          <button onClick={() => handleMenuItemClick("profile")} className="flex flex-col items-center gap-1">
            <FaUserGraduate size={18} className="text-gray-400" />
            <span className="text-[10px] text-gray-400">Profile</span>
          </button>
          <button onClick={handleLogout} className="flex flex-col items-center gap-1">
            <FaSignOutAlt size={18} className="text-red-400" />
            <span className="text-[10px] text-red-400">Logout</span>
          </button>
        </div>
        <div className="w-10 h-1 bg-indigo-500 rounded-full mx-auto mb-2"></div>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
};
export default StudentDashboard;
