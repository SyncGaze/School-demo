import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaArrowLeft } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const StudentManagement = () => {
  const navigate = useNavigate();
  const { themeColor } = useApp();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: "", rollNo: "", class: "10A", email: "", parentEmail: "", phone: "", address: "" });

  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored) setStudents(JSON.parse(stored));
    else {
      const dummy = [
        { id: "1", name: "Emma Watson", rollNo: "101", class: "10A", email: "emma@example.com", parentEmail: "parent.emma@example.com", phone: "+1 234-567-8901", address: "123 Main St", attendance: 92, marks: 85 },
        { id: "2", name: "James Wilson", rollNo: "102", class: "10A", email: "james@example.com", parentEmail: "parent.james@example.com", phone: "+1 234-567-8902", address: "456 Oak Ave", attendance: 88, marks: 78 },
        { id: "3", name: "Sophia Chen", rollNo: "103", class: "10B", email: "sophia@example.com", parentEmail: "parent.sophia@example.com", phone: "+1 234-567-8903", address: "789 Pine Rd", attendance: 95, marks: 92 }
      ];
      setStudents(dummy);
      localStorage.setItem("students", JSON.stringify(dummy));
    }
  }, []);

  const saveStudents = (updated) => { setStudents(updated); localStorage.setItem("students", JSON.stringify(updated)); };
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const openAddModal = () => { setEditingStudent(null); setFormData({ name: "", rollNo: "", class: "10A", email: "", parentEmail: "", phone: "", address: "" }); setIsModalOpen(true); };
  const openEditModal = (student) => { setEditingStudent(student); setFormData(student); setIsModalOpen(true); };
  const saveStudent = () => {
    if (!formData.name || !formData.rollNo || !formData.class) { toast.error("Please fill required fields"); return; }
    if (editingStudent) saveStudents(students.map(s => s.id === editingStudent.id ? { ...formData, id: s.id } : s));
    else saveStudents([...students, { ...formData, id: Date.now().toString(), attendance: 0, marks: 0 }]);
    toast.success(editingStudent ? "Student updated!" : "Student added!");
    setIsModalOpen(false);
  };
  const deleteStudent = (id) => { if (window.confirm("Delete?")) saveStudents(students.filter(s => s.id !== id)); toast.success("Deleted!"); };
  const filtered = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.rollNo.includes(searchTerm) || s.class.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate("/admin/dashboard")} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><FaArrowLeft className="text-gray-600" /></button>
        <h1 className="text-xl font-bold text-gray-800">Student Management</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl p-3 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}><p className="text-2xl font-bold">{students.length}</p><p className="text-xs">Total Students</p></div>
        <div className="rounded-xl p-3 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}><p className="text-2xl font-bold">{[...new Set(students.map(s => s.class))].length}</p><p className="text-xs">Classes</p></div>
        <div className="rounded-xl p-3 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}><p className="text-2xl font-bold">{Math.round(students.reduce((a, s) => a + (s.attendance || 0), 0) / students.length || 0)}%</p><p className="text-xs">Avg Attendance</p></div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative"><FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2" style={{ focusRingColor: themeColor }} /></div>
        <button onClick={openAddModal} className="px-4 py-2 text-white rounded-lg text-sm font-medium flex items-center gap-1" style={{ backgroundColor: themeColor }}><FaPlus size={12} /> Add</button>
      </div>

      <div className="space-y-3">
        {filtered.map(s => (
          <div key={s.id} className="bg-white rounded-xl p-4 shadow-sm border" style={{ borderLeftColor: themeColor, borderLeftWidth: "4px" }}>
            <div className="flex justify-between items-start">
              <div><div className="flex items-center gap-2"><h3 className="font-semibold">{s.name}</h3><span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{s.class}</span></div><p className="text-xs text-gray-500">Roll: {s.rollNo}</p><p className="text-xs text-gray-500">{s.email}</p><div className="flex gap-3 mt-2"><span className="text-xs text-green-600">📊 {s.attendance || 0}%</span><span className="text-xs text-blue-600">📚 {s.marks || 0}%</span></div></div>
              <div className="flex gap-2"><button onClick={() => openEditModal(s)} className="p-2 rounded-lg" style={{ color: themeColor }}><FaEdit size={14} /></button><button onClick={() => deleteStudent(s.id)} className="p-2 text-red-500"><FaTrash size={14} /></button></div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-5"><h2 className="text-lg font-bold mb-4" style={{ color: themeColor }}>{editingStudent ? "Edit" : "Add"} Student</h2>
              <div className="space-y-3"><input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg" /><input type="text" name="rollNo" placeholder="Roll No *" value={formData.rollNo} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
              <select name="class" value={formData.class} onChange={handleInputChange} className="w-full p-2 border rounded-lg"><option>10A</option><option>10B</option><option>10C</option></select>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
              <input type="email" name="parentEmail" placeholder="Parent Email" value={formData.parentEmail} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="w-full p-2 border rounded-lg" />
              <textarea name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} rows="2" className="w-full p-2 border rounded-lg" /></div>
              <div className="flex gap-2 mt-5"><button onClick={saveStudent} className="flex-1 text-white py-2 rounded-lg" style={{ backgroundColor: themeColor }}>Save</button><button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 py-2 rounded-lg">Cancel</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;