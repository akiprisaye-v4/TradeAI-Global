import React from "react";

export default function FloatingChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #FF9900 0%, #FFB800 100%)",
        border: "none",
        boxShadow: "0 4px 16px rgba(255,153,0,0.4)",
        cursor: "pointer",
        fontSize: 28,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      aria-label="Ouvrir l'assistant IA"
    >
      🤖
    </button>
  );
}
