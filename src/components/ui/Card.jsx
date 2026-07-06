import React from "react";
import { colors, radius, spacing } from "../../theme";

export default function Card({ children, style = {}, accent }) {
  return (
    <div
      style={{
        background: colors.surfaceAlt,
        border: `1px solid ${colors.border}`,
        borderLeft: accent ? `4px solid ${accent}` : `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: spacing.lg,
        ...style
      }}
    >
      {children}
    </div>
  );
}
