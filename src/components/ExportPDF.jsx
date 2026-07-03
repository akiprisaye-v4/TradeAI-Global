import React, { useState } from 'react';

const ExportPDF = ({ margin, productTitle }) => {
  const [loading, setLoading] = useState(false);

  const exportToPDF = async () => {
    const element = document.getElementById('analyses-section');
    if (!element) {
      alert('Aucune analyse à exporter');
      return;
    }

    setLoading(true);

    try {
      // Chargement dynamique des librairies (code-splitting)
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);

      // Capturer l'élément en image
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0D1117'
      });

      // Créer le PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Ajouter le titre
      pdf.setFontSize(16);
      pdf.setTextColor(255, 153, 0);
      pdf.text('TradeAI Global - Analyse de Rentabilité', 10, 15);
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Produit: ${productTitle || 'Non spécifié'}`, 10, 25);
      pdf.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 10, 32);

      // Ajouter l'image des analyses
      pdf.addImage(imgData, 'PNG', 10, 40, pdfWidth - 20, pdfHeight - 40);

      // Sauvegarder le PDF
      pdf.save(`analyse-${productTitle?.substring(0, 30) || 'produit'}-${Date.now()}.pdf`);
      
      alert('✅ PDF exporté avec succès !');
    } catch (error) {
      console.error('Erreur export PDF:', error);
      alert('❌ Erreur lors de l\'export PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={exportToPDF}
      disabled={loading}
      style={{
        padding: "12px 20px",
        background: loading ? "#30363D" : "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
        border: "none",
        borderRadius: 8,
        color: loading ? "#8B949E" : "#fff",
        fontSize: 13,
        fontWeight: 700,
        cursor: loading ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.2s"
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(139,92,246,0.4)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {loading ? '⏳ Export en cours...' : '📄 Exporter en PDF'}
    </button>
  );
};

export default React.memo(ExportPDF);
