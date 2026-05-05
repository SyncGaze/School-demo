import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  FaUser, FaCalendarAlt, FaChartLine, FaBell, FaSignOutAlt, 
  FaEye, FaFileAlt, FaMoneyBillWave, FaBookOpen, FaClock,
  FaUserGraduate, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaChalkboardTeacher, FaClipboardList, FaStar, FaRegCalendar, FaTimes
} from "react-icons/fa";
import { useToast } from "../context/ToastContext";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { themeColor, schoolData } = useApp();
  const { showToast } = useToast();
  const [parentData, setParentData] = useState(null);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [fees, setFees] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || JSON.parse(role) !== "parent") {
      navigate("/role-selection");
      return;
    }

    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setParentData(profile);
      setChildren(profile.children || []);
      if (profile.children && profile.children.length > 0) {
        setSelectedChild(profile.children[0]);
      }
    } else {
      const dummyParent = {
        id: "p1", name: "Mr. & Mrs. Watson", email: "parent.emma@example.com", phone: "+1 234-567-8900",
        children: [{ id: "s1", name: "Emma Watson", class: "10A", rollNo: "101", email: "emma@example.com" }]
      };
      setParentData(dummyParent);
      setChildren(dummyParent.children);
      setSelectedChild(dummyParent.children[0]);
      localStorage.setItem("userProfile", JSON.stringify(dummyParent));
    }

    const storedAttendance = localStorage.getItem("attendance");
    if (storedAttendance && selectedChild) {
      setAttendance(JSON.parse(storedAttendance).filter(a => a.studentId === selectedChild.id));
    }
    const storedMarks = localStorage.getItem("marks");
    if (storedMarks && selectedChild) {
      setMarks(JSON.parse(storedMarks).filter(m => m.studentId === selectedChild.id));
    }
    const storedAnnouncements = localStorage.getItem("announcements");
    if (storedAnnouncements) setAnnouncements(JSON.parse(storedAnnouncements));
  }, [navigate, selectedChild?.id]);

  const attendancePercentage = attendance.length > 0 ? Math.round((attendance.filter(a => a.status === "Present").length / attendance.length) * 100) : 92;
  const averageMarks = marks.length > 0 ? Math.round(marks.reduce((sum, m) => sum + (m.marksObtained / m.totalMarks * 100), 0) / marks.length) : 85;

  const handleChildChange = (child) => {
    setSelectedChild(child);
    const storedAttendance = localStorage.getItem("attendance");
    if (storedAttendance) setAttendance(JSON.parse(storedAttendance).filter(a => a.studentId === child.id));
    const storedMarks = localStorage.getItem("marks");
    if (storedMarks) setMarks(JSON.parse(storedMarks).filter(m => m.studentId === child.id));
  };

  const getGrade = (p) => { if (p >= 90) return "A+"; if (p >= 80) return "A"; if (p >= 70) return "B+"; if (p >= 60) return "B"; if (p >= 50) return "C"; return "D"; };
  const handleLogout = () => { localStorage.removeItem("userRole"); localStorage.removeItem("userProfile"); showToast("Logged out!", "success"); navigate("/role-selection"); };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
          <div className="p-4 flex justify-between items-center border-b" style={{ backgroundColor: `${themeColor}10` }}>
            <h3 className="font-semibold" style={{ color: themeColor }}>{title}</h3>
            <button onClick={onClose} className="text-gray-400"><FaTimes /></button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 pb-20 relative min-h-full">
      <div className="rounded-2xl p-5 mb-5 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
        <div className="flex items-center gap-3 mb-2"><div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><FaUserGraduate className="text-2xl" /></div><div><h1 className="text-xl font-bold">Welcome, {parentData?.name?.split(' ')[0] || "Parent"}!</h1><p className="text-sm opacity-90">{schoolData?.schoolName || "School Management"}</p></div></div>
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20"><div className="flex items-center gap-2"><FaEnvelope className="text-sm" /><span className="text-xs">{parentData?.email}</span></div><div className="flex items-center gap-2"><FaPhone className="text-sm" /><span className="text-xs">{parentData?.phone}</span></div></div>
      </div>

      {children.length > 1 && (<div className="bg-white rounded-xl p-3 mb-4 shadow-sm border" style={{ borderColor: `${themeColor}30` }}><label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label><div className="flex gap-2">{children.map(child => (<button key={child.id} onClick={() => handleChildChange(child)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${selectedChild?.id === child.id ? "text-white" : "bg-gray-100"}`} style={selectedChild?.id === child.id ? { backgroundColor: themeColor } : {}}>{child.name}</button>))}</div></div>)}

      {selectedChild && (<div className="bg-white rounded-xl p-4 shadow-sm border mb-5" style={{ borderColor: `${themeColor}30` }}><div className="flex justify-between items-center"><div><h3 className="font-semibold text-gray-800">{selectedChild.name}</h3><p className="text-xs text-gray-500">Class {selectedChild.class} | Roll No: {selectedChild.rollNo}</p></div></div></div>)}

      <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {[{ id: "overview", label: "Overview", icon: FaChartLine }, { id: "attendance", label: "Attendance", icon: FaClipboardList }, { id: "academics", label: "Academics", icon: FaBookOpen }, { id: "fees", label: "Fee Details", icon: FaMoneyBillWave }, { id: "communication", label: "Updates", icon: FaBell }].map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === tab.id ? "bg-white shadow-sm" : "text-gray-500"}`} style={activeTab === tab.id ? { color: themeColor } : {}}><tab.icon size={14} />{tab.label}</button>))}
      </div>

      {activeTab === "overview" && selectedChild && (<div className="space-y-4"><div className="grid grid-cols-2 gap-3"><div className="bg-white rounded-xl p-4 text-center border" style={{ borderColor: `${themeColor}30` }}><p className="text-2xl font-bold" style={{ color: themeColor }}>{attendancePercentage}%</p><p className="text-xs text-gray-500">Attendance</p></div><div className="bg-white rounded-xl p-4 text-center border" style={{ borderColor: `${themeColor}30` }}><p className="text-2xl font-bold" style={{ color: themeColor }}>{averageMarks}%</p><p className="text-xs text-gray-500">Average Score</p></div></div><div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${themeColor}30` }}><h3 className="font-semibold mb-3 flex items-center gap-2"><FaChartLine style={{ color: themeColor }} /> Recent Performance</h3>{marks.length === 0 ? <p className="text-center text-gray-500 py-4">No marks available</p> : marks.slice(0, 4).map(m => (<div key={m.id} className="flex justify-between items-center p-2 border-b"><div><p className="text-sm font-medium">{m.subject}</p><p className="text-xs text-gray-500">{m.examType}</p></div><div className="text-right"><p className="text-sm font-bold" style={{ color: themeColor }}>{m.marksObtained}/{m.totalMarks}</p><p className="text-xs text-gray-500">{Math.round((m.marksObtained/m.totalMarks)*100)}%</p></div></div>))}</div></div>)}

      {activeTab === "attendance" && selectedChild && (<div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${themeColor}30` }}><h3 className="font-semibold mb-3"><FaClipboardList className="inline mr-2" style={{ color: themeColor }} /> Attendance</h3><div className="text-center mb-4"><div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4" style={{ borderColor: `${themeColor}30` }}><span className="text-3xl font-bold" style={{ color: themeColor }}>{attendancePercentage}%</span></div></div><div className="space-y-2 max-h-64 overflow-y-auto">{attendance.length === 0 ? <p className="text-center text-gray-500 py-4">No records</p> : attendance.slice().reverse().map(r => (<div key={r.id} className="flex justify-between p-2 border-b"><span>{r.date}</span><span className={r.status === "Present" ? "text-green-600" : "text-red-600"}>{r.status}</span></div>))}</div></div>)}

      {activeTab === "academics" && selectedChild && (<div className="space-y-4"><div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${themeColor}30` }}><h3 className="font-semibold mb-3"><FaBookOpen className="inline mr-2" style={{ color: themeColor }} /> Subject-wise Marks</h3>{marks.length === 0 ? <p className="text-center text-gray-500 py-4">No marks available</p> : marks.map(m => (<div key={m.id} className="mb-3"><div className="flex justify-between text-sm mb-1"><span className="font-medium">{m.subject}</span><span>{m.marksObtained}/{m.totalMarks} ({Math.round((m.marksObtained/m.totalMarks)*100)}%)</span></div><div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(m.marksObtained/m.totalMarks)*100}%`, backgroundColor: themeColor }} /></div></div>))}</div><div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${themeColor}30` }}><h3 className="font-semibold mb-3">Grade Summary</h3><div className="grid grid-cols-2 gap-3"><div className="text-center p-2 bg-gray-50 rounded-lg"><p className="text-2xl font-bold" style={{ color: themeColor }}>{getGrade(averageMarks)}</p><p className="text-xs text-gray-500">Overall Grade</p></div><div className="text-center p-2 bg-gray-50 rounded-lg"><p className="text-2xl font-bold" style={{ color: themeColor }}>{marks.length}</p><p className="text-xs text-gray-500">Subjects</p></div></div></div></div>)}

      {activeTab === "fees" && selectedChild && (<div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${themeColor}30` }}><h3 className="font-semibold mb-3"><FaMoneyBillWave className="inline mr-2" style={{ color: themeColor }} /> Fee Details</h3><div className="space-y-3"><div className="p-3 bg-gray-50 rounded-lg"><div className="flex justify-between items-center"><div><p className="font-medium text-sm">Term 1 2024</p><p className="text-xs text-gray-500">Due: 2024-04-15</p></div><div className="text-right"><p className="text-lg font-bold" style={{ color: themeColor }}>₹25,000</p><span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Pending</span></div></div></div><div className="p-3 bg-gray-50 rounded-lg"><div className="flex justify-between items-center"><div><p className="font-medium text-sm">Annual Charges</p><p className="text-xs text-gray-500">Due: 2024-03-30</p></div><div className="text-right"><p className="text-lg font-bold" style={{ color: themeColor }}>₹15,000</p><span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Paid</span></div></div></div></div><button className="w-full mt-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: themeColor }}>Download Fee Receipt</button></div>)}

      {activeTab === "communication" && (<div className="space-y-4"><div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${themeColor}30` }}><h3 className="font-semibold mb-3"><FaBell className="inline mr-2" style={{ color: themeColor }} /> Announcements</h3>{announcements.length === 0 ? <p className="text-center text-gray-500 py-4">No announcements</p> : announcements.map(ann => (<div key={ann.id} className="p-3 bg-gray-50 rounded-lg mb-2"><p className="font-medium text-sm">{ann.title}</p><p className="text-xs text-gray-600 mt-1">{ann.content}</p><p className="text-xs text-gray-400 mt-1">{ann.date}</p></div>))}</div><div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${themeColor}30` }}><h3 className="font-semibold mb-3"><FaRegCalendar className="inline mr-2" style={{ color: themeColor }} /> Parent-Teacher Meeting</h3><div className="p-3 bg-gray-50 rounded-lg"><p className="font-medium text-sm">📢 Annual Parent-Teacher Meeting</p><p className="text-xs text-gray-600 mt-1">Date: March 25th, 2024 at 10:00 AM</p><p className="text-xs text-gray-600">Venue: School Auditorium</p><button className="mt-3 px-4 py-1.5 rounded-lg text-white text-xs" style={{ backgroundColor: themeColor }}>Schedule Meeting</button></div></div></div>)}

      <button onClick={handleLogout} className="w-full mt-5 py-3 rounded-lg font-medium text-red-600 border border-red-200 hover:bg-red-50 flex items-center justify-center gap-2"><FaSignOutAlt size={14} /> Logout</button>
    </div>
  );
};

export default ParentDashboard;