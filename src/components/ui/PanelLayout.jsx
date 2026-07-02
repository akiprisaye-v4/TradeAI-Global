import React from "react";
import { spacing } from "../../theme";

export default function PanelLayout({ children }) {
  return (
    <div style={{ display: "grid", gap: spacing.lg }}>
      {children}
    </div>
  );
}
