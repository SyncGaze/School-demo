import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave, FaUsers, FaGraduationCap } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const TeacherMarks = () => {
  const navigate = useNavigate();
  const { themeColor } = useApp();
  const [teacherData, setTeacherData] = useState(null);
  const [students, setStudents] = useState([]);
  const [examType, setExamType] = useState("Midterm");
  const [marksData, setMarksData] = useState({});

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

  const handleMarksChange = (studentId, marks) => {
    setMarksData({ ...marksData, [studentId]: marks });
  };

  const submitMarks = () => {
    if (Object.keys(marksData).length === 0) { toast.error("Please enter marks"); return; }
    const savedMarks = localStorage.getItem("marks");
    let allMarks = savedMarks ? JSON.parse(savedMarks) : [];
    Object.entries(marksData).forEach(([studentId, marksObtained]) => {
      allMarks.push({ id: Date.now().toString() + Math.random(), studentId, subject: teacherData?.subject, marksObtained: parseInt(marksObtained), totalMarks: 100, examType, date: new Date().toISOString().split('T')[0], class: teacherData?.assignedClass });
    });
    localStorage.setItem("marks", JSON.stringify(allMarks));
    toast.success(`Marks saved for ${Object.keys(marksData).length} students!`);
    setMarksData({});
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate("/faculty/dashboard")} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><FaArrowLeft className="text-gray-600" /></button>
        <h1 className="text-xl font-bold text-gray-800">Upload Marks</h1>
      </div>

      <div className="rounded-xl p-4 mb-5 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
        <div className="flex justify-between items-center">
          <div><p className="text-sm opacity-90">Class</p><p className="text-2xl font-bold">{teacherData?.assignedClass || "10A"}</p><p className="text-xs opacity-80">{teacherData?.subject || "Mathematics"}</p></div>
          <div className="text-right"><p className="text-sm opacity-90">Total Students</p><p className="text-2xl font-bold">{students.length}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border mb-4" style={{ borderColor: `${themeColor}30` }}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Exam Type</label>
        <select value={examType} onChange={(e) => setExamType(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2" style={{ focusRingColor: themeColor }}>
          <option>Midterm Examination</option><option>Final Examination</option><option>Weekly Quiz</option><option>Assignment</option><option>Class Test</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: `${themeColor}30` }}>
        <div className="bg-gray-50 px-4 py-3 border-b"><h3 className="font-semibold text-gray-800 flex items-center gap-2"><FaGraduationCap style={{ color: themeColor }} /> Enter Marks (Out of 100)</h3></div>
        <div className="divide-y">
          {students.map(student => (
            <div key={student.id} className="p-4 flex justify-between items-center">
              <div><p className="font-medium text-gray-800">{student.name}</p><p className="text-xs text-gray-500">Roll: {student.rollNo}</p></div>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Marks" value={marksData[student.id] || ""} onChange={(e) => handleMarksChange(student.id, e.target.value)} className="w-24 p-2 border rounded-lg text-sm text-center" min="0" max="100" />
                <span className="text-xs text-gray-500">/100</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={submitMarks} disabled={Object.keys(marksData).length === 0} className={`w-full mt-5 py-3 rounded-lg font-medium flex items-center justify-center gap-2 text-white ${Object.keys(marksData).length === 0 ? "bg-gray-300 cursor-not-allowed" : ""}`} style={Object.keys(marksData).length === 0 ? {} : { backgroundColor: themeColor }}>
        <FaSave size={14} /> Save Marks
      </button>
    </div>
  );
};

export default TeacherMarks;