import React, { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();
export function useTheme() { return useContext(ThemeContext); }

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const raw = localStorage.getItem("theme_v1");
    return raw ? JSON.parse(raw) : false;
  });

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme_v1", JSON.stringify(dark));
  }, [dark]);

  return <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>{children}</ThemeContext.Provider>;
}
