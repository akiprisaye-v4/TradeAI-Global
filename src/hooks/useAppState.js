import { useState } from "react";

export default function useAppState(defaultProduct) {
  const [tab, setTab] = useState("calculateur");
  const [products, setProducts] = useState([
    defaultProduct("Coque iPhone 17 Transparente 456")
  ]);
  const [activeProduct, setActiveProduct] = useState(0);
  const [fxRates, setFxRates] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [toast, setToast] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  return {
    tab, setTab,
    products, setProducts,
    activeProduct, setActiveProduct,
    fxRates, setFxRates,
    loaded, setLoaded,
    saveStatus, setSaveStatus,
    toast, setToast,
    chatOpen, setChatOpen,
    showTutorial, setShowTutorial
  };
}
