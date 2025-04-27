import React from "react";

const LineProgressBar = ({ label, percentage, lineColor }) => (
  <div style={{ marginBottom: 8 }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{label}</span>
      <span>{percentage.toFixed(0)}%</span>
    </div>
    <div style={{ background: "#eee", borderRadius: 4, height: 8 }}>
      <div
        style={{
          width: `${percentage}%`,
          background: lineColor,
          height: "100%",
          borderRadius: 4,
        }}
      />
    </div>
  </div>
);

export default LineProgressBar;
