import React from "react";

function Index({ title, className = "" }) {
  return (
    <div className={`titling ${className}`}>
      <h3 className="titling__title">{title}</h3>
    </div>
  );
}

export default Index;
