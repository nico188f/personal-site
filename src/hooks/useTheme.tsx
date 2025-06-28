import { useEffect, useState } from "react";

export function useTheme() {
   const [theme, setTheme] = useState<"dark" | "light" | null>(null); // null until client

   useEffect(() => {
      if (typeof window === "undefined") return;

      const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

      const updateDarkMode = (e: MediaQueryListEvent) => {
         setTheme(e.matches ? "light" : "dark");
      };

      setTheme(mediaQuery.matches ? "light" : "dark"); // Initial value

      mediaQuery.addEventListener("change", updateDarkMode);

      return () => {
         mediaQuery.removeEventListener("change", updateDarkMode);
      };
   }, []);

   return theme;
}
