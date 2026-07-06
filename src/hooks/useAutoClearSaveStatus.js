import { useEffect } from "react";

export default function useAutoClearSaveStatus({
  saveStatus,
  setSaveStatus,
  delay = 1800
}) {
  useEffect(() => {
    if (saveStatus !== "saved") return;

    const t = setTimeout(() => setSaveStatus(""), delay);
    return () => clearTimeout(t);
  }, [saveStatus, setSaveStatus, delay]);
}
