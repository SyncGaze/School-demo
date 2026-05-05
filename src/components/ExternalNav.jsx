import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaChalkboardTeacher, FaGraduationCap, FaUsers } from "react-icons/fa";

const ExternalNav = () => {
  const navigate = useNavigate();

  const navItems = [
    { id: "admin", name: "Management", icon: <FaShieldAlt className="text-lg" />, path: "/admin/dashboard", color: "from-indigo-500 to-purple-500" },
    { id: "faculty", name: "Teacher", icon: <FaChalkboardTeacher className="text-lg" />, path: "/faculty/dashboard", color: "from-purple-500 to-pink-500" },
    { id: "student", name: "Student", icon: <FaGraduationCap className="text-lg" />, path: "/student/dashboard", color: "from-emerald-500 to-teal-500" },
    { id: "parent", name: "Parent", icon: <FaUsers className="text-lg" />, path: "/parent/dashboard", color: "from-blue-500 to-cyan-500" }
  ];

  return (
    <div className="fixed right-4 top-2/3 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-gray-200">
        <h3 className="text-[10px] font-semibold text-gray-400 text-center mb-1">QUICK NAV</h3>
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 hover:scale-105"
              title={item.name}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExternalNav;