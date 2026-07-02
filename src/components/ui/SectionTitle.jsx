import React from "react";
import { colors } from "../../theme";

export default function SectionTitle({ title, subtitle }) {
  return (
    <div>
      <h2 style={{ margin: 0 }}>{title}</h2>
      {subtitle && (
        <div style={{ marginTop: 8, color: colors.muted }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
