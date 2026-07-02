// Script pour générer les icônes
// En production, utilisez de vraies icônes PNG

const sizes = [16, 48, 128];

sizes.forEach(size => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Fond dégradé
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#FF9900');
  gradient.addColorStop(1, '#FFB800');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Texte
  ctx.fillStyle = '#0D1117';
  ctx.font = `bold ${size * 0.6}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🚀', size / 2, size / 2);
  
  // Sauvegarder (nécessite Node.js avec canvas)
  console.log(`Icône ${size}x${size} créée`);
});
