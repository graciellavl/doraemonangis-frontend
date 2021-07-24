import React from "react";

const VarianDorayaki = ({ varian }) => {
  return (
    <div
      style={{
        position: "relative",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        border: "1px solid rgba(0, 0, 0, 0.25)",
        padding: "20px",
        maxWidth: "200px",
        height: "300px",
        margin: "20px 0",
      }}
    >
      <img
        src={`http://localhost:5000/${varian.varianimage}`}
        alt={""}
        width={"100%"}
        height={"180px"}
      />
      <h2 style={{ marginTop: "15px", marginBottom: "10px" }}>
        {varian.varianname}
      </h2>
      <p>{varian.variandescription}</p>
    </div>
  );
};

export default VarianDorayaki;
