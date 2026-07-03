import React from "react";

export default function NavigationTabs({
  tabs,
  tabLabels,
  activeTab,
  setTab,
  setActiveTab,
  tabToActive,
  mobileMenuOpen = false,
  setMobileMenuOpen = () => {}
}) {
  const handleSelect = (t) => {
    setTab(t);
    setActiveTab(tabToActive[t] || t);
    setMobileMenuOpen(false);
  };

  return (
    <div
      className={mobileMenuOpen ? "nav-tabs nav-tabs-open" : "nav-tabs"}
      style={{
        display: "flex",
        gap: 4,
        overflowX: "auto",
        paddingBottom: 2
      }}
    >
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => handleSelect(t)}
          tabIndex={0}
          aria-label={tabLabels[t]}
          style={{
            padding: "6px 12px",
            borderRadius: 20,
            border: "none",
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 600,
            background: activeTab === (tabToActive[t] || t) ? "#FF9900" : "#21262D",
            color: activeTab === (tabToActive[t] || t) ? "#0D1117" : "#8B949E",
            transition: "all 0.2s",
            whiteSpace: "nowrap"
          }}
        >
          {tabLabels[t]}
        </button>
      ))}
    </div>
  );
}
