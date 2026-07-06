import React from "react";
import { Card } from "./index";

export default function DashboardCard({
  title,
  subtitle,
  children,
  right
}) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          flexWrap: "wrap",
          gap: 10
        }}
      >
        <div>
          <div style={{fontSize:18,fontWeight:800}}>
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                fontSize:12,
                opacity:.7,
                marginTop:4
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {right}
      </div>

      {children}
    </Card>
  );
}
