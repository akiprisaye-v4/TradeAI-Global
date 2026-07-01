import React from "react";
import { useState, useRef } from "react";

function ImportCSV({ onImport, setToast }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const parseCSV = (text) => {
    const lines = text.split("\n").filter(l => l.trim());
    if (lines.length < 2) throw new Error("Fichier vide ou invalide");
    
    const headers = lines[0].split(/[;,\t]/).map(h => h.trim().toLowerCase());
    const requiredHeaders = ["name", "sellingprice", "costprice"];
    const missing = requiredHeaders.filter(h => !headers.includes(h));
    if (missing.length > 0) {
      throw new Error(`Colonnes manquantes: ${missing.join(", ")}`);
    }

    const products = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(/[;,\t]/).map(v => v.trim().replace(/^"|"$/g, ""));
      if (values.length < headers.length) continue;
      
      const obj = {};
      headers.forEach((h, idx) => {
        const val = values[idx];
        if (["sellingprice", "costprice", "shippingtoamazon", "ads", "units", "length", "width", "height", "weight"].includes(h)) {
          obj[h] = parseFloat(val) || 0;
        } else if (["categoryidx", "fbasizeidx"].includes(h)) {
          obj[h] = parseInt(val) || 0;
        } else if (["vatregistered", "b2bsales", "useefn", "isq4"].includes(h)) {
          obj[h] = val.toLowerCase() === "true" || val === "1";
        } else {
          obj[h] = val;
        }
      });
      
      if (obj.name && obj.sellingprice && obj.costprice) {
        products.push({
          name: obj.name,
          marketplace: obj.marketplace || "FR",
          sellingPrice: obj.sellingprice,
          costPrice: obj.costprice,
          shippingToAmazon: obj.shippingtoamazon || 0,
          categoryIdx: obj.categoryidx || 2,
          fulfillment: obj.fulfillment || "fba",
          fbaSizeIdx: obj.fbasizeidx || 1,
          length: obj.length || 20,
          width: obj.width || 15,
          height: obj.height || 5,
          weight: obj.weight || 0.3,
          vatRate: parseFloat(obj.vatrate) || 20,
          vatRegistered: obj.vatregistered || false,
          b2bSales: obj.b2bsales || false,
          ads: obj.ads || 0,
          units: obj.units || 100,
          initialOrderUnits: parseInt(obj.initialorderunits) || 500,
          supplierLeadDays: parseInt(obj.supplierleaddays) || 30,
          rampMonths: parseInt(obj.rampmonths) || 3,
        });
      }
    }
    
    return products;
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        setError(null);
        const products = parseCSV(evt.target.result);
        setPreview(products);
      } catch (err) {
        setError(err.message);
        setPreview(null);
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (preview && preview.length > 0) {
      onImport(preview);
      setPreview(null);
      setToast({ message: `✅ ${preview.length} produit(s) importé(s)`, type: "success" });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 11, padding: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#FF9900", marginBottom: 12 }}>📥 Importer depuis CSV/Excel</div>
      
      <div style={{ marginBottom: 12, fontSize: 11, color: "#8B949E", lineHeight: 1.6 }}>
        <strong>Colonnes requises :</strong> name, sellingPrice, costPrice<br/>
        <strong>Colonnes optionnelles :</strong> marketplace, units, length, width, height, weight, categoryIdx, ads, vatRate, etc.<br/>
        <strong>Séparateurs acceptés :</strong> virgule, point-virgule, tabulation
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.txt,.xls,.xlsx"
        onChange={handleFile}
        style={{ marginBottom: 12, color: "#E6EDF3", fontSize: 12 }}
      />

      {error && (
        <div style={{ padding: "10px 14px", background: "#FF3D0010", border: "1px solid #FF3D0040", borderLeft: "3px solid #FF3D00", borderRadius: 7, color: "#FF3D00", fontSize: 12, marginBottom: 12 }}>
          ❌ {error}
        </div>
      )}

      {preview && (
        <div>
          <div style={{ fontSize: 12, color: "#00C853", marginBottom: 8, fontWeight: 700 }}>
            ✅ {preview.length} produit(s) détecté(s)
          </div>
          <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 12 }}>
            {preview.slice(0, 10).map((p, i) => (
              <div key={i} style={{ padding: "6px 10px", background: "#1C2128", borderRadius: 5, marginBottom: 4, fontSize: 11, display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#E6EDF3" }}>{p.name}</span>
                <span style={{ color: "#FF9900" }}>€{p.sellingPrice} / €{p.costPrice}</span>
              </div>
            ))}
            {preview.length > 10 && (
              <div style={{ fontSize: 10, color: "#8B949E", textAlign: "center", padding: 4 }}>
                ... et {preview.length - 10} autres
              </div>
            )}
          </div>
          <button onClick={handleImport} style={{ background: "#00C853", border: "none", borderRadius: 7, padding: "9px 16px", color: "#0D1117", fontWeight: 700, fontSize: 12, cursor: "pointer", width: "100%" }}>
            Importer {preview.length} produit(s) →
          </button>
        </div>
      )}

      <button
        onClick={() => {
          const csv = "name;marketplace;sellingPrice;costPrice;units;categoryIdx\nProduit Exemple;FR;29.99;8.00;100;2\nProduit 2;DE;19.99;5.00;50;1";
          const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "template-import.csv";
          a.click();
          URL.revokeObjectURL(url);
        }}
        style={{ marginTop: 10, background: "transparent", border: "1px solid #30363D", borderRadius: 7, padding: "7px 12px", color: "#8B949E", fontSize: 11, cursor: "pointer", width: "100%" }}
      >
        📄 Télécharger un template CSV
      </button>
    </div>
  );
}

export default React.memo(ImportCSV);
