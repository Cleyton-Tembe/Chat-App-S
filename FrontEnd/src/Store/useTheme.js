import { create } from "zustand";

const initialTheme =
  typeof window !== "undefined" ? localStorage.getItem("theme") || "sunset" : "sunset"

if (typeof window !== "undefined") {
  document.documentElement.setAttribute("data-theme", initialTheme)
}

const useTheme = create((set) => ({
    theme: localStorage.getItem('theme') || "sunset",
    setTheme: (t) => {
        localStorage.setItem('theme', t)
        set({theme: t})
        document.documentElement.setAttribute('data-theme', t)
    }

   
}))

export default useTheme;