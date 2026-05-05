import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

const ThemeColorSelector = () => {
  const { themeColor, setThemeColor } = useApp();

  const themeColors = [
    { id: "blue", name: "Trust Blue", color: "#3b82f6", icon: "🔵" },
    { id: "green", name: "Growth Green", color: "#10b981", icon: "🟢" },
    { id: "orange", name: "Energy Orange", color: "#f59e0b", icon: "🟠" },
    { id: "red", name: "Passion Red", color: "#ef4444", icon: "🔴" },
    { id: "purple", name: "Royal Purple", color: "#8b5cf6", icon: "🟣" }
  ];

  return (
    <div className="fixed right-8 bottom-8 z-50 hidden lg:flex flex-row gap-2">
      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-3 py-2 border border-gray-200">
        <div className="flex gap-2">
          {themeColors.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setThemeColor(theme.color)}
              className={`w-9 h-9 rounded-full transition-all duration-200 flex items-center justify-center ${
                themeColor === theme.color 
                  ? "ring-2 ring-offset-2 ring-offset-white scale-110 shadow-md" 
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: theme.color }}
              title={theme.name}
            >
              <span className="text-white text-base">{theme.icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeColorSelector;