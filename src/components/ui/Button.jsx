import React from "react";
import { colors, radius, spacing } from "../../theme";

export default function Button({ children, variant = "primary", style = {}, ...props }) {
  const isPrimary = variant === "primary";

  return (
    <button
      {...props}
      style={{
        padding: `${spacing.sm}px ${spacing.md}px`,
        borderRadius: radius.pill,
        border: `1px solid ${isPrimary ? colors.primary : colors.border}`,
        background: isPrimary ? colors.primary : "transparent",
        color: isPrimary ? colors.bg : colors.text,
        fontWeight: 700,
        cursor: "pointer",
        ...style
      }}
    >
      {children}
    </button>
  );
}
