import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
import PhoneFrame from "./components/PhoneFrame";
import MobileFrameSelector from "./components/MobileFrameSelector";
import ThemeColorSelector from "./components/ThemeColorSelector";
import SetupModal from "./components/SetupModal";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import ManagementDashboard from "./pages/ManagementDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentManagement from "./pages/StudentManagement";
import StaffManagement from "./pages/StaffManagement";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import TeacherAttendance from "./pages/TeacherAttendance";
import TeacherMarks from "./pages/TeacherMarks";
import TeacherAnnouncements from "./pages/TeacherAnnouncements";
import TimeTableManagement from "./pages/TimeTableManagement";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem("userRole");
  const role = userRole ? JSON.parse(userRole) : null;
  if (!role) return <Navigate to="/role-selection" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/role-selection" replace />;
  return children;
};

function App() {
  const [showSetup, setShowSetup] = useState(false);
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);
  const [frameConfig, setFrameConfig] = useState(null);

  useEffect(() => {
    const isSetupComplete = localStorage.getItem("isSetupComplete");
    if (isSetupComplete === "true") {
      setShowSetup(false);
      setIsSetupCompleted(true);
    } else {
      setShowSetup(true);
      setIsSetupCompleted(false);
    }
  }, []);

  const handleSetupComplete = () => {
    setShowSetup(false);
    setIsSetupCompleted(true);
  };

  const handleFrameChange = (frame) => {
    setFrameConfig(frame);
  };

  return (
    <AppProvider>
      <ToastProvider>
        <Router>
          <div className="relative min-h-screen overflow-hidden">
            {/* Phone Frame Selector - Left Side */}
            <MobileFrameSelector onFrameChange={handleFrameChange} />
            
            {/* Theme Color Selector - Right Side */}
            <ThemeColorSelector />
            
            {/* Phone Frame - Dynamic based on selection */}
            <PhoneFrame frameConfig={frameConfig}>
              {isSetupCompleted ? (
                <Routes>
                  <Route path="/" element={<Navigate to="/role-selection" replace />} />
                  <Route path="/role-selection" element={<RoleSelectionPage />} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><ManagementDashboard /></ProtectedRoute>} />
                  <Route path="/admin/students" element={<ProtectedRoute allowedRole="admin"><StudentManagement /></ProtectedRoute>} />
                  <Route path="/admin/staff" element={<ProtectedRoute allowedRole="admin"><StaffManagement /></ProtectedRoute>} />
                  <Route path="/admin/announcements" element={<ProtectedRoute allowedRole="admin"><AnnouncementsPage /></ProtectedRoute>} />
                  <Route path="/admin/timetable" element={<ProtectedRoute allowedRole="admin"><TimeTableManagement /></ProtectedRoute>} />
                  <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRole="faculty"><StaffDashboard /></ProtectedRoute>} />
                  <Route path="/teacher/attendance" element={<ProtectedRoute allowedRole="faculty"><TeacherAttendance /></ProtectedRoute>} />
                  <Route path="/teacher/marks" element={<ProtectedRoute allowedRole="faculty"><TeacherMarks /></ProtectedRoute>} />
                  <Route path="/teacher/announcements" element={<ProtectedRoute allowedRole="faculty"><TeacherAnnouncements /></ProtectedRoute>} />
                  <Route path="/student/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
                </Routes>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <span className="text-white text-2xl">🏫</span>
                    </div>
                    <p className="text-gray-500 text-sm">Loading setup...</p>
                  </div>
                </div>
              )}
            </PhoneFrame>
            
            {/* Setup Modal */}
            <SetupModal isOpen={showSetup} onComplete={handleSetupComplete} />
          </div>
        </Router>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;