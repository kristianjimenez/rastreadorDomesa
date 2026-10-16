import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const KEY = "domesa-theme";

/** Tema guardado por el usuario; si no hay, el del sistema operativo. */
function read(): Theme {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* localStorage no disponible (modo privado, etc.) */
  }
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

let current: Theme = read();
const listeners = new Set<() => void>();

function apply(t: Theme) {
  document.documentElement.classList.toggle("dark", t === "dark");
}
apply(current);

export function setTheme(t: Theme) {
  current = t;
  apply(t);
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* ignorar */
  }
  listeners.forEach((l) => l());
}

export function useTheme() {
  const theme = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => "light" as Theme,
  );
  return { theme, toggle: () => setTheme(current === "dark" ? "light" : "dark") };
}
