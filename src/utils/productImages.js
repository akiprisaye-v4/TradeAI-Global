// Couleurs par catégorie
export const categoryColors = {
  "Électronique": { from: "#3B82F6", to: "#8B5CF6", emoji: "📱" },
  "Maison & Cuisine": { from: "#10B981", to: "#34D399", emoji: "🏠" },
  "Vêtements & Mode": { from: "#EC4899", to: "#F472B6", emoji: "👕" },
  "Sport & Plein Air": { from: "#F59E0B", to: "#FBBF24", emoji: "⚽" },
  "Beauté & Santé": { from: "#EF4444", to: "#F87171", emoji: "💄" },
  "Jouets & Jeux": { from: "#8B5CF6", to: "#A78BFA", emoji: "🎮" },
  "Livres": { from: "#6B7280", to: "#9CA3AF", emoji: "📚" },
  "Auto & Moto": { from: "#1F2937", to: "#374151", emoji: "🚗" },
  "Bijoux": { from: "#FBBF24", to: "#FCD34D", emoji: "💎" },
  "Outils & Bricolage": { from: "#F97316", to: "#FB923C", emoji: "🔧" },
  "Autre": { from: "#6366F1", to: "#818CF8", emoji: "📦" }
};

export const getProductImage = (category, productName) => {
  const colors = categoryColors[category] || categoryColors["Autre"];
  const initial = productName ? productName.charAt(0).toUpperCase() : "?";
  
  return {
    gradient: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
    emoji: colors.emoji,
    placeholder: '/placeholder.svg',
    unsplash: getUnsplashImage(category)
  };
};

export const getUnsplashImage = (category) => {
  const keywords = {
    "Électronique": "electronics,technology,gadget",
    "Maison & Cuisine": "home,kitchen,cooking",
    "Vêtements & Mode": "fashion,clothing,style",
    "Sport & Plein Air": "sports,outdoor,fitness",
    "Beauté & Santé": "beauty,health,wellness",
    "Jouets & Jeux": "toys,games,fun",
    "Livres": "books,reading,library",
    "Auto & Moto": "car,moto,automotive",
    "Bijoux": "jewelry,accessories,luxury",
    "Outils & Bricolage": "tools,diy,workshop",
    "Autre": "product,shopping"
  };
  
  const keyword = keywords[category] || keywords["Autre"];
  return `https://source.unsplash.com/400x300/?${keyword}`;
};

export const getCategoryStyle = (category) => {
  const colors = categoryColors[category] || categoryColors["Autre"];
  return {
    background: `linear-gradient(135deg, ${colors.from}20 0%, ${colors.to}20 100%)`,
    border: `2px solid ${colors.from}`,
    emoji: colors.emoji
  };
};
