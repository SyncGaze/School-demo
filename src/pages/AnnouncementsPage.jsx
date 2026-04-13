import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaArrowLeft, FaBell, FaCalendarAlt, FaTimes } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import CustomConfirmModal from "../components/CustomConfirmModal";

const AnnouncementsPage = () => {
  const navigate = useNavigate();
  const { themeColor } = useApp();
  const { showToast } = useToast();
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", audience: "All" });

  useEffect(() => {
    const storedAnnouncements = localStorage.getItem("announcements");
    if (storedAnnouncements) {
      setAnnouncements(JSON.parse(storedAnnouncements));
    } else {
      const dummyAnnouncements = [
        { id: "1", title: "📢 Parent-Teacher Meeting", content: "Annual parent-teacher meeting on March 25th at 10 AM in the auditorium.", date: "2024-03-25", audience: "All", postedBy: "Admin", time: "10:00 AM" },
        { id: "2", title: "🔬 Science Fair 2024", content: "Registration open until March 30th. Submit your projects to the science department.", date: "2024-03-30", audience: "Students", postedBy: "Admin", time: "9:00 AM" },
        { id: "3", title: "🏆 Sports Day", content: "Annual sports day scheduled for April 5th. All students must register.", date: "2024-04-05", audience: "Students", postedBy: "Admin", time: "8:00 AM" }
      ];
      setAnnouncements(dummyAnnouncements);
      localStorage.setItem("announcements", JSON.stringify(dummyAnnouncements));
    }
  }, []);

  const saveAnnouncements = (updated) => { 
    setAnnouncements(updated); 
    localStorage.setItem("announcements", JSON.stringify(updated)); 
  };

  const addAnnouncement = () => {
    if (!formData.title || !formData.content) { 
      showToast("Please fill all fields", "error");
      return; 
    }
    const newAnnouncement = { 
      ...formData, 
      id: Date.now().toString(), 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      postedBy: "Admin" 
    };
    saveAnnouncements([newAnnouncement, ...announcements]);
    showToast("Announcement posted!", "success");
    setIsModalOpen(false);
    setFormData({ title: "", content: "", audience: "All" });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    saveAnnouncements(announcements.filter(a => a.id !== deleteId));
    showToast("Announcement deleted!", "success");
    setIsConfirmOpen(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4 pb-20 relative min-h-full">
      {/* Custom Confirm Modal */}
      <CustomConfirmModal
        isOpen={isConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Announcement"
        message="Are you sure you want to delete this announcement? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin/dashboard")} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Announcements</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="px-3 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-1" 
          style={{ backgroundColor: themeColor }}
        >
          <FaPlus size={12} /> Post
        </button>
      </div>

      <div className="rounded-xl p-4 mb-5 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)` }}>
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold">{announcements.length}</p>
            <p className="text-xs">Total Announcements</p>
          </div>
          <FaBell className="text-3xl opacity-50" />
        </div>
      </div>

      <div className="space-y-3">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-white rounded-xl p-3 shadow-sm border" style={{ borderLeftColor: themeColor, borderLeftWidth: "4px" }}>
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{ann.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{ann.content}</p>
                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                  <span><FaCalendarAlt className="inline mr-1" size={10} /> {ann.date}</span>
                  <span>👥 {ann.audience}</span>
                </div>
              </div>
              <button onClick={() => handleDeleteClick(ann.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsModalOpen(false)} />
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[320px] bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="px-4 py-3 border-b" style={{ backgroundColor: `${themeColor}10` }}>
              <h2 className="text-md font-bold" style={{ color: themeColor }}>Post Announcement</h2>
            </div>
            <div className="p-4 space-y-3">
              <input 
                type="text" 
                placeholder="Title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                className="w-full p-2 border rounded-lg text-sm" 
              />
              <textarea 
                placeholder="Content" 
                value={formData.content} 
                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                rows="3" 
                className="w-full p-2 border rounded-lg text-sm" 
              />
              <select 
                value={formData.audience} 
                onChange={(e) => setFormData({...formData, audience: e.target.value})} 
                className="w-full p-2 border rounded-lg text-sm"
              >
                <option>All</option>
                <option>Students</option>
                <option>Staff</option>
                <option>Parents</option>
              </select>
            </div>
            <div className="px-4 py-3 border-t flex gap-2">
              <button onClick={addAnnouncement} className="flex-1 text-white py-2 rounded-lg text-sm" style={{ backgroundColor: themeColor }}>Post</button>
              <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 py-2 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnnouncementsPage;