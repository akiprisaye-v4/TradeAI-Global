import React, { useState } from "react";

export default function FBACalculators() {
  const [activeCalc, setActiveCalc] = useState("marge");

  // État pour le calculateur de marge
  const [margeInputs, setMargeInputs] = useState({
    prixVente: 29.99,
    coutProduit: 6,
    fraisFBA: 4,
    commission: 15,
    publicite: 10
  });

  // État pour le calculateur FBA
  const [fbaInputs, setFbaInputs] = useState({
    poids: 0.5,
    longueur: 20,
    largeur: 15,
    hauteur: 10,
    categorie: "standard"
  });

  // État pour le simulateur
  const [simInputs, setSimInputs] = useState({
    prixVente: 29.99,
    coutProduit: 6,
    ventesMois: 100,
    budgetPub: 300,
    fraisStockage: 50
  });

  // Calcul de la marge nette
  const calculerMarge = () => {
    const commissionMontant = (margeInputs.prixVente * margeInputs.commission) / 100;
    const publiciteMontant = (margeInputs.prixVente * margeInputs.publicite) / 100;
    const margeBrute = margeInputs.prixVente - margeInputs.coutProduit - margeInputs.fraisFBA - commissionMontant - publiciteMontant;
    const margePourcentage = (margeBrute / margeInputs.prixVente) * 100;
    return { margeBrute: margeBrute.toFixed(2), margePourcentage: margePourcentage.toFixed(1), commissionMontant: commissionMontant.toFixed(2), publiciteMontant: publiciteMontant.toFixed(2) };
  };

  // Calcul des frais FBA (estimation)
  const calculerFraisFBA = () => {
    const volume = (fbaInputs.longueur * fbaInputs.largeur * fbaInputs.hauteur) / 1000;
    let fraisBase = 3.5;
    if (fbaInputs.categorie === "grand") fraisBase = 8.5;
    if (fbaInputs.categorie === "lourd") fraisBase = 15;
    const fraisPoids = fbaInputs.poids * 2;
    const fraisVolume = volume * 0.5;
    const total = fraisBase + fraisPoids + fraisVolume;
    return { total: total.toFixed(2), fraisBase: fraisBase.toFixed(2), fraisPoids: fraisPoids.toFixed(2), fraisVolume: fraisVolume.toFixed(2) };
  };

  // Simulateur de rentabilité
  const estimerRentabiliteLocale = () => {
    const marge = calculerMarge();
    const profitMensuel = parseFloat(marge.margeBrute) * simInputs.ventesMois;
    const profitAnnuel = profitMensuel * 12;
    const roi = ((profitMensuel - simInputs.budgetPub - simInputs.fraisStockage) / (simInputs.coutProduit * simInputs.ventesMois)) * 100;
    return { profitMensuel: profitMensuel.toFixed(2), profitAnnuel: profitAnnuel.toFixed(2), roi: roi.toFixed(1), coutTotal: (simInputs.coutProduit * simInputs.ventesMois).toFixed(2) };
  };

  const margeResult = calculerMarge();
  const fbaResult = calculerFraisFBA();
  const localEstimateResult = estimerRentabiliteLocale();

  const calculators = [
    { id: "marge", name: "Marge Nette", icon: "💰" },
    { id: "fba", name: "Frais FBA", icon: "📦" },
    { id: "simulateur", name: "Simulateur", icon: "📊" }
  ];

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ color: "var(--text-primary)", marginBottom: 10 }}>
           Calculateurs FBA
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16 }}>
          Calculez vos marges, frais et rentabilité en temps réel
        </p>
      </div>

      {/* Sélecteur de calculateur */}
      <div style={{
        display: "flex",
        gap: 10,
        marginBottom: 30,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {calculators.map(calc => (
          <button
            key={calc.id}
            onClick={() => setActiveCalc(calc.id)}
            style={{
              padding: "12px 24px",
              background: activeCalc === calc.id ? "var(--accent)" : "var(--bg-card)",
              color: activeCalc === calc.id ? "#0D1117" : "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 14
            }}
          >
            {calc.icon} {calc.name}
          </button>
        ))}
      </div>

      {/* Calculateur de Marge Nette */}
      {activeCalc === "marge" && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: 25
        }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            💰 Calculateur de Marge Nette
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15, marginBottom: 25 }}>
            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Prix de vente (€)
              </label>
              <input
                type="number"
                value={margeInputs.prixVente}
                onChange={e => setMargeInputs({...margeInputs, prixVente: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Coût produit (€)
              </label>
              <input
                type="number"
                value={margeInputs.coutProduit}
                onChange={e => setMargeInputs({...margeInputs, coutProduit: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Frais FBA (€)
              </label>
              <input
                type="number"
                value={margeInputs.fraisFBA}
                onChange={e => setMargeInputs({...margeInputs, fraisFBA: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Commission Amazon (%)
              </label>
              <input
                type="number"
                value={margeInputs.commission}
                onChange={e => setMargeInputs({...margeInputs, commission: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Publicité (%)
              </label>
              <input
                type="number"
                value={margeInputs.publicite}
                onChange={e => setMargeInputs({...margeInputs, publicite: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>
          </div>

          {/* Résultats */}
          <div style={{
            background: "linear-gradient(135deg, rgba(255, 153, 0, 0.1) 0%, rgba(255, 184, 0, 0.1) 100%)",
            border: "2px solid #FF9900",
            borderRadius: 12,
            padding: 20
          }}>
            <h3 style={{ color: "#FF9900", marginBottom: 15 }}> Résultats</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Marge Nette</div>
                <div style={{ color: "#FF9900", fontSize: 24, fontWeight: "bold" }}>
                  {margeResult.margeBrute}€
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Marge %</div>
                <div style={{ color: parseFloat(margeResult.margePourcentage) >= 25 ? "#00C853" : "#FF3D00", fontSize: 24, fontWeight: "bold" }}>
                  {margeResult.margePourcentage}%
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Commission</div>
                <div style={{ color: "var(--text-primary)", fontSize: 24, fontWeight: "bold" }}>
                  {margeResult.commissionMontant}€
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Publicité</div>
                <div style={{ color: "var(--text-primary)", fontSize: 24, fontWeight: "bold" }}>
                  {margeResult.publiciteMontant}€
                </div>
              </div>
            </div>
            {parseFloat(margeResult.margePourcentage) >= 25 ? (
              <div style={{ marginTop: 15, padding: 10, background: "rgba(0, 200, 83, 0.2)", borderRadius: 6, textAlign: "center", color: "#00C853" }}>
                ✅ Marge excellente ! Ce produit est rentable.
              </div>
            ) : (
              <div style={{ marginTop: 15, padding: 10, background: "rgba(255, 61, 0, 0.2)", borderRadius: 6, textAlign: "center", color: "#FF3D00" }}>
                ️ Marge insuffisante. Envisagez d'augmenter le prix ou de réduire les coûts.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Calculateur de Frais FBA */}
      {activeCalc === "fba" && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: 25
        }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            📦 Calculateur de Frais FBA
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15, marginBottom: 25 }}>
            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Poids (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={fbaInputs.poids}
                onChange={e => setFbaInputs({...fbaInputs, poids: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Longueur (cm)
              </label>
              <input
                type="number"
                value={fbaInputs.longueur}
                onChange={e => setFbaInputs({...fbaInputs, longueur: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Largeur (cm)
              </label>
              <input
                type="number"
                value={fbaInputs.largeur}
                onChange={e => setFbaInputs({...fbaInputs, largeur: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Hauteur (cm)
              </label>
              <input
                type="number"
                value={fbaInputs.hauteur}
                onChange={e => setFbaInputs({...fbaInputs, hauteur: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Catégorie de taille
              </label>
              <select
                value={fbaInputs.categorie}
                onChange={e => setFbaInputs({...fbaInputs, categorie: e.target.value})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              >
                <option value="standard">Standard (&lt; 1kg)</option>
                <option value="grand">Grand (&gt; 1kg)</option>
                <option value="lourd">Lourd (&gt; 5kg)</option>
              </select>
            </div>
          </div>

          {/* Résultats */}
          <div style={{
            background: "linear-gradient(135deg, rgba(0, 200, 83, 0.1) 0%, rgba(0, 200, 83, 0.05) 100%)",
            border: "2px solid #00C853",
            borderRadius: 12,
            padding: 20
          }}>
            <h3 style={{ color: "#00C853", marginBottom: 15 }}> Estimation des Frais FBA</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Frais de base</div>
                <div style={{ color: "#00C853", fontSize: 24, fontWeight: "bold" }}>
                  {fbaResult.fraisBase}€
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Frais poids</div>
                <div style={{ color: "#00C853", fontSize: 24, fontWeight: "bold" }}>
                  {fbaResult.fraisPoids}€
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Frais volume</div>
                <div style={{ color: "#00C853", fontSize: 24, fontWeight: "bold" }}>
                  {fbaResult.fraisVolume}€
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Total estimé</div>
                <div style={{ color: "#00C853", fontSize: 24, fontWeight: "bold" }}>
                  {fbaResult.total}€
                </div>
              </div>
            </div>
            <div style={{ marginTop: 15, padding: 10, background: "rgba(0, 200, 83, 0.2)", borderRadius: 6, textAlign: "center", color: "#00C853" }}>
              💡 Ces frais sont des estimations. Vérifiez avec le calculateur officiel Amazon.
            </div>
          </div>
        </div>
      )}

      {/* Simulateur de Rentabilité */}
      {activeCalc === "simulateur" && (
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: 25
        }}>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 20 }}>
            📊 Simulateur de Rentabilité
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 15, marginBottom: 25 }}>
            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Prix de vente (€)
              </label>
              <input
                type="number"
                value={simInputs.prixVente}
                onChange={e => setSimInputs({...simInputs, prixVente: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Coût produit (€)
              </label>
              <input
                type="number"
                value={simInputs.coutProduit}
                onChange={e => setSimInputs({...simInputs, coutProduit: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Ventes par mois
              </label>
              <input
                type="number"
                value={simInputs.ventesMois}
                onChange={e => setSimInputs({...simInputs, ventesMois: parseInt(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Budget pub mensuel (€)
              </label>
              <input
                type="number"
                value={simInputs.budgetPub}
                onChange={e => setSimInputs({...simInputs, budgetPub: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ color: "var(--text-secondary)", fontSize: 12, display: "block", marginBottom: 5 }}>
                Frais stockage mensuel (€)
              </label>
              <input
                type="number"
                value={simInputs.fraisStockage}
                onChange={e => setSimInputs({...simInputs, fraisStockage: parseFloat(e.target.value) || 0})}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 14
                }}
              />
            </div>
          </div>

          {/* Résultats */}
          <div style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)",
            border: "2px solid #3B82F6",
            borderRadius: 12,
            padding: 20
          }}>
            <h3 style={{ color: "#3B82F6", marginBottom: 15 }}>📊 Projection de Rentabilité</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Profit mensuel</div>
                <div style={{ color: "#3B82F6", fontSize: 24, fontWeight: "bold" }}>
                  {localEstimateResult.profitMensuel}€
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Profit annuel</div>
                <div style={{ color: "#3B82F6", fontSize: 24, fontWeight: "bold" }}>
                  {localEstimateResult.profitAnnuel}€
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>ROI</div>
                <div style={{ color: parseFloat(localEstimateResult.roi) > 0 ? "#00C853" : "#FF3D00", fontSize: 24, fontWeight: "bold" }}>
                  {localEstimateResult.roi}%
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Coût total stock</div>
                <div style={{ color: "#3B82F6", fontSize: 24, fontWeight: "bold" }}>
                  {localEstimateResult.coutTotal}€
                </div>
              </div>
            </div>
            {parseFloat(localEstimateResult.roi) > 20 ? (
              <div style={{ marginTop: 15, padding: 10, background: "rgba(0, 200, 83, 0.2)", borderRadius: 6, textAlign: "center", color: "#00C853" }}>
                🚀 Excellent ROI ! Ce produit est très rentable.
              </div>
            ) : parseFloat(localEstimateResult.roi) > 0 ? (
              <div style={{ marginTop: 15, padding: 10, background: "rgba(255, 184, 0, 0.2)", borderRadius: 6, textAlign: "center", color: "#FFB800" }}>
                ⚠️ ROI positif mais modéré. Optimisez vos coûts pour améliorer la rentabilité.
              </div>
            ) : (
              <div style={{ marginTop: 15, padding: 10, background: "rgba(255, 61, 0, 0.2)", borderRadius: 6, textAlign: "center", color: "#FF3D00" }}>
                ❌ ROI négatif. Ce produit n'est pas rentable avec ces paramètres.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
