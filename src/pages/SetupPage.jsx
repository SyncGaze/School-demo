import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const SetupPage = () => {
  const navigate = useNavigate();
  const { setSchoolData, setThemeColor } = useApp();
  
  const [schoolName, setSchoolName] = useState("");
  const [students, setStudents] = useState("");
  const [teachers, setTeachers] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [themeColorLocal, setThemeColorLocal] = useState("#6366f1");
  const [establishedYear, setEstablishedYear] = useState("");

  const handleSubmit = () => {
    if (!schoolName.trim()) {
      toast.error("Please enter school name");
      return;
    }
    if (!students) {
      toast.error("Please enter number of students");
      return;
    }
    if (!teachers) {
      toast.error("Please enter number of teachers/staff");
      return;
    }

    const schoolDataObj = {
      schoolName: schoolName.trim(),
      students: parseInt(students),
      teachers: parseInt(teachers),
      address: address.trim(),
      city: city.trim(),
      phone: phone.trim(),
      email: email.trim(),
      themeColor: themeColorLocal,
      establishedYear: establishedYear,
      setupDate: new Date().toISOString(),
    };

    localStorage.setItem("schoolData", JSON.stringify(schoolDataObj));
    localStorage.setItem("themeColor", themeColorLocal);
    
    // Set in context
    setSchoolData(schoolDataObj);
    setThemeColor(themeColorLocal);
    
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");

    toast.success("School setup complete! Choose your role.");
    navigate("/role-selection");
  };

  return (
    <div className="p-5 pb-8">
      <div className="text-center mb-6">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md"
          style={{ backgroundColor: themeColorLocal }}
        >
          <span className="text-white text-2xl font-bold">🏫</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">School Setup</h1>
        <p className="text-sm text-gray-500 mt-1">Enter your school details to get started</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School Name <span className="text-red-500">*</span></label>
          <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="e.g., Springfield High School" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Students <span className="text-red-500">*</span></label>
          <input type="number" min="1" value={students} onChange={(e) => setStudents(e.target.value)} placeholder="Total students enrolled" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Teachers/Staff <span className="text-red-500">*</span></label>
          <input type="number" min="1" value={teachers} onChange={(e) => setTeachers(e.target.value)} placeholder="Total teachers and staff" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street address" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City / Town" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Contact number" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="School email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
            <input type="number" min="1800" max="2025" value={establishedYear} onChange={(e) => setEstablishedYear(e.target.value)} placeholder="e.g., 1990" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={themeColorLocal} onChange={(e) => setThemeColorLocal(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer" />
              <span className="text-xs text-gray-500">Choose your brand color</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mt-2">
          <p className="text-xs font-medium text-gray-500 mb-2">PREVIEW</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm" style={{ backgroundColor: themeColorLocal }}>
              {schoolName ? schoolName.charAt(0).toUpperCase() : "S"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{schoolName || "Your School Name"}</p>
              <p className="text-xs text-gray-400">{students || "0"} Students • {teachers || "0"} Staff</p>
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full py-3 rounded-lg font-medium text-white transition-all mt-4 hover:opacity-90" style={{ backgroundColor: themeColorLocal }}>
          Continue to Role Selection →
        </button>

        <p className="text-center text-xs text-gray-400 mt-2"><span className="text-red-500">*</span> Fields are required</p>
      </div>
    </div>
  );
};

export default SetupPage;