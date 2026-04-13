import { useState, useEffect } from "react";
import { FaApple, FaAndroid, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { SiSamsung, SiGoogle } from "react-icons/si";

const MobileBottomSelector = ({ onFrameChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState("iphone15");

  const frames = [
    { id: "iphone15", name: "iPhone 15 Pro", icon: <FaApple />, width: "380px", height: "700px", borderRadius: "40px", hasNotch: true, hasDynamicIsland: true },
    { id: "iphone14", name: "iPhone 14", icon: <FaApple />, width: "375px", height: "700px", borderRadius: "38px", hasNotch: true, hasDynamicIsland: false },
    { id: "samsungS24", name: "Samsung S24", icon: <SiSamsung />, width: "370px", height: "720px", borderRadius: "35px", hasNotch: false, hasDynamicIsland: false },
    { id: "pixel8", name: "Pixel 8", icon: <SiGoogle />, width: "365px", height: "710px", borderRadius: "42px", hasNotch: false, hasDynamicIsland: false }
  ];

  const handleSelect = (frame) => {
    setSelectedFrame(frame.id);
    onFrameChange(frame);
    localStorage.setItem("selectedPhoneFrame", frame.id);
    setIsOpen(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem("selectedPhoneFrame");
    if (saved) {
      const frame = frames.find(f => f.id === saved);
      if (frame) {
        setSelectedFrame(saved);
        onFrameChange(frame);
      }
    }
  }, []);

  const currentFrame = frames.find(f => f.id === selectedFrame);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
      <div className="bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full"
        >
          <span className="text-gray-600">{currentFrame?.icon}</span>
          <span className="text-sm font-medium text-gray-700">{currentFrame?.name}</span>
          {isOpen ? <FaChevronDown size={12} /> : <FaChevronUp size={12} />}
        </button>
        
        {isOpen && (
          <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {frames.map((frame) => (
              <button
                key={frame.id}
                onClick={() => handleSelect(frame)}
                className={`w-full px-4 py-2 flex items-center gap-2 text-left hover:bg-gray-50 ${
                  selectedFrame === frame.id ? "bg-indigo-50 text-indigo-600" : "text-gray-700"
                }`}
              >
                <span>{frame.icon}</span>
                <span className="text-sm">{frame.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileBottomSelector;