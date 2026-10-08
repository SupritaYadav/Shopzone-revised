import { useEffect } from "react";
import { useSelector } from "react-redux";

function ThemeSync() {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  return null;
}

export default ThemeSync;
