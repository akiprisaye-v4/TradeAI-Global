import React from "react";
import { colors } from "../../theme";

export default function LoadingState({ message = "Chargement…" }) {
  return (
    <div style={{ color: colors.muted, padding: 16 }}>
      {message}
    </div>
  );
}
