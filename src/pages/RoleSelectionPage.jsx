import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FaShieldAlt, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import toast from "react-hot-toast";

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { setUserRole, setUserProfile, schoolData, themeColor } = useApp();
  const [loading, setLoading] = useState(false);

  const roles = [
    { 
      id: "admin", 
      name: "Management / Admin", 
      icon: <FaShieldAlt className="text-2xl" />, 
      title: "School Management", 
      description: "Full access to all features",
      profile: { name: schoolData?.userName || "Admin User", role: "admin", email: schoolData?.email || "admin@school.com" }
    },
    { 
      id: "faculty", 
      name: "Teacher / Staff", 
      icon: <FaChalkboardTeacher className="text-2xl" />, 
      title: "Teaching Staff", 
      description: "Take attendance, upload marks, post class announcements",
      profile: { name: "Dr. Sarah Johnson", role: "faculty", email: "sarah@school.edu", subject: "Mathematics", assignedClass: "10A" }
    },
    { 
      id: "student", 
      name: "Student", 
      icon: <FaGraduationCap className="text-2xl" />, 
      title: "Student Portal", 
      description: "View attendance, marks, and announcements",
      profile: { name: "Emma Watson", role: "student", email: "emma@school.edu", rollNo: "101", class: "10A" }
    }
  ];

  const handleRoleSelect = async (role) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem("userRole", JSON.stringify(role.id));
    localStorage.setItem("userProfile", JSON.stringify(role.profile));
    setUserRole(role.id);
    setUserProfile(role.profile);
    toast.success(`Logged in as ${role.name}`);
    navigate(`/${role.id}/dashboard`);
  };

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg" style={{ backgroundColor: themeColor }}>
          <span className="text-white text-2xl">🏫</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800">Select Your Role</h1>
        <p className="text-xs text-gray-500 mt-1">
          {schoolData?.schoolName || "School Management System"}
        </p>
      </div>

      <div className="space-y-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role)}
            disabled={loading}
            className="w-full bg-white rounded-xl p-3 text-left transition-all hover:shadow-md border"
            style={{ borderColor: `${themeColor}30` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${themeColor}20`, color: themeColor }}>
                {role.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm">{role.title}</h3>
                <p className="text-xs text-gray-500">{role.description}</p>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </button>
        ))}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-gray-600">Logging in...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelectionPage;