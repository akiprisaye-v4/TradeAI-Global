import { useState } from "react";

export default function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const closeToast = () => setToast(null);

  return {
    toast,
    setToast,
    showToast,
    closeToast,
  };
}
