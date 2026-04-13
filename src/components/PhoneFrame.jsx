import { useState, useEffect } from "react";

const PhoneFrame = ({ children, frameConfig }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const config = frameConfig || { id: "iphone15" };

  // iPhone 15 Pro Max
  if (config.id === "iphone15") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="relative group">
          <div className="absolute -inset-6 bg-black/15 rounded-[55px] blur-2xl"></div>
          <div className="absolute -inset-3 bg-black/8 rounded-[50px] blur-xl"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[85%] h-3 bg-black/25 rounded-full blur-md"></div>
          
          <div className="relative bg-black rounded-[48px] shadow-2xl" style={{ width: "360px", height: "700px" }}>
            <div className="absolute inset-0 rounded-[48px] border border-white/10 pointer-events-none"></div>
            
            <div className="absolute inset-[3px] bg-white rounded-[45px] overflow-hidden flex flex-col">
              <div className="px-5 pt-3 pb-1 flex justify-between items-center text-xs font-medium text-gray-800">
                <span className="font-semibold">{currentTime}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">🔋 98%</span>
                </div>
              </div>
              
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10"></div>
              
              <div className="flex-1 overflow-y-auto pt-2 pb-3 px-1">
                {children}
              </div>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-0.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redmi Note 13 Pro - Flat edges, large camera module, punch-hole display
  if (config.id === "redmi") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="relative group">
          <div className="absolute -inset-6 bg-black/15 rounded-[48px] blur-2xl"></div>
          <div className="absolute -inset-3 bg-black/8 rounded-[43px] blur-xl"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[85%] h-3 bg-black/25 rounded-full blur-md"></div>
          
          <div className="relative bg-black rounded-[42px] shadow-2xl" style={{ width: "358px", height: "700px" }}>
            {/* Metallic frame - Redmi has flat aluminum frame */}
            <div className="absolute inset-0 rounded-[42px] border border-gray-500/30 pointer-events-none"></div>
            
            {/* Side buttons - volume rocker and power button */}
            <div className="absolute -left-0.5 top-28 w-1 h-10 bg-gray-500 rounded-l-sm"></div>
            <div className="absolute -right-0.5 top-32 w-1 h-10 bg-gray-500 rounded-r-sm"></div>
            
            {/* Screen - flat display with narrow bezels */}
            <div className="absolute inset-[3px] bg-white rounded-[39px] overflow-hidden flex flex-col">
              <div className="px-5 pt-3 pb-1 flex justify-between items-center text-xs font-medium text-gray-800">
                <span className="font-semibold">{currentTime}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">🔋 98%</span>
                </div>
              </div>
              
              {/* Punch-hole camera - centered, smaller than iPhone notch */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-black z-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pt-2 pb-3 px-1">
                {children}
              </div>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-0.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Xiaomi 14 Ultra
  if (config.id === "xiaomi") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="relative group">
          <div className="absolute -inset-6 bg-black/15 rounded-[45px] blur-2xl"></div>
          <div className="absolute -inset-3 bg-black/8 rounded-[40px] blur-xl"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[85%] h-3 bg-black/25 rounded-full blur-md"></div>
          
          <div className="relative bg-black rounded-[38px] shadow-2xl" style={{ width: "352px", height: "700px" }}>
            <div className="absolute inset-0 rounded-[38px] border border-white/10 pointer-events-none"></div>
            
            <div className="absolute inset-[3px] bg-white rounded-[35px] overflow-hidden flex flex-col">
              <div className="px-5 pt-3 pb-1 flex justify-between items-center text-xs font-medium text-gray-800">
                <span className="font-semibold">{currentTime}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">🔋 98%</span>
                </div>
              </div>
              
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-black z-10"></div>
              
              <div className="flex-1 overflow-y-auto pt-2 pb-3 px-1">
                {children}
              </div>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-0.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // OnePlus 12
  if (config.id === "oneplus") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="relative group">
          <div className="absolute -inset-6 bg-black/15 rounded-[50px] blur-2xl"></div>
          <div className="absolute -inset-3 bg-black/8 rounded-[45px] blur-xl"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[85%] h-3 bg-black/25 rounded-full blur-md"></div>
          
          <div className="relative bg-black rounded-[42px] shadow-2xl" style={{ width: "355px", height: "700px" }}>
            <div className="absolute inset-0 rounded-[42px] border border-white/10 pointer-events-none"></div>
            
            {/* Alert slider (OnePlus signature) */}
            <div className="absolute -left-0.5 top-20 w-1 h-8 bg-red-500 rounded-l-sm"></div>
            
            <div className="absolute inset-[3px] bg-white rounded-[39px] overflow-hidden flex flex-col">
              <div className="px-5 pt-3 pb-1 flex justify-between items-center text-xs font-medium text-gray-800">
                <span className="font-semibold">{currentTime}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">🔋 98%</span>
                </div>
              </div>
              
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-black z-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pt-2 pb-3 px-1">
                {children}
              </div>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-0.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Google Pixel 8 Pro
  if (config.id === "pixel") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="relative group">
          <div className="absolute -inset-6 bg-black/15 rounded-[50px] blur-2xl"></div>
          <div className="absolute -inset-3 bg-black/8 rounded-[45px] blur-xl"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[85%] h-3 bg-black/25 rounded-full blur-md"></div>
          
          <div className="relative bg-black rounded-[44px] shadow-2xl" style={{ width: "350px", height: "700px" }}>
            <div className="absolute inset-0 rounded-[44px] border border-white/10 pointer-events-none"></div>
            
            <div className="absolute inset-[3px] bg-white rounded-[41px] overflow-hidden flex flex-col">
              <div className="px-5 pt-3 pb-1 flex justify-between items-center text-xs font-medium text-gray-800">
                <span className="font-semibold">{currentTime}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">📶</span>
                  <span className="text-[10px]">🔋 98%</span>
                </div>
              </div>
              
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-black z-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pt-2 pb-3 px-1">
                {children}
              </div>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-0.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="relative">
        <div className="absolute -inset-6 bg-black/15 rounded-[50px] blur-2xl"></div>
        <div className="absolute -inset-3 bg-black/8 rounded-[45px] blur-xl"></div>
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[85%] h-3 bg-black/25 rounded-full blur-md"></div>
        
        <div className="relative bg-black rounded-[45px] shadow-2xl" style={{ width: "360px", height: "700px" }}>
          <div className="absolute inset-0 rounded-[45px] border border-white/10 pointer-events-none"></div>
          
          <div className="absolute inset-[3px] bg-white rounded-[42px] overflow-hidden flex flex-col">
            <div className="px-5 pt-3 pb-1 flex justify-between items-center text-xs font-medium text-gray-800">
              <span className="font-semibold">{currentTime}</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px]">📶</span>
                <span className="text-[10px]">📶</span>
                <span className="text-[10px]">🔋 98%</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pt-2 pb-3 px-1">
              {children}
            </div>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-0.5 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;