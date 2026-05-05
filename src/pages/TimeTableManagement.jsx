import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaUserTie,
  FaPrint,
  FaClock,
  FaSyncAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaChalkboardTeacher,
} from "react-icons/fa";
import toast from "react-hot-toast";

const TimeTableManagement = () => {
  const navigate = useNavigate();
  const { themeColor, schoolData } = useApp();
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([
    "10A",
    "10B",
    "10C",
    "9A",
    "9B",
    "8A",
    "8B",
  ]);
  const [selectedClass, setSelectedClass] = useState("10A");
  const [timetable, setTimetable] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [isTeacherAvailable, setIsTeacherAvailable] = useState(false);
  const [formData, setFormData] = useState({
    day: "Monday",
    time: "9:00 - 10:00 AM",
    subject: "",
    teacherId: "",
    room: "",
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "9:00 - 10:00 AM",
    "10:00 - 11:00 AM",
    "11:00 - 12:00 PM",
    "12:00 - 1:00 PM",
    "1:00 - 2:00 PM",
    "2:00 - 3:00 PM",
  ];
  const rooms = [
    "Room 201",
    "Room 202",
    "Room 203",
    "Lab 1",
    "Lab 2",
    "Computer Lab",
  ];
  const allSubjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Computer Science",
    "Biology",
    "History",
    "Geography",
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load teachers from localStorage
    const storedStaff = localStorage.getItem("staff");
    if (storedStaff) {
      const allStaff = JSON.parse(storedStaff);
      const teacherList = allStaff.filter((t) => t.role === "Teacher");
      setTeachers(teacherList);
      console.log("✅ Teachers loaded:", teacherList.length);
    } else {
      // Create dummy teachers
      const dummyTeachers = [
        {
          id: "t1",
          name: "Dr. Sarah Johnson",
          subject: "Mathematics",
          role: "Teacher",
          availability: ["Monday", "Wednesday", "Friday"],
        },
        {
          id: "t2",
          name: "Prof. Michael Brown",
          subject: "Physics",
          role: "Teacher",
          availability: ["Tuesday", "Thursday"],
        },
        {
          id: "t3",
          name: "Ms. Emily Davis",
          subject: "English",
          role: "Teacher",
          availability: ["Monday", "Tuesday", "Thursday"],
        },
        {
          id: "t4",
          name: "Dr. Robert Chen",
          subject: "Chemistry",
          role: "Teacher",
          availability: ["Wednesday", "Friday"],
        },
        {
          id: "t5",
          name: "Ms. Lisa Wong",
          subject: "Computer Science",
          role: "Teacher",
          availability: ["Monday", "Wednesday", "Friday"],
        },
      ];
      setTeachers(dummyTeachers);
      localStorage.setItem("staff", JSON.stringify(dummyTeachers));
      console.log("✅ Dummy teachers created:", dummyTeachers.length);
    }

    // Load timetable
    const storedTimetable = localStorage.getItem("timetable");
    if (storedTimetable) {
      setTimetable(JSON.parse(storedTimetable));
    } else {
      const emptyTimetable = {};
      classes.forEach((cls) => {
        emptyTimetable[cls] = {};
        days.forEach((day) => {
          emptyTimetable[cls][day] = [];
        });
      });
      setTimetable(emptyTimetable);
      localStorage.setItem("timetable", JSON.stringify(emptyTimetable));
    }
  };

  const saveTimetable = (updatedTimetable) => {
    setTimetable(updatedTimetable);
    localStorage.setItem("timetable", JSON.stringify(updatedTimetable));
    toast.success("Timetable saved!");
  };

  const generateTimetable = () => {
    setGenerateLoading(true);
    setTimeout(() => {
      const newTimetable = {};
      classes.forEach((className) => {
        newTimetable[className] = {};
        days.forEach((day) => {
          const daySchedule = [];
          const availableTeachers = teachers.filter(
            (t) => t.availability && t.availability.includes(day),
          );
          timeSlots.forEach((time, slotIndex) => {
            if (availableTeachers.length > 0) {
              const teacherIndex =
                (slotIndex + days.indexOf(day)) % availableTeachers.length;
              const teacher = availableTeachers[teacherIndex];
              const roomIndex = (slotIndex + days.indexOf(day)) % rooms.length;
              daySchedule.push({
                id: `${className}-${day}-${time}-${Date.now()}-${slotIndex}`,
                subject: teacher.subject,
                teacherId: teacher.id,
                teacherName: teacher.name,
                time: time,
                room: rooms[roomIndex],
              });
            }
          });
          newTimetable[className][day] = daySchedule;
        });
      });
      setTimetable(newTimetable);
      localStorage.setItem("timetable", JSON.stringify(newTimetable));
      setGenerateLoading(false);
      setShowGenerateModal(false);
      toast.success(`Timetable generated for ${classes.length} classes!`);
    }, 1000);
  };

  const handleTeacherSelect = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    setSelectedTeacher(teacher);
    const available = teacher?.availability?.includes(formData.day) || false;
    setIsTeacherAvailable(available);
    setFormData({
      ...formData,
      teacherId: teacherId,
      subject: teacher?.subject || formData.subject,
    });
  };

  const handleDayChange = (day) => {
    setFormData({ ...formData, day: day });
    if (selectedTeacher) {
      const available = selectedTeacher.availability?.includes(day) || false;
      setIsTeacherAvailable(available);
    }
  };

  const handleAddEntry = () => {
    if (!formData.subject || !formData.teacherId || !formData.room) {
      toast.error("Please fill all fields");
      return;
    }

    const teacher = teachers.find((t) => t.id === formData.teacherId);
    if (!teacher) {
      toast.error("Teacher not found");
      return;
    }

    if (!teacher.availability?.includes(formData.day)) {
      toast.error(`${teacher.name} is not available on ${formData.day}`);
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      subject: formData.subject,
      teacherId: formData.teacherId,
      teacherName: teacher.name,
      time: formData.time,
      room: formData.room,
    };

    const updatedTimetable = { ...timetable };
    if (!updatedTimetable[selectedClass]) updatedTimetable[selectedClass] = {};
    if (!updatedTimetable[selectedClass][formData.day])
      updatedTimetable[selectedClass][formData.day] = [];

    const existingIndex = updatedTimetable[selectedClass][
      formData.day
    ].findIndex((e) => e.time === formData.time);
    if (existingIndex !== -1) {
      updatedTimetable[selectedClass][formData.day][existingIndex] = newEntry;
      toast.success("Timetable updated!");
    } else {
      updatedTimetable[selectedClass][formData.day].push(newEntry);
      toast.success("Class added to timetable!");
    }

    saveTimetable(updatedTimetable);
    setShowModal(false);
    setEditingEntry(null);
    setSelectedTeacher(null);
    setIsTeacherAvailable(false);
    setFormData({
      day: "Monday",
      time: "9:00 - 10:00 AM",
      subject: "",
      teacherId: "",
      room: "",
    });
  };

  const handleEditEntry = (day, entry) => {
    setEditingEntry(entry);
    setFormData({
      day: day,
      time: entry.time,
      subject: entry.subject,
      teacherId: entry.teacherId,
      room: entry.room,
    });
    const teacher = teachers.find((t) => t.id === entry.teacherId);
    setSelectedTeacher(teacher);
    const available = teacher?.availability?.includes(day) || false;
    setIsTeacherAvailable(available);
    setShowModal(true);
  };

  const handleDeleteEntry = (day, entryId) => {
    if (window.confirm("Remove this class?")) {
      const updatedTimetable = { ...timetable };
      if (updatedTimetable[selectedClass]?.[day]) {
        updatedTimetable[selectedClass][day] = updatedTimetable[selectedClass][
          day
        ].filter((e) => e.id !== entryId);
        saveTimetable(updatedTimetable);
        toast.success("Class removed!");
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-8 h-8 rounded-full bg-gray-100"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">
            Time Table Management
          </h1>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="px-3 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2"
          style={{ backgroundColor: themeColor }}
        >
          <FaSyncAlt size={14} /> Generate
        </button>
      </div>

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold" style={{ color: themeColor }}>
                  Generate Timetable
                </h2>
                <button onClick={() => setShowGenerateModal(false)}>
                  <FaTimes />
                </button>
              </div>
              <div className="text-center py-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${themeColor}20` }}
                >
                  <FaCalendarAlt
                    className="text-3xl"
                    style={{ color: themeColor }}
                  />
                </div>
                <p className="text-gray-700 mb-2">
                  Generate timetable for all classes?
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={generateTimetable}
                  disabled={generateLoading}
                  className="flex-1 text-white py-2 rounded-lg"
                  style={{ backgroundColor: themeColor }}
                >
                  {generateLoading ? "Generating..." : "Generate Now"}
                </button>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="flex-1 bg-gray-100 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* School Info */}
      <div
        className="rounded-xl p-4 mb-5 text-white"
        style={{
          background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)`,
        }}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-sm opacity-90">Academic Year 2024-25</p>
            <p className="text-lg font-bold">
              {schoolData?.schoolName || "School"}
            </p>
          </div>
          <button onClick={handlePrint} className="bg-white/20 p-2 rounded-lg">
            <FaPrint size={16} />
          </button>
        </div>
      </div>

      {/* Teachers Summary - THIS SHOWS THE TEACHERS LIST */}
      <div
        className="bg-white rounded-xl p-3 mb-4 shadow-sm border"
        style={{ borderColor: `${themeColor}30` }}
      >
        <div className="flex items-center gap-2 mb-2">
          <FaChalkboardTeacher style={{ color: themeColor }} />
          <span className="text-sm font-medium text-gray-700">
            Teachers ({teachers.length})
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {teachers.length === 0 ? (
            <p className="text-xs text-gray-400">
              No teachers found. Please add teachers in Staff Management.
            </p>
          ) : (
            teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
              >
                {teacher.name} ({teacher.subject})
                {teacher.availability?.length > 0 && (
                  <span className="ml-1 text-green-600">✓</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Class Selector */}
      <div
        className="bg-white rounded-xl p-4 shadow-sm border mb-5"
        style={{ borderColor: `${themeColor}30` }}
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Class
        </label>
        <div className="flex flex-wrap gap-2">
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedClass === cls ? "text-white" : "bg-gray-100"}`}
              style={
                selectedClass === cls ? { backgroundColor: themeColor } : {}
              }
            >
              Class {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => {
          setEditingEntry(null);
          setSelectedTeacher(null);
          setFormData({
            day: "Monday",
            time: "9:00 - 10:00 AM",
            subject: "",
            teacherId: "",
            room: "",
          });
          setShowModal(true);
        }}
        className="w-full mb-5 py-2.5 rounded-lg font-medium text-white flex items-center justify-center gap-2"
        style={{ backgroundColor: themeColor }}
      >
        <FaPlus size={14} /> Add/Update Class
      </button>

      {/* Timetable Display */}
      <div className="space-y-4">
        {days.map((day) => {
          const dayClasses = [...(timetable[selectedClass]?.[day] || [])].sort(
            (a, b) => timeSlots.indexOf(a.time) - timeSlots.indexOf(b.time),
          );
          return (
            <div
              key={day}
              className="bg-white rounded-xl p-4 shadow-sm border"
              style={{ borderColor: `${themeColor}30` }}
            >
              <h3 className="font-semibold mb-3" style={{ color: themeColor }}>
                {day}
              </h3>
              {dayClasses.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">
                  No classes scheduled
                </p>
              ) : (
                dayClasses.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 bg-gray-50 rounded-lg mb-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          {entry.time}
                        </p>
                        <p className="text-base font-semibold text-gray-800 leading-tight wrap-break-word">
                          {entry.subject}
                        </p>
                      </div>
                      <div className="flex gap-1 shrink-0 pt-0.5">
                        <button
                          onClick={() => handleEditEntry(day, entry)}
                          className="p-1.5 text-blue-500"
                          title="Edit"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(day, entry.id)}
                          className="p-1.5 text-red-500"
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                      <span className="inline-flex items-center gap-1 min-w-0">
                        <FaUserTie size={10} className="shrink-0" />
                        <span className="truncate">{entry.teacherName}</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="text-pink-500">📍</span>
                        <span>{entry.room}</span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-5">
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: themeColor }}>
                  {editingEntry ? "Update Class" : "Add Class"}
                </h2>
                <button onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) => handleDayChange(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="">Select Subject</option>
                    {allSubjects.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TEACHER DROPDOWN - THIS IS WHERE TEACHERS SHOULD APPEAR */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Teacher
                  </label>
                  <select
                    value={formData.teacherId}
                    onChange={(e) => handleTeacherSelect(e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="">-- Select Teacher --</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.subject}
                      </option>
                    ))}
                  </select>

                  {selectedTeacher && (
                    <div
                      className="mt-2 p-2 rounded-lg"
                      style={{ backgroundColor: `${themeColor}10` }}
                    >
                      <p className="text-xs font-medium mb-1">
                        Available Days:
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {selectedTeacher.availability?.map((day, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                      <div
                        className={`text-xs ${isTeacherAvailable ? "text-green-600" : "text-red-600"}`}
                      >
                        {isTeacherAvailable
                          ? `✓ Available on ${formData.day}`
                          : `✗ Not available on ${formData.day}`}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Room</label>
                  <select
                    value={formData.room}
                    onChange={(e) =>
                      setFormData({ ...formData, room: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={handleAddEntry}
                  className="flex-1 text-white py-2 rounded-lg"
                  style={{ backgroundColor: themeColor }}
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTableManagement;
