import { useState } from "react";
import { useApp } from "../context/AppContext";
import { FaSchool, FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowRight, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const SetupModal = ({ isOpen, onComplete }) => {
  const { setSchoolData, setThemeColor } = useApp();
  
  const [formData, setFormData] = useState({
    schoolName: "",
    email: "",
    address: "",
    contact: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.schoolName.trim()) {
      toast.error("Please enter school name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter email address");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter school address");
      return;
    }
    if (!formData.contact.trim()) {
      toast.error("Please enter contact number");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const schoolDataObj = {
      ...formData,
      setupDate: new Date().toISOString(),
    };

    localStorage.setItem("schoolData", JSON.stringify(schoolDataObj));
    localStorage.setItem("isSetupComplete", "true");
    setSchoolData(schoolDataObj);
    
    toast.success("Setup complete! Welcome to SchoolHub!");
    setIsSubmitting(false);
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-[90%] max-w-md overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🏫</span>
            </div>
            <h2 className="text-white font-semibold">School Setup</h2>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-500 text-center">Please fill in your school details to continue</p>
          
          {/* School Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaSchool className="inline mr-1 text-gray-400" size={12} /> School Name *
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleInputChange}
              placeholder="Enter school name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaEnvelope className="inline mr-1 text-gray-400" size={12} /> Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="admin@school.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline mr-1 text-gray-400" size={12} /> School Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Education St, City"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="inline mr-1 text-gray-400" size={12} /> Contact Number *
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="+1 234 567 8900"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition mt-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                Complete Setup <FaArrowRight size={12} />
              </>
            )}
          </button>
          
          <p className="text-center text-xs text-gray-400 pt-2">
            Fields marked with * are required
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SetupModal;