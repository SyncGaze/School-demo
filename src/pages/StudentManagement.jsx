import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaArrowLeft, FaTimes } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import CustomConfirmModal from "../components/CustomConfirmModal";

const StudentManagement = () => {
  const navigate = useNavigate();
  const { themeColor } = useApp();
  const { showToast } = useToast();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    class: "10A",
    email: "",
    parentEmail: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      // 50 Students Dummy Data
      const dummyStudents = [
        // Class 10A (15 students)
        { id: "1", name: "Emma Watson", rollNo: "101", class: "10A", email: "emma@example.com", parentEmail: "parent.emma@example.com", phone: "+1 234-567-8901", address: "123 Main St", attendance: 92, marks: 85 },
        { id: "2", name: "James Wilson", rollNo: "102", class: "10A", email: "james@example.com", parentEmail: "parent.james@example.com", phone: "+1 234-567-8902", address: "456 Oak Ave", attendance: 88, marks: 78 },
        { id: "3", name: "Olivia Martinez", rollNo: "103", class: "10A", email: "olivia@example.com", parentEmail: "parent.olivia@example.com", phone: "+1 234-567-8903", address: "654 Cedar Ln", attendance: 94, marks: 88 },
        { id: "4", name: "Liam Rodriguez", rollNo: "104", class: "10A", email: "liam@example.com", parentEmail: "parent.liam@example.com", phone: "+1 234-567-8904", address: "321 Elm St", attendance: 76, marks: 70 },
        { id: "5", name: "Sophia Chen", rollNo: "105", class: "10A", email: "sophia@example.com", parentEmail: "parent.sophia@example.com", phone: "+1 234-567-8905", address: "789 Pine Rd", attendance: 95, marks: 92 },
        { id: "6", name: "Noah Williams", rollNo: "106", class: "10A", email: "noah@example.com", parentEmail: "parent.noah@example.com", phone: "+1 234-567-8906", address: "987 Birch Dr", attendance: 82, marks: 79 },
        { id: "7", name: "Ava Brown", rollNo: "107", class: "10A", email: "ava@example.com", parentEmail: "parent.ava@example.com", phone: "+1 234-567-8907", address: "111 Maple Ave", attendance: 91, marks: 87 },
        { id: "8", name: "Mason Davis", rollNo: "108", class: "10A", email: "mason@example.com", parentEmail: "parent.mason@example.com", phone: "+1 234-567-8908", address: "222 Birch St", attendance: 79, marks: 74 },
        { id: "9", name: "Isabella Garcia", rollNo: "109", class: "10A", email: "isabella@example.com", parentEmail: "parent.isabella@example.com", phone: "+1 234-567-8909", address: "333 Pine Ave", attendance: 96, marks: 93 },
        { id: "10", name: "Ethan Miller", rollNo: "110", class: "10A", email: "ethan@example.com", parentEmail: "parent.ethan@example.com", phone: "+1 234-567-8910", address: "444 Oak Dr", attendance: 85, marks: 81 },
        { id: "11", name: "Mia Johnson", rollNo: "111", class: "10A", email: "mia@example.com", parentEmail: "parent.mia@example.com", phone: "+1 234-567-8911", address: "555 Elm Rd", attendance: 89, marks: 84 },
        { id: "12", name: "Lucas Wilson", rollNo: "112", class: "10A", email: "lucas@example.com", parentEmail: "parent.lucas@example.com", phone: "+1 234-567-8912", address: "666 Cedar Ln", attendance: 77, marks: 72 },
        { id: "13", name: "Amelia Moore", rollNo: "113", class: "10A", email: "amelia@example.com", parentEmail: "parent.amelia@example.com", phone: "+1 234-567-8913", address: "777 Spruce St", attendance: 93, marks: 90 },
        { id: "14", name: "Benjamin Taylor", rollNo: "114", class: "10A", email: "benjamin@example.com", parentEmail: "parent.benjamin@example.com", phone: "+1 234-567-8914", address: "888 Willow Ave", attendance: 81, marks: 76 },
        { id: "15", name: "Charlotte Anderson", rollNo: "115", class: "10A", email: "charlotte@example.com", parentEmail: "parent.charlotte@example.com", phone: "+1 234-567-8915", address: "999 Ash Rd", attendance: 87, marks: 83 },
        
        // Class 10B (10 students)
        { id: "16", name: "Daniel Thomas", rollNo: "201", class: "10B", email: "daniel@example.com", parentEmail: "parent.daniel@example.com", phone: "+1 234-567-8916", address: "123 Oak St", attendance: 78, marks: 75 },
        { id: "17", name: "Harper Jackson", rollNo: "202", class: "10B", email: "harper@example.com", parentEmail: "parent.harper@example.com", phone: "+1 234-567-8917", address: "456 Pine Ave", attendance: 90, marks: 86 },
        { id: "18", name: "Alexander White", rollNo: "203", class: "10B", email: "alexander@example.com", parentEmail: "parent.alexander@example.com", phone: "+1 234-567-8918", address: "789 Elm Dr", attendance: 84, marks: 80 },
        { id: "19", name: "Evelyn Harris", rollNo: "204", class: "10B", email: "evelyn@example.com", parentEmail: "parent.evelyn@example.com", phone: "+1 234-567-8919", address: "321 Maple Rd", attendance: 92, marks: 89 },
        { id: "20", name: "Michael Martin", rollNo: "205", class: "10B", email: "michael@example.com", parentEmail: "parent.michael@example.com", phone: "+1 234-567-8920", address: "654 Birch Ave", attendance: 75, marks: 71 },
        { id: "21", name: "Abigail Thompson", rollNo: "206", class: "10B", email: "abigail@example.com", parentEmail: "parent.abigail@example.com", phone: "+1 234-567-8921", address: "987 Cedar St", attendance: 88, marks: 85 },
        { id: "22", name: "Elijah Garcia", rollNo: "207", class: "10B", email: "elijah@example.com", parentEmail: "parent.elijah@example.com", phone: "+1 234-567-8922", address: "111 Spruce Ln", attendance: 83, marks: 79 },
        { id: "23", name: "Sofia Martinez", rollNo: "208", class: "10B", email: "sofia@example.com", parentEmail: "parent.sofia@example.com", phone: "+1 234-567-8923", address: "222 Willow Dr", attendance: 91, marks: 88 },
        { id: "24", name: "Logan Robinson", rollNo: "209", class: "10B", email: "logan@example.com", parentEmail: "parent.logan@example.com", phone: "+1 234-567-8924", address: "333 Ash Ave", attendance: 79, marks: 74 },
        { id: "25", name: "Victoria Clark", rollNo: "210", class: "10B", email: "victoria@example.com", parentEmail: "parent.victoria@example.com", phone: "+1 234-567-8925", address: "444 Oak Rd", attendance: 86, marks: 82 },
        
        // Class 10C (10 students)
        { id: "26", name: "Jackson Lewis", rollNo: "301", class: "10C", email: "jackson@example.com", parentEmail: "parent.jackson@example.com", phone: "+1 234-567-8926", address: "555 Pine St", attendance: 82, marks: 78 },
        { id: "27", name: "Scarlett Walker", rollNo: "302", class: "10C", email: "scarlett@example.com", parentEmail: "parent.scarlett@example.com", phone: "+1 234-567-8927", address: "666 Elm Ave", attendance: 89, marks: 86 },
        { id: "28", name: "Carter Young", rollNo: "303", class: "10C", email: "carter@example.com", parentEmail: "parent.carter@example.com", phone: "+1 234-567-8928", address: "777 Maple Dr", attendance: 77, marks: 73 },
        { id: "29", name: "Grace King", rollNo: "304", class: "10C", email: "grace@example.com", parentEmail: "parent.grace@example.com", phone: "+1 234-567-8929", address: "888 Birch Rd", attendance: 93, marks: 90 },
        { id: "30", name: "Luke Wright", rollNo: "305", class: "10C", email: "luke@example.com", parentEmail: "parent.luke@example.com", phone: "+1 234-567-8930", address: "999 Cedar Ln", attendance: 80, marks: 76 },
        { id: "31", name: "Zoey Lopez", rollNo: "306", class: "10C", email: "zoey@example.com", parentEmail: "parent.zoey@example.com", phone: "+1 234-567-8931", address: "123 Spruce St", attendance: 87, marks: 84 },
        { id: "32", name: "Gabriel Hill", rollNo: "307", class: "10C", email: "gabriel@example.com", parentEmail: "parent.gabriel@example.com", phone: "+1 234-567-8932", address: "456 Willow Ave", attendance: 84, marks: 80 },
        { id: "33", name: "Lily Scott", rollNo: "308", class: "10C", email: "lily@example.com", parentEmail: "parent.lily@example.com", phone: "+1 234-567-8933", address: "789 Ash Dr", attendance: 91, marks: 88 },
        { id: "34", name: "Isaac Green", rollNo: "309", class: "10C", email: "isaac@example.com", parentEmail: "parent.isaac@example.com", phone: "+1 234-567-8934", address: "321 Oak Ln", attendance: 78, marks: 74 },
        { id: "35", name: "Aria Adams", rollNo: "310", class: "10C", email: "aria@example.com", parentEmail: "parent.aria@example.com", phone: "+1 234-567-8935", address: "654 Pine Rd", attendance: 86, marks: 83 },
        
        // Class 9A (5 students)
        { id: "36", name: "Julian Baker", rollNo: "401", class: "9A", email: "julian@example.com", parentEmail: "parent.julian@example.com", phone: "+1 234-567-8936", address: "987 Elm St", attendance: 88, marks: 84 },
        { id: "37", name: "Ellie Nelson", rollNo: "402", class: "9A", email: "ellie@example.com", parentEmail: "parent.ellie@example.com", phone: "+1 234-567-8937", address: "111 Maple Ave", attendance: 92, marks: 89 },
        { id: "38", name: "Nathan Carter", rollNo: "403", class: "9A", email: "nathan@example.com", parentEmail: "parent.nathan@example.com", phone: "+1 234-567-8938", address: "222 Birch Dr", attendance: 79, marks: 75 },
        { id: "39", name: "Hannah Mitchell", rollNo: "404", class: "9A", email: "hannah@example.com", parentEmail: "parent.hannah@example.com", phone: "+1 234-567-8939", address: "333 Cedar Rd", attendance: 85, marks: 81 },
        { id: "40", name: "Dylan Perez", rollNo: "405", class: "9A", email: "dylan@example.com", parentEmail: "parent.dylan@example.com", phone: "+1 234-567-8940", address: "444 Oak St", attendance: 90, marks: 87 },
        
        // Class 9B (5 students)
        { id: "41", name: "Madison Roberts", rollNo: "501", class: "9B", email: "madison@example.com", parentEmail: "parent.madison@example.com", phone: "+1 234-567-8941", address: "555 Pine Ave", attendance: 83, marks: 79 },
        { id: "42", name: "Christian Phillips", rollNo: "502", class: "9B", email: "christian@example.com", parentEmail: "parent.christian@example.com", phone: "+1 234-567-8942", address: "666 Elm Rd", attendance: 87, marks: 84 },
        { id: "43", name: "Audrey Campbell", rollNo: "503", class: "9B", email: "audrey@example.com", parentEmail: "parent.audrey@example.com", phone: "+1 234-567-8943", address: "777 Maple Ln", attendance: 91, marks: 88 },
        { id: "44", name: "Samuel Parker", rollNo: "504", class: "9B", email: "samuel@example.com", parentEmail: "parent.samuel@example.com", phone: "+1 234-567-8944", address: "888 Birch St", attendance: 76, marks: 72 },
        { id: "45", name: "Claire Evans", rollNo: "505", class: "9B", email: "claire@example.com", parentEmail: "parent.claire@example.com", phone: "+1 234-567-8945", address: "999 Cedar Ave", attendance: 89, marks: 86 },
        
        // Class 8A (5 students)
        { id: "46", name: "Connor Edwards", rollNo: "601", class: "8A", email: "connor@example.com", parentEmail: "parent.connor@example.com", phone: "+1 234-567-8946", address: "123 Oak Dr", attendance: 84, marks: 80 },
        { id: "47", name: "Natalie Collins", rollNo: "602", class: "8A", email: "natalie@example.com", parentEmail: "parent.natalie@example.com", phone: "+1 234-567-8947", address: "456 Pine Rd", attendance: 92, marks: 89 },
        { id: "48", name: "Zachary Stewart", rollNo: "603", class: "8A", email: "zachary@example.com", parentEmail: "parent.zachary@example.com", phone: "+1 234-567-8948", address: "789 Elm Ave", attendance: 78, marks: 74 },
        { id: "49", name: "Bella Sanchez", rollNo: "604", class: "8A", email: "bella@example.com", parentEmail: "parent.bella@example.com", phone: "+1 234-567-8949", address: "321 Maple St", attendance: 86, marks: 83 },
        { id: "50", name: "Owen Morris", rollNo: "605", class: "8A", email: "owen@example.com", parentEmail: "parent.owen@example.com", phone: "+1 234-567-8950", address: "654 Birch Ave", attendance: 90, marks: 87 }
      ];
      setStudents(dummyStudents);
      localStorage.setItem("students", JSON.stringify(dummyStudents));
    }
  }, []);

  const saveStudents = (updatedStudents) => {
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setFormData({
      name: "",
      rollNo: "",
      class: "10A",
      email: "",
      parentEmail: "",
      phone: "",
      address: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setIsModalOpen(true);
  };

  const saveStudent = () => {
    if (!formData.name || !formData.rollNo || !formData.class) {
      showToast("Please fill required fields", "error");
      return;
    }

    if (editingStudent) {
      const updatedStudents = students.map(s =>
        s.id === editingStudent.id ? { ...formData, id: s.id } : s
      );
      saveStudents(updatedStudents);
      showToast("Student updated successfully!", "success");
    } else {
      const newStudent = {
        ...formData,
        id: Date.now().toString(),
        attendance: 0,
        marks: 0
      };
      saveStudents([...students, newStudent]);
      showToast("Student added successfully!", "success");
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    saveStudents(students.filter(s => s.id !== deleteId));
    showToast("Student deleted successfully!", "success");
    setIsConfirmOpen(false);
    setDeleteId(null);
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNo.includes(searchTerm) ||
    s.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const classes = [...new Set(students.map(s => s.class))];

  return (
    <div className="p-4 pb-20 relative min-h-full">
      <CustomConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate("/admin/dashboard")} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <FaArrowLeft className="text-gray-600 text-sm" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Student Management</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl p-3 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          <p className="text-2xl font-bold">{students.length}</p>
          <p className="text-xs opacity-90">Total Students</p>
        </div>
        <div className="rounded-xl p-3 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          <p className="text-2xl font-bold">{classes.length}</p>
          <p className="text-xs opacity-90">Total Classes</p>
        </div>
        <div className="rounded-xl p-3 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}>
          <p className="text-2xl font-bold">
            {Math.round(students.reduce((acc, s) => acc + (s.attendance || 0), 0) / students.length || 0)}%
          </p>
          <p className="text-xs opacity-90">Avg Attendance</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name, roll no or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button onClick={openAddModal} className="px-4 py-2 text-white rounded-lg text-sm font-medium flex items-center gap-1" style={{ backgroundColor: themeColor }}>
          <FaPlus size={12} /> Add
        </button>
      </div>

      <div className="space-y-3">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No students found</div>
        ) : (
          filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-xl p-4 shadow-sm border" style={{ borderLeftColor: themeColor, borderLeftWidth: "4px" }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{student.name}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{student.class}</span>
                  </div>
                  <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
                  <p className="text-xs text-gray-500 mt-1">{student.email}</p>
                  <div className="flex gap-3 mt-2">
                    <span className="text-xs text-green-600">📊 {student.attendance || 0}% Attendance</span>
                    <span className="text-xs text-blue-600">📚 {student.marks || 0}% Avg</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(student)} className="p-2 rounded-lg transition" style={{ color: themeColor }}>
                    <FaEdit size={14} />
                  </button>
                  <button onClick={() => handleDeleteClick(student.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} onClick={() => setIsModalOpen(false)} />
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[320px]">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="px-4 py-3 flex justify-between items-center border-b" style={{ backgroundColor: `${themeColor}10` }}>
                <h2 className="text-md font-bold" style={{ color: themeColor }}>{editingStudent ? "Edit Student" : "Add Student"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400"><FaTimes size={16} /></button>
              </div>
              <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ focusRingColor: themeColor }} />
                <input type="text" name="rollNo" placeholder="Roll Number *" value={formData.rollNo} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                <select name="class" value={formData.class} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                  <option value="10A">Class 10A</option>
                  <option value="10B">Class 10B</option>
                  <option value="10C">Class 10C</option>
                  <option value="9A">Class 9A</option>
                  <option value="9B">Class 9B</option>
                  <option value="8A">Class 8A</option>
                </select>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                <input type="email" name="parentEmail" placeholder="Parent Email" value={formData.parentEmail} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} rows="2" className="w-full p-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="px-4 py-3 border-t flex gap-2">
                <button onClick={saveStudent} className="flex-1 text-white py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: themeColor }}>Save</button>
                <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium">Cancel</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentManagement;