import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  FaUser, FaCalendarAlt, FaChartLine, FaBell, FaSignOutAlt, 
  FaEye, FaFileAlt, FaExclamationTriangle, FaCalendarCheck, 
  FaMoneyBillWave, FaBookOpen, FaClock, FaDownload, FaPaperPlane,
  FaClipboardList, FaStar, FaBook, FaRegCalendar, FaRegClock, 
  FaRegFileAlt, FaRegEnvelope, FaTimes, FaUserTie, FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { themeColor, schoolData } = useApp();
  const [studentData, setStudentData] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showFullTimetable, setShowFullTimetable] = useState(false);
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showFeesModal, setShowFeesModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showAssignmentsModal, setShowAssignmentsModal] = useState(false);
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [showHolidaysModal, setShowHolidaysModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  const [complaintText, setComplaintText] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || JSON.parse(role) !== "student") {
      navigate("/role-selection");
      return;
    }

    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setStudentData(profile);
    } else {
      setStudentData({
        id: "s1",
        name: "Emma Watson",
        class: "10A",
        rollNo: "101",
        email: "emma@school.edu",
        parentEmail: "parent.emma@email.com",
        phone: "+1 234-567-8901"
      });
    }

    // Load attendance
    const storedAttendance = localStorage.getItem("attendance");
    if (storedAttendance) {
      const allAttendance = JSON.parse(storedAttendance);
      const studentAttendance = allAttendance.filter(a => a.studentId === studentData?.id);
      setAttendance(studentAttendance);
    } else {
      const dummyAttendance = [
        { id: "1", studentId: "s1", date: "2024-03-01", status: "Present" },
        { id: "2", studentId: "s1", date: "2024-03-02", status: "Present" },
        { id: "3", studentId: "s1", date: "2024-03-03", status: "Absent" },
        { id: "4", studentId: "s1", date: "2024-03-04", status: "Present" },
        { id: "5", studentId: "s1", date: "2024-03-05", status: "Present" }
      ];
      setAttendance(dummyAttendance);
    }

    // Load marks
    const storedMarks = localStorage.getItem("marks");
    if (storedMarks) {
      const allMarks = JSON.parse(storedMarks);
      const studentMarks = allMarks.filter(m => m.studentId === studentData?.id);
      setMarks(studentMarks);
    } else {
      const dummyMarks = [
        { id: "1", studentId: "s1", subject: "Mathematics", marksObtained: 85, totalMarks: 100, examType: "Midterm" },
        { id: "2", studentId: "s1", subject: "Physics", marksObtained: 78, totalMarks: 100, examType: "Midterm" },
        { id: "3", studentId: "s1", subject: "Chemistry", marksObtained: 92, totalMarks: 100, examType: "Midterm" },
        { id: "4", studentId: "s1", subject: "English", marksObtained: 88, totalMarks: 100, examType: "Midterm" },
        { id: "5", studentId: "s1", subject: "Computer Science", marksObtained: 95, totalMarks: 100, examType: "Midterm" }
      ];
      setMarks(dummyMarks);
    }

    // Load announcements
    const storedAnnouncements = localStorage.getItem("announcements");
    if (storedAnnouncements) {
      setAnnouncements(JSON.parse(storedAnnouncements));
    } else {
      const dummyAnnouncements = [
        { id: "1", title: "📢 Parent-Teacher Meeting", content: "Annual parent-teacher meeting on March 25th at 10 AM in the auditorium.", date: "2024-03-25", time: "10:00 AM" },
        { id: "2", title: "🔬 Science Fair 2024", content: "Registration open until March 30th. Submit your projects to the science department.", date: "2024-03-30", time: "9:00 AM" },
        { id: "3", title: "🏆 Sports Day", content: "Annual sports day scheduled for April 5th. All students must register by March 28th.", date: "2024-04-05", time: "8:00 AM" }
      ];
      setAnnouncements(dummyAnnouncements);
    }

    // Load complaints
    const storedComplaints = localStorage.getItem("complaints");
    if (storedComplaints) {
      setComplaints(JSON.parse(storedComplaints));
    }

    // Load leaves
    const storedLeaves = localStorage.getItem("leaves");
    if (storedLeaves) {
      setLeaves(JSON.parse(storedLeaves));
    }

    // Load feedback
    const storedFeedback = localStorage.getItem("feedback");
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
  }, [navigate, studentData?.id]);

  const attendancePercentage = attendance.length > 0
    ? Math.round((attendance.filter(a => a.status === "Present").length / attendance.length) * 100)
    : 92;

  const averageMarks = marks.length > 0
    ? Math.round(marks.reduce((sum, m) => sum + (m.marksObtained / m.totalMarks * 100), 0) / marks.length)
    : 87;

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "D";
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");
    toast.success("Logged out successfully!");
    navigate("/role-selection");
  };

  const handleSubmitComplaint = () => {
    if (!complaintText.trim()) {
      toast.error("Please enter your complaint");
      return;
    }
    const newComplaint = {
      id: Date.now().toString(),
      text: complaintText,
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      studentName: studentData?.name
    };
    const updatedComplaints = [newComplaint, ...complaints];
    setComplaints(updatedComplaints);
    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
    toast.success("Complaint submitted successfully!");
    setComplaintText("");
    setShowComplaintModal(false);
  };

  const handleApplyLeave = () => {
    if (!leaveReason.trim()) {
      toast.error("Please enter leave reason");
      return;
    }
    if (!leaveDate) {
      toast.error("Please select leave date");
      return;
    }
    const newLeave = {
      id: Date.now().toString(),
      reason: leaveReason,
      date: leaveDate,
      type: leaveType,
      status: "Pending",
      studentName: studentData?.name,
      appliedOn: new Date().toISOString().split('T')[0]
    };
    const updatedLeaves = [newLeave, ...leaves];
    setLeaves(updatedLeaves);
    localStorage.setItem("leaves", JSON.stringify(updatedLeaves));
    toast.success("Leave application submitted!");
    setLeaveReason("");
    setLeaveDate("");
    setShowLeaveModal(false);
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      toast.error("Please enter your feedback");
      return;
    }
    const newFeedback = {
      id: Date.now().toString(),
      text: feedbackText,
      rating: feedbackRating,
      date: new Date().toISOString().split('T')[0],
      studentName: studentData?.name
    };
    const updatedFeedback = [newFeedback, ...feedback];
    setFeedback(updatedFeedback);
    localStorage.setItem("feedback", JSON.stringify(updatedFeedback));
    toast.success("Feedback submitted successfully!");
    setFeedbackText("");
    setFeedbackRating(5);
    setShowFeedbackModal(false);
  };

  // Full Weekly Timetable
  const fullWeekSchedule = [
    { day: "Monday", subjects: ["Mathematics", "Physics", "English", "Chemistry", "Physical Education"], teachers: ["Dr. Sarah Johnson", "Prof. Michael Brown", "Ms. Emily Davis", "Dr. Robert Chen", "Mr. David Wilson"] },
    { day: "Tuesday", subjects: ["Physics", "Mathematics", "Computer Science", "English", "Biology"], teachers: ["Prof. Michael Brown", "Dr. Sarah Johnson", "Ms. Lisa Wong", "Ms. Emily Davis", "Dr. James Miller"] },
    { day: "Wednesday", subjects: ["Mathematics", "Chemistry", "English", "Physics", "Social Studies"], teachers: ["Dr. Sarah Johnson", "Dr. Robert Chen", "Ms. Emily Davis", "Prof. Michael Brown", "Mr. John Adams"] },
    { day: "Thursday", subjects: ["Chemistry", "Mathematics", "Biology", "Physics", "English"], teachers: ["Dr. Robert Chen", "Dr. Sarah Johnson", "Dr. James Miller", "Prof. Michael Brown", "Ms. Emily Davis"] },
    { day: "Friday", subjects: ["English", "Physics", "Mathematics", "Computer Science", "Physical Education"], teachers: ["Ms. Emily Davis", "Prof. Michael Brown", "Dr. Sarah Johnson", "Ms. Lisa Wong", "Mr. David Wilson"] }
  ];

  // Today's Schedule
  const todaySchedule = [
    { time: "9:00 - 10:00 AM", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 201", icon: "📐" },
    { time: "10:00 - 11:00 AM", subject: "Physics", teacher: "Prof. Michael Brown", room: "Lab 3", icon: "⚛️" },
    { time: "11:00 - 11:30 AM", subject: "Break", teacher: "-", room: "-", icon: "☕" },
    { time: "11:30 - 12:30 PM", subject: "English", teacher: "Ms. Emily Davis", room: "Room 205", icon: "📖" },
    { time: "12:30 - 1:30 PM", subject: "Chemistry", teacher: "Dr. Robert Chen", room: "Lab 1", icon: "🧪" },
    { time: "1:30 - 2:00 PM", subject: "Lunch Break", teacher: "-", room: "Cafeteria", icon: "🍽️" }
  ];

  // Exam Schedule
  const examSchedule = [
    { subject: "Mathematics", date: "2024-03-28", time: "9:00 AM - 12:00 PM", room: "Hall A" },
    { subject: "Physics", date: "2024-03-29", time: "9:00 AM - 12:00 PM", room: "Hall B" },
    { subject: "Chemistry", date: "2024-03-30", time: "9:00 AM - 12:00 PM", room: "Hall A" },
    { subject: "English", date: "2024-04-01", time: "9:00 AM - 12:00 PM", room: "Hall C" },
    { subject: "Computer Science", date: "2024-04-02", time: "9:00 AM - 12:00 PM", room: "Computer Lab" }
  ];

  // Assignments
  const assignments = [
    { subject: "Mathematics", title: "Algebra Worksheet", dueDate: "2024-03-25", status: "Pending" },
    { subject: "Physics", title: "Laws of Motion Project", dueDate: "2024-03-28", status: "In Progress" },
    { subject: "English", title: "Essay Writing", dueDate: "2024-03-26", status: "Submitted" }
  ];

  // Homework
  const homework = [
    { subject: "Mathematics", task: "Solve Exercise 5.1", dueDate: "2024-03-24" },
    { subject: "Chemistry", task: "Learn Periodic Table", dueDate: "2024-03-25" },
    { subject: "Physics", task: "Numericals from Chapter 3", dueDate: "2024-03-26" }
  ];

  // Library Books
  const libraryBooks = [
    { title: "Mathematics Vol 2", author: "R.S. Aggarwal", issueDate: "2024-03-01", returnDate: "2024-03-30" },
    { title: "Physics Fundamentals", author: "H.C. Verma", issueDate: "2024-03-05", returnDate: "2024-04-05" }
  ];

  // Holidays
  const holidays = [
    { date: "2024-03-20", name: "Holi", day: "Wednesday" },
    { date: "2024-03-25", name: "Ram Navami", day: "Monday" },
    { date: "2024-04-05", name: "Good Friday", day: "Friday" },
    { date: "2024-04-09", name: "Eid-ul-Fitr", day: "Tuesday" },
    { date: "2024-05-01", name: "Labour Day", day: "Wednesday" },
    { date: "2024-08-15", name: "Independence Day", day: "Thursday" },
    { date: "2024-10-02", name: "Gandhi Jayanti", day: "Wednesday" }
  ];

  // Fee Details
  const feeDetails = {
    totalFee: 75000,
    paid: 50000,
    pending: 25000,
    lastPayment: "2024-02-15",
    nextDue: "2024-04-15",
    status: "Partially Paid"
  };

  const gridActions = [
    { id: "marks", title: "View Marks", icon: <FaEye className="text-2xl" />, bgColor: "bg-blue-50" },
    { id: "result", title: "Result", icon: <FaStar className="text-2xl" />, bgColor: "bg-purple-50" },
    { id: "attendance", title: "Attendance", icon: <FaClipboardList className="text-2xl" />, bgColor: "bg-emerald-50" },
    { id: "complaint", title: "Raise Complaint", icon: <FaExclamationTriangle className="text-2xl" />, bgColor: "bg-red-50" },
    { id: "leave", title: "Leave Application", icon: <FaCalendarCheck className="text-2xl" />, bgColor: "bg-orange-50" },
    { id: "fees", title: "Fee Details", icon: <FaMoneyBillWave className="text-2xl" />, bgColor: "bg-green-50" },
    { id: "exam", title: "Exam Schedule", icon: <FaRegCalendar className="text-2xl" />, bgColor: "bg-indigo-50" },
    { id: "assignments", title: "Assignments", icon: <FaRegFileAlt className="text-2xl" />, bgColor: "bg-cyan-50" },
    { id: "homework", title: "Homework", icon: <FaBookOpen className="text-2xl" />, bgColor: "bg-teal-50" },
    { id: "timetable", title: "Time Table", icon: <FaRegClock className="text-2xl" />, bgColor: "bg-pink-50" },
    { id: "library", title: "Library", icon: <FaBook className="text-2xl" />, bgColor: "bg-yellow-50" },
    { id: "holidays", title: "List of Holidays", icon: <FaRegCalendar className="text-2xl" />, bgColor: "bg-rose-50" },
    { id: "feedback", title: "Give Feedback", icon: <FaRegEnvelope className="text-2xl" />, bgColor: "bg-lime-50" }
  ];

  const handleGridClick = (actionId) => {
    switch(actionId) {
      case "marks": setShowMarksModal(true); break;
      case "result": setShowResultModal(true); break;
      case "attendance": setShowAttendanceModal(true); break;
      case "complaint": setShowComplaintModal(true); break;
      case "leave": setShowLeaveModal(true); break;
      case "fees": setShowFeesModal(true); break;
      case "exam": setShowExamModal(true); break;
      case "assignments": setShowAssignmentsModal(true); break;
      case "homework": setShowHomeworkModal(true); break;
      case "timetable": setShowFullTimetable(true); break;
      case "library": setShowLibraryModal(true); break;
      case "holidays": setShowHolidaysModal(true); break;
      case "feedback": setShowFeedbackModal(true); break;
      default: break;
    }
  };

  // Modal Component Helper
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden">
          <div className="p-4 flex justify-between items-center" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
            <h3 className="text-white font-semibold">{title}</h3>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-1 rounded-full">
              <FaTimes size={20} />
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[70vh]">
            {children}
          </div>
          <div className="p-3 border-t">
            <button onClick={onClose} className="w-full py-2 bg-gray-100 rounded-lg text-sm font-medium">Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 pb-20">
      {/* Header with Theme Color Gradient */}
      <div className="rounded-2xl p-5 mb-5 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FaUser className="text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Welcome, {studentData?.name?.split(' ')[0] || "Emma"}!</h1>
              <p className="text-sm opacity-90">Class {studentData?.class || "10A"} | Roll No: {studentData?.rollNo || "101"}</p>
              <p className="text-xs opacity-75 mt-0.5">{studentData?.email || "emma@school.edu"}</p>
            </div>
          </div>
          <button onClick={() => setShowAnnouncements(true)} className="relative bg-white/20 p-3 rounded-full hover:bg-white/30 transition">
            <FaBell className="text-xl" />
            {announcements.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {announcements.length}
              </span>
            )}
          </button>
        </div>
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/20">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-sm" />
            <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Announcements Modal */}
      <Modal isOpen={showAnnouncements} onClose={() => setShowAnnouncements(false)} title={`Announcements (${announcements.length})`}>
        {announcements.map(ann => (
          <div key={ann.id} className="p-3 bg-gray-50 rounded-lg mb-3">
            <p className="font-medium text-sm">{ann.title}</p>
            <p className="text-xs text-gray-600 mt-1">{ann.content}</p>
            <p className="text-xs text-gray-400 mt-1">📅 {ann.date} • 🕐 {ann.time}</p>
          </div>
        ))}
      </Modal>

      {/* View Marks Modal */}
      <Modal isOpen={showMarksModal} onClose={() => setShowMarksModal(false)} title="📊 Your Marks">
        {marks.map(mark => (
          <div key={mark.id} className="p-3 bg-gray-50 rounded-lg mb-2">
            <div className="flex justify-between items-center">
              <div><p className="font-medium">{mark.subject}</p><p className="text-xs text-gray-500">{mark.examType}</p></div>
              <div className="text-right"><p className="text-lg font-bold" style={{ color: themeColor }}>{mark.marksObtained}/{mark.totalMarks}</p><p className="text-xs text-gray-500">{Math.round((mark.marksObtained/mark.totalMarks)*100)}%</p></div>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(mark.marksObtained/mark.totalMarks)*100}%`, backgroundColor: themeColor }} />
            </div>
          </div>
        ))}
      </Modal>

      {/* Result Modal */}
      <Modal isOpen={showResultModal} onClose={() => setShowResultModal(false)} title="🎓 Your Result">
        <div className="text-center p-4">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${themeColor}20` }}>
            <FaStar className="text-4xl" style={{ color: themeColor }} />
          </div>
          <p className="text-3xl font-bold" style={{ color: themeColor }}>{averageMarks}%</p>
          <p className="text-lg font-bold mt-1">Grade: {getGrade(averageMarks)}</p>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">📊 Overall Performance: {averageMarks >= 80 ? "Excellent!" : averageMarks >= 60 ? "Good!" : "Need Improvement"}</p>
          </div>
        </div>
      </Modal>

      {/* Attendance Modal */}
      <Modal isOpen={showAttendanceModal} onClose={() => setShowAttendanceModal(false)} title="📋 Attendance Record">
        <div className="text-center p-4">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${themeColor}20` }}>
            <FaChartLine className="text-4xl" style={{ color: themeColor }} />
          </div>
          <p className="text-3xl font-bold" style={{ color: themeColor }}>{attendancePercentage}%</p>
          <p className="text-sm text-gray-500 mt-1">Overall Attendance</p>
          <div className="mt-4 space-y-2">
            {attendance.map(record => (
              <div key={record.id} className="flex justify-between items-center p-2 border-b">
                <span className="text-sm">{record.date}</span>
                <span className={`text-sm font-medium ${record.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                  {record.status === "Present" ? <FaCheckCircle className="inline mr-1" /> : <FaTimesCircle className="inline mr-1" />}
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Raise Complaint Modal */}
      <Modal isOpen={showComplaintModal} onClose={() => setShowComplaintModal(false)} title="⚠️ Raise a Complaint">
        <textarea placeholder="Describe your complaint here..." value={complaintText} onChange={(e) => setComplaintText(e.target.value)} rows="4" className="w-full p-3 border rounded-lg text-sm mb-3" />
        <button onClick={handleSubmitComplaint} className="w-full text-white py-2 rounded-lg font-medium" style={{ backgroundColor: themeColor }}>Submit Complaint</button>
        {complaints.length > 0 && (
          <div className="mt-4"><p className="text-sm font-medium mb-2">Previous Complaints:</p>
            {complaints.slice(0, 3).map(c => (
              <div key={c.id} className="p-2 bg-gray-50 rounded-lg mb-2">
                <p className="text-xs">{c.text}</p><p className="text-xs text-gray-400 mt-1">{c.date} • {c.status}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Leave Application Modal */}
      <Modal isOpen={showLeaveModal} onClose={() => setShowLeaveModal(false)} title="📅 Apply for Leave">
        <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className="w-full p-2 border rounded-lg text-sm mb-2">
          <option>Sick Leave</option><option>Casual Leave</option><option>Emergency Leave</option><option>Personal Leave</option>
        </select>
        <input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} className="w-full p-2 border rounded-lg text-sm mb-2" />
        <textarea placeholder="Reason for leave..." value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} rows="3" className="w-full p-3 border rounded-lg text-sm mb-3" />
        <button onClick={handleApplyLeave} className="w-full text-white py-2 rounded-lg font-medium" style={{ backgroundColor: themeColor }}>Submit Application</button>
      </Modal>

      {/* Fee Details Modal */}
      <Modal isOpen={showFeesModal} onClose={() => setShowFeesModal(false)} title="💰 Fee Details">
        <div className="space-y-3">
          <div className="flex justify-between p-2 border-b"><span>Total Fee:</span><span className="font-bold">₹{feeDetails.totalFee.toLocaleString()}</span></div>
          <div className="flex justify-between p-2 border-b"><span>Paid:</span><span className="font-bold text-green-600">₹{feeDetails.paid.toLocaleString()}</span></div>
          <div className="flex justify-between p-2 border-b"><span>Pending:</span><span className="font-bold text-red-600">₹{feeDetails.pending.toLocaleString()}</span></div>
          <div className="flex justify-between p-2 border-b"><span>Last Payment:</span><span>{feeDetails.lastPayment}</span></div>
          <div className="flex justify-between p-2"><span>Next Due:</span><span className="font-bold" style={{ color: themeColor }}>{feeDetails.nextDue}</span></div>
        </div>
      </Modal>

      {/* Exam Schedule Modal */}
      <Modal isOpen={showExamModal} onClose={() => setShowExamModal(false)} title="📋 Exam Schedule">
        {examSchedule.map((exam, idx) => (
          <div key={idx} className="p-2 border-b mb-2">
            <p className="font-medium">{exam.subject}</p><p className="text-xs text-gray-500">📅 {exam.date} • 🕐 {exam.time} • 📍 {exam.room}</p>
          </div>
        ))}
      </Modal>

      {/* Assignments Modal */}
      <Modal isOpen={showAssignmentsModal} onClose={() => setShowAssignmentsModal(false)} title="📄 Assignments">
        {assignments.map((ass, idx) => (
          <div key={idx} className="p-2 border-b mb-2">
            <p className="font-medium">{ass.subject}: {ass.title}</p><p className="text-xs text-gray-500">Due: {ass.dueDate}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${ass.status === "Submitted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{ass.status}</span>
          </div>
        ))}
      </Modal>

      {/* Homework Modal */}
      <Modal isOpen={showHomeworkModal} onClose={() => setShowHomeworkModal(false)} title="📚 Homework">
        {homework.map((hw, idx) => (
          <div key={idx} className="p-2 border-b mb-2">
            <p className="font-medium">{hw.subject}</p><p className="text-sm">{hw.task}</p><p className="text-xs text-gray-500">Due: {hw.dueDate}</p>
          </div>
        ))}
      </Modal>

      {/* Time Table Modal */}
      <Modal isOpen={showFullTimetable} onClose={() => setShowFullTimetable(false)} title="🕐 Weekly Time Table">
        {fullWeekSchedule.map((day, idx) => (
          <div key={idx} className="mb-3 bg-gray-50 rounded-lg p-2">
            <p className="font-bold mb-1" style={{ color: themeColor }}>{day.day}</p>
            {day.subjects.map((sub, subIdx) => (
              <div key={subIdx} className="flex justify-between text-sm py-0.5">
                <span>{sub}</span><span className="text-xs text-gray-500">{day.teachers[subIdx]}</span>
              </div>
            ))}
          </div>
        ))}
      </Modal>

      {/* Library Modal */}
      <Modal isOpen={showLibraryModal} onClose={() => setShowLibraryModal(false)} title="📖 Library Books">
        {libraryBooks.map((book, idx) => (
          <div key={idx} className="p-2 border-b mb-2">
            <p className="font-medium">{book.title}</p><p className="text-xs text-gray-500">By: {book.author}</p><p className="text-xs text-gray-400">Issued: {book.issueDate} • Return: {book.returnDate}</p>
          </div>
        ))}
      </Modal>

      {/* Holidays Modal */}
      <Modal isOpen={showHolidaysModal} onClose={() => setShowHolidaysModal(false)} title="📅 List of Holidays">
        {holidays.map((hol, idx) => (
          <div key={idx} className="flex justify-between p-2 border-b">
            <span>{hol.name}</span><span className="text-gray-500">{hol.date} ({hol.day})</span>
          </div>
        ))}
      </Modal>

      {/* Feedback Modal */}
      <Modal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} title="✉️ Give Feedback">
        <div className="mb-2"><label className="text-sm">Rating:</label><div className="flex gap-1 mt-1">
          {[1,2,3,4,5].map(r => (<button key={r} onClick={() => setFeedbackRating(r)} className={`p-2 rounded ${feedbackRating >= r ? "text-yellow-500" : "text-gray-300"}`}>★</button>))}
        </div></div>
        <textarea placeholder="Your feedback..." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} rows="3" className="w-full p-3 border rounded-lg text-sm mb-3" />
        <button onClick={handleSubmitFeedback} className="w-full text-white py-2 rounded-lg font-medium" style={{ backgroundColor: themeColor }}>Submit Feedback</button>
      </Modal>

      {/* Stats Cards with Theme Color Border */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white rounded-xl p-4 shadow-sm border text-center" style={{ borderColor: `${themeColor}30` }}>
          <p className="text-2xl font-bold" style={{ color: themeColor }}>{attendancePercentage}%</p>
          <p className="text-xs text-gray-500 mt-1">Attendance Rate</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border text-center" style={{ borderColor: `${themeColor}30` }}>
          <p className="text-2xl font-bold" style={{ color: themeColor }}>{averageMarks}%</p>
          <p className="text-xs text-gray-500 mt-1">Average Score</p>
        </div>
      </div>

      {/* Today's Schedule - Horizontal Cards */}
      <div className="bg-white rounded-xl p-4 shadow-sm border mb-5" style={{ borderColor: `${themeColor}30` }}>
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaClock style={{ color: themeColor }} /> Today's Schedule
          <span className="text-xs text-gray-400 ml-auto">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span>
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {todaySchedule.map((item, index) => (
            <div key={index} className={`min-w-[130px] rounded-xl p-3 ${item.subject === "Break" || item.subject === "Lunch Break" ? "bg-amber-100" : "bg-gray-50"}`}>
              <div className="text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-xs font-bold text-gray-600">{item.time}</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{item.subject}</p>
                {item.teacher !== "-" && <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1"><FaUserTie size={10} /> {item.teacher}</p>}
                <p className="text-xs text-gray-400 mt-1">{item.room}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Actions - All icons use Theme Color */}
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <FaStar style={{ color: themeColor }} /> Student Services
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {gridActions.map((action) => (
          <button key={action.id} onClick={() => handleGridClick(action.id)} className={`${action.bgColor} rounded-xl p-4 text-center transition-all hover:scale-102 active:scale-98 hover:shadow-md`}>
            <div className="mb-2 flex justify-center" style={{ color: themeColor }}>
              {action.icon}
            </div>
            <p className="text-sm font-medium text-gray-700">{action.title}</p>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="w-full py-3 rounded-lg font-medium text-red-600 border border-red-200 transition hover:bg-red-50 flex items-center justify-center gap-2">
        <FaSignOutAlt size={14} /> Logout
      </button>
    </div>
  );
};

export default StudentDashboard;