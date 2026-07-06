import React from "react";

export default function ProductSelector({
  products,
  activeProduct,
  setActiveProduct,
  addProduct,
  removeProduct
}) {
  return (
    <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
      {products.map((prod, idx) => (
        <button
          key={idx}
          onClick={() => setActiveProduct(idx)}
          style={{
            padding:"6px 12px",
            borderRadius:20,
            border:`1px solid ${activeProduct===idx?"#FF9900":"#30363D"}`,
            background:activeProduct===idx?"#FF990020":"#161B22",
            color:activeProduct===idx?"#FF9900":"#8B949E",
            fontSize:11,
            cursor:"pointer",
            fontWeight:600
          }}
        >
          {prod.name}
        </button>
      ))}

      <button
        onClick={addProduct}
        style={{
          padding:"6px 12px",
          borderRadius:20,
          border:"1px dashed #30363D",
          background:"transparent",
          color:"#8B949E",
          fontSize:11,
          cursor:"pointer"
        }}
      >
        + Ajouter
      </button>

      {products.length>1 && (
        <button
          onClick={() => removeProduct(activeProduct)}
          style={{
            padding:"6px 10px",
            borderRadius:20,
            border:"1px solid #FF3D0033",
            background:"#FF3D0010",
            color:"#FF3D00",
            fontSize:11,
            cursor:"pointer"
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
