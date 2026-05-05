import { useState, useEffect } from "react";
import { FaApple } from "react-icons/fa";
import { SiXiaomi } from "react-icons/si";
import { useApp } from "../context/AppContext";

const MobileFrameSelector = ({ onFrameChange }) => {
  const [selectedFrame, setSelectedFrame] = useState("iphone15");
  const { themeColor } = useApp();

  const frames = [
    {
      id: "iphone15",
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      icon: <FaApple className="text-xl" />,
    },
    {
      id: "redmi",
      name: "Redmi Note 13 Pro",
      brand: "Xiaomi",
      icon: <SiXiaomi className="text-xl" />,
    },
    {
      id: "xiaomi",
      name: "Xiaomi 14 Ultra",
      brand: "Xiaomi",
      icon: <SiXiaomi className="text-xl" />,
    },
    {
      id: "oneplus",
      name: "OnePlus 12",
      brand: "OnePlus",
      icon: <span className="text-sm font-bold">1+</span>,
    },
    {
      id: "pixel",
      name: "Pixel 8 Pro",
      brand: "Google",
      icon: <span className="text-sm font-bold">G</span>,
    },
  ];

  const handleSelect = (frame) => {
    setSelectedFrame(frame.id);
    onFrameChange(frame);
    localStorage.setItem("selectedPhoneFrame", frame.id);
  };

  useEffect(() => {
    const saved = localStorage.getItem("selectedPhoneFrame");
    if (saved) {
      const frame = frames.find((f) => f.id === saved);
      if (frame) onFrameChange(frame);
    }
  }, []);

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-gray-200">
        <h3 className="text-[10px] font-semibold text-gray-400 text-center mb-1">
          PHONE MODELS
        </h3>
        <div className="space-y-1">
          {frames.map((frame) => (
            <button
              key={frame.id}
              onClick={() => handleSelect(frame)}
              className={`w-36 p-1.5 rounded-lg transition-all duration-200 flex items-center gap-2 text-xs ${
                selectedFrame === frame.id
                  ? "text-white shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
              style={
                selectedFrame === frame.id
                  ? { backgroundColor: themeColor }
                  : undefined
              }
            >
              {frame.icon}
              <span>{frame.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileFrameSelector;
