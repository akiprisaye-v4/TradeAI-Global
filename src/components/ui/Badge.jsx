import React from "react";
import { colors, radius } from "../../theme";

export default function Badge({ children, tone = "default" }) {
  const map = {
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    info: colors.info,
    default: colors.primary
  };

  return (
    <span
      style={{
        color: map[tone] || map.default,
        border: `1px solid ${(map[tone] || map.default)}55`,
        background: `${map[tone] || map.default}15`,
        borderRadius: radius.pill,
        padding: "3px 8px",
        fontSize: 11,
        fontWeight: 800
      }}
    >
      {children}
    </span>
  );
}
