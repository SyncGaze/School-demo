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

  const handleColorSelect = (color) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
  };

  useEffect(() => {
    const saved = localStorage.getItem("themeColor");
    if (saved) {
      setThemeColor(saved);
    }
  }, []);

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-3 border border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 text-center mb-2">THEME COLORS</h3>
        <div className="flex flex-col gap-2">
          {themeColors.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleColorSelect(theme.color)}
              className={`w-10 h-10 rounded-xl transition-all duration-200 flex items-center justify-center ${
                themeColor === theme.color
                  ? "ring-2 ring-offset-2 ring-offset-white shadow-lg scale-110"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: theme.color }}
            >
              <span className="text-white text-lg">{theme.icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeColorSelector;