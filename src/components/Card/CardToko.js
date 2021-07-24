import React from "react";
import { Link } from "react-router-dom";

const CardToko = () => {
  return (
    <div
      style={{
        position: "relative",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "20px",
        border: "1px solid rgba(0, 0, 0, 0.25)",
        padding: "20px",
        maxWidth: "320px",
        height: "200px",
        margin: "20px 0",
        display: "flex",
      }}
    >
      <img
        src={"/image/doraemon.jpg"}
        alt={""}
        width={"150px"}
        height={"100%"}
      />
      <div style={{ marginLeft: "15px" }}>
        <h2 style={{ marginBottom: "10px" }}>Varian Rasa</h2>
        <p>deskripsi</p>
      </div>
      <Link
        to={`toko/${"dorayaki"}`}
        style={{ color: "#333333", textDecoration: "none" }}
      >
        <div style={{ position: "absolute", bottom: "15px", right: "15px" }}>
          Lihat Toko
        </div>
      </Link>
    </div>
  );
};

export default CardToko;
