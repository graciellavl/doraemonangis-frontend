import React from "react";

const VarianDorayaki = () => {
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
        src={"/image/doraemon.jpg"}
        alt={""}
        width={"100%"}
        height={"180px"}
      />
      <h2 style={{ marginTop: "15px", marginBottom: "10px" }}>Varian Rasa</h2>
      <p>deskripsi</p>
    </div>
  );
};

export default VarianDorayaki;
