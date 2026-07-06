import React from "react";
import { colors } from "../../theme";

export default function EmptyState({ message = "Aucune donnée disponible." }) {
  return (
    <div style={{ color: colors.muted, padding: 16 }}>
      {message}
    </div>
  );
}
