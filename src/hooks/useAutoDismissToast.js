import { useEffect } from "react";

export default function useAutoDismissToast({ toast, setToast, delay = 1800 }) {
  useEffect(() => {
    if (!toast) return;

    const t = setTimeout(() => setToast(null), delay);
    return () => clearTimeout(t);
  }, [toast, setToast, delay]);
}
