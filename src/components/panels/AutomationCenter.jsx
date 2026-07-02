import React from "react";
import { Badge, DashboardCard, EmptyState, MetricCard, PanelLayout } from "../ui";
import { colors } from "../../theme";

export default function AutomationCenter({ alerts = [] }) {
  const severityTone = {
    critical: "danger",
    warning: "warning",
    success: "success"
  };

  const severityColor = {
    critical: colors.danger,
    warning: colors.warning,
    success: colors.success
  };

  const criticalCount = alerts.filter(a => a.severity === "critical").length;
  const warningCount = alerts.filter(a => a.severity === "warning").length;
  const successCount = alerts.filter(a => a.severity === "success").length;

  return (
    <PanelLayout>
      <DashboardCard
        title="🤖 Centre d'automatisation IA"
        subtitle="Surveillance automatique des stocks, marges, opportunités et briefs."
        right={<Badge tone="success">4 agents actifs</Badge>}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
          <MetricCard label="Alertes totales" value={alerts.length} />
          <MetricCard label="Critiques" value={criticalCount} color={colors.danger} />
          <MetricCard label="À surveiller" value={warningCount} color={colors.warning} />
          <MetricCard label="Opportunités" value={successCount} color={colors.success} />
        </div>
      </DashboardCard>

      <DashboardCard title="📡 Flux des agents" subtitle="Actions recommandées par les agents locaux.">
        {alerts.length === 0 ? (
          <EmptyState message="Aucune alerte active pour le moment." />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {alerts.map((a, i) => (
              <DashboardCard
                key={i}
                title={a.title}
                subtitle={a.message}
                right={<Badge tone={severityTone[a.severity] || "default"}>{a.severity}</Badge>}
              >
                <div style={{ color: severityColor[a.severity] || colors.primary, fontWeight: 800 }}>
                  ➜ {a.action}
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      </DashboardCard>
    </PanelLayout>
  );
}
