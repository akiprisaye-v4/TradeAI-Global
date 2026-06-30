import React from 'react';
import { getProductImage, getCategoryStyle } from '../utils/productImages';

const ProductImageCard = ({ category, name, icon, children, onClick }) => {
  const imageInfo = getProductImage(category, name);
  const style = getCategoryStyle(category);
  
  return (
    <div 
      style={{
        background: "#161B22",
        border: "1px solid #21262D",
        borderRadius: 11,
        padding: 14,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s",
        ...style
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div 
        style={{
          height: 120,
          background: imageInfo.gradient,
          borderRadius: 12,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
      >
        {icon || imageInfo.emoji}
      </div>
      
      {children}
    </div>
  );
};

export default React.memo(ProductImageCard);
