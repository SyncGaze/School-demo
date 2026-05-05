import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaArrowLeft,
  FaTimes,
  FaClock,
} from "react-icons/fa";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import CustomConfirmModal from "../components/CustomConfirmModal";

const StaffManagement = () => {
  const navigate = useNavigate();
  const { themeColor } = useApp();
  const { showToast } = useToast();
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "Teacher",
    subject: "",
    assignedClass: "",
    email: "",
    phone: "",
    qualification: "",
    joinDate: "",
    availability: [],
  });

  const availableDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  useEffect(() => {
    const storedStaff = localStorage.getItem("staff");
    if (storedStaff) {
      setStaff(JSON.parse(storedStaff));
    } else {
      // 10 Teachers + Support Staff
      const dummyStaff = [
        // Teachers (10)
        {
          id: "t1",
          name: "Dr. Sarah Johnson",
          role: "Teacher",
          subject: "Mathematics",
          assignedClass: "10A",
          email: "sarah@school.edu",
          phone: "+1 234-567-8900",
          qualification: "Ph.D. in Mathematics",
          joinDate: "2015-08-15",
          availability: ["Monday", "Wednesday", "Friday"],
        },
        {
          id: "t2",
          name: "Prof. Michael Brown",
          role: "Teacher",
          subject: "Physics",
          assignedClass: "10B",
          email: "michael@school.edu",
          phone: "+1 234-567-8901",
          qualification: "M.Sc. in Physics",
          joinDate: "2018-09-01",
          availability: ["Tuesday", "Thursday"],
        },
        {
          id: "t3",
          name: "Ms. Emily Davis",
          role: "Teacher",
          subject: "English",
          assignedClass: "10A",
          email: "emily@school.edu",
          phone: "+1 234-567-8902",
          qualification: "M.A. in English",
          joinDate: "2019-07-20",
          availability: ["Monday", "Tuesday", "Thursday"],
        },
        {
          id: "t4",
          name: "Dr. Robert Chen",
          role: "Teacher",
          subject: "Chemistry",
          assignedClass: "10B",
          email: "robert@school.edu",
          phone: "+1 234-567-8903",
          qualification: "Ph.D. in Chemistry",
          joinDate: "2017-03-10",
          availability: ["Wednesday", "Friday"],
        },
        {
          id: "t5",
          name: "Ms. Lisa Wong",
          role: "Teacher",
          subject: "Computer Science",
          assignedClass: "10C",
          email: "lisa@school.edu",
          phone: "+1 234-567-8904",
          qualification: "M.Tech in CS",
          joinDate: "2020-01-15",
          availability: ["Monday", "Wednesday", "Friday"],
        },
        {
          id: "t6",
          name: "Dr. James Miller",
          role: "Teacher",
          subject: "Biology",
          assignedClass: "9A",
          email: "james@school.edu",
          phone: "+1 234-567-8905",
          qualification: "Ph.D. in Biology",
          joinDate: "2016-06-10",
          availability: ["Tuesday", "Thursday", "Friday"],
        },
        {
          id: "t7",
          name: "Mr. John Adams",
          role: "Teacher",
          subject: "History",
          assignedClass: "9B",
          email: "john@school.edu",
          phone: "+1 234-567-8906",
          qualification: "M.A. in History",
          joinDate: "2018-11-05",
          availability: ["Monday", "Wednesday"],
        },
        {
          id: "t8",
          name: "Ms. Patricia Clark",
          role: "Teacher",
          subject: "Geography",
          assignedClass: "8A",
          email: "patricia@school.edu",
          phone: "+1 234-567-8907",
          qualification: "M.Sc. in Geography",
          joinDate: "2019-02-20",
          availability: ["Tuesday", "Thursday"],
        },
        {
          id: "t9",
          name: "Dr. David Wilson",
          role: "Teacher",
          subject: "Economics",
          assignedClass: "8B",
          email: "david@school.edu",
          phone: "+1 234-567-8908",
          qualification: "Ph.D. in Economics",
          joinDate: "2017-09-15",
          availability: ["Monday", "Wednesday", "Friday"],
        },
        {
          id: "t10",
          name: "Ms. Sarah Lee",
          role: "Teacher",
          subject: "Art",
          assignedClass: "7A",
          email: "sarah.lee@school.edu",
          phone: "+1 234-567-8909",
          qualification: "MFA",
          joinDate: "2020-08-01",
          availability: ["Monday", "Tuesday", "Wednesday"],
        },

        // Administrative Staff
        {
          id: "a1",
          name: "Mr. Robert Wilson",
          role: "Administrator",
          subject: "",
          assignedClass: "",
          email: "robert@school.edu",
          phone: "+1 234-567-8910",
          qualification: "MBA",
          joinDate: "2010-01-10",
          availability: [],
        },
        {
          id: "a2",
          name: "Ms. Jennifer Lopez",
          role: "Administrator",
          subject: "",
          assignedClass: "",
          email: "jennifer@school.edu",
          phone: "+1 234-567-8911",
          qualification: "MPA",
          joinDate: "2015-03-15",
          availability: [],
        },

        // Library Staff
        {
          id: "l1",
          name: "Ms. Jessica Lee",
          role: "Librarian",
          subject: "",
          assignedClass: "",
          email: "jessica@school.edu",
          phone: "+1 234-567-8912",
          qualification: "MLIS",
          joinDate: "2017-03-15",
          availability: [],
        },
        {
          id: "l2",
          name: "Mr. Thomas Brown",
          role: "Librarian",
          subject: "",
          assignedClass: "",
          email: "thomas@school.edu",
          phone: "+1 234-567-8913",
          qualification: "MLIS",
          joinDate: "2019-08-20",
          availability: [],
        },

        // Counselor
        {
          id: "c1",
          name: "Ms. Amanda White",
          role: "Counselor",
          subject: "",
          assignedClass: "",
          email: "amanda@school.edu",
          phone: "+1 234-567-8914",
          qualification: "M.Ed. Counseling",
          joinDate: "2018-11-01",
          availability: [],
        },

        // Support Staff
        {
          id: "s1",
          name: "Mr. Mark Taylor",
          role: "Support Staff",
          subject: "",
          assignedClass: "",
          email: "mark@school.edu",
          phone: "+1 234-567-8915",
          qualification: "IT Support",
          joinDate: "2019-05-10",
          availability: [],
        },
        {
          id: "s2",
          name: "Mr. Kevin Johnson",
          role: "Support Staff",
          subject: "",
          assignedClass: "",
          email: "kevin@school.edu",
          phone: "+1 234-567-8916",
          qualification: "Facility Management",
          joinDate: "2018-07-15",
          availability: [],
        },
      ];
      setStaff(dummyStaff);
      localStorage.setItem("staff", JSON.stringify(dummyStaff));
    }
  }, []);

  const saveStaff = (updatedStaff) => {
    setStaff(updatedStaff);
    localStorage.setItem("staff", JSON.stringify(updatedStaff));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvailabilityChange = (day) => {
    if (formData.availability.includes(day)) {
      setFormData({
        ...formData,
        availability: formData.availability.filter((d) => d !== day),
      });
    } else {
      setFormData({
        ...formData,
        availability: [...formData.availability, day],
      });
    }
  };

  const openAddModal = () => {
    setEditingStaff(null);
    setFormData({
      name: "",
      role: "Teacher",
      subject: "",
      assignedClass: "",
      email: "",
      phone: "",
      qualification: "",
      joinDate: "",
      availability: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (staffMember) => {
    setEditingStaff(staffMember);
    setFormData({
      ...staffMember,
      availability: staffMember.availability || [],
    });
    setIsModalOpen(true);
  };

  const saveStaffMember = () => {
    if (!formData.name || !formData.role) {
      showToast("Please fill required fields", "error");
      return;
    }

    if (formData.role === "Teacher" && formData.availability.length === 0) {
      showToast("Please select available days for this teacher", "warning");
    }

    if (editingStaff) {
      const updatedStaff = staff.map((s) =>
        s.id === editingStaff.id ? { ...formData, id: s.id } : s,
      );
      saveStaff(updatedStaff);
      showToast("Staff updated successfully!", "success");
    } else {
      const newStaff = { ...formData, id: Date.now().toString() };
      saveStaff([...staff, newStaff]);
      showToast("Staff added successfully!", "success");
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    saveStaff(staff.filter((s) => s.id !== deleteId));
    showToast("Staff deleted successfully!", "success");
    setIsConfirmOpen(false);
    setDeleteId(null);
  };

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.subject && s.subject.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="p-4 pb-20 relative min-h-full">
      <CustomConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Staff"
        message="Are you sure you want to delete this staff member? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <FaArrowLeft className="text-gray-600 text-sm" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Staff Management</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div
          className="rounded-xl p-3 text-white"
          style={{
            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
          }}
        >
          <p className="text-2xl font-bold">{staff.length}</p>
          <p className="text-xs opacity-90">Total Staff</p>
        </div>
        <div
          className="rounded-xl p-3 text-white"
          style={{
            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
          }}
        >
          <p className="text-2xl font-bold">
            {staff.filter((s) => s.role === "Teacher").length}
          </p>
          <p className="text-xs opacity-90">Teachers</p>
        </div>
        <div
          className="rounded-xl p-3 text-white"
          style={{
            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
          }}
        >
          <p className="text-2xl font-bold">
            {[...new Set(staff.map((s) => s.role))].length}
          </p>
          <p className="text-xs opacity-90">Roles</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name, role or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2"
            style={{ focusRingColor: themeColor }}
          />
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 text-white rounded-lg text-sm font-medium flex items-center gap-1"
          style={{ backgroundColor: themeColor }}
        >
          <FaPlus size={12} /> Add
        </button>
      </div>

      <div className="space-y-3">
        {filteredStaff.map((staffMember) => (
          <div
            key={staffMember.id}
            className="bg-white rounded-xl p-4 shadow-sm border"
            style={{ borderLeftColor: themeColor, borderLeftWidth: "4px" }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800">
                    {staffMember.name}
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${themeColor}20`,
                      color: themeColor,
                    }}
                  >
                    {staffMember.role}
                  </span>
                </div>
                {staffMember.role === "Teacher" ? (
                  <>
                    <p className="text-xs text-gray-500">
                      📚 {staffMember.subject || "Subject not set"}
                    </p>
                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                      <FaClock className="text-xs text-gray-400" />
                      <span className="text-xs text-gray-500">Available: </span>
                      {staffMember.availability &&
                      staffMember.availability.length > 0 ? (
                        staffMember.availability.map((day, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700"
                          >
                            {day.substring(0, 3)}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-red-400">
                          No availability set
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {staffMember.subject && (
                      <p className="text-xs text-gray-500">
                        📚 {staffMember.subject}
                      </p>
                    )}
                    {staffMember.assignedClass && (
                      <p className="text-xs text-gray-500">
                        🏫 Class: {staffMember.assignedClass}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      📧 {staffMember.email || "No email"}
                    </p>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(staffMember)}
                  className="p-2 rounded-lg transition"
                  style={{ color: themeColor }}
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleDeleteClick(staffMember.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => setIsModalOpen(false)}
          />
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[320px]">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
              <div
                className="px-4 py-3 flex justify-between items-center border-b sticky top-0 bg-white"
                style={{ backgroundColor: `${themeColor}10` }}
              >
                <h2 className="text-md font-bold" style={{ color: themeColor }}>
                  {editingStaff ? "Edit Staff" : "Add Staff"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400"
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <div className="p-4 space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-sm"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-sm"
                >
                  <option value="Teacher">Teacher</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Librarian">Librarian</option>
                  <option value="Counselor">Counselor</option>
                  <option value="Support Staff">Support Staff</option>
                </select>
                {formData.role === "Teacher" && (
                  <>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg text-sm"
                    />
                    <select
                      name="assignedClass"
                      value={formData.assignedClass}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg text-sm"
                    >
                      <option value="">Select Class</option>
                      <option value="10A">Class 10A</option>
                      <option value="10B">Class 10B</option>
                      <option value="10C">Class 10C</option>
                      <option value="9A">Class 9A</option>
                      <option value="9B">Class 9B</option>
                      <option value="8A">Class 8A</option>
                      <option value="8B">Class 8B</option>
                      <option value="7A">Class 7A</option>
                    </select>
                    <div className="border rounded-lg p-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Available Days
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {availableDays.map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleAvailabilityChange(day)}
                            className={`px-2 py-0.5 rounded-full text-xs transition ${formData.availability.includes(day) ? "text-white" : "bg-gray-100 text-gray-600"}`}
                            style={
                              formData.availability.includes(day)
                                ? { backgroundColor: themeColor }
                                : {}
                            }
                          >
                            {day.substring(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-sm"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-sm"
                />
                <input
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-sm"
                />
                <input
                  type="date"
                  name="joinDate"
                  placeholder="Join Date"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-sm"
                />
              </div>
              <div className="px-4 py-3 border-t flex gap-2 sticky bottom-0 bg-white">
                <button
                  onClick={saveStaffMember}
                  className="flex-1 text-white py-2 rounded-lg text-sm"
                  style={{ backgroundColor: themeColor }}
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 py-2 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StaffManagement;
