import React from "react";
import { colors, radius, spacing } from "../../theme";

export default function MetricCard({ label, value, color = colors.primary }) {
  return (
    <div style={{ background: colors.bg, padding: spacing.md, borderRadius: radius.md }}>
      <div style={{ fontSize: 10, color: colors.muted, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 900, color }}>{value}</div>
    </div>
  );
}
