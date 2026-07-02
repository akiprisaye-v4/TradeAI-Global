export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 12,
        border: "none",
        background: "#FF9900",
        color: "#0D1117",
        fontWeight: 800,
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}
