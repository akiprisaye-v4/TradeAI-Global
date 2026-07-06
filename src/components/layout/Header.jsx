import React from "react";
import ThemeToggle from "../ThemeToggle";

export default function Header({
  saveStatus,
  mobileMenuOpen,
  setMobileMenuOpen
}) {
  return (
    <div
      style={{
        background:"#161B22",
        borderBottom:"1px solid #21262D",
        padding:"14px 16px",
        position:"sticky",
        top:0,
        zIndex:100
      }}
    >
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",
          marginBottom:10
        }}>

          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <img
              src="/images/logo.svg"
              alt="TradeAI Global"
              style={{ width:32, height:32 }}
            />

            <div>
              <div style={{ fontSize:16, fontWeight:800 }}>
                TradeAI <span style={{ color:"#FF9900" }}>Global</span>
              </div>

              <div style={{ fontSize:10, color:"#00C853" }}>
                {saveStatus==="saving" && "· enregistrement…"}
                {saveStatus==="saved" && "· ✓ enregistré"}
              </div>
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:10 }}>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background:"none",
                border:"none",
                color:"#E6EDF3",
                fontSize:24,
                cursor:"pointer"
              }}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>

            <ThemeToggle/>

          </div>

        </div>
      </div>
    </div>
  );
}
