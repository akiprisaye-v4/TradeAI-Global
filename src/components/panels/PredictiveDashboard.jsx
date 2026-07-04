import React from "react";
import {
  DashboardCard,
  MetricCard,
  Badge,
  PanelLayout,
  EmptyState
} from "../ui";

import { colors } from "../../theme";

export default function PredictiveDashboard({
  predictions = [],
  fmt
}) {

  const signalTone = {
    estimatedGrowthSignal: "success",
    watch: "warning",
    danger: "danger"
  };

  const signalColor = {
    estimatedGrowthSignal: colors.success,
    watch: colors.warning,
    danger: colors.danger
  };

  const riskLabel = {
    safe: "Stock sécurisé",
    warning: "Risque modéré",
    critical: "Risque critique"
  };

  return (
    <PanelLayout>

      <DashboardCard
        title="🧠 IA prédictive"
        subtitle="Prévisions basées sur les ventes, la marge, le ROI et le stock."
        right={<Badge tone="info">Prédictions locales</Badge>}
      >

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
            gap:10
          }}
        >

          <MetricCard
            label="Produits analysés"
            value={predictions.length}
          />

          <MetricCard
            label="Croissance"
            value={predictions.filter(x=>x.signal==="growth").length}
            color={colors.success}
          />

          <MetricCard
            label="Surveillance"
            value={predictions.filter(x=>x.signal==="watch").length}
            color={colors.warning}
          />

          <MetricCard
            label="Risque"
            value={predictions.filter(x=>x.signal==="danger").length}
            color={colors.danger}
          />

        </div>

      </DashboardCard>

      {predictions.length===0 ? (

        <DashboardCard title="Prévisions">

          <EmptyState
            message="Aucune prévision disponible."
          />

        </DashboardCard>

      ) : (

        predictions.map((p,i)=>(

          <DashboardCard
            key={i}
            title={p.productName}
            subtitle={p.marketplace}
            right={
              <Badge tone={signalTone[p.signal]}>
                {p.signal.toUpperCase()}
              </Badge>
            }
          >

            <div
              style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
                gap:10
              }}
            >

              <MetricCard
                label="Ventes 30j"
                value={`${p.projectedUnits30d}`}
              />

              <MetricCard
                label="Ventes 90j"
                value={`${p.projectedUnits90d}`}
              />

              <MetricCard
                label="Profit 30j"
                value={fmt(p.projectedProfit30d)}
              />

              <MetricCard
                label="Profit 90j"
                value={fmt(p.projectedProfit90d)}
              />

              <MetricCard
                label="ROI"
                value={`${p.currentROI.toFixed(1)}%`}
              />

              <MetricCard
                label="Marge"
                value={`${p.currentMargin.toFixed(1)}%`}
              />

              <MetricCard
                label="Prix conseillé"
                value={fmt(p.recommendedPrice)}
              />

              <MetricCard
                label="Confiance IA"
                value={`${p.confidence}%`}
                color={signalColor[p.signal]}
              />

            </div>

            <div
              style={{
                marginTop:16,
                color:signalColor[p.signal],
                fontWeight:700
              }}
            >
              {riskLabel[p.stockRisk]} •
              Couverture estimée :
              {" "}
              {p.daysOfStock}
              {" "}
              jours
            </div>

          </DashboardCard>

        ))

      )}

    </PanelLayout>

  );
}
